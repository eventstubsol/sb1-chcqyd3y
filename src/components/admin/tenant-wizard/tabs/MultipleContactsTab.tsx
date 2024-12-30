import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FormInput, FormSelect } from '../../../common';

interface Contact {
  id: string;
  name: string;
  role: string;
  platformRole: string;
  phone: string;
  email: string;
  department?: string;
  preferredContact: string;
  notes?: string;
}

interface MultipleContactsTabProps {
  data: Contact[];
  onChange: (contacts: Contact[]) => void;
}

const PLATFORM_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'viewer', label: 'Viewer' }
];

const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' }
];

export default function MultipleContactsTab({ data, onChange }: MultipleContactsTabProps) {
  const addContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: '',
      role: '',
      platformRole: '',
      phone: '',
      email: '',
      preferredContact: 'email'
    };
    onChange([...data, newContact]);
  };

  const removeContact = (id: string) => {
    onChange(data.filter(contact => contact.id !== id));
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    onChange(data.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Contact List</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add multiple contacts associated with this tenant. Each contact can have different roles and responsibilities.
        </p>
      </div>

      <div className="space-y-8">
        {data.map((contact, index) => (
          <div 
            key={contact.id}
            className="p-6 border border-gray-200 rounded-lg animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-md font-medium text-gray-900">Contact #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeContact(contact.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                value={contact.name}
                onChange={(value) => updateContact(contact.id, { name: value })}
                required
              />

              <FormInput
                label="Role/Position"
                value={contact.role}
                onChange={(value) => updateContact(contact.id, { role: value })}
                required
                placeholder="e.g., IT Manager"
              />

              <FormSelect
                label="Platform Role"
                value={contact.platformRole}
                onChange={(value) => updateContact(contact.id, { platformRole: value })}
                options={PLATFORM_ROLES}
                required
              />

              <FormInput
                label="Department"
                value={contact.department || ''}
                onChange={(value) => updateContact(contact.id, { department: value })}
                placeholder="e.g., IT, Finance, Marketing"
              />

              <FormInput
                label="Phone Number"
                type="tel"
                value={contact.phone}
                onChange={(value) => updateContact(contact.id, { phone: value })}
                required
              />

              <FormInput
                label="Email Address"
                type="email"
                value={contact.email}
                onChange={(value) => updateContact(contact.id, { email: value })}
                required
              />

              <FormSelect
                label="Preferred Contact Method"
                value={contact.preferredContact}
                onChange={(value) => updateContact(contact.id, { preferredContact: value })}
                options={CONTACT_METHODS}
                required
              />

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={contact.notes || ''}
                  onChange={(e) => updateContact(contact.id, { notes: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Additional notes about this contact's responsibilities or preferences..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addContact}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Another Contact
      </button>
    </div>
  );
}