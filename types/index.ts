// Types for Kerala Tourism Platform

export interface Package {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: PackageCategory;
  durationDays: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  images: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  location: string;
  isFeatured: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  badge?: string;
}

export type PackageCategory =
  | 'Backwaters'
  | 'Beaches'
  | 'Hill Stations'
  | 'Wildlife'
  | 'Cultural'
  | 'Adventure'
  | 'Ayurveda';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  package: Package;
  bookingDate: string;
  travelDate: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  referenceCode: string;
  createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  packageId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FilterState {
  category: PackageCategory | 'All';
  minPrice: number;
  maxPrice: number;
  minDuration: number;
  maxDuration: number;
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'duration' | 'popularity';
  search: string;
}
