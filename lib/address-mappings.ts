import type { PostalLabels } from 'node-postal'
import type { AddressParts } from './types/address-format'

export type ParserMap<T> = Record<AddressParts, Partial<T>[]>

/**
 * Mapping between the parsed labels and this library's internal representation.
 * @see {@link https://github.com/openvenues/libpostal#parser-labels|libpostal}
 */
const libpostalMap: ParserMap<PostalLabels> = {
  address1: [
    'house',
    'house_number',
    'unit',
    'level',
    'staircase',
    'entrance',
    'road',
  ],
  address2: ['near', 'suburb', 'city_district', 'state_district', 'island'],
  addressNum: ['po_box'],
  city: ['city'],
  companyName: [],
  country: ['country', 'world_region'],
  countryAlpha2: [],
  do: ['country_region'],
  dong: [],
  firstLastName: [],
  firstName: [],
  gu: [],
  honorific: [],
  jobTitle: [],
  lastName: [],
  postalCode: ['postcode'],
  prefecture: ['state_district'],
  province: [],
  region: ['country_region'],
  republic: [],
  secondLastName: [],
  secondName: [],
  si: ['city'],
  state: ['state'],
  title: [],
}

export default libpostalMap
