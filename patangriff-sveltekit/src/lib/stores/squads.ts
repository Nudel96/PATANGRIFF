import { writable, derived } from 'svelte/store';

export interface Squad {
	id: string;
	name: string;
	description: string;
	category: SquadCategory;
	privacy: SquadPrivacy;
	maxMembers: number;
	currentMembers: number;
	leaderId: string;
	moderatorIds: string[];
	memberIds: string[];
	pendingApplications: string[];
	invitedUsers: string[];
	tags: string[];
	goals: string[];
	activityLevel: 'Low' | 'Medium' | 'High' | 'Very High';
	meetingCadence: string;
	timezone: string;
	requirements: string[];
	resources: SquadResource[];
	achievements: SquadAchievement[];
	createdAt: Date;
	lastActivity: Date;
	isActive: boolean;
	rules: string[];
	focusAreas: string[];
	skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';
	language: string;
	region?: string;
}

export interface SquadMember {
	userId: string;
	squadId: string;
	role: SquadRole;
	joinedAt: Date;
	contributionScore: number;
	lastActive: Date;
	achievements: string[];
	mentorshipOffered: string[];
	mentorshipSeeking: string[];
	status: 'Active' | 'Inactive' | 'On Break';
}

export interface SquadMessage {
	id: string;
	squadId: string;
	authorId: string;
	content: string;
	type: 'text' | 'image' | 'file' | 'poll' | 'announcement';
	timestamp: Date;
	reactions: Record<string, string[]>; // emoji -> userIds
	replies: SquadMessage[];
	isPinned: boolean;
	tags: string[];
	attachments: SquadAttachment[];
}

export interface SquadResource {
	id: string;
	title: string;
	description: string;
	type: 'document' | 'video' | 'link' | 'template' | 'tool';
	url?: string;
	content?: string;
	uploadedBy: string;
	uploadedAt: Date;
	tags: string[];
	accessLevel: 'All' | 'Members' | 'Moderators' | 'Leaders';
	downloads: number;
	rating: number;
	reviews: SquadResourceReview[];
}

export interface SquadResourceReview {
	id: string;
	userId: string;
	rating: number;
	comment: string;
	createdAt: Date;
}

export interface SquadAchievement {
	id: string;
	title: string;
	description: string;
	icon: string;
	unlockedAt: Date;
	unlockedBy: string[];
	criteria: string;
	xpReward: number;
}

export interface SquadProject {
	id: string;
	squadId: string;
	title: string;
	description: string;
	goals: string[];
	milestones: ProjectMilestone[];
	assignedMembers: string[];
	startDate: Date;
	targetDate: Date;
	status: 'Planning' | 'Active' | 'Review' | 'Completed' | 'Cancelled';
	progress: number;
	resources: string[];
	updates: ProjectUpdate[];
}

export interface ProjectMilestone {
	id: string;
	title: string;
	description: string;
	dueDate: Date;
	completed: boolean;
	completedBy?: string;
	completedAt?: Date;
}

export interface ProjectUpdate {
	id: string;
	authorId: string;
	content: string;
	timestamp: Date;
	attachments: SquadAttachment[];
}

export interface SquadAttachment {
	id: string;
	filename: string;
	size: number;
	type: string;
	url: string;
	uploadedBy: string;
	uploadedAt: Date;
}

export interface SquadEvent {
	id: string;
	squadId: string;
	title: string;
	description: string;
	type: 'meeting' | 'workshop' | 'review' | 'social' | 'milestone';
	startTime: Date;
	endTime: Date;
	timezone: string;
	location?: string;
	isVirtual: boolean;
	meetingLink?: string;
	organizer: string;
	attendees: string[];
	maxAttendees?: number;
	isRecurring: boolean;
	recurrencePattern?: string;
	reminders: EventReminder[];
	agenda: string[];
	notes?: string;
	recordings?: string[];
}

export interface EventReminder {
	id: string;
	type: 'email' | 'push' | 'in-app';
	timing: number; // minutes before event
	sent: boolean;
}

export type SquadCategory = 
	| 'Trading Strategies'
	| 'Business Development' 
	| 'Skill Learning'
	| 'Industry Specific'
	| 'Accountability'
	| 'Mentorship'
	| 'Project Based'
	| 'Study Groups'
	| 'Networking'
	| 'Career Development';

export type SquadPrivacy = 'Open' | 'Invite-Only' | 'Private' | 'Application-Required';

export type SquadRole = 'Leader' | 'Moderator' | 'Active Member' | 'New Member' | 'Observer';

// Stores
export const squads = writable<Squad[]>([]);
export const userSquads = writable<Squad[]>([]);
export const squadMembers = writable<Record<string, SquadMember[]>>({});
export const squadMessages = writable<Record<string, SquadMessage[]>>({});
export const squadProjects = writable<Record<string, SquadProject[]>>({});
export const squadEvents = writable<Record<string, SquadEvent[]>>({});
export const selectedSquad = writable<Squad | null>(null);
export const squadDiscovery = writable<Squad[]>([]);

// Derived stores
export const squadStats = derived([squads, userSquads], ([$squads, $userSquads]) => {
	return {
		totalSquads: $squads.length,
		userSquadCount: $userSquads.length,
		activeSquads: $squads.filter(squad => squad.isActive).length,
		categoryCounts: $squads.reduce((acc, squad) => {
			acc[squad.category] = (acc[squad.category] || 0) + 1;
			return acc;
		}, {} as Record<SquadCategory, number>)
	};
});

export const recommendedSquads = derived([squads, userSquads], ([$squads, $userSquads]) => {
	const userSquadCategories = $userSquads.map(squad => squad.category);
	return $squads
		.filter(squad => 
			squad.privacy === 'Open' && 
			squad.currentMembers < squad.maxMembers &&
			!$userSquads.some(userSquad => userSquad.id === squad.id)
		)
		.sort((a, b) => {
			// Prioritize squads in similar categories
			const aScore = userSquadCategories.includes(a.category) ? 1 : 0;
			const bScore = userSquadCategories.includes(b.category) ? 1 : 0;
			return bScore - aScore;
		})
		.slice(0, 6);
});

// Actions
export function createSquad(squadData: Omit<Squad, 'id' | 'createdAt' | 'lastActivity'>) {
	const newSquad: Squad = {
		...squadData,
		id: Date.now().toString(),
		createdAt: new Date(),
		lastActivity: new Date()
	};
	
	squads.update(current => [...current, newSquad]);
	userSquads.update(current => [...current, newSquad]);
	
	console.log('Squad created in store:', newSquad);
	
	// Persist to localStorage for demo purposes
	// In production, this would be an API call
	try {
		const existingSquads = JSON.parse(localStorage.getItem('userSquads') || '[]');
		localStorage.setItem('userSquads', JSON.stringify([...existingSquads, newSquad]));
	} catch (error) {
		console.warn('Failed to persist squad to localStorage:', error);
	}
	
	return newSquad;
}

export function joinSquad(squadId: string, userId: string) {
	squads.update(current => 
		current.map(squad => 
			squad.id === squadId 
				? { 
					...squad, 
					memberIds: [...squad.memberIds, userId],
					currentMembers: squad.currentMembers + 1,
					lastActivity: new Date()
				}
				: squad
		)
	);
}

export function leaveSquad(squadId: string, userId: string) {
	squads.update(current => 
		current.map(squad => 
			squad.id === squadId 
				? { 
					...squad, 
					memberIds: squad.memberIds.filter(id => id !== userId),
					currentMembers: squad.currentMembers - 1,
					lastActivity: new Date()
				}
				: squad
		)
	);
	
	userSquads.update(current => current.filter(squad => squad.id !== squadId));
}

export function applyToSquad(squadId: string, userId: string, message: string) {
	squads.update(current => 
		current.map(squad => 
			squad.id === squadId 
				? { 
					...squad, 
					pendingApplications: [...squad.pendingApplications, userId]
				}
				: squad
		)
	);
}

export function approveApplication(squadId: string, userId: string) {
	squads.update(current => 
		current.map(squad => 
			squad.id === squadId 
				? { 
					...squad, 
					pendingApplications: squad.pendingApplications.filter(id => id !== userId),
					memberIds: [...squad.memberIds, userId],
					currentMembers: squad.currentMembers + 1,
					lastActivity: new Date()
				}
				: squad
		)
	);
}

export function sendSquadMessage(squadId: string, message: Omit<SquadMessage, 'id' | 'timestamp'>) {
	const newMessage: SquadMessage = {
		...message,
		id: Date.now().toString(),
		timestamp: new Date()
	};
	
	squadMessages.update(current => ({
		...current,
		[squadId]: [...(current[squadId] || []), newMessage]
	}));
	
	// Update squad last activity
	squads.update(current => 
		current.map(squad => 
			squad.id === squadId 
				? { ...squad, lastActivity: new Date() }
				: squad
		)
	);
}

export function createSquadProject(squadId: string, project: Omit<SquadProject, 'id'>) {
	const newProject: SquadProject = {
		...project,
		id: Date.now().toString()
	};
	
	squadProjects.update(current => ({
		...current,
		[squadId]: [...(current[squadId] || []), newProject]
	}));
}

export function scheduleSquadEvent(squadId: string, event: Omit<SquadEvent, 'id'>) {
	const newEvent: SquadEvent = {
		...event,
		id: Date.now().toString()
	};
	
	squadEvents.update(current => ({
		...current,
		[squadId]: [...(current[squadId] || []), newEvent]
	}));
}