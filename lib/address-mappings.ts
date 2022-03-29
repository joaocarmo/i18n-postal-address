import type { PostalLabels } from 'node-postal'
import type { AddressParts } from './types/address-format'

export type ParserMap<T extends string> = Record<T, AddressParts[]>

/**
 * Mapping between the parsed labels and this library's internal representation.
 * @see {@link https://github.com/openvenues/libpostal#parser-labels|libpostal}
 */
const libpostalMap: ParserMap<PostalLabels> = {
  category: [],
  city_district: ['address2'],
  city: ['city', 'si'],
  country_region: ['do', 'province', 'region', 'republic'],
  country: ['country'],
  entrance: ['addressNum'],
  house_number: ['addressNum'],
  house: ['address1', 'dong'],
  island: ['state', 'region'],
  level: ['addressNum'],
  near: [],
  po_box: [],
  postcode: ['postalCode'],
  road: ['address1', 'dong'],
  staircase: ['addressNum'],
  state_district: ['prefecture'],
  state: ['state'],
  suburb: ['address2'],
  unit: ['address2'],
  world_region: [],
}

export default libpostalMap
