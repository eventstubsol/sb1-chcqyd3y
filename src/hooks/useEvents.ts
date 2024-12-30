import { useState, useCallback } from 'react';
import { Event } from '../types';
import { useToast } from '../contexts/ToastContext';

export function useEvents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getEventsByOrganizer = useCallback(async (organizerId: string): Promise<Event[]> => {
    setLoading(true);
    setError(null);
    try {
      // Mock data for development
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Tech Conference 2024',
          description: 'Annual technology conference',
          date: '2024-09-20',
          location: 'San Francisco, CA',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
          price: 599,
          availableTickets: 200,
          organizerId,
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'Summer Music Festival',
          description: 'A three-day music festival',
          date: '2024-07-15',
          location: 'Los Angeles, CA',
          imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
          price: 299,
          availableTickets: 500,
          organizerId,
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Digital Marketing Workshop',
          description: 'Learn the latest digital marketing strategies',
          date: '2024-05-30',
          location: 'New York, NY',
          imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
          price: 199,
          availableTickets: 50,
          organizerId,
          status: 'upcoming'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockEvents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(errorMessage);
      showToast('error', errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const createEvent = useCallback(async (eventData: Omit<Event, 'id'>): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };

      showToast('success', 'Event created successfully');
      return newEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create event';
      setError(errorMessage);
      showToast('error', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateEvent = useCallback(async (eventId: string, updates: Partial<Event>): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be the response from the API
      const updatedEvent: Event = {
        ...updates,
        id: eventId
      } as Event;

      showToast('success', 'Event updated successfully');
      return updatedEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update event';
      setError(errorMessage);
      showToast('error', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteEvent = useCallback(async (eventId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Event deleted successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete event';
      setError(errorMessage);
      showToast('error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    error,
    clearError,
    getEventsByOrganizer,
    createEvent,
    updateEvent,
    deleteEvent
  };
}