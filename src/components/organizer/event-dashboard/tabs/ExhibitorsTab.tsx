import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface ExhibitorsTabProps {
  event: Event;
}

interface Exhibitor {
  id: string;
  name: string;
  logo: string;
  description: string;
  boothNumber: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function ExhibitorsTab({ event }: ExhibitorsTabProps) {
  const [exhibitors] = useState<Exhibitor[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
      description: 'Leading provider of enterprise software solutions',
      boothNumber: 'A1',
      website: 'https://techcorp.com',
      contactName: 'John Smith',
      contactEmail: 'john@techcorp.com',
      contactPhone: '+1 (555) 123-4567',
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'InnovateLabs',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3624',
      description: 'Innovation and research consultancy',
      boothNumber: 'B3',
      website: 'https://innovatelabs.com',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@innovatelabs.com',
      contactPhone: '+1 (555) 987-6543',
      status: 'confirmed'
    }
  ]);

  const handleAddExhibitor = () => {
    console.log('Adding new exhibitor');
  };

  const handleEditExhibitor = (exhibitorId: string) => {
    console.log('Editing exhibitor:', exhibitorId);
  };

  const handleDeleteExhibitor = (exhibitorId: string) => {
    console.log('Deleting exhibitor:', exhibitorId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Event Exhibitors</h3>
        <button
          onClick={handleAddExhibitor}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Exhibitor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {exhibitors.map((exhibitor) => (
          <AnimatedCard key={exhibitor.id}>
            <div className="flex items-start space-x-6">
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{exhibitor.name}</h4>
                    <p className="mt-1 text-sm text-gray-500">{exhibitor.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditExhibitor(exhibitor.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExhibitor(exhibitor.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    Booth {exhibitor.boothNumber}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 mr-2" />
                    <a
                      href={exhibitor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {exhibitor.website}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {exhibitor.contactEmail}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {exhibitor.contactPhone}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Contact:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {exhibitor.contactName}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    exhibitor.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : exhibitor.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {exhibitor.status.charAt(0).toUpperCase() + exhibitor.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}