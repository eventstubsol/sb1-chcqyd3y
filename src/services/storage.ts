import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `${bucket}/${path}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteFile(
  bucket: string,
  path: string
): Promise<void> {
  const storageRef = ref(storage, `${bucket}/${path}`);
  await deleteObject(storageRef);
}

export async function listFiles(
  bucket: string,
  path: string = ''
): Promise<string[]> {
  const storageRef = ref(storage, `${bucket}/${path}`);
  const result = await listAll(storageRef);
  const urls = await Promise.all(
    result.items.map(item => getDownloadURL(item))
  );
  return urls;
}

export async function getFileUrl(
  bucket: string,
  path: string
): Promise<string> {
  const storageRef = ref(storage, `${bucket}/${path}`);
  return getDownloadURL(storageRef);
}