import React, { useState, useEffect } from 'react';
import { X, Star, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { SIZES, MILKS, EXTRAS } from '../data/products';
import { formatEGP } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isCoffee = ['Espresso', 'Hot Coffee', 'Cold Coffee', 'Frappuccino', 'Tea'].includes(product.category);

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(item => item.id === extra.id);
      if (exists) {
        return prev.filter(item => item.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Calculate live total unit price
  const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const sizeMultiplier = isCoffee ? selectedSize.priceMultiplier : 0;
  const milkPrice = isCoffee ? selectedMilk.price : 0;
  const unitPrice = product.price + sizeMultiplier + milkPrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, {
      size: isCoffee ? selectedSize : { id: 'standard', label: 'Standard' },
      milk: isCoffee ? selectedMilk : { id: 'none', label: 'N/A' },
      extras: isCoffee ? selectedExtras : [],
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-coffee-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl border border-coffee-200 shadow-2xl w-full max-w-3xl overflow-hidden z-10 flex flex-col md:flex-row my-8 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-coffee-950/60 text-white hover:bg-coffee-950 flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div className="md:w-1/2 relative bg-coffee-100 min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="bg-coffee-600/90 text-amber-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl font-bold mt-2">{product.name}</h2>
            <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-white/80">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Customization Form Section */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-1">About this drink</h4>
              <p className="text-sm text-coffee-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-1.5">Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="bg-coffee-100 text-coffee-800 text-xs font-medium px-2.5 py-1 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Drink Customization Controls (Only for Coffee/Tea items) */}
            {isCoffee && (
              <>
                {/* 1. Size Selection */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-2">Select Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((size) => {
                      const selected = selectedSize.id === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            selected
                              ? 'bg-coffee-900 text-white border-coffee-900 shadow-sm'
                              : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
                          }`}
                        >
                          <div>{size.label}</div>
                          {size.priceMultiplier > 0 && (
                            <div className="text-[10px] text-amber-300 font-normal">+{formatEGP(size.priceMultiplier)}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Milk Selection */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-2">Milk Choice</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {MILKS.map((milk) => {
                      const selected = selectedMilk.id === milk.id;
                      return (
                        <button
                          key={milk.id}
                          type="button"
                          onClick={() => setSelectedMilk(milk)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-coffee-900 text-white border-coffee-900 shadow-sm'
                              : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
                          }`}
                        >
                          <span>{milk.label}</span>
                          {milk.price > 0 && (
                            <span className="text-[10px] text-amber-300">+{formatEGP(milk.price)}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Extras Checkboxes */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-2">Add Flavors & Extras</h4>
                  <div className="space-y-1.5">
                    {EXTRAS.map((extra) => {
                      const isChecked = selectedExtras.some(item => item.id === extra.id);
                      return (
                        <label
                          key={extra.id}
                          onClick={() => toggleExtra(extra)}
                          className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
                            isChecked
                              ? 'bg-coffee-100 border-coffee-500 text-coffee-950 font-bold'
                              : 'bg-coffee-50/50 border-coffee-200 text-coffee-700 hover:bg-coffee-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked ? 'bg-coffee-700 border-coffee-700 text-white' : 'border-coffee-300 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{extra.label}</span>
                          </div>
                          <span className="text-coffee-600 font-bold">+{formatEGP(extra.price)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Quantity Selector */}
            <div className="pt-2 flex items-center justify-between border-t border-coffee-100">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-400">Quantity</span>
              <div className="flex items-center gap-3 bg-coffee-100 p-1 rounded-xl border border-coffee-200">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-coffee-900 hover:bg-coffee-200 flex items-center justify-center font-bold text-sm shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm px-2 text-coffee-950">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white text-coffee-900 hover:bg-coffee-200 flex items-center justify-center font-bold text-sm shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Action Footer: Live Total & Add to Cart */}
          <div className="pt-4 border-t border-coffee-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-coffee-400 uppercase tracking-wider font-semibold block">Total Price</span>
              <span className="font-serif text-2xl font-extrabold text-coffee-950">
                {formatEGP(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-coffee-700 to-coffee-900 hover:from-coffee-600 hover:to-coffee-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-coffee-glow flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span>Add to Order</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
