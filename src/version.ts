import packageJson from '../package.json' with { type: 'json' };
export const LIB_VERSION: string = packageJson.version;
