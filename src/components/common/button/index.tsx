import React from 'react';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
};

export const Button: React.FC<IButton> = ({ label, ...props }) => {
	return (
		<button {...props}>
			{label}
		</button>
	);
};
