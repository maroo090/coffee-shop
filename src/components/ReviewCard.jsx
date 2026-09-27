import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-coffee-200/80 shadow-coffee-soft flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-coffee-300 transition-all">
      <Quote className="w-10 h-10 text-coffee-100 absolute -top-1 -right-1 pointer-events-none group-hover:text-coffee-200/60 transition-colors" />
      
      <div className="space-y-3 relative z-10">
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm text-coffee-700 leading-relaxed italic">
          "{review.comment}"
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 pt-3 border-t border-coffee-100">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-coffee-200"
        />
        <div>
          <h4 className="font-serif text-sm font-bold text-coffee-950">{review.name}</h4>
          <p className="text-xs text-coffee-400">{review.role} • {review.date}</p>
        </div>
      </div>
    </div>
  );
};
