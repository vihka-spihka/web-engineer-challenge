import helpers from './../../helpers';

describe('Helpers', () => {
	let jsonSpy: jest.SpyInstance;
	const globalFetch = global.fetch;

	beforeEach(() => {
		jsonSpy = jest.fn();

		global.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({json: jsonSpy});
		});
	});

	it('should call fetch with correct data', async () => {
		await helpers.fetchData('url', 'GET');
		expect(global.fetch).toHaveBeenCalledWith('url', {method: 'GET'});
	});

	it('should call json() on fetchData call', async () => {
		await helpers.fetchData('url', 'GET');
		expect(jsonSpy).toHaveBeenCalled();
	});

	afterAll(() => {
		global.fetch = globalFetch;
	});
});
