const util = require('util');

module.exports = {
  rootDir: './src',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '__mocks__', 'coverage', 'client.js', 'server.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: util.TextEncoder // required for renderToString in Html.spec.jsx
  }
};
