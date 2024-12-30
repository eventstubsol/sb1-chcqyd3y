import React, { useState } from 'react';
import { Building2, Users, Search, Filter, UserPlus } from 'lucide-react';
import TenantWizard from './tenant-wizard/TenantWizard';
import TenantDetailPage from './TenantDetailPage';
import { useTenants } from '../../contexts/TenantContext';
import { useToast } from '../../contexts/ToastContext';

export default function TenantsTab() {
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [showEditWizard, setShowEditWizard] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const { tenants, addTenant, updateTenant } = useTenants();
  const { showToast } = useToast();

  const handleCreateTenant = async (data: any) => {
    try {
      await addTenant(data);
      showToast('success', 'Tenant created successfully');
      setShowAddTenant(false);
    } catch (error) {
      showToast('error', 'Failed to create tenant');
    }
  };

  const handleUpdateTenant = async (data: any) => {
    if (selectedTenantId) {
      try {
        await updateTenant(selectedTenantId, data);
        showToast('success', 'Tenant updated successfully');
        setShowEditWizard(false);
      } catch (error) {
        showToast('error', 'Failed to update tenant');
      }
    }
  };

  const handleEditTenant = () => {
    setShowEditWizard(true);
  };

  const handleViewDetails = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setShowEditWizard(false);
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedTenantId && !showEditWizard) {
    return (
      <TenantDetailPage
        tenantId={selectedTenantId}
        onBack={() => setSelectedTenantId(null)}
        onEdit={handleEditTenant}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tenant Management</h2>
          <p className="mt-1 text-gray-500">Manage and monitor all tenant organizations</p>
        </div>
        <button
          onClick={() => setShowAddTenant(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <Building2 className="h-5 w-5" />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tenants..."
            className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Tenants List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                      <div className="text-sm text-gray-500">{tenant.domain}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tenant.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : tenant.status === 'suspended'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tenant.users?.length || 0} users
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(tenant.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleViewDetails(tenant.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Tenant Wizard */}
      {showAddTenant && (
        <TenantWizard
          onClose={() => setShowAddTenant(false)}
          onSubmit={handleCreateTenant}
          mode="create"
        />
      )}

      {/* Edit Tenant Wizard */}
      {showEditWizard && selectedTenantId && (
        <TenantWizard
          onClose={() => {
            setShowEditWizard(false);
            setSelectedTenantId(null);
          }}
          onSubmit={handleUpdateTenant}
          mode="edit"
          initialData={tenants.find(t => t.id === selectedTenantId)}
        />
      )}
    </div>
  );
}