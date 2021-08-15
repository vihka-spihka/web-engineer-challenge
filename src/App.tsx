import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Countdown } from './components/countdown';

interface IState {
  theme: Theme | null;
  countdown: Countdown | null;
}

/* TODO: think about the implementation of IProps as { defaultTheme: ITheme } */
class App extends React.Component<unknown, IState> {
  state: IState = {
  	theme: null,
  	countdown: null,
  }

  componentDidMount() {
  	fetch('https://api.koala.io/marketing/v1/device-configurations/alias/web-config', {
  		method: 'GET',
  		headers: {
  			'X-Organization-Id': '1',
  		}
  	})
  		.then(res => res.json())
  		.then(result => this.setState({ theme: result.data }))
  		.catch(error => console.log(error.message));

  }

  render() {
  	const data = this.state.theme && this.state.theme.data;
  	return (
  		!!this.state.theme && (
  			<ThemeProvider theme={data}>
  				<h1>Countdown Clock</h1>
  				<img src='koala-logo.png' alt='Company logo' />
  				{ this.state.countdown
  					? <div>Seconds left: {this.state.countdown.timeLeft}</div>
  					: <Countdown setCountdown={this.setTimer} />}
  			</ThemeProvider>
  		)
  	);
  }

  setTimer = (time: InputValue): void => {
  	const countdown = setInterval(() => {
  		!this.state.countdown
  			? this.setState({
  				countdown: {
  					id: countdown,
  					start: Date.now(),
  					duration: time as number,
  					timeLeft: time as number,
  				}
  			})
  			: this.setState({
  				countdown: {
  					...this.state.countdown,
  					timeLeft: this.state.countdown.timeLeft - 1
  				}});

  		if (this.state.countdown?.timeLeft === 0) {
  			clearInterval(countdown);
  			this.setState({ countdown: null });
  		}
  	}, 1000);
  };
}

export default App;
