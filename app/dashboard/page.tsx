'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Clock, ArrowRight, Star, Package } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { formatPrice, formatDate } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import { PACKAGES } from '@/lib/data';

type Booking = {
  id: string;
  packageId: string;
  packageTitle: string;
  packageImage: string;
  travelDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  referenceCode: string;
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'text-[#40916C] bg-[#40916C]/10 border-[#40916C]/20',
  pending:   'text-[#C8A96E] bg-[#C8A96E]/10 border-[#C8A96E]/20',
  cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
  completed: 'text-[#A8A8A0] bg-[#A8A8A0]/10 border-[#A8A8A0]/20',
};

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist'>('bookings');

  useEffect(() => {
    if (!isLoading && !user) router.push('/auth/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    const stored = localStorage.getItem('kerala_bookings');
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  if (isLoading || !user) return null;

  const upcoming = bookings.filter((b) => new Date(b.travelDate) >= new Date() && b.status !== 'cancelled');
  const past = bookings.filter((b) => new Date(b.travelDate) < new Date() || b.status === 'cancelled');

  const TABS = ['bookings', 'wishlist'] as const;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-2">Welcome back</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
              {user.name.split(' ')[0]}'s <span className="text-gold-gradient">Dashboard</span>
            </h1>
          </div>
          <Link href="/packages" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 self-start">
            <Package size={16} />
            Browse Packages
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Trips', value: bookings.length },
            { label: 'Upcoming', value: upcoming.length },
            { label: 'Completed', value: bookings.filter((b) => b.status === 'completed').length },
            { label: 'Total Spent', value: formatPrice(bookings.reduce((s, b) => s + b.totalPrice, 0)) },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-gold-gradient font-serif">{stat.value}</div>
              <div className="text-xs text-[#6B6B65] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-2xl p-1 mb-8 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab ? 'btn-gold' : 'text-[#A8A8A0] hover:text-[#F5F5F0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="glass rounded-3xl p-16 text-center">
                <div className="text-5xl mb-4">🌴</div>
                <h3 className="font-serif text-xl text-[#F5F5F0] mb-2">No trips yet</h3>
                <p className="text-[#6B6B65] text-sm mb-6">Your Kerala adventure starts with a single booking.</p>
                <Link href="/packages" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  Explore Packages <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F5F5F0] mb-4">Upcoming Trips</h2>
                    <div className="space-y-4">
                      {upcoming.map((b) => (
                        <BookingCard key={b.id} booking={b} />
                      ))}
                    </div>
                  </div>
                )}
                {past.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F5F5F0] mb-4">Past Trips</h2>
                    <div className="space-y-4">
                      {past.map((b) => (
                        <BookingCard key={b.id} booking={b} isPast />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="glass rounded-3xl p-16 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="font-serif text-xl text-[#F5F5F0] mb-2">Your wishlist is empty</h3>
            <p className="text-[#6B6B65] text-sm mb-6">Save packages you love while browsing.</p>
            <Link href="/packages" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Browse Packages <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, isPast }: { booking: Booking; isPast?: boolean }) {
  return (
    <div className={`glass rounded-2xl overflow-hidden flex flex-col sm:flex-row ${isPast ? 'opacity-70' : ''}`}>
      <div className="sm:w-32 h-32 sm:h-auto relative shrink-0">
        <img src={booking.packageImage} alt={booking.packageTitle} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
              {booking.status}
            </span>
            <span className="text-xs text-[#6B6B65] font-mono">{booking.referenceCode}</span>
          </div>
          <h3 className="font-serif font-semibold text-[#F5F5F0]">{booking.packageTitle}</h3>
          <div className="flex flex-wrap gap-4 text-xs text-[#6B6B65]">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {booking.travelDate}</span>
            <span className="flex items-center gap-1.5"><Users size={12} /> {booking.guests} guests</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-[#C8A96E]">{formatPrice(booking.totalPrice)}</p>
          <p className="text-xs text-[#6B6B65] mt-1">total paid</p>
        </div>
      </div>
    </div>
  );
}
