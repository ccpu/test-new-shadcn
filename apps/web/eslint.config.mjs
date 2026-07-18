import nextjsConfig from '@internal/eslint-config/nextjs';

/** @type {import('typescript-eslint').Config} */
const config = [
  ...nextjsConfig,
  {
    ignores: ['.next/**'],
  },
];

export default config;
