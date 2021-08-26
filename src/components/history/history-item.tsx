import React from 'react';
import { StyledHistoryItem } from './styles';

interface IProps {
	start: number;
	duration: number;
};

export const HistoryItem: React.FC<IProps> = ({ start, duration }) => {
	const date = new Date(start);
	return (
		<StyledHistoryItem>
			<div>Started on: <span>{date.toString()}</span></div>
			<div>Duration: <span>{duration}</span></div>
		</StyledHistoryItem>
	);
};
