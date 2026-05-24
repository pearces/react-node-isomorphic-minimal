import type { Config } from 'jest';
import util from 'util';

const config: Config = {
  preset: 'ts-jest',
  rootDir: './src',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__mocks__',
    'coverage',
    'client.tsx',
    'client.ts',
    'client.js',
    'server.tsx',
    'server.ts',
    'server.js'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts'
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: util.TextEncoder // required for renderToString in Html.spec.jsx
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

export default config;
