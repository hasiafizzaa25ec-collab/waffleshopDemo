import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/menuData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#7A6E63] font-medium mb-2">
            <span>Community & Press</span>
            <span aria-hidden="true">·</span>
            <span>4.9 / 5 Average Rating (620+ reviews)</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#24211E] tracking-tight">
            Loved by pastry connoisseurs & brunch regulars alike.
          </h2>
          <p className="mt-2 text-base text-[#5C534B]">
            From local culinary critics to weekend morning seekers of the perfect Belgian roast and warm caramelized brioche.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#EADBCC] p-7 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-[#B85D19]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-[#38332F] leading-relaxed italic">
                  "{rev.quote}"
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="mt-6 pt-4 border-t border-[#EADBCC]/70">
                <p className="font-display font-bold text-sm text-[#24211E]">
                  {rev.author}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#7A6E63] mt-0.5">
                  <span>{rev.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Press Mention Bar */}
        <div className="mt-12 pt-8 border-t border-[#EADBCC] flex flex-wrap items-center justify-between gap-6 text-xs text-[#7A6E63]">
          <span className="font-medium text-[#24211E]">Featured in:</span>
          <span>The Metropolitan Food Chronicle</span>
          <span aria-hidden="true">·</span>
          <span>Culinary Heritage Quarterly</span>
          <span aria-hidden="true">·</span>
          <span>Best Morning Cafes 2026</span>
          <span aria-hidden="true">·</span>
          <span>Brussels Baker Guild International</span>
        </div>

      </div>
    </section>
  );
};
