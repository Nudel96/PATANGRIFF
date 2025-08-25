import { writable, derived } from 'svelte/store';

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

export interface SquadMember {
  userId: string;
  squadId: string;
  role: 'leader' | 'moderator' | 'member';
  joinedAt: Date;
  contributionScore: number;
  lastActive: Date;
}

// Squad state
export const squads = writable<Squad[]>([]);
export const userSquads = writable<Squad[]>([]);
export const squadMembers = writable<Record<string, SquadMember[]>>({});

// Sample data initialization
squads.set([
  {
    id: '1',
    name: 'Gold Trading Masters',
    description: 'Daily gold analysis and trade reviews. Focus on London/NY sessions with systematic approach to XAU setups.',
    category: 'trading-strategies',
    privacy: 'open',
    maxMembers: 8,
    currentMembers: 6,
    leaderId: 'user1',
    memberIds: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
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
    leaderId: 'user2',
    memberIds: ['user2', 'user3', 'user4', 'user5'],
    tags: ['macro', 'research', 'weekly', 'fundamentals'],
    goals: ['Master macro analysis', 'Understand policy implications', 'Develop research skills'],
    meetingCadence: 'Weekly Sundays 2PM EST',
    timezone: 'America/New_York',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    lastActivity: new Date()
  }
]);

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
    id: Date.now().toString(),
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