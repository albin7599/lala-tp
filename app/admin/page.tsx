'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart3, Users, Package, Calendar, Plus, Edit, Trash2,
  TrendingUp, Eye, Star, DollarSign, Shield
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { PACKAGES } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import PackageCard from '@/components/packages/PackageCard';

type AdminTab = 'dashboard' | 'packages' | 'bookings' | 'users';

const MOCK_USERS = [
  { id: '1', name: 'Arjun Menon', email: 'arjun@example.com', role: 'user', bookings: 3, joined: '2025-01-15' },
  { id: '2', name: 'Priya Nair', email: 'priya@example.com', role: 'user', bookings: 1, joined: '2025-03-22' },
  { id: '3', name: 'Rohan Sharma', email: 'rohan@example.com', role: 'user', bookings: 2, joined: '2025-02-10' },
  { id: '4', name: 'Divya Krishnan', email: 'divya@example.com', role: 'user', bookings: 4, joined: '2024-12-05' },
];

const MOCK_BOOKINGS = [
  { ref: 'KT8A2F1', package: 'Alleppey Backwaters Odyssey', user: 'Arjun Menon', date: '2025-12-20', guests: 4, total: 114000, status: 'confirmed' },
  { ref: 'KT7B3G2', package: 'Munnar Tea Trail & Mist', user: 'Priya Nair', date: '2025-11-15', guests: 2, total: 44000, status: 'confirmed' },
  { ref: 'KT5C4H3', package: 'Wayanad Wildlife Expedition', user: 'Rohan Sharma', date: '2025-10-08', guests: 3, total: 78000, status: 'completed' },
  { ref: 'KT2D5I4', package: 'Ayurveda Wellness Retreat', user: 'Divya Krishnan', date: '2025-09-01', guests: 2, total: 90000, status: 'completed' },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'text-[#40916C] bg-[#40916C]/10',
  pending: 'text-[#C8A96E] bg-[#C8A96E]/10',
  cancelled: 'text-red-400 bg-red-500/10',
  completed: 'text-[#A8A8A0] bg-[#A8A8A0]/10',
};

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingPackage, setEditingPackage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') return null;

  const totalRevenue = MOCK_BOOKINGS.reduce((s, b) => s + b.total, 0);
  const totalBookings = MOCK_BOOKINGS.length;

  const TABS: { id: AdminTab; label: string; icon: typeof BarChart3 }[] = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#F5F5F0]">Admin Panel</h1>
              <p className="text-xs text-[#6B6B65]">KeralaTrips Management Console</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 glass rounded-2xl p-1 mb-8 w-fit overflow-x-auto no-scrollbar">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === id ? 'btn-gold' : 'text-[#A8A8A0] hover:text-[#F5F5F0]'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, change: '+12% this month' },
                { label: 'Total Bookings', value: totalBookings, icon: Calendar, change: '+3 this week' },
                { label: 'Total Users', value: MOCK_USERS.length, icon: Users, change: '+1 today' },
                { label: 'Avg Rating', value: '4.8★', icon: Star, change: 'Based on 856 reviews' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center">
                        <Icon size={18} className="text-[#C8A96E]" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#F5F5F0] font-serif mb-1">{stat.value}</div>
                    <div className="text-xs text-[#6B6B65]">{stat.label}</div>
                    <div className="text-xs text-[#40916C] mt-2">{stat.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent Bookings */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#F5F5F0] mb-4">Recent Bookings</h2>
              <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e1e1e]">
                      {['Reference', 'Package', 'User', 'Date', 'Total', 'Status'].map((h) => (
                        <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-[#6B6B65] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e1e]">
                    {MOCK_BOOKINGS.map((b) => (
                      <tr key={b.ref} className="hover:bg-white/2 transition-colors">
                        <td className="px-5 py-4 text-xs font-mono text-[#C8A96E]">{b.ref}</td>
                        <td className="px-5 py-4 text-sm text-[#F5F5F0] max-w-[180px] truncate">{b.package}</td>
                        <td className="px-5 py-4 text-sm text-[#A8A8A0]">{b.user}</td>
                        <td className="px-5 py-4 text-sm text-[#A8A8A0]">{b.date}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#F5F5F0]">{formatPrice(b.total)}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Packages Management */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#F5F5F0]">All Packages ({PACKAGES.length})</h2>
              <button className="btn-gold rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
                <Plus size={16} />
                Add Package
              </button>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e1e1e]">
                    {['Package', 'Category', 'Duration', 'Price', 'Rating', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-[#6B6B65] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {PACKAGES.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={pkg.images[0]} alt={pkg.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-medium text-[#F5F5F0] truncate max-w-[150px]">{pkg.title}</p>
                            <p className="text-xs text-[#6B6B65]">{pkg.location.split(',')[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{pkg.category}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{pkg.durationDays}D</td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#C8A96E]">{formatPrice(pkg.price)}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{pkg.rating}★</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/packages/${pkg.id}`} className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-colors">
                            <Eye size={14} />
                          </Link>
                          <button className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-red-400 hover:border-red-500/40 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#F5F5F0]">All Bookings</h2>
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e1e1e]">
                    {['Reference', 'Package', 'User', 'Date', 'Guests', 'Total', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-[#6B6B65] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {MOCK_BOOKINGS.map((b) => (
                    <tr key={b.ref} className="hover:bg-white/2 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-[#C8A96E]">{b.ref}</td>
                      <td className="px-5 py-4 text-sm text-[#F5F5F0] max-w-[140px] truncate">{b.package}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{b.user}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0] whitespace-nowrap">{b.date}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{b.guests}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#F5F5F0] whitespace-nowrap">{formatPrice(b.total)}</td>
                      <td className="px-5 py-4">
                        <select className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_STYLES[b.status]} bg-transparent`}>
                          {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                            <option key={s} value={s} className="bg-[#111111] text-[#F5F5F0] capitalize">{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-xs text-red-400 hover:underline">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#F5F5F0]">All Users ({MOCK_USERS.length})</h2>
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e1e1e]">
                    {['User', 'Email', 'Role', 'Bookings', 'Joined', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-[#6B6B65] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {MOCK_USERS.map((u) => (
                    <tr key={u.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A96E]/30 to-[#2D6A4F]/30 flex items-center justify-center text-sm font-bold text-[#C8A96E]">
                            {u.name[0]}
                          </div>
                          <span className="text-sm font-medium text-[#F5F5F0]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{u.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          u.role === 'admin' ? 'text-[#C8A96E] bg-[#C8A96E]/10' : 'text-[#6B6B65] bg-[#2a2a2a]'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{u.bookings}</td>
                      <td className="px-5 py-4 text-sm text-[#A8A8A0]">{u.joined}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-red-400 hover:border-red-500/40 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
