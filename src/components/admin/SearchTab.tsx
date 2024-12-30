import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface SearchFilters {
  tenantId?: string;
  dateRange?: string;
  status?: string;
  type?: string;
  category?: string;
}

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search across all tenants..."
              className="pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>

          {showAdvancedFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tenant</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filters.tenantId}
                  onChange={(e) => setFilters({ ...filters, tenantId: e.target.value })}
                >
                  <option value="">All Tenants</option>
                  <option value="1">Tenant A</option>
                  <option value="2">Tenant B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date Range</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                >
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="event">Events</option>
                  <option value="user">Users</option>
                  <option value="transaction">Transactions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Search Results</h3>
          <div className="flex items-center space-x-4">
            <select className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Export Results
            </button>
          </div>
        </div>

        {/* Sample Results */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Tech Conference 2024</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Annual technology conference featuring industry experts...
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">Tenant: TechCorp</span>
                  <span className="text-sm text-gray-500">Type: Event</span>
                  <span className="text-sm text-gray-500">Date: Mar 15, 2024</span>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">John Smith</h4>
                <p className="text-sm text-gray-500 mt-1">
                  User account with administrative privileges...
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">Tenant: Acme Corp</span>
                  <span className="text-sm text-gray-500">Type: User</span>
                  <span className="text-sm text-gray-500">Status: Active</span>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-900">View Profile</button>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}