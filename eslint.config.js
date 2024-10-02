import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  pluginCypress.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    ignores: [
      './node_modules',
      './package-lock.json',
      './dist',
      // ... any additional patterns to ignore
    ],
  },
  pluginJs.configs.recommended,
];
