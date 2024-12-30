import React from 'react';

export const EMAIL_TEMPLATES = {
  'registration-confirmation': {
    subject: 'Welcome to {{event_name}}!',
    content: `Dear {{attendee_name}},

Thank you for registering for {{event_name}}! We're excited to have you join us.

Event Details:
Date: {{event_date}}
Time: {{event_time}}
Location: {{event_location}}

Your ticket type: {{ticket_type}}

Please keep this email for your records. You'll need to present your ticket (attached) at check-in.

Best regards,
The Event Team`
  },
  'registration-invitation': {
    subject: 'Complete Your Registration for {{event_name}}',
    content: `Dear {{attendee_name}},

You're almost there! Please complete your registration for {{event_name}}.

Click the link below to finalize your registration:
{{registration_link}}

Event Details:
Date: {{event_date}}
Time: {{event_time}}
Location: {{event_location}}

We look forward to seeing you at the event!

Best regards,
The Event Team`
  },
  'event-reminder': {
    subject: 'Reminder: {{event_name}} is Tomorrow',
    content: `Dear {{attendee_name}},

This is a friendly reminder that {{event_name}} is tomorrow!

Event Details:
Date: {{event_date}}
Time: {{event_time}}
Location: {{event_location}}

Don't forget to bring your ticket for check-in.

See you tomorrow!
The Event Team`
  }
};

export function getEmailTemplate(templateId: keyof typeof EMAIL_TEMPLATES, data: Record<string, string>) {
  const template = EMAIL_TEMPLATES[templateId];
  if (!template) return null;

  let { subject, content } = template;

  // Replace placeholders with actual data
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(placeholder, value);
    content = content.replace(placeholder, value);
  });

  return { subject, content };
}