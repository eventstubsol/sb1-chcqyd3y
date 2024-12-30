import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WizardFormTest } from './WizardFormTest';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';

describe('WizardFormTest', () => {
  beforeEach(() => {
    const store = useFormBuilderStore.getState();
    store.clearForm();
  });

  test('renders first step initially', () => {
    render(<WizardFormTest />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  test('validates required fields before proceeding', async () => {
    render(<WizardFormTest />);
    
    // Try to proceed without filling required fields
    fireEvent.click(screen.getByText('Next'));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('proceeds to next step when validation passes', async () => {
    render(<WizardFormTest />);
    
    // Fill out first step
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    
    fireEvent.click(screen.getByText('Next'));
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
    });
  });

  test('completes full wizard flow', async () => {
    render(<WizardFormTest />);
    
    // Step 1
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' }
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'Springfield' }
      });
      fireEvent.change(screen.getByLabelText(/ZIP Code/i), {
        target: { value: '12345' }
      });
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Step 3
    await waitFor(() => {
      expect(screen.getByText(/Review Your Information/i)).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText(/I agree to the terms/i));
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      const store = useFormBuilderStore.getState();
      expect(store.formData).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        street: '123 Main St',
        city: 'Springfield',
        zipCode: '12345',
        terms: true
      });
    });
  });
});