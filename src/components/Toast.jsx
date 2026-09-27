import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className="bg-coffee-950 text-white border border-coffee-700/80 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-coffee-600 flex items-center justify-center shrink-0 text-amber-200">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium pr-2 text-coffee-100">{toastMessage}</p>
        <button
          onClick={() => setToastMessage(null)}
          className="text-coffee-400 hover:text-white p-1 rounded-lg transition-colors ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
