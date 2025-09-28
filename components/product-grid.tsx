"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchProducts, setCurrentPage } from "@/lib/features/products/productsSlice"
import { ProductCard } from "./product-card"
import { LoadingSpinner } from "./loading-spinner"
import { ErrorMessage } from "./error-message"
import { FiltersSidebar } from "./filters-sidebar"
import { Pagination } from "./pagination"
import { InfiniteScroll } from "./infinite-scroll"
import { Button } from "@/components/ui/button"
import { Grid, List, MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaginationMode = "pagination" | "infinite" | "load-more"

export function ProductGrid() {
  const dispatch = useAppDispatch()
  const {
    items: products,
    loading,
    error,
    hasMore,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.products)
  const filters = useAppSelector((state) => state.filters)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [paginationMode, setPaginationMode] = useState<PaginationMode>("load-more")

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 8 }))
  }, [dispatch])

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filters.category === "All" || product.category === filters.category
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    const matchesSearch =
      filters.searchQuery === "" ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())

    return matchesCategory && matchesPrice && matchesSearch
  })

  // Sort products based on current sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleLoadMore = () => {
    dispatch(fetchProducts({ page: currentPage + 1, limit: 8 }))
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    dispatch(fetchProducts({ page, limit: 8 }))
    // Scroll to top of products
    document.getElementById("products-header")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleRetry = () => {
    dispatch(fetchProducts({ page: 1, limit: 8 }))
  }

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <FiltersSidebar />
        <div className="flex-1">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <FiltersSidebar />
        <div className="flex-1">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    )
  }

  const ProductsContent = () => (
    <>
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
        }
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Pagination Controls */}
      {paginationMode === "pagination" && (
        <div className="flex justify-center mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      {/* Load More Button */}
      {paginationMode === "load-more" && hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} variant="outline" size="lg" className="px-8 bg-transparent">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Load More Products
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loading && products.length > 0 && (
        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      )}
    </>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <FiltersSidebar />

      <div className="flex-1 space-y-6">
        {/* Results Header */}
        <div id="products-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{filters.category === "All" ? "All Products" : filters.category}</h2>
            <p className="text-muted-foreground">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""} found
              {filters.searchQuery && <span> for "{filters.searchQuery}"</span>}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Pagination Mode Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>
              <Select value={paginationMode} onValueChange={(value: PaginationMode) => setPaginationMode(value)}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="load-more">Load More</SelectItem>
                  <SelectItem value="pagination">Pages</SelectItem>
                  <SelectItem value="infinite">Infinite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        {sortedProducts.length > 0 ? (
          paginationMode === "infinite" ? (
            <InfiniteScroll hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
              <ProductsContent />
            </InfiniteScroll>
          ) : (
            <ProductsContent />
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
            <Button variant="outline" onClick={() => dispatch({ type: "filters/resetFilters" })}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
