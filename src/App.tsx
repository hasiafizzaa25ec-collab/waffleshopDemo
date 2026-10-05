import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomWaffleBuilder } from './components/CustomWaffleBuilder';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationReservation } from './components/LocationReservation';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import {
  WaffleItem,
  ToppingOption,
  CustomWaffleCreation,
  CartItem,
  OrderConfirmation,
  ReservationData,
} from './types/waffle';
import { MENU_ITEMS } from './data/menuData';

export default function App() {
  // Cart state with local storage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_gaufre_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Seed with 1 initial iconic item for immediate engagement
    return [
      {
        cartId: 'init-liege-1',
        isCustom: false,
        item: MENU_ITEMS[0],
        quantity: 1,
        selectedToppings: [],
        unitPrice: MENU_ITEMS[0].price,
        totalPrice: MENU_ITEMS[0].price,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('maison_gaufre_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Add standard menu item
  const handleAddToCart = (
    item: WaffleItem,
    selectedToppings: ToppingOption[] = [],
    notes: string = ''
  ) => {
    const toppingsCost = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = item.price + toppingsCost;

    // Check if duplicate standard item exists with same toppings & notes
    const existingIndex = cartItems.findIndex(
      (c) =>
        !c.isCustom &&
        c.item?.id === item.id &&
        c.notes === notes &&
        JSON.stringify(c.selectedToppings?.map((t) => t.id).sort()) ===
          JSON.stringify(selectedToppings.map((t) => t.id).sort())
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice = updated[existingIndex].quantity * unitPrice;
      setCartItems(updated);
    } else {
      const newCartItem: CartItem = {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        isCustom: false,
        item,
        quantity: 1,
        selectedToppings,
        notes,
        unitPrice,
        totalPrice: unitPrice,
      };
      setCartItems([...cartItems, newCartItem]);
    }

    // Open cart drawer so user sees visual feedback
    setIsCartOpen(true);
  };

  // Add custom atelier waffle
  const handleAddCustomWaffle = (customCreation: CustomWaffleCreation) => {
    const newCartItem: CartItem = {
      cartId: `custom-cart-${Date.now()}`,
      isCustom: true,
      customWaffle: customCreation,
      quantity: customCreation.quantity,
      notes: customCreation.notes,
      unitPrice: customCreation.totalPrice / customCreation.quantity,
      totalPrice: customCreation.totalPrice,
    };

    setCartItems([...cartItems, newCartItem]);
    setIsCartOpen(true);
  };

  // Quantity updates
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Proceed to checkout
  const handleProceedToCheckout = (discount: number, code: string) => {
    setAppliedDiscount(discount);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order success
  const handleOrderSuccess = (order: OrderConfirmation) => {
    setLastOrder(order);
    setCartItems([]); // clear cart
  };

  // Smooth scroll helpers
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomBuilder = () => {
    const el = document.getElementById('custom-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211E]">
      
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToLocation}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenCustomBuilder={scrollToCustomBuilder}
          onOpenReservation={scrollToLocation}
        />

        {/* Artisanal Menu & Ordering Grid */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenCustomBuilder={scrollToCustomBuilder}
        />

        {/* The Custom Waffle Atelier Studio */}
        <CustomWaffleBuilder
          onAddCustomWaffle={handleAddCustomWaffle}
        />

        {/* Belgian Craftsmanship & Fermentation Story */}
        <CraftsmanshipSection />

        {/* Reviews & Press Recognition */}
        <ReviewsSection />

        {/* Location, Bakery Schedule & Table Reservation */}
        <LocationReservation />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Pickup Ticket Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discount={appliedDiscount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Elegant Quiet Footer */}
      <Footer />

    </div>
  );
}
