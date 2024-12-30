import { useState, useCallback } from 'react';
import { SyncService } from '../services/syncService';
import { useToast } from '../contexts/ToastContext';

const syncService = new SyncService();

export function useSync(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const syncDocument = useCallback(async (documentId: string, data: any) => {
    setLoading(true);
    try {
      await syncService.syncDocument(collectionName, documentId, data);
      showToast('success', 'Changes saved successfully');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [collectionName, showToast]);

  const syncBulk = useCallback(async (documents: any[]) => {
    setLoading(true);
    try {
      await syncService.syncCollection(collectionName, documents);
      showToast('success', 'Bulk sync completed successfully');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [collectionName, showToast]);

  const deleteDocument = useCallback(async (documentId: string) => {
    setLoading(true);
    try {
      await syncService.deleteDocument(collectionName, documentId);
      showToast('success', 'Document deleted successfully');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [collectionName, showToast]);

  const deleteBulk = useCallback(async (documentIds: string[]) => {
    setLoading(true);
    try {
      await syncService.deleteCollection(collectionName, documentIds);
      showToast('success', 'Bulk delete completed successfully');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [collectionName, showToast]);

  return {
    loading,
    syncDocument,
    syncBulk,
    deleteDocument,
    deleteBulk
  };
}