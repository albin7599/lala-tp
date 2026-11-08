import HeroSection from '@/components/home/HeroSection';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import CategorySection from '@/components/home/CategorySection';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Leaf, Shield, Clock, Award } from 'lucide-react';

const WHY_US = [
  {
    icon: Award,
    title: 'KSTDC Certified',
    description: 'Every package is certified by Kerala State Tourism Development Corporation for quality and safety.',
  },
  {
    icon: Leaf,
    title: 'Eco-Responsible',
    description: 'We partner only with eco-friendly operators committed to preserving Kerala\'s natural heritage.',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Bank-grade security with instant confirmation, free cancellation options, and 24/7 support.',
  },
  {
    icon: Clock,
    title: 'Curated Itineraries',
    description: 'Every itinerary is crafted by Kerala-born travel experts with 10+ years of experience.',
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Why KeralaTrips</p>
            <h2 className="font-serif text-4xl font-bold text-[#F5F5F0]">
              Travel with <span className="text-gold-gradient">Confidence</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-6 card-hover text-center group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A96E]/20 to-[#2D6A4F]/20 flex items-center justify-center mx-auto mb-4 group-hover:from-[#C8A96E]/30 group-hover:to-[#2D6A4F]/30 transition-all duration-300">
                    <Icon size={22} className="text-[#C8A96E]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#F5F5F0] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B6B65] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedPackages />
      <CategorySection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
