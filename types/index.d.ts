declare type InputValue = string | number;

declare type Theme = {
	[key: string]: unknown;
}&{
	data: {
		global: {
			body_color: string
		}
	};
};

declare type Countdown = {
	id: number;
	start: number;
	duration: number;
	timeLeft: number;
};
