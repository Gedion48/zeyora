"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <div className="group flex gap-4 p-4 border rounded-lg bg-card hover:shadow-md transition-all duration-300">
        {/* Product Image */}
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="text-xs mb-2">
                {product.category}
              </Badge>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="shrink-0"
            >
              <Heart
                className={`h-4 w-4 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">(124 reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">Birr {product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  Birr {product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-sm text-destructive font-medium">
                  Out of Stock
                </span>
              )}
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground">
          -{discountPercentage}%
        </Badge>
      )}

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 h-8 w-8 p-0 bg-background/80 hover:bg-background"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted ? "fill-red-500 text-red-500" : ""
          }`}
        />
      </Button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Add Button - Shows on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-balance">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">(124)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Birr {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                Birr {product.originalPrice}
              </span>
            )}
          </div>

          <Button size="sm" variant="outline">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.inStock ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-destructive font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
