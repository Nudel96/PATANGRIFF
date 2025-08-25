import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { getStoredData, setStoredData, generateId } from '$lib/utils';

export interface Squad {
  id: string;
  name: string;
  description: string;
  category: string;
  privacy: 'open' | 'application' | 'invite' | 'private';
  maxMembers: number;
  currentMembers: number;
  leaderId: string;
  memberIds: string[];
  tags: string[];
  goals: string[];
  meetingCadence: string;
  timezone: string;
  isActive: boolean;
  createdAt: Date;
  lastActivity: Date;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isFeatured: boolean;
  hasImages: boolean;
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  parentId?: string;
}

// Community state
export const squads = writable<Squad[]>([]);
export const userSquads = writable<Squad[]>([]);
export const forumPosts = writable<ForumPost[]>([]);
export const forumReplies = writable<ForumReply[]>([]);

// Mock data
const mockSquads: Squad[] = [
  {
    id: '1',
    name: 'Gold Trading Masters',
    description: 'Daily gold analysis and trade reviews. Focus on London/NY sessions with systematic approach to XAU setups.',
    category: 'trading-strategies',
    privacy: 'open',
    maxMembers: 8,
    currentMembers: 6,
    leaderId: '1',
    memberIds: ['1', '2', '3', '4', '5', '6'],
    tags: ['gold', 'daily', 'active', 'london-ny'],
    goals: ['Improve gold trading consistency', 'Share daily analysis', 'Develop systematic approach'],
    meetingCadence: 'Daily 8AM EST',
    timezone: 'America/New_York',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastActivity: new Date()
  },
  {
    id: '2',
    name: 'Macro Analysis Group',
    description: 'Weekly deep dives into economic data and policy implications. Research-focused group for fundamental analysis.',
    category: 'market-analysis',
    privacy: 'application',
    maxMembers: 6,
    currentMembers: 4,
    leaderId: '2',
    memberIds: ['2', '3', '4', '5'],
    tags: ['macro', 'research', 'weekly', 'fundamentals'],
    goals: ['Master macro analysis', 'Understand policy implications', 'Develop research skills'],
    meetingCadence: 'Weekly Sundays 2PM EST',
    timezone: 'America/New_York',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    lastActivity: new Date()
  },
  {
    id: '3',
    name: 'Psychology Focus Group',
    description: 'Mindset work, emotional regulation, and performance optimization. Bi-weekly accountability sessions.',
    category: 'psychology',
    privacy: 'open',
    maxMembers: 8,
    currentMembers: 5,
    leaderId: '3',
    memberIds: ['3', '4', '5', '6', '7'],
    tags: ['psychology', 'mindset', 'accountability', 'performance'],
    goals: ['Develop mental discipline', 'Overcome emotional trading', 'Build consistency'],
    meetingCadence: 'Bi-weekly Thursdays 7PM EST',
    timezone: 'America/New_York',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    lastActivity: new Date()
  }
];

const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'XAUUSD Breakout Strategy - 3R Setup with Volume Confirmation',
    content: 'Sharing my systematic approach to gold breakouts above key resistance levels. This strategy focuses on volume confirmation and multiple timeframe alignment for high-probability entries...',
    authorId: '1',
    categoryId: 'trading-strategies',
    tags: ['gold', 'breakout', 'volume', 'strategy'],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    views: 456,
    likes: 34,
    replies: 12,
    isPinned: false,
    isFeatured: true,
    hasImages: true
  },
  {
    id: '2',
    title: 'Building a Trading Education Business - 6 Month Case Study',
    content: 'Documenting my journey from solo trader to education business owner. Sharing the complete process, challenges, and results from building a trading education platform...',
    authorId: '2',
    categoryId: 'business-development',
    tags: ['business', 'education', 'case-study', 'entrepreneurship'],
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T14:20:00'),
    views: 789,
    likes: 67,
    replies: 23,
    isPinned: true,
    isFeatured: true,
    hasImages: true
  }
];

// Initialize from localStorage or use mock data
if (browser) {
  const storedSquads = getStoredData('squads', mockSquads);
  const storedPosts = getStoredData('forumPosts', mockForumPosts);
  
  squads.set(storedSquads.map(squad => ({
    ...squad,
    createdAt: new Date(squad.createdAt),
    lastActivity: new Date(squad.lastActivity)
  })));
  
  forumPosts.set(storedPosts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt)
  })));
}

// Persist to localStorage
if (browser) {
  squads.subscribe((value) => setStoredData('squads', value));
  forumPosts.subscribe((value) => setStoredData('forumPosts', value));
}

// Derived stores
export const squadStats = derived([squads, userSquads], ([$squads, $userSquads]) => {
  return {
    totalSquads: $squads.length,
    userSquadCount: $userSquads.length,
    availableSquads: $squads.filter(squad => squad.currentMembers < squad.maxMembers).length,
    activeSquads: $squads.filter(squad => squad.isActive).length
  };
});

export const recommendedSquads = derived([squads, userSquads], ([$squads, $userSquads]) => {
  const userSquadIds = $userSquads.map(squad => squad.id);
  return $squads
    .filter(squad => !userSquadIds.includes(squad.id))
    .filter(squad => squad.currentMembers < squad.maxMembers)
    .slice(0, 6);
});

// Actions
export function createSquad(squadData: Omit<Squad, 'id' | 'createdAt' | 'lastActivity'>) {
  const newSquad: Squad = {
    ...squadData,
    id: generateId(),
    createdAt: new Date(),
    lastActivity: new Date()
  };
  
  squads.update(current => [...current, newSquad]);
  userSquads.update(current => [...current, newSquad]);
  
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

export function createForumPost(postData: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'replies'>) {
  const newPost: ForumPost = {
    ...postData,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    likes: 0,
    replies: 0
  };
  
  forumPosts.update(current => [newPost, ...current]);
  return newPost;
}

export function likePost(postId: string) {
  forumPosts.update(current =>
    current.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    )
  );
}