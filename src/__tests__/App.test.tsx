import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App, { COUNTDOWN_MODE } from '../App';
import { Loader } from './../components/common';
import helpers from './../helpers';
import { defaultTheme } from './../setupTests';

const countdown = {
	id: 1,
	start: Date.now(),
	duration: 10,
	timeLeft: 10
};

let appWrapper: ShallowWrapper<any, any, App>;
let instance: App;

const mockSuccessfulFetch = (): Promise<any> => {
	return Promise.resolve({data: defaultTheme});
};

const mockFailedFetch = (): Promise<any> => {
	return Promise.reject({message: 'Error'});
};

describe('App component', () => {
	beforeEach(() => {
		appWrapper = shallow<App>(<App />, {disableLifecycleMethods: true});
		instance = appWrapper.instance();
		appWrapper.setState({theme: null, countdown: null});

		helpers.fetchData = jest.fn().mockImplementation(mockSuccessfulFetch);
	});

	it('renders Loader when no theme provided', () => {
		expect(appWrapper.contains(<Loader />)).toEqual(true);
		expect(appWrapper).toMatchSnapshot();
	});

	it('renders correctly when theme provided', () => {
		instance.setState({theme: defaultTheme});
		expect(appWrapper).not.toEqual('');
		expect(appWrapper).toMatchSnapshot();
	});

	it('renders correctly when countdown is in progress', () => {
		instance.setState({countdown: countdown, theme: defaultTheme});
		expect(appWrapper.contains(<Loader />)).toEqual(false);
		expect(appWrapper).toMatchSnapshot();
	});

	it('shows Loader when countdown is about to start', () => {
		instance.setState({
			countdown: null,
			theme: defaultTheme,
			mode: COUNTDOWN_MODE.IN_PROGRESS
		});
		expect(appWrapper.contains(<Loader />)).toEqual(true);
	});

	it('shows `Seconds left:` if countdown is in progress', () => {
		instance.setState({
			countdown: countdown,
			theme: defaultTheme,
			mode: COUNTDOWN_MODE.IN_PROGRESS
		});
		expect(appWrapper.find('Countdown').length).toEqual(1);
	});

	it('sets state.theme on successful fetch in componentDidMount', () => {
		instance.componentDidMount!();
		// waiting for the state to update
		return new Promise(res => setImmediate(res))
			.then(() => {
				expect(appWrapper.state()).toMatchObject({theme: defaultTheme});
			});
	});

	it('doesn`t modify state.theme on failed fetch in componentDidMount', () => {
		helpers.fetchData = jest.fn().mockImplementation(mockFailedFetch);
		instance.componentDidMount!();
		// waiting for the state to update
		return new Promise(res => setImmediate(res))
			.then(() => {
				expect(appWrapper.state()).toMatchObject({theme: null});
			});
	});

	it('sets countdown for 10 seconds', () => {
		jest.useFakeTimers();
		instance.setTimer(10);
		// use 1000ms due to the state hasn't been refreshed immediatelly
		jest.advanceTimersByTime(1000);

		expect(appWrapper.state()).toMatchObject({
			countdown: {
				duration: 10
			}
		});
	});

	it('sets mode correctly', () => {
		const modes = [COUNTDOWN_MODE.NEW, COUNTDOWN_MODE.IN_PROGRESS, COUNTDOWN_MODE.EDIT];
		modes.forEach((it:COUNTDOWN_MODE) => {
			instance.changeMode(it);
			expect(appWrapper.state()).toMatchObject({ mode: it });
		});
	});

	it('removes coundown when time is up', () => {
		jest.useFakeTimers();
		instance.setTimer(10);
		jest.advanceTimersByTime(11000);

		expect(appWrapper.state()).toMatchObject({countdown: null});
	});

	afterAll(() => {
		appWrapper.unmount();
		jest.unmock('./../helpers');
		jest.clearAllTimers();
	});
});
