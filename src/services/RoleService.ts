import { RolePermission, UserRole, User } from '../types';
import { accessControlService } from './AccessControlService';

// Define base permissions
const BASE_PERMISSIONS = {
  VIEW_EVENTS: 'view_events',
  CREATE_EVENTS: 'create_events',
  EDIT_EVENTS: 'edit_events',
  DELETE_EVENTS: 'delete_events',
  MANAGE_USERS: 'manage_users',
  ASSIGN_ROLES: 'assign_roles',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_BILLING: 'manage_billing',
  SUPER_ADMIN: 'super_admin'
} as const;

// Role definitions with hierarchical permissions
const ROLE_DEFINITIONS: Record<UserRole, RolePermission> = {
  super_admin: {
    role: 'super_admin',
    permissions: Object.values(BASE_PERMISSIONS),
    description: 'Full system access with tenant management capabilities',
    canAssignRoles: ['admin', 'moderator', 'user', 'viewer']
  },
  admin: {
    role: 'admin',
    permissions: [
      BASE_PERMISSIONS.VIEW_EVENTS,
      BASE_PERMISSIONS.CREATE_EVENTS,
      BASE_PERMISSIONS.EDIT_EVENTS,
      BASE_PERMISSIONS.DELETE_EVENTS,
      BASE_PERMISSIONS.MANAGE_USERS,
      BASE_PERMISSIONS.ASSIGN_ROLES,
      BASE_PERMISSIONS.VIEW_ANALYTICS,
      BASE_PERMISSIONS.MANAGE_SETTINGS,
      BASE_PERMISSIONS.MANAGE_BILLING
    ],
    description: 'Tenant-level administrative access',
    canAssignRoles: ['moderator', 'user', 'viewer']
  },
  moderator: {
    role: 'moderator',
    permissions: [
      BASE_PERMISSIONS.VIEW_EVENTS,
      BASE_PERMISSIONS.CREATE_EVENTS,
      BASE_PERMISSIONS.EDIT_EVENTS,
      BASE_PERMISSIONS.VIEW_ANALYTICS
    ],
    description: 'Event moderation and management',
    canAssignRoles: ['user', 'viewer']
  },
  user: {
    role: 'user',
    permissions: [
      BASE_PERMISSIONS.VIEW_EVENTS,
      BASE_PERMISSIONS.CREATE_EVENTS
    ],
    description: 'Standard user access',
    canAssignRoles: ['viewer']
  },
  viewer: {
    role: 'viewer',
    permissions: [
      BASE_PERMISSIONS.VIEW_EVENTS
    ],
    description: 'Read-only access',
    canAssignRoles: []
  }
};

export class RoleService {
  hasPermission(user: User, permission: string): boolean {
    if (user.isSuperAdmin) return true;
    return accessControlService.checkPermission(user.id, permission);
  }

  canAssignRole(assigner: User, roleToAssign: UserRole): boolean {
    if (assigner.isSuperAdmin) return true;
    const assignerRole = ROLE_DEFINITIONS[assigner.role];
    return assignerRole?.canAssignRoles.includes(roleToAssign) || false;
  }

  getRolePermissions(role: UserRole): string[] {
    return ROLE_DEFINITIONS[role]?.permissions || [];
  }

  getAssignableRoles(user: User): UserRole[] {
    if (user.isSuperAdmin) {
      return Object.keys(ROLE_DEFINITIONS) as UserRole[];
    }
    return ROLE_DEFINITIONS[user.role]?.canAssignRoles || [];
  }
}

export const roleService = new RoleService();