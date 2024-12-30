import { Event } from '../../types';

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Join industry leaders and innovators for a three-day summit exploring the latest in AI, blockchain, and quantum computing. Featuring keynote speakers from Fortune 500 companies, hands-on workshops, and networking opportunities.',
    date: '2024-09-15',
    startTime: '09:00',
    endTime: '18:00',
    timeZone: 'America/Los_Angeles',
    location: 'San Francisco Convention Center',
    address: '747 Howard Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    price: 799,
    availableTickets: 1000,
    organizerId: 'org-1',
    organizerName: 'TechEvents Inc',
    status: 'upcoming',
    type: 'conference',
    features: [
      'VIP Networking Lounge',
      'Interactive Workshops',
      'Virtual Reality Demos',
      'Startup Pitch Competition'
    ],
    ticketTypes: [
      {
        id: 'vip-1',
        name: 'VIP Pass',
        price: 1299,
        quantity: 200,
        benefits: ['Priority Seating', 'Exclusive Workshops', 'VIP Lounge Access']
      },
      {
        id: 'early-1',
        name: 'Early Bird',
        price: 599,
        quantity: 300,
        benefits: ['General Access', 'Workshop Access']
      },
      {
        id: 'standard-1',
        name: 'Standard',
        price: 799,
        quantity: 500,
        benefits: ['General Access']
      }
    ],
    speakers: [
      {
        name: 'Dr. Sarah Chen',
        title: 'AI Research Director, Google',
        topic: 'Future of AI in Enterprise',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      {
        name: 'Michael Rodriguez',
        title: 'CTO, Tesla',
        topic: 'Sustainable Innovation',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      }
    ]
  },
  {
    id: '2',
    title: 'Global Music Festival 2024',
    description: 'Experience three days of non-stop music across five stages featuring top artists from around the world. Enjoy diverse genres from rock and pop to electronic and jazz, plus food festivals, art installations, and camping.',
    date: '2024-07-20',
    startTime: '12:00',
    endTime: '23:00',
    timeZone: 'America/Chicago',
    location: 'Austin City Limits',
    address: '2100 Barton Springs Rd',
    city: 'Austin',
    state: 'TX',
    country: 'USA',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    price: 299,
    availableTickets: 5000,
    organizerId: 'org-2',
    organizerName: 'Global Entertainment Ltd',
    status: 'upcoming',
    type: 'festival',
    features: [
      'Multiple Stages',
      'Camping Areas',
      'Food Village',
      'Art Installations'
    ],
    ticketTypes: [
      {
        id: 'vip-2',
        name: 'VIP Festival Pass',
        price: 599,
        quantity: 1000,
        benefits: ['VIP Viewing Areas', 'Luxury Camping', 'Artist Meet & Greet']
      },
      {
        id: 'weekend-2',
        name: 'Weekend Pass',
        price: 299,
        quantity: 3000,
        benefits: ['Full Festival Access', 'Regular Camping']
      },
      {
        id: 'day-2',
        name: 'Single Day',
        price: 129,
        quantity: 1000,
        benefits: ['Single Day Access']
      }
    ],
    performers: [
      {
        name: 'The Electric Waves',
        genre: 'Alternative Rock',
        time: '21:00',
        stage: 'Main Stage'
      },
      {
        name: 'DJ Pulse',
        genre: 'Electronic',
        time: '22:30',
        stage: 'Dance Arena'
      }
    ]
  },
  {
    id: '3',
    title: 'Wellness & Mindfulness Retreat',
    description: 'Transform your life with our immersive wellness retreat. Features yoga sessions, meditation workshops, nutritional counseling, and mindfulness practices led by world-renowned experts.',
    date: '2024-05-10',
    startTime: '07:00',
    endTime: '20:00',
    timeZone: 'America/New_York',
    location: 'Serenity Mountain Resort',
    address: '1234 Peaceful Valley Road',
    city: 'Asheville',
    state: 'NC',
    country: 'USA',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
    price: 899,
    availableTickets: 200,
    organizerId: 'org-3',
    organizerName: 'Mindful Living Co',
    status: 'upcoming',
    type: 'retreat',
    features: [
      'Yoga Sessions',
      'Meditation Workshops',
      'Organic Meals',
      'Nature Walks'
    ],
    ticketTypes: [
      {
        id: 'full-3',
        name: 'Full Retreat Package',
        price: 899,
        quantity: 150,
        benefits: ['All Sessions', 'Accommodation', 'Meals']
      },
      {
        id: 'day-3',
        name: 'Day Pass',
        price: 199,
        quantity: 50,
        benefits: ['Daily Sessions', 'Lunch']
      }
    ],
    schedule: [
      {
        time: '07:00',
        activity: 'Morning Yoga',
        instructor: 'Emma Chen'
      },
      {
        time: '10:00',
        activity: 'Mindfulness Workshop',
        instructor: 'Dr. James Wilson'
      }
    ]
  },
  {
    id: '4',
    title: 'International Food & Wine Expo',
    description: 'Embark on a culinary journey featuring master chefs, wine tastings, cooking demonstrations, and gourmet food from around the world. Perfect for food enthusiasts and industry professionals.',
    date: '2024-08-05',
    startTime: '10:00',
    endTime: '22:00',
    timeZone: 'America/Los_Angeles',
    location: 'Los Angeles Convention Center',
    address: '1201 S Figueroa Street',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    price: 150,
    availableTickets: 3000,
    organizerId: 'org-4',
    organizerName: 'Culinary Events International',
    status: 'upcoming',
    type: 'expo',
    features: [
      'Chef Demonstrations',
      'Wine Tastings',
      'Gourmet Marketplace',
      'Cooking Workshops'
    ],
    ticketTypes: [
      {
        id: 'vip-4',
        name: 'VIP Gourmet Pass',
        price: 299,
        quantity: 500,
        benefits: ['Priority Access', 'Exclusive Tastings', 'Chef Meet & Greet']
      },
      {
        id: 'standard-4',
        name: 'Standard Pass',
        price: 150,
        quantity: 2000,
        benefits: ['General Access', 'Standard Tastings']
      },
      {
        id: 'evening-4',
        name: 'Evening Pass',
        price: 89,
        quantity: 500,
        benefits: ['Evening Access', 'Welcome Drink']
      }
    ],
    chefs: [
      {
        name: 'Chef Maria Garcia',
        restaurant: 'El Cielo',
        demonstration: 'Modern Spanish Cuisine'
      },
      {
        name: 'Chef Jean Pierre',
        restaurant: 'Le Petit Bistro',
        demonstration: 'French Pastry Making'
      }
    ]
  },
  {
    id: '5',
    title: 'Digital Marketing Masterclass',
    description: 'Master the latest digital marketing strategies in this intensive one-day workshop. Learn about SEO, social media marketing, content strategy, and paid advertising from industry experts.',
    date: '2024-06-15',
    startTime: '09:00',
    endTime: '17:00',
    timeZone: 'America/New_York',
    location: 'New York Business Center',
    address: '350 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    price: 399,
    availableTickets: 100,
    organizerId: 'org-5',
    organizerName: 'Digital Marketing Institute',
    status: 'upcoming',
    type: 'workshop',
    features: [
      'Hands-on Workshops',
      'Case Studies',
      'Networking Session',
      'Certificate'
    ],
    ticketTypes: [
      {
        id: 'early-5',
        name: 'Early Bird',
        price: 299,
        quantity: 50,
        benefits: ['Workshop Access', 'Lunch', 'Digital Resources']
      },
      {
        id: 'regular-5',
        name: 'Regular',
        price: 399,
        quantity: 50,
        benefits: ['Workshop Access', 'Lunch']
      }
    ],
    schedule: [
      {
        time: '09:00',
        topic: 'SEO Fundamentals',
        speaker: 'Alex Thompson'
      },
      {
        time: '11:00',
        topic: 'Social Media Strategy',
        speaker: 'Lisa Chen'
      },
      {
        time: '14:00',
        topic: 'Content Marketing',
        speaker: 'Mike Johnson'
      }
    ]
  }
];