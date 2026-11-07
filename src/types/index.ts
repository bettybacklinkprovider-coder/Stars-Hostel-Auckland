export type PageId = 'home' | 'rooms' | 'gallery' | 'contact';

export interface RoomType {
  id: string;
  name: string;
  category: 'dorm' | 'private' | 'female';
  priceNZD: number;
  capacity: string;
  bedType: string;
  image: string;
  description: string;
  features: string[];
  sizeM2: number;
  popular?: boolean;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'rooms' | 'lounge' | 'kitchen' | 'outdoor' | 'facilities';
  image: string;
  caption: string;
  tag: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  country: string;
  flag: string;
  roomStayed: string;
  rating: number;
  date: string;
  comment: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  specialRequests: string;
}
