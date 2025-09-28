"use client"

import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/hooks"
import { setCategory } from "@/lib/features/filters/filtersSlice"

export function CategoryShowcase() {
  const dispatch = useAppDispatch()

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category))
    // Scroll to products section
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium electronics and fashion items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Electronics Category */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-8 hover:shadow-xl transition-all duration-300">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Electronics</h3>
              <p className="text-muted-foreground mb-6">
                Latest smartphones, laptops, headphones and more tech essentials
              </p>
              <Button onClick={() => handleCategoryClick("Electronics")} className="mb-6">
                Shop Electronics
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:opacity-30 transition-opacity">
              <div className="w-32 h-32 bg-primary/20 rounded-full" />
            </div>
          </div>

          {/* Fashion Category */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-950/20 dark:to-purple-900/20 p-8 hover:shadow-xl transition-all duration-300">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Fashion</h3>
              <p className="text-muted-foreground mb-6">Trendy clothing, shoes, accessories and style essentials</p>
              <Button onClick={() => handleCategoryClick("Fashion")} className="mb-6">
                Shop Fashion
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:opacity-30 transition-opacity">
              <div className="w-32 h-32 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Featured Deals Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Limited Time Offers</h3>
          <p className="text-muted-foreground mb-6">
            Up to 50% off on selected items. Don't miss out on these amazing deals!
          </p>
          <Button onClick={() => handleCategoryClick("All")} size="lg" className="px-8">
            View All Deals
          </Button>
        </div>
      </div>
    </section>
  )
}
