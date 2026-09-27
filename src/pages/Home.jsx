import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { FeatureCard } from '../components/FeatureCard';
import { ReviewCard } from '../components/ReviewCard';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { GALLERY_IMAGES } from '../data/gallery';
import { Coffee, Award, Sparkles, Truck, Clock, MapPin, ArrowRight, Flame, HeartHandshake } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const popularProducts = PRODUCTS.filter(p => p.popular).slice(0, 8);

  const features = [
    {
      icon: Coffee,
      title: 'Ethically Sourced',
      description: '100% Arabica single-origin beans sourced directly from fair-trade micro-farms in Ethiopia and Colombia.',
      badge: 'Single Origin'
    },
    {
      icon: Award,
      title: 'Master Baristas',
      description: 'Engineered extraction techniques by certified SCA baristas dedicated to perfect grind size and steam texture.',
      badge: 'Certified SCA'
    },
    {
      icon: Flame,
      title: 'Artisanal Roasting',
      description: 'Small-batch roasting in-house every Tuesday and Friday to guarantee optimal flavor profile and fresh bloom.',
      badge: 'In-House Roast'
    },
    {
      icon: Truck,
      title: 'Express Delivery',
      description: 'Piped hot or ice-chilled in insulated thermal flasks delivered to your home or office in under 30 minutes.',
      badge: 'Thermal Piped'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <Hero />

      {/* 1. Popular Coffee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Customer Favorites"
          title="Popular Coffee & Beverages"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-coffee-950 hover:bg-coffee-800 text-amber-200 font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-coffee-glow"
          >
            <span>Explore Full 20+ Drink Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. About Our Coffee Spotlight Banner */}
      <section className="bg-coffee-950 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-coffee-900 border border-coffee-700 px-3 py-1 rounded-full">
                Artisanal Craftsmanship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                From Bean to Cup: <br />
                The Science of Extraordinary Coffee
              </h2>
              <p className="text-sm sm:text-base text-coffee-200 leading-relaxed">
                At AromaCraft, coffee brewing is both an art and a discipline. We carefully profile every roast to accentuate natural tasting notes of jasmine, dark cocoa, honey sweetness, and citrus zest.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-coffee-900/60 rounded-2xl border border-coffee-800">
                  <h4 className="font-bold text-amber-300 text-lg">Strict Water Filtration</h4>
                  <p className="text-xs text-coffee-300 mt-1">Reverse osmosis with custom mineral balance for optimal coffee solubility.</p>
                </div>
                <div className="p-4 bg-coffee-900/60 rounded-2xl border border-coffee-800">
                  <h4 className="font-bold text-amber-300 text-lg">9-Bar Pressure</h4>
                  <p className="text-xs text-coffee-300 mt-1">Extracted on La Marzocco espresso machines for dense, golden crema.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/about')}
                  className="bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-400 hover:to-coffee-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm inline-flex items-center gap-2"
                >
                  Read Our Story
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800"
                alt="Coffee Roasting Process"
                className="rounded-3xl border-2 border-coffee-800 shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-coffee-900 border border-coffee-700 p-4 rounded-2xl shadow-xl text-white flex items-center gap-3">
                <HeartHandshake className="w-8 h-8 text-amber-300 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Direct Trade Certified</div>
                  <div className="text-xs text-coffee-300">Supporting coffee farming families</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Our Difference"
          title="Why Coffee Lovers Choose AromaCraft"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard key={idx} {...feat} />
          ))}
        </div>
      </section>

      {/* 4. Special Offers Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-coffee-950 via-coffee-900 to-coffee-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-coffee-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <span className="bg-amber-400 text-coffee-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full inline-block tracking-wider">
              Limited Special Offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Morning Brew & Bakery Combo
            </h2>
            <p className="text-coffee-200 text-sm sm:text-base leading-relaxed">
              Order any Large Hot/Iced Specialty Coffee and get a French Butter Croissant or Almond Danish for 20% off. Use promo code <code className="bg-coffee-900 px-2 py-0.5 rounded text-amber-300 border border-coffee-700 font-mono">COFFEE10</code> at checkout!
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('/menu')}
                className="bg-amber-400 hover:bg-amber-300 text-coffee-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg transition-all text-sm inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-coffee-950" />
                Claim Offer & Order Now
              </button>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-64 h-64 rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600"
              alt="Special Coffee Combo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Testimonials"
          title="What Our Customers Say"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* 6. Coffee Shop Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Visual Ambiance"
          title="Inside AromaCraft Coffee Shop"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.id} className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-coffee-100 shadow-md">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">{img.category}</span>
                <h4 className="font-serif text-lg font-bold">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Opening Hours & Location Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-coffee-100 text-coffee-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee-950">Opening Hours</h3>
            <p className="text-sm text-coffee-600">
              Monday - Sunday: <span className="font-bold text-coffee-900">7:00 AM - 11:00 PM</span> <br />
              Fresh morning roasts served every day.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-coffee-100 text-coffee-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee-950">Store Location</h3>
            <p className="text-sm text-coffee-600">
              15 Road 9, Maadi District, Cairo <br />
              <span className="text-xs text-coffee-400">Convenient parking & outdoor garden seating</span>
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="bg-coffee-900 hover:bg-coffee-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md text-sm text-center"
            >
              Get Directions & Contact
            </button>
          </div>

        </div>
      </section>

      {/* Product Details Modal Trigger */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
};
