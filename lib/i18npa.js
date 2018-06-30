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
    this.address1 = ''
    this.address2 = ''
    this.city = ''
    this.companyName = ''
    this.country = ''
    this.do = ''
    this.dong = ''
    this.firstLastName = ''
    this.firstName = ''
    this.gu = ''
    this.honorific = ''
    this.jobTitle = ''
    this.lastName = ''
    this.postalCode = ''
    this.prefecture = ''
    this.province = ''
    this.region = ''
    this.republic = ''
    this.secondLastName = ''
    this.secondName = ''
    this.si = ''
    this.state = ''
    this.title = ''
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

  validator(property, newValue) {
    const oldValue = this[property]
    const validatorFn = this.validators[property]
    if (typeof validatorFn === 'function') {
      if (validatorFn(newValue)) {
        return newValue
      }
      return oldValue
    }
    return newValue
  }

  setProperty(property, newValue) {
    if (typeof newValue === 'string' && typeof this[property] === 'string') {
      this[property] = this.validator(property, newValue)
    }
  }

  setAddress(newValue) {
		this.setProperty('address1', newValue)
	}

  setAddress1(newValue) {
		this.setProperty('address1', newValue)
	}

  setAddress2(newValue) {
		this.setProperty('address2', newValue)
	}

  setCity(newValue) {
		this.setProperty('city', newValue)
	}

  setCompanyName(newValue) {
		this.setProperty('companyName', newValue)
	}

  setCountry(newValue) {
		this.setProperty('country', newValue)
	}

  setDo(newValue) {
		this.setProperty('do', newValue)
	}

  setDong(newValue) {
		this.setProperty('dong', newValue)
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
	}

  setState(newValue) {
		this.setProperty('state', newValue)
	}

  setTitle(newValue) {
		this.setProperty('title', newValue)
	}

  setOutputFormat(string) {
    this.setProperty('outputFormat', string)
  }

  setFormat({ country, type }) {
    this.setProperty('formatForCountry', country)
    this.setProperty('formatForType', type)
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
      return outputParser(this, outputFormat)
    }
  }

  raw() {
    return this
  }
}

export default PostalAddress
