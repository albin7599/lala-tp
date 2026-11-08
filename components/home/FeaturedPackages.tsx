'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import { PACKAGES } from '@/lib/data';

export default function FeaturedPackages() {
  const featured = PACKAGES.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-24 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Curated Experiences</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">
              <span className="text-[#F5F5F0]">Our </span>
              <span className="text-gold-gradient">Finest</span>
              <br />
              <span className="text-[#F5F5F0]">Journeys</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="btn-outline-gold rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 self-start sm:self-auto"
          >
            View All Packages
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pkg, i) => (
            <div
              key={pkg.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
            >
              <PackageCard pkg={pkg} variant="featured" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
