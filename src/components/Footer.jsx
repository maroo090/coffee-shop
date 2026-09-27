import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Send, Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setToastMessage } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setToastMessage('Thank you for subscribing to our Coffee Club!');
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-coffee-950 text-coffee-200 border-t border-coffee-800/80 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-coffee-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-500 to-coffee-700 flex items-center justify-center text-amber-200 shadow-md">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                AromaCraft <span className="text-coffee-300 font-sans text-xs uppercase px-1.5 py-0.5 rounded bg-coffee-800">Co.</span>
              </span>
            </Link>

            <p className="text-sm text-coffee-300 leading-relaxed">
              Freshly Brewed. Perfectly Crafted. Bringing Cairo the finest single-origin specialty coffees, masterfully roasted and prepared with passion.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-lg bg-coffee-900 flex items-center justify-center text-coffee-300 hover:text-white hover:bg-coffee-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-lg bg-coffee-900 flex items-center justify-center text-coffee-300 hover:text-white hover:bg-coffee-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-lg bg-coffee-900 flex items-center justify-center text-coffee-300 hover:text-white hover:bg-coffee-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-coffee-800/80 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-coffee-500">›</span> Home Page
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-coffee-500">›</span> Specialty Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-coffee-500">›</span> Our Story & Beans
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-coffee-500">›</span> Location & Contact
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-coffee-500">›</span> Track My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-coffee-800/80 pb-2">
              Visit & Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-coffee-300">
                <MapPin className="w-5 h-5 text-coffee-500 shrink-0 mt-0.5" />
                <span>15 Road 9, Maadi District, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3 text-coffee-300">
                <Phone className="w-5 h-5 text-coffee-500 shrink-0" />
                <span>+20 100 888 9900</span>
              </div>
              <div className="flex items-center gap-3 text-coffee-300">
                <Mail className="w-5 h-5 text-coffee-500 shrink-0" />
                <span>hello@aromacraftcoffee.com</span>
              </div>
              <div className="flex items-start gap-3 text-coffee-300 pt-1">
                <Clock className="w-5 h-5 text-coffee-500 shrink-0 mt-0.5" />
                <div>
                  <p><span className="text-white font-medium">Mon - Sun:</span> 7:00 AM - 11:00 PM</p>
                  <p className="text-xs text-coffee-400">Fresh Roasts Daily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-coffee-800/80 pb-2">
              Join Coffee Club
            </h3>
            <p className="text-sm text-coffee-300">
              Subscribe for exclusive bean drops, promo codes, and secret menu invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-coffee-900 border border-coffee-700 rounded-xl text-amber-300 text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 fill-amber-300" />
                <span>You're in! Welcome to the club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-coffee-900 text-white placeholder-coffee-400 text-sm px-4 py-3 rounded-xl border border-coffee-800 focus:outline-none focus:border-coffee-500 pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-coffee-600 hover:bg-coffee-500 text-white px-3 rounded-lg flex items-center justify-center transition-colors"
                    title="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-coffee-400">No spam, unsubscribe anytime.</p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-coffee-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-coffee-400">
          <p>© {new Date().getFullYear()} AromaCraft Coffee Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Specialty Coffee Egypt</span>
            <span>•</span>
            <span>100% Arabica Certified</span>
            <span>•</span>
            <span>Craft Roasted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
