import { LIB_VERSION } from './version';
import packageJson from '../package.json' with { type: 'json' };

describe('Version Module', () => {
  it('should export a LIB_VERSION constant', () => {
    expect(LIB_VERSION).toBeDefined();
  });

  it('should match the version specified in package.json', () => {
    expect(LIB_VERSION).toBe(packageJson.version);
  });
});
