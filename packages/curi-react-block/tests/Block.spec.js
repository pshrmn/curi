import React from 'react';
import { shallow, mount } from 'enzyme';
import Block from '../src';

describe('Block', () => {
  const unblock = jest.fn();
  const block = jest.fn(() => {
    return unblock;
  });

  const fakeHistory = { block };
  const fakeContext = {
    curi: {
      history: fakeHistory
    }
  };

  afterEach(() => {
    unblock.mockClear();
    block.mockClear();
  });

  it('calls history.block when mounting if when is true', () => {
    const message = 'This is a test';
    const wrapper = shallow(<Block when={true} message={message} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(block.mock.calls.length).toBe(1);
    expect(block.mock.calls[0][0]).toBe(message);
  });

  it('defaults to when=true', () => {
    const message = 'This is a only a test';
    const wrapper = shallow(<Block message={message} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(block.mock.calls.length).toBe(1);
    expect(block.mock.calls[0][0]).toBe(message);
  });

  it('does not call history.block when mounting if when is false', () => {
    const wrapper = shallow(
      <Block when={false} message="This is not a test" />,
      { context: fakeContext, lifecycleExperimental: true }
    );
    expect(block.mock.calls.length).toBe(0);
  });

  it('turns off block if when goes true->false while updating', () => {
    const wrapper = shallow(<Block when={true} message="This is a test" />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(unblock.mock.calls.length).toBe(0);
    wrapper.setProps({ when: false });
    expect(unblock.mock.calls.length).toBe(1);
  });

  it('turns on block if when goes false->true while updating', () => {
    const wrapper = shallow(<Block when={false} message="This is a test" />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(block.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true });
    expect(block.mock.calls.length).toBe(1);
  });

  it('resets on block on updates if message changes', () => {
    const wrapper = shallow(<Block when={true} message="This is a test" />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(block.mock.calls.length).toBe(1);
    expect(unblock.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true, message: 'This is also a test' });
    expect(block.mock.calls.length).toBe(2);
    expect(unblock.mock.calls.length).toBe(1);
  });

  it('does not reset block if both when and message stay the same', () => {
    const wrapper = shallow(<Block when={true} message="This is a test" />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(block.mock.calls.length).toBe(1);
    expect(unblock.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true, message: 'This is a test' });
    expect(block.mock.calls.length).toBe(1);
    expect(unblock.mock.calls.length).toBe(0);
  });

  it('unblocks when unmounting', () => {
    const wrapper = shallow(
      <Block when={true} message="This test is complete" />,
      { context: fakeContext, lifecycleExperimental: true }
    );
    expect(unblock.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(unblock.mock.calls.length).toBe(1);
  });
});
