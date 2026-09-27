import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatEGP } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const CartSummary = ({ isCheckoutStep = false }) => {
  const { cartSubtotal, cartCount } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  const deliveryFee = 30; // standard delivery fee in EGP
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'COFFEE10') {
      setDiscountPercent(10);
      setPromoMessage({ type: 'success', text: '10% Coffee Club Discount Applied!' });
    } else if (promoCode.trim().toUpperCase() === 'AROMA20') {
      setDiscountPercent(20);
      setPromoMessage({ type: 'success', text: '20% VIP Coffee Discount Applied!' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try COFFEE10' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-coffee-200/80 shadow-coffee-soft space-y-6 sticky top-24">
      <h3 className="font-serif text-xl font-bold text-coffee-950 border-b border-coffee-100 pb-3 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-coffee-600" />
        Order Summary
      </h3>

      {/* Item count & Subtotal */}
      <div className="space-y-3 text-sm text-coffee-700">
        <div className="flex justify-between items-center">
          <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold text-coffee-950">{formatEGP(cartSubtotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Est. Local Delivery</span>
          <span className="font-semibold text-coffee-950">{formatEGP(deliveryFee)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-emerald-600 font-semibold">
            <span>Discount ({discountPercent}%)</span>
            <span>-{formatEGP(discountAmount)}</span>
          </div>
        )}
      </div>

      {/* Promo Code Input */}
      {!isCheckoutStep && (
        <form onSubmit={handleApplyPromo} className="pt-2 border-t border-coffee-100 space-y-2">
          <label className="text-xs font-bold text-coffee-600 uppercase tracking-wider block">
            Have a Promo Code?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. COFFEE10"
                className="w-full bg-coffee-50 border border-coffee-200 text-xs font-semibold uppercase px-3 pl-9 py-2.5 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
              />
            </div>
            <button
              type="submit"
              className="bg-coffee-900 hover:bg-coffee-800 text-white text-xs font-bold px-4 rounded-xl transition-colors shrink-0"
            >
              Apply
            </button>
          </div>

          {promoMessage && (
            <p className={`text-xs ${promoMessage.type === 'success' ? 'text-emerald-600 font-semibold' : 'text-red-500'}`}>
              {promoMessage.text}
            </p>
          )}
        </form>
      )}

      {/* Total Section */}
      <div className="pt-4 border-t border-coffee-200">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-serif text-base font-bold text-coffee-950">Grand Total</span>
          <span className="font-serif text-2xl font-extrabold text-coffee-950">
            {formatEGP(grandTotal)}
          </span>
        </div>
        <p className="text-[11px] text-coffee-400">Includes all local taxes and fresh brewing preparation.</p>
      </div>

      {/* CTA Button */}
      {!isCheckoutStep && (
        <button
          onClick={() => navigate('/checkout')}
          disabled={cartCount === 0}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all ${
            cartCount === 0
              ? 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-coffee-600 to-coffee-800 hover:from-coffee-500 hover:to-coffee-700 text-white shadow-coffee-glow transform active:scale-98'
          }`}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-coffee-500 pt-2 border-t border-coffee-100">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>100% Satisfaction & Freshness Guarantee</span>
      </div>

    </div>
  );
};
