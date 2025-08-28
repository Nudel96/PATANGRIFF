import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { 
	UserPillarProgress, 
	LearningLevel, 
	LearningModule,
	XPNotification, 
	Achievement,
	ModuleCompletion,
	LevelProgression,
	XPCalculation
} from '$lib/types/learning';
import { PILLAR_IDS } from '$lib/types/learning';
import { XPCalculator, XPStorageManager } from '$lib/utils/xp';

/**
 * Enhanced Svelte Stores for Multi-Pillar XP System
 * Frontend-only implementation using local storage for persistence
 */

// Initialize default pillar progress
function createDefaultPillarProgress(pillarId: string): UserPillarProgress {
	return {
		userId: 'default-user', // Frontend-only, single user
		pillarId,
		currentLevel: 1,
		totalXP: 0,
		completedLevels: [],
		completedModules: [],
		lastAccessed: new Date(),
		achievements: [],
		streakDays: 0,
		averageSessionTime: 0
	};
}

// Core stores
export const pillarProgress = writable<Record<string, UserPillarProgress>>({});
export const currentPillar = writable<string>(PILLAR_IDS.CAPITAL_MANAGEMENT);
export const xpNotifications = writable<XPNotification[]>([]);
export const moduleCompletions = writable<Record<string, ModuleCompletion>>({});
export const currentLevels = writable<Record<string, LearningLevel[]>>({});

// Derived stores for calculations
export const currentPillarProgress = derived(
	[pillarProgress, currentPillar],
	([$pillarProgress, $currentPillar]) => {
		return $pillarProgress[$currentPillar] || createDefaultPillarProgress($currentPillar);
	}
);

export const currentLevelProgression = derived(
	[currentPillarProgress, currentLevels, currentPillar],
	([$currentPillarProgress, $currentLevels, $currentPillar]) => {
		const levels = $currentLevels[$currentPillar] || [];
		return XPCalculator.calculateLevelProgression($currentPillarProgress, levels);
	}
);

export const unreadNotifications = derived(
	xpNotifications,
	($notifications) => $notifications.filter(n => !n.read)
);

export const totalXPAcrossAllPillars = derived(
	pillarProgress,
	($pillarProgress) => {
		return Object.values($pillarProgress).reduce((total, progress) => total + progress.totalXP, 0);
	}
);

export const completedLevelsAcrossAllPillars = derived(
	pillarProgress,
	($pillarProgress) => {
		return Object.values($pillarProgress).reduce((total, progress) => total + progress.completedLevels.length, 0);
	}
);

/**
 * Learning Store Actions
 */
export const learningActions = {
	/**
	 * Initialize stores from local storage
	 */
	initialize() {
		if (!browser) return;

		// Load pillar progress
		const savedProgress = XPStorageManager.loadPillarProgress();
		if (Object.keys(savedProgress).length > 0) {
			pillarProgress.set(savedProgress);
		} else {
			// Initialize with default progress for all pillars
			const defaultProgress = {
				[PILLAR_IDS.TRADING_MASTERY]: createDefaultPillarProgress(PILLAR_IDS.TRADING_MASTERY),
				[PILLAR_IDS.PSYCHOLOGY]: createDefaultPillarProgress(PILLAR_IDS.PSYCHOLOGY),
				[PILLAR_IDS.BUSINESS_OPERATIONS]: createDefaultPillarProgress(PILLAR_IDS.BUSINESS_OPERATIONS),
				[PILLAR_IDS.CAPITAL_MANAGEMENT]: createDefaultPillarProgress(PILLAR_IDS.CAPITAL_MANAGEMENT)
			};
			pillarProgress.set(defaultProgress);
			XPStorageManager.savePillarProgress(defaultProgress);
		}

		// Load notifications
		const savedNotifications = XPStorageManager.loadNotifications();
		xpNotifications.set(savedNotifications);

		// Load module completions
		const savedCompletions = XPStorageManager.loadModuleCompletions();
		moduleCompletions.set(savedCompletions);
	},

	/**
	 * Set current pillar
	 */
	setCurrentPillar(pillarId: string) {
		currentPillar.set(pillarId);
		
		// Update last accessed time
		pillarProgress.update(progress => {
			if (progress[pillarId]) {
				progress[pillarId].lastAccessed = new Date();
				XPStorageManager.savePillarProgress(progress);
			}
			return progress;
		});
	},

	/**
	 * Set levels for a pillar
	 */
	setLevelsForPillar(pillarId: string, levels: LearningLevel[]) {
		currentLevels.update(levelMap => {
			levelMap[pillarId] = levels;
			return levelMap;
		});
	},

	/**
	 * Complete a module and award XP
	 */
	completeModule(
		pillarId: string, 
		module: LearningModule, 
		completion: Partial<ModuleCompletion> = {}
	): { xpCalculation: XPCalculation; leveledUp: boolean; newLevel?: number; achievements: Achievement[] } {
		const xpCalculation = XPCalculator.calculateModuleXP(module, completion);
		
		// Create full completion record
		const fullCompletion: ModuleCompletion = {
			moduleId: module.id,
			userId: 'default-user',
			completedAt: new Date(),
			xpEarned: xpCalculation.totalXP,
			score: completion.score,
			attempts: completion.attempts || 1,
			timeSpent: completion.timeSpent || 0,
			submissionContent: completion.submissionContent,
			...completion
		};

		// Save module completion
		moduleCompletions.update(completions => {
			completions[module.id] = fullCompletion;
			XPStorageManager.saveModuleCompletion(fullCompletion);
			return completions;
		});

		let leveledUp = false;
		let newLevel: number | undefined;
		let achievements: Achievement[] = [];

		// Update pillar progress
		pillarProgress.update(progress => {
			const currentProgress = progress[pillarId] || createDefaultPillarProgress(pillarId);
			
			// Check for achievements before updating XP
			const levels = get(currentLevels)[pillarId] || [];
			achievements = XPCalculator.checkForAchievements(currentProgress, levels, xpCalculation.totalXP);
			
			// Update XP and completed modules
			currentProgress.totalXP += xpCalculation.totalXP;
			if (!currentProgress.completedModules.includes(module.id)) {
				currentProgress.completedModules.push(module.id);
			}
			
			// Check for level up
			newLevel = XPCalculator.checkForLevelUp(currentProgress, levels);
			if (newLevel && newLevel > currentProgress.currentLevel) {
				leveledUp = true;
				currentProgress.currentLevel = newLevel;
				if (!currentProgress.completedLevels.includes(newLevel - 1)) {
					currentProgress.completedLevels.push(newLevel - 1);
				}
			}
			
			// Add achievements to progress
			currentProgress.achievements.push(...achievements.map(a => ({ ...a, earnedAt: new Date() })));
			currentProgress.lastAccessed = new Date();
			
			progress[pillarId] = currentProgress;
			XPStorageManager.savePillarProgress(progress);
			return progress;
		});

		// Create notifications
		const notifications: XPNotification[] = [];
		
		// XP notification
		notifications.push(XPCalculator.createXPNotification(xpCalculation, module));
		
		// Level up notification
		if (leveledUp && newLevel) {
			notifications.push(XPCalculator.createLevelUpNotification(newLevel, pillarId));
		}
		
		// Achievement notifications
		achievements.forEach(achievement => {
			notifications.push(XPCalculator.createAchievementNotification(achievement));
		});

		// Add notifications
		if (notifications.length > 0) {
			xpNotifications.update(existing => {
				const updated = [...notifications, ...existing];
				XPStorageManager.saveNotifications(updated);
				return updated;
			});
		}

		return { xpCalculation, leveledUp, newLevel, achievements };
	},

	/**
	 * Mark notification as read
	 */
	markNotificationRead(notificationId: string) {
		xpNotifications.update(notifications => {
			const updated = notifications.map(n => 
				n.id === notificationId ? { ...n, read: true } : n
			);
			XPStorageManager.saveNotifications(updated);
			return updated;
		});
	},

	/**
	 * Clear all notifications
	 */
	clearAllNotifications() {
		xpNotifications.set([]);
		XPStorageManager.saveNotifications([]);
	},

	/**
	 * Get module completion status
	 */
	isModuleCompleted(moduleId: string): boolean {
		const completions = get(moduleCompletions);
		return !!completions[moduleId];
	},

	/**
	 * Get module completion details
	 */
	getModuleCompletion(moduleId: string): ModuleCompletion | null {
		const completions = get(moduleCompletions);
		return completions[moduleId] || null;
	},

	/**
	 * Check if level is unlocked
	 */
	isLevelUnlocked(pillarId: string, level: number): boolean {
		const progress = get(pillarProgress)[pillarId];
		if (!progress) return level === 1;
		
		const levels = get(currentLevels)[pillarId] || [];
		const targetLevel = levels.find(l => l.level === level);
		if (!targetLevel) return false;
		
		return progress.totalXP >= targetLevel.unlockRequirement;
	},

	/**
	 * Get pillar completion percentage
	 */
	getPillarCompletionPercentage(pillarId: string): number {
		const progress = get(pillarProgress)[pillarId];
		if (!progress) return 0;
		
		const levels = get(currentLevels)[pillarId] || [];
		if (levels.length === 0) return 0;
		
		return (progress.completedLevels.length / levels.length) * 100;
	},

	/**
	 * Reset all progress (for testing/demo purposes)
	 */
	resetAllProgress() {
		if (!browser) return;
		
		const defaultProgress = {
			[PILLAR_IDS.TRADING_MASTERY]: createDefaultPillarProgress(PILLAR_IDS.TRADING_MASTERY),
			[PILLAR_IDS.PSYCHOLOGY]: createDefaultPillarProgress(PILLAR_IDS.PSYCHOLOGY),
			[PILLAR_IDS.BUSINESS_OPERATIONS]: createDefaultPillarProgress(PILLAR_IDS.BUSINESS_OPERATIONS),
			[PILLAR_IDS.CAPITAL_MANAGEMENT]: createDefaultPillarProgress(PILLAR_IDS.CAPITAL_MANAGEMENT)
		};
		
		pillarProgress.set(defaultProgress);
		xpNotifications.set([]);
		moduleCompletions.set({});
		
		XPStorageManager.savePillarProgress(defaultProgress);
		XPStorageManager.saveNotifications([]);
		localStorage.removeItem('pat-xp-module-completions');
	}
};
