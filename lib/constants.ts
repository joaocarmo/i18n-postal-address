export const OUTPUT_ARRAY = 'array'
export const OUTPUT_STRING = 'string'
export const PARSER_ARRAY = 'array'
export const PARSER_STRING = 'string'
export const FORMAT_BUSINESS = 'business'
export const FORMAT_DEFAULT = 'default'
export const FORMAT_ENGLISH = 'english'
export const FORMAT_FRENCH = 'french'
export const FORMAT_PERSONAL = 'personal'
export const DEFAULT_OUTPUT_FORMAT = OUTPUT_ARRAY
export const DEFAULT_OUTPUT_PARSER = PARSER_ARRAY
export const DEFAULT_FORMAT_FOR_COUNTRY = 'US'
export const DEFAULT_FORMAT_FOR_TYPE = FORMAT_DEFAULT
export const DEFAULT_USE_TRANSFORMS = true
export const ALLOWED_FORMAT_FOR_TYPE = [
  FORMAT_BUSINESS,
  FORMAT_DEFAULT,
  FORMAT_ENGLISH,
  FORMAT_FRENCH,
  FORMAT_PERSONAL,
]
export const ALLOWED_OUTPUT_FORMAT = [OUTPUT_ARRAY, OUTPUT_STRING]
export const ALLOWED_OUTPUT_PARSER = [PARSER_ARRAY, PARSER_STRING]
export const JOIN_FIRST_SEPARATOR = ' '
export const JOIN_SECOND_SEPARATOR = '\n'
export const ERROR_REQUIRED_COUNTRY =
  'Country is not specified, but is required'
export const ERROR_INVALID_COUNTRY = 'Country is not an ISO 3166-1 alpha-2 code'
export const ERROR_REQUIRED_FORMAT = 'Format is not specified, but is required'
export const ERROR_INVALID_FORMAT =
  'Format is invalid, should be an array of arrays of strings or objects'
export const ERROR_INVALID_TOKENS = 'Format contains invalid tokens'
export const ERROR_INVALID_STRING = 'Expected a valid, non-empty string value'
