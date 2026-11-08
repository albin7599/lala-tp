'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Calendar, Users, CreditCard, Shield } from 'lucide-react';
import { PACKAGES } from '@/lib/data';
import { formatPrice, generateReferenceCode } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

const STEPS = ['Details', 'Personal Info', 'Payment'];

function BookingContent({ packageId }: { packageId: string }) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) notFound();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2);
  const [travelDate, setTravelDate] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    specialRequests: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const [refCode, setRefCode] = useState('');

  const total = pkg.price * guests;

  const handleConfirm = () => {
    const code = generateReferenceCode();
    setRefCode(code);
    setConfirmed(true);

    // Store in localStorage as mock booking
    const bookings = JSON.parse(localStorage.getItem('kerala_bookings') || '[]');
    bookings.push({
      id: code,
      packageId: pkg.id,
      packageTitle: pkg.title,
      packageImage: pkg.images[0],
      travelDate,
      guests,
      totalPrice: total,
      status: 'confirmed',
      referenceCode: code,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('kerala_bookings', JSON.stringify(bookings));
  };

  if (confirmed) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10" style={{ border: '1px solid rgba(200,169,110,0.2)' }}>
            <div className="w-16 h-16 rounded-full bg-[#40916C]/20 flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
              <Check size={32} className="text-[#40916C]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">Booking Confirmed!</h1>
            <p className="text-[#6B6B65] mb-8">Your Kerala adventure has been reserved</p>

            <div className="glass-gold rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-[#6B6B65]">Reference</span>
                <span className="text-sm font-bold text-[#C8A96E] font-mono">{refCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[#6B6B65]">Package</span>
                <span className="text-sm text-[#F5F5F0] text-right ml-4">{pkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[#6B6B65]">Travel Date</span>
                <span className="text-sm text-[#F5F5F0]">{travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[#6B6B65]">Guests</span>
                <span className="text-sm text-[#F5F5F0]">{guests}</span>
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-[#A8A8A0]">Total Paid</span>
                <span className="text-lg font-bold text-[#C8A96E]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/dashboard" className="btn-gold rounded-xl py-3 text-sm font-semibold text-center block">
                View My Bookings
              </Link>
              <Link href="/packages" className="btn-outline-gold rounded-xl py-3 text-sm font-medium text-center block">
                Explore More Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href={`/packages/${pkg.id}`} className="inline-flex items-center gap-2 text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to package
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Steps */}
            <div className="flex items-center gap-4 mb-10">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i < step ? 'bg-[#40916C] text-white' :
                    i === step ? 'bg-[#C8A96E] text-[#080808]' :
                    'bg-[#1e1e1e] text-[#6B6B65]'
                  }`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-sm ${i === step ? 'text-[#F5F5F0] font-medium' : 'text-[#6B6B65]'}`}>{s}</span>
                  {i < STEPS.length - 1 && <div className="w-8 h-px bg-[#2a2a2a] ml-2" />}
                </div>
              ))}
            </div>

            {/* Step 0: Trip Details */}
            {step === 0 && (
              <div className="glass rounded-3xl p-8 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">Trip Details</h2>

                <div>
                  <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Travel Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B65]" />
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#F5F5F0] outline-none focus:border-[#C8A96E]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Number of Guests</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors">−</button>
                    <span className="text-2xl font-bold text-[#F5F5F0] w-8 text-center">{guests}</span>
                    <button onClick={() => setGuests(Math.min(pkg.maxGuests, guests + 1))} className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#A8A8A0] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors">+</button>
                    <span className="text-xs text-[#6B6B65]">Max {pkg.maxGuests} guests</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  disabled={!travelDate}
                  className="btn-gold rounded-xl py-3.5 px-8 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Personal Info
                </button>
              </div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="glass rounded-3xl p-8 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your full name" className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Email Address</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="your@email.com" className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Special Requests</label>
                    <input type="text" value={form.specialRequests} onChange={(e) => setForm({...form, specialRequests: e.target.value})} placeholder="Dietary needs, accessibility..." className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="btn-outline-gold rounded-xl py-3.5 px-6 text-sm font-medium">Back</button>
                  <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.phone} className="btn-gold rounded-xl py-3.5 px-8 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Continue to Payment</button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="glass rounded-3xl p-8 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#F5F5F0]">Payment</h2>

                <div className="glass-gold rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A96E] flex items-center justify-center text-[#080808] font-bold text-sm">R</div>
                    <span className="font-semibold text-[#F5F5F0]">Razorpay Secure Payment</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#A8A8A0] mb-2 block">Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 font-mono" />
                    </div>
                    <div>
                      <label className="text-xs text-[#A8A8A0] mb-2 block">Cardholder Name</label>
                      <input type="text" placeholder="Name on card" className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50" />
                    </div>
                    <div>
                      <label className="text-xs text-[#A8A8A0] mb-2 block">Expiry</label>
                      <input type="text" placeholder="MM / YY" maxLength={7} className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 font-mono" />
                    </div>
                    <div>
                      <label className="text-xs text-[#A8A8A0] mb-2 block">CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 font-mono" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#6B6B65]">
                  <Shield size={12} className="text-[#40916C] shrink-0" />
                  Your payment is protected by 256-bit SSL encryption
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline-gold rounded-xl py-3.5 px-6 text-sm font-medium">Back</button>
                  <button onClick={handleConfirm} className="btn-gold rounded-xl py-3.5 px-8 text-sm font-semibold flex-1 flex items-center justify-center gap-2">
                    <CreditCard size={16} />
                    Pay {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-24" style={{ border: '1px solid rgba(200,169,110,0.15)' }}>
              <h3 className="font-serif text-lg font-bold text-[#F5F5F0] mb-4">Order Summary</h3>
              <img src={pkg.images[0]} alt={pkg.title} className="w-full h-36 object-cover rounded-xl mb-4" />
              <h4 className="font-semibold text-[#F5F5F0] text-sm mb-1">{pkg.title}</h4>
              <p className="text-xs text-[#6B6B65] mb-4">{pkg.location} · {pkg.durationDays} Days</p>
              <div className="gold-divider mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#A8A8A0]">
                  <span>Travel Date</span>
                  <span className="text-[#F5F5F0]">{travelDate || '—'}</span>
                </div>
                <div className="flex justify-between text-[#A8A8A0]">
                  <span>Guests</span>
                  <span className="text-[#F5F5F0]">{guests}</span>
                </div>
                <div className="flex justify-between text-[#A8A8A0]">
                  <span>{formatPrice(pkg.price)} × {guests}</span>
                  <span className="text-[#F5F5F0]">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="gold-divider my-4" />
              <div className="flex justify-between">
                <span className="font-semibold text-[#A8A8A0]">Total</span>
                <span className="text-xl font-bold text-[#C8A96E]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage({ params }: { params: { packageId: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-[#6B6B65]">Loading...</div></div>}>
      <BookingContent packageId={params.packageId} />
    </Suspense>
  );
}
