import React from 'react';

interface IInput extends Partial<HTMLInputElement> {
	label: string;
	onChangeInput: (value: InputValue) => void;
};

export const Input = ({ type, label, value, onChangeInput, placeholder }: IInput) => {
	return (
		<label>
			{label}
			<input
				type={type}
				value={value}
				onChange={(e) => onChangeInput(e.target.value)}
				placeholder={placeholder} />
		</label>
	);
};
