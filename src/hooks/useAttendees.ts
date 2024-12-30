import { useState, useCallback, useMemo, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  purchaseDate: string;
  checkedIn: boolean;
  status: 'confirmed' | 'pending' | 'cancelled';
  company?: string;
  jobTitle?: string;
  phone?: string;
  linkedIn?: string;
  photo?: string;
  tags: string[];
  group?: string;
  customFields: Record<string, string>;
  eventId: string;
}

interface FilterCondition {
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

class AttendeeStore {
  private attendees: Map<string, Attendee> = new Map();

  async getAttendees(eventId: string): Promise<Attendee[]> {
    return Array.from(this.attendees.values())
      .filter(attendee => attendee.eventId === eventId);
  }

  async addAttendee(attendee: Omit<Attendee, 'id'>): Promise<Attendee> {
    const id = Date.now().toString();
    const newAttendee = { ...attendee, id };
    this.attendees.set(id, newAttendee);
    return newAttendee;
  }

  async importAttendees(attendees: Omit<Attendee, 'id'>[]): Promise<number> {
    let count = 0;
    for (const attendee of attendees) {
      await this.addAttendee(attendee);
      count++;
    }
    return count;
  }
}

const attendeeStore = new AttendeeStore();

export default function useAttendees(eventId: string) {
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ticketFilter, setTicketFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [advancedFilters, setAdvancedFilters] = useState<FilterCondition[]>([]);
  const { showToast } = useToast();

  const loadAttendees = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await attendeeStore.getAttendees(eventId);
      setAttendees(data);
    } catch (error) {
      console.error('Error loading attendee data:', error);
      showToast('error', 'Failed to load attendees');
    } finally {
      setLoading(false);
    }
  }, [eventId, showToast]);

  const addAttendee = useCallback(async (attendeeData: Omit<Attendee, 'id' | 'eventId'>) => {
    try {
      const newAttendee = await attendeeStore.addAttendee({
        ...attendeeData,
        eventId,
        status: 'pending',
        checkedIn: false,
        purchaseDate: new Date().toISOString(),
        tags: attendeeData.tags || [],
        customFields: attendeeData.customFields || {}
      });
      
      setAttendees(prev => [...prev, newAttendee]);
      showToast('success', 'Attendee added successfully');
      return newAttendee;
    } catch (error) {
      showToast('error', 'Failed to add attendee');
      throw error;
    }
  }, [eventId, showToast]);

  const importAttendees = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      const headers = rows[0].map(header => header.trim().toLowerCase());
      
      const requiredHeaders = ['name', 'email', 'tickettype'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
      }

      const attendeesToImport = rows.slice(1)
        .filter(row => row.length === headers.length && row.some(cell => cell.trim()))
        .map(row => {
          const data: Record<string, any> = {};
          headers.forEach((header, index) => {
            data[header] = row[index]?.trim() || '';
          });
          return data;
        });

      const importedCount = await attendeeStore.importAttendees(
        attendeesToImport.map(data => ({
          name: data.name,
          email: data.email,
          ticketType: data.tickettype || 'regular',
          phone: data.phone || '',
          company: data.company || '',
          jobTitle: data.jobtitle || '',
          status: 'pending',
          checkedIn: false,
          purchaseDate: new Date().toISOString(),
          tags: [],
          customFields: {},
          eventId
        }))
      );

      showToast('success', `Imported ${importedCount} attendees`);
      await loadAttendees();
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', error.message);
      } else {
        showToast('error', 'Failed to import attendees');
      }
      throw error;
    }
  }, [eventId, showToast, loadAttendees]);

  const toggleAttendeeSelection = useCallback((attendeeId: string) => {
    setSelectedAttendees(prev => 
      prev.includes(attendeeId)
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  }, []);

  const selectAllAttendees = useCallback(() => {
    setSelectedAttendees(attendees.map(a => a.id));
  }, [attendees]);

  const deselectAllAttendees = useCallback(() => {
    setSelectedAttendees([]);
  }, []);

  const exportAttendees = useCallback((attendeesToExport: Attendee[]) => {
    try {
      const headers = ['Name', 'Email', 'Ticket Type', 'Status', 'Company', 'Job Title', 'Phone'];
      const csvContent = [
        headers.join(','),
        ...attendeesToExport.map(attendee => [
          attendee.name,
          attendee.email,
          attendee.ticketType,
          attendee.status,
          attendee.company || '',
          attendee.jobTitle || '',
          attendee.phone || ''
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `attendees_${eventId}_${new Date().toISOString()}.csv`;
      link.click();
      
      showToast('success', `Exported ${attendeesToExport.length} attendees`);
    } catch (error) {
      showToast('error', 'Failed to export attendees');
      throw error;
    }
  }, [eventId, showToast]);

  const sendBulkMessage = useCallback(async (attendeeIds: string[]) => {
    try {
      // Mock email sending
      showToast('success', `Message sent to ${attendeeIds.length} attendees`);
    } catch (error) {
      showToast('error', 'Failed to send messages');
      throw error;
    }
  }, [showToast]);

  useEffect(() => {
    loadAttendees();
  }, [loadAttendees]);

  const filteredAttendees = useMemo(() => {
    let result = [...attendees];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(attendee => 
        attendee.name.toLowerCase().includes(searchLower) ||
        attendee.email.toLowerCase().includes(searchLower) ||
        attendee.company?.toLowerCase().includes(searchLower) ||
        attendee.jobTitle?.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(attendee => attendee.status === statusFilter);
    }

    if (ticketFilter !== 'all') {
      result = result.filter(attendee => attendee.ticketType.toLowerCase() === ticketFilter.toLowerCase());
    }

    if (groupFilter !== 'all') {
      result = result.filter(attendee => attendee.group === groupFilter);
    }

    if (advancedFilters.length > 0) {
      result = result.filter(attendee => {
        return advancedFilters.every(condition => {
          const value = attendee[condition.field as keyof Attendee];
          if (value === undefined) return false;

          switch (condition.operator) {
            case 'equals':
              return value.toString().toLowerCase() === condition.value.toLowerCase();
            case 'contains':
              return value.toString().toLowerCase().includes(condition.value.toLowerCase());
            case 'startsWith':
              return value.toString().toLowerCase().startsWith(condition.value.toLowerCase());
            case 'endsWith':
              return value.toString().toLowerCase().endsWith(condition.value.toLowerCase());
            default:
              return false;
          }
        });
      });
    }

    return result;
  }, [attendees, searchTerm, statusFilter, ticketFilter, groupFilter, advancedFilters]);

  return {
    attendees: filteredAttendees,
    loading,
    selectedAttendees,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    ticketFilter,
    setTicketFilter,
    groupFilter,
    setGroupFilter,
    advancedFilters,
    setAdvancedFilters,
    toggleAttendeeSelection,
    selectAllAttendees,
    deselectAllAttendees,
    exportAttendees,
    sendBulkMessage,
    addAttendee,
    importAttendees
  };
}