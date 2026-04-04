import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jestplugin from 'eslint-plugin-jest';
import configPrettier from 'eslint-config-prettier/flat';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  reactPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...jestplugin.environments.globals.globals
      }
    },
    plugins: {
      react: reactPlugin,
      jest: jestplugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': [1, { custom: 'ignore' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'prettier/prettier': 'error',
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...tsPlugin.configs.recommended.rules
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        typescript: {
          project: './tsconfig.json'
        },
        webpack: {
          config: 'webpack.config.js'
        }
      },
      react: {
        version: 'detect'
      }
    }
  },
  prettierRecommended,
  configPrettier
];
