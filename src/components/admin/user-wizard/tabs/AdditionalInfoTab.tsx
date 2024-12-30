import React from 'react';
import { FormInput } from '../../../common';
import { FileText, Link } from 'lucide-react';

interface AdditionalInfoData {
  bio?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  notes?: string;
}

interface AdditionalInfoTabProps {
  data: AdditionalInfoData;
  onChange: (data: AdditionalInfoData) => void;
}

export default function AdditionalInfoTab({ data, onChange }: AdditionalInfoTabProps) {
  const handleSkillsChange = (skillsString: string) => {
    const skills = skillsString.split(',').map(skill => skill.trim());
    onChange({ ...data, skills });
  };

  const handleSocialLinkChange = (platform: keyof AdditionalInfoData['socialLinks'], value: string) => {
    onChange({
      ...data,
      socialLinks: {
        ...data.socialLinks,
        [platform]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Additional Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add supplementary details about the user.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={data.bio || ''}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter user bio..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          value={data.skills?.join(', ') || ''}
          onChange={(e) => handleSkillsChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter skills, separated by commas"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Social Links</h4>
        
        <FormInput
          label="LinkedIn"
          value={data.socialLinks?.linkedin || ''}
          onChange={(value) => handleSocialLinkChange('linkedin', value)}
          icon={Link}
          placeholder="https://linkedin.com/in/username"
        />

        <FormInput
          label="Twitter"
          value={data.socialLinks?.twitter || ''}
          onChange={(value) => handleSocialLinkChange('twitter', value)}
          icon={Link}
          placeholder="https://twitter.com/username"
        />

        <FormInput
          label="GitHub"
          value={data.socialLinks?.github || ''}
          onChange={(value) => handleSocialLinkChange('github', value)}
          icon={Link}
          placeholder="https://github.com/username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Any additional notes about the user..."
        />
      </div>
    </div>
  );
}