import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, CreditCard, Banknote, Truck, Store, Lock, Loader2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { generateOrderId } from '../utils/orderGenerator';

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [fulfillmentType, setFulfillmentType] = useState('Delivery'); // 'Delivery' | 'Pickup'
  const [paymentMethod, setPaymentMethod] = useState('Card'); // 'Card' | 'Cash'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    orderNotes: '',
    // Card simulation fields
    cardNumber: '4532 •••• •••• 8892',
    cardExpiry: '12/28',
    cardCvv: '321',
    cardHolder: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deliveryFee = fulfillmentType === 'Delivery' ? 30 : 0;
  const totalAmount = cartSubtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // Simulate payment gateway & order creation delay
    setTimeout(() => {
      const newOrderId = generateOrderId();
      const newOrder = {
        orderId: newOrderId,
        date: new Date().toISOString(),
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: fulfillmentType === 'Delivery' ? formData.address : 'Store Pickup (Maadi Branch)',
          orderNotes: formData.orderNotes
        },
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          size: item.size,
          milk: item.milk,
          extras: item.extras
        })),
        orderType: fulfillmentType,
        paymentMethod: paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee: deliveryFee,
        total: totalAmount,
        status: 'Preparing'
      };

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${newOrderId}`);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* 1. Fulfillment Method Selector */}
      <div className="bg-white p-6 rounded-3xl border border-coffee-200/80 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-coffee-950 flex items-center gap-2">
          <Truck className="w-5 h-5 text-coffee-600" />
          Fulfillment Option
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFulfillmentType('Delivery')}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              fulfillmentType === 'Delivery'
                ? 'bg-coffee-900 text-white border-coffee-900 shadow-md'
                : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">Doorstep Delivery</div>
                <div className="text-xs opacity-80">30 - 45 mins</div>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300">+30 EGP</span>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentType('Pickup')}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              fulfillmentType === 'Pickup'
                ? 'bg-coffee-900 text-white border-coffee-900 shadow-md'
                : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">Store Pickup</div>
                <div className="text-xs opacity-80">Maadi Branch</div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400">FREE</span>
          </button>
        </div>
      </div>

      {/* 2. Customer Information */}
      <div className="bg-white p-6 rounded-3xl border border-coffee-200/80 shadow-sm space-y-5">
        <h3 className="font-serif text-lg font-bold text-coffee-950 flex items-center gap-2">
          <User className="w-5 h-5 text-coffee-600" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Karim Mansour"
                className="w-full bg-coffee-50 border border-coffee-200 text-sm px-3 pl-9 py-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">Phone Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20 100 123 4567"
                className="w-full bg-coffee-50 border border-coffee-200 text-sm px-3 pl-9 py-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="karim@example.com"
                className="w-full bg-coffee-50 border border-coffee-200 text-sm px-3 pl-9 py-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
              />
            </div>
          </div>

          {/* Delivery Address */}
          {fulfillmentType === 'Delivery' && (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">Delivery Address *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-coffee-400 absolute left-3 top-3" />
                <textarea
                  name="address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Building No, Street Name, Floor/Apt, Area, City..."
                  className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 pl-9 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                />
              </div>
            </div>
          )}

          {/* Order Notes */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">Order Notes (Optional)</label>
            <textarea
              name="orderNotes"
              rows={2}
              value={formData.orderNotes}
              onChange={handleChange}
              placeholder="e.g. Extra hot, ring doorbell twice, leave at door..."
              className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Payment Method */}
      <div className="bg-white p-6 rounded-3xl border border-coffee-200/80 shadow-sm space-y-5">
        <h3 className="font-serif text-lg font-bold text-coffee-950 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-coffee-600" />
          Payment Method
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('Card')}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              paymentMethod === 'Card'
                ? 'bg-coffee-900 text-white border-coffee-900 shadow-md'
                : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">Credit / Debit Card</div>
                <div className="text-xs opacity-80">Instant & Simulated</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('Cash')}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              paymentMethod === 'Cash'
                ? 'bg-coffee-900 text-white border-coffee-900 shadow-md'
                : 'bg-coffee-50 border-coffee-200 text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Banknote className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">Cash on Delivery</div>
                <div className="text-xs opacity-80">Pay upon receipt</div>
              </div>
            </div>
          </button>
        </div>

        {/* Card Simulation Inputs */}
        {paymentMethod === 'Card' && (
          <div className="p-4 bg-coffee-50 rounded-2xl border border-coffee-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-coffee-600 font-semibold border-b border-coffee-200/80 pb-2">
              <span className="flex items-center gap-1.5 text-coffee-900 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Simulated Payment Gateway
              </span>
              <span className="text-coffee-400">No real charge will occur</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-coffee-600 uppercase">Cardholder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  required={paymentMethod === 'Card'}
                  value={formData.cardHolder || formData.fullName}
                  onChange={handleChange}
                  placeholder="Name on card"
                  className="w-full bg-white border border-coffee-200 text-xs px-3 py-2 rounded-xl text-coffee-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-coffee-600 uppercase">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required={paymentMethod === 'Card'}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="4532 •••• •••• 8892"
                  className="w-full bg-white border border-coffee-200 text-xs px-3 py-2 rounded-xl text-coffee-900 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-coffee-600 uppercase">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required={paymentMethod === 'Card'}
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full bg-white border border-coffee-200 text-xs px-3 py-2 rounded-xl text-coffee-900 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-coffee-600 uppercase">CVV Security Code</label>
                  <input
                    type="password"
                    name="cardCvv"
                    maxLength={4}
                    required={paymentMethod === 'Card'}
                    value={formData.cardCvv}
                    onChange={handleChange}
                    placeholder="•••"
                    className="w-full bg-white border border-coffee-200 text-xs px-3 py-2 rounded-xl text-coffee-900 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-coffee-600 to-coffee-800 hover:from-coffee-500 hover:to-coffee-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-coffee-glow flex items-center justify-center gap-3 transition-all text-base transform active:scale-98"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
            <span>Processing Coffee Order...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Confirm & Place Order</span>
          </>
        )}
      </button>

    </form>
  );
};
