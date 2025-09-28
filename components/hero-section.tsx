"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium mb-8 bg-muted/50">
            <Zap className="mr-2 h-4 w-4 text-primary" />
            Big Discounts in Ethiopia
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            Premium Electronics
            <span className="block text-primary">& Fashion Store</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover amazing deals on the latest electronics and fashion trends. Quality products, unbeatable prices,
            delivered across Ethiopia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              View Deals
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Trusted Quality</h3>
              <p className="text-sm text-muted-foreground">Authentic products with warranty protection</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Quick shipping across all major Ethiopian cities</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm text-muted-foreground">Unmatched discounts up to 50% off retail prices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
