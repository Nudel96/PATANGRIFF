import { writable, derived } from 'svelte/store';

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

// Learning progress state
export const userXP = writable<number>(0);
export const userLevel = writable<number>(1);
export const completedModules = writable<string[]>([]);

// Four Pillars progress
export const tradingMasteryProgress = writable<number>(75);
export const businessOpsProgress = writable<number>(45);
export const capitalMgmtProgress = writable<number>(60);
export const psychologyProgress = writable<number>(30);

// Derived overall progress
export const overallProgress = derived(
  [tradingMasteryProgress, businessOpsProgress, capitalMgmtProgress, psychologyProgress],
  ([$trading, $business, $capital, $psychology]) => {
    return ($trading + $business + $capital + $psychology) / 4;
  }
);

// Learning achievements
export const achievements = writable<Array<{
  id: string;
  name: string;
  description: string;
  earnedAt: Date;
  icon: string;
}>>([
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    earnedAt: new Date('2024-01-10'),
    icon: 'star'
  },
  {
    id: '2',
    name: 'Discipline Warrior',
    description: 'Complete 10 trading journal entries',
    earnedAt: new Date('2024-01-15'),
    icon: 'target'
  }
]);

// Actions
export function completeModule(moduleId: string, xpReward: number) {
  completedModules.update(current => [...current, moduleId]);
  userXP.update(current => current + xpReward);
  
  // Check for level up
  userXP.subscribe(xp => {
    const newLevel = Math.floor(xp / 100) + 1;
    userLevel.set(Math.min(newLevel, 30));
  });
}

export function updatePillarProgress(pillar: string, progress: number) {
  switch (pillar) {
    case 'trading-mastery':
      tradingMasteryProgress.set(progress);
      break;
    case 'business-ops':
      businessOpsProgress.set(progress);
      break;
    case 'capital-mgmt':
      capitalMgmtProgress.set(progress);
      break;
    case 'psychology':
      psychologyProgress.set(progress);
      break;
  }
}

export function earnAchievement(achievement: {
  name: string;
  description: string;
  icon: string;
}) {
  const newAchievement = {
    id: Date.now().toString(),
    ...achievement,
    earnedAt: new Date()
  };
  
  achievements.update(current => [...current, newAchievement]);
}