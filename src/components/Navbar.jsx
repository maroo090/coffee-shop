import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Coffee, Menu as MenuIcon, X, ClipboardList, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'My Orders', path: '/my-orders' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-coffee-950/95 backdrop-blur-md shadow-coffee-deep py-3 border-b border-coffee-800/50'
          : 'bg-gradient-to-b from-coffee-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-500 to-coffee-700 flex items-center justify-center text-amber-200 shadow-md transform group-hover:rotate-6 transition-transform">
              <Coffee className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-white tracking-wide flex items-center gap-1.5">
                AromaCraft
                <span className="text-coffee-300 font-sans text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-coffee-800/80 border border-coffee-700">
                  Co.
                </span>
              </span>
              <span className="text-[10px] text-coffee-300 tracking-widest font-medium uppercase -mt-1">
                Specialty Coffee
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-coffee-900/60 p-1.5 rounded-full border border-coffee-800/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-coffee-600 text-white shadow-sm'
                      : 'text-coffee-200 hover:text-white hover:bg-coffee-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Cart & Order Now */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-coffee-900/80 text-coffee-200 hover:text-white hover:bg-coffee-800 border border-coffee-700/60 transition-all group"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coffee-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-coffee-950 animate-pulse-subtle">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Prominent Order Now Button */}
            <button
              onClick={() => navigate('/menu')}
              className="flex items-center gap-2 bg-gradient-to-r from-coffee-500 to-coffee-600 hover:from-coffee-400 hover:to-coffee-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-coffee-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Cart Button Mobile */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-coffee-900 text-coffee-200 border border-coffee-800"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-coffee-900 text-coffee-200 border border-coffee-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-coffee-950 border-b border-coffee-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in-down">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                    active
                      ? 'bg-coffee-600 text-white font-semibold'
                      : 'text-coffee-200 hover:bg-coffee-900 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.name === 'My Orders' && <ClipboardList className="w-4 h-4 opacity-70" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-coffee-800/80">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/menu');
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-coffee-500 to-coffee-600 text-white py-3 rounded-xl font-bold text-base shadow-md"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
