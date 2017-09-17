import { getConfig, setConfig } from '../src/config';

describe('setConfig/getConfig', () => {
  it('setConfig sets the internal config value and getConfig returns it', () => {
    expect(getConfig()).toBeUndefined();
    const testConfig = { test: true };
    setConfig(testConfig);
    expect(getConfig()).toBe(testConfig);
  });
});
