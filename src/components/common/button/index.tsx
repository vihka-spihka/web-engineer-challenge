import React from 'react';

interface IButton {
	label: string;
	onClick: (e: React.SyntheticEvent) => void;
};

export const Button = ({ label, onClick }: IButton) => {
	return (
		<button onClick={() => onClick}>
			{label}
		</button>
	);
};
