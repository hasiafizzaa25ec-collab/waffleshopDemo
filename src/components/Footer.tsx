import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#24211E] text-[#E5DDCF] pt-16 pb-12 border-t border-[#38332F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-bold text-white tracking-tight block">
              Maison de la Gaufre
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal Belgian Liege & Brussels waffle house. Celebrating centuries of Belgian baking craft with slow 48-hour fermented brioche, coarse Verviers pearl sugar, and single-origin chocolate.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-1 font-mono">
              <p>{CAFE_INFO.address}</p>
              <p>{CAFE_INFO.phone} · {CAFE_INFO.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Daily Waffle Menu</a>
              </li>
              <li>
                <a href="#custom-builder" className="hover:text-white transition-colors">Custom Waffle Atelier</a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">Our Fermentation Craft</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Bakery Hours & Map</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Table Reservations</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Press & Reviews</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Baker's Club */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              The Baker's Journal
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive secret seasonal toppings, weekend specials, and invitations to our Belgian pastry masterclasses.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Merci! You're subscribed to the Baker's Journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#B85D19] hover:bg-[#9E4D12] rounded-lg transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
            
            <p className="text-[11px] text-stone-400">
              Zero spam. Unsubscribe anytime with one click.
            </p>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Maison de la Gaufre Ltd.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Allergen Notice: Nut-free & gluten-friendly preparation available</span>
            <span aria-hidden="true">·</span>
            <span>Authentic Belgian Recipe</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
