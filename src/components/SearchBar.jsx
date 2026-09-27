import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      {/* Search Input */}
      <div className="relative w-full sm:w-80 md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search espresso, latte, croissant..."
          className="w-full bg-white text-coffee-950 placeholder-coffee-400 text-sm pl-11 pr-10 py-3 rounded-2xl border border-coffee-200 shadow-sm focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-coffee-100 text-coffee-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-coffee-200 shadow-sm text-sm text-coffee-700 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-coffee-500 shrink-0" />
          <span className="text-xs text-coffee-400 font-medium uppercase tracking-wider shrink-0">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-coffee-900 font-semibold focus:outline-none cursor-pointer w-full"
          >
            <option value="featured">Featured Coffee</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated ⭐</option>
          </select>
        </div>
      </div>
    </div>
  );
};
