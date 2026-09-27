import React from 'react';
import { Package, Clock, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { formatEGP } from '../utils/formatCurrency';
import { useOrders } from '../context/OrderContext';

export const OrderCard = ({ order }) => {
  const { updateOrderStatus } = useOrders();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Preparing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Ready':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-coffee-100 text-coffee-800 border-coffee-300';
    }
  };

  const formatDate = (isoString) => {
    try {
      return new Date(isoString).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft p-6 space-y-5 transition-all hover:border-coffee-300">
      
      {/* Header: Order ID & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-coffee-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-extrabold text-coffee-950 tracking-tight">
              {order.orderId}
            </span>
            <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-coffee-400 mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(order.date)}</span>
          </div>
        </div>

        {/* Order Type & Payment Method Badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-coffee-100 text-coffee-800 font-semibold px-2.5 py-1 rounded-lg border border-coffee-200">
            {order.orderType}
          </span>
          <span className="bg-coffee-100 text-coffee-800 font-semibold px-2.5 py-1 rounded-lg border border-coffee-200">
            {order.paymentMethod}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-coffee-50 p-3 rounded-2xl border border-coffee-100 text-xs text-coffee-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-coffee-900">{order.customer.fullName}</span> • {order.customer.phone}
        </div>
        <div className="flex items-center gap-1 text-coffee-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{order.customer.address}</span>
        </div>
      </div>

      {/* Item List Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400">Order Items</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start justify-between text-xs py-1 border-b border-coffee-50 last:border-0">
              <div className="space-y-0.5">
                <span className="font-bold text-coffee-900">
                  {item.quantity}x {item.name}
                </span>

                {/* Customizations */}
                <div className="flex flex-wrap gap-1 text-[11px] text-coffee-500">
                  {item.size && item.size.label !== 'Standard' && (
                    <span>Size: {item.size.label}</span>
                  )}
                  {item.milk && item.milk.label !== 'N/A' && (
                    <span>• Milk: {item.milk.label}</span>
                  )}
                  {item.extras && item.extras.length > 0 && (
                    <span>• Extras: {item.extras.map(e => e.label).join(', ')}</span>
                  )}
                </div>
              </div>

              <span className="font-bold text-coffee-900 shrink-0">
                {formatEGP(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total & Simulated Actions */}
      <div className="pt-4 border-t border-coffee-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-coffee-400 uppercase tracking-wider font-semibold block">Total Amount</span>
          <span className="font-serif text-xl font-extrabold text-coffee-950">
            {formatEGP(order.total)}
          </span>
        </div>

        {/* Status simulation buttons for demonstration */}
        <div className="flex items-center gap-2">
          {order.status === 'Preparing' && (
            <button
              onClick={() => updateOrderStatus(order.orderId, 'Ready')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
            >
              Mark Ready
            </button>
          )}
          {order.status === 'Ready' && (
            <button
              onClick={() => updateOrderStatus(order.orderId, 'Completed')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
            >
              Complete Order
            </button>
          )}
          {order.status !== 'Completed' && order.status !== 'Cancelled' && (
            <button
              onClick={() => updateOrderStatus(order.orderId, 'Cancelled')}
              className="bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
