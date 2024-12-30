import React from 'react';
import SearchBar from './SearchBar';
import { Event } from '../types';

interface HeroProps {
  onSearch: (events: Event[]) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const handleSearch = (params: { query: string; date?: string; location?: string }) => {
    // Filter events based on search parameters
    const filteredEvents = SAMPLE_EVENTS.filter(event => {
      const matchesQuery = !params.query || 
        event.title.toLowerCase().includes(params.query.toLowerCase()) ||
        event.description.toLowerCase().includes(params.query.toLowerCase());

      const matchesDate = !params.date || 
        new Date(event.date).toISOString().split('T')[0] === params.date;

      const matchesLocation = !params.location || 
        event.location.toLowerCase().includes(params.location.toLowerCase());

      return matchesQuery && matchesDate && matchesLocation;
    });

    onSearch(filteredEvents);
  };

  return (
    <div className="relative bg-indigo-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          alt="Event background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-8">
          Discover Amazing Events Near You
        </h1>
        
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Find and book tickets for the best concerts, festivals, workshops, and more happening in your area.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

// Sample events data for search functionality
const SAMPLE_EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'A three-day music festival featuring top artists',
    date: '2024-07-15',
    location: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    price: 299,
    availableTickets: 500,
    organizer: 'Festival Productions Inc.'
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference',
    date: '2024-09-20',
    location: 'Convention Center, San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    price: 599,
    availableTickets: 200,
    organizer: 'TechEvents LLC'
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    description: 'Culinary excellence and wine tasting',
    date: '2024-08-10',
    location: 'Waterfront Park, Miami',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    price: 150,
    availableTickets: 300,
    organizer: 'Gourmet Events Co.'
  }
];