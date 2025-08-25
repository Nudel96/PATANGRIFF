import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, LogOut, User, Star, Award, Calendar, MapPin, Globe, Mail, MessageCircle, UserPlus, UserCheck, Shield, Crown, Target, TrendingUp, BarChart3, Brain, Building2, Activity, Eye, ThumbsUp, MessageSquare, Verified, ExternalLink, Edit, Settings, Flag, Blocks as Block, Route as Mute } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onBack: () => void;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  const userStats = [
    { label: 'Reputation', value: user.reputation.toLocaleString(), icon: Star, color: 'text-yellow-500' },
    { label: 'Posts', value: user.postCount.toString(), icon: MessageCircle, color: 'text-blue-500' },
    { label: 'Followers', value: user.followersCount.toString(), icon: UserPlus, color: 'text-green-500' },
    { label: 'Following', value: user.followingCount.toString(), icon: UserCheck, color: 'text-purple-500' }
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'XAUUSD Technical Analysis - Bullish Breakout Setup',
      category: 'Commodities',
      createdAt: new Date('2024-01-15'),
      views: 234,
      replies: 12,
      upvotes: 45
    },
    {
      id: '2',
      title: 'Risk Management: The 2% Rule Explained',
      category: 'Trading Psychology',
      createdAt: new Date('2024-01-14'),
      views: 189,
      replies: 8,
      upvotes: 32
    },
    {
      id: '3',
      title: 'Weekly Market Outlook: Fed Decision Impact',
      category: 'Forex',
      createdAt: new Date('2024-01-13'),
      views: 156,
      replies: 15,
      upvotes: 28
    }
  ];

  const achievements = [
    { name: 'Top Contributor', description: '100+ quality posts', icon: Award, color: 'text-yellow-500' },
    { name: 'Technical Expert', description: 'Verified technical analysis skills', icon: BarChart3, color: 'text-blue-500' },
    { name: 'Mentor', description: 'Helping other traders succeed', icon: Shield, color: 'text-green-500' },
    { name: 'Gold Specialist', description: 'Expert in precious metals trading', icon: Target, color: 'text-yellow-600' }
  ];

  const tradingStats = [
    { label: 'Trading Experience', value: `${user.tradingExperience} years`, icon: Calendar },
    { label: 'Specializations', value: user.specializations.join(', '), icon: Target },
    { label: 'Member Since', value: user.joinDate.toLocaleDateString(), icon: Calendar },
    { label: 'Last Active', value: user.lastActive.toLocaleDateString(), icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Forum
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-bold">{user.displayName}</h1>
                  <p className="text-sm text-foreground/70">@{user.username}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info Card */}
            <Card className="military-card">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <h2 className="text-xl font-bold">{user.displayName}</h2>
                    {user.isVerified && <Verified className="w-5 h-5 text-blue-500" />}
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <Badge className={`${
                    user.level === 'S-Tier' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    user.level === 'A-Tier' ? 'bg-primary/20 text-primary' :
                    user.level === 'B-Tier' ? 'bg-secondary/20 text-secondary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {user.level}
                  </Badge>
                </div>

                {user.bio && (
                  <p className="text-sm text-foreground/70 mb-4">{user.bio}</p>
                )}

                <div className="flex space-x-2 mb-4">
                  <Button 
                    className={`flex-1 ${isFollowing ? 'bg-muted' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  {user.location && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <a href={user.website} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges Card */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="text-lg">Badges & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.badges.map((badge: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-muted/20">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Trading Profile */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle>Trading Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {tradingStats.map((stat, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <stat.icon className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                              <div className="font-medium">{stat.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Reputation Score</div>
                          <div className="flex items-center space-x-3">
                            <Progress value={(user.reputation / 5000) * 100} className="flex-1" />
                            <span className="font-bold text-primary">{user.reputation}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Community Role</div>
                          <Badge className="bg-secondary/20 text-secondary">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                          <MessageCircle className="w-5 h-5 text-secondary mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{post.title}</h4>
                            <div className="text-sm text-muted-foreground mb-2">
                              in {post.category} • {post.createdAt.toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{post.upvotes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="space-y-6">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle>All Posts ({user.postCount})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <div key={post.id} className="p-4 border border-border/50 rounded-lg hover:bg-muted/10 transition-colors">
                          <h4 className="font-semibold mb-2">{post.title}</h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>{post.category}</span>
                              <span>{post.createdAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{post.upvotes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <MessageCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Posted in Gold Desk</div>
                          <div className="text-sm text-muted-foreground">2 hours ago</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-secondary/20 p-2 rounded-full">
                          <ThumbsUp className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium">Received 15 upvotes</div>
                          <div className="text-sm text-muted-foreground">4 hours ago</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Earned "Technical Expert" badge</div>
                          <div className="text-sm text-muted-foreground">1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                          <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                          <div>
                            <div className="font-semibold">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="military-card">
                    <CardHeader>
                      <CardTitle>Following ({user.followingCount})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Sample following list */}
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-secondary/20 text-secondary">
                              MM
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">MacroMaster</div>
                            <div className="text-xs text-muted-foreground">S-Tier • Macro Expert</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Unfollow
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="military-card">
                    <CardHeader>
                      <CardTitle>Followers ({user.followersCount})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Sample followers list */}
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/20 text-primary">
                              NT
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">NewTrader</div>
                            <div className="text-xs text-muted-foreground">C-Tier • Learning</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Follow Back
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};