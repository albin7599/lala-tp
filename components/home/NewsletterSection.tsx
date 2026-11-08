'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80"
            alt="Kerala"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/80 to-[#080808]/60" />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-16 py-20 max-w-2xl">
            <p className="section-label mb-4">Stay in the Loop</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F5F0] mb-4 leading-tight">
              Get Kerala Secrets <span className="text-gold-gradient">Delivered</span>
            </h2>
            <p className="text-[#A8A8A0] text-base leading-relaxed mb-8">
              Exclusive deals, hidden gems, seasonal packages, and travel inspiration — sent to your inbox every fortnight.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 text-[#40916C]">
                <CheckCircle size={24} />
                <span className="text-lg font-medium">You're on the list! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-[#161616] border border-[#2a2a2a] rounded-xl px-5 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="btn-gold rounded-xl px-6 py-3.5 text-sm font-semibold flex items-center gap-2 justify-center"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <p className="text-xs text-[#6B6B65] mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
