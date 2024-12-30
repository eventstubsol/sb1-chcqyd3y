import React, { useState } from 'react';
import { Send, X, Image, Paperclip, FileText } from 'lucide-react';
import { AnimatedCard } from '../../../../common';

interface AttendeeMessageProps {
  attendeeIds: string[];
  onClose: () => void;
  onSend: (message: { subject: string; content: string; template?: string }) => void;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

const TEMPLATES: MessageTemplate[] = [
  {
    id: '1',
    name: 'Welcome Message',
    subject: 'Welcome to {{event_name}}!',
    content: `Dear {{attendee_name}},

Welcome to {{event_name}}! We are excited to have you join us.`
  },
  {
    id: '2',
    name: 'Event Reminder',
    subject: 'Reminder: {{event_name}} is tomorrow',
    content: `Dear {{attendee_name}},

This is a friendly reminder that {{event_name}} is tomorrow.`
  }
];

export default function AttendeeMessage({ attendeeIds, onClose, onSend }: AttendeeMessageProps) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleTemplateSelect = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSend = () => {
    onSend({
      subject,
      content,
      template: selectedTemplate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Message {attendeeIds.length} Attendee{attendeeIds.length !== 1 ? 's' : ''}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a template</option>
                {TEMPLATES.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter message subject"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Type your message here..."
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Image className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FileText className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Available Variables */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Variables</h4>
              <div className="flex flex-wrap gap-2">
                {['{{attendee_name}}', '{{event_name}}', '{{event_date}}', '{{ticket_type}}'].map(variable => (
                  <button
                    key={variable}
                    onClick={() => setContent(prev => prev + ' ' + variable)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>
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
            onClick={handleSend}
            disabled={!subject || !content}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}