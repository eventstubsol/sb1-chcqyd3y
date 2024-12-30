import React, { useState } from 'react';
import { Shield, Copy, Check } from 'lucide-react';
import { TwoFactorSetup as TwoFactorSetupType } from '../../types';

interface TwoFactorSetupProps {
  setup: TwoFactorSetupType;
  onVerify: (token: string) => Promise<void>;
  onCancel: () => void;
}

export default function TwoFactorSetup({ setup, onVerify, onCancel }: TwoFactorSetupProps) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedCodes, setCopiedCodes] = useState<string[]>([]);

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      await onVerify(token);
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodes([...copiedCodes, code]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-4 text-lg font-medium text-gray-900">Two-Factor Authentication Setup</h2>
        <p className="mt-2 text-sm text-gray-500">
          Scan the QR code with your authenticator app and enter the verification code below.
        </p>
      </div>

      <div className="flex justify-center">
        <img src={setup.qrCode} alt="QR Code" className="w-48 h-48" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter 6-digit code"
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Backup Codes</h3>
        <p className="mt-1 text-sm text-gray-500">
          Save these backup codes in a secure place. You can use them to access your account if you lose your authenticator device.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {setup.backupCodes.map((code) => (
            <div
              key={code}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <code className="text-sm font-mono">{code}</code>
              <button
                type="button"
                onClick={() => copyBackupCode(code)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {copiedCodes.includes(code) ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading || token.length !== 6}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
}