export interface User {
	id: string;
	username: string;
	displayName: string;
	avatar: string;
	title?: string;
	level: number;
	reputation: number;
	joinDate: Date;
	lastActive: Date;
	bio?: string;
	location?: string;
	tradingExperience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
	specialties: string[];
	achievements: Achievement[];
	stats: UserStats;
}

export interface UserStats {
	postsCount: number;
	likesReceived: number;
	likesGiven: number;
	squadsJoined: number;
	squadsLed: number;
	helpfulAnswers: number;
	tradingWins: number;
	tradingLosses: number;
}

export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
	unlockedAt: Date;
	progress?: number;
	maxProgress?: number;
}

export interface ForumCategory {
	id: string;
	name: string;
	description: string;
	icon: string;
	color: string;
	postCount: number;
	lastActivity: Date;
	isRestricted: boolean;
	requiredLevel?: number;
	moderatorIds: string[];
	subcategories?: ForumCategory[];
}

export interface ForumPost {
	id: string;
	title: string;
	content: string;
	authorId: string;
	author: User;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	likes: number;
	replies: number;
	views: number;
	isPinned: boolean;
	isFeatured: boolean;
	isLocked: boolean;
	tags: string[];
	attachments?: Attachment[];
	lastReplyAt?: Date;
	lastReplyBy?: string;
}

export interface ForumReply {
	id: string;
	postId: string;
	content: string;
	authorId: string;
	author: User;
	createdAt: Date;
	updatedAt: Date;
	likes: number;
	parentReplyId?: string;
	attachments?: Attachment[];
}

export interface Attachment {
	id: string;
	filename: string;
	url: string;
	type: 'image' | 'document' | 'chart';
	size: number;
	uploadedAt: Date;
}

export interface Squad {
	id: string;
	name: string;
	description: string;
	category: 'Trading Strategies' | 'Skill Learning' | 'Accountability' | 'Market Analysis' | 'Psychology';
	privacy: 'Open' | 'Application Required' | 'Invite Only';
	maxMembers: number;
	currentMembers: number;
	leaderId: string;
	moderatorIds: string[];
	memberIds: string[];
	pendingApplications: string[];
	invitedUsers: string[];
	tags: string[];
	goals: string[];
	activityLevel: 'Low' | 'Medium' | 'High';
	meetingCadence?: string;
	timezone?: string;
	requirements?: string[];
	createdAt: Date;
	lastActivity: Date;
	isActive: boolean;
}

export interface SquadApplication {
	id: string;
	squadId: string;
	applicantId: string;
	applicant: User;
	message: string;
	status: 'Pending' | 'Approved' | 'Rejected';
	appliedAt: Date;
	reviewedAt?: Date;
	reviewedBy?: string;
}

export interface SquadInvitation {
	id: string;
	squadId: string;
	inviterId: string;
	inviteeId: string;
	message?: string;
	status: 'Pending' | 'Accepted' | 'Declined';
	sentAt: Date;
	respondedAt?: Date;
}

export interface CommunityEvent {
	id: string;
	title: string;
	description: string;
	type: 'AMA' | 'Webinar' | 'Trading Session' | 'Workshop' | 'Social';
	hostId: string;
	host: User;
	startTime: Date;
	endTime: Date;
	timezone: string;
	maxAttendees?: number;
	currentAttendees: number;
	attendeeIds: string[];
	isRecurring: boolean;
	recurrencePattern?: string;
	location: 'Online' | 'In-Person' | 'Hybrid';
	meetingLink?: string;
	tags: string[];
	requirements?: string[];
	createdAt: Date;
}

export interface CommunityProps {
	onBack: () => void;
	onLogout: () => void;
}

export const SAMPLE_USERS: User[] = [
	{
		id: 'user1',
		username: 'goldmaster',
		displayName: 'Gold Master',
		avatar: 'GM',
		title: 'Precious Metals Expert',
		level: 15,
		reputation: 2450,
		joinDate: new Date('2023-01-15'),
		lastActive: new Date(),
		bio: 'Professional gold trader with 8+ years experience. Specializing in technical analysis and market psychology.',
		location: 'London, UK',
		tradingExperience: 'Expert',
		specialties: ['Gold Trading', 'Technical Analysis', 'Market Psychology'],
		achievements: [],
		stats: {
			postsCount: 156,
			likesReceived: 892,
			likesGiven: 234,
			squadsJoined: 3,
			squadsLed: 1,
			helpfulAnswers: 67,
			tradingWins: 234,
			tradingLosses: 89
		}
	},
	{
		id: 'user2',
		username: 'forexnewbie',
		displayName: 'Forex Newbie',
		avatar: 'FN',
		level: 3,
		reputation: 145,
		joinDate: new Date('2024-01-01'),
		lastActive: new Date(),
		bio: 'New to forex trading, eager to learn and improve.',
		tradingExperience: 'Beginner',
		specialties: ['Learning', 'Forex Basics'],
		achievements: [],
		stats: {
			postsCount: 23,
			likesReceived: 45,
			likesGiven: 67,
			squadsJoined: 2,
			squadsLed: 0,
			helpfulAnswers: 3,
			tradingWins: 12,
			tradingLosses: 18
		}
	}
];

export const SAMPLE_FORUM_CATEGORIES: ForumCategory[] = [
	{
		id: 'general',
		name: 'General Discussion',
		description: 'General trading discussions and market commentary',
		icon: 'MessageCircle',
		color: 'text-primary',
		postCount: 1234,
		lastActivity: new Date(),
		isRestricted: false,
		moderatorIds: ['user1']
	},
	{
		id: 'gold-desk',
		name: 'Gold Desk',
		description: 'Precious metals trading and analysis',
		icon: 'Coins',
		color: 'text-yellow-500',
		postCount: 567,
		lastActivity: new Date(),
		isRestricted: false,
		moderatorIds: ['user1']
	},
	{
		id: 'fx-majors',
		name: 'FX Majors',
		description: 'Major currency pairs analysis and strategies',
		icon: 'TrendingUp',
		color: 'text-primary',
		postCount: 890,
		lastActivity: new Date(),
		isRestricted: false,
		moderatorIds: ['user1']
	},
	{
		id: 'strategy-dev',
		name: 'Strategy Development',
		description: 'Developing and backtesting trading strategies',
		icon: 'Target',
		color: 'text-secondary',
		postCount: 345,
		lastActivity: new Date(),
		isRestricted: true,
		requiredLevel: 5,
		moderatorIds: ['user1']
	}
];

export const SAMPLE_SQUADS: Squad[] = [
	{
		id: '1',
		name: 'Gold Trading Masters',
		description: 'Advanced gold trading strategies and market analysis. Focus on technical patterns, fundamental drivers, and risk management in precious metals markets.',
		category: 'Trading Strategies',
		privacy: 'Application Required',
		maxMembers: 8,
		currentMembers: 6,
		leaderId: 'user1',
		moderatorIds: ['user2'],
		memberIds: ['user1', 'user2'],
		pendingApplications: [],
		invitedUsers: [],
		tags: ['gold', 'precious-metals', 'technical-analysis', 'risk-management'],
		goals: ['Achieve 15% monthly returns', 'Master gold correlation analysis', 'Develop systematic trading approach'],
		activityLevel: 'High',
		meetingCadence: 'Weekly - Tuesdays 7PM EST',
		timezone: 'EST',
		requirements: ['Minimum 6 months trading experience', 'Active participation required', 'Share weekly trade analysis'],
		createdAt: new Date('2023-06-15'),
		lastActivity: new Date(),
		isActive: true
	},
	{
		id: '2',
		name: 'Forex Beginners Circle',
		description: 'Supportive learning environment for new forex traders. We focus on building solid foundations, understanding market basics, and developing disciplined trading habits.',
		category: 'Skill Learning',
		privacy: 'Open',
		maxMembers: 12,
		currentMembers: 9,
		leaderId: 'user1',
		moderatorIds: [],
		memberIds: ['user1', 'user2'],
		pendingApplications: [],
		invitedUsers: [],
		tags: ['forex', 'beginners', 'education', 'support'],
		goals: ['Complete forex fundamentals course', 'Practice with demo accounts', 'Develop personal trading plan'],
		activityLevel: 'Medium',
		meetingCadence: 'Bi-weekly - Saturdays 2PM EST',
		timezone: 'EST',
		createdAt: new Date('2023-08-01'),
		lastActivity: new Date(),
		isActive: true
	}
];

export function getUserLevel(reputation: number): number {
	if (reputation < 100) return 1;
	if (reputation < 250) return 2;
	if (reputation < 500) return 3;
	if (reputation < 1000) return 4;
	if (reputation < 2000) return 5;
	return Math.min(20, Math.floor(reputation / 500) + 5);
}

export function getLevelTitle(level: number): string {
	if (level < 3) return 'Rookie Trader';
	if (level < 5) return 'Apprentice';
	if (level < 8) return 'Skilled Trader';
	if (level < 12) return 'Expert Trader';
	if (level < 16) return 'Master Trader';
	return 'Trading Legend';
}
