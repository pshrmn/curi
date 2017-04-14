import ComponentStore from '../src/ComponentStore';

describe('ComponentStore', () => {
  it('creates a component store with register/get methods', () => {
    const store = ComponentStore();
    expect(store.register).toBeDefined();
    expect(store.get).toBeDefined();
  });

  it('returns the default component if get fails', () => {
    const defaultComponent = () => React.createElement('div');
    const store = ComponentStore(defaultComponent);
    expect(store.get('Something')).toBe(defaultComponent);
  });

  it('returns a component that renders null if no default is provided', () => {
    const store = ComponentStore();
    const fn = store.get('Something');
    expect(fn()).toBe(null);
  });

  it('returns the registered component', () => {
    const defaultComponent = () => React.createElement('div');
    const SomethingComponent = () => React.createElement('span');
    const store = ComponentStore(defaultComponent);
    store.register('Something', SomethingComponent);
    expect(store.get('Something')).toBe(SomethingComponent);
  });
});
