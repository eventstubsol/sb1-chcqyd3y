import React, { useState } from 'react';
import { X, Upload, Globe, Check } from 'lucide-react';
import { Tenant, WhiteLabelConfig } from '../../types';

interface WhiteLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant;
  onSave: (tenantId: string, config: WhiteLabelConfig) => void;
}

export default function WhiteLabelModal({ isOpen, onClose, tenant, onSave }: WhiteLabelModalProps) {
  const [config, setConfig] = useState<WhiteLabelConfig>(tenant.whiteLabelConfig);
  const [previewMode, setPreviewMode] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tenant.id, config);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              White Label Configuration - {tenant.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Settings Panel */}
            <div className="col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-900">Enable White Label</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`px-4 py-2 rounded-md ${
                    previewMode 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Preview Mode
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={config.companyName}
                    onChange={e => setConfig({ ...config, companyName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Custom Domain</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      https://
                    </span>
                    <input
                      type="text"
                      value={config.customDomain}
                      onChange={e => setConfig({ ...config, customDomain: e.target.value })}
                      className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="events.company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                      className="h-8 w-8 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={e => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="h-8 w-8 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={e => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Logo Upload</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Custom CSS</label>
                <textarea
                  rows={4}
                  value={config.customCss}
                  onChange={e => setConfig({ ...config, customCss: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder=".custom-class { color: var(--primary-color); }"
                />
              </div>
            </div>

            {/* Preview Panel */}
            <div className="col-span-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Live Preview</h4>
                
                <div className="border rounded-lg overflow-hidden bg-white">
                  {/* Header Preview */}
                  <div 
                    className="p-4"
                    style={{ backgroundColor: config.primaryColor, color: '#fff' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-md"></div>
                      <span className="font-medium">{config.companyName}</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>

                    <button
                      className="mt-4 px-4 py-2 rounded-md text-white w-full"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      Sample Button
                    </button>
                  </div>
                </div>

                {/* Domain Preview */}
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    {config.customDomain || tenant.domain}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}