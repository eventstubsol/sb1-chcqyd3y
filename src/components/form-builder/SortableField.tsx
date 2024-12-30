import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField, useFormBuilderStore } from "../../stores/formBuilderStore";
import { Pencil, Copy, Trash, GripVertical } from "lucide-react";

interface SortableFieldProps {
  id: string;
  field: FormField;
  index: number;
}

export function SortableField({ id, field, index }: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const { updateField, removeField, duplicateField, setSelectedFieldId } = useFormBuilderStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFieldContent = () => {
    switch (field.type) {
      case "select":
        return (
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            {field.options?.map((option, idx) => (
              <option key={`${field.id}-option-${idx}`}>{option}</option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={field.placeholder}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={`${field.id}-radio-${idx}`} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-1 hover:bg-gray-100 rounded mr-2"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setSelectedFieldId(id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => duplicateField(id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => removeField(id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      {renderFieldContent()}
    </div>
  );
}