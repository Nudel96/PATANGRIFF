import type { 
	LearningLevel, 
	LearningModule, 
	UserPillarProgress, 
	XPCalculation, 
	LevelProgression, 
	Achievement,
	ModuleCompletion,
	XPNotification
} from '$lib/types/learning';
import { XP_CONSTANTS, PILLAR_IDS } from '$lib/types/learning';

/**
 * Core XP Calculation Engine for Frontend-Only Implementation
 * Handles all XP calculations, level progression, and achievements using local storage
 */

export class XPCalculator {
	/**
	 * Calculate XP earned from completing a module
	 */
	static calculateModuleXP(module: LearningModule, completion: Partial<ModuleCompletion>): XPCalculation {
		let baseXP = module.xpReward;
		let bonusXP = 0;
		let multiplier = 1;
		let source: XPCalculation['source'] = 'module_completion';

		// Quiz scoring bonus
		if (module.type === 'quiz' && completion.score !== undefined) {
			if (completion.score >= 100) {
				bonusXP += XP_CONSTANTS.QUIZ_PERFECT_SCORE_BONUS;
				source = 'quiz_score';
			}
		}

		// Challenge quality bonus
		if (module.type === 'challenge' && completion.submissionContent) {
			const wordCount = completion.submissionContent.split(' ').length;
			if (wordCount >= 100) { // Quality submission threshold
				bonusXP += XP_CONSTANTS.CHALLENGE_QUALITY_BONUS;
				source = 'challenge_quality';
			}
		}

		// Reflection depth bonus
		if (module.type === 'reflection' && completion.submissionContent) {
			const wordCount = completion.submissionContent.split(' ').length;
			if (wordCount >= 150) { // Thoughtful reflection threshold
				bonusXP += XP_CONSTANTS.REFLECTION_DEPTH_BONUS;
				source = 'reflection_depth';
			}
		}

		// Fast completion bonus (completed in less than expected time)
		if (completion.timeSpent && completion.timeSpent < this.parseTimeToMinutes(module.duration) * 0.8) {
			multiplier = 1.1;
		}

		const totalXP = Math.round((baseXP + bonusXP) * multiplier);

		return {
			baseXP,
			bonusXP,
			totalXP,
			source,
			multiplier
		};
	}

	/**
	 * Calculate current level progression for a pillar
	 */
	static calculateLevelProgression(pillarProgress: UserPillarProgress, levels: LearningLevel[]): LevelProgression {
		const currentLevel = pillarProgress.currentLevel;
		const currentXP = pillarProgress.totalXP;
		
		// Find next level requirements
		const nextLevel = levels.find(level => level.level === currentLevel + 1);
		const xpToNextLevel = nextLevel ? Math.max(0, nextLevel.unlockRequirement - currentXP) : 0;
		
		// Calculate progress percentage within current level
		const currentLevelXP = levels.find(level => level.level === currentLevel)?.unlockRequirement || 0;
		const nextLevelXP = nextLevel?.unlockRequirement || currentXP;
		const levelRange = nextLevelXP - currentLevelXP;
		const progressInLevel = currentXP - currentLevelXP;
		const progressPercentage = levelRange > 0 ? Math.min(100, (progressInLevel / levelRange) * 100) : 100;

		return {
			currentLevel,
			currentXP,
			xpToNextLevel,
			progressPercentage,
			canLevelUp: xpToNextLevel === 0 && nextLevel !== undefined,
			nextLevelUnlocked: currentXP >= (nextLevel?.unlockRequirement || Infinity)
		};
	}

	/**
	 * Check if user can level up and return new level
	 */
	static checkForLevelUp(pillarProgress: UserPillarProgress, levels: LearningLevel[]): number | null {
		const progression = this.calculateLevelProgression(pillarProgress, levels);
		
		if (progression.canLevelUp) {
			return pillarProgress.currentLevel + 1;
		}
		
		return null;
	}

	/**
	 * Generate achievements based on progress
	 */
	static checkForAchievements(
		pillarProgress: UserPillarProgress, 
		levels: LearningLevel[],
		newXP: number
	): Achievement[] {
		const achievements: Achievement[] = [];
		const newTotalXP = pillarProgress.totalXP + newXP;

		// Level milestone achievements
		const newLevel = this.checkForLevelUp({ ...pillarProgress, totalXP: newTotalXP }, levels);
		if (newLevel) {
			if (newLevel % 5 === 0) { // Every 5 levels
				achievements.push({
					id: `${pillarProgress.pillarId}-level-${newLevel}`,
					type: 'level_milestone',
					title: `Level ${newLevel} Master!`,
					description: `Reached level ${newLevel} in ${this.getPillarName(pillarProgress.pillarId)}`,
					icon: '🏆',
					xpBonus: 25,
					pillarId: pillarProgress.pillarId,
					levelRequired: newLevel
				});
			}
		}

		// Pillar completion achievement
		if (newLevel === 30) {
			achievements.push({
				id: `${pillarProgress.pillarId}-master`,
				type: 'pillar_master',
				title: 'Pillar Master!',
				description: `Completed all 30 levels in ${this.getPillarName(pillarProgress.pillarId)}`,
				icon: '👑',
				xpBonus: 100,
				pillarId: pillarProgress.pillarId,
				levelRequired: 30
			});
		}

		return achievements;
	}

	/**
	 * Create XP notification
	 */
	static createXPNotification(xpCalculation: XPCalculation, module: LearningModule): XPNotification {
		return {
			id: `xp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			type: 'xp_gained',
			title: 'XP Earned!',
			message: `+${xpCalculation.totalXP} XP from "${module.title}"`,
			xpAmount: xpCalculation.totalXP,
			timestamp: new Date(),
			read: false
		};
	}

	/**
	 * Create level up notification
	 */
	static createLevelUpNotification(newLevel: number, pillarId: string): XPNotification {
		return {
			id: `levelup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			type: 'level_up',
			title: 'Level Up!',
			message: `Congratulations! You've reached level ${newLevel} in ${this.getPillarName(pillarId)}!`,
			timestamp: new Date(),
			read: false
		};
	}

	/**
	 * Create achievement notification
	 */
	static createAchievementNotification(achievement: Achievement): XPNotification {
		return {
			id: `achievement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			type: 'achievement_unlocked',
			title: 'Achievement Unlocked!',
			message: achievement.title,
			achievement,
			timestamp: new Date(),
			read: false
		};
	}

	/**
	 * Utility: Parse duration string to minutes
	 */
	private static parseTimeToMinutes(duration: string): number {
		const match = duration.match(/(\d+)\s*min/);
		return match ? parseInt(match[1]) : 20; // Default 20 minutes
	}

	/**
	 * Utility: Get pillar display name
	 */
	private static getPillarName(pillarId: string): string {
		switch (pillarId) {
			case PILLAR_IDS.TRADING_MASTERY: return 'Trading Mastery';
			case PILLAR_IDS.PSYCHOLOGY: return 'Psychology';
			case PILLAR_IDS.BUSINESS_OPERATIONS: return 'Business Operations';
			case PILLAR_IDS.CAPITAL_MANAGEMENT: return 'Capital Management';
			default: return 'Unknown Pillar';
		}
	}
}

/**
 * Local Storage Manager for XP System
 */
export class XPStorageManager {
	private static readonly STORAGE_KEYS = {
		PILLAR_PROGRESS: 'pat-xp-pillar-progress',
		ACHIEVEMENTS: 'pat-xp-achievements',
		NOTIFICATIONS: 'pat-xp-notifications',
		MODULE_COMPLETIONS: 'pat-xp-module-completions'
	};

	/**
	 * Save pillar progress to local storage
	 */
	static savePillarProgress(progress: Record<string, UserPillarProgress>): void {
		try {
			localStorage.setItem(this.STORAGE_KEYS.PILLAR_PROGRESS, JSON.stringify(progress));
		} catch (error) {
			console.error('Failed to save pillar progress:', error);
		}
	}

	/**
	 * Load pillar progress from local storage
	 */
	static loadPillarProgress(): Record<string, UserPillarProgress> {
		try {
			const stored = localStorage.getItem(this.STORAGE_KEYS.PILLAR_PROGRESS);
			if (stored) {
				const parsed = JSON.parse(stored);
				// Convert date strings back to Date objects
				Object.values(parsed).forEach((progress: any) => {
					progress.lastAccessed = new Date(progress.lastAccessed);
					progress.achievements?.forEach((achievement: any) => {
						if (achievement.earnedAt) {
							achievement.earnedAt = new Date(achievement.earnedAt);
						}
					});
				});
				return parsed;
			}
		} catch (error) {
			console.error('Failed to load pillar progress:', error);
		}
		return {};
	}

	/**
	 * Save module completions to local storage
	 */
	static saveModuleCompletion(completion: ModuleCompletion): void {
		try {
			const stored = this.loadModuleCompletions();
			stored[completion.moduleId] = {
				...completion,
				completedAt: new Date(completion.completedAt)
			};
			localStorage.setItem(this.STORAGE_KEYS.MODULE_COMPLETIONS, JSON.stringify(stored));
		} catch (error) {
			console.error('Failed to save module completion:', error);
		}
	}

	/**
	 * Load module completions from local storage
	 */
	static loadModuleCompletions(): Record<string, ModuleCompletion> {
		try {
			const stored = localStorage.getItem(this.STORAGE_KEYS.MODULE_COMPLETIONS);
			if (stored) {
				const parsed = JSON.parse(stored);
				// Convert date strings back to Date objects
				Object.values(parsed).forEach((completion: any) => {
					completion.completedAt = new Date(completion.completedAt);
				});
				return parsed;
			}
		} catch (error) {
			console.error('Failed to load module completions:', error);
		}
		return {};
	}

	/**
	 * Save notifications to local storage
	 */
	static saveNotifications(notifications: XPNotification[]): void {
		try {
			localStorage.setItem(this.STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
		} catch (error) {
			console.error('Failed to save notifications:', error);
		}
	}

	/**
	 * Load notifications from local storage
	 */
	static loadNotifications(): XPNotification[] {
		try {
			const stored = localStorage.getItem(this.STORAGE_KEYS.NOTIFICATIONS);
			if (stored) {
				const parsed = JSON.parse(stored);
				// Convert date strings back to Date objects
				parsed.forEach((notification: any) => {
					notification.timestamp = new Date(notification.timestamp);
					if (notification.achievement?.earnedAt) {
						notification.achievement.earnedAt = new Date(notification.achievement.earnedAt);
					}
				});
				return parsed;
			}
		} catch (error) {
			console.error('Failed to load notifications:', error);
		}
		return [];
	}
}
