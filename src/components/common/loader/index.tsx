import React from 'react';
import { StyledLoader } from './../styles';

export const Loader: React.FC = () => {
	return (
		<StyledLoader>
			<img src='/favicon.ico' width='80' height='80' alt='Company logo' />
		</StyledLoader>
	);
};
