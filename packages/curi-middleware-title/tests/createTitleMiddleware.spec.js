import createTitleMiddleware from '../src';

describe('createTitleMiddleware', () => {
  it('returned function sets document.title using response.title', () => {
    const middleware = createTitleMiddleware();
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = middleware(fakeResponse);
    expect(document.title).toBe('Test Title; Please Ignore');
  });

  it('prepends the prefix before the title', () => {
    const middleware = createTitleMiddleware({ prefix: 'My Site |' });
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = middleware(fakeResponse);
    expect(document.title).toBe('My Site | Test Title; Please Ignore');
  });

  it('appends the suffix after the title', () => {
    const middleware = createTitleMiddleware({ suffix: '| My Site' });
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = middleware(fakeResponse);
    expect(document.title).toBe('Test Title; Please Ignore | My Site');
  });

  it('returns the response', () => {
    const middleware = createTitleMiddleware();
    const fakeResponse = {
      title: 'Test Title; Please Ignore'
    };

    const queryResponse = middleware(fakeResponse);
    expect(queryResponse).toMatchObject(fakeResponse);
  });
});
