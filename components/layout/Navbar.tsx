'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/packages?category=Backwaters', label: 'Backwaters' },
  { href: '/packages?category=Hill+Stations', label: 'Hill Stations' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-dark border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-white font-bold text-sm">
            KT
          </div>
          <span className="font-serif text-xl font-semibold text-gold-gradient hidden sm:block">
            KeralaTrips
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                pathname === link.href
                  ? 'text-[#C8A96E]'
                  : 'text-[#A8A8A0] hover:text-[#F5F5F0]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 glass rounded-full px-3 py-2 text-sm text-[#F5F5F0] hover:border-[#C8A96E]/30 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-xs font-bold text-white">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 glass-dark border border-white/10 rounded-2xl py-2 w-48 shadow-2xl z-50">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#A8A8A0] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    My Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#C8A96E] hover:bg-white/5 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Shield size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <div className="my-1 gold-divider mx-4" />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#A8A8A0] hover:text-red-400 hover:bg-white/5 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#A8A8A0] hover:text-[#F5F5F0] transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="btn-gold text-sm rounded-full px-5 py-2"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden glass rounded-xl p-2 text-[#A8A8A0] hover:text-[#F5F5F0] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-white/5 mt-3">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-sm text-[#A8A8A0] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-sm text-[#A8A8A0] hover:bg-white/5 transition-colors">
                    My Dashboard
                  </Link>
                  <button onClick={logout} className="px-4 py-3 rounded-xl text-sm text-red-400 text-left hover:bg-white/5 transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-4 py-3 rounded-xl text-sm text-[#A8A8A0] hover:bg-white/5 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="btn-gold text-sm rounded-full px-5 py-3 text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
