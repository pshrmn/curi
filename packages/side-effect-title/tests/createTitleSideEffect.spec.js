import createTitleSideEffect from '../src';

describe('createTitleSideEffect', () => {
  it('returned function sets document.title using response.title', () => {
    const sideEffect = createTitleSideEffect();
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = sideEffect(fakeResponse);
    expect(document.title).toBe('Test Title; Please Ignore');
  });

  it('prepends the prefix before the title', () => {
    const sideEffect = createTitleSideEffect({ prefix: 'My Site |' });
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = sideEffect(fakeResponse);
    expect(document.title).toBe('My Site | Test Title; Please Ignore');
  });

  it('appends the suffix after the title', () => {
    const sideEffect = createTitleSideEffect({ suffix: '| My Site' });
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = sideEffect(fakeResponse);
    expect(document.title).toBe('Test Title; Please Ignore | My Site');
  });
});
