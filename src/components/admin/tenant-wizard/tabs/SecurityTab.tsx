import React from 'react';
import { Shield, Key, Lock, FileText } from 'lucide-react';

interface SecurityData {
  twoFactorEnabled: boolean;
  ssoEnabled: boolean;
  complianceSettings: string[];
  auditLogAccess: string;
}

interface SecurityTabProps {
  data: SecurityData;
  onChange: (data: SecurityData) => void;
}

const COMPLIANCE_OPTIONS = [
  { id: 'gdpr', label: 'GDPR' },
  { id: 'ccpa', label: 'CCPA' },
  { id: 'hipaa', label: 'HIPAA' },
  { id: 'sox', label: 'SOX' }
];

const AUDIT_ACCESS_LEVELS = [
  { value: 'full', label: 'Full Access' },
  { value: 'limited', label: 'Limited Access' },
  { value: 'readonly', label: 'Read Only' },
  { value: 'none', label: 'No Access' }
];

export default function SecurityTab({ data, onChange }: SecurityTabProps) {
  const handleComplianceChange = (complianceId: string) => {
    const currentSettings = data.complianceSettings || [];
    const newSettings = currentSettings.includes(complianceId)
      ? currentSettings.filter(id => id !== complianceId)
      : [...currentSettings, complianceId];
    onChange({ ...data, complianceSettings: newSettings });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Security Settings</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure security and compliance settings for the tenant.
        </p>
      </div>

      <div className="space-y-6">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Require 2FA for all tenant users</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.twoFactorEnabled}
              onChange={(e) => onChange({ ...data, twoFactorEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* SSO Configuration */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Single Sign-On (SSO)</h4>
              <p className="text-sm text-gray-500">Enable SSO integration</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.ssoEnabled}
              onChange={(e) => onChange({ ...data, ssoEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Compliance Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" />
              <span>Compliance Standards</span>
            </div>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {COMPLIANCE_OPTIONS.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.complianceSettings.includes(option.id)}
                  onChange={() => handleComplianceChange(option.id)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Audit Log Access */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Audit Log Access Level</span>
            </div>
          </label>
          <select
            value={data.auditLogAccess}
            onChange={(e) => onChange({ ...data, auditLogAccess: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select access level</option>
            {AUDIT_ACCESS_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Enabling certain security features may require additional configuration after tenant creation.
              Make sure to review and configure all security settings according to your organization's requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}