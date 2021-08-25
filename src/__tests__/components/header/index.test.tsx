import { shallow } from 'enzyme';
import { Header } from './../../../components/header';

describe('Header', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper).toMatchSnapshot();
	});
});
