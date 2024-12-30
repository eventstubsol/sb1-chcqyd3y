import React from 'react';
import { Building2, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface BasicInfoViewProps {
  tenant: any;
}

export default function BasicInfoView({ tenant }: BasicInfoViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organization Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Domain
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.domain}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Primary Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.contact?.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.contact?.phone}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.contact?.address}<br />
              {tenant.contact?.city}, {tenant.contact?.country}
            </dd>
          </div>
        </dl>
      </AnimatedCard>
    </div>
  );
}