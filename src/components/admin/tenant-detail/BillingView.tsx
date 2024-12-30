import React from 'react';
import BillingDashboard from '../../billing/BillingDashboard';

interface BillingViewProps {
  tenant: any;
}

export default function BillingView({ tenant }: BillingViewProps) {
  return <BillingDashboard tenantId={tenant.id} />;
}