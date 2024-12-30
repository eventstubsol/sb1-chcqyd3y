<command>
const [activeTab, setActiveTab] = React.useState('basic');
const [showEditModal, setShowEditModal] = React.useState(false);

// In the header section, replace the pencil icon with a button:
<div className="flex items-center space-x-3">
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    tenant.status === 'active' 
      ? 'bg-green-100 text-green-800'
      : tenant.status === 'suspended'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'
  }`}>
    {tenant.status}
  </span>
  <button
    onClick={() => setShowEditModal(true)}
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
  >
    <Pencil className="h-5 w-5" />
    <span>Edit</span>
  </button>
</div>
</command>