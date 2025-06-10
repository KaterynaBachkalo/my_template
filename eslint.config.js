import js from '@eslint/js';
import html from 'eslint-plugin-html';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

// Створюємо екземпляр FlatCompat
const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('eslint:recommended'),
  {
    files: ['**/*.js', '**/*.html'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      js,
      html,
    },
  },
];
