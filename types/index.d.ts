declare type InputValue = string | number;

declare type Theme = {
	[key: string]: unknown;
}&{
	data: {
		global: {
			body_color: string,
			loading_bar_color: string,
			background_color: string,
			primary_border_color: string,
		},
		primary_font_family: {
			regular: string,
			bold: string,
		},
		buttons: {
			primary_button_text_color: string,
			primary_button_font_family: string,
			primary_button_border_color: string,
			primary_button_border_radius: number,
			primary_button_background_color: string,
			secondary_button_text_color: string,
			secondary_button_font_family: string,
			secondary_button_border_color: string,
			secondary_button_background_color: string,
			secondary_button_border_radius: number,
			knockout_button_text_color: string,
			knockout_button_font_family: string,
			knockout_button_border_color: string,
			knockout_button_background_color: string,
			knockout_button_border_radius: number,
		},
		forms: {
			field_height: number,
			placeholder_color: string,
		},
		header: {
			font_color: string,
			border_color: string,
			border_radius: number,
			background_color: string,
			desktop_logo_width: number,
			font_size: number,
		}
	};
};

declare type Countdown = {
	id: number;
	start: number;
	duration: number;
	timeLeft: number;
};
