import { 
  RegistrationForm, 
  FormField, 
  RegistrationSubmission,
  PaymentConfig,
  DiscountCode 
} from '../types/registration';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';

class RegistrationService {
  private readonly FORMS_COLLECTION = 'registration_forms';
  private readonly SUBMISSIONS_COLLECTION = 'registration_submissions';
  private readonly DISCOUNT_CODES_COLLECTION = 'discount_codes';

  async createForm(form: Omit<RegistrationForm, 'id'>): Promise<RegistrationForm> {
    const formRef = doc(collection(db, this.FORMS_COLLECTION));
    const newForm: RegistrationForm = {
      ...form,
      id: formRef.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await setDoc(formRef, newForm);
    return newForm;
  }

  async updateForm(id: string, updates: Partial<RegistrationForm>): Promise<RegistrationForm> {
    const formRef = doc(db, this.FORMS_COLLECTION, id);
    const updatedForm = {
      ...updates,
      updatedAt: new Date()
    };
    await updateDoc(formRef, updatedForm);
    return { ...updatedForm, id } as RegistrationForm;
  }

  async deleteForm(id: string): Promise<void> {
    await deleteDoc(doc(db, this.FORMS_COLLECTION, id));
  }

  async getForms(eventId: string): Promise<RegistrationForm[]> {
    const q = query(
      collection(db, this.FORMS_COLLECTION),
      where('eventId', '==', eventId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as RegistrationForm);
  }

  async validateDiscountCode(code: string, ticketType: string): Promise<DiscountCode | null> {
    const q = query(
      collection(db, this.DISCOUNT_CODES_COLLECTION),
      where('code', '==', code)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const discountCode = snapshot.docs[0].data() as DiscountCode;
    const now = new Date();

    if (
      now < discountCode.validFrom ||
      now > discountCode.validUntil ||
      (discountCode.maxUses && discountCode.currentUses >= discountCode.maxUses) ||
      (discountCode.ticketTypes && !discountCode.ticketTypes.includes(ticketType))
    ) {
      return null;
    }

    return discountCode;
  }

  async submitRegistration(submission: Omit<RegistrationSubmission, 'id'>): Promise<RegistrationSubmission> {
    const submissionRef = doc(collection(db, this.SUBMISSIONS_COLLECTION));
    const newSubmission: RegistrationSubmission = {
      ...submission,
      id: submissionRef.id,
      createdAt: new Date()
    };
    await setDoc(submissionRef, newSubmission);
    return newSubmission;
  }

  getPaymentConfig(): PaymentConfig {
    return {
      currency: 'USD',
      acceptedMethods: ['card', 'paypal'],
      processingFee: 2.9,
      taxRate: 8.875
    };
  }
}

export const registrationService = new RegistrationService();