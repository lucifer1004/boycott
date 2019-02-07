export interface YelpBusinessesSearchRequest {
  term?: string
  location?: string
  latitude?: number
  longitude?: number
  radius?: number
  categories?: string
  locale?: string
  limit?: number
  offset?: number
  sort_by?: string
  price?: string
  open_now?: boolean
  open_at?: string
  attributes?: string
}

interface YelpCoordinates {
  latitude: number
  longitude: number
}

interface YelpBusinessCategory {
  alias: string
  title: string
}

export interface YelpBusinessesSearchResult {
  rating?: number
  price?: string
  phone?: string
  id: string
  alias?: string
  is_closed?: boolean
  categories?: YelpBusinessCategory[]
  review_count?: number
  name: string
  url?: string
  coordinates: YelpCoordinates
  image_url?: string
  location?: any
  distance?: number
  transactions?: string[]
}

export interface YelpBusinessesSearchResults {
  total?: number
  businesses: YelpBusinessesSearchResult[]
  region?: {
    center: YelpCoordinates
  }
}
