'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication — replace with real API call
    await new Promise((r) => setTimeout(r, 1000));

    if (email && password) {
      const mockUser = {
        id: '1',
        name: email === 'admin@kerala.com' ? 'Admin User' : 'Demo Traveler',
        email,
        role: email === 'admin@kerala.com' ? 'admin' as const : 'user' as const,
        createdAt: new Date().toISOString(),
      };
      login(mockUser, 'mock-jwt-token');
      router.push(mockUser.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Please enter your email and password.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=85"
          alt="Kerala"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-white font-bold text-sm">KT</div>
            <span className="font-serif text-xl font-semibold text-gold-gradient">KeralaTrips</span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-[#F5F5F0] mb-3">Welcome Back</h2>
          <p className="text-[#A8A8A0] leading-relaxed">Your next Kerala adventure awaits. Sign in to manage your bookings and discover new experiences.</p>
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
            <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">Sign In</h1>
            <p className="text-[#6B6B65] text-sm">Don't have an account?{' '}
              <Link href="/auth/register" className="text-[#C8A96E] hover:underline">Create one</Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="glass-gold rounded-xl p-4 mb-6 text-sm">
            <p className="text-[#C8A96E] font-medium mb-1 text-xs">Demo Credentials</p>
            <p className="text-[#A8A8A0] text-xs">User: any email + any password</p>
            <p className="text-[#A8A8A0] text-xs">Admin: admin@kerala.com + any password</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-[#A8A8A0] font-medium mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3.5 pr-12 text-sm text-[#F5F5F0] placeholder-[#6B6B65] outline-none focus:border-[#C8A96E]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B65] hover:text-[#A8A8A0]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-[#C8A96E] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
