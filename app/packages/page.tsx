'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import { PACKAGES } from '@/lib/data';
import { PackageCategory } from '@/types';
import { formatPrice } from '@/lib/utils';

const CATEGORIES: PackageCategory[] = ['Backwaters', 'Beaches', 'Hill Stations', 'Wildlife', 'Cultural', 'Adventure', 'Ayurveda'];
const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Duration' },
];

function PackagesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState<PackageCategory | 'All'>(
    (searchParams.get('category') as PackageCategory) || 'All'
  );
  const [sortBy, setSortBy] = useState('popularity');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [maxDuration, setMaxDuration] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PACKAGES];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter((p) => p.price <= maxPrice);
    result = result.filter((p) => p.durationDays <= maxDuration);
    result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, category, sortBy, maxPrice, maxDuration, minRating]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0D0D0D] to-[#080808] border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label mb-3">All Packages</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-[#F5F5F0]">Kerala </span>
            <span className="text-gold-gradient">Experiences</span>
          </h1>
          <p className="text-[#6B6B65] max-w-xl text-sm leading-relaxed">
            Hand-curated tours crafted by local experts. Every experience is designed to immerse you in the authentic spirit of Kerala.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B65]" />
              <input
                type="text"
                placeholder="Search packages, destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B65] hover:text-[#F5F5F0]">
                  <X size={16} />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] outline-none focus:border-[#C8A96E]/50 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#111111]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setCategory('All')}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                category === 'All'
                  ? 'btn-gold'
                  : 'border border-[#2a2a2a] text-[#A8A8A0] hover:text-[#F5F5F0] hover:border-[#3a3a3a]'
              }`}
            >
              All ({PACKAGES.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PACKAGES.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    category === cat
                      ? 'btn-gold'
                      : 'border border-[#2a2a2a] text-[#A8A8A0] hover:text-[#F5F5F0] hover:border-[#3a3a3a]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="glass rounded-2xl p-6 sticky top-24 space-y-7">
              <h3 className="font-semibold text-[#F5F5F0] text-sm">Filters</h3>

              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#A8A8A0] font-medium">Max Price</span>
                  <span className="text-xs text-[#C8A96E] font-medium">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={60000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C8A96E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6B6B65]">
                  <span>₹10,000</span>
                  <span>₹60,000</span>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#A8A8A0] font-medium">Max Duration</span>
                  <span className="text-xs text-[#C8A96E] font-medium">{maxDuration} days</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(Number(e.target.value))}
                  className="w-full accent-[#C8A96E] cursor-pointer"
                />
              </div>

              {/* Min Rating */}
              <div className="space-y-3">
                <span className="text-xs text-[#A8A8A0] font-medium">Minimum Rating</span>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all duration-200 ${
                        minRating === r
                          ? 'bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30'
                          : 'border border-[#2a2a2a] text-[#6B6B65] hover:text-[#A8A8A0]'
                      }`}
                    >
                      {r === 0 ? 'All' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setMaxPrice(60000); setMaxDuration(10); setMinRating(0); setCategory('All'); setSearch(''); }}
                className="w-full text-xs text-[#6B6B65] hover:text-[#C8A96E] transition-colors py-2 border border-[#2a2a2a] rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Package Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#6B6B65]">
                <span className="text-[#F5F5F0] font-medium">{filtered.length}</span> packages found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-serif text-xl text-[#F5F5F0] mb-2">No packages found</h3>
                <p className="text-[#6B6B65] text-sm">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((pkg, i) => (
                  <div
                    key={pkg.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-[#6B6B65]">Loading...</div>
      </div>
    }>
      <PackagesContent />
    </Suspense>
  );
}
