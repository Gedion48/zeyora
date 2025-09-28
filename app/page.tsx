import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryShowcase } from "@/components/category-showcase"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoryShowcase />
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <ProductGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
