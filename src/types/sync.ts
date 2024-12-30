export interface SyncOptions {
  merge?: boolean;
  batch?: boolean;
  timestamp?: boolean;
}

export interface SyncResult {
  success: boolean;
  error?: Error;
  timestamp?: Date;
}

export interface SyncState {
  loading: boolean;
  error: Error | null;
  lastSync?: Date;
}