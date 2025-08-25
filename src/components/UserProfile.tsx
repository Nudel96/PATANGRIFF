import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  User,
  Award,
  TrendingUp,
  MessageCircle,
  Eye,
  ThumbsUp,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Shield,
  Star,
  Target,
  BarChart3,
  Activity,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Trophy,
  Zap,
  Brain,
  DollarSign,
  Building2,
  BookOpen,
  Flag,
  UserPlus,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

interface UserProfileProps {
  userId: string;
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onBack }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample user data (would come from API)
  const userData = {
    id: 'user1',
    username: 'goldwarrior',
    displayName: 'Gold Warrior',
    avatar: 'GW',
    level: 'A-Tier',
    reputation: 2847,
    joinDate: new Date('2022-03-15'),
    lastActive: new Date('2024-01-15T15:30:00'),
    location: 'New York, NY',
    website: 'https://goldtrading.com',
    bio: 'Professional gold trader with 8+ years experience. Specializing in breakout strategies and volume analysis. Mentor to 50+ traders in the warrior community.',
    badges: [
      { name: 'Gold Specialist', icon: Trophy, color: 'text-yellow-500' },
      { name: 'Strategy Developer', icon: Target, color: 'text-primary' },
      { name: 'Mentor', icon: Users, color: 'text-secondary' },
      { name: 'Top Contributor', icon: Star, color: 'text-primary' },
      { name: 'Verified Trader', icon: CheckCircle, color: 'text-primary' }
    ],
    stats: {
      posts: 234,
      replies: 567,
      likes: 1234,
      views: 45678,
      followers: 89,
      following: 34,
      squads: 5
    },
    tradingStats: {
      winRate: 73,
      totalTrades: 234,
      avgReturn: 2.4,
      maxDrawdown: 8.2,
      sharpeRatio: 1.8,
      profitFactor: 2.1,
      verified: true
    },
    achievements: [
      { name: 'First Post', description: 'Created your first forum post', earnedAt: new Date('2022-03-20') },
      { name: 'Helpful Member', description: 'Received 100+ likes on posts', earnedAt: new Date('2022-06-15') },
      { name: 'Strategy Master', description: 'Shared 10+ trading strategies', earnedAt: new Date('2022-09-10') },
      { name: 'Mentor', description: 'Helped 50+ community members', earnedAt: new Date('2023-01-05') },
      { name: 'Gold Expert', description: 'Recognized expert in gold trading', earnedAt: new Date('2023-06-20') }
    ],
    recentPosts: [
      {
        id: '1',
        title: 'XAUUSD Breakout Strategy - 3R Setup with Volume Confirmation',
        category: 'Trading Strategies',
        createdAt: new Date('2024-01-15T10:30:00'),
        likes: 34,
        replies: 12,
        views: 456
      },
      {
        id: '2',
        title: 'Gold Market Analysis - Weekly Outlook',
        category: 'Market Analysis',
        createdAt: new Date('2024-01-12T09:15:00'),
        likes: 28,
        replies: 8,
        views: 234
      },
      {
        id: '3',
        title: 'Volume Confirmation Techniques',
        category: 'Trading Strategies',
        createdAt: new Date('2024-01-10T14:20:00'),
        likes: 45,
        replies: 19,
        views: 567
      }
    ],
    squads: [
      { name: 'Gold Trading Masters', role: 'Leader', members: 8 },
      { name: 'Volume Analysis Group', role: 'Member', members: 12 },
      { name: 'Strategy Developers', role: 'Moderator', members: 15 }
    ]
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="military-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{userData.stats.posts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
        <Card className="military-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary mb-1">{userData.stats.likes.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Likes</div>
          </CardContent>
        </Card>
        <Card className="military-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{userData.stats.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </CardContent>
        </Card>
        <Card className="military-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary mb-1">{userData.reputation}</div>
            <div className="text-sm text-muted-foreground">Reputation</div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Performance */}
      {userData.tradingStats.verified && (
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Verified Trading Performance</span>
              <Badge className="bg-primary/10 text-primary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{userData.tradingStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{userData.tradingStats.avgReturn}R</div>
                <div className="text-sm text-muted-foreground">Avg Return</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{userData.tradingStats.sharpeRatio}</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{userData.tradingStats.maxDrawdown}%</div>
                <div className="text-sm text-muted-foreground">Max DD</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-secondary" />
            <span>Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentPosts.map(post => (
              <div key={post.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="bg-primary/20 p-2 rounded">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.replies}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.achievements.map((achievement, index) => (
          <Card key={index} className="military-card">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
              <div className="text-xs text-muted-foreground">
                Earned {achievement.earnedAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSquads = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData.squads.map((squad, index) => (
          <Card key={index} className="military-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">{squad.name}</h3>
                <Badge className={`text-xs ${
                  squad.role === 'Leader' ? 'bg-primary/10 text-primary' :
                  squad.role === 'Moderator' ? 'bg-secondary/10 text-secondary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {squad.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{squad.members} members</span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Forum
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="military-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl font-bold">{userData.avatar}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{userData.displayName}</h1>
                <Badge className="text-sm">{userData.level}</Badge>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-muted-foreground">@{userData.username}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{userData.reputation} reputation</span>
              </div>
              
              <p className="text-foreground/80 mb-4">{userData.bio}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                {userData.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.location}</span>
                  </span>
                )}
                {userData.website && (
                  <span className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <a href={userData.website} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </span>
                )}
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userData.joinDate.toLocaleDateString()}</span>
                </span>
              </div>

              {/* User Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {userData.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <badge.icon className={`w-3 h-3 mr-1 ${badge.color}`} />
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button
                onClick={handleFollow}
                className={isFollowing ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="squads">Squads</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <div className="space-y-4">
            {userData.recentPosts.map(post => (
              <Card key={post.id} className="military-card cursor-pointer hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <span>{post.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.replies}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {renderAchievements()}
        </TabsContent>

        <TabsContent value="squads" className="space-y-6">
          {renderSquads()}
        </TabsContent>
      </Tabs>
    </div>
  );
};