import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './styles';
import { Countdown, Loader, Header, Footer, History } from './components';
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
	history: Array<Countdown>;
}

/* TODO: think about the implementation of IProps as { defaultTheme: ITheme } */
class App extends React.Component<unknown, IState> {
  state: IState = {
  	mode: COUNTDOWN_MODE.NEW,
  	theme: null,
  	countdown: null,
  	history: [],
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
  	const { theme, mode, countdown, history } = this.state;
  	return (
  		!theme
  			? <Loader />
  			: <ThemeProvider theme={data}>
  				<StyledApp />
  				<Header />
  				<main>
  					{
  						mode === COUNTDOWN_MODE.IN_PROGRESS && (!countdown || !countdown!.id)
  							? <Loader />
  							: <>
  								<Countdown
  									mode={mode}
  									timeLeft={countdown?.timeLeft!}
  									changeMode={this.changeMode} />
  								{ history.length > 0 && <History items={history} /> }
  							</>
  					}
  				</main>
  				<Footer />
  			</ThemeProvider>
  	);
  }

  setTimer = (time: InputValue): void => {
  	const countdown = setInterval(() => {
  		!this.state.countdown || !this.state.countdown.id
  			? this.setState(prevState => ({
  				countdown: {
  					id: countdown,
  					start: prevState.countdown?.start ? prevState.countdown.start : Date.now(),
  					duration: +time,
  					timeLeft: +time - 1,
  				}
  			}))
  			: this.setState({
  				countdown: {
  					...this.state.countdown,
  					timeLeft: this.state.countdown.timeLeft! - 1
  				}});

  		if (this.state.countdown?.timeLeft === 0) {
  			this.changeMode(COUNTDOWN_MODE.NEW, 0, false);
  		}
  	}, 1000);
  };

	changeMode = (mode: COUNTDOWN_MODE, time?: number, reset?: boolean): void => {
		this.setState({mode});
		switch (mode) {
			case COUNTDOWN_MODE.IN_PROGRESS:
				this.setTimer(time as number);
				break;
			case COUNTDOWN_MODE.EDIT:
				const timer = this.state.countdown;
				clearInterval(timer?.id!);
				this.setState(
					prevState => (
						{
							countdown: {
								...prevState.countdown!,
								id: null,
								timeLeft: null
							},
						}
					)
				);
				break;
			case COUNTDOWN_MODE.NEW:
			default:
				const countdown = this.state.countdown;
				clearInterval(countdown?.id!);
				this.setState(prevState => (
					{
						countdown: null,
						history: reset
							? [...prevState.history] // don't add to history if countdown reseted
							: [...prevState.history, countdown!]
					}
				));
				break;
		};
	};
}

export default App;
