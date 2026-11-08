'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { REVIEWS } from '@/lib/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const review = REVIEWS[current];

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8A96E]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Traveler Stories</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F5F0]">
            What Our <span className="text-gold-gradient">Travelers</span> Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="glass rounded-3xl p-8 sm:p-12 relative">
          <Quote size={48} className="text-[#C8A96E]/20 absolute top-8 left-8" />

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex justify-center mb-8">
              <StarRating rating={review.rating} size="lg" />
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl text-[#F5F5F0] text-center leading-relaxed mb-10 italic">
              "{review.comment}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A96E]/30">
                <img
                  src={review.userAvatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80`}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-[#F5F5F0] font-semibold">{review.userName}</p>
                <p className="text-[#6B6B65] text-sm">Verified Traveler</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => setCurrent((current - 1 + REVIEWS.length) % REVIEWS.length)}
            className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-[#C8A96E]'
                    : 'w-2 h-2 bg-[#2a2a2a] hover:bg-[#6B6B65]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((current + 1) % REVIEWS.length)}
            className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
