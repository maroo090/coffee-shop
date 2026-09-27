import React from 'react';
import { Star, Plus, Eye, Sparkles } from 'lucide-react';
import { formatEGP } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft hover:shadow-xl hover:border-coffee-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/3] overflow-hidden bg-coffee-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Tag Pill */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-coffee-950/90 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-coffee-700/60 shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {product.tag}
          </span>
        )}

        {/* Category Pill */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-coffee-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm border border-coffee-200">
          {product.category}
        </span>

        {/* Hover Quick View Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-coffee-950/90 text-white text-xs font-medium px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-amber-300" />
          <span>Customize Drink</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-coffee-900">{product.rating}</span>
            <span className="text-coffee-400 font-normal">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-coffee-950 group-hover:text-coffee-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-coffee-600 leading-relaxed line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Footer Price & Add Action */}
        <div className="pt-3 border-t border-coffee-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-coffee-400 uppercase tracking-wider font-semibold block">Price</span>
            <span className="text-base font-extrabold text-coffee-900 font-serif">
              {formatEGP(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="p-2 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-800 transition-colors"
              title="Quick Add to Cart"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectProduct(product)}
              className="bg-coffee-900 hover:bg-coffee-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
