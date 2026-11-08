import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1e1e1e]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A96E] to-[#2D6A4F] flex items-center justify-center text-white font-bold">
                KT
              </div>
              <span className="font-serif text-2xl font-semibold text-gold-gradient">KeralaTrips</span>
            </div>
            <p className="text-[#6B6B65] text-sm leading-relaxed">
              Crafting extraordinary journeys through God's Own Country. Every experience is curated to immerse you in Kerala's timeless beauty.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-[#2a2a2a] flex items-center justify-center text-[#6B6B65] hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div className="space-y-5">
            <h4 className="section-label">Experiences</h4>
            <ul className="space-y-3">
              {['Backwater Cruises', 'Hill Station Escapes', 'Beach Retreats', 'Wildlife Safaris', 'Ayurveda Retreats', 'Cultural Immersions'].map((item) => (
                <li key={item}>
                  <Link href="/packages" className="text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="section-label">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#' },
                { label: 'Our Story', href: '#' },
                { label: 'Travel Guides', href: '#' },
                { label: 'Partner with Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Privacy Policy', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="section-label">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C8A96E] mt-0.5 shrink-0" />
                <span className="text-sm text-[#6B6B65]">Kochi, Kerala 682016, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C8A96E] shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C8A96E] shrink-0" />
                <a href="mailto:hello@keralatrips.in" className="text-sm text-[#6B6B65] hover:text-[#C8A96E] transition-colors">
                  hello@keralatrips.in
                </a>
              </li>
            </ul>
            <div className="glass-gold rounded-2xl p-4 mt-6">
              <p className="text-xs text-[#C8A96E] font-medium mb-1">KSTDC Registered</p>
              <p className="text-xs text-[#6B6B65]">Kerala State Tourism Development Corporation certified travel partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B65]">
            © 2025 KeralaTrips. All rights reserved.
          </p>
          <p className="text-xs text-[#6B6B65]">
            Crafted with ❤️ for God's Own Country
          </p>
        </div>
      </div>
    </footer>
  );
}
