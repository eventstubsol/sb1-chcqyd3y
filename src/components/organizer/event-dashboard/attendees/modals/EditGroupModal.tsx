import React, { useState } from 'react';
import { X, Upload, Users, Plus } from 'lucide-react';
import { FormInput } from '../../../../common';
import { useToast } from '../../../../../contexts/ToastContext';

interface EditGroupModalProps {
  group: {
    id: string;
    name: string;
    description: string;
    members: string[];
    tags: string[];
  };
  onClose: () => void;
  onSave: (groupData: any) => void;
  attendees: Array<{
    id: string;
    name: string;
    email: string;
    ticketType: string;
    status: string;
  }>;
}

export default function EditGroupModal({ group, onClose, onSave, attendees = [] }: EditGroupModalProps) {
  const { showToast } = useToast();
  const [groupName, setGroupName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const [addMethod, setAddMethod] = useState<'existing' | 'manual' | 'bulk'>('existing');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>(group.members || []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    ticketType: 'regular',
    dietaryRestrictions: '',
    notes: ''
  });

  const handleSave = () => {
    if (!groupName.trim()) {
      showToast('error', 'Group name is required');
      return;
    }

    onSave({
      ...group,
      name: groupName,
      description,
      members: selectedAttendees
    });
    onClose();
    showToast('success', 'Group updated successfully');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      showToast('success', 'File uploaded successfully');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Edit Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <FormInput
                label="Group Name"
                value={groupName}
                onChange={setGroupName}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Members</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setAddMethod('existing')}
                  className={`px-4 py-2 rounded-md ${
                    addMethod === 'existing'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <Users className="h-5 w-5 inline mr-2" />
                  Select Existing
                </button>
                <button
                  onClick={() => setAddMethod('manual')}
                  className={`px-4 py-2 rounded-md ${
                    addMethod === 'manual'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <Plus className="h-5 w-5 inline mr-2" />
                  Add Manually
                </button>
                <button
                  onClick={() => setAddMethod('bulk')}
                  className={`px-4 py-2 rounded-md ${
                    addMethod === 'bulk'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <Upload className="h-5 w-5 inline mr-2" />
                  Bulk Upload
                </button>
              </div>
            </div>

            {addMethod === 'existing' && (
              <div className="space-y-4">
                {attendees.map((attendee) => (
                  <label key={attendee.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedAttendees.includes(attendee.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAttendees([...selectedAttendees, attendee.id]);
                        } else {
                          setSelectedAttendees(selectedAttendees.filter(id => id !== attendee.id));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-900">{attendee.name}</span>
                  </label>
                ))}
              </div>
            )}

            {addMethod === 'manual' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                    required
                  />

                  <FormInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                    required
                  />

                  <FormInput
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  />

                  <FormInput
                    label="Company"
                    value={formData.company}
                    onChange={(value) => setFormData(prev => ({ ...prev, company: value }))}
                  />

                  <FormInput
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                    <select
                      value={formData.ticketType}
                      onChange={(e) => setFormData(prev => ({ ...prev, ticketType: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="regular">Regular</option>
                      <option value="vip">VIP</option>
                      <option value="early">Early Bird</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {addMethod === 'bulk' && (
              <div className="space-y-4">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".csv,.xlsx"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">CSV or Excel files only</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => {
                    e.preventDefault();
                    // Download template logic here
                  }}
                >
                  Download template file
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}