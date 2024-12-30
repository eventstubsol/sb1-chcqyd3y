import React from 'react';
import { Upload, Palette } from 'lucide-react';

interface BrandingData {
  logo?: File;
  themeColor: string;
}

interface BrandingStepProps {
  data: BrandingData;
  onChange: (data: Partial<BrandingData>) => void;
}

export default function BrandingStep({ data, onChange }: BrandingStepProps) {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ logo: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Event Branding</h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize your event's visual identity
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Logo</label>
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
                  onChange={handleLogoChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Theme Color</label>
        <div className="mt-1 flex items-center gap-4">
          <div className="relative">
            <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={data.themeColor}
              onChange={(e) => onChange({ themeColor: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="#4F46E5"
            />
          </div>
          <input
            type="color"
            value={data.themeColor}
            onChange={(e) => onChange({ themeColor: e.target.value })}
            className="h-9 w-9 rounded-md border border-gray-300 cursor-pointer"
          />
        </div>
      </div>

      {data.logo && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="w-32 h-32 rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={URL.createObjectURL(data.logo)}
              alt="Logo preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}