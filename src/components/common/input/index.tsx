import React from 'react';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	onChangeInput: (v: InputValue) => void;
};

export const Input: React.FC<IInput> = ({ label, value, onChangeInput, ...props }) => {
	return (
		<>
			<label>
				{label}
				<input
					value={value}
					onChange={
						(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)
					}
					{...props} />
			</label>
		</>
	);
};
