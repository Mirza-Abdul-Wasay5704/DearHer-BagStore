// components/ProductFilters.tsx — Shop page filter sidebar
"use client";

import { PATTERN_TYPES, COLOR_OPTIONS } from "@/utils/helpers";

interface FiltersState {
  priceRange: [number, number];
  patternType: string;
  color: string;
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  onReset: () => void;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-beige-500 underline transition-colors hover:text-brand-accent"
        >
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ ...filters, sortBy: e.target.value })
          }
          className="w-full border border-beige-200 bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0] || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]],
              })
            }
            className="w-full border border-beige-200 bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          />
          <span className="text-beige-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1] || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full border border-beige-200 bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Pattern Type */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Pattern Type
        </label>
        <select
          value={filters.patternType}
          onChange={(e) =>
            onFilterChange({ ...filters, patternType: e.target.value })
          }
          className="w-full border border-beige-200 bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
        >
          <option value="">All Patterns</option>
          {PATTERN_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Color
        </label>
        <select
          value={filters.color}
          onChange={(e) =>
            onFilterChange({ ...filters, color: e.target.value })
          }
          className="w-full border border-beige-200 bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
        >
          <option value="">All Colors</option>
          {COLOR_OPTIONS.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
