import React, { useState } from 'react';
import { Mail, Phone, Building2, Globe, Check, Tag, LayoutGrid, List, Eye, Users } from 'lucide-react';
import { AnimatedCard } from '../../../common';
import SendEmailButton from './communication/SendEmailButton';
import { useToast } from '../../../../contexts/ToastContext';

interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  purchaseDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  checkedIn: boolean;
  company?: string;
  jobTitle?: string;
  phone?: string;
  linkedIn?: string;
  photo?: string;
  tags: string[];
  group?: string;
  customFields: Record<string, string>;
}

interface AttendeeListProps {
  attendees: Attendee[];
  loading: boolean;
  selectedAttendees: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onAttendeeClick: (id: string) => void;
}

export default function AttendeeList({
  attendees,
  loading,
  selectedAttendees,
  onSelect,
  onSelectAll,
  onAttendeeClick
}: AttendeeListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { showToast } = useToast();

  const renderListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={selectedAttendees.length === attendees.length}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticket Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendees.map((attendee) => (
            <tr key={attendee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedAttendees.includes(attendee.id)}
                  onChange={() => onSelect(attendee.id)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {attendee.photo ? (
                    <img src={attendee.photo} alt="" className="h-10 w-10 rounded-full" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">{attendee.name[0]}</span>
                    </div>
                  )}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                    <div className="text-sm text-gray-500">{attendee.jobTitle}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{attendee.email}</div>
                <div className="text-sm text-gray-500">{attendee.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  <Tag className="h-3 w-3 mr-1" />
                  {attendee.ticketType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {attendee.group && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Users className="h-3 w-3 mr-1" />
                    {attendee.group.charAt(0).toUpperCase() + attendee.group.slice(1)}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  attendee.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : attendee.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button
                  onClick={() => onAttendeeClick(attendee.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <SendEmailButton
                  attendeeId={attendee.id}
                  attendeeName={attendee.name}
                  status={attendee.status}
                  eventDetails={{
                    name: "Tech Conference 2024",
                    date: "2024-09-20",
                    time: "09:00 AM",
                    location: "San Francisco Convention Center"
                  }}
                  onSend={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {attendees.map((attendee) => (
        <AnimatedCard
          key={attendee.id}
          className="cursor-pointer hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedAttendees.includes(attendee.id)}
                onChange={() => onSelect(attendee.id)}
                className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="flex items-center">
                  {attendee.photo ? (
                    <img
                      src={attendee.photo}
                      alt={attendee.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                      {attendee.name.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{attendee.name}</h3>
                    <p className="text-sm text-gray-500">{attendee.jobTitle}</p>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {attendee.email}
                  </div>
                  {attendee.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {attendee.phone}
                    </div>
                  )}
                  {attendee.company && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="h-4 w-4 mr-2" />
                      {attendee.company}
                    </div>
                  )}
                  {attendee.linkedIn && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="h-4 w-4 mr-2" />
                      <a
                        href={attendee.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              attendee.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : attendee.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <Tag className="h-3 w-3 mr-1" />
              {attendee.ticketType}
            </span>
            {attendee.group && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Users className="h-3 w-3 mr-1" />
                {attendee.group.charAt(0).toUpperCase() + attendee.group.slice(1)}
              </span>
            )}
            {attendee.checkedIn && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="h-3 w-3 mr-1" />
                Checked In
              </span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Registered {new Date(attendee.purchaseDate).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onAttendeeClick(attendee.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <SendEmailButton
                  attendeeId={attendee.id}
                  attendeeName={attendee.name}
                  status={attendee.status}
                  eventDetails={{
                    name: "Tech Conference 2024",
                    date: "2024-09-20",
                    time: "09:00 AM",
                    location: "San Francisco Convention Center"
                  }}
                  onSend={() => {}}
                />
              </div>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              viewMode === 'grid'
                ? 'bg-indigo-50 text-indigo-600 border-indigo-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
              viewMode === 'list'
                ? 'bg-indigo-50 text-indigo-600 border-indigo-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </div>
  );
}