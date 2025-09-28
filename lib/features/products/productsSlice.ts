import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, ProductsState } from "../../types"

// Mock API data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 899,
    originalPrice: 1199,
    category: "Electronics",
    image: "/iphone-15-pro-max.png",
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    discount: 25,
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 799,
    originalPrice: 1099,
    category: "Electronics",
    image: "/samsung-galaxy-s24-ultra.png",
    description: "Premium Android phone with S Pen and incredible camera",
    discount: 27,
    rating: 4.7,
    inStock: true,
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: 999,
    originalPrice: 1299,
    category: "Electronics",
    image: "/macbook-air-m3-laptop.jpg",
    description: "Ultra-thin laptop with M3 chip and all-day battery life",
    discount: 23,
    rating: 4.9,
    inStock: true,
  },
  {
    id: "4",
    name: "Designer Leather Jacket",
    price: 149,
    originalPrice: 299,
    category: "Fashion",
    image: "/premium-leather-jacket-fashion.jpg",
    description: "Premium genuine leather jacket with modern cut",
    discount: 50,
    rating: 4.6,
    inStock: true,
  },
  {
    id: "5",
    name: "Nike Air Max 270",
    price: 89,
    originalPrice: 150,
    category: "Fashion",
    image: "/nike-air-max-270-sneakers.jpg",
    description: "Comfortable running shoes with Air Max technology",
    discount: 41,
    rating: 4.5,
    inStock: true,
  },
  {
    id: "6",
    name: "Sony WH-1000XM5",
    price: 299,
    originalPrice: 399,
    category: "Electronics",
    image: "/sony-wh-1000xm5.png",
    description: "Industry-leading noise canceling wireless headphones",
    discount: 25,
    rating: 4.8,
    inStock: true,
  },
  {
    id: "7",
    name: "Premium Denim Jeans",
    price: 79,
    originalPrice: 120,
    category: "Fashion",
    image: "/premium-denim-jeans-fashion.jpg",
    description: "High-quality denim with perfect fit and comfort",
    discount: 34,
    rating: 4.4,
    inStock: true,
  },
  {
    id: "8",
    name: 'iPad Pro 12.9"',
    price: 899,
    originalPrice: 1199,
    category: "Electronics",
    image: "/ipad-pro-12-9-inch-tablet.jpg",
    description: "Professional tablet with M2 chip and Liquid Retina display",
    discount: 25,
    rating: 4.7,
    inStock: true,
  },
  {
    id: "9",
    name: "Wireless Gaming Mouse",
    price: 59,
    originalPrice: 89,
    category: "Electronics",
    image: "/wireless-gaming-mouse.png",
    description: "High-precision wireless gaming mouse with RGB lighting",
    discount: 34,
    rating: 4.3,
    inStock: true,
  },
  {
    id: "10",
    name: "Designer Sunglasses",
    price: 129,
    originalPrice: 199,
    category: "Fashion",
    image: "/designer-sunglasses.png",
    description: "Premium UV protection sunglasses with titanium frame",
    discount: 35,
    rating: 4.6,
    inStock: true,
  },
  {
    id: "11",
    name: "Bluetooth Speaker",
    price: 79,
    originalPrice: 119,
    category: "Electronics",
    image: "/bluetooth-speaker.jpg",
    description: "Portable waterproof speaker with 360-degree sound",
    discount: 34,
    rating: 4.4,
    inStock: true,
  },
  {
    id: "12",
    name: "Casual Sneakers",
    price: 69,
    originalPrice: 99,
    category: "Fashion",
    image: "/casual-sneakers.png",
    description: "Comfortable everyday sneakers with breathable mesh",
    discount: 30,
    rating: 4.2,
    inStock: true,
  },
]

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 8 }: { page?: number; limit?: number } = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = mockProducts.slice(startIndex, endIndex)

    return {
      products: paginatedProducts,
      totalPages: Math.ceil(mockProducts.length / limit),
      currentPage: page,
      hasMore: endIndex < mockProducts.length,
    }
  },
)

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearProducts: (state) => {
      state.items = []
      state.currentPage = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.currentPage === 1) {
          state.items = action.payload.products
        } else {
          state.items.push(...action.payload.products)
        }
        state.currentPage = action.payload.currentPage
        state.totalPages = action.payload.totalPages
        state.hasMore = action.payload.hasMore
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
  },
})

export const { setCurrentPage, clearProducts } = productsSlice.actions
export default productsSlice.reducer
