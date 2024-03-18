import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.polyfills.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 10000,
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  collectCoverageFrom: ['./src/components/user/**/*.{ts,tsx}'],
  transformIgnorePatterns: [
    'node_modules/?!(query-string)/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

const jestConfig = async () => {
  const configFn = createJestConfig(customJestConfig);
  const config = await configFn();

  return {
    ...config,
    transformIgnorePatterns: [
      'node_modules/?!(query-string)/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  };
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = jestConfig;
