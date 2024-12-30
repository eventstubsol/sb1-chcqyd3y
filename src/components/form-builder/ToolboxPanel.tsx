import React from "react";
import { Plus } from "lucide-react";

interface ToolboxPanelProps {
  onAddField: (type: string, label: string) => void;
}

export function ToolboxPanel({ onAddField }: ToolboxPanelProps) {
  const fields = [
    { type: "name", label: "Name", description: "Name input field" },
    { type: "email", label: "Email", description: "Email input with validation" },
    { type: "phone", label: "Phone Number", description: "Phone number input field" },
    { type: "address", label: "Address", description: "Address input field" },
    { type: "text", label: "Text Input", description: "Single line text input" },
    { type: "textarea", label: "Text Area", description: "Multi-line text input" },
    { type: "number", label: "Number", description: "Numeric input field" },
    { type: "dropdown", label: "Dropdown", description: "Single select dropdown" },
    { type: "checkbox", label: "Checkbox", description: "Single or multiple checkboxes" },
    { type: "radio", label: "Radio Group", description: "Radio button group" },
    { type: "date", label: "Date Picker", description: "Date selection field" },
    { type: "time", label: "Time Picker", description: "Time selection field" },
    { type: "file", label: "File Upload", description: "File upload field" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Form Elements</h2>
      <div className="space-y-2">
        {fields.map((field) => (
          <button
            key={field.type}
            onClick={() => onAddField(field.type, field.label)}
            className="w-full flex items-center justify-between p-2 text-left border border-gray-200 rounded-md hover:bg-gray-50 group"
          >
            <div>
              <div className="font-medium text-gray-700">{field.label}</div>
              <div className="text-sm text-gray-500">{field.description}</div>
            </div>
            <Plus 
              size={18} 
              className="text-gray-400 group-hover:text-indigo-600"
            />
          </button>
        ))}
      </div>
    </div>
  );
}