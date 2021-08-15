import React, { useState } from 'react';
import { StyledCountdown } from './styles';
import { Input, Button } from './../common';

interface IProp {
  setCountdown: (time: InputValue) => void;
};

export const Countdown = ({ setCountdown }: IProp) => {
	const [value, setValue] = useState<InputValue>('');

	const submitForm = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setCountdown(value as InputValue);
	};

	return (
		<StyledCountdown>
			<form onSubmit={(e) => submitForm(e)}>
				<Input
					type={'number'}
					value={value?.toString()}
					label={'Enter time in seconds: '}
					onChangeInput={val => setValue(val)}
					placeholder={'e.g. 1000'} />
				<Button label={'Start'} onClick={e => submitForm(e)} />
			</form>
		</StyledCountdown>
	);
};
