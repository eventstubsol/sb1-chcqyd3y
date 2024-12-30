import { Event } from '../types';

class EventService {
  private events: Map<string, Event> = new Map();

  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    const id = Date.now().toString();
    const event = {
      ...eventData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Event;
    
    this.events.set(id, event);
    return event;
  }

  async getEvents(filters?: {
    organizerId?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<Event[]> {
    let filteredEvents = Array.from(this.events.values());

    if (filters) {
      const { organizerId, status, fromDate, toDate } = filters;

      if (organizerId) {
        filteredEvents = filteredEvents.filter(event => event.organizerId === organizerId);
      }

      if (status) {
        filteredEvents = filteredEvents.filter(event => event.status === status);
      }

      if (fromDate) {
        filteredEvents = filteredEvents.filter(event => event.date >= fromDate);
      }

      if (toDate) {
        filteredEvents = filteredEvents.filter(event => event.date <= toDate);
      }
    }

    return filteredEvents;
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.events.get(id) || null;
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
    const event = this.events.get(id);
    if (!event) throw new Error('Event not found');

    const updatedEvent = {
      ...event,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    this.events.delete(id);
  }

  async getEventStats(eventId: string): Promise<{
    totalAttendees: number;
    ticketsSold: number;
    revenue: number;
    averageRating: number;
  }> {
    // Mock stats
    return {
      totalAttendees: Math.floor(Math.random() * 1000),
      ticketsSold: Math.floor(Math.random() * 800),
      revenue: Math.floor(Math.random() * 50000),
      averageRating: 4.5
    };
  }

  async getUpcomingEvents(limit: number = 5): Promise<Event[]> {
    const now = new Date().toISOString();
    return Array.from(this.events.values())
      .filter(event => event.date > now)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
  }

  async searchEvents(query: string): Promise<Event[]> {
    const searchLower = query.toLowerCase();
    return Array.from(this.events.values())
      .filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
  }
}

export const eventService = new EventService();