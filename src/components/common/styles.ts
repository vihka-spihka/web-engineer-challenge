import styled from 'styled-components';
import { Button } from './button';

export const StyledButton = styled(Button)<{ $styleType: 'primary' | 'secondary' | 'knockout' }>`
	background: ${props => props.theme.buttons[`${props.$styleType}_button_background_color`]};
	border: ${props => props.theme.buttons[`${props.$styleType}_button_border_color`]};
	border-radius: ${props => props.theme.buttons[`${props.$styleType}_button_border_radius`]};
	font-family: ${props => props.theme.buttons[`${props.$styleType}_button_font_family`]};
	color: ${props => props.theme.buttons[`${props.$styleType}_button_text_color`]};
`;
