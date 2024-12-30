import { 
  collection, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTIONS } from './schema';

// Generic CRUD operations
export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const docRef = doc(collection(db, collectionName));
  const timestamp = serverTimestamp();
  
  await setDoc(docRef, {
    ...data,
    id: docRef.id,
    createdAt: timestamp,
    updatedAt: timestamp
  });

  return docRef.id;
};

export const getDocument = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteDocument = async (
  collectionName: string,
  id: string
) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const queryDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as T);
};

// Collection-specific queries
export const getEventsByOrganization = async (organizationId: string) => {
  return queryDocuments(COLLECTIONS.EVENTS, [
    where('organizationId', '==', organizationId),
    orderBy('startDate', 'desc')
  ]);
};

export const getAttendeesByEvent = async (eventId: string) => {
  return queryDocuments(COLLECTIONS.ATTENDEES, [
    where('eventId', '==', eventId),
    orderBy('createdAt', 'desc')
  ]);
};

export const getGroupsByEvent = async (eventId: string) => {
  return queryDocuments(COLLECTIONS.GROUPS, [
    where('eventId', '==', eventId),
    orderBy('createdAt', 'desc')
  ]);
};

export const getTicketsByAttendee = async (attendeeId: string) => {
  return queryDocuments(COLLECTIONS.TICKETS, [
    where('attendeeId', '==', attendeeId),
    orderBy('createdAt', 'desc')
  ]);
};