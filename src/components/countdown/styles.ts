import styled from 'styled-components';

export const StyledCountdown = styled.div`
  background: ${props => props.theme.global.background_color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & div:first-child {
    display: flex;
    align-items: center;
    height: ${props => props.theme.forms.field_height}px;
  }
	& form {
    text-align: center;
    & div {
      align-items: center;
    }
  }
`;
