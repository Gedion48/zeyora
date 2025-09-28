import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FiltersState } from "../../types"

const initialState: FiltersState = {
  category: "All",
  priceRange: [0, 2000],
  sortBy: "name",
  searchQuery: "",
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action: PayloadAction<FiltersState["sortBy"]>) => {
      state.sortBy = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetFilters: (state) => {
      state.category = "All"
      state.priceRange = [0, 2000]
      state.sortBy = "name"
      state.searchQuery = ""
    },
  },
})

export const { setCategory, setPriceRange, setSortBy, setSearchQuery, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
