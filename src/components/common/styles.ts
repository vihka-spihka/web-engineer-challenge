import styled from 'styled-components';
import { Button } from './button';

export const StyledButton = styled(Button)<{ $styleType: 'primary' | 'secondary' | 'knockout' }>`
	background: ${props => props.theme.buttons[`${props.$styleType}_button_background_color`]};
	border: 1px solid
	${props => props.theme.buttons[`${props.$styleType}_button_border_color`]};
	border-radius: ${props => props.theme.buttons[`${props.$styleType}_button_border_radius`]+'px'};
	font-family: ${props => props.theme.buttons[`${props.$styleType}_button_font_family`]};
	color: ${props => props.theme.buttons[`${props.$styleType}_button_text_color`]};
	height: 30px;
	width: 60px;
	margin: 10px;
`;

export const StyledLoader = styled.div`
	border-radius: 50%;
	box-shadow:
		0 0 0 5px rgba(13, 108, 242, .8),
		0 0 0 10px rgba(13, 108, 242, .5),
		0 0 0 15px rgba(13, 108, 242, .3);
	background: ${ props => !!props.theme && !!props.theme.global
		? props.theme.global.loading_bar_color
		: '#0d6cf2'};
	width: 120px;
	height: 120px;
	position: absolute;
	left: calc(50% - 60px);
	top: calc(50% - 60px);
	animation: loader-animation 2.5s ease infinite;

	& img {
		position: absolute;
		left: 20px;
		top: 20px;
	}

	@keyframes loader-animation {
		0% {
			transform: scale(1, 1);
		}
		50% {
			transform: scale(1.3, 1.3);
		}
		100% {
			transform: scale(1, 1);
		}
	}
`;

export const StyledInput = styled.div`
	height: ${props => props.theme.forms.field_height}px;
	& input {
		line-height: ${props => props.theme.forms.field_height/2}px;
		&::placeholder {
			color: ${props => props.theme.forms.placeholder_color};
		}
	}
`;
