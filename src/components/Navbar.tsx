import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/waffle';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark in display serif */}
          <div className="flex-shrink-0">
            <a 
              href="#" 
              className="text-2xl sm:text-2xl font-display font-bold tracking-tight text-[#24211E] hover:text-[#B85D19] transition-colors"
            >
              Maison de la Gaufre
            </a>
          </div>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5C534B]">
            <a 
              href="#menu" 
              className="hover:text-[#24211E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D19] hover:after:w-full after:transition-all"
            >
              Artisanal Menu
            </a>
            <a 
              href="#custom-builder" 
              className="hover:text-[#24211E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D19] hover:after:w-full after:transition-all"
            >
              Custom Waffle Bar
            </a>
            <a 
              href="#craftsmanship" 
              className="hover:text-[#24211E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D19] hover:after:w-full after:transition-all"
            >
              Our Belgian Craft
            </a>
            <a 
              href="#location" 
              className="hover:text-[#24211E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D19] hover:after:w-full after:transition-all"
            >
              Bakery & Hours
            </a>
            <a 
              href="#reviews" 
              className="hover:text-[#24211E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D19] hover:after:w-full after:transition-all"
            >
              Reviews
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Table Reservation Action */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#5C534B] hover:text-[#24211E] bg-[#EFE9DF] hover:bg-[#E5DDCF] rounded-lg transition-colors whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B85D19]" />
              <span>Reserve Table</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Cart with ${totalCartCount} items`}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#38332F] rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F5C28C]" />
              <span>Order</span>
              {totalCartCount > 0 ? (
                <span className="flex items-center gap-1 pl-1 border-l border-white/20 tabular-nums">
                  <span className="bg-[#B85D19] text-white px-1.5 py-0.2 rounded text-[11px] font-bold">
                    {totalCartCount}
                  </span>
                  <span className="hidden md:inline font-mono text-[11px] text-amber-200">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </span>
              ) : (
                <span className="hidden md:inline text-stone-400 font-normal">Bag</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5C534B] hover:text-[#24211E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EADBCC] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#5C534B]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DF] hover:text-[#24211E] transition-colors"
            >
              Artisanal Menu
            </a>
            <a
              href="#custom-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DF] hover:text-[#24211E] transition-colors"
            >
              Custom Waffle Bar
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DF] hover:text-[#24211E] transition-colors"
            >
              Our Belgian Craft
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DF] hover:text-[#24211E] transition-colors"
            >
              Bakery & Hours
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DF] hover:text-[#24211E] transition-colors"
            >
              Reviews & Press
            </a>
          </nav>

          <div className="pt-3 border-t border-[#EADBCC] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#24211E] bg-[#EFE9DF] rounded-lg"
            >
              <Calendar className="w-4 h-4 text-[#B85D19]" />
              <span>Reserve Table or Group Booking</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#24211E] rounded-lg"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5C28C]" />
              <span>View Order ({totalCartCount} items)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
