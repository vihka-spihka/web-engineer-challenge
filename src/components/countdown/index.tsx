import React, { useState } from 'react';
import { StyledCountdown } from './styles';
import { Input, StyledButton } from './../common';
import { COUNTDOWN_MODE } from './../../App';

interface IProp {
	mode: COUNTDOWN_MODE;
	timeLeft?: number;
	changeMode: (mode: COUNTDOWN_MODE, time?: number) => void;
};

export const Countdown = ({ mode, timeLeft, changeMode }: IProp) => {
	const [value, setValue] = useState<InputValue>('');

	const submitForm = (e: React.SyntheticEvent): void => {
		e.preventDefault();
		changeMode(COUNTDOWN_MODE.IN_PROGRESS, value as number);
		setValue('');
	};

	const editCountdown = () => {
		timeLeft && setValue(timeLeft);
		changeMode(COUNTDOWN_MODE.EDIT);
	};

	const resetCountdown = (): void => {
		setValue('');
		changeMode(COUNTDOWN_MODE.NEW);
	};

	let countdown: React.ReactElement;

	switch(mode) {
		case COUNTDOWN_MODE.EDIT:
			countdown = (
				<form onSubmit={(e: React.SyntheticEvent) => submitForm(e)}>
					<Input
						type={'number'}
						value={value?.toString()}
						label={'Enter time in seconds: '}
						onChangeInput={val => setValue(val)}
						placeholder={'e.g. 1000'} />
					<StyledButton
						label={'Done'}
						$styleType={value !== '' ? 'primary': 'knockout'}
						disabled={!value}
						onClick={(e: React.SyntheticEvent) => submitForm(e)} />
					<StyledButton
						label={'Reset'}
						$styleType={'secondary'}
						onClick={() => resetCountdown()} />
				</form>
			);
			break;
		case COUNTDOWN_MODE.IN_PROGRESS:
			countdown = (
				<>
					<div>Seconds left: {timeLeft}</div>
					<div>
						<StyledButton
							label={'Edit'}
							$styleType={'primary'}
							onClick={() => editCountdown()} />
						<StyledButton
							label={'Reset'}
							$styleType={'secondary'}
							onClick={() => resetCountdown()} />
					</div>
				</>
			);
			break;
		case COUNTDOWN_MODE.NEW:
		default:
			countdown = (
				<form onSubmit={(e) => submitForm(e)}>
					<Input
						type={'number'}
						value={value?.toString()}
						label={'Enter time in seconds: '}
						onChangeInput={val => setValue(val)}
						placeholder={'e.g. 1000'} />
					<StyledButton
						label={'Start'}
						$styleType={
							mode === COUNTDOWN_MODE.NEW && value === ''
								? 'knockout'
								: 'primary'
						}
						disabled={!value}
						onClick={(e: React.SyntheticEvent) => submitForm(e)} />
				</form>
			);
			break;
	}

	return (
		<StyledCountdown>
			{countdown}
		</StyledCountdown>
	);
};
