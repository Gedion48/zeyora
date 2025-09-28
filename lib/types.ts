export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: "Electronics" | "Fashion"
  image: string
  description: string
  discount?: number
  rating: number
  inStock: boolean
}

export interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export interface FiltersState {
  category: string
  priceRange: [number, number]
  sortBy: "name" | "price-asc" | "price-desc" | "rating"
  searchQuery: string
}
