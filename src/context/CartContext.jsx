import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('aroma_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('aroma_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, options = {}) => {
    // Generate unique key based on product ID & customization options
    const size = options.size || { id: 'small', label: 'Small', priceMultiplier: 0 };
    const milk = options.milk || { id: 'regular', label: 'Whole Milk', price: 0 };
    const extras = options.extras || [];
    const quantity = options.quantity || 1;

    // Calculate item unit price
    const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = product.price + size.priceMultiplier + milk.price + extrasTotal;

    const extrasKey = extras.map(e => e.id).sort().join('-');
    const cartItemId = `${product.id}_${size.id}_${milk.id}_${extrasKey}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            basePrice: product.price,
            unitPrice,
            quantity,
            size,
            milk,
            extras
          }
        ];
      }
    });

    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
