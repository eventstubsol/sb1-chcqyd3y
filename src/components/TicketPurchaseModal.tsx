import React, { useState } from 'react';
import { X, CreditCard, Ticket } from 'lucide-react';
import { Event } from '../types';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with a placeholder key - replace with your actual key in production
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface TicketPurchaseModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (quantity: number) => Promise<void>;
}

export default function TicketPurchaseModal({ event, isOpen, onClose, onPurchase }: TicketPurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  if (!isOpen) return null;

  const total = event.price * quantity;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'card') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load');

        // In a real implementation, you would:
        // 1. Call your backend to create a payment intent
        // 2. Use Stripe Elements for secure card input
        // 3. Handle the payment confirmation
        
        // For demo purposes, we'll just simulate a successful payment
        await new Promise(resolve => setTimeout(resolve, 1000));
        await onPurchase(quantity);
        onClose();
      } else {
        // PayPal integration would go here
        console.log('PayPal payment flow');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Purchase Tickets</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Tickets
            </label>
            <div className="mt-1 flex items-center">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border rounded-l-md hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={event.availableTickets}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(event.availableTickets, Math.max(1, parseInt(e.target.value))))}
                className="p-2 w-20 text-center border-y"
              />
              <button
                type="button"
                onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                className="px-3 py-2 border rounded-r-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <CreditCard className="h-6 w-6 mr-2" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <span className="font-bold text-blue-600">Pay</span>
                <span className="font-bold text-blue-800">Pal</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Price per ticket</span>
              <span>${event.price}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <CreditCard className="h-4 w-4" />
            <span>{loading ? 'Processing...' : `Pay $${total}`}</span>
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <Ticket className="h-4 w-4 mr-2" />
          <span>{event.availableTickets} tickets remaining</span>
        </div>
      </div>
    </div>
  );
}