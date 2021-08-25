// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

export const defaultTheme = {
	data: {
		global: {
			body_color: 'green',
			loading_bar_color: 'red',
			background_color: 'white',
			primary_border_color: 'black'
		},
		primary_font_family: {
			regular: 'Font',
			bold: 'Font',
		},
		buttons: {
			primary_button_text_color: 'blue',
			primary_button_font_family: 'blue',
			primary_button_border_color: 'blue',
			primary_button_border_radius: 10,
			primary_button_background_color: 'blue',
			secondary_button_text_color: 'blue',
			secondary_button_font_family: 'blue',
			secondary_button_border_color: 'blue',
			secondary_button_background_color: 'blue',
			secondary_button_border_radius: 10,
			knockout_button_text_color: 'blue',
			knockout_button_font_family: 'blue',
			knockout_button_border_color: 'blue',
			knockout_button_background_color: 'blue',
			knockout_button_border_radius: 10,
		},
		forms: {
			field_height: 50,
			placeholder_color: 'black',
		},
		header: {
			font_color: 'blue',
			border_color: 'red',
			border_radius: 9,
			background_color: 'green',
			desktop_logo_width: 200,
			font_size: 10,
		}
	},
};

/* see issues:
	- https://github.com/styled-components/jest-styled-components/issues/119
	- https://github.com/styled-components/styled-components/issues/1319
*/
export function shallowWithTheme(child) {
	return shallow(child, {
		wrappingComponent: ({ children }) => {
			return (<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>);
		},
	});
}

Enzyme.configure({ adapter: new Adapter() });
