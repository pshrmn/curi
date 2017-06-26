import React from 'react';
import { shallow, mount } from 'enzyme';
import Block from '../src';

describe('Block', () => {
  let confirmationFunction;
  const confirmWith = jest.fn((fn) => {
    confirmationFunction = fn;
  });
  const removeConfirmation = jest.fn();

  const fakeHistory = { confirmWith, removeConfirmation };
  const fakeContext = {
    curi: {
      history: fakeHistory
    }
  };

  afterEach(() => {
    confirmWith.mockClear();
    removeConfirmation.mockClear();
  });

  it('if when=true when mounting, adds block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block when={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('defaults to when=true', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('if when=false when mounting, does not add block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(
      <Block when={false} confirm={confirm} />,
      { context: fakeContext, lifecycleExperimental: true }
    );
    expect(confirmWith.mock.calls.length).toBe(0);
  });

  it('removes block if when goes true->false while updating', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block when={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ when: false });
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it('adds block if when goes false->true while updating', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block when={false} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true });
    expect(confirmWith.mock.calls.length).toBe(1);
  });

  it('resets on block on updates if confirm function', () => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();
    const wrapper = shallow(<Block when={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true, confirm: confirm2 });
    expect(confirmWith.mock.calls.length).toBe(2);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it('does not reset block if both when and message stay the same', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block when={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ when: true, message: 'This is a test' });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
  });

  it('unblocks when unmounting', () => {
    const confirm = jest.fn();
    const wrapper = shallow(
      <Block when={true} confirm={confirm} />,
      { context: fakeContext, lifecycleExperimental: true }
    );
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });
});
