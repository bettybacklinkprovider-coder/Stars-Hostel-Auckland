import { RoomType, AmenityItem, GalleryPhoto, ReviewItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Stars Hostel',
  tagline: 'Modern Boutique Backpacker & Traveler Hub',
  phone: '+64 21 938 777',
  displayPhone: '+64 21 938 777',
  rawPhone: '6421938777',
  email: 'stay@starshostel.co.nz',
  address: '6a Glenside Crescent, Eden Terrace, Auckland 1010, New Zealand',
  city: 'Auckland',
  suburb: 'Eden Terrace',
  postcode: '1010',
  country: 'New Zealand',
  whatsappUrl: 'https://wa.me/6421938777?text=Hello%20Stars%20Hostel,%20I%20would%20like%20to%20inquire%20about%20room%20availability%20in%20Auckland.',
  checkInTime: '2:00 PM – 10:00 PM',
  checkOutTime: '10:00 AM',
  rating: 4.9,
  totalReviews: 482,
};

export const ROOMS_DATA: RoomType[] = [
  {
    id: 'deluxe-double-ensuite',
    name: 'Deluxe Private Double Room (En-Suite)',
    category: 'private',
    priceNZD: 115,
    capacity: '2 Guests',
    bedType: '1 Queen Bed',
    image: '/images/hostel_private_room_1794036887553.jpg',
    description: 'An elegant sanctuary featuring a plush queen mattress, private en-suite bathroom with high-pressure rain shower, work desk, and bright Auckland city daylight.',
    features: [
      'Private modern en-suite bathroom',
      'Orthopedic queen bed with crisp white cotton linen',
      'Laptop-friendly oak work desk & chair',
      'High-speed Wi-Fi 6 & multiple USB ports',
      'Smart climate control & quiet heating',
      'Complimentary organic toiletries & fresh towels'
    ],
    sizeM2: 20,
    popular: true,
  },
  {
    id: 'female-pod-dorm-4',
    name: '4-Bed Female Luxury Pod Dorm',
    category: 'female',
    priceNZD: 42,
    capacity: '1 Guest per Pod',
    bedType: '1 Custom Pod Bed',
    image: '/images/hostel_female_dorm_1794044793894.jpg',
    description: 'Designed exclusively for female travelers seeking safety, privacy, and quiet comfort. Features custom oak timber pods with full-length privacy curtains.',
    features: [
      'Full blackout privacy curtain on every pod',
      'Personal warm LED reading lamp & dual USB sockets',
      'Large under-bed secure locker with digital keypad',
      'Hotel-grade memory foam mattress & fluffy duvet',
      'En-suite female vanity & hairdryer station',
      'Keycard electronic security access'
    ],
    sizeM2: 24,
    popular: true,
  },
  {
    id: 'mixed-pod-dorm-6',
    name: '6-Bed Deluxe Mixed Timber Pod Dorm',
    category: 'dorm',
    priceNZD: 38,
    capacity: '1 Guest per Pod',
    bedType: '1 Custom Pod Bed',
    image: '/images/hostel_bunk_pods_1794036886509.jpg',
    description: 'Our signature backpacker dorm. Handcrafted solid oak timber bunks built into the architecture so they never creak, providing maximum privacy and deep sleep.',
    features: [
      'Solid architectural timber pods (no squeaking)',
      'Thick acoustic privacy curtain & personal shelf',
      'Individual universal power points & dual USB-C',
      'Spacious luggage locker with padlock loop',
      'Ultra-fast fiber optic Wi-Fi connection',
      'Linen, duvet and daily fresh towel included'
    ],
    sizeM2: 28,
  },
  {
    id: 'mixed-social-dorm-8',
    name: '8-Bed Backpacker Social Dorm',
    category: 'dorm',
    priceNZD: 32,
    capacity: '1 Guest per Bed',
    bedType: '1 Single Pod Bunk',
    image: '/images/hostel_social_8dorm_1794044794556.jpg',
    description: 'The premier budget-friendly option for solo adventurers and international backpackers eager to meet fellow globetrotters and explore Auckland together.',
    features: [
      'Cozy bunk bed with premium pocket-spring mattress',
      'Personal reading lamp and dual power outlet',
      'Individual under-bed lockable steel storage box',
      'Super-fast unlimited fiber broadband',
      'Daily housekeeping and spotless cleanliness',
      'Access to all lounge, kitchen and terrace areas'
    ],
    sizeM2: 32,
  },
  {
    id: 'private-twin-room',
    name: 'Private Twin Studio (Shared Bath)',
    category: 'private',
    priceNZD: 95,
    capacity: '2 Guests',
    bedType: '2 Single Beds',
    image: '/images/hostel_twin_room_1794044793604.jpg',
    description: 'Ideal for traveling friends or colleagues. Two comfortable single beds, generous floor space, clothes storage, and close proximity to modern shared rain showers.',
    features: [
      'Two comfortable single beds with hotel linens',
      'Modern wardrobe, mirror and luggage racks',
      'Quiet double-glazed windows overlooking leafy street',
      'Dedicated work desk and ergonomic stools',
      'Short steps away from spotless shared bathrooms',
      'Keycard door security lock'
    ],
    sizeM2: 18,
  },
  {
    id: 'deluxe-single-private',
    name: 'Single Private Room (Shared Bath)',
    category: 'private',
    priceNZD: 85,
    capacity: '1 Guest',
    bedType: '1 Double Bed',
    image: '/images/hostel_coworking_nook_1794044795660.jpg',
    description: 'A private room tailored for solo backpackers or digital nomads wanting their own quiet bedroom while enjoying the hostel’s lively social community.',
    features: [
      'Double bed with hypoallergenic pillows',
      'Private study desk with natural sunlight',
      'High-speed fiber ethernet and Wi-Fi',
      'Quiet room policy after 10:30 PM',
      'All bedding, towels & linen provided',
      'Full access to communal kitchen & lounge'
    ],
    sizeM2: 15,
  }
];

export const AMENITIES_DATA: AmenityItem[] = [
  {
    id: 'wifi',
    title: 'High-Speed Fiber Wi-Fi',
    description: 'Ultra-fast gigabit broadband across all bedrooms, common lounge, kitchen, and the outdoor terrace.',
    iconName: 'Wifi',
    image: '/images/hostel_coworking_nook_1794044795660.jpg',
  },
  {
    id: 'kitchen',
    title: 'Chef-Grade Shared Kitchen',
    description: 'Fully equipped modern kitchen with commercial gas cooktops, refrigerators, ovens, microwaves, and dining tables.',
    iconName: 'UtensilsCrossed',
    image: '/images/hostel_shared_kitchen_1794036887337.jpg',
  },
  {
    id: 'beds',
    title: 'Comfortable Luxury Pods',
    description: 'Custom handcrafted oak pods with orthopedic mattresses, blackout curtains, USB chargers, and individual reading lamps.',
    iconName: 'BedDouble',
    image: '/images/hostel_bunk_pods_1794036886509.jpg',
  },
  {
    id: 'bathrooms',
    title: 'Sparkling Clean Bathrooms',
    description: 'Cleaned multiple times daily with high-pressure hot rain showers, complimentary organic hand wash, and vanity mirrors.',
    iconName: 'Sparkles',
    image: '/images/hostel_modern_bathroom_1794037301844.jpg',
  },
  {
    id: 'lounge',
    title: 'Sky Tower View Social Lounge',
    description: 'Cozy designer armchairs, fireplace nook, acoustic guitar, book exchange, and international traveler board games.',
    iconName: 'Tv',
    image: '/images/hero_stars_hostel_1794036885732.jpg',
  },
  {
    id: 'deck',
    title: 'Sunlit Fern Patio Deck',
    description: 'Lush New Zealand native ponga garden deck with barbecue facilities, string fairy lights, and city skyline glimpses.',
    iconName: 'TreePine',
    image: '/images/hostel_outdoor_patio_1794036888006.jpg',
  },
  {
    id: 'lockers',
    title: 'Keyless Electronic Security',
    description: '24/7 smart keycard door access, individual heavy-duty luggage lockers, and CCTV monitored public entry points.',
    iconName: 'ShieldCheck',
    image: '/images/hostel_keyless_lockers_1794037303258.jpg',
  },
  {
    id: 'laundry',
    title: 'Guest Laundry & Ironing',
    description: 'Modern coin-operated high-capacity washers, fast tumble dryers, and free clothes lines on the sunny deck.',
    iconName: 'Shirt',
    image: '/images/hostel_laundry_facilities_1794037302542.jpg',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Sky Tower Vistas & Social Lobby',
    category: 'lounge',
    image: '/images/hero_stars_hostel_1794036885732.jpg',
    caption: 'Our warm communal living room overlooking Auckland City and the iconic Sky Tower.',
    tag: 'Social Lounge'
  },
  {
    id: 'gal-2',
    title: 'Handcrafted Oak Timber Pod Bunks',
    category: 'rooms',
    image: '/images/hostel_bunk_pods_1794036886509.jpg',
    caption: 'Custom built wooden pods with blackout privacy curtains, personal reading lamps, and USB points.',
    tag: 'Dormitory Pods'
  },
  {
    id: 'gal-3',
    title: 'Deluxe Private Queen Bedroom',
    category: 'rooms',
    image: '/images/hostel_private_room_1794036887553.jpg',
    caption: 'Sun-drenched private room with queen bed, hardwood work desk, and Eden Terrace views.',
    tag: 'Private Room'
  },
  {
    id: 'gal-4',
    title: 'Modern Commercial-Grade Kitchen',
    category: 'kitchen',
    image: '/images/hostel_shared_kitchen_1794036887337.jpg',
    caption: 'Cook up your favorite meals in our spacious kitchen featuring stainless steel cooktops and large communal table.',
    tag: 'Shared Kitchen'
  },
  {
    id: 'gal-5',
    title: 'Sunny Fern Garden Deck & Courtyard',
    category: 'outdoor',
    image: '/images/hostel_outdoor_patio_1794036888006.jpg',
    caption: 'Relax under native New Zealand ferns with fellow travelers, cold craft beers, and summer BBQs.',
    tag: 'Outdoor Deck'
  },
  {
    id: 'gal-6',
    title: 'Sparkling Clean Bathrooms & Rain Shower',
    category: 'facilities',
    image: '/images/hostel_modern_bathroom_1794037301844.jpg',
    caption: 'Individual walk-in rain showers, white subway tiling, and warm illuminated oak vanities.',
    tag: 'Rain Showers'
  },
  {
    id: 'gal-7',
    title: 'Guest Laundry & High-Capacity Washers',
    category: 'facilities',
    image: '/images/hostel_laundry_facilities_1794037302542.jpg',
    caption: 'Spotless laundry facility with commercial washers, tumble dryers, and folding bench.',
    tag: 'Laundry Facilities'
  },
  {
    id: 'gal-8',
    title: 'Electronic Keyless Lockers & Secure Corridors',
    category: 'facilities',
    image: '/images/hostel_keyless_lockers_1794037303258.jpg',
    caption: '24/7 RFID keycard door access and personal digital keypad lockers for worry-free luggage storage.',
    tag: 'Smart Security'
  },
  {
    id: 'gal-9',
    title: 'Female Sanctuary 4-Bed Dorm Pods',
    category: 'rooms',
    image: '/images/hostel_female_dorm_1794044793894.jpg',
    caption: 'Exclusive female dormitory with private wood pods, soft reading lighting, and quiet sanctuary feel.',
    tag: 'Female Dorm'
  },
  {
    id: 'gal-10',
    title: 'Cinema Movie & Board Games Lounge',
    category: 'lounge',
    image: '/images/hostel_movie_games_room_1794044796123.jpg',
    caption: 'Plush velvet sofas, huge film projection screen, and board game library for social evenings.',
    tag: 'Movie Lounge'
  },
  {
    id: 'gal-11',
    title: 'Barista Espresso & Breakfast Bar',
    category: 'kitchen',
    image: '/images/hostel_coffee_breakfast_1794044796111.jpg',
    caption: 'Start your morning with freshly brewed espresso, muesli jars, fresh fruits, and Kiwi hospitality.',
    tag: 'Coffee Bar'
  },
  {
    id: 'gal-12',
    title: 'Digital Nomad Skyline Co-Working Desk',
    category: 'lounge',
    image: '/images/hostel_coworking_nook_1794044795660.jpg',
    caption: 'Panoramic views of the Auckland harbor and Sky Tower with ergonomic desks and gigabit fiber.',
    tag: 'Co-Working'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Sophie Müller',
    country: 'Munich, Germany',
    flag: '🇩🇪',
    roomStayed: '4-Bed Female Pod Dorm',
    rating: 5,
    date: 'Stayed October 2026',
    comment: 'Hands down the cleanest and best hostel in Auckland! The timber pod beds with the full blackout curtain gave me such a peaceful night’s sleep after a 24-hour flight. Super safe, spotless bathrooms, and wonderful Kiwi staff.',
  },
  {
    id: 'rev-2',
    name: 'Callum Davies',
    country: 'Bristol, United Kingdom',
    flag: '🇬🇧',
    roomStayed: '6-Bed Mixed Pod Dorm',
    rating: 5,
    date: 'Stayed September 2026',
    comment: 'The location in Eden Terrace is gold. You can walk straight into Ponsonby for dinner or catch the quick bus into downtown Auckland. The kitchen is fully equipped with real knives and pans, and the outdoor deck with the ferns is unreal.',
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    country: 'Vancouver, Canada',
    flag: '🇨🇦',
    roomStayed: 'Deluxe Private Double Room',
    rating: 5,
    date: 'Stayed August 2026',
    comment: 'Booked the private room for 4 nights while working remotely. The Wi-Fi is blazing fast (300+ Mbps), the desk was great, and I could join the social drinks on the terrace whenever I wanted a break. Will be back on my way to Queenstown!',
  },
  {
    id: 'rev-4',
    name: 'Liam Chen',
    country: 'Melbourne, Australia',
    flag: '🇦🇺',
    roomStayed: '8-Bed Backpacker Dorm',
    rating: 5,
    date: 'Stayed October 2026',
    comment: 'Great value for money in Auckland. The bunk beds do not squeak at all because they are solid timber pods. Clean sheets, secure digital lockers, and WhatsApp communication with the team was instantaneous.',
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What are the check-in and check-out times?',
    a: 'Standard check-in is between 2:00 PM and 10:00 PM. If you arrive late after 10:00 PM, let us know via WhatsApp (+64 21 938 777) and we will send you your automated keycard door code. Check-out is by 10:00 AM.'
  },
  {
    q: 'How do I get to Stars Hostel from Auckland International Airport?',
    a: 'You can take the SkyDrive Express Airport Bus directly to the city center and take a quick 7-minute ride to Eden Terrace, or use an Uber / Super Shuttle which drops you directly at 6a Glenside Crescent (approx. 25-30 minutes).'
  },
  {
    q: 'Is there free luggage storage available?',
    a: 'Yes! We offer free secure luggage storage for all guests before check-in and after check-out on the day of departure so you can explore Auckland unburdened.'
  },
  {
    q: 'Are linens, duvets and towels provided?',
    a: 'Yes, fresh crisp bed linens, cozy duvets, and pillows are fully provided and made upon your arrival. Fresh bath towels are included in private rooms and available for a small token or free in pod dorms.'
  },
  {
    q: 'Is there parking available on site?',
    a: 'We have limited free on-street parking along Glenside Crescent and nearby streets, as well as easy nearby pay-and-display bays. Public buses run every 5 minutes along New North Road into the Auckland CBD.'
  }
];
