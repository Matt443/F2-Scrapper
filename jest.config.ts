import type { Config } from 'jest';
const config: Config = {
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts}', '!src/index.ts'],
    coverageReporters: ['json', 'lcov', 'text'],
    coverageDirectory: 'coverage'
};

export default config;
