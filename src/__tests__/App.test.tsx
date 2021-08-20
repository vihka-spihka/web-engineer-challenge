import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';
import helpers from './../helpers';

const defaultTheme: Theme = {
	data: {
		global: {
			body_color: 'green',
		},
	},
};

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

	it('renders nothing when no theme provided', () => {
		expect(appWrapper).toEqual({});
		expect(appWrapper).toMatchSnapshot();
	});

	it('renders correctly when theme provided', () => {
		instance.setState({theme: defaultTheme});
		expect(appWrapper).not.toEqual('');
		expect(appWrapper).toMatchSnapshot();
	});

	it('renders correctly when countdown is in progress', () => {
		instance.setState({countdown: countdown, theme: defaultTheme});
		expect(appWrapper).not.toEqual('');
		expect(appWrapper).toMatchSnapshot();
	});

	it('shows `Seconds left:` if countdown is in progress', () => {
		instance.setState({countdown: countdown, theme: defaultTheme});
		expect(appWrapper.contains(<div>Seconds left: 10</div>)).toEqual(true);
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
