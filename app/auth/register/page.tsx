'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setIsLoading(true); setError('');
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser = { id: Date.now().toString(), name: form.name, email: form.email, role: 'user' as const, createdAt: new Date().toISOString() };
    login(mockUser, 'mock-jwt-token');
    router.push('/dashboard');
    setIsLoading(false);
  };

  const perks = ['Instant booking confirmation', 'Exclusive member discounts', 'Free cancellation options', '24/7 travel support'];

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=85" alt="Munnar" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-white font-bold text-sm">KT</div>
            <span className="font-serif text-xl font-semibold text-gold-gradient">KeralaTrips</span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-[#F5F5F0] mb-4">Join the Community</h2>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C8A96E]/20 flex items-center justify-center shrink-0">
                  <Check size={10} className="text-[#C8A96E]" />
                </div>
                <span className="text-[#A8A8A0] text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-[#080808]">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-white font-bold text-sm">KT</div>
              <span className="font-serif text-xl font-semibold text-gold-gradient">KeralaTrips</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">Create Account</h1>
            <p className="text-[#6B6B65] text-sm">Already have an account?{' '}
              <Link href="/auth/login" className="text-[#C8A96E] hover:underline">Sign in</Link>
            </p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 mb-5">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your full name" required className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="your@email.com" required className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Min. 8 characters" required className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 pr-12 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B65]">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={(e) => setForm({...form, confirm: e.target.value})} placeholder="Repeat password" required className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors" />
            </div>

            <p className="text-xs text-[#6B6B65]">By creating an account you agree to our <a href="#" className="text-[#C8A96E] hover:underline">Terms of Service</a> and <a href="#" className="text-[#C8A96E] hover:underline">Privacy Policy</a>.</p>

            <button type="submit" disabled={isLoading} className="btn-gold w-full rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
              {isLoading ? <div className="w-5 h-5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
