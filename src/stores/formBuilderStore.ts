import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { persist } from 'zustand/middleware';

export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 
  'checkbox' | 'radio' | 'array' | 'object' | 'date' | 'time' | 'file';

export interface ValidationRule {
  type: 'required' | 'pattern' | 'minLength' | 'maxLength' | 'min' | 'max' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any, formData: any) => boolean | Promise<boolean>;
}

export interface Condition {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  defaultValue?: any;
  validation?: ValidationRule[];
  conditions?: Condition[];
  dependsOn?: string[];
  isArray?: boolean;
  arrayConfig?: {
    minItems?: number;
    maxItems?: number;
    itemField: Omit<FormField, 'id'>;
  };
  i18n?: {
    label?: Record<string, string>;
    placeholder?: Record<string, string>;
    errorMessages?: Record<string, Record<string, string>>;
  };
  step?: number; // For wizard forms
  hidden?: boolean;
}

export interface FormStep {
  id: string;
  title: string;
  fields: string[]; // Field IDs
  validation?: (formData: any) => boolean | Promise<boolean>;
}

interface FormBuilderState {
  fields: FormField[];
  steps: FormStep[];
  selectedFieldId: string | null;
  currentStep: number;
  formData: Record<string, any>;
  errors: Record<string, string>;
  apiErrors: Record<string, string>;
  isDirty: boolean;
  lastSaved: Date | null;
  language: string;

  // Actions
  addField: (field: Omit<FormField, 'id'>) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  duplicateField: (id: string) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  setSelectedFieldId: (id: string | null) => void;
  clearForm: () => void;
  
  // Wizard actions
  addStep: (step: Omit<FormStep, 'id'>) => void;
  removeStep: (id: string) => void;
  updateStep: (id: string, updates: Partial<FormStep>) => void;
  setCurrentStep: (step: number) => void;
  
  // Form data and validation
  setFormData: (data: Record<string, any>) => void;
  updateFormData: (field: string, value: any) => void;
  validateField: (fieldId: string) => Promise<boolean>;
  validateStep: (stepId: string) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  setFieldError: (fieldId: string, error: string | null) => void;
  setApiError: (fieldId: string, error: string | null) => void;
  clearErrors: () => void;
  
  // Auto-save
  saveForm: () => Promise<void>;
  setIsDirty: (dirty: boolean) => void;
  
  // i18n
  setLanguage: (lang: string) => void;
}

export const useFormBuilderStore = create<FormBuilderState>()(
  persist(
    (set, get) => ({
      fields: [],
      steps: [],
      selectedFieldId: null,
      currentStep: 0,
      formData: {},
      errors: {},
      apiErrors: {},
      isDirty: false,
      lastSaved: null,
      language: 'en',

      addField: (field) =>
        set((state) => ({
          fields: [...state.fields, { ...field, id: nanoid() }],
          isDirty: true,
        })),

      removeField: (id) =>
        set((state) => ({
          fields: state.fields.filter((field) => field.id !== id),
          selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
          isDirty: true,
        })),

      updateField: (id, updates) =>
        set((state) => ({
          fields: state.fields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
          ),
          isDirty: true,
        })),

      duplicateField: (id) =>
        set((state) => {
          const fieldToDuplicate = state.fields.find((field) => field.id === id);
          if (!fieldToDuplicate) return state;

          const duplicatedField = {
            ...fieldToDuplicate,
            id: nanoid(),
            label: `${fieldToDuplicate.label} (Copy)`,
            name: `${fieldToDuplicate.name}_copy`,
          };

          return {
            fields: [...state.fields, duplicatedField],
            isDirty: true,
          };
        }),

      reorderFields: (startIndex, endIndex) =>
        set((state) => {
          const fields = [...state.fields];
          const [removed] = fields.splice(startIndex, 1);
          fields.splice(endIndex, 0, removed);
          return { fields, isDirty: true };
        }),

      setSelectedFieldId: (id) =>
        set(() => ({
          selectedFieldId: id,
        })),

      clearForm: () =>
        set(() => ({
          fields: [],
          steps: [],
          selectedFieldId: null,
          currentStep: 0,
          formData: {},
          errors: {},
          apiErrors: {},
          isDirty: false,
          lastSaved: null,
        })),

      // Wizard functionality
      addStep: (step) =>
        set((state) => ({
          steps: [...state.steps, { ...step, id: nanoid() }],
          isDirty: true,
        })),

      removeStep: (id) =>
        set((state) => ({
          steps: state.steps.filter((step) => step.id !== id),
          isDirty: true,
        })),

      updateStep: (id, updates) =>
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === id ? { ...step, ...updates } : step
          ),
          isDirty: true,
        })),

      setCurrentStep: (step) =>
        set(() => ({
          currentStep: step,
        })),

      // Form data and validation
      setFormData: (data) =>
        set(() => ({
          formData: data,
          isDirty: true,
        })),

      updateFormData: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
          isDirty: true,
        })),

      validateField: async (fieldId) => {
        const state = get();
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field || !field.validation) return true;

        let isValid = true;
        let errorMessage = '';

        for (const rule of field.validation) {
          const value = state.formData[field.name];

          switch (rule.type) {
            case 'required':
              isValid = value !== undefined && value !== '';
              errorMessage = rule.message || 'This field is required';
              break;
            case 'pattern':
              if (value && rule.value) {
                const regex = new RegExp(rule.value);
                isValid = regex.test(value);
                errorMessage = rule.message || 'Invalid format';
              }
              break;
            case 'custom':
              if (rule.validator) {
                isValid = await rule.validator(value, state.formData);
                errorMessage = rule.message || 'Validation failed';
              }
              break;
          }

          if (!isValid) break;
        }

        set((state) => ({
          errors: {
            ...state.errors,
            [fieldId]: isValid ? '' : errorMessage,
          },
        }));

        return isValid;
      },

      validateStep: async (stepId) => {
        const state = get();
        const step = state.steps.find((s) => s.id === stepId);
        if (!step) return true;

        const results = await Promise.all(
          step.fields.map((fieldId) => state.validateField(fieldId))
        );

        if (step.validation) {
          return results.every(Boolean) && await step.validation(state.formData);
        }

        return results.every(Boolean);
      },

      validateForm: async () => {
        const state = get();
        const results = await Promise.all(
          state.fields.map((field) => state.validateField(field.id))
        );
        return results.every(Boolean);
      },

      setFieldError: (fieldId, error) =>
        set((state) => ({
          errors: {
            ...state.errors,
            [fieldId]: error || '',
          },
        })),

      setApiError: (fieldId, error) =>
        set((state) => ({
          apiErrors: {
            ...state.apiErrors,
            [fieldId]: error || '',
          },
        })),

      clearErrors: () =>
        set(() => ({
          errors: {},
          apiErrors: {},
        })),

      // Auto-save functionality
      saveForm: async () => {
        const state = get();
        if (!state.isDirty) return;

        // Implement your save logic here
        // For now, just update the lastSaved timestamp
        set(() => ({
          lastSaved: new Date(),
          isDirty: false,
        }));
      },

      setIsDirty: (dirty) =>
        set(() => ({
          isDirty: dirty,
        })),

      // i18n support
      setLanguage: (lang) =>
        set(() => ({
          language: lang,
        })),
    }),
    {
      name: 'form-builder-storage',
      partialize: (state) => ({
        fields: state.fields,
        steps: state.steps,
        formData: state.formData,
        language: state.language,
      }),
    }
  )
);