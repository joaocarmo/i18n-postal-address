declare module 'node-postal' {
  export type PostalLabels =
    | 'category'
    | 'city_district'
    | 'city'
    | 'country_region'
    | 'country'
    | 'entrance'
    | 'house_number'
    | 'house'
    | 'island'
    | 'level'
    | 'near'
    | 'po_box'
    | 'postcode'
    | 'road'
    | 'staircase'
    | 'state_district'
    | 'state'
    | 'suburb'
    | 'unit'
    | 'world_region'

  export interface PostalResult {
    component: PostalLabels
    value: string
  }

  const postal: {
    parser: {
      parse_address: (input: string) => PostalResult[]
    }
  }
  export default postal
}
