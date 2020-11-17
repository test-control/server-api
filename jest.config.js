module.exports = {
  roots: [
    './src',
    './tests'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/tests/**/*.spec.+(ts|tsx|js)'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!**/*.d.ts',
    '!src/repositories/**',
    '!src/database/**',
    '!src/aut-types'
  ]
}
