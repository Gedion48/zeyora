"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCategory,
  setPriceRange,
  setSortBy,
  resetFilters,
} from "@/lib/features/filters/filtersSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FiltersSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["All", "Electronics", "Fashion"];

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setPriceRange([value[0], value[1]]));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as any));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const activeFiltersCount = [
    filters.category !== "All" ? 1 : 0,
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000 ? 1 : 0,
    filters.sortBy !== "name" ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Active Filters</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-auto p-1"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category !== "All" && (
              <Badge variant="secondary" className="text-xs">
                {filters.category}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => handleCategoryChange("All")}
                />
              </Badge>
            )}
            {(filters.priceRange[0] !== 0 ||
              filters.priceRange[1] !== 2000) && (
              <Badge variant="secondary" className="text-xs">
                Birr {filters.priceRange[0]} - Birr {filters.priceRange[1]}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => handlePriceRangeChange([0, 2000])}
                />
              </Badge>
            )}
            {filters.sortBy !== "name" && (
              <Badge variant="secondary" className="text-xs">
                Sort: {filters.sortBy}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => handleSortChange("name")}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filters.category === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Price Range: Birr {filters.priceRange[0]} - Birr{" "}
          {filters.priceRange[1]}
        </Label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={2000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Birr 0</span>
          <span>Birr 2000</span>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Quick Filters</Label>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleCategoryChange("Electronics");
              handlePriceRangeChange([500, 1500]);
            }}
            className="justify-start text-xs"
          >
            Premium Electronics
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleCategoryChange("Fashion");
              handlePriceRangeChange([50, 200]);
            }}
            className="justify-start text-xs"
          >
            Fashion Deals
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handlePriceRangeChange([0, 100]);
              handleSortChange("price-asc");
            }}
            className="justify-start text-xs"
          >
            Budget Friendly
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-24 bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 text-xs h-5 w-5 p-0 flex items-center justify-center"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
