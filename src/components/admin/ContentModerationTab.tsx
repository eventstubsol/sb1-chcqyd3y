import React, { useState } from 'react';
import { AlertTriangle, Flag, CheckCircle, XCircle, Search } from 'lucide-react';
import { contentModerationService } from '../../services/ContentModerationService';

interface FlaggedContent {
  id: string;
  content: string;
  type: 'comment' | 'description' | 'title';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reportedAt: string;
  reportedBy: string;
}

export default function ContentModerationTab() {
  const [flaggedContent] = useState<FlaggedContent[]>([
    {
      id: '1',
      content: 'This is a flagged comment...',
      type: 'comment',
      reason: 'Inappropriate language',
      status: 'pending',
      reportedAt: '2024-03-15T10:30:00Z',
      reportedBy: 'user@example.com'
    }
  ]);

  const [filter, setFilter] = useState({
    search: '',
    status: 'all',
    type: 'all'
  });

  const handleApprove = async (id: string) => {
    await contentModerationService.reviewContent(id, 'approve');
  };

  const handleReject = async (id: string) => {
    await contentModerationService.reviewContent(id, 'reject');
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Pending Review</h4>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500">Needs attention</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Auto-moderated</h4>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">89%</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Flagged Content</h4>
            <Flag className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
      </div>

      {/* Content Review */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Content Review</h3>
            <p className="text-sm text-gray-500">Review and moderate flagged content</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
            
            <select
              className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="comment">Comments</option>
              <option value="description">Descriptions</option>
              <option value="title">Titles</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {flaggedContent.map((content) => (
            <div key={content.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      content.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      content.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {content.status}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">{content.type}</span>
                  </div>
                  
                  <p className="text-gray-900">{content.content}</p>
                  
                  <div className="text-sm text-gray-500">
                    <p>Reason: {content.reason}</p>
                    <p>Reported by: {content.reportedBy}</p>
                    <p>Date: {new Date(content.reportedAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(content.id)}
                    className="p-2 text-green-600 hover:text-green-900"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(content.id)}
                    className="p-2 text-red-600 hover:text-red-900"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Moderation Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Automatic Content Filtering</p>
              <p className="text-sm text-gray-500">Filter inappropriate content automatically</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">User Reports</p>
              <p className="text-sm text-gray-500">Allow users to report inappropriate content</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content Review Threshold</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="low">Low - Review obvious violations</option>
              <option value="medium">Medium - Balance between safety and freedom</option>
              <option value="high">High - Strict content control</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}