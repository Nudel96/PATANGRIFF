import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// Ensure authentication is checked at the layout level
	await parent();
	
	// Load dashboard-specific data
	const dashboardData = {
		quickStats: [
			{ label: 'Total Progress', value: '52%', icon: 'BarChart3', color: 'primary' },
			{ label: 'Trades Logged', value: '127', icon: 'FileText', color: 'secondary' },
			{ label: 'Win Rate', value: '73%', icon: 'Target', color: 'primary' },
			{ label: 'Days Active', value: '89', icon: 'Calendar', color: 'secondary' }
		],
		pillarsProgress: [
			{ name: 'Trading Mastery', progress: 75, color: 'primary' },
			{ name: 'Business Operations', progress: 45, color: 'secondary' },
			{ name: 'Capital Management', progress: 60, color: 'primary' },
			{ name: 'Trading Psychology', progress: 30, color: 'secondary' }
		],
		recentActivity: [
			{ action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course' },
			{ action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade' },
			{ action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session' },
			{ action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement' }
		]
	};

	return {
		dashboardData
	};
};