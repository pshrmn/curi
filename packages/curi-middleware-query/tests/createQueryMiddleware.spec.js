import qs from 'qs';
import createQueryMiddleware from '../src';

describe('createQueryMiddleware', () => {
  it('returns a middleware function', () => {
    const middleware = createQueryMiddleware(qs.parse);
    expect(typeof middleware).toBe('function');
  });

  it('returned function adds a query property to response', () => {
    const middleware = createQueryMiddleware(qs.parse);
    const fakeResponse = { location: { search: '?one=two&three=four' } };

    const queryResponse = middleware(fakeResponse);
    expect(queryResponse.query).toEqual({ one: 'two', three: 'four' });
  });

  it('returned function removes leading question mark', () => {
    const middleware = createQueryMiddleware(qs.parse);
    const fakeResponse = { location: { search: '?one=two&three=four' } };

    const queryResponse = middleware(fakeResponse);
    // this would exist if the question mark wasn't stripped
    expect(queryResponse.query['?one']).toBeUndefined();
  });
});
