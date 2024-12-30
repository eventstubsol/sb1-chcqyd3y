import { ChartData } from '../../../types';

class AnalyticsService {
  async getMetrics(timeRange: string): Promise<ChartData[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 600 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 700 }
    ];
  }

  async exportMetrics(format: 'csv' | 'pdf'): Promise<Blob> {
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = 'Month,Value\nJan,400\nFeb,300\nMar,600\nApr,800\nMay,700';
    return new Blob([data], { type: 'text/csv' });
  }
}

export const analyticsService = new AnalyticsService();