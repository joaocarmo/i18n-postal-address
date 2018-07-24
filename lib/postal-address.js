// Import modules and constants
import allAddressFormats from './address-formats'
import allAddressParsers from './address-parsers'
import countries from './countries'
import objectInitialState from './object-initial-state'

class PostalAddress {
  constructor() {
    // Possible values: 'array', 'string'
    this.outputFormat = 'array'
    // 2 letter country code
    this.formatForCountry = 'US'
    // Possible values: 'business', 'english', 'default', 'french', 'personal'
    this.formatForType = 'default'
    // Transform input data or keep it as is
    this.useTransforms = true
    // The object properties that can be set
    this.object = { ...objectInitialState }
    // Validator functions
    this.validators = {
      formatForCountry: value => this.allowed.formatForCountry.includes(value),
      formatForType: value => this.allowed.formatForType.includes(value),
      outputFormat: value => this.allowed.outputFormat.includes(value),
    }
    // Allowed values
    this.allowed = {
      formatForCountry: Object.keys(allAddressFormats),
      formatForType: ['business', 'default', 'english', 'french', 'personal'],
      outputFormat: ['array', 'string'],
    }
    // Address formats
    this.addressFormats = allAddressFormats
    // Parsers
    this.addressParsers = allAddressParsers
  }

  validator(property, newValue, object = true) {
    let oldValue = ''

    if (object) {
      oldValue = this.object[property]
    } else {
      oldValue = this[property]
    }
    const validatorFn = this.validators[property]

    if (typeof validatorFn === 'function') {
      if (validatorFn(newValue)) {
        return newValue
      }
      return oldValue
    }
    return newValue
  }

  setProperty(property, newValue, object = true) {
    if (typeof newValue === 'string') {
      if (object) {
        if (typeof this.object[property] === 'string') {
          this.object[property] = this.validator(property, newValue, object)
        }
      } else if (typeof this[property] === 'string') {
        this[property] = this.validator(property, newValue, object)
      }
    }
  }

  setAddress(newValue) {
		this.setAddress1(newValue)
	}

  setAddress1(newValue) {
		this.setProperty('address1', newValue)
    this.setProperty('dong', newValue)
	}

  setAddress2(newValue) {
		this.setProperty('address2', newValue)
	}

  setAddressNum(newValue) {
    this.setProperty('addressNum', newValue)
  }

  setCity(newValue) {
		this.setProperty('city', newValue)
    this.setProperty('si', newValue)
	}

  setCompanyName(newValue) {
		this.setProperty('companyName', newValue)
	}

  setCountry(newValue) {
		this.setProperty('country', newValue)
    const countryAlpha2 = countries[newValue]

    if (countryAlpha2) {
      this.setProperty('countryAlpha2', countryAlpha2)
    }
	}

  setDo(newValue) {
		this.setProperty('do', newValue)
    this.setProperty('province', newValue)
	}

  setDong(newValue) {
		this.setProperty('dong', newValue)
    this.setProperty('address1', newValue)
	}

  setFirstLastName(newValue) {
		this.setProperty('firstLastName', newValue)
	}

  setFirstName(newValue) {
		this.setProperty('firstName', newValue)
	}

  setGu(newValue) {
		this.setProperty('gu', newValue)
	}

  setHonorific(newValue) {
		this.setProperty('honorific', newValue)
	}

  setJobTitle(newValue) {
		this.setProperty('jobTitle', newValue)
	}

  setLastName(newValue) {
		this.setProperty('lastName', newValue)
    this.setProperty('secondLastName', newValue)
	}

  setPostalCode(newValue) {
		this.setProperty('postalCode', newValue)
	}

  setPrefecture(newValue) {
		this.setProperty('prefecture', newValue)
	}

  setProvince(newValue) {
		this.setProperty('province', newValue)
    this.setProperty('do', newValue)
	}

  setRegion(newValue) {
		this.setProperty('region', newValue)
	}

  setRepublic(newValue) {
		this.setProperty('republic', newValue)
	}

  setSecondLastName(newValue) {
		this.setProperty('secondLastName', newValue)
    this.setProperty('lastName', newValue)
	}

  setSecondName(newValue) {
		this.setProperty('secondName', newValue)
	}

  setSi(newValue) {
		this.setProperty('si', newValue)
    this.setProperty('city', newValue)
	}

  setState(newValue) {
		this.setProperty('state', newValue)
	}

  setTitle(newValue) {
		this.setProperty('title', newValue)
	}

  setOutputFormat(string) {
    this.setProperty('outputFormat', string, false)
  }

  setFormat({ country, type, useTransforms }) {
    if (typeof country === 'string') {
      this.setProperty('formatForCountry', country, false)
    }
    if (typeof type === 'string') {
      this.setProperty('formatForType', type, false)
    }
    if (typeof useTransforms === 'boolean') {
      this.useTransforms = useTransforms
    }
  }

  getFormat(overrideFormat) {
    const {
      outputFormat, formatForCountry, formatForType, addressFormats,
    } = this
    const format = overrideFormat || outputFormat
    let formatsAvailable = addressFormats[formatForCountry]

    if (!formatsAvailable) {
      // Default to the US format
      formatsAvailable = addressFormats.US
    }
    let outputType = {}

    if (formatsAvailable[formatForType]) {
      outputType = formatsAvailable[formatForType]
    } else if (formatsAvailable.default) {
      outputType = formatsAvailable.default
    }
    if (outputType[format]) {
      return outputType[format]
    } else if (outputType.array) {
      return outputType.array
    }
    return null
  }

  getParser(overrideFormat) {
    const { outputFormat, addressParsers } = this
    const format = overrideFormat || outputFormat

    if (addressParsers[format]) {
      return addressParsers[format]
    }
    return null
  }

  output(overrideFormat) {
    const { useTransforms } = this

    const outputFormat = this.getFormat(overrideFormat)
    const outputParser = this.getParser(overrideFormat)

    if (typeof outputParser === 'function' && outputFormat) {
      return outputParser(this.object, outputFormat, useTransforms)
    }
    return null
  }

  toString() {
    const output = this.output('array')

    if (output) {
      return output.map(part => part.join(' ')).join('\n')
    }
    return null
  }

  raw() {
    return this.object
  }
}

export default PostalAddress
