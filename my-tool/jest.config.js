// jest.config.js
module.exports = { 
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-markdown)/)',
  ],
  extensionsToTreatAsEsm: ['.jsx'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
