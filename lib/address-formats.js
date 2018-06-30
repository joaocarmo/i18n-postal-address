const addressFormats = {
  // Argentina
  AR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'firstLastName'],
        ['secondLastName'],
        ['companyName'],
        ['address1'],
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
        ['city', 'state', 'postalCode'],
        ['country'],
      ],
    },
  },
  // Brazil
  BR: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['address1'],
        ['postalCode', 'city', 'state'],
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
  // Canada
  CA: {
    english: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['address1'],
        ['city', 'province', 'postalCode'],
        ['country'],
      ],
    },
    french: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['address1'],
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
        ['address1'],
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
        ['address1'],
        ['companyName'],
        ['lastName', 'firstName', 'honorific'],
      ],
    },
  },
  // Czechia
  CZ: {
    default: {
      array: [],
    },
  },
  // Denmark
  DK: {
    default: {
      array: [],
    },
  },
  // Spain
  ES: {
    default: {
      array: [],
    },
  },
  // Finland
  FI: {
    default: {
      array: [],
    },
  },
  // France
  FR: {
    default: {
      array: [],
    },
  },
  // Germany
  DE: {
    default: {
      array: [],
    },
  },
  // Greece
  GR: {
    default: {
      array: [],
    },
  },
  // Hungary
  HU: {
    default: {
      array: [],
    },
  },
  // Croatia
  HR: {
    default: {
      array: [],
    },
  },
  // Italy
  IT: {
    default: {
      array: [],
    },
  },
  // Japan,
  JP: {
    default: {
      array: [],
    },
  },
  // South Korea,
  KR: {
    default: {
      array: [],
    },
  },
  // Malaysia
  MY: {
    default: {
      array: [],
    },
  },
  // Netherlands
  NL: {
    default: {
      array: [],
    },
  },
  // Norway
  NO: {
    personal: {
      array: [],
    },
    business: {
      array: [],
    },
  },
  // Poland
  PL: {
    default: {
      array: [],
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
      array: [],
    },
  },
  // Russia
  RU: {
    default: {
      array: [],
    },
  },
  // Sweden
  SE: {
    personal: {
      array: [],
    },
    business: {
      array: []
    },
  },
  // Turkey
  TR: {
    default: {
      array: [],
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
        ['city', 'state', 'postalCode'],
        ['country'],
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
addressFormats.NO.default = addressFormats.CA.personal

// Set Sweden's default to the personal format
addressFormats.CA.default = addressFormats.CA.personal

// Set most of Latin America to the same typical address
// used in Spanish speaking countries

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
