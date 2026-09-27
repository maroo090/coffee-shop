import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, SIZES, MILKS, EXTRAS } from '../data/products';
import { formatEGP } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
    navigate('/cart');
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-coffee-700 hover:text-coffee-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        {/* Product Details Container */}
        <div className="bg-white rounded-3xl border border-coffee-200 shadow-coffee-soft overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="relative bg-coffee-100 min-h-[350px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details & Customizations */}
          <div className="p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-coffee-100 text-coffee-800 text-xs font-bold px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl font-bold text-coffee-950">{product.name}</h1>
              
              <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-coffee-900">{product.rating}</span>
                <span className="text-coffee-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>

              <p className="text-sm text-coffee-600 leading-relaxed">{product.description}</p>

              {/* Customizations if Coffee */}
              {isCoffee && (
                <div className="space-y-4 pt-2 border-t border-coffee-100">
                  <div>
                    <label className="text-xs font-bold uppercase text-coffee-400 block mb-2">Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {SIZES.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSize(s)}
                          className={`p-2 rounded-xl text-xs font-bold border ${selectedSize.id === s.id ? 'bg-coffee-900 text-white' : 'bg-coffee-50 border-coffee-200'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-coffee-400 block mb-2">Milk Choice</label>
                    <div className="grid grid-cols-2 gap-2">
                      {MILKS.map(m => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMilk(m)}
                          className={`p-2 rounded-xl text-xs font-bold border ${selectedMilk.id === m.id ? 'bg-coffee-900 text-white' : 'bg-coffee-50 border-coffee-200'}`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price & CTA */}
            <div className="pt-6 border-t border-coffee-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-coffee-400 uppercase font-semibold block">Total</span>
                <span className="font-serif text-2xl font-extrabold text-coffee-950">
                  {formatEGP(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-coffee-900 hover:bg-coffee-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md flex items-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                Add to Order
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
