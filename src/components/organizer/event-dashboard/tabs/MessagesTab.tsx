import React, { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface MessagesTabProps {
  event: Event;
}

export default function MessagesTab({ event }: MessagesTabProps) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const messages = [
    {
      id: '1',
      from: 'John Doe',
      email: 'john@example.com',
      message: 'Is parking available at the venue?',
      timestamp: '2024-03-15T10:30:00Z',
      status: 'unread'
    },
    {
      id: '2',
      from: 'Sarah Smith',
      email: 'sarah@example.com',
      message: 'Can I bring my own food to the event?',
      timestamp: '2024-03-14T15:45:00Z',
      status: 'read'
    }
  ];

  const handleSendReply = (messageId: string) => {
    console.log('Sending reply:', { messageId, replyText });
    setReplyText('');
    setSelectedMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Messages</h3>
        <select className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <AnimatedCard key={message.id}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{message.from}</h4>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                    {message.status === 'unread' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{message.message}</p>
                
                {selectedMessage === message.id ? (
                  <div className="mt-4 space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Type your reply..."
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(message.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setSelectedMessage(message.id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}