import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Coffee, ShoppingBag, ArrowRight, ClipboardList } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { formatEGP } from '../utils/formatCurrency';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getOrderById, orders } = useOrders();

  const orderId = searchParams.get('orderId');
  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="pt-28 pb-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Order Not Found</h2>
        <Link to="/menu" className="text-coffee-600 underline">Return to Menu</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Celebration Header */}
        <div className="bg-gradient-to-r from-coffee-950 via-coffee-900 to-coffee-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl text-center space-y-4 border border-coffee-800 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400/40 flex items-center justify-center mx-auto shadow-lg animate-pulse-subtle">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-1">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest bg-coffee-800/80 px-3 py-1 rounded-full">
              Success!
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white pt-2">
              Order Confirmed!
            </h1>
            <p className="text-sm text-coffee-200">
              Thank you for ordering from AromaCraft. Your fresh roast is now being prepared by our baristas!
            </p>
          </div>

          <div className="inline-block bg-coffee-900/90 border border-coffee-700/80 px-6 py-2.5 rounded-2xl">
            <span className="text-xs text-coffee-300 uppercase tracking-wider block font-semibold">Order ID</span>
            <span className="font-mono text-xl font-extrabold text-amber-300">{order.orderId}</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft p-6 sm:p-8 space-y-6">
          
          {/* Customer & Fulfillment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pb-6 border-b border-coffee-100">
            <div>
              <span className="text-xs text-coffee-400 uppercase font-bold block mb-1">Customer Name</span>
              <p className="font-bold text-coffee-950">{order.customer.fullName}</p>
              <p className="text-xs text-coffee-600">{order.customer.phone}</p>
              <p className="text-xs text-coffee-600">{order.customer.email}</p>
            </div>

            <div>
              <span className="text-xs text-coffee-400 uppercase font-bold block mb-1">Fulfillment Details</span>
              <p className="font-bold text-coffee-950">{order.orderType} • {order.paymentMethod}</p>
              <div className="flex items-start gap-1 text-xs text-coffee-600 mt-1">
                <MapPin className="w-3.5 h-3.5 text-coffee-500 shrink-0 mt-0.5" />
                <span>{order.customer.address}</span>
              </div>
            </div>
          </div>

          {/* Products Summary */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-coffee-950">Itemized Receipt</h3>
            <div className="space-y-3 divide-y divide-coffee-50">
              {order.items.map((item, index) => (
                <div key={index} className="pt-3 first:pt-0 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-bold text-coffee-950">{item.quantity}x {item.name}</span>
                    <div className="text-xs text-coffee-500">
                      {item.size && item.size.label !== 'Standard' && <span>{item.size.label} </span>}
                      {item.milk && item.milk.label !== 'N/A' && <span>• {item.milk.label} </span>}
                      {item.extras && item.extras.length > 0 && (
                        <span>• {item.extras.map(e => e.label).join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-coffee-900 font-serif">
                    {formatEGP(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Total */}
          <div className="pt-4 border-t border-coffee-200 space-y-2 text-sm text-coffee-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatEGP(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment ({order.orderType})</span>
              <span className="font-semibold">{order.deliveryFee > 0 ? formatEGP(order.deliveryFee) : 'FREE'}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-coffee-100 text-base">
              <span className="font-serif font-bold text-coffee-950">Total Paid</span>
              <span className="font-serif text-2xl font-extrabold text-coffee-950">
                {formatEGP(order.total)}
              </span>
            </div>
          </div>

        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/menu')}
            className="w-full sm:w-auto bg-coffee-900 hover:bg-coffee-800 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md transition-all text-sm inline-flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4 text-amber-300" />
            <span>Continue Shopping</span>
          </button>

          <button
            onClick={() => navigate('/my-orders')}
            className="w-full sm:w-auto bg-white hover:bg-coffee-50 text-coffee-950 font-bold py-3.5 px-8 rounded-2xl border border-coffee-200 shadow-sm transition-all text-sm inline-flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4 text-coffee-600" />
            <span>View All My Orders</span>
          </button>
        </div>

      </div>
    </div>
  );
};
