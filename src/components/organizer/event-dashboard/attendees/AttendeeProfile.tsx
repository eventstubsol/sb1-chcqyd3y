import React, { useState, useEffect } from 'react';
import { 
  X, 
  Pencil, 
  Save,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Globe,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  User,
  Upload
} from 'lucide-react';
import { AnimatedCard } from '../../../common';
import FormInput from '../../../shared/forms/FormInput';

interface AttendeeProfileProps {
  attendeeId: string;
  onClose: () => void;
}

interface AttendeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  website: string;
  location: string;
  registrationDate: string;
  ticketType: string;
  dietaryRestrictions: string;
  linkedIn: string;
  bio: string;
  notes: string;
  profilePicture: string;
}

// Mock API call - Replace with actual API call in production
const fetchAttendeeData = async (id: string): Promise<AttendeeData> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data based on attendee ID
  const mockAttendees: Record<string, AttendeeData> = {
    '1': {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Corp',
      jobTitle: 'Senior Developer',
      website: 'https://johnsmith.com',
      location: 'San Francisco, CA',
      registrationDate: '2024-03-15',
      ticketType: 'VIP',
      dietaryRestrictions: 'Vegetarian',
      linkedIn: 'https://linkedin.com/in/johnsmith',
      bio: 'Passionate about technology and innovation.',
      notes: 'Attended previous events, active participant',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    '2': {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      company: 'Innovation Labs',
      jobTitle: 'Product Manager',
      website: 'https://sarahjohnson.com',
      location: 'New York, NY',
      registrationDate: '2024-03-14',
      ticketType: 'Early Bird',
      dietaryRestrictions: 'None',
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      bio: 'Product leader with a passion for user experience.',
      notes: 'First-time attendee',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    '3': {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      company: 'Data Analytics Co',
      jobTitle: 'Data Scientist',
      website: 'https://michaelchen.com',
      location: 'Seattle, WA',
      registrationDate: '2024-03-13',
      ticketType: 'Regular',
      dietaryRestrictions: 'Gluten-free',
      linkedIn: 'https://linkedin.com/in/michaelchen',
      bio: 'Data scientist specializing in AI/ML.',
      notes: 'Interested in networking opportunities',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    '4': {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Design Studio Inc',
      jobTitle: 'UX Designer',
      website: 'https://emilyrodriguez.com',
      location: 'Austin, TX',
      registrationDate: '2024-03-12',
      ticketType: 'VIP',
      dietaryRestrictions: 'Vegan',
      linkedIn: 'https://linkedin.com/in/emilyrodriguez',
      bio: 'Creating user-centered digital experiences.',
      notes: 'Speaker at previous events',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    '5': {
      id: '5',
      name: 'David Kim',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      company: 'Startup Ventures',
      jobTitle: 'Founder',
      website: 'https://davidkim.com',
      location: 'Boston, MA',
      registrationDate: '2024-03-11',
      ticketType: 'Regular',
      dietaryRestrictions: 'None',
      linkedIn: 'https://linkedin.com/in/davidkim',
      bio: 'Serial entrepreneur and startup advisor.',
      notes: 'Looking for investment opportunities',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  };

  if (!mockAttendees[id]) {
    throw new Error(`Attendee with ID ${id} not found`);
  }

  return mockAttendees[id];
};

export default function AttendeeProfile({ attendeeId, onClose }: AttendeeProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendee, setAttendee] = useState<AttendeeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttendeeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAttendeeData(attendeeId);
        setAttendee(data);
      } catch (error) {
        console.error('Error loading attendee data:', error);
        setError('Failed to load attendee data');
      } finally {
        setLoading(false);
      }
    };

    loadAttendeeData();
  }, [attendeeId]);

  const handleSave = async () => {
    if (!attendee) return;
    
    try {
      // Here you would make an API call to save the changes
      console.log('Saving attendee changes:', attendee);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && attendee) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttendee({
          ...attendee,
          profilePicture: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendee data...</p>
        </div>
      </div>
    );
  }

  if (error || !attendee) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <p className="text-red-600">{error || 'Attendee not found'}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Attendee Profile</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              <Pencil className="h-5 w-5 mr-1" />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Profile Picture */}
            <AnimatedCard>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {attendee.profilePicture ? (
                    <img
                      src={attendee.profilePicture}
                      alt={attendee.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-1 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700">
                      <Upload className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{attendee.name}</h3>
                  <p className="text-gray-500">{attendee.jobTitle}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Basic Information */}
            <AnimatedCard>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <FormInput
                  label="Full Name"
                  value={attendee.name}
                  onChange={(value) => setAttendee({ ...attendee, name: value })}
                  disabled={!isEditing}
                  icon={User}
                />
                <FormInput
                  label="Email"
                  value={attendee.email}
                  onChange={(value) => setAttendee({ ...attendee, email: value })}
                  disabled={!isEditing}
                  icon={Mail}
                />
                <FormInput
                  label="Phone"
                  value={attendee.phone}
                  onChange={(value) => setAttendee({ ...attendee, phone: value })}
                  disabled={!isEditing}
                  icon={Phone}
                />
              </div>
            </AnimatedCard>

            {/* Professional Information */}
            <AnimatedCard>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
              <div className="space-y-4">
                <FormInput
                  label="Company"
                  value={attendee.company}
                  onChange={(value) => setAttendee({ ...attendee, company: value })}
                  disabled={!isEditing}
                  icon={Building2}
                />
                <FormInput
                  label="Job Title"
                  value={attendee.jobTitle}
                  onChange={(value) => setAttendee({ ...attendee, jobTitle: value })}
                  disabled={!isEditing}
                  icon={Briefcase}
                />
                <FormInput
                  label="Website"
                  value={attendee.website}
                  onChange={(value) => setAttendee({ ...attendee, website: value })}
                  disabled={!isEditing}
                  icon={Globe}
                />
              </div>
            </AnimatedCard>

            {/* Event Information */}
            <AnimatedCard>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Information</h3>
              <div className="space-y-4">
                <FormInput
                  label="Location"
                  value={attendee.location}
                  onChange={(value) => setAttendee({ ...attendee, location: value })}
                  disabled={!isEditing}
                  icon={MapPin}
                />
                <FormInput
                  label="Registration Date"
                  value={attendee.registrationDate}
                  onChange={(value) => setAttendee({ ...attendee, registrationDate: value })}
                  disabled={!isEditing}
                  icon={Calendar}
                />
                <FormInput
                  label="Ticket Type"
                  value={attendee.ticketType}
                  onChange={(value) => setAttendee({ ...attendee, ticketType: value })}
                  disabled={!isEditing}
                  icon={Tag}
                />
              </div>
            </AnimatedCard>

            {/* Additional Information */}
            <AnimatedCard>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={attendee.notes}
                    onChange={(e) => setAttendee({ ...attendee, notes: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <FormInput
                  label="Dietary Restrictions"
                  value={attendee.dietaryRestrictions}
                  onChange={(value) => setAttendee({ ...attendee, dietaryRestrictions: value })}
                  disabled={!isEditing}
                  icon={MessageSquare}
                />
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}