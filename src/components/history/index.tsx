import React from 'react';
import { StyledHistory } from './styles';
import { HistoryItem } from './history-item';

interface IProps {
	items: Array<Countdown>;
};

export const History: React.FC<IProps> = ({ items }) => {
	return (
		<StyledHistory>
			<h2>History</h2>
			<div>
				{items.map(
					it => <HistoryItem key={it.id} start={it.start} duration={it.duration} />
				)}
			</div>
		</StyledHistory>
	);
};
