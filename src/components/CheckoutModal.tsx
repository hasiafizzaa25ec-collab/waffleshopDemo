import React, { useState } from 'react';
import { X, Check, Clock, ShoppingBag, MapPin, Receipt, ArrowLeft, Printer } from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types/waffle';
import { CAFE_INFO } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discount: number;
  discountCode?: string;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discount,
  discountCode,
  onOrderSuccess,
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup' as 'pickup' | 'dine-in',
    scheduledTime: 'In 15–20 minutes (Fastest)',
    paymentMethod: 'counter' as 'counter' | 'card',
    orderNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = (subtotal - discount) * 0.0825;
  const total = Math.max(0, subtotal - discount + tax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order: OrderConfirmation = {
        orderNumber: `MG-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        orderType: customerInfo.orderType,
        scheduledTime: customerInfo.scheduledTime,
        items: [...cartItems],
        subtotal,
        discount,
        tax,
        total,
        paymentMethod: customerInfo.paymentMethod === 'counter' ? 'Pay at Bakery Counter' : 'Online Card Pre-pay',
        estimatedPrepMinutes: 18,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#EADBCC] max-w-xl w-full my-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EADBCC] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#B85D19]" />
            <h2 className="font-display text-xl font-bold text-[#24211E]">
              {completedOrder ? 'Order Confirmed' : 'Checkout & Pickup Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7A6E63] hover:text-[#24211E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {completedOrder ? (
          /* Confirmed Order State */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Baking Started
              </span>
              <h3 className="font-display text-2xl font-bold text-[#24211E]">
                Thank you, {completedOrder.customerName}!
              </h3>
              <p className="text-xs text-[#7A6E63] font-mono">
                Order Ticket: #{completedOrder.orderNumber} · Ready at approximately {completedOrder.timestamp}
              </p>
            </div>

            {/* Live Preparation Tracker */}
            <div className="bg-[#FAF7F2] border border-[#EADBCC] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#24211E] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#B85D19]" />
                  <span>Estimated Bake Time: ~{completedOrder.estimatedPrepMinutes} mins</span>
                </span>
                <span className="text-emerald-700 font-medium">In Oven</span>
              </div>

              {/* Step indicator */}
              <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-medium">
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-600" />
                  <span className="text-[#24211E]">Received</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-600" />
                  <span className="text-[#24211E]">Proofing</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-[#B85D19] animate-pulse" />
                  <span className="text-[#B85D19] font-bold">180°C Press</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-stone-300" />
                  <span className="text-stone-400">At Counter</span>
                </div>
              </div>
            </div>

            {/* Pickup Instructions */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#5C534B]">
              <MapPin className="w-4 h-4 text-[#B85D19] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#24211E] block">Pickup Location:</span>
                <span>{CAFE_INFO.address}</span>
                <p className="text-[11px] text-[#7A6E63] mt-0.5">
                  Show your order ticket #{completedOrder.orderNumber} at the pickup counter window.
                </p>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="border border-[#EADBCC] rounded-xl p-4 text-xs space-y-2">
              <span className="font-bold text-[#24211E] uppercase tracking-wider text-[11px] block">
                Itemized Receipt
              </span>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[#5C534B]">
                  <span>
                    {item.quantity}x {item.isCustom ? (item.customWaffle?.notes || 'Custom Waffle') : item.item?.name}
                  </span>
                  <span className="font-mono tabular-nums">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#EADBCC] flex justify-between font-bold text-[#24211E]">
                <span>Total Paid ({completedOrder.paymentMethod})</span>
                <span className="font-mono tabular-nums">${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-[#5C534B] bg-[#FAF7F2] border border-[#EADBCC] rounded-lg hover:bg-[#EFE9DF]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#B85D19] rounded-lg shadow-sm"
              >
                Done / Back to Home
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-5">
            
            {/* Order type switch */}
            <div>
              <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCustomerInfo({ ...customerInfo, orderType: 'pickup' })}
                  className={`p-2.5 rounded-lg border text-xs text-center font-medium transition-colors ${
                    customerInfo.orderType === 'pickup'
                      ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E]'
                      : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                  }`}
                >
                  Bakery Pickup Counter
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerInfo({ ...customerInfo, orderType: 'dine-in' })}
                  className={`p-2.5 rounded-lg border text-xs text-center font-medium transition-colors ${
                    customerInfo.orderType === 'dine-in'
                      ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E]'
                      : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                  }`}
                >
                  Dine-in Table Service
                </button>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marc Van Houtte"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                    Phone (for Ready notification) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="marc@example.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                Pickup Timing
              </label>
              <select
                value={customerInfo.scheduledTime}
                onChange={(e) => setCustomerInfo({ ...customerInfo, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
              >
                <option value="In 15–20 minutes (Fastest)">In 15–20 minutes (Fastest batch)</option>
                <option value="In 30 minutes">In 30 minutes</option>
                <option value="In 45 minutes">In 45 minutes</option>
                <option value="In 1 hour">In 1 hour</option>
                <option value="Scheduled later today">Scheduled for afternoon pickup</option>
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'counter' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-colors ${
                    customerInfo.paymentMethod === 'counter'
                      ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-medium'
                      : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                  }`}
                >
                  <span className="block font-semibold">Pay at Bakery</span>
                  <span className="text-[11px] text-[#7A6E63]">Cash, Card, or Apple Pay on pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'card' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-colors ${
                    customerInfo.paymentMethod === 'card'
                      ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-medium'
                      : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                  }`}
                >
                  <span className="block font-semibold">Online Pre-pay</span>
                  <span className="text-[11px] text-[#7A6E63]">Express contactless pickup</span>
                </button>
              </div>
            </div>

            {/* Total Recap */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCC] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7A6E63] block">Amount Due</span>
                <span className="font-mono text-xl font-bold text-[#24211E] tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-[#7A6E63]">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items included
              </span>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#B85D19] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending to Bakery Iron...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#F5C28C]" />
                    <span>Place Order & Start Baking</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
