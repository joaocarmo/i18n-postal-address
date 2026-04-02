import type { AddressFormats } from './types/address-format'
import { addCommaAfter, capitalize } from './address-transforms'

const addressFormats: AddressFormats = {
  // Argentina
  AR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'firstLastName'],
        ['secondLastName'],
        ['companyName'],
        ['careOf'],
        ['address1', 'address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Australia
  AU: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          'state',
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Austria
  AT: {
    default: {
      array: [
        ['honorific'],
        ['firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // The Bahamas
  BS: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Bulgaria
  BG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Brazil
  BR: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          'postalCode',
          { attribute: 'city', transforms: [capitalize] },
          'state',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Canada
  CA: {
    english: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1', 'address2'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          'province',
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
    french: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1', 'address2'],
        ['city', 'province'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Switzerland
  CH: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'lastName'],
        ['careOf'],
        ['address1', 'address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // China
  CN: {
    default: {
      array: [
        [{ attribute: 'country', transforms: [capitalize] }],
        ['province', 'city'],
        ['careOf'],
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
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Germany
  DE: {
    default: {
      array: [
        ['honorific', 'title', 'firstName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Denmark
  DK: {
    default: {
      array: [
        ['honorific', 'title', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
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
        ['careOf'],
        ['address1', 'address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Finland
  FI: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // France
  FR: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Greece
  GR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Croatia
  HR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Hungary
  HU: {
    business: {
      array: [
        ['honorific', 'lastName', 'firstName', 'secondName'],
        ['companyName'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
    default: {
      array: [
        ['honorific', 'lastName', 'firstName'],
        ['companyName'],
        [{ attribute: 'city', transforms: [capitalize] }],
        ['careOf'],
        ['address1', 'address2'],
        ['postalCode'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Italy
  IT: {
    default: {
      array: [
        ['honorific', 'firstName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          'postalCode',
          { attribute: 'city', transforms: [capitalize] },
          'province',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Japan,
  JP: {
    default: {
      array: [
        [{ attribute: 'country', transforms: [capitalize] }],
        ['postalCode', 'prefecture', 'city'],
        ['careOf'],
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
        ['lastName', 'firstName', 'honorific'],
        ['companyName'],
        ['careOf'],
        ['do', 'si', 'dong', 'gu', 'addressNum'],
        ['postalCode', { attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Malaysia
  MY: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Netherlands
  NL: {
    business: {
      array: [
        ['companyName'],
        ['t.a.v.', 'title', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Norway
  NO: {
    business: {
      array: [
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['firstName', 'lastName'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
    personal: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          'postalCode',
          {
            attribute: 'city',
            transforms: [capitalize],
          },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Poland
  PL: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Portugal
  PT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Romania
  RO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Russia
  RU: {
    default: {
      array: [
        [{ attribute: 'country', transforms: [capitalize] }],
        [
          'republic',
          'state',
          'region',
          { attribute: 'city', transforms: [capitalize] },
        ],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['companyName'],
        ['lastName'],
        ['firstName', 'secondName'],
      ],
    },
  },
  // Singapore
  SG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Sweden
  SE: {
    business: {
      array: [
        ['companyName'],
        ['firstName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
    personal: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          'postalCode',
          {
            attribute: 'city',
            transforms: [capitalize],
          },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // Turkey
  TR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  // United States
  US: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
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
  AC: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AD: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AF: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AL: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        ['city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        ['city'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AS: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AX: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  AZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BB: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [addCommaAfter] },
          'region',
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BD: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BE: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BF: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BL: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  BY: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'postalCode', transforms: [addCommaAfter] }, 'city'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CC: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1', 'city'],
        ['address2'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'state', transforms: [addCommaAfter] }, 'city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CU: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'state'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CV: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        ['region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CX: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  CY: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  DO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  DZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  EE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  EG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['state'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  EH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  ET: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  FK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  FM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  FO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GB: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GF: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GL: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['postalCode', 'address1', 'city'],
        ['address2'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GP: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GS: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GU: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  GW: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  HK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        [{ attribute: 'region', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  HM: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  HN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  HT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  ID: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['state', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['region'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IL: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        ['state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IQ: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          { attribute: 'state', transforms: [capitalize] },
        ],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IR: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['state'],
        [{ attribute: 'city', transforms: [addCommaAfter] }],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  IS: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  JE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  JM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  JO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'region', transforms: [capitalize] }],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KW: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KY: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['region', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  KZ: {
    default: {
      array: [
        ['postalCode'],
        ['state'],
        ['city'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LB: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LI: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LS: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LT: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LU: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  LV: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['state'],
        [{ attribute: 'city', transforms: [addCommaAfter] }, 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MC: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MD: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  ME: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MF: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [addCommaAfter] }, 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['state', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MP: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MQ: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MT: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'postalCode', transforms: [capitalize] },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MU: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MV: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MW: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MX: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'postalCode', transforms: [capitalize] },
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          { attribute: 'state', transforms: [capitalize] },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  MZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NC: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NE: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NF: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
        [{ attribute: 'state', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          { attribute: 'region', transforms: [capitalize] },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NP: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['region'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  NZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  OM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode'],
        ['city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'state', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PF: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          'postalCode',
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'region', transforms: [capitalize] },
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'address2', transforms: [addCommaAfter] }, 'city'],
        ['postalCode', 'state'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PM: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  PW: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  RE: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SC: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        [{ attribute: 'region', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SD: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SJ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SO: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize, addCommaAfter] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SR: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        [{ attribute: 'state', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SV: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'postalCode', transforms: [capitalize] },
          { attribute: 'city', transforms: [capitalize] },
        ],
        [{ attribute: 'state', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  SZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TC: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'postalCode', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TH: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'address2', transforms: [addCommaAfter] }, 'city'],
        [{ attribute: 'state', transforms: [capitalize] }, 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TJ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TV: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [{ attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'region', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TW: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [addCommaAfter] },
          'region',
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  TZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  UA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['region'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  UM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  UZ: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'state', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  VA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  VC: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  VG: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  VI: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        [
          { attribute: 'city', transforms: [capitalize] },
          { attribute: 'state', transforms: [capitalize] },
          'postalCode',
        ],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  VN: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['state', 'postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  WF: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  XK: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  YT: {
    default: {
      array: [
        ['companyName'],
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', { attribute: 'city', transforms: [capitalize] }],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  ZA: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['city'],
        ['postalCode'],
        [{ attribute: 'country', transforms: [capitalize] }],
      ],
    },
  },
  ZM: {
    default: {
      array: [
        ['honorific', 'firstName', 'secondName', 'lastName'],
        ['companyName'],
        ['careOf'],
        ['address1'],
        ['address2'],
        ['postalCode', 'city'],
        [{ attribute: 'country', transforms: [capitalize] }],
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
