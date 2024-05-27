import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: [
      './node_modules',
      './package-lock.json',
      './dist',
      // ... any additional patterns to ignore
    ],
  },
  pluginJs.configs.recommended,
];
