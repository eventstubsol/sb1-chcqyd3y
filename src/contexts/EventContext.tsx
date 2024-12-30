import React, { createContext, useContext, useState, useCallback } from 'react';
import { Event } from '../types';
import { eventService } from '../services/EventService';
import { useToast } from './ToastContext';

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  createEvent: (event: Omit<Event, 'id'>) => Promise<Event | null>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEventsByOrganizer: (organizerId: string) => Promise<Event[]>;
  searchEvents: (query: string) => Promise<Event[]>;
  clearError: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const createEvent = useCallback(async (eventData: Omit<Event, 'id'>): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      showToast('success', 'Event created successfully');
      return newEvent;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create event';
      setError(message);
      showToast('error', message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await eventService.updateEvent(id, updates);
      setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
      showToast('success', 'Event updated successfully');
      return updatedEvent;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update event';
      setError(message);
      showToast('error', message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      showToast('success', 'Event deleted successfully');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete event';
      setError(message);
      showToast('error', message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const getEventsByOrganizer = useCallback(async (organizerId: string): Promise<Event[]> => {
    setLoading(true);
    setError(null);
    try {
      const organizerEvents = await eventService.getEvents({ organizerId });
      setEvents(organizerEvents);
      return organizerEvents;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(message);
      showToast('error', message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const searchEvents = useCallback(async (query: string): Promise<Event[]> => {
    setLoading(true);
    setError(null);
    try {
      return await eventService.searchEvents(query);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search events';
      setError(message);
      showToast('error', message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventsByOrganizer,
        searchEvents,
        clearError
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}