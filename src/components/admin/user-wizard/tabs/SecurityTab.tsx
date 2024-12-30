import React from 'react';
import { FormInput } from '../../../../components/common';
import { Lock, Shield, Key, Mail, AlertTriangle } from 'lucide-react';

interface SecurityData {
  password?: string;
  confirmPassword?: string;
  twoFactorEnabled?: boolean;
  recoveryEmail?: string;
  securityQuestions?: {
    question: string;
    answer: string;
  }[];
}

interface SecurityTabProps {
  data: SecurityData;
  onChange: (data: SecurityData) => void;
  readOnly?: boolean;
}

const SECURITY_QUESTIONS = [
  { value: 'pet', label: "What was your first pet's name?" },
  { value: 'school', label: 'What elementary school did you attend?' },
  { value: 'city', label: 'In which city were you born?' },
  { value: 'mother', label: "What is your mother's maiden name?" },
  { value: 'book', label: 'What is your favorite book?' }
];

export default function SecurityTab({ data = {}, onChange, readOnly = false }: SecurityTabProps) {
  const handleSecurityQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
    const questions = [...(data.securityQuestions || [])];
    if (!questions[index]) {
      questions[index] = { question: '', answer: '' };
    }
    questions[index][field] = value;
    onChange({ ...data, securityQuestions: questions });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Security Settings</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure security options and recovery settings for the user account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Password"
          type="password"
          value={data.password || ''}
          onChange={(value) => onChange({ ...data, password: value })}
          required={!readOnly}
          icon={Lock}
          placeholder="••••••••"
          disabled={readOnly}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          value={data.confirmPassword || ''}
          onChange={(value) => onChange({ ...data, confirmPassword: value })}
          required={!readOnly}
          icon={Lock}
          placeholder="••••••••"
          disabled={readOnly}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Add an extra layer of security to the account</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.twoFactorEnabled || false}
            onChange={(e) => !readOnly && onChange({ ...data, twoFactorEnabled: e.target.checked })}
            className="sr-only peer"
            disabled={readOnly}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      <FormInput
        label="Recovery Email"
        type="email"
        value={data.recoveryEmail || ''}
        onChange={(value) => onChange({ ...data, recoveryEmail: value })}
        icon={Mail}
        placeholder="recovery@example.com"
        disabled={readOnly}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Security Questions
        </label>
        <div className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question {index + 1}
                </label>
                <select
                  value={data.securityQuestions?.[index]?.question || ''}
                  onChange={(e) => handleSecurityQuestionChange(index, 'question', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required={index === 0}
                  disabled={readOnly}
                >
                  <option value="">Select a question</option>
                  {SECURITY_QUESTIONS.map((q) => (
                    <option key={q.value} value={q.value}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </div>
              <FormInput
                label="Answer"
                value={data.securityQuestions?.[index]?.answer || ''}
                onChange={(value) => handleSecurityQuestionChange(index, 'answer', value)}
                required={index === 0}
                icon={Key}
                disabled={readOnly}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Make sure to save the recovery email and security questions in a safe place.
              They will be needed to recover account access if the password is forgotten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}