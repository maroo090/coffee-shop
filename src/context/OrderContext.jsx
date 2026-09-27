import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

const INITIAL_MOCK_ORDERS = [
  {
    orderId: 'ORD-2026-00104',
    date: '2026-09-26T14:30:00Z',
    customer: {
      fullName: 'Ahmed Hassan',
      phone: '+20 100 123 4567',
      email: 'ahmed.hassan@example.com',
      address: 'Bldg 12, Road 9, Maadi, Cairo',
      orderNotes: 'Please deliver to 3rd floor.'
    },
    items: [
      {
        name: 'Spanish Latte',
        quantity: 2,
        unitPrice: 130,
        size: { label: 'Medium (12 oz)' },
        milk: { label: 'Oat Milk 🌾' },
        extras: [{ label: 'Extra Espresso Shot ☕' }]
      },
      {
        name: 'San Sebastian Cheesecake',
        quantity: 1,
        unitPrice: 140,
        size: { label: 'Standard' },
        milk: { label: 'N/A' },
        extras: []
      }
    ],
    orderType: 'Delivery',
    paymentMethod: 'Card',
    subtotal: 400,
    deliveryFee: 30,
    discount: 0,
    total: 430,
    status: 'Completed'
  },
  {
    orderId: 'ORD-2026-00098',
    date: '2026-09-24T09:15:00Z',
    customer: {
      fullName: 'Ahmed Hassan',
      phone: '+20 100 123 4567',
      email: 'ahmed.hassan@example.com',
      address: 'Corner Roaster Cafe Branch - Maadi',
      orderNotes: 'Pickup at counter'
    },
    items: [
      {
        name: 'Artisanal Cappuccino',
        quantity: 1,
        unitPrice: 95,
        size: { label: 'Small (8 oz)' },
        milk: { label: 'Whole Milk' },
        extras: []
      },
      {
        name: 'French Butter Croissant',
        quantity: 2,
        unitPrice: 65,
        size: { label: 'Standard' },
        milk: { label: 'N/A' },
        extras: []
      }
    ],
    orderType: 'Pickup',
    paymentMethod: 'Cash',
    subtotal: 225,
    deliveryFee: 0,
    discount: 0,
    total: 225,
    status: 'Completed'
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aroma_orders');
      if (saved) {
        return JSON.parse(saved);
      } else {
        localStorage.setItem('aroma_orders', JSON.stringify(INITIAL_MOCK_ORDERS));
        return INITIAL_MOCK_ORDERS;
      }
    } catch (e) {
      console.error('Failed to parse orders from localStorage:', e);
      return INITIAL_MOCK_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aroma_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.orderId === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
