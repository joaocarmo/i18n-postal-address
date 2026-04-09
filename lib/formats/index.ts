import type { AddressFormat } from '../types/address-format.js'
import { addCommaAfter, capitalize } from '../address-transforms.js'

export type CountryFormat = {
  [key: string]: AddressFormat
}

export const AR: CountryFormat = {
  default: {
    array: [
      ['honorificPrefix', 'givenName', 'additionalName', 'firstFamilyName'],
      ['secondFamilyName', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['address1', 'address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AU: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const AT: CountryFormat = {
  default: {
    array: [
      ['honorificPrefix'],
      ['givenName', 'additionalName', 'familyName', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BR: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }, 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

const _caEnglish: AddressFormat = {
  array: [
    ['honorificPrefix', 'givenName', 'familyName', 'honorificSuffix'],
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
}

export const CA: CountryFormat = {
  english: _caEnglish,
  french: {
    array: [
      ['honorificPrefix', 'givenName', 'familyName', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['address1', 'address2'],
      ['city', 'province'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
  default: _caEnglish,
}

export const CH: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      ['honorificPrefix', 'givenName', 'familyName', 'honorificSuffix'],
      ['careOf'],
      ['address1', 'address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CN: CountryFormat = {
  default: {
    array: [
      [{ attribute: 'country', transforms: [capitalize] }],
      ['province', 'city'],
      ['careOf'],
      ['address1', 'address2'],
      ['companyName'],
      ['familyName', 'givenName', 'honorificPrefix', 'honorificSuffix'],
    ],
  },
}

export const CZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const DE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'title',
        'givenName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const DK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'title',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ES: CountryFormat = {
  default: {
    array: [
      ['honorificPrefix', 'givenName', 'additionalName', 'firstFamilyName'],
      ['secondFamilyName', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['address1', 'address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const FI: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const FR: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const HR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const HU: CountryFormat = {
  business: {
    array: [
      [
        'honorificPrefix',
        'honorificSuffix',
        'familyName',
        'givenName',
        'additionalName',
      ],
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
      ['honorificPrefix', 'honorificSuffix', 'familyName', 'givenName'],
      ['companyName'],
      [{ attribute: 'city', transforms: [capitalize] }],
      ['careOf'],
      ['address1', 'address2'],
      ['postalCode'],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IT: CountryFormat = {
  default: {
    array: [
      ['honorificPrefix', 'givenName', 'familyName', 'honorificSuffix'],
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
}

export const JP: CountryFormat = {
  default: {
    array: [
      [{ attribute: 'country', transforms: [capitalize] }],
      ['postalCode', 'prefecture', 'city'],
      ['careOf'],
      ['address1', 'address2'],
      ['companyName'],
      ['familyName', 'givenName', 'honorificPrefix', 'honorificSuffix'],
    ],
  },
}

export const KR: CountryFormat = {
  default: {
    array: [
      ['familyName', 'givenName', 'honorificPrefix', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['do', 'si', 'dong', 'gu', 'addressNum'],
      ['postalCode', { attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MY: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NL: CountryFormat = {
  business: {
    array: [
      ['companyName'],
      [
        't.a.v.',
        'title',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

const _noPersonal: AddressFormat = {
  array: [
    [
      'honorificPrefix',
      'givenName',
      'additionalName',
      'familyName',
      'honorificSuffix',
    ],
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
}

export const NO: CountryFormat = {
  business: {
    array: [
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['givenName', 'familyName', 'honorificSuffix'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
  personal: _noPersonal,
  default: _noPersonal,
}

export const PL: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const RO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const RU: CountryFormat = {
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
      ['familyName'],
      ['givenName', 'additionalName', 'honorificSuffix'],
    ],
  },
}

export const SG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

const _sePersonal: AddressFormat = {
  array: [
    [
      'honorificPrefix',
      'givenName',
      'additionalName',
      'familyName',
      'honorificSuffix',
    ],
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
}

export const SE: CountryFormat = {
  business: {
    array: [
      ['companyName'],
      ['givenName', 'familyName', 'honorificSuffix'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
  personal: _sePersonal,
  default: _sePersonal,
}

export const TR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const US: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const AC: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AD: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AF: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AL: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode'],
      ['city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const AS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const AX: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BB: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const BD: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BE: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BF: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BL: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BY: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'postalCode', transforms: [addCommaAfter] }, 'city'],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CC: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const CI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1', 'city'],
      ['address2'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'state', transforms: [addCommaAfter] }, 'city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CU: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'state'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CV: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      ['region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CX: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const CY: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const DO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const DZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const EE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const EG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const EH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ET: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const FK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const FM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const FO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GB: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GF: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GL: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['postalCode', 'address1', 'city'],
      ['address2'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GP: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GU: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const HK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      [{ attribute: 'region', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const HM: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const HN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const HT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ID: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['state', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const IL: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      ['state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IQ: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const IR: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['state'],
      [{ attribute: 'city', transforms: [addCommaAfter] }],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const IS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const JE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const JM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const JO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'region', transforms: [capitalize] }],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [addCommaAfter] }, 'region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KY: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['region', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const KZ: CountryFormat = {
  default: {
    array: [
      ['postalCode'],
      ['state'],
      ['city'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LB: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LI: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LT: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LU: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LV: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['state'],
      [{ attribute: 'city', transforms: [addCommaAfter] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MC: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MD: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ME: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MF: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const MK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [addCommaAfter] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['state', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MP: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const MQ: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const MU: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MV: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const MX: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const MZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NC: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NF: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const NG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'state', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const NP: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['region'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const NZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const OM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode'],
      ['city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'state', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PF: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const PG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'address2', transforms: [addCommaAfter] }, 'city'],
      ['postalCode', 'state'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PM: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const RE: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SC: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      [{ attribute: 'region', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SD: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SJ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const SR: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      [{ attribute: 'state', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SV: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const SZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TC: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'postalCode', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'address2', transforms: [addCommaAfter] }, 'city'],
      [{ attribute: 'state', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TJ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TV: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'region', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const TZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const UA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const UM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const UZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'state', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const VA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const VC: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const VG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const VI: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
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
}

export const VN: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['state', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const WF: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const XK: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const YT: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ZA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city'],
      ['postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ZM: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', 'city'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const AO: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const BZ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const CM: CountryFormat = {
  default: {
    array: [
      ['companyName'],
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const FJ: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const GH: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'region', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const LY: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const PS: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const QA: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const SY: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TL: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['city', 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const TT: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }, 'postalCode'],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const UG: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['postalCode', { attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const YE: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export const ZW: CountryFormat = {
  default: {
    array: [
      [
        'honorificPrefix',
        'givenName',
        'additionalName',
        'familyName',
        'honorificSuffix',
      ],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [{ attribute: 'city', transforms: [capitalize] }],
      [{ attribute: 'country', transforms: [capitalize] }],
    ],
  },
}

export {
  AR as BO,
  AR as CL,
  AR as CO,
  AR as EC,
  AR as GY,
  AR as PY,
  AR as PE,
  AR as UY,
  AR as VE,
}
export { HR as RS, HR as SI }
export { KR as KP }

export { NL as AW, NL as BQ, NL as CW, NL as SX }
export { NZ as CK, NZ as NU, NZ as TK }
export { GB as MS }

export { BW as AG, BW as DM, BW as GD, BW as GM, BW as LC }
export { BW as SB, BW as SL, BW as SS, BW as TO, BW as VU, BW as WS }

export {
  CM as BI,
  CM as BJ,
  CM as CD,
  CM as CF,
  CM as CG,
  CM as DJ,
  CM as ER,
  CM as GA,
  CM as GQ,
  CM as KM,
  CM as ML,
  CM as MR,
  CM as RW,
  CM as ST,
  CM as TD,
  CM as TG,
}
