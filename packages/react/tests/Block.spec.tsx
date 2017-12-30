import 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Block from '../src/Block';
import curi from '@curi/core';
import InMemory from '@hickory/in-memory';

describe('Block', () => {
  let confirmationFunction;
  const confirmWith = jest.fn(fn => {
    confirmationFunction = fn;
  });
  const removeConfirmation = jest.fn();

  const history = InMemory();
  // overwrite with jest
  history.confirmWith = confirmWith;
  history.removeConfirmation = removeConfirmation;
  const router = curi(history, []);
  const fakeContext = {
    curi: { router }
  };

  afterEach(() => {
    confirmWith.mockClear();
    removeConfirmation.mockClear();
  });

  describe('curi', () => {
    it('can use curi from props', () => {
      const confirm = jest.fn();
      const wrapper = shallow(
        <Block active={true} confirm={confirm} curi={router} />,
        { lifecycleExperimental: true }
      );
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(confirmWith.mock.calls[0][0]).toBe(confirm);
    });

    it('can use curi from context', () => {
      const confirm = jest.fn();
      const wrapper = shallow(<Block active={true} confirm={confirm} />, {
        context: fakeContext,
        lifecycleExperimental: true
      });
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(confirmWith.mock.calls[0][0]).toBe(confirm);
    });

    it('prefers props over context', () => {
      const confirm = jest.fn();
      // a second router object to be passed through the context
      const secondHistory = InMemory();
      const secondConfirmWith = jest.fn();
      secondHistory.confirmWith = secondConfirmWith;
      const secondrouter = curi(secondHistory, []);
      const fakeContext = {
        curi: secondrouter
      };

      const wrapper = shallow(
        <Block active={true} confirm={confirm} curi={router} />,
        {
          context: fakeContext,
          lifecycleExperimental: true
        }
      );
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(secondConfirmWith.mock.calls.length).toBe(0);
      expect(confirmWith.mock.calls[0][0]).toBe(confirm);
    });

    it('errors if it cannot access a curi router', () => {
      const err = console.error;
      console.error = () => {};

      expect(() => {
        const confirm = jest.fn();
        const wrapper = shallow(<Block active={true} confirm={confirm} />);
      }).toThrow();

      console.error = err;
    });
  });

  it('if active=true when mounting, adds block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('defaults to active=true', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('if active=false when mounting, does not add block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={false} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(0);
  });

  it('removes block if active goes true->false while updating', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ active: false });
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it('adds block if active goes false->true while updating', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={false} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(0);
    wrapper.setProps({ active: true });
    expect(confirmWith.mock.calls.length).toBe(1);
  });

  it('resets on block on updates if confirm function', () => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();
    const wrapper = shallow(<Block active={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ active: true, confirm: confirm2 });
    expect(confirmWith.mock.calls.length).toBe(2);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it('does not reset block if both active and message stay the same', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.setProps({ active: true, message: 'This is a test' });
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
  });

  it('unblocks when unmounting', () => {
    const confirm = jest.fn();
    const wrapper = shallow(<Block active={true} confirm={confirm} />, {
      context: fakeContext,
      lifecycleExperimental: true
    });
    expect(removeConfirmation.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });
});
