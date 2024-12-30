import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

interface SearchParams {
  query: string;
  date?: string;
  location?: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams, onSearch]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 p-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={searchParams.query}
              onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
            />
          </div>
        </div>

        <div className="flex-1 md:flex-initial md:w-48">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={searchParams.date}
              onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            />
          </div>
        </div>

        <div className="flex-1 md:flex-initial md:w-48">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Location"
              className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}