// Mock data for frontend-only application
export const mockUsers = [
  {
    id: '1',
    username: 'goldwarrior',
    displayName: 'Gold Warrior',
    email: 'warrior@example.com',
    avatar: 'GW',
    level: 'A-Tier',
    reputation: 2847,
    badges: ['Gold Specialist', 'Strategy Developer', 'Mentor'],
    joinDate: new Date('2022-03-15'),
    tradingStats: {
      winRate: 73,
      totalTrades: 234,
      avgReturn: 2.4,
      maxDrawdown: 8.2
    }
  },
  {
    id: '2',
    username: 'macromind',
    displayName: 'Macro Mind',
    email: 'macro@example.com',
    avatar: 'MM',
    level: 'S-Tier',
    reputation: 4567,
    badges: ['Macro Expert', 'Wiki Contributor', 'Mentor'],
    joinDate: new Date('2022-01-10'),
    tradingStats: {
      winRate: 68,
      totalTrades: 567,
      avgReturn: 1.8,
      maxDrawdown: 12.1
    }
  },
  {
    id: '3',
    username: 'mindfultrader',
    displayName: 'Mindful Trader',
    email: 'mindful@example.com',
    avatar: 'MT',
    level: 'A-Tier',
    reputation: 1987,
    badges: ['Psychology Specialist', 'Mentor'],
    joinDate: new Date('2022-08-20'),
    tradingStats: {
      winRate: 71,
      totalTrades: 189,
      avgReturn: 2.1,
      maxDrawdown: 9.8
    }
  }
];

export const mockForumCategories = [
  {
    id: 'trading-strategies',
    name: 'Trading Strategies & Systems',
    description: 'Share and discuss trading strategies, system development, and methodology',
    icon: 'Target',
    color: 'text-primary',
    postCount: 1044,
    memberCount: 2847,
    todaysPosts: 23
  },
  {
    id: 'market-analysis',
    name: 'Market Analysis & Research',
    description: 'Daily market analysis, economic research, and trading opportunities',
    icon: 'BarChart3',
    color: 'text-secondary',
    postCount: 1344,
    memberCount: 3156,
    todaysPosts: 34
  },
  {
    id: 'business-development',
    name: 'Business Development & Entrepreneurship',
    description: 'Building trading businesses, scaling operations, and entrepreneurship',
    icon: 'Building2',
    color: 'text-primary',
    postCount: 402,
    memberCount: 1234,
    todaysPosts: 8
  },
  {
    id: 'psychology',
    name: 'Trading Psychology & Mindset',
    description: 'Mental aspects of trading, discipline, and psychological development',
    icon: 'Brain',
    color: 'text-primary',
    postCount: 800,
    memberCount: 2134,
    todaysPosts: 16
  }
];

export const mockLearningLevels = [
  {
    level: 1,
    title: "Introduction to Trading & Markets",
    description: "Discover what trading is and explore different financial markets",
    tier: "Beginner" as const,
    unlockRequirement: 0,
    completed: true,
    locked: false,
    totalXP: 50,
    modules: [
      {
        id: "1-1",
        title: "Welcome to Trading",
        description: "Understanding financial markets and how traders profit from price movements",
        type: "lesson" as const,
        xpReward: 30,
        duration: "15 min",
        completed: true,
        locked: false,
        content: "Trading is the art and science of buying and selling financial instruments to profit from price movements..."
      },
      {
        id: "1-2",
        title: "Market Types Quiz",
        description: "Test your understanding of different financial markets",
        type: "quiz" as const,
        xpReward: 20,
        duration: "5 min",
        completed: true,
        locked: false
      }
    ]
  },
  {
    level: 2,
    title: "Key Trading Terminology",
    description: "Master essential trading terms and definitions",
    tier: "Beginner" as const,
    unlockRequirement: 50,
    completed: false,
    locked: false,
    totalXP: 75,
    modules: [
      {
        id: "2-1",
        title: "Trading Vocabulary",
        description: "Learn pips, lots, leverage, margin, and order types",
        type: "lesson" as const,
        xpReward: 50,
        duration: "20 min",
        completed: false,
        locked: false,
        content: "In forex trading, a 'pip' is the smallest price movement. For most currency pairs, 1 pip = 0.0001..."
      },
      {
        id: "2-2",
        title: "Terminology Quiz",
        description: "Match terms with their definitions",
        type: "quiz" as const,
        xpReward: 25,
        duration: "10 min",
        completed: false,
        locked: false
      }
    ]
  }
];

export function getUserById(id: string) {
  return mockUsers.find(user => user.id === id);
}

export function getCategoryById(id: string) {
  return mockForumCategories.find(category => category.id === id);
}