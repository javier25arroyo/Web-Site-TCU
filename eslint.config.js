import js from '@eslint/js';
import globals from 'globals';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
];