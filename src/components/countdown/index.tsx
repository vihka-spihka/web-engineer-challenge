import React from 'react';
import { StyledCountdown } from './styles';

// Write your countdown code in this component
export const Countdown = () => {
	return (
		<StyledCountdown>
			<img src='koala-logo.png' alt='Company logo' />
			<h1>Koala Web Engineer Coding Challenge</h1>
			<p>Build a countdown clock!</p>
			<div style={{
				border: '.5px solid gray',
				width: 50,
				borderRadius: '3px',
				background: '#EFEFEF',
				padding: 3
			}}>
				<div onClick={() => alert('TODO')}>Start</div>
			</div>
		</StyledCountdown>
	);
};
