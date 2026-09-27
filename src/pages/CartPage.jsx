import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, Coffee, Sparkles } from 'lucide-react';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { SectionTitle } from '../components/SectionTitle';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cart, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-coffee-100 rounded-3xl flex items-center justify-center text-coffee-600 mx-auto shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-coffee-950">Your Cart is Empty</h2>
            <p className="text-sm text-coffee-600 leading-relaxed">
              Looks like you haven't added any fresh coffee or pastries to your order yet.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coffee-600 to-coffee-800 hover:from-coffee-500 hover:to-coffee-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md transition-all text-sm"
          >
            <Coffee className="w-4 h-4 text-amber-200" />
            <span>Explore Coffee Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coffee-500 bg-coffee-100 px-3 py-1 rounded-full">
              Your Order Basket
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-950 mt-2">
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 text-xs font-bold text-coffee-700 hover:text-coffee-950 bg-white border border-coffee-200 px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-2.5 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Clear Confirm Modal */}
        {showClearConfirm && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-4 text-xs text-red-800 animate-fade-in">
            <span>Are you sure you want to clear all items from your cart?</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="bg-white text-coffee-800 font-semibold px-3 py-1.5 rounded-lg border border-coffee-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Cart Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:col-span-4">
            <CartSummary />
          </div>

        </div>

      </div>
    </div>
  );
};
