import React, { useState } from 'react';
import { Bell, Send, Users, Calendar } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface NotificationsTabProps {
  event: Event;
}

export default function NotificationsTab({ event }: NotificationsTabProps) {
  const [message, setMessage] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');

  const notifications = [
    {
      id: '1',
      title: 'Venue Update',
      message: 'The event venue has been updated. Please check the new location details.',
      sentAt: '2024-03-15T10:30:00Z',
      audience: 'all',
      status: 'sent'
    },
    {
      id: '2',
      title: 'Early Bird Reminder',
      message: 'Early bird ticket sales end in 24 hours!',
      sentAt: '2024-03-14T15:45:00Z',
      audience: 'registered',
      status: 'sent'
    }
  ];

  const handleSendNotification = () => {
    // Here we would send the notification
    console.log('Sending notification:', { message, audience: selectedAudience });
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* New Notification Form */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Send Notification</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Audience</label>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Attendees</option>
              <option value="registered">Registered Only</option>
              <option value="vip">VIP Ticket Holders</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Type your notification message..."
            />
          </div>

          <button
            onClick={handleSendNotification}
            disabled={!message.trim()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </button>
        </div>
      </AnimatedCard>

      {/* Notification History */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification History</h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.sentAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="flex items-center text-xs text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {notification.audience === 'all' ? 'All Attendees' : 'Registered Only'}
                  </span>
                  <span className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Sent {new Date(notification.sentAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}