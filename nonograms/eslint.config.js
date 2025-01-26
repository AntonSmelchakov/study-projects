import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
];
