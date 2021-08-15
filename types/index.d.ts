declare type InputValue = string | number;

declare type Theme = {
	[key: string]: string | number;
  data: object
};

declare type Countdown = {
	id: number;
	start: number;
	duration: number;
	timeLeft: number;
};
