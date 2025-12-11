export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  transform: {
    '^.+\\.[cm]?js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};


