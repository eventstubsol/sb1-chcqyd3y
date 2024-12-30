import { 
  TextIcon, 
  Mail, 
  Phone, 
  List, 
  CheckSquare, 
  Circle, 
  Calendar, 
  FileText, 
  Upload,
  Hash,
  Link,
  Globe,
  CreditCard,
  MessageSquare,
  LucideIcon
} from 'lucide-react';

interface FormElement {
  type: string;
  label: string;
  icon: LucideIcon;
  placeholder?: string;
  options?: string[];
}

export const FORM_ELEMENTS: FormElement[] = [
  {
    type: 'text',
    label: 'Text Input',
    icon: TextIcon,
    placeholder: 'Enter text...'
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    placeholder: 'Enter email address...'
  },
  {
    type: 'tel',
    label: 'Phone',
    icon: Phone,
    placeholder: 'Enter phone number...'
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: List,
    options: ['Option 1', 'Option 2', 'Option 3']
  },
  {
    type: 'checkbox',
    label: 'Checkbox Group',
    icon: CheckSquare,
    options: ['Option 1', 'Option 2', 'Option 3']
  },
  {
    type: 'radio',
    label: 'Radio Group',
    icon: Circle,
    options: ['Option 1', 'Option 2', 'Option 3']
  },
  {
    type: 'date',
    label: 'Date Picker',
    icon: Calendar
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: FileText,
    placeholder: 'Enter long text...'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: Upload
  },
  {
    type: 'number',
    label: 'Number',
    icon: Hash,
    placeholder: 'Enter number...'
  },
  {
    type: 'url',
    label: 'URL',
    icon: Link,
    placeholder: 'Enter URL...'
  },
  {
    type: 'country',
    label: 'Country',
    icon: Globe,
    placeholder: 'Select country...'
  },
  {
    type: 'payment',
    label: 'Payment',
    icon: CreditCard
  },
  {
    type: 'comment',
    label: 'Comment Box',
    icon: MessageSquare,
    placeholder: 'Enter comment...'
  }
];