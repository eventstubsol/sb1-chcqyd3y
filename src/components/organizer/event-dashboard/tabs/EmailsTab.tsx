import React, { useState } from 'react';
import { Mail, Plus, Edit2, Trash2, Send, Clock, Users } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface EmailsTabProps {
  event: Event;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'confirmation' | 'reminder' | 'custom';
  status: 'draft' | 'active';
}

interface EmailCampaign {
  id: string;
  name: string;
  template: string;
  audience: 'all' | 'registered' | 'checked-in';
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'sent';
  sentCount?: number;
  openRate?: number;
}

export default function EmailsTab({ event }: EmailsTabProps) {
  const [activeView, setActiveView] = useState<'templates' | 'campaigns'>('templates');
  
  const [templates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Registration Confirmation',
      subject: 'Welcome to {{event_name}}!',
      content: 'Thank you for registering...',
      type: 'confirmation',
      status: 'active'
    },
    {
      id: '2',
      name: 'Event Reminder',
      subject: 'Your upcoming event is tomorrow',
      content: 'Just a friendly reminder...',
      type: 'reminder',
      status: 'active'
    }
  ]);

  const [campaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      name: 'Welcome Campaign',
      template: '1',
      audience: 'registered',
      status: 'sent',
      sentCount: 150,
      openRate: 65
    },
    {
      id: '2',
      name: 'Pre-event Reminder',
      template: '2',
      audience: 'registered',
      scheduledFor: '2024-03-14T09:00:00Z',
      status: 'scheduled'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveView('templates')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'templates'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Email Templates
        </button>
        <button
          onClick={() => setActiveView('campaigns')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'campaigns'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Email Campaigns
        </button>
      </div>

      {/* Templates View */}
      {activeView === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create Template
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {templates.map((template) => (
              <AnimatedCard key={template.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        template.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Subject: {template.subject}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{template.content}</p>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  Type: {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns View */}
      {activeView === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Email Campaigns</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create Campaign
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {campaigns.map((campaign) => (
              <AnimatedCard key={campaign.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === 'sent'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Audience: {campaign.audience.charAt(0).toUpperCase() + campaign.audience.slice(1)}
                      </div>
                      {campaign.scheduledFor && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Scheduled: {new Date(campaign.scheduledFor).toLocaleString()}
                        </div>
                      )}
                      {campaign.sentCount && (
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-1" />
                          Sent to: {campaign.sentCount} recipients
                        </div>
                      )}
                      {campaign.openRate && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          Open Rate: {campaign.openRate}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {campaign.status !== 'sent' && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {campaign.status === 'sent' && campaign.openRate && (
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            Open Rate
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {campaign.openRate}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                        <div
                          style={{ width: `${campaign.openRate}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}