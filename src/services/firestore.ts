import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function getDocument<T = DocumentData>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

export async function getDocuments<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
}

export async function createDocument<T = DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function queryDocuments<T = DocumentData>(
  collectionName: string,
  conditions: {
    field: string;
    operator: '==' | '>' | '<' | '>=' | '<=';
    value: any;
  }[],
  orderByField?: string,
  orderDirection?: 'asc' | 'desc',
  limitTo?: number,
  startAfterDoc?: any
): Promise<T[]> {
  const constraints: QueryConstraint[] = conditions.map(
    ({ field, operator, value }) => where(field, operator, value)
  );

  if (orderByField) {
    constraints.push(orderBy(orderByField, orderDirection));
  }

  if (limitTo) {
    constraints.push(limit(limitTo));
  }

  if (startAfterDoc) {
    constraints.push(startAfter(startAfterDoc));
  }

  return getDocuments<T>(collectionName, constraints);
}