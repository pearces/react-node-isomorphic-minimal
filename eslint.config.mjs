import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';
import jestplugin from 'eslint-plugin-jest';
import configPrettier from 'eslint-config-prettier/flat';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs['recommended-latest'],
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
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
      jest: jestplugin
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': [1, { custom: 'ignore' }],
      'react/require-default-props': [1, { functions: 'defaultArguments' }],
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'prettier/prettier': 'error'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx']
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
