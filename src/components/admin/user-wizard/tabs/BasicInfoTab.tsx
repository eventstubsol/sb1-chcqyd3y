import React from 'react';
import { FormInput } from '../../../../components/common';
import { User, Upload, Mail } from 'lucide-react';

interface BasicInfoData {
  fullName: string;
  email: string;
  username: string;
  profilePicture?: File;
}

interface BasicInfoTabProps {
  data: BasicInfoData;
  onChange: (data: BasicInfoData) => void;
  disabled?: boolean;
}

export default function BasicInfoTab({ data, onChange, disabled = false }: BasicInfoTabProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...data, profilePicture: file });
    }
  };

  // Ensure all form fields have initial values
  const formData = {
    fullName: data.fullName || '',
    email: data.email || '',
    username: data.username || '',
    profilePicture: data.profilePicture
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Basic Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the user's basic details and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={(value) => onChange({ ...formData, fullName: value })}
          required
          icon={User}
          disabled={disabled}
          placeholder="John Doe"
        />

        <FormInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => onChange({ ...formData, email: value })}
          required
          icon={Mail}
          disabled={disabled}
          placeholder="john@example.com"
        />

        <FormInput
          label="Username"
          value={formData.username}
          onChange={(value) => onChange({ ...formData, username: value })}
          icon={User}
          disabled={disabled}
          placeholder="johndoe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={disabled}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {formData.profilePicture && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="w-32 h-32 rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={URL.createObjectURL(formData.profilePicture)}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}