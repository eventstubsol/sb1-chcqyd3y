import { useState, useCallback } from 'react';
import { ChartData } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

export function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ChartData[]>([]);
  const { showToast } = useToast();

  const fetchAnalytics = useCallback(async (timeRange: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: ChartData[] = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 700 }
      ];
      
      setData(mockData);
    } catch (error) {
      showToast('error', 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    data,
    fetchAnalytics
  };
}