// Collection names as constants to avoid typos
export const COLLECTIONS = {
  ORGANIZATIONS: 'organizations',
  EVENTS: 'events',
  ATTENDEES: 'attendees',
  GROUPS: 'groups',
  USERS: 'users',
  TICKETS: 'tickets',
  SESSIONS: 'sessions',
} as const;

// Firestore schema types
export interface Organization {
  id: string;
  name: string;
  domain: string;
  settings: {
    branding: {
      logo?: string;
      colors: {
        primary: string;
        secondary: string;
      };
    };
    features: string[];
    limits: {
      events: number;
      attendees: number;
      storage: number;
    };
  };
  subscription: {
    plan: string;
    status: 'active' | 'cancelled' | 'past_due';
    currentPeriodEnd: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    city?: string;
    country?: string;
    virtualLink?: string;
  };
  settings: {
    capacity: number;
    isPublic: boolean;
    requiresApproval: boolean;
    checkInMethods: ('qr' | 'manual' | 'self')[];
  };
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    benefits?: string[];
    salesStart?: Date;
    salesEnd?: Date;
  }[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendee {
  id: string;
  eventId: string;
  userId?: string;
  ticketId: string;
  profile: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    photo?: string;
  };
  ticketType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  checkIn?: {
    status: boolean;
    timestamp: Date;
    method: 'qr' | 'manual' | 'self';
    location?: string;
  };
  groups: string[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  members: string[]; // Attendee IDs
  tags: string[];
  settings?: {
    isPrivate: boolean;
    maxMembers?: number;
    requiresApproval?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'organizer' | 'attendee';
  organizations: string[];
  profile: {
    phone?: string;
    photo?: string;
    bio?: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    timezone: string;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  attendeeId: string;
  orderNumber: string;
  ticketType: string;
  price: number;
  status: 'valid' | 'used' | 'cancelled' | 'refunded';
  purchaseDate: Date;
  qrCode: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}