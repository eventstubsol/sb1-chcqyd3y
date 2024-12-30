import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || '');

export class PaymentService {
  async createSubscription(customerId: string, priceId: string) {
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async generateInvoice(customerId: string, items: any[]) {
    return await stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
      collection_method: 'send_invoice',
      days_until_due: 30,
    });
  }

  async updateSubscription(subscriptionId: string, updates: any) {
    return await stripe.subscriptions.update(subscriptionId, updates);
  }

  async cancelSubscription(subscriptionId: string) {
    return await stripe.subscriptions.del(subscriptionId);
  }
}

export const paymentService = new PaymentService();