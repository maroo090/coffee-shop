import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../components/SectionTitle';
import { Coffee, Flame, HeartHandshake, Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const About = () => {
  const navigate = useNavigate();

  const baristas = [
    {
      name: 'Youssef Al-Sayed',
      role: 'Head Roaster & Founder',
      experience: '12 Years Coffee Crafting',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'SCA Certified Master Roaster specializing in single-origin Ethiopian and Central American bean profiling.'
    },
    {
      name: 'Nour El-Din',
      role: 'Lead Barista & Sensory Judge',
      experience: '8 Years Specialty Coffee',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Latte art champion passionate about cold brew chemistry and alternative micro-foaming textures.'
    },
    {
      name: 'Mariam Farouk',
      role: 'Quality Assurance Director',
      experience: '10 Years Cupping & Sourcing',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'Traverses highland coffee farms directly to select micro-lots with exceptional cupping scores (85+).'
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-20">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-coffee-950 via-coffee-900 to-coffee-950 text-white rounded-3xl p-8 sm:p-14 border border-coffee-800 shadow-2xl relative overflow-hidden text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-coffee-800/80 px-4 py-1.5 rounded-full inline-block">
            Our Passion & Legacy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Crafting Cairo's Finest Specialty Coffee
          </h1>
          <p className="text-sm sm:text-base text-coffee-200 leading-relaxed max-w-2xl mx-auto">
            Founded in 2021, AromaCraft Coffee Co. was born from a simple obsession: to elevate every cup of coffee into an extraordinary sensory experience.
          </p>
        </div>
      </section>

      {/* 1. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionTitle
              subtitle="The Journey"
              title="The Story Behind Every Brew"
              centered={false}
            />
            <p className="text-sm sm:text-base text-coffee-700 leading-relaxed">
              We started as a micro-roastery with a single drum roaster and a vision to replace generic commodity coffee with ethically sourced, single-origin beans.
            </p>
            <p className="text-sm text-coffee-600 leading-relaxed">
              Every batch of beans arriving at our Maadi roastery undergoes rigorous cupping evaluations. We carefully calibrate roast curves to honor the bean’s origin—whether it's the floral bergamot of Yirgacheffe or the rich hazelnut notes of Minas Gerais.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-coffee-200/80 shadow-sm">
                <div className="font-serif text-3xl font-extrabold text-coffee-900">85+</div>
                <div className="text-xs text-coffee-600 font-medium">Cupping Score Standard</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-coffee-200/80 shadow-sm">
                <div className="font-serif text-3xl font-extrabold text-coffee-900">100%</div>
                <div className="text-xs text-coffee-600 font-medium">Direct Farm Sourcing</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800"
              alt="Coffee Beans Crafting"
              className="rounded-3xl border border-coffee-200 shadow-2xl w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Brewing Process */}
      <section className="bg-coffee-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionTitle
            subtitle="Precision Brewing"
            title="Our 4-Step Craft Process"
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-coffee-900/80 rounded-3xl border border-coffee-800 space-y-3">
              <span className="text-2xl font-serif font-bold text-amber-300">01</span>
              <h3 className="font-serif text-lg font-bold">Origin Selection</h3>
              <p className="text-xs text-coffee-300 leading-relaxed">
                Hand-picked ripe red cherries harvested from high-altitude volcanic soils.
              </p>
            </div>

            <div className="p-6 bg-coffee-900/80 rounded-3xl border border-coffee-800 space-y-3">
              <span className="text-2xl font-serif font-bold text-amber-300">02</span>
              <h3 className="font-serif text-lg font-bold">Custom Drum Roast</h3>
              <p className="text-xs text-coffee-300 leading-relaxed">
                Slow air roasting tailored precisely to highlight origin aromas without char or bitterness.
              </p>
            </div>

            <div className="p-6 bg-coffee-900/80 rounded-3xl border border-coffee-800 space-y-3">
              <span className="text-2xl font-serif font-bold text-amber-300">03</span>
              <h3 className="font-serif text-lg font-bold">Grind Calibration</h3>
              <p className="text-xs text-coffee-300 leading-relaxed">
                Micron-level burr grinder adjustments calibrated hourly for humidity and temperature.
              </p>
            </div>

            <div className="p-6 bg-coffee-900/80 rounded-3xl border border-coffee-800 space-y-3">
              <span className="text-2xl font-serif font-bold text-amber-300">04</span>
              <h3 className="font-serif text-lg font-bold">Golden Extraction</h3>
              <p className="text-xs text-coffee-300 leading-relaxed">
                Extracted under 9 bars of pressure with mineralized water at exactly 93°C.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Baristas Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          subtitle="Coffee Experts"
          title="Meet Our Master Baristas"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {baristas.map((b, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft overflow-hidden p-6 space-y-4 text-center">
              <img
                src={b.image}
                alt={b.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-coffee-100 shadow-md"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-coffee-950">{b.name}</h3>
                <p className="text-xs text-coffee-600 font-semibold">{b.role}</p>
                <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                  {b.experience}
                </span>
              </div>
              <p className="text-xs text-coffee-600 leading-relaxed">{b.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-coffee-900 text-white rounded-3xl p-10 space-y-4">
          <h2 className="font-serif text-3xl font-bold">Taste the Difference Today</h2>
          <p className="text-sm text-coffee-200 max-w-xl mx-auto">
            Experience our fresh specialty coffee brewed just for you or delivered right to your doorstep.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-amber-400 hover:bg-amber-300 text-coffee-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg transition-all text-sm inline-flex items-center gap-2"
          >
            <Coffee className="w-4 h-4 text-coffee-950" />
            <span>Order Specialty Coffee</span>
          </button>
        </div>
      </section>

    </div>
  );
};
