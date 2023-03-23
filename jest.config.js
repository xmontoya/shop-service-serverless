/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest")
const {
    compilerOptions,
} = require("./tsconfig.paths.json")

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/'
  ],
  modulePaths: ['./src'],
  moduleNameMapper: {
    '^@productFunctions/(.*)$': '<rootDir>/product-service/src/functions/$1',
    '^@productLibs/(.*)$': '<rootDir>/product-service/src/libs/$1',
    '^@importFunctions/(.*)$': '<rootDir>/import-service/src/functions/$1',
    '^@importLibs/(.*)$': '<rootDir>/import-service/src/libs/$1',
  },
};