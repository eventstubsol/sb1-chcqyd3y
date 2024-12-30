import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export class SyncService {
  async syncDocument(
    collectionName: string,
    documentId: string,
    data: DocumentData
  ): Promise<void> {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, { ...data, updatedAt: new Date() }, { merge: true });
  }

  async syncCollection(
    collectionName: string,
    documents: { id: string; [key: string]: any }[]
  ): Promise<void> {
    const batch = writeBatch(db);
    const timestamp = new Date();

    documents.forEach(doc => {
      const docRef = doc.id 
        ? doc(db, collectionName, doc.id)
        : doc(collection(db, collectionName));
      
      batch.set(docRef, { ...doc, updatedAt: timestamp }, { merge: true });
    });

    await batch.commit();
  }

  async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  }

  async deleteCollection(
    collectionName: string,
    documentIds: string[]
  ): Promise<void> {
    const batch = writeBatch(db);

    documentIds.forEach(id => {
      const docRef = doc(db, collectionName, id);
      batch.delete(docRef);
    });

    await batch.commit();
  }
}