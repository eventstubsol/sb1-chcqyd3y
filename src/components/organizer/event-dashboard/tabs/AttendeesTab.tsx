import React, { useState } from 'react';
import { Search, Filter, Mail, Download, Users, Tag, BarChart2, UsersRound, UserPlus, Upload } from 'lucide-react';
import { AnimatedCard } from '../../../common';
import { Event } from '../../../../types';
import AttendeeList from '../attendees/AttendeeList';
import AttendeeProfile from '../attendees/AttendeeProfile';
import AttendeeGroups from '../attendees/AttendeeGroups';
import AttendeeMetrics from '../attendees/AttendeeMetrics';
import AttendeeMessage from '../attendees/communication/AttendeeMessage';
import AddAttendeeModal from '../attendees/modals/AddAttendeeModal';
import ImportAttendeesModal from '../attendees/modals/ImportAttendeesModal';
import AdvancedFilter from '../attendees/filters/AdvancedFilter';
import useAttendees from '../../../../hooks/useAttendees';

interface AttendeesTabProps {
  event: Event;
}

export default function AttendeesTab({ event }: AttendeesTabProps) {
  const {
    attendees,
    loading,
    selectedAttendees,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    ticketFilter,
    setTicketFilter,
    groupFilter,
    setGroupFilter,
    toggleAttendeeSelection,
    selectAllAttendees,
    deselectAllAttendees,
    exportAttendees,
    sendBulkMessage,
    addAttendee,
    importAttendees,
    advancedFilters,
    setAdvancedFilters
  } = useAttendees(event.id);

  const [activeTab, setActiveTab] = useState<'metrics' | 'list' | 'groups'>('metrics');
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAddAttendeeModal, setShowAddAttendeeModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleAttendeeClick = (id: string) => {
    setSelectedAttendeeId(id);
  };

  const handleAddAttendee = async (attendeeData: any) => {
    try {
      await addAttendee(attendeeData);
      setShowAddAttendeeModal(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  const handleImportAttendees = async (file: File) => {
    try {
      await importAttendees(file);
      setShowImportModal(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  const handleSendMessage = (messageData: { subject: string; content: string }) => {
    sendBulkMessage(selectedAttendees);
    setShowMessageModal(false);
  };

  const handleApplyFilters = (conditions: any[]) => {
    setAdvancedFilters(conditions);
  };

  const tabs = [
    { id: 'metrics' as const, label: 'Analytics', icon: BarChart2 },
    { id: 'list' as const, label: 'Attendees', icon: Users },
    { id: 'groups' as const, label: 'Groups', icon: UsersRound }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-1 py-4 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'metrics' && <AttendeeMetrics event={event} attendees={attendees} />}
      
      {activeTab === 'list' && (
        <>
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddAttendeeModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
              >
                <UserPlus className="h-5 w-5" />
                Add Attendee
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Upload className="h-5 w-5" />
                Import Attendees
              </button>
            </div>
            <div className="flex gap-4">
              {selectedAttendees.length > 0 && (
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Email Selected ({selectedAttendees.length})
                </button>
              )}
              <button
                onClick={() => exportAttendees(attendees)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <AnimatedCard>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search attendees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={ticketFilter}
                onChange={(e) => setTicketFilter(e.target.value)}
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Tickets</option>
                <option value="vip">VIP</option>
                <option value="regular">Regular</option>
                <option value="early">Early Bird</option>
              </select>
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Groups</option>
                <option value="vip">VIP</option>
                <option value="speakers">Speakers</option>
                <option value="sponsors">Sponsors</option>
              </select>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="h-5 w-5" />
                Advanced Filters
              </button>
            </div>

            {showAdvancedFilters && (
              <div className="mt-4">
                <AdvancedFilter onFilter={handleApplyFilters} />
              </div>
            )}
          </AnimatedCard>

          {/* Attendees List */}
          <AnimatedCard>
            <AttendeeList
              attendees={attendees}
              loading={loading}
              selectedAttendees={selectedAttendees}
              onSelect={toggleAttendeeSelection}
              onSelectAll={selectedAttendees.length === attendees.length ? deselectAllAttendees : selectAllAttendees}
              onAttendeeClick={handleAttendeeClick}
            />
          </AnimatedCard>
        </>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-6">
          <AttendeeGroups event={event} attendees={attendees} />
        </div>
      )}

      {/* Modals */}
      {selectedAttendeeId && (
        <AttendeeProfile
          attendeeId={selectedAttendeeId}
          onClose={() => setSelectedAttendeeId(null)}
        />
      )}

      {showMessageModal && (
        <AttendeeMessage
          attendeeIds={selectedAttendees}
          onClose={() => setShowMessageModal(false)}
          onSend={handleSendMessage}
        />
      )}

      {showAddAttendeeModal && (
        <AddAttendeeModal
          onClose={() => setShowAddAttendeeModal(false)}
          onSave={handleAddAttendee}
        />
      )}

      {showImportModal && (
        <ImportAttendeesModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImportAttendees}
        />
      )}
    </div>
  );
}