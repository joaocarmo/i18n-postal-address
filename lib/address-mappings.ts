import type { PostalLabels } from 'node-postal'
import { capitalizeWhenTwo } from './address-transforms'
import type { AddressParts, TransformFunction } from './types/address-format'

type LabelObject<T> = {
  attribute: T
  transform: TransformFunction
}

export type LabelConfig<T> = Partial<T> | LabelObject<T>

export type ParserMap<T> = Record<AddressParts, LabelConfig<T>[]>

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
  country: [
    {
      attribute: 'country',
      transform: capitalizeWhenTwo,
    },
    'world_region',
  ],
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
  state: [
    {
      attribute: 'state',
      transform: capitalizeWhenTwo,
    },
  ],
  title: [],
}

export default libpostalMap
