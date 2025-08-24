import { writable } from 'svelte/store';

export interface LearningModule {
	id: string;
	title: string;
	description: string;
	type: 'lesson' | 'quiz' | 'assessment' | 'project';
	xpReward: number;
	duration: string;
	completed: boolean;
	locked: boolean;
	content?: string;
}

export interface LearningLevel {
	level: number;
	title: string;
	description: string;
	tier: 'Beginner' | 'Intermediate' | 'Professional';
	modules: LearningModule[];
	totalXP: number;
	unlockRequirement: number;
	completed: boolean;
	locked: boolean;
}

export const userXP = writable<number>(0);
export const userLevel = writable<number>(1);
export const currentModule = writable<LearningModule | null>(null);
export const learningProgress = writable<Record<string, number>>({
	'trading-mastery': 75,
	'business-operations': 45,
	'trading-psychology': 30,
	'capital-management': 60
});

export function completeModule(moduleId: string, xpReward: number) {
	userXP.update(xp => xp + xpReward);
	// Update module completion status
}

export function unlockNextLevel() {
	userLevel.update(level => level + 1);
}