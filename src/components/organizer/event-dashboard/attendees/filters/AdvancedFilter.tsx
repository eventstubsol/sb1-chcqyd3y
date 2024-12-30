import React, { useState } from 'react';
import { Filter, Save, Plus, Trash2, Search } from 'lucide-react';
import { AnimatedCard } from '../../../../common';

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

interface FilterPreset {
  id: string;
  name: string;
  conditions: FilterCondition[];
}

interface AdvancedFilterProps {
  onFilter: (conditions: FilterCondition[]) => void;
}

const FIELD_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'ticketType', label: 'Ticket Type' },
  { value: 'purchaseDate', label: 'Purchase Date' },
  { value: 'status', label: 'Status' },
  { value: 'checkedIn', label: 'Check-in Status' },
  { value: 'company', label: 'Company' },
  { value: 'jobTitle', label: 'Job Title' }
];

const OPERATOR_OPTIONS = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'startsWith', label: 'Starts with' },
  { value: 'endsWith', label: 'Ends with' },
  { value: 'greaterThan', label: 'Greater than' },
  { value: 'lessThan', label: 'Less than' }
];

export default function AdvancedFilter({ onFilter }: AdvancedFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { id: '1', field: 'name', operator: 'contains', value: '' }
  ]);
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [presetName, setPresetName] = useState('');

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        field: 'name',
        operator: 'contains',
        value: '',
        logic: 'AND'
      }
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setConditions(conditions.map(condition =>
      condition.id === id ? { ...condition, ...updates } : condition
    ));
  };

  const savePreset = () => {
    if (!presetName) return;
    
    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      conditions: [...conditions]
    };
    
    setPresets([...presets, newPreset]);
    setPresetName('');
  };

  const loadPreset = (preset: FilterPreset) => {
    setConditions([...preset.conditions]);
  };

  const applyFilter = () => {
    onFilter(conditions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <Filter className="h-5 w-5 mr-2" />
          Advanced Filters
        </button>
        {conditions.length > 0 && (
          <button
            onClick={applyFilter}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Apply Filters
          </button>
        )}
      </div>

      {isExpanded && (
        <AnimatedCard>
          <div className="space-y-4">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="flex items-center gap-4">
                {index > 0 && (
                  <select
                    value={condition.logic}
                    onChange={(e) => updateCondition(condition.id, { logic: e.target.value as 'AND' | 'OR' })}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}

                <select
                  value={condition.field}
                  onChange={(e) => updateCondition(condition.id, { field: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {FIELD_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(condition.id, { operator: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {OPERATOR_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={condition.value}
                  onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Value"
                />

                <button
                  onClick={() => removeCondition(condition.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t">
              <button
                onClick={addCondition}
                className="flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Condition
              </button>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Preset name"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  onClick={savePreset}
                  disabled={!presetName}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Preset
                </button>
              </div>
            </div>

            {presets.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Saved Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {presets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => loadPreset(preset)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}