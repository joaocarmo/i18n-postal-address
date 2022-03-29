import type { PostalLabels } from 'node-postal'
import type { AddressParts } from './types/address-format'

export type ParserMap<T extends string> = Record<T, AddressParts[]>

/**
 * Mapping between the parsed labels and this library's internal representation.
 * @see {@link https://github.com/openvenues/libpostal#parser-labels|libpostal}
 */
const libpostalMap: ParserMap<PostalLabels> = {
  category: [],
  city_district: [],
  city: [],
  country_region: [],
  country: [],
  entrance: [],
  house_number: [],
  house: [],
  island: [],
  level: [],
  near: [],
  po_box: [],
  postcode: [],
  road: [],
  staircase: [],
  state_district: [],
  state: [],
  suburb: [],
  unit: [],
  world_region: [],
}

export default libpostalMap
