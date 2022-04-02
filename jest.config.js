module.exports = {
  globals: {
    STRING_PARSER_DEFAULT: '',
    STRING_PARSER_ENABLED: true,
  },
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/test-functional/'],
  testRegex: '(/__tests__/.*)\\.test\\.[jt]s$',
}
