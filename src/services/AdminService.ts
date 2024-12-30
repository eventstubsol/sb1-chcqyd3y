import { User, Tenant, Event, SystemHealth } from '../types';
import { aiService } from './AIService';

class AdminService {
  private static instance: AdminService;
  private tenants: Map<string, Tenant> = new Map();
  private users: Map<string, User> = new Map();
  private systemMetrics: Map<string, any> = new Map();
  private apiKeys: Map<string, any> = new Map();

  // Tenant Management
  async getTenants(): Promise<Tenant[]> {
    return Array.from(this.tenants.values());
  }

  async createTenant(tenantData: Partial<Tenant>): Promise<Tenant> {
    const id = Date.now().toString();
    const tenant = {
      ...tenantData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Tenant;
    
    this.tenants.set(id, tenant);
    return tenant;
  }

  async updateTenant(id: string, updates: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenants.get(id);
    if (!tenant) throw new Error('Tenant not found');

    const updatedTenant = {
      ...tenant,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.tenants.set(id, updatedTenant);
    return updatedTenant;
  }

  async deleteTenant(id: string): Promise<void> {
    this.tenants.delete(id);
  }

  // User Management
  async getUsers(tenantId?: string): Promise<User[]> {
    const users = Array.from(this.users.values());
    if (tenantId) {
      return users.filter(user => user.organizationId === tenantId);
    }
    return users;
  }

  async createUser(userData: Partial<User>, tenantId?: string): Promise<User> {
    const id = Date.now().toString();
    const user = {
      ...userData,
      id,
      organizationId: tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as User;
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    this.users.delete(userId);
  }

  // System Health & Monitoring
  async getSystemHealth(): Promise<SystemHealth> {
    return {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      status: 'healthy',
      lastUpdated: new Date().toISOString()
    };
  }

  async getSystemMetrics(timeRange: string): Promise<any> {
    return Array.from(this.systemMetrics.values())
      .filter(metric => {
        const timestamp = new Date(metric.timestamp);
        const threshold = new Date(Date.now() - this.getTimeRangeInMs(timeRange));
        return timestamp >= threshold;
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  // AI Insights
  async generateInsights(tenantId?: string): Promise<any> {
    const data = await this.getSystemMetrics('30d');
    return aiService.analyzeEngagement(data);
  }

  // API Management
  async getApiKeys(): Promise<any[]> {
    return Array.from(this.apiKeys.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createApiKey(name: string, permissions: string[]): Promise<any> {
    const id = Date.now().toString();
    const apiKey = {
      id,
      name,
      permissions,
      createdAt: new Date().toISOString(),
      revoked: false
    };
    
    this.apiKeys.set(id, apiKey);
    return apiKey;
  }

  async revokeApiKey(keyId: string): Promise<void> {
    const apiKey = this.apiKeys.get(keyId);
    if (apiKey) {
      apiKey.revoked = true;
      this.apiKeys.set(keyId, apiKey);
    }
  }

  // Utility Methods
  private getTimeRangeInMs(timeRange: string): number {
    const units: Record<string, number> = {
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
      w: 7 * 24 * 60 * 60 * 1000,
      m: 30 * 24 * 60 * 60 * 1000
    };

    const value = parseInt(timeRange);
    const unit = timeRange.slice(-1);
    return value * (units[unit] || units.d);
  }

  // Singleton Instance
  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }
}

export const adminService = AdminService.getInstance();