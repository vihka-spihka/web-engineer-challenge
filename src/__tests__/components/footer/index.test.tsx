import { shallow } from 'enzyme';
import { Footer } from './../../../components/footer';

describe('Footer', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper).toMatchSnapshot();
	});
});
