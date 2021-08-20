const fetchData = (
	url: string,
	method: string,
	headers?: {[key: string]: string}
) => {
	return fetch(url, {
		method,
		headers,
	}).then(res => res.json());
};

export default { fetchData };
