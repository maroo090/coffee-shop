import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { CheckoutForm } from '../components/CheckoutForm';
import { CartSummary } from '../components/CartSummary';
import { useCart } from '../context/CartContext';

export const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-16 min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-coffee-950">No Items to Checkout</h2>
          <p className="text-sm text-coffee-600">Please add coffee drinks or bakery items to your cart first.</p>
          <Link
            to="/menu"
            className="inline-block bg-coffee-900 text-white text-xs font-bold px-6 py-3 rounded-xl"
          >
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-coffee-200 pb-4">
          <div>
            <button
              onClick={() => navigate('/cart')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-coffee-700 hover:text-coffee-950 transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </button>
            <h1 className="font-serif text-3xl font-bold text-coffee-950">Checkout</h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <Lock className="w-4 h-4" />
            <span>Encrypted Order Security</span>
          </div>
        </div>

        {/* Form + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-5">
            <CartSummary isCheckoutStep={true} />
          </div>
        </div>

      </div>
    </div>
  );
};
