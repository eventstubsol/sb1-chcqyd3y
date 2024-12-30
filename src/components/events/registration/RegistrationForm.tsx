import React, { useState } from 'react';
import { FormInput, FormSelect } from '../../common';
import { Plus, Minus, DragHandle, Save } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'radio';
  label: string;
  required: boolean;
  options?: string[];
  conditional?: {
    field: string;
    value: string;
  };
}

interface RegistrationFormProps {
  onSave: (fields: FormField[]) => void;
  initialFields?: FormField[];
}

export default function RegistrationForm({ onSave, initialFields = [] }: RegistrationFormProps) {
  const [fields, setFields] = useState<FormField[]>(initialFields);

  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: '',
      required: false
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Registration Form Builder</h3>
        <button
          onClick={() => onSave(fields)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Form
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move text-gray-400 hover:text-gray-600"
                        >
                          <DragHandle className="h-5 w-5" />
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput
                            label="Field Label"
                            value={field.label}
                            onChange={(value) => updateField(field.id, { label: value })}
                            required
                          />

                          <FormSelect
                            label="Field Type"
                            value={field.type}
                            onChange={(value) => updateField(field.id, { 
                              type: value as FormField['type'],
                              options: value === 'select' || value === 'radio' ? [''] : undefined
                            })}
                            options={[
                              { value: 'text', label: 'Text' },
                              { value: 'email', label: 'Email' },
                              { value: 'tel', label: 'Phone' },
                              { value: 'select', label: 'Dropdown' },
                              { value: 'checkbox', label: 'Checkbox' },
                              { value: 'radio', label: 'Radio' }
                            ]}
                          />

                          {(field.type === 'select' || field.type === 'radio') && (
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Options
                              </label>
                              <div className="space-y-2">
                                {field.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...(field.options || [])];
                                        newOptions[optionIndex] = e.target.value;
                                        updateField(field.id, { options: newOptions });
                                      }}
                                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <button
                                      onClick={() => {
                                        const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                                        updateField(field.id, { options: newOptions });
                                      }}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Minus className="h-5 w-5" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    const newOptions = [...(field.options || []), ''];
                                    updateField(field.id, { options: newOptions });
                                  }}
                                  className="flex items-center text-indigo-600 hover:text-indigo-700"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Option
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="col-span-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-600">Required field</span>
                            </label>
                          </div>
                        </div>

                        <button
                          onClick={() => removeField(field.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={addField}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Field
      </button>
    </div>
  );
}