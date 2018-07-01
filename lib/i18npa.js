import addressFormats from './address-formats'
import addressParsers from './address-parsers'

class PostalAddress {
  constructor() {
    // Possible values: 'array', 'string'
    this.outputFormat = 'array'
    // 2 letter country code
    this.formatForCountry = 'US'
    // Possible values: 'business', 'english', 'default', 'french', 'personal'
    this.formatForType = 'default'
    // The object properties that can be set
    this.object = {
      address1: '',
      address2: '',
      addressNum: '',
      city: '',
      companyName: '',
      country: '',
      countryAlpha2: '',
      do: '',
      dong: '',
      firstLastName: '',
      firstName: '',
      gu: '',
      honorific: '',
      jobTitle: '',
      lastName: '',
      postalCode: '',
      prefecture: '',
      province: '',
      region: '',
      republic: '',
      secondLastName: '',
      secondName: '',
      si: '',
      state: '',
      title: '',
    }
    // Validator functions
    this.validators = {
      outputFormat: value => this.allowed.outputFormat.includes(value),
      formatForCountry: value => true,
      formatForType: value => this.allowed.formatForType.includes(value),
    }
    // Allowed values
    this.allowed = {
      outputFormat: ['array', 'string'],
      formatForCountry: [],
      formatForType: ['business', 'english', 'default', 'french', 'personal'],
    }
    // Address formats
    this.addressFormats = addressFormats
    // Parsers
    this.addressParsers = addressParsers
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
      } else {
        if (typeof this[property] === 'string') {
          this[property] = this.validator(property, newValue, object)
        }
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

  setAddressNum(value) {
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

  setFormat({ country, type }) {
    this.setProperty('formatForCountry', country, false)
    this.setProperty('formatForType', type, false)
  }

  getFormat() {
    const {
      outputFormat, formatForCountry, formatForType, addressFormats,
    } = this
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
    if (outputType[outputFormat]) {
      return outputType[outputFormat]
    } else if (outputType.array) {
      return outputType.array
    }
  }

  getParser() {
    const { outputFormat, addressParsers } = this
    if (addressParsers[outputFormat]) {
      return addressParsers[outputFormat]
    }
  }

  output() {
    const outputFormat = this.getFormat()
    const outputParser = this.getParser()
    if (typeof outputParser === 'function' && outputFormat) {
      return outputParser(this.object, outputFormat)
    }
  }

  toString() {
    const output = this.output()
    if (output) {
      return output.map(part => part.join(' ')).join('\n')
    }
  }

  raw() {
    return this.object
  }
}

export default PostalAddress
