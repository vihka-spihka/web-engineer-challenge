import React from 'react';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
};

export const Button = ({ label, ...props }: IButton) => {
	return (
		<button {...props}>
			{label}
		</button>
	);
};
