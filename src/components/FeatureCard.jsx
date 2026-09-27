import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description, badge }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-coffee-200/80 shadow-coffee-soft hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center space-y-4 hover:border-coffee-300 transform hover:-translate-y-1">
      
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coffee-100 to-coffee-200 group-hover:from-coffee-800 group-hover:to-coffee-950 text-coffee-800 group-hover:text-amber-200 flex items-center justify-center transition-all duration-300 shadow-md">
        <Icon className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        {badge && (
          <span className="text-[10px] uppercase tracking-widest font-bold text-coffee-600 bg-coffee-100 px-2.5 py-0.5 rounded-full inline-block">
            {badge}
          </span>
        )}
        <h3 className="font-serif text-xl font-bold text-coffee-950 group-hover:text-coffee-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-coffee-600 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};
