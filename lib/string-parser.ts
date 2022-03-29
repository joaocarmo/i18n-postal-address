import postal from 'node-postal'
import PostalAddressError from './postal-address-error'
import libpostalMap from './address-mappings'
import { parseLibpostal } from './address-parsers'
import type { ParserOutput, Parsers } from './types/address-format'

interface StringParserConfig {
  parser: Parsers
}

class StringParser {
  private parser: Parsers

  private previousInput: string = ''

  private previousOutput: ParserOutput = {}

  constructor(config: StringParserConfig) {
    if (!config?.parser) {
      throw new PostalAddressError('No parser specified')
    }

    this.parser = config.parser
  }

  public parse(input: string): ParserOutput {
    if (!input) {
      throw new PostalAddressError('No input specified to parse')
    }

    if (this.previousInput === input) {
      return this.previousOutput
    }

    switch (this.parser) {
      case 'libpostal': {
        const result = postal.parser.parse_address(input)
        this.previousOutput = parseLibpostal(libpostalMap, result)
        break
      }
      default:
        throw new PostalAddressError(`Unsupported parser: ${this.parser}`)
    }

    return this.previousOutput
  }
}

export default StringParser
