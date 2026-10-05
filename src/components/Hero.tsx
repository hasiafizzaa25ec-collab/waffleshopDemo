import React, { useState } from 'react';
import { ArrowRight, Sparkles, Clock, MapPin } from 'lucide-react';
import { IMAGES } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomBuilder: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenCustomBuilder,
  onOpenReservation,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EADBCC]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Announcement Banner (Non-pill, clean unboxed typographic lead) */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#7A6E63] mb-6">
          <span className="text-[#B85D19] font-semibold">Artisanal Bakery</span>
          <span aria-hidden="true">·</span>
          <span>Fresh 48-hr brioche dough baked continuously</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">Liege Pearl Sugar & Brussels Lattice</span>
        </div>

        {/* Main Grid: Headline & CTAs on Left, Hero Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Headline with balanced wrapping */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#24211E] leading-[1.12] text-balance">
              Handcrafted Belgian waffles, caramelized to crisp perfection.
            </h1>

            {/* Sub-prose with optimal line length measure */}
            <p className="text-base sm:text-lg text-[#5C534B] leading-relaxed max-w-xl">
              From our slow 48-hour cold fermented brioche dough to authentic pearl sugar imported from Verviers, Belgium. Baked to order on vintage cast-iron presses for that signature crackle and melt-in-your-mouth warmth.
            </p>

            {/* Action buttons (single line, functional handlers) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#B85D19] hover:bg-[#9E4D12] rounded-lg shadow-sm transition-all hover:translate-y-[-1px] whitespace-nowrap"
              >
                <span>Explore Daily Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomBuilder}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#24211E] bg-[#FFFFFF] hover:bg-[#F3ECE0] border border-[#EADBCC] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Build Custom Waffle</span>
              </button>
            </div>

            {/* Clean unboxed proof markers */}
            <div className="pt-6 border-t border-[#EADBCC] grid grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#24211E] tabular-nums">48<span className="text-sm font-sans font-normal text-[#7A6E63]">hr</span></p>
                <p className="text-xs text-[#7A6E63] mt-0.5">Cold Brioche Rise</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#24211E] tabular-nums">180<span className="text-sm font-sans font-normal text-[#7A6E63]">°C</span></p>
                <p className="text-xs text-[#7A6E63] mt-0.5">Cast Iron Sear</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#24211E] tabular-nums">100<span className="text-sm font-sans font-normal text-[#7A6E63]">%</span></p>
                <p className="text-xs text-[#7A6E63] mt-0.5">Belgian Pearl Sugar</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photographic Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#EADBCC]/30 border border-[#EADBCC] shadow-lg aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              
              {/* Zero-Broken-Image Policy: styled CSS/SVG fallback container */}
              <div 
                className={`absolute inset-0 bg-[#EFE9DF] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#E5DDCF] flex items-center justify-center text-[#B85D19] mb-3">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <p className="font-display font-medium text-[#24211E] text-base">Maison Signature Belgian Liege Waffle</p>
                <p className="text-xs text-[#7A6E63] mt-1">Caramelized pearl sugar, berries & whipped mascarpone</p>
              </div>

              {/* Primary Generated High-Fidelity Asset */}
              <img
                src={IMAGES.hero}
                alt="Artisanal golden Belgian Liege waffle with wild berries, powdered sugar, and maple drizzle"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Subtle bottom contextual caption card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-[#EADBCC]/80 shadow-md">
                <div className="flex items-center justify-between text-xs text-[#7A6E63] mb-1">
                  <span className="font-medium text-[#B85D19]">Chef Selection</span>
                  <span className="font-mono tabular-nums text-[#24211E] font-semibold">$11.50</span>
                </div>
                <p className="text-xs font-semibold text-[#24211E]">Wild Berry & Mascarpone Brussels Stack</p>
                <p className="text-[11px] text-[#7A6E63] mt-0.5">Light honeycomb pockets with vanilla chantilly</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
