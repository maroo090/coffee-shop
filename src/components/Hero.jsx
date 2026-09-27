import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Sparkles, Star, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 bg-gradient-to-b from-coffee-950 via-coffee-900 to-coffee-950 text-white flex items-center overflow-hidden">
      
      {/* Background Ambient Glow & Coffee Beans Particles Accent */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-coffee-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-coffee-900/90 border border-coffee-700/80 px-4 py-2 rounded-full text-xs font-semibold text-amber-300 shadow-md backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>Specialty Single-Origin Coffee House</span>
            </div>

            {/* Title & Slogan */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Freshly Brewed. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-coffee-300 to-amber-400">
                  Perfectly Crafted.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-coffee-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Immerse yourself in Cairo’s premier coffee destination. From masterfully roasted Ethiopian Yirgacheffe beans to our famous signature Spanish Lattes and artisanal bakery items.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/menu')}
                className="w-full sm:w-auto bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-400 hover:to-coffee-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-coffee-glow transition-all flex items-center justify-center gap-3 text-base transform hover:-translate-y-0.5"
              >
                <Coffee className="w-5 h-5 text-amber-200" />
                <span>Order Now</span>
              </button>

              <button
                onClick={() => navigate('/menu')}
                className="w-full sm:w-auto bg-coffee-900/80 hover:bg-coffee-800 text-coffee-100 font-semibold px-8 py-4 rounded-2xl border border-coffee-700/80 hover:border-coffee-500 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 text-coffee-300" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-coffee-800/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="font-serif text-2xl font-bold text-amber-300">100%</div>
                <div className="text-xs text-coffee-300">Arabica Beans</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-300">4.9 ★</div>
                <div className="text-xs text-coffee-300">1,200+ Reviews</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-300">30 Min</div>
                <div className="text-xs text-coffee-300">Fresh Delivery</div>
              </div>
            </div>

          </div>

          {/* Right High-Quality Coffee Image Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Glow halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-coffee-600/30 to-amber-500/20 rounded-full blur-2xl transform scale-95"></div>

            {/* Main Featured Image Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden border-2 border-coffee-700/80 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=900"
                alt="AromaCraft Signature Espresso Pour"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-transparent to-transparent"></div>

              {/* Floating Quality Badge 1 (Top Right) */}
              <div className="absolute top-6 right-6 bg-coffee-950/80 backdrop-blur-md border border-coffee-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Award Winner</div>
                  <div className="text-[10px] text-coffee-300">Best Cairo Roastery 2026</div>
                </div>
              </div>

              {/* Floating Review Badge 2 (Bottom Left) */}
              <div className="absolute bottom-6 left-6 right-6 bg-coffee-950/90 backdrop-blur-md border border-coffee-700/80 p-4 rounded-2xl shadow-xl space-y-1">
                <div className="flex items-center justify-between text-xs text-amber-300">
                  <span className="font-bold text-white">Spanish Latte</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                  </div>
                </div>
                <p className="text-xs text-coffee-200 line-clamp-1 italic">
                  "Condensed milk sweetness with bold espresso notes."
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
