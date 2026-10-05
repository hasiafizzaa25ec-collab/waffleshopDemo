import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/waffle';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const tax = (subtotal - discountAmount) * 0.0825; // 8.25% sales tax
  const grandTotal = Math.max(0, subtotal - discountAmount + tax);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'WAFFLE10' || code === 'BELGIUM10') {
      setDiscountPercent(10);
      setPromoSuccess('10% artisan discount applied!');
    } else if (code === 'SWEET20') {
      setDiscountPercent(20);
      setPromoSuccess('20% connoisseur discount applied!');
    } else {
      setPromoError('Invalid code. Try "WAFFLE10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EADBCC] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EADBCC] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B85D19]" />
              <h2 className="font-display text-xl font-bold text-[#24211E]">
                Your Bakery Bag
              </h2>
              <span className="text-xs font-mono text-[#7A6E63] tabular-nums">
                ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7A6E63] hover:text-[#24211E] hover:bg-[#EFE9DF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EADBCC] flex items-center justify-center mx-auto text-[#B85D19]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="font-display text-lg font-bold text-[#24211E]">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#7A6E63] max-w-xs mx-auto">
                  Add fresh Liege waffles, airy Brussels squares, or create your custom waffle from our Atelier.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#B85D19] rounded-lg hover:bg-[#9E4D12]"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((cartItem) => {
                const itemName = cartItem.isCustom
                  ? (cartItem.customWaffle?.notes || cartItem.customWaffle?.baseDough.name || 'Custom Waffle')
                  : cartItem.item?.name;

                return (
                  <div
                    key={cartItem.cartId}
                    className="p-4 rounded-xl border border-[#EADBCC] bg-[#FAF7F2] space-y-2 relative"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {cartItem.isCustom && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B85D19] block">
                            Custom Waffle Atelier
                          </span>
                        )}
                        <h4 className="font-display text-sm font-bold text-[#24211E]">
                          {itemName}
                        </h4>
                        
                        {/* Custom breakdown or selected toppings */}
                        {cartItem.isCustom && cartItem.customWaffle ? (
                          <p className="text-[11px] text-[#7A6E63] mt-0.5 leading-snug">
                            {cartItem.customWaffle.baseDough.name}
                            {cartItem.customWaffle.drizzles.length > 0 && ` · ${cartItem.customWaffle.drizzles.map((d) => d.name).join(', ')}`}
                            {cartItem.customWaffle.fruits.length > 0 && ` · ${cartItem.customWaffle.fruits.map((f) => f.name).join(', ')}`}
                            {cartItem.customWaffle.crunches.length > 0 && ` · ${cartItem.customWaffle.crunches.map((c) => c.name).join(', ')}`}
                            {cartItem.customWaffle.creams.length > 0 && ` · ${cartItem.customWaffle.creams.map((cr) => cr.name).join(', ')}`}
                          </p>
                        ) : (
                          cartItem.selectedToppings && cartItem.selectedToppings.length > 0 && (
                            <p className="text-[11px] text-[#7A6E63] mt-0.5">
                              + {cartItem.selectedToppings.map((t) => t.name).join(', ')}
                            </p>
                          )
                        )}

                        {cartItem.notes && (
                          <p className="text-[11px] text-[#5C534B] italic mt-0.5">
                            Note: "{cartItem.notes}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-[#8C8075] hover:text-rose-600 p-1 rounded"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EADBCC]/60 text-xs">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#EADBCC] rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="px-2 py-0.5 text-xs text-[#5C534B] hover:text-[#24211E]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="px-2 py-0.5 text-xs text-[#5C534B] hover:text-[#24211E]"
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-[#24211E] tabular-nums">
                          ${cartItem.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Totals */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#EADBCC] bg-[#FAF7F2] space-y-4">
              
              {/* Promo code box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#7A6E63] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (try WAFFLE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-[#EADBCC] rounded-lg uppercase text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 text-xs font-semibold text-[#24211E] bg-white border border-[#EADBCC] hover:bg-[#EFE9DF] rounded-lg"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{promoSuccess}</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600">{promoError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#5C534B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#EADBCC] flex justify-between text-sm font-bold text-[#24211E]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, promoCode)}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#B85D19] rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#7A6E63]">
                Order freshly baked at 412 Cobblestone Lane · Ready in ~15-20 mins
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
