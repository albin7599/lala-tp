'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Users, ChevronDown, MapPin } from 'lucide-react';

const DESTINATIONS = [
  'Alleppey Backwaters', 'Munnar Hills', 'Kovalam Beach',
  'Wayanad Forest', 'Thekkady Spices', 'Varkala Cliffs',
  'Thrissur Culture', 'Kumarakom Lakes',
];

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('search', destination);
    if (guests) params.set('guests', guests.toString());
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85"
          alt="Kerala Backwaters"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        {/* Extra depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/30" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C8A96E]/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Label */}
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
          <span className="section-label">God's Own Country</span>
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-6"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="block text-[#F5F5F0]">Discover</span>
          <span className="block text-gold-gradient">Kerala's Soul</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-[#A8A8A0] max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          From mist-kissed tea estates to moonlit backwaters, we craft journeys that become the chapters you tell forever.
        </p>

        {/* Search Widget */}
        <div
          className="glass rounded-2xl sm:rounded-full p-2 max-w-3xl mx-auto animate-fade-in-up shadow-2xl"
          style={{ animationDelay: '0.3s', border: '1px solid rgba(200,169,110,0.2)' }}
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Destination */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
              <MapPin size={18} className="text-[#C8A96E] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-[#C8A96E] uppercase tracking-wider mb-1">Destination</p>
                <input
                  type="text"
                  placeholder="Where in Kerala?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-[#F5F5F0] text-sm placeholder-[#6B6B65] outline-none"
                  list="destinations"
                />
                <datalist id="destinations">
                  {DESTINATIONS.map((d) => <option key={d} value={d} />)}
                </datalist>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[#2a2a2a]" />

            {/* Guests */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
              <Users size={18} className="text-[#C8A96E] shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-[#C8A96E] uppercase tracking-wider mb-1">Guests</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-6 h-6 rounded-full border border-[#2a2a2a] text-[#A8A8A0] text-sm flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-[#F5F5F0] w-4 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    className="w-6 h-6 rounded-full border border-[#2a2a2a] text-[#A8A8A0] text-sm flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="btn-gold rounded-xl sm:rounded-full px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <Search size={16} />
              <span>Explore</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {[
            { value: '50K+', label: 'Happy Travelers' },
            { value: '200+', label: 'Curated Packages' },
            { value: '44', label: 'Destinations' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gold-gradient font-serif">{stat.value}</div>
              <div className="text-xs text-[#6B6B65] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={24} className="text-[#C8A96E]/60" />
      </div>
    </section>
  );
}
