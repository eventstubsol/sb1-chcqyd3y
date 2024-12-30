export type UserRole = 'admin' | 'organizer' | 'attendee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isSuperAdmin?: boolean;
  organizationName?: string;
  organizationId?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  price: number;
  availableTickets: number;
  organizerId: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type?: string;
  features?: string[];
  ticketTypes?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    benefits?: string[];
  }>;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
  organizer?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface SecurityQuestion {
  question: string;
  answer: string;
}

export interface RolePermission {
  role: UserRole;
  permissions: string[];
  description: string;
  canAssignRoles: UserRole[];
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface AIInsight {
  id: string;
  type: string;
  message: string;
  confidence: number;
  timestamp: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage?: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  count?: number;
  sales?: number;
  revenue?: number;
  tickets?: number;
}

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  domain: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  subscription: {
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
    billingCycle: string;
    price: number;
  };
  billing: {
    contactName: string;
    contactEmail: string;
    address: string;
    vatId: string;
    paymentMethod: string;
  };
  settings: {
    userLimit: number;
    storageLimit: number;
    apiLimit: number;
    features: string[];
    language: string;
    timezone: string;
    notificationPreferences: {
      email: boolean;
      sms: boolean;
    };
  };
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
  }[];
}