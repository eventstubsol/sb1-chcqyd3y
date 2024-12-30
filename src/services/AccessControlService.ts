class AccessControlService {
  private ipRules: Map<string, IPRule> = new Map();
  private geoRules: Map<string, GeolocationRule> = new Map();
  private rateLimits: Map<string, RateLimitConfig> = new Map();
  private sessions: Map<string, Set<string>> = new Map();
  private readonly DEFAULT_SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private readonly SESSION_LIMITS: Record<string, number> = {
    admin: 3,
    moderator: 5,
    user: 10
  };

  async addIPRule(rule: IPRule): Promise<void> {
    this.ipRules.set(rule.ip, rule);
  }

  async removeIPRule(ip: string): Promise<void> {
    this.ipRules.delete(ip);
  }

  async checkIPAccess(ip: string): Promise<boolean> {
    const rule = this.ipRules.get(ip);
    if (!rule) return true;
    
    if (rule.expiry && rule.expiry < new Date()) {
      this.ipRules.delete(ip);
      return true;
    }

    return rule.type === 'allow';
  }

  async addGeoRule(rule: GeolocationRule): Promise<void> {
    this.geoRules.set(rule.country, rule);
  }

  async checkGeoAccess(country: string): Promise<boolean> {
    const rule = this.geoRules.get(country);
    return !rule || rule.type === 'allow';
  }

  async setRateLimit(config: RateLimitConfig): Promise<void> {
    this.rateLimits.set(config.role, config);
  }

  async checkRateLimit(userId: string, role: string): Promise<boolean> {
    const config = this.rateLimits.get(role);
    if (!config) return true;
    return true;
  }

  async createSession(userId: string, sessionId: string, role: string): Promise<boolean> {
    const userSessions = this.sessions.get(userId) || new Set();
    const limit = this.SESSION_LIMITS[role] || this.SESSION_LIMITS.user;

    if (userSessions.size >= limit) {
      return false;
    }

    userSessions.add(sessionId);
    this.sessions.set(userId, userSessions);
    return true;
  }

  async removeSession(userId: string, sessionId: string): Promise<void> {
    const userSessions = this.sessions.get(userId);
    if (userSessions) {
      userSessions.delete(sessionId);
      if (userSessions.size === 0) {
        this.sessions.delete(userId);
      }
    }
  }

  async getActiveSessions(userId: string): Promise<number> {
    return this.sessions.get(userId)?.size || 0;
  }

  getSessionTimeout(role: string): number {
    const timeouts: Record<string, number> = {
      admin: 60 * 60 * 1000, // 1 hour
      moderator: 45 * 60 * 1000, // 45 minutes
      user: this.DEFAULT_SESSION_TIMEOUT
    };
    return timeouts[role] || this.DEFAULT_SESSION_TIMEOUT;
  }

  checkPermission(userId: string, permission: string): boolean {
    // Implement permission checking logic
    return true;
  }
}

interface IPRule {
  ip: string;
  type: 'allow' | 'block';
  expiry?: Date;
  reason?: string;
}

interface GeolocationRule {
  country: string;
  type: 'allow' | 'block';
}

interface RateLimitConfig {
  role: string;
  requestsPerMinute: number;
  burstLimit: number;
}

export const accessControlService = new AccessControlService();