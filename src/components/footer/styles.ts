import styled from 'styled-components';

export const StyledFooter = styled.footer`
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid ${props => props.theme.global.primary_border_color};
	background: white;
`;
