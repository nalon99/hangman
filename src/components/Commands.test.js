jest.mock("../services/WordService");

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Commands } from './Commands';

Enzyme.configure({ adapter: new Adapter() });

describe("Testing the Command component...", () => {

    test("the number of button found is 2", () => {
        const wrapper = shallow(<Commands />);
        const buttons = wrapper.find("button");
        expect(buttons).toHaveLength(2);
    });

    test("the start button is initially enabled", () => {
        const wrapper = shallow(<Commands />);
        const startButton = wrapper.find("button.startButton");
        expect(startButton.props().disabled).toBeFalsy();
    });

    test("the start button is disabled when clicked", async () => {
        const wrapper = mount(<Commands />);
        let startButton = wrapper.find("button.startButton");
        startButton.simulate("click");
        await tick();
        startButton = wrapper.update().find("button.startButton");
        expect(startButton.props().disabled).toBeTruthy();
    });
    
    function tick() {
        return new Promise(resolve => {
            setImmediate(() => {
                resolve(0);
            });
        })
      }    
});
