import styled from 'styled-components';

export const StyledHeader = styled.header`
	font-family: ${props => props.theme.primary_font_family.bold};
	color: ${props => props.theme.header.font_color};
	border-bottom: 1px solid ${props => props.theme.header.border_color};
	border-radius: ${props => props.theme.header.border_radius}px;
	background: ${props => props.theme.header.background_color};
	display: flex;
	flex-direction: row;
	align-items: center;
	& div {
		font-size: ${props => props.theme.header.desktop_logo_width/10}px;
		margin-right: 15px;
	}
	& h1 {
		margin: 0;
		font-size: ${props => props.theme.header.font_size}px;
	}
`;
