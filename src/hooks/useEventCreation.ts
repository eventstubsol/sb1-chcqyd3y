import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { EventFormData } from '../components/events/wizard/QuickStartWizard';

export function useEventCreation() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const createEvent = async (data: EventFormData, publish: boolean): Promise<boolean> => {
    setLoading(true);
    try {
      // Here we would make an API call to save the event
      // For now, simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast('success', `Event ${publish ? 'published' : 'saved as draft'} successfully!`);
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      showToast('error', 'Failed to create event. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createEvent
  };
}