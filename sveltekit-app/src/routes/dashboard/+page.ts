import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Load dashboard data
  // In a real app, this would fetch from API
  
  const quickStats = [
    { label: 'Total Progress', value: '52%', icon: 'BarChart3', color: 'primary' },
    { label: 'Trades Logged', value: '127', icon: 'FileText', color: 'secondary' },
    { label: 'Win Rate', value: '73%', icon: 'Target', color: 'primary' },
    { label: 'Days Active', value: '89', icon: 'Calendar', color: 'secondary' }
  ];

  const recentActivity = [
    { action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course', icon: 'CheckCircle' },
    { action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade', icon: 'TrendingUp' },
    { action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session', icon: 'Video' },
    { action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement', icon: 'Award' }
  ];

  return {
    quickStats,
    recentActivity
  };
};