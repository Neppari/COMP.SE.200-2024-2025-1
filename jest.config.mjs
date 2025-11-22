export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  transform: {
    '^.+\\.[cm]?js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
};


