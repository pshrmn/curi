import createScrollSideEffect from '../src';

describe('createScrollSideEffect', () => {

  let realScroll = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = realScroll;
  });

  it('scrolls to 0 after PUSH', () => {
    const sideEffect = createScrollSideEffect();
    const queryResponse = sideEffect({}, 'PUSH');
    expect(window.scrollTo.mock.calls.length).toBe(1);
  });

  it('scrolls to 0 after REPLACE', () => {
    const sideEffect = createScrollSideEffect();
    const queryResponse = sideEffect({}, 'REPLACE');
    expect(window.scrollTo.mock.calls.length).toBe(1);
  });

  it('does not scroll after POP', () => {
    const sideEffect = createScrollSideEffect();
    const queryResponse = sideEffect({}, 'POP');
    expect(window.scrollTo.mock.calls.length).toBe(0);
  });
});
