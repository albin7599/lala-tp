'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Clock, Users, MapPin, ChevronDown, ChevronUp,
  Check, X, Star, ArrowLeft, Share2, Heart, Shield
} from 'lucide-react';
import { PACKAGES, REVIEWS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = PACKAGES.find((p) => p.id === params.id);
  if (!pkg) notFound();

  const reviews = REVIEWS.filter((r) => r.packageId === pkg.id);
  const [activeImage, setActiveImage] = useState(0);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [guests, setGuests] = useState(2);
  const [liked, setLiked] = useState(false);

  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
  const total = pkg.price * guests;

  return (
    <div className="min-h-screen pt-20 bg-[#080808]">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors">
          <ArrowLeft size={16} />
          Back to packages
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2 h-[400px] sm:h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-3 relative cursor-pointer" onClick={() => setActiveImage(0)}>
            <img
              src={pkg.images[activeImage]}
              alt={pkg.title}
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
          </div>
          <div className="flex flex-col gap-2">
            {pkg.images.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className="flex-1 relative cursor-pointer overflow-hidden rounded-r-sm"
                onClick={() => setActiveImage(i + 1)}
              >
                <img
                  src={img}
                  alt={`${pkg.title} ${i + 2}`}
                  className={`w-full h-full object-cover transition-all duration-300 ${activeImage === i + 1 ? 'brightness-100' : 'brightness-50 hover:brightness-75'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="gold">{pkg.category}</Badge>
                {pkg.badge && <Badge variant="glass">{pkg.badge}</Badge>}
                <Badge variant="green">{pkg.difficulty}</Badge>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F0] mb-3">{pkg.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#C8A96E]" />
                  <span className="text-[#A8A8A0] text-sm">{pkg.location}</span>
                </div>
                <StarRating rating={pkg.rating} size="sm" showValue reviewCount={pkg.reviewCount} />
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Duration', value: `${pkg.durationDays} Days`, icon: Clock },
                { label: 'Max Guests', value: `${pkg.maxGuests} People`, icon: Users },
                { label: 'Location', value: pkg.location.split(',')[0], icon: MapPin },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center">
                  <Icon size={20} className="text-[#C8A96E] mx-auto mb-2" />
                  <p className="text-xs text-[#6B6B65] mb-1">{label}</p>
                  <p className="text-sm font-semibold text-[#F5F5F0]">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">About This Experience</h2>
              <p className="text-[#A8A8A0] leading-relaxed">{pkg.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F5F5F0] mb-4">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                    <div className="w-5 h-5 rounded-full bg-[#C8A96E]/20 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-[#C8A96E]" />
                    </div>
                    <span className="text-sm text-[#A8A8A0]">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F5F5F0] mb-4">Day-by-Day Itinerary</h2>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="glass rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenDay(openDay === day.day - 1 ? null : day.day - 1)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A96E]/20 to-[#2D6A4F]/20 flex items-center justify-center text-xs font-bold text-[#C8A96E]">
                          {day.day}
                        </div>
                        <div>
                          <p className="text-xs text-[#6B6B65] mb-0.5">Day {day.day}</p>
                          <p className="font-semibold text-[#F5F5F0]">{day.title}</p>
                        </div>
                      </div>
                      {openDay === day.day - 1 ? (
                        <ChevronUp size={18} className="text-[#C8A96E] shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-[#6B6B65] shrink-0" />
                      )}
                    </button>
                    {openDay === day.day - 1 && (
                      <div className="px-5 pb-5 border-t border-[#1e1e1e]">
                        <p className="text-[#A8A8A0] text-sm mt-4 mb-3">{day.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.activities.map((a) => (
                            <span key={a} className="text-xs bg-[#1e1e1e] text-[#A8A8A0] rounded-full px-3 py-1">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#F5F5F0] mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#A8A8A0]">
                      <Check size={14} className="text-[#40916C] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#F5F5F0] mb-4">What's Excluded</h3>
                <ul className="space-y-2">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#A8A8A0]">
                      <X size={14} className="text-red-500/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F5F0] mb-6">Traveler Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="glass rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]"
                          />
                          <div>
                            <p className="font-medium text-[#F5F5F0] text-sm">{review.userName}</p>
                            <p className="text-[#6B6B65] text-xs">Verified Traveler</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" showValue />
                      </div>
                      <p className="text-sm text-[#A8A8A0] leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-24 space-y-6" style={{ border: '1px solid rgba(200,169,110,0.15)' }}>
              {/* Price */}
              <div>
                <p className="text-xs text-[#6B6B65] mb-1">Starting from</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gold-gradient font-serif">{formatPrice(pkg.price)}</span>
                  <span className="text-sm text-[#6B6B65] line-through">{formatPrice(pkg.originalPrice)}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#40916C] bg-[#40916C]/10 rounded-full px-2 py-0.5">{discount}% OFF</span>
                  <span className="text-xs text-[#6B6B65]">per person</span>
                </div>
              </div>

              <div className="gold-divider" />

              {/* Guests */}
              <div>
                <p className="text-xs text-[#A8A8A0] font-medium mb-3">Number of Guests</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold text-[#F5F5F0] w-6 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(pkg.maxGuests, guests + 1))}
                    className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
                  >
                    +
                  </button>
                  <span className="text-xs text-[#6B6B65]">Max {pkg.maxGuests}</span>
                </div>
              </div>

              {/* Total */}
              <div className="glass-gold rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#A8A8A0]">{formatPrice(pkg.price)} × {guests} guests</span>
                  <span className="text-sm font-semibold text-[#F5F5F0]">{formatPrice(total)}</span>
                </div>
                <div className="gold-divider mb-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#A8A8A0]">Total</span>
                  <span className="text-lg font-bold text-[#C8A96E]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Book Button */}
              <Link href={`/booking/${pkg.id}?guests=${guests}`} className="block">
                <button className="btn-gold w-full rounded-2xl py-4 text-base font-semibold">
                  Book This Experience
                </button>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 border rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                    liked ? 'border-red-500/40 text-red-400 bg-red-500/5' : 'border-[#2a2a2a] text-[#A8A8A0] hover:border-[#3a3a3a]'
                  }`}
                >
                  <Heart size={16} className={liked ? 'fill-current' : ''} />
                  {liked ? 'Saved' : 'Wishlist'}
                </button>
                <button className="flex-1 border border-[#2a2a2a] rounded-xl py-3 text-sm font-medium text-[#A8A8A0] hover:border-[#3a3a3a] flex items-center justify-center gap-2 transition-all duration-200">
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2">
                {[
                  { icon: Shield, text: 'Free cancellation up to 72 hours' },
                  { icon: Check, text: 'Instant confirmation' },
                  { icon: Star, text: 'KSTDC certified operator' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-[#6B6B65]">
                    <Icon size={12} className="text-[#C8A96E] shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
