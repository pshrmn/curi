import 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import curious from '../src/curious';

describe('curious', () => {
  it('passes the router object as the "router" prop to wrapped component', () => {
    const fakeRouter = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    const TestComponent = curious(() => null);

    const wrapper = shallow(<TestComponent />, {
      context: { curi: { router: fakeRouter, response: fakeResponse } }
    });
    expect(wrapper.prop('router')).toBe(fakeRouter);
  });

  it('passes the response object as the "response" prop to wrapped component', () => {
    const fakeRouter = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    const TestComponent = curious(() => null);

    const wrapper = shallow(<TestComponent />, {
      context: { curi: { router: fakeRouter, response: fakeResponse } }
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
    const fakeRouter = { history: {} };
    const fakeResponse = { name: 'Home', status: 200 };
    class TestComponent extends React.Component {
      render() {
        return null;
      }
    }
    const Wrapped = curious(TestComponent);

    let ref;
    const wrapper = mount(<Wrapped internalRef={node => (ref = node)} />, {
      context: { curi: { router: fakeRouter, response: fakeResponse } }
    });
    expect(ref).toBeInstanceOf(TestComponent);
    const wrappedTest = wrapper.find(TestComponent);
    const node = wrappedTest.instance();
    expect(ref).toBe(node);
  });
});
