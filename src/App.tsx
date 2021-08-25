import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './styles';
import { Countdown } from './components/countdown';
import { Loader } from './components/common';
import { Header } from './components/header';
import { Footer } from './components/footer';
import helpers from './helpers';

export enum COUNTDOWN_MODE {
	NEW,
	EDIT,
	IN_PROGRESS,
};

interface IState {
	mode: COUNTDOWN_MODE
  theme: Theme | null;
  countdown: Countdown | null;
}

/* TODO: think about the implementation of IProps as { defaultTheme: ITheme } */
class App extends React.Component<unknown, IState> {
  state: IState = {
  	mode: COUNTDOWN_MODE.NEW,
  	theme: null,
  	countdown: null,
  }

  componentDidMount(): void {
  	helpers.fetchData(
  		'https://api.koala.io/marketing/v1/device-configurations/alias/web-config',
  		'GET',
  		{'X-Organization-Id': '1'}
  	)
  		.then(result => this.setState({ theme: result.data }))
  		.catch(error => console.log(error.message));
  }

  render() {
  	const data = this.state.theme && this.state.theme.data;
  	const { theme, mode, countdown } = this.state;
  	return (
  		!theme
  			? <Loader />
  			: <ThemeProvider theme={data}>
  				<StyledApp />
  				<Header />
  				<main>
  					{
  						!countdown && mode === COUNTDOWN_MODE.IN_PROGRESS
  							? <Loader />
  							: <Countdown
  								mode={mode}
  								timeLeft={countdown?.timeLeft}
  								changeMode={this.changeMode} />
  					}
  				</main>
  				<Footer />
  			</ThemeProvider>
  	);
  }

  setTimer = (time: InputValue): void => {
  	const countdown = setInterval(() => {
  		!this.state.countdown
  			? this.setState({
  				countdown: {
  					id: countdown,
  					start: Date.now(),
  					duration: +time,
  					timeLeft: +time - 1,
  				}
  			})
  			: this.setState({
  				countdown: {
  					...this.state.countdown,
  					timeLeft: this.state.countdown.timeLeft - 1
  				}});

  		if (this.state.countdown?.timeLeft === 0) {
  			this.changeMode(COUNTDOWN_MODE.NEW);
  		}
  	}, 1000);
  };

	changeMode = (mode: COUNTDOWN_MODE, time?: number): void => {
		this.setState({mode});
		switch (mode) {
			case COUNTDOWN_MODE.IN_PROGRESS:
				this.setTimer(time as number);
				break;
			case COUNTDOWN_MODE.EDIT:
				const timer_id = this.state.countdown?.id;
				clearInterval(timer_id);
				this.setState({countdown: null});
				break;
			case COUNTDOWN_MODE.NEW:
			default:
				clearInterval(this.state.countdown?.id);
				this.setState({countdown: null});
				break;
		};
	};
}

export default App;
