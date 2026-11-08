import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KeralaTrips — Discover God\'s Own Country',
  description: 'Book premium Kerala tourism packages — backwaters, hill stations, beaches, wildlife, and Ayurveda retreats. Curated luxury travel experiences across Kerala.',
  keywords: 'Kerala tourism, Kerala tour packages, backwaters, Munnar, Kovalam, Wayanad, Ayurveda Kerala',
  openGraph: {
    title: 'KeralaTrips — Discover God\'s Own Country',
    description: 'Premium Kerala travel experiences crafted for the discerning traveler.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#080808] antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
