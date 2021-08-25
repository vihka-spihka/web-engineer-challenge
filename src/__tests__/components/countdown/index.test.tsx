import React from 'react';
import { ShallowWrapper } from 'enzyme';
import { Countdown } from './../../../components/countdown';
import { COUNTDOWN_MODE } from './../../../App';
import { Input , StyledButton} from './../../../components/common';
import { shallowWithTheme } from './../../../setupTests';

let wrapper: ShallowWrapper;

const useCountdown = (
	mode: COUNTDOWN_MODE,
	timeLeft?: number
): React.ComponentElement<any, any> => {
	return (<Countdown mode={mode} timeLeft={timeLeft} changeMode={jest.fn()} />);
};

const useInput = (
	value: string,
	label: string
): React.ComponentElement<any, any> => {
	return (
		<Input
			type={'number'}
			value={value}
			label={label}
			onChangeInput={expect.any(Function)}
			placeholder={'e.g. 1000'} />
	);
};

const useBtn = (
	label: string,
	style: 'primary' | 'secondary' | 'knockout',
	disabled?: boolean
): React.ComponentElement<any, any> => {
	return (
		<StyledButton
			label={label}
			$styleType={style}
			disabled={disabled}
			onClick={expect.any(Function)} />
	);
};

describe('Countdown', () => {
	it('renders correctly', () => {
		wrapper = shallowWithTheme(useCountdown(COUNTDOWN_MODE.NEW));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show empty input when mode is set to NEW', () => {
		wrapper = shallowWithTheme(useCountdown(COUNTDOWN_MODE.NEW));

		const btn = useBtn('Start', 'knockout', true);
		const countdownInput = useInput('', 'Enter time in seconds: ');

		expect(wrapper.find('form').children().first().getElement()).toEqual(countdownInput);
		expect(wrapper.find('form').children().last().getElement()).toEqual(btn);
	});

	it('should show `Seconds left: 4` when mode is set to IN_PROGRESS', () => {
		wrapper = shallowWithTheme(useCountdown(COUNTDOWN_MODE.IN_PROGRESS, 4));
		const label = 'Seconds left: 4';
		const editBtn = useBtn('Edit', 'primary');
		const resetBtn = useBtn('Reset', 'secondary');

		expect(wrapper.children().first().text()).toEqual(label);
		expect(wrapper.children().last().children().first().getElement()).toEqual(editBtn);
		expect(wrapper.children().last().children().last().getElement()).toEqual(resetBtn);
	});

	it('should show input with value when mode is set to EDIT', () => {
		wrapper = shallowWithTheme(useCountdown(COUNTDOWN_MODE.EDIT, 4));
		
		const doneBtn = useBtn('Done', 'primary', false);
		const resetBtn = useBtn('Reset', 'secondary');
		const countdownInput = useInput('4', 'Enter time in seconds: ');

		expect(wrapper.find('form').childAt(0).getElement()).toEqual(countdownInput);
		expect(wrapper.find('form').childAt(1).getElement()).toEqual(doneBtn);
		expect(wrapper.find('form').childAt(2).getElement()).toEqual(resetBtn);
	});

	afterEach(() => {
		wrapper.unmount();
	});
});
