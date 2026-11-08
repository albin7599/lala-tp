'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';

export default function CategorySection() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Explore by Type</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F5F0]">
            Every Kind of <span className="text-gold-gradient">Kerala</span>
          </h2>
          <p className="text-[#6B6B65] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Whether you seek serenity, adventure, spirituality, or luxury — Kerala has a world that's made for you.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/packages?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-square card-hover"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* BG Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent" />
              <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/20 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <h3 className="font-serif text-[#F5F5F0] font-semibold text-base text-center leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[#A8A8A0] text-xs mt-1">{cat.count} packages</p>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#C8A96E]/40 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
