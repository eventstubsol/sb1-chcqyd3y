# Form Builder Module Documentation

## File Structure

```
src/components/form-builder/
├── FormBuilder.tsx              # Main form builder component
├── BuilderCanvas.tsx           # Canvas for form elements
├── ToolboxPanel.tsx            # Panel with available field types
├── PropertiesPanel.tsx         # Field properties editor
├── SortableField.tsx          # Draggable field component
├── ElementToolbox.tsx         # Field type selection toolbox
├── FormPreview.tsx            # Live form preview
├── FieldWrapper.tsx           # Field container component
├── SortableWrapper.tsx        # DnD wrapper component
├── constants.ts               # Constants and configurations
├── fields/                    # Form field components
│   ├── index.ts
│   ├── TextField.tsx
│   ├── EmailField.tsx
│   ├── PhoneField.tsx
│   ├── DateField.tsx
│   ├── CheckboxField.tsx
│   ├── SelectField.tsx
│   ├── TextAreaField.tsx
│   ├── NumberField.tsx
│   ├── FileUploadField.tsx
│   ├── ImageUploadField.tsx
│   ├── RadioField.tsx
│   ├── MultipleChoiceField.tsx
│   ├── AddressField.tsx
│   ├── CountryField.tsx
│   ├── DateTimeField.tsx
│   ├── DropdownField.tsx
│   ├── HtmlField.tsx
│   ├── NameField.tsx
│   └── UrlField.tsx
├── hooks/                     # Custom hooks
│   └── useFormBuilder.ts
└── types.ts                   # Type definitions
```

## Implementation

### src/components/form-builder/FormBuilder.tsx
```tsx
import React from 'react';
import BuilderCanvas from './BuilderCanvas';
import ToolboxPanel from './ToolboxPanel';
import PropertiesPanel from './PropertiesPanel';
import { useFormBuilder } from './hooks/useFormBuilder';

export default function FormBuilder() {
  const {
    fields,
    selectedField,
    addField,
    updateField,
    removeField,
    moveField,
    selectField,
  } = useFormBuilder();

  return (
    <div className="flex h-full bg-gray-50">
      <div className="w-[30%] border-r border-gray-200 bg-white">
        <ToolboxPanel onAddField={addField} />
      </div>
      
      <div className="w-[50%] p-4">
        <BuilderCanvas
          fields={fields}
          selectedField={selectedField}
          onSelect={selectField}
          onMove={moveField}
          onRemove={removeField}
        />
      </div>
      
      <div className="w-[20%] border-l border-gray-200 bg-white">
        <PropertiesPanel
          field={selectedField}
          onUpdate={updateField}
        />
      </div>
    </div>
  );
}
```

[Continue with all other files...]

Would you like me to continue with the complete implementation of all rem