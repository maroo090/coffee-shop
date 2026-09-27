import React from 'react';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-coffee-700 text-white shadow-md shadow-coffee-700/20 scale-105'
                : 'bg-white text-coffee-800 hover:bg-coffee-100 hover:text-coffee-950 border border-coffee-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
