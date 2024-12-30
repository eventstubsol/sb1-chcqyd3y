import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { roleService } from '../../services/RoleService';

interface PermissionGateProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const { user } = useAuth();

  if (!user) return null;

  const hasPermission = roleService.hasPermission(user, permission);

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}