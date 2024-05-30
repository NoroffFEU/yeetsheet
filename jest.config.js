export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const transform = {
  '^.+\\.(js|jsx)$': 'babel-jest',
};
export const transformIgnorePatterns = ['/node_modules/(?!(some-library)/)'];
