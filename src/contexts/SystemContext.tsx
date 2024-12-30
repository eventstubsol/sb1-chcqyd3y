import React, { createContext, useContext, useState, useEffect } from 'react';
import { SystemHealth, AIInsight, FeatureFlag } from '../types';

interface SystemContextType {
  health: SystemHealth;
  insights: AIInsight[];
  featureFlags: FeatureFlag[];
  updateHealth: (health: SystemHealth) => void;
  addInsight: (insight: AIInsight) => void;
  toggleFeatureFlag: (flagId: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [health, setHealth] = useState<SystemHealth>({
    cpu: 0,
    memory: 0,
    disk: 0,
    status: 'healthy',
    lastUpdated: new Date().toISOString()
  });

  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);

  // Simulate system health monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(prev => ({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        status: prev.status,
        lastUpdated: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateHealth = (newHealth: SystemHealth) => {
    setHealth(newHealth);
  };

  const addInsight = (insight: AIInsight) => {
    setInsights(prev => [...prev, insight]);
  };

  const toggleFeatureFlag = (flagId: string) => {
    setFeatureFlags(prev =>
      prev.map(flag =>
        flag.id === flagId
          ? { ...flag, enabled: !flag.enabled }
          : flag
      )
    );
  };

  return (
    <SystemContext.Provider
      value={{
        health,
        insights,
        featureFlags,
        updateHealth,
        addInsight,
        toggleFeatureFlag
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}