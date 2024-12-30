import React, { useState } from 'react';
import { X } from 'lucide-react';
import BasicInfoSection from './tenant-form/BasicInfoSection';
import ContactSection from './tenant-form/ContactSection';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tenant: any) => Promise<void>;
  initialData?: any;
  mode?: 'add' | 'edit';
}

const defaultFormData = {
  name: '',
  industry: '',
  contact: {
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    country: '',
  }
};

export default function AddTenantModal({
  isOpen,
  onClose,
  onAdd,
  initialData,
  mode = 'add'
}: AddTenantModalProps) {
  const [currentSection, setCurrentSection] = useState('basic');
  const [formData, setFormData] = useState(initialData || defaultFormData);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(formData);
    onClose();
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [field]: value
      }
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'basic':
        return (
          <BasicInfoSection
            name={formData.name}
            industry={formData.industry}
            onNameChange={(value) => setFormData({ ...formData, name: value })}
            onIndustryChange={(value) => setFormData({ ...formData, industry: value })}
          />
        );
      case 'contact':
        return (
          <ContactSection
            contact={formData.contact}
            onChange={handleContactChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'add' ? 'Add New Tenant' : 'Edit Tenant'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex border-b">
            <nav className="flex overflow-x-auto py-4 px-6 space-x-4">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'contact', label: 'Contact Info' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentSection(tab.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium ${
                    currentSection === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {renderSection()}
            </div>

            <div className="flex justify-end items-center gap-4 px-6 py-4 bg-gray-50 border-t">
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
                {mode === 'add' ? 'Add Tenant' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}