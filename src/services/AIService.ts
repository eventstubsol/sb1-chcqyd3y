export class AIService {
  async predictChurnRisk(tenantData: any): Promise<number> {
    // Simplified risk calculation based on activity metrics
    const {
      lastLoginDays = 30,
      eventAttendance = 0,
      ticketPurchases = 0,
      supportTickets = 0
    } = tenantData;

    let risk = 0;
    
    // Increase risk for longer periods without login
    risk += Math.min(lastLoginDays / 30, 1) * 0.4;
    
    // Decrease risk for active event participation
    risk -= Math.min(eventAttendance / 5, 1) * 0.2;
    
    // Decrease risk for recent ticket purchases
    risk -= Math.min(ticketPurchases / 3, 1) * 0.2;
    
    // Increase risk for high number of support tickets
    risk += Math.min(supportTickets / 5, 1) * 0.2;

    // Ensure risk is between 0 and 1
    return Math.max(0, Math.min(1, risk));
  }

  async analyzeEngagement(activityData: any[]): Promise<{
    score: number;
    trends: any[];
    recommendations: string[];
  }> {
    const score = activityData.reduce((acc, activity) => {
      // Calculate engagement score based on activity type and recency
      const baseScore = activity.type === 'purchase' ? 2 :
                       activity.type === 'attendance' ? 1.5 :
                       activity.type === 'login' ? 1 : 0.5;
      
      const daysAgo = (Date.now() - new Date(activity.timestamp).getTime()) / (1000 * 60 * 60 * 24);
      const recencyMultiplier = Math.max(0.1, 1 - (daysAgo / 30));
      
      return acc + (baseScore * recencyMultiplier);
    }, 0) / Math.max(1, activityData.length);

    const trends = this.calculateTrends(activityData);
    const recommendations = this.generateRecommendations(score, trends);

    return {
      score: Math.min(1, score),
      trends,
      recommendations
    };
  }

  async detectAnomalies(metrics: any[]): Promise<{
    anomalies: any[];
    severity: 'low' | 'medium' | 'high';
  }> {
    const anomalies = [];
    let maxDeviation = 0;

    // Simple anomaly detection using standard deviation
    for (let i = 1; i < metrics.length; i++) {
      const current = metrics[i].value;
      const previous = metrics[i - 1].value;
      const change = Math.abs((current - previous) / previous);

      if (change > 0.5) { // 50% change threshold
        anomalies.push({
          metric: metrics[i].name,
          timestamp: metrics[i].timestamp,
          value: current,
          previousValue: previous,
          changePercent: change * 100
        });
        maxDeviation = Math.max(maxDeviation, change);
      }
    }

    const severity = maxDeviation > 1 ? 'high' :
                    maxDeviation > 0.7 ? 'medium' : 'low';

    return { anomalies, severity };
  }

  private calculateTrends(activityData: any[]): any[] {
    // Group activities by type and calculate trends
    const groupedActivities = activityData.reduce((acc, activity) => {
      acc[activity.type] = acc[activity.type] || [];
      acc[activity.type].push(activity);
      return acc;
    }, {});

    return Object.entries(groupedActivities).map(([type, activities]: [string, any[]]) => {
      const recentCount = activities.filter(a => 
        (Date.now() - new Date(a.timestamp).getTime()) < 7 * 24 * 60 * 60 * 1000
      ).length;

      const olderCount = activities.filter(a =>
        (Date.now() - new Date(a.timestamp).getTime()) >= 7 * 24 * 60 * 60 * 1000
      ).length;

      const trend = recentCount > olderCount ? 'increasing' :
                   recentCount < olderCount ? 'decreasing' : 'stable';

      return { type, trend, recentCount, olderCount };
    });
  }

  private generateRecommendations(score: number, trends: any[]): string[] {
    const recommendations = [];

    if (score < 0.3) {
      recommendations.push('Consider implementing a re-engagement campaign');
      recommendations.push('Review and improve onboarding process');
    } else if (score < 0.7) {
      recommendations.push('Focus on increasing user participation in events');
      recommendations.push('Analyze most popular features and promote them');
    } else {
      recommendations.push('Implement loyalty rewards program');
      recommendations.push('Gather testimonials from highly engaged users');
    }

    trends.forEach(trend => {
      if (trend.trend === 'decreasing') {
        recommendations.push(`Investigate decrease in ${trend.type} activity`);
      }
    });

    return recommendations;
  }
}

export const aiService = new AIService();