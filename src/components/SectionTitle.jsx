import React from 'react';

export const SectionTitle = ({ subtitle, title, centered = true, light = false }) => {
  return (
    <div className={`space-y-2 mb-10 ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full ${
          light ? 'bg-coffee-800 text-amber-200' : 'bg-coffee-100 text-coffee-700'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-coffee-500"></span>
          {subtitle}
        </div>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${
        light ? 'text-white' : 'text-coffee-950'
      }`}>
        {title}
      </h2>
      <div className={`flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'} pt-1`}>
        <div className={`h-0.5 w-12 rounded ${light ? 'bg-coffee-700' : 'bg-coffee-300'}`}></div>
        <span className={`text-base ${light ? 'text-amber-300' : 'text-coffee-500'}`}>☕</span>
        <div className={`h-0.5 w-12 rounded ${light ? 'bg-coffee-700' : 'bg-coffee-300'}`}></div>
      </div>
    </div>
  );
};
