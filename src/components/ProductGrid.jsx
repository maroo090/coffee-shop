import React from 'react';
import { ProductCard } from './ProductCard';
import { Coffee } from 'lucide-react';

export const ProductGrid = ({ products, onSelectProduct, onResetFilters }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft max-w-md mx-auto my-8">
        <div className="w-16 h-16 bg-coffee-100 rounded-2xl flex items-center justify-center text-coffee-600 mx-auto mb-4">
          <Coffee className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-coffee-950 mb-2">No Coffee Found</h3>
        <p className="text-sm text-coffee-600 mb-6">
          We couldn't find any items matching your search or filter preferences.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-coffee-900 hover:bg-coffee-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md"
        >
          Reset Filters & View All
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
};
