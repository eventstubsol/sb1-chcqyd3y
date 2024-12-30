import React, { useState } from 'react';
import { Plus, Users, Tag, Trash2, Eye, UserPlus } from 'lucide-react';
import { AnimatedCard } from '../../../common';
import { Event } from '../../../../types';
import { useToast } from '../../../../contexts/ToastContext';
import MembersModal from './modals/MembersModal';
import CreateGroupModal from './modals/CreateGroupModal';
import EditGroupModal from './modals/EditGroupModal';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';

interface Group {
  id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    email: string;
    ticketType: string;
  }>;
  tags: string[];
}

interface AttendeeGroupsProps {
  event: Event;
  attendees: any[];
}

export default function AttendeeGroups({ event, attendees }: AttendeeGroupsProps) {
  const { showToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'VIP Attendees',
      description: 'Premium ticket holders with exclusive access',
      members: [
        { id: '1', name: 'John Doe', email: 'john@example.com', ticketType: 'VIP' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', ticketType: 'VIP' },
      ],
      tags: ['VIP', 'Premium']
    },
    {
      id: '2',
      name: 'Speakers',
      description: 'Event speakers and presenters',
      members: [
        { id: '4', name: 'Mike Johnson', email: 'mike@example.com', ticketType: 'Speaker' },
        { id: '5', name: 'Sarah Wilson', email: 'sarah@example.com', ticketType: 'Speaker' },
      ],
      tags: ['Speaker', 'Staff']
    }
  ]);

  const handleDeleteGroup = (groupId: string) => {
    setGroups(prevGroups => prevGroups.filter(g => g.id !== groupId));
    showToast('success', 'Group deleted successfully');
  };

  const handleViewMembers = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = (groupData: any) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupData.name,
      description: groupData.description,
      members: groupData.members.map((memberId: string) => {
        const attendee = attendees.find(a => a.id === memberId);
        return {
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          ticketType: attendee.ticketType
        };
      }),
      tags: groupData.tags || []
    };
    setGroups(prevGroups => [...prevGroups, newGroup]);
    showToast('success', 'Group created successfully');
  };

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
    showToast('success', 'Group updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Event Groups</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {groups.map((group) => (
          <AnimatedCard key={group.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{group.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{group.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewMembers(group)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setGroupToEdit(group)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <UserPlus className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setGroupToDelete(group)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {group.members.length} members
              </span>
              <button 
                onClick={() => handleViewMembers(group)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                View Members
              </button>
            </div>
            <div className="mt-2 flex -space-x-2">
              {group.members.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-gray-600">
                    {member.name[0]}
                  </span>
                </div>
              ))}
              {group.members.length > 5 && (
                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{group.members.length - 5}
                  </span>
                </div>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Modals */}
      {selectedGroup && (
        <MembersModal
          groupName={selectedGroup.name}
          members={selectedGroup.members}
          onClose={() => setSelectedGroup(null)}
        />
      )}

      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onSave={(groupData) => {
            handleCreateGroup(groupData);
            setShowCreateModal(false);
          }}
          existingAttendees={attendees}
        />
      )}

      {groupToEdit && (
        <EditGroupModal
          group={groupToEdit}
          existingAttendees={attendees}
          onClose={() => setGroupToEdit(null)}
          onSave={(updatedGroup) => {
            handleUpdateGroup(updatedGroup);
            setGroupToEdit(null);
          }}
        />
      )}

      {groupToDelete && (
        <DeleteConfirmationModal
          group={groupToDelete}
          onConfirm={() => {
            handleDeleteGroup(groupToDelete.id);
            setGroupToDelete(null);
          }}
          onCancel={() => setGroupToDelete(null)}
        />
      )}
    </div>
  );
}