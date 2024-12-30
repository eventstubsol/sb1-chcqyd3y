import React, { useState } from 'react';
import { Eye, Save } from 'lucide-react';
import { ToolboxPanel } from './ToolboxPanel';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { FormPreview } from './FormPreview';

export function FormBuilder() {
  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddField = (type: string) => {
    const newField = {
      id: `${type}-${Date.now()}`,
      type,
      label: '',
      helpText: '',
      placeholder: '',
      required: false
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (id: string, updates: any) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
    setSelectedField(prev => prev?.id === id ? updates : prev);
  };

  const handleDuplicateField = (id: string) => {
    const fieldToDuplicate = fields.find(field => field.id === id);
    if (fieldToDuplicate) {
      const duplicatedField = {
        ...fieldToDuplicate,
        id: `${fieldToDuplicate.type}-${Date.now()}`,
        label: `${fieldToDuplicate.label} (Copy)`
      };
      setFields([...fields, duplicatedField]);
    }
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  };

  const handleSaveForm = () => {
    // Implement save functionality
    console.log('Form saved:', fields);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={() => setShowPreview(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Form
        </button>
        <button
          onClick={handleSaveForm}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Form
        </button>
      </div>

      <div className="flex flex-1 space-x-4">
        <div className="w-1/4">
          <ToolboxPanel onAddField={handleAddField} />
        </div>
        <div className="w-[55%]">
          <BuilderCanvas
            fields={fields}
            selectedField={selectedField}
            onSelectField={setSelectedField}
            onDuplicateField={handleDuplicateField}
            onDeleteField={handleDeleteField}
          />
        </div>
        <div className="w-1/5">
          <PropertiesPanel
            selectedField={selectedField}
            onUpdateField={handleUpdateField}
          />
        </div>
      </div>

      <FormPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        fields={fields}
      />
    </div>
  );
}