import 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import curious from '../src/curious';

describe('curious', () => {
  it('passes the config object as the "curi" prop to wrapped component', () => {
    const fakeConfig = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    const TestComponent = curious(() => null);

    const wrapper = shallow(<TestComponent />, {
      context: { curi: fakeConfig, curiResponse: fakeResponse }
    });
    expect(wrapper.prop('curi')).toBe(fakeConfig);
  });

  it('passes the response object as the "response" prop to wrapped component', () => {
    const fakeConfig = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    const TestComponent = curious(() => null);

    const wrapper = shallow(<TestComponent />, {
      context: { curi: fakeConfig, curiResponse: fakeResponse }
    });
    expect(wrapper.prop('response')).toBe(fakeResponse);
  });

  it("hoists wrapped component's static properties", () => {
    class TestComponent extends React.Component {
      render() {
        return null;
      }
    }
    TestComponent.testStatic = '1 2 3!';
    const wrapped = curious(TestComponent);
    expect(wrapped.testStatic).toBe('1 2 3!');
  });

  it('passes internalRef prop as ref of wrapped component', () => {
    const fakeConfig = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    class TestComponent extends React.Component {
      render() {
        return null;
      }
    }
    const Wrapped = curious(TestComponent);

    let ref;
    const wrapper = mount(<Wrapped internalRef={node => (ref = node)} />, {
      context: { curi: fakeConfig, curiResponse: fakeResponse }
    });
    expect(ref).toBeInstanceOf(TestComponent);
    const wrappedTest = wrapper.find(TestComponent);
    expect(ref).toBe(wrappedTest.node);
  });
});
