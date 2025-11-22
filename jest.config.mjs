export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  // Treat project .js files as ES modules so Jest runs them correctly
  extensionsToTreatAsEsm: ['.js'],
};


