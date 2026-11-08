'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, MapPin, TrendingUp } from 'lucide-react';
import { Package } from '@/types';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

interface PackageCardProps {
  pkg: Package;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PackageCard({ pkg, variant = 'default' }: PackageCardProps) {
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  if (variant === 'compact') {
    return (
      <Link href={`/packages/${pkg.id}`} className="group block">
        <div className="card-hover rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#111111] flex gap-4 p-3">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
            <Image src={pkg.images[0]} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
          </div>
          <div className="flex flex-col justify-between py-0.5 min-w-0">
            <div>
              <p className="text-xs text-[#6B6B65] mb-1">{pkg.location}</p>
              <h3 className="font-serif text-sm font-semibold text-[#F5F5F0] line-clamp-2 leading-snug">{pkg.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <StarRating rating={pkg.rating} size="sm" />
              <span className="text-[#C8A96E] font-bold text-sm">{formatPrice(pkg.price)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/packages/${pkg.id}`} className="group block">
      <div
        className={`card-hover rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#111111] ${
          variant === 'featured' ? 'h-full' : ''
        }`}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ paddingTop: variant === 'featured' ? '65%' : '60%' }}>
          <Image
            src={pkg.images[0]}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {pkg.badge && (
              <Badge variant="gold" size="sm">
                {pkg.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="green" size="sm">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Category */}
          <div className="absolute top-3 right-3">
            <Badge variant="glass" size="sm">
              {pkg.category}
            </Badge>
          </div>

          {/* Rating on image */}
          <div className="absolute bottom-3 left-3">
            <div className="glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <StarRating rating={pkg.rating} size="sm" showValue reviewCount={pkg.reviewCount} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin size={12} className="text-[#C8A96E]" />
              <p className="text-xs text-[#6B6B65]">{pkg.location}</p>
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#F5F5F0] group-hover:text-[#C8A96E] transition-colors leading-snug">
              {pkg.title}
            </h3>
            <p className="text-sm text-[#6B6B65] mt-1.5 line-clamp-2 leading-relaxed">
              {pkg.shortDescription}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 py-3 border-t border-b border-[#1e1e1e]">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#A8A8A0]" />
              <span className="text-xs text-[#A8A8A0]">{pkg.durationDays} days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-[#A8A8A0]" />
              <span className="text-xs text-[#A8A8A0]">Max {pkg.maxGuests}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} className="text-[#A8A8A0]" />
              <span className="text-xs text-[#A8A8A0]">{pkg.difficulty}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-[#6B6B65] mb-0.5">Starting from</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#C8A96E]">{formatPrice(pkg.price)}</span>
                {pkg.originalPrice > pkg.price && (
                  <span className="text-sm text-[#6B6B65] line-through">{formatPrice(pkg.originalPrice)}</span>
                )}
              </div>
              <p className="text-xs text-[#6B6B65]">per person</p>
            </div>
            <button className="btn-gold rounded-xl px-4 py-2.5 text-sm">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
