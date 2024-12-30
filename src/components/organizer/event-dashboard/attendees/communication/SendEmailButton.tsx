import React from 'react';
import { Mail } from 'lucide-react';
import { getEmailTemplate } from './EmailTemplates';
import { useToast } from '../../../../../contexts/ToastContext';

interface SendEmailButtonProps {
  attendeeId: string;
  attendeeName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  eventDetails: {
    name: string;
    date: string;
    time: string;
    location: string;
  };
  onSend: (emailData: { subject: string; content: string }) => void;
}

export default function SendEmailButton({
  attendeeId,
  attendeeName,
  status,
  eventDetails,
  onSend
}: SendEmailButtonProps) {
  const { showToast } = useToast();

  const handleSendEmail = async () => {
    try {
      const templateId = status === 'pending' ? 'registration-invitation' : 'registration-confirmation';
      
      const emailData = getEmailTemplate(templateId, {
        attendee_name: attendeeName,
        event_name: eventDetails.name,
        event_date: eventDetails.date,
        event_time: eventDetails.time,
        event_location: eventDetails.location,
        registration_link: `https://example.com/register/${attendeeId}`,
        ticket_type: 'Regular' // This should come from actual attendee data
      });

      if (emailData) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        onSend(emailData);
        
        showToast(
          'success', 
          `${status === 'pending' ? 'Invitation' : 'Confirmation'} email sent to ${attendeeName}`
        );
      }
    } catch (error) {
      showToast('error', `Failed to send email to ${attendeeName}`);
    }
  };

  return (
    <button
      onClick={handleSendEmail}
      className="flex items-center text-indigo-600 hover:text-indigo-500"
    >
      <Mail className="h-4 w-4 mr-1" />
      {status === 'pending' ? 'Send Invitation' : 'Send Confirmation'}
    </button>
  );
}