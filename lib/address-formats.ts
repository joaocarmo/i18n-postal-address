import { AddressFormats } from './types/address-format'
import { addCommaAfter, capitalize } from './address-transforms'

const addressFormats: AddressFormats = {
  // Argentina
  AR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'firstLastName'],
        ['secondLastName'],
        ['companyName'],
        ['address1', 'address2'],
        ['postalCode', 'city'],
        ['state'],
        ['country'],
      ],
    },
  },
  // Australia
  AU: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [addCommaAfter] },
          'state',
          'postalCode',
        ],
        ['country'],
      ],
    },
  },
  // Bulgaria
  BG: {
    default: {
      array: [
        ['country'],
        ['state'],
        ['postalCode', 'city'],
        ['address1'],
        ['address2'],
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
      ],
    },
  },
  // Brazil
  BR: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['address1', 'address2'],
        ['postalCode', 'city', 'state'],
        ['country'],
      ],
    },
  },
  // Canada
  CA: {
    english: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['address1', 'address2'],
        [
          { attribute: 'city', transforms: [addCommaAfter] },
          'province',
          'postalCode',
        ],
        ['country'],
      ],
    },
    french: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['address1', 'address2'],
        ['city', 'province'],
        ['postalCode'],
        ['country'],
      ],
    },
  },
  // Switzerland
  CH: {
    default: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['address1', 'address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // China
  CN: {
    default: {
      array: [
        ['country'],
        ['province', 'city'],
        ['address1', 'address2'],
        ['companyName'],
        ['lastName', 'firstName', 'honorific'],
      ],
    },
  },
  // Czechia
  CZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Germany
  DE: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'title', 'firstName', 'lastName'],
        ['address1'],
        ['address2'],
        [''],
        ['countryAlpha2', 'postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Denmark
  DK: {
    default: {
      array: [
        ['honorific', 'title', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['countryAlpha2', 'postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Spain
  ES: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'firstLastName'],
        ['secondLastName'],
        ['companyName'],
        ['address1', 'address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Finland
  FI: {
    default: {
      array: [
        ['title', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // France
  FR: {
    default: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Greece
  GR: {
    default: {
      array: [
        ['title', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Croatia
  HR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Hungary
  HU: {
    business: {
      array: [
        ['honorific', 'lastName', 'firstName', 'secondName'],
        ['companyName'],
        ['postalCode', 'city'],
        ['address1'],
        ['address2'],
        ['state'],
        ['country'],
      ],
    },
    default: {
      array: [
        ['honorific', 'lastName', 'firstName'],
        ['city'],
        ['address1', 'address2'],
        ['postalCode'],
        ['state'],
        ['country'],
      ],
    },
  },
  // Italy
  IT: {
    default: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['address1', 'address2'],
        [''],
        ['countryAlpha2', 'postalCode', 'city', 'province'],
        ['country'],
      ],
    },
  },
  // Japan,
  JP: {
    default: {
      array: [
        ['country'],
        ['postalCode', 'prefecture', 'city'],
        ['address1', 'address2'],
        ['companyName'],
        ['lastName', 'firstName', 'honorific'],
      ],
    },
  },
  // South Korea,
  KR: {
    default: {
      array: [
        ['country'],
        ['do', 'si', 'dong', 'gu', 'addressNum'],
        ['companyName'],
        ['lastName', 'firstName', 'honorific'],
      ],
    },
  },
  // Malaysia
  MY: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['state', 'country'],
      ],
    },
  },
  // Netherlands
  NL: {
    business: {
      array: [
        ['companyName'],
        ['t.a.v.', 'title', 'firstName', 'secondName', 'lastName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
    default: {
      array: [
        ['title', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Norway
  NO: {
    business: {
      array: [
        ['companyName'],
        ['address1'],
        ['firstName', 'lastName'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
    personal: {
      array: [
        ['jobTitle', 'firstName', 'lastName'],
        ['address1', 'address2'],
        [
          'postalCode',
          {
            attribute: 'city',
            transforms: [capitalize],
          },
        ],
        ['country'],
      ],
    },
  },
  // Poland
  PL: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Portugal
  PT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
  },
  // Romania
  RO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['state'],
        ['country'],
      ],
    },
  },
  // Russia
  RU: {
    default: {
      array: [
        ['country'],
        ['republic', 'state', 'region', 'city'],
        ['address1'],
        ['address2'],
        ['companyName'],
        ['lastName'],
        ['firstName', 'secondName'],
      ],
    },
  },
  // Sweden
  SE: {
    business: {
      array: [
        ['companyName'],
        ['firstName', 'lastName'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['country'],
      ],
    },
    personal: {
      array: [
        ['jobTitle', 'firstName', 'lastName'],
        ['address1', 'address2'],
        [
          'postalCode',
          {
            attribute: 'city',
            transforms: [capitalize],
          },
        ],
        ['country'],
      ],
    },
  },
  // Turkey
  TR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        [{ attribute: 'postalCode', transforms: [addCommaAfter] }, 'city'],
        ['country'],
      ],
    },
  },
  // United States
  US: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [addCommaAfter] },
          'state',
          'postalCode',
        ],
        [
          {
            attribute: 'country',
            transforms: [capitalize],
          },
        ],
      ],
    },
  },
}

// Set Canada's default to the english format
addressFormats.CA.default = addressFormats.CA.english

// Croatia/Serbia/Slovenia (former Yugoslavia) share the same format

// Serbia
addressFormats.RS = addressFormats.HR
// Slovenia
addressFormats.SI = addressFormats.HR

// North Korea
addressFormats.KP = addressFormats.KR

// Set Norway's default to the personal format
addressFormats.NO.default = addressFormats.NO.personal

// Set Sweden's default to the personal format
addressFormats.SE.default = addressFormats.SE.personal

/**
 ** Set most of Latin America to the same typical address
 ** used in Spanish speaking countries
 */

// Bolivia
addressFormats.BO = addressFormats.AR

// Chile
addressFormats.CL = addressFormats.AR

// Colombia
addressFormats.CO = addressFormats.AR

// Ecuador
addressFormats.EC = addressFormats.AR

// Guyana
addressFormats.GY = addressFormats.AR

// Paraguay
addressFormats.PY = addressFormats.AR

// Peru
addressFormats.PE = addressFormats.AR

// Uruguay
addressFormats.UY = addressFormats.AR

// Venezuela
addressFormats.VE = addressFormats.AR

export default addressFormats
