import { createGlobalStyle } from 'styled-components';

export const StyledApp = createGlobalStyle<{ theme: Theme }>`
	body {
		margin: 0;
		background: ${({ theme }: any) => theme.global.body_color};
		width: 100%;
		font-family: ${({ theme }: any) => theme.primary_font_family.regular};

		& #root {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			& > * {
				padding: 20px;
			}
			& main {
				flex: 1;
			}
		}
	}
`;
