import React, { useState, useMemo } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { PRODUCTS, CATEGORIES } from '../data/products';

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.ingredients && product.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <SectionTitle
          subtitle="Artisanal Catalog"
          title="Our Specialty Coffee & Bakery Menu"
        />

        {/* Category Pills Tabs */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Search Bar & Sorting Select */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Count Indicator */}
        <div className="flex items-center justify-between text-xs text-coffee-500 pb-2 border-b border-coffee-200">
          <span>
            Showing <strong className="text-coffee-950">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'drink/pastry' : 'drinks & pastries'}
          </span>
          {selectedCategory !== 'All' && (
            <span>Category: <strong className="text-coffee-900 font-semibold">{selectedCategory}</strong></span>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onResetFilters={handleResetFilters}
        />

      </div>

      {/* Drink Customization Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
