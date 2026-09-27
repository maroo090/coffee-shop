import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatEGP } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const itemSubtotal = item.unitPrice * item.quantity;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-coffee-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-coffee-300">
      
      {/* Product Image & Meta */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover border border-coffee-100 shrink-0"
        />

        <div className="space-y-1 flex-1">
          <span className="text-[10px] uppercase font-bold text-coffee-500 bg-coffee-100 px-2 py-0.5 rounded-full inline-block">
            {item.category}
          </span>
          <h4 className="font-serif text-base font-bold text-coffee-950 line-clamp-1">
            {item.name}
          </h4>

          {/* Selected Customization Options Tags */}
          <div className="flex flex-wrap gap-1 text-[11px] text-coffee-600 pt-0.5">
            {item.size && item.size.label !== 'Standard' && (
              <span className="bg-coffee-50 text-coffee-700 px-2 py-0.5 rounded-md border border-coffee-200">
                {item.size.label}
              </span>
            )}
            {item.milk && item.milk.label !== 'N/A' && (
              <span className="bg-coffee-50 text-coffee-700 px-2 py-0.5 rounded-md border border-coffee-200">
                {item.milk.label}
              </span>
            )}
            {item.extras && item.extras.length > 0 && item.extras.map((extra, idx) => (
              <span key={idx} className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
                {extra.label}
              </span>
            ))}
          </div>

          <div className="text-xs text-coffee-400">
            Unit Price: <span className="font-semibold text-coffee-800">{formatEGP(item.unitPrice)}</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Quantity Adjuster, Subtotal & Trash */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-coffee-100">
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-coffee-100 p-1 rounded-xl border border-coffee-200">
          <button
            type="button"
            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white text-coffee-900 hover:bg-coffee-200 flex items-center justify-center font-bold text-xs shadow-sm transition-colors"
            title="Decrease Quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-bold text-xs px-2 text-coffee-950">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-white text-coffee-900 hover:bg-coffee-200 flex items-center justify-center font-bold text-xs shadow-sm transition-colors"
            title="Increase Quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Subtotal */}
        <div className="text-right">
          <span className="text-[10px] text-coffee-400 block font-medium">Subtotal</span>
          <span className="font-serif text-base font-extrabold text-coffee-950">
            {formatEGP(itemSubtotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.cartItemId)}
          className="p-2 text-coffee-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
