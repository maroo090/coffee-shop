import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { MyOrders } from './pages/MyOrders';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-coffee-50 text-coffee-950 font-sans selection:bg-coffee-300 selection:text-coffee-950">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            <Footer />
            <Toast />
          </div>
        </Router>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
