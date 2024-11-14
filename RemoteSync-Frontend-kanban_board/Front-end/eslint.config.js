import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: '@babel/eslint-parser',  // Use Babel parser
      parserOptions: {
        requireConfigFile: false,       // Ensures Babel works without a separate config file
        babelOptions: {
          presets: ['@babel/preset-react'],  // Enables JSX and React syntax
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  js.configs.recommended,  // Recommended JS linting rules
];
