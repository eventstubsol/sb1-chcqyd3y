import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for insights
const mockInsightData = {
  userEngagement: [
    { date: '2024-01', score: 75 },
    { date: '2024-02', score: 82 },
    { date: '2024-03', score: 78 },
    { date: '2024-04', score: 85 },
    { date: '2024-05', score: 90 }
  ],
  recommendations: [
    {
      id: 1,
      type: 'engagement',
      title: 'Increase in User Activity',
      description: 'User engagement has increased by 15% in the last month.',
      impact: 'high',
      action: 'Consider expanding server capacity during peak hours.'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Potential Churn Risk',
      description: '3 enterprise clients showing decreased usage patterns.',
      impact: 'high',
      action: 'Schedule check-in calls with identified clients.'
    },
    {
      id: 3,
      type: 'optimization',
      title: 'Feature Adoption Opportunity',
      description: 'Only 40% of users utilizing new analytics dashboard.',
      impact: 'medium',
      action: 'Create targeted tutorial campaign for analytics features.'
    }
  ]
};

const AiInsightsTab: React.FC = () => {
  const [insights, setInsights] = useState(mockInsightData);
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  useEffect(() => {
    // In a real implementation, this would fetch data from your AI service
    // For now, we're using mock data
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'engagement':
        return <Users className="h-6 w-6 text-blue-500" />;
      case 'risk':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <TrendingUp className="h-6 w-6 text-green-500" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            AI Insights Dashboard
          </h2>
          <p className="mt-1 text-gray-600">
            AI-powered analytics and recommendations for platform optimization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={insights.userEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            {insights.recommendations.map((recommendation) => (
              <div 
                key={recommendation.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getIconForType(recommendation.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">
                      {recommendation.title}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {recommendation.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-sm font-medium ${getImpactColor(recommendation.impact)}`}>
                        {recommendation.impact.toUpperCase()} Impact
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Take Action →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Churn Risk</span>
              <span className="text-sm text-red-600">4.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '4.2%' }}></div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Growth Prediction</span>
              <span className="text-sm text-green-600">+15.8%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '15.8%' }}></div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Feature Adoption</span>
              <span className="text-sm text-blue-600">72.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsightsTab;