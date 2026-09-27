import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Coffee, Filter } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { OrderCard } from '../components/OrderCard';
import { useOrders } from '../context/OrderContext';

export const MyOrders = () => {
  const { orders } = useOrders();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'All') return true;
    return order.status === filterStatus;
  });

  const statuses = ['All', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <SectionTitle
          subtitle="Order Tracking & History"
          title="My Orders History"
        />

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-coffee-200">
          <Filter className="w-4 h-4 text-coffee-400 shrink-0 mr-1" />
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-coffee-900 text-white shadow-sm'
                  : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-coffee-200 shadow-coffee-soft space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-coffee-100 rounded-2xl flex items-center justify-center text-coffee-600 mx-auto">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-coffee-950">No Orders Found</h3>
            <p className="text-sm text-coffee-600">
              {filterStatus === 'All'
                ? "You haven't placed any coffee orders yet."
                : `No orders currently marked as '${filterStatus}'.`}
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-coffee-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
            >
              <Coffee className="w-4 h-4 text-amber-300" />
              <span>Order Fresh Coffee</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
