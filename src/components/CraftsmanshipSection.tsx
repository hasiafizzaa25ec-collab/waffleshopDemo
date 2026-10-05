import React, { useState } from 'react';
import { Sparkles, Award, Flame, Wheat } from 'lucide-react';
import { IMAGES } from '../data/menuData';

export const CraftsmanshipSection: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs text-[#7A6E63] font-medium mb-2">
            <span>The Belgian Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Liege Street Tradition</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Ingredients</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24211E] tracking-tight">
            Why our waffles taste like nowhere else.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5C534B] leading-relaxed">
            Most modern waffles use liquid pancake batter poured into lightweight electric non-stick irons. We honor the centuries-old Belgian baker's guild methods.
          </p>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Documentary Bakery Shot */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#EADBCC]/40 border border-[#EADBCC] shadow-md aspect-[16/10] sm:aspect-[4/3] group">
              
              {/* Fallback container */}
              <div 
                className={`absolute inset-0 bg-[#EFE9DF] flex flex-col items-center justify-center p-6 text-center ${
                  imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <Wheat className="w-10 h-10 text-[#B85D19] mb-2" />
                <p className="font-display text-[#24211E] font-medium">Cast Iron Waffle Press Bakery</p>
                <p className="text-xs text-[#7A6E63]">Authentic heavy iron preparation</p>
              </div>

              <img
                src={IMAGES.bakeryPress}
                alt="Artisan waffle bakery with steaming heavy cast iron irons, pearl sugar, and sacks of organic flour"
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#EADBCC]/80 shadow-md">
                <p className="text-xs font-semibold text-[#24211E]">The Iron Room · Cast Iron Presses Circa 1958</p>
                <p className="text-[11px] text-[#7A6E63] mt-0.5">Continuous 180°C thermal mass for uniform caramelization.</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars with Editorial Numbering */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Pillar 1 */}
            <div className="flex gap-4">
              <span className="font-mono text-xl font-bold text-[#B85D19] tabular-nums shrink-0">
                01.
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-[#24211E]">
                  48-Hour Cold Brioche Fermentation
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                  Unlike quick batters, our Liege base is a rich, living brioche dough made with unbleached organic flour, farm-fresh egg yolks, and pure French butter. A slow two-day cold fermentation yields nuanced notes of toasted hazelnut, vanilla, and gentle malt.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#7A6E63] mt-2 font-medium">
                  <span>84% Butterfat French Cultured Butter</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero Commercial Stabilizers</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4">
              <span className="font-mono text-xl font-bold text-[#B85D19] tabular-nums shrink-0">
                02.
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-[#24211E]">
                  Authentic Verviers Pearl Sugar
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                  Just before pressing, coarse sugar crystals from sugar beets in Verviers, Belgium are folded into the dough by hand. Under high heat, the outer sugar pearls melt into a glassy, amber caramel crust while the inner pearls remain delicately crunchy.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#7A6E63] mt-2 font-medium">
                  <span>Imported Belgian P100 Pearls</span>
                  <span aria-hidden="true">·</span>
                  <span>Natural Crinkle Texture</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4">
              <span className="font-mono text-xl font-bold text-[#B85D19] tabular-nums shrink-0">
                03.
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-[#24211E]">
                  45-Pound Cast-Iron Belgian Presses
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                  We bake each waffle in custom-milled cast-iron irons weighing 45 pounds. The deep 4x7 grid pockets provide the exact pressure and heat retention required to seal in steam, producing a cloud-soft interior encased in a crackling golden shell.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#7A6E63] mt-2 font-medium">
                  <span>180°C Exact Bake Temp</span>
                  <span aria-hidden="true">·</span>
                  <span>3.5 Minute Precision Timer</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
