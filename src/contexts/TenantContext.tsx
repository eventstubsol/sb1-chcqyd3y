import React, { createContext, useContext, useState } from 'react';
import { Tenant } from '../types';

interface TenantContextType {
  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id' | 'createdAt'>) => Promise<Tenant>;
  updateTenant: (id: string, updates: Partial<Tenant>) => Promise<Tenant>;
  deleteTenant: (id: string) => Promise<void>;
  getTenantById: (id: string) => Tenant | undefined;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const initialTenants: Tenant[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    domain: 'acme.eventhub.com',
    status: 'active',
    createdAt: '2024-01-15',
    contact: {
      email: 'admin@acme.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, San Francisco, CA 94105',
      city: 'San Francisco',
      country: 'US'
    },
    subscription: {
      plan: 'enterprise',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      billingCycle: 'monthly',
      price: 999
    },
    billing: {
      contactName: 'John Smith',
      contactEmail: 'billing@acme.com',
      address: '123 Tech Street, San Francisco, CA 94105',
      vatId: 'US123456789',
      paymentMethod: 'credit_card'
    },
    settings: {
      userLimit: 50,
      storageLimit: 1000,
      apiLimit: 10000,
      features: ['custom_branding', 'api_access', 'priority_support'],
      language: 'en',
      timezone: 'America/Los_Angeles',
      notificationPreferences: {
        email: true,
        sms: true
      }
    },
    users: [
      {
        id: '1-1',
        name: 'John Smith',
        email: 'john@acme.com',
        role: 'admin',
        status: 'active',
        lastActive: '2024-03-15T10:30:00Z'
      },
      {
        id: '1-2',
        name: 'Sarah Johnson',
        email: 'sarah@acme.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-14T15:45:00Z'
      },
      {
        id: '1-3',
        name: 'Mike Wilson',
        email: 'mike@acme.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-13T09:20:00Z'
      },
      {
        id: '1-4',
        name: 'Emily Brown',
        email: 'emily@acme.com',
        role: 'viewer',
        status: 'active',
        lastActive: '2024-03-12T14:15:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'TechStart Solutions',
    industry: 'Software',
    domain: 'techstart.eventhub.com',
    status: 'active',
    createdAt: '2024-02-01',
    contact: {
      email: 'admin@techstart.com',
      phone: '+1 (555) 234-5678',
      address: '456 Innovation Ave, Austin, TX 78701',
      city: 'Austin',
      country: 'US'
    },
    subscription: {
      plan: 'professional',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      billingCycle: 'yearly',
      price: 499
    },
    billing: {
      contactName: 'Lisa Chen',
      contactEmail: 'billing@techstart.com',
      address: '456 Innovation Ave, Austin, TX 78701',
      vatId: 'US987654321',
      paymentMethod: 'bank_transfer'
    },
    settings: {
      userLimit: 25,
      storageLimit: 500,
      apiLimit: 5000,
      features: ['api_access', 'advanced_analytics'],
      language: 'en',
      timezone: 'America/Chicago',
      notificationPreferences: {
        email: true,
        sms: false
      }
    },
    users: [
      {
        id: '2-1',
        name: 'Lisa Chen',
        email: 'lisa@techstart.com',
        role: 'admin',
        status: 'active',
        lastActive: '2024-03-15T11:20:00Z'
      },
      {
        id: '2-2',
        name: 'David Park',
        email: 'david@techstart.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-14T16:30:00Z'
      },
      {
        id: '2-3',
        name: 'Rachel Kim',
        email: 'rachel@techstart.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-13T10:45:00Z'
      },
      {
        id: '2-4',
        name: 'Tom Martinez',
        email: 'tom@techstart.com',
        role: 'viewer',
        status: 'active',
        lastActive: '2024-03-12T13:15:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Global Events Co',
    industry: 'Events Management',
    domain: 'globalevents.eventhub.com',
    status: 'active',
    createdAt: '2024-02-15',
    contact: {
      email: 'admin@globalevents.com',
      phone: '+1 (555) 345-6789',
      address: '789 Event Plaza, Miami, FL 33101',
      city: 'Miami',
      country: 'US'
    },
    subscription: {
      plan: 'enterprise',
      status: 'active',
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      billingCycle: 'monthly',
      price: 999
    },
    billing: {
      contactName: 'Maria Rodriguez',
      contactEmail: 'billing@globalevents.com',
      address: '789 Event Plaza, Miami, FL 33101',
      vatId: 'US456789123',
      paymentMethod: 'credit_card'
    },
    settings: {
      userLimit: 100,
      storageLimit: 2000,
      apiLimit: 20000,
      features: ['custom_branding', 'api_access', 'priority_support', 'white_label'],
      language: 'en',
      timezone: 'America/New_York',
      notificationPreferences: {
        email: true,
        sms: true
      }
    },
    users: [
      {
        id: '3-1',
        name: 'Maria Rodriguez',
        email: 'maria@globalevents.com',
        role: 'admin',
        status: 'active',
        lastActive: '2024-03-15T09:30:00Z'
      },
      {
        id: '3-2',
        name: 'Carlos Santos',
        email: 'carlos@globalevents.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-14T14:20:00Z'
      },
      {
        id: '3-3',
        name: 'Ana Silva',
        email: 'ana@globalevents.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-13T11:45:00Z'
      },
      {
        id: '3-4',
        name: 'Luis Torres',
        email: 'luis@globalevents.com',
        role: 'viewer',
        status: 'active',
        lastActive: '2024-03-12T15:30:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'EduTech Academy',
    industry: 'Education',
    domain: 'edutech.eventhub.com',
    status: 'active',
    createdAt: '2024-03-01',
    contact: {
      email: 'admin@edutech.com',
      phone: '+1 (555) 456-7890',
      address: '321 Learning Lane, Boston, MA 02108',
      city: 'Boston',
      country: 'US'
    },
    subscription: {
      plan: 'professional',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      billingCycle: 'yearly',
      price: 499
    },
    billing: {
      contactName: 'James Wilson',
      contactEmail: 'billing@edutech.com',
      address: '321 Learning Lane, Boston, MA 02108',
      vatId: 'US789123456',
      paymentMethod: 'paypal'
    },
    settings: {
      userLimit: 50,
      storageLimit: 1000,
      apiLimit: 8000,
      features: ['custom_branding', 'advanced_analytics'],
      language: 'en',
      timezone: 'America/New_York',
      notificationPreferences: {
        email: true,
        sms: false
      }
    },
    users: [
      {
        id: '4-1',
        name: 'James Wilson',
        email: 'james@edutech.com',
        role: 'admin',
        status: 'active',
        lastActive: '2024-03-15T08:45:00Z'
      },
      {
        id: '4-2',
        name: 'Emma Davis',
        email: 'emma@edutech.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-14T13:20:00Z'
      },
      {
        id: '4-3',
        name: 'Michael Lee',
        email: 'michael@edutech.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-13T10:15:00Z'
      },
      {
        id: '4-4',
        name: 'Sophie Taylor',
        email: 'sophie@edutech.com',
        role: 'viewer',
        status: 'active',
        lastActive: '2024-03-12T16:45:00Z'
      }
    ]
  },
  {
    id: '5',
    name: 'HealthCare Plus',
    industry: 'Healthcare',
    domain: 'healthcareplus.eventhub.com',
    status: 'active',
    createdAt: '2024-03-10',
    contact: {
      email: 'admin@healthcareplus.com',
      phone: '+1 (555) 567-8901',
      address: '567 Medical Center Dr, Chicago, IL 60601',
      city: 'Chicago',
      country: 'US'
    },
    subscription: {
      plan: 'enterprise',
      status: 'active',
      startDate: '2024-03-10',
      endDate: '2025-03-09',
      billingCycle: 'monthly',
      price: 999
    },
    billing: {
      contactName: 'Sarah Thompson',
      contactEmail: 'billing@healthcareplus.com',
      address: '567 Medical Center Dr, Chicago, IL 60601',
      vatId: 'US321654987',
      paymentMethod: 'credit_card'
    },
    settings: {
      userLimit: 75,
      storageLimit: 1500,
      apiLimit: 15000,
      features: ['custom_branding', 'api_access', 'priority_support', 'hipaa_compliance'],
      language: 'en',
      timezone: 'America/Chicago',
      notificationPreferences: {
        email: true,
        sms: true
      }
    },
    users: [
      {
        id: '5-1',
        name: 'Sarah Thompson',
        email: 'sarah@healthcareplus.com',
        role: 'admin',
        status: 'active',
        lastActive: '2024-03-15T09:00:00Z'
      },
      {
        id: '5-2',
        name: 'Robert Johnson',
        email: 'robert@healthcareplus.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-14T14:30:00Z'
      },
      {
        id: '5-3',
        name: 'Jennifer White',
        email: 'jennifer@healthcareplus.com',
        role: 'user',
        status: 'active',
        lastActive: '2024-03-13T11:20:00Z'
      },
      {
        id: '5-4',
        name: 'William Brown',
        email: 'william@healthcareplus.com',
        role: 'viewer',
        status: 'active',
        lastActive: '2024-03-12T15:45:00Z'
      }
    ]
  }
];

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);

  const addTenant = async (tenantData: Omit<Tenant, 'id' | 'createdAt'>): Promise<Tenant> => {
    const newTenant = {
      ...tenantData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setTenants(prev => [...prev, newTenant]);
    return newTenant;
  };

  const updateTenant = async (id: string, updates: Partial<Tenant>): Promise<Tenant> => {
    const updatedTenants = tenants.map(tenant =>
      tenant.id === id ? { ...tenant, ...updates } : tenant
    );
    
    const updatedTenant = updatedTenants.find(t => t.id === id);
    if (!updatedTenant) {
      throw new Error('Tenant not found');
    }

    setTenants(updatedTenants);
    return updatedTenant;
  };

  const deleteTenant = async (id: string): Promise<void> => {
    setTenants(prev => prev.filter(tenant => tenant.id !== id));
  };

  const getTenantById = (id: string): Tenant | undefined => {
    return tenants.find(tenant => tenant.id === id);
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        addTenant,
        updateTenant,
        deleteTenant,
        getTenantById
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenants() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenants must be used within a TenantProvider');
  }
  return context;
}