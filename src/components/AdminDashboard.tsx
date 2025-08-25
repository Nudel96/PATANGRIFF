import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Shield,
  Users,
  MessageCircle,
  Flag,
  Eye,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Pin,
  Star,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Settings,
  UserCheck,
  UserX,
  Ban,
  Award,
  Target,
  Zap,
  Globe,
  Calendar,
  FileText,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

interface ModerationItem {
  id: string;
  type: 'post' | 'reply' | 'user' | 'report';
  title: string;
  description: string;
  author: string;
  reportedBy?: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
  category: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Sample admin data
  const adminStats = {
    totalUsers: 12456,
    activeUsers: 3247,
    totalPosts: 4847,
    postsToday: 132,
    pendingReports: 8,
    moderationQueue: 15,
    bannedUsers: 23,
    featuredPosts: 12
  };

  const moderationQueue: ModerationItem[] = [
    {
      id: '1',
      type: 'report',
      title: 'Inappropriate trading advice',
      description: 'User providing unlicensed financial advice without proper disclaimers',
      author: 'BadActor123',
      reportedBy: 'ConcernedMember',
      reason: 'Unlicensed financial advice',
      severity: 'high',
      status: 'pending',
      createdAt: new Date('2024-01-15T14:30:00'),
      category: 'trading-strategies'
    },
    {
      id: '2',
      type: 'post',
      title: 'Spam promotion in trading strategies',
      description: 'Multiple promotional posts for external trading course',
      author: 'SpamUser456',
      reason: 'Spam/Self-promotion',
      severity: 'medium',
      status: 'pending',
      createdAt: new Date('2024-01-15T13:15:00'),
      category: 'trading-strategies'
    },
    {
      id: '3',
      type: 'user',
      title: 'Harassment in community discussions',
      description: 'User engaging in personal attacks and harassment',
      author: 'ToxicTrader',
      reportedBy: 'VictimUser',
      reason: 'Harassment/Abuse',
      severity: 'critical',
      status: 'pending',
      createdAt: new Date('2024-01-15T12:45:00'),
      category: 'general'
    }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'NewTrader123', time: '5 minutes ago', type: 'user' },
    { action: 'Post reported for spam', user: 'SpamUser456', time: '15 minutes ago', type: 'report' },
    { action: 'User banned for violations', user: 'ViolatorUser', time: '1 hour ago', type: 'moderation' },
    { action: 'Featured post added', user: 'GoldWarrior', time: '2 hours ago', type: 'content' },
    { action: 'Category rules updated', user: 'AdminUser', time: '3 hours ago', type: 'system' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return FileText;
      case 'reply': return MessageCircle;
      case 'user': return Users;
      case 'report': return Flag;
      default: return AlertTriangle;
    }
  };

  const handleModerationAction = (itemId: string, action: 'approve' | 'reject' | 'ban' | 'delete') => {
    console.log(`Moderation action: ${action} on item ${itemId}`);
    // Implement moderation logic
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-primary">{adminStats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold text-secondary">{adminStats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reports</p>
                <p className="text-2xl font-bold text-orange-500">{adminStats.pendingReports}</p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-xl">
                <Flag className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts Today</p>
                <p className="text-2xl font-bold text-primary">{adminStats.postsToday}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-secondary" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-primary/10' :
                  activity.type === 'report' ? 'bg-orange-500/10' :
                  activity.type === 'moderation' ? 'bg-red-500/10' :
                  activity.type === 'content' ? 'bg-secondary/10' : 'bg-muted'
                }`}>
                  {activity.type === 'user' && <Users className="w-4 h-4 text-primary" />}
                  {activity.type === 'report' && <Flag className="w-4 h-4 text-orange-500" />}
                  {activity.type === 'moderation' && <Shield className="w-4 h-4 text-red-500" />}
                  {activity.type === 'content' && <Star className="w-4 h-4 text-secondary" />}
                  {activity.type === 'system' && <Settings className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderModeration = () => (
    <div className="space-y-6">
      {/* Moderation Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Moderation Queue</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search moderation items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Moderation Items */}
      <div className="space-y-4">
        {moderationQueue.map(item => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <Card key={item.id} className="military-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge className={getSeverityColor(item.severity)}>
                          {item.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                        <span>Author: {item.author}</span>
                        {item.reportedBy && <span>Reported by: {item.reportedBy}</span>}
                        <span>Category: {item.category}</span>
                        <span>{item.createdAt.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="bg-muted/10 p-3 rounded-lg">
                        <p className="text-sm"><strong>Reason:</strong> {item.reason}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleModerationAction(item.id, 'approve')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleModerationAction(item.id, 'reject')}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    {item.severity === 'critical' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleModerationAction(item.id, 'ban')}
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        Ban User
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Forum Analytics</h2>
      
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Engagement Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Daily Active Users:</span>
                <span className="font-bold text-primary">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Posts per Day:</span>
                <span className="font-bold text-secondary">+8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reply Rate:</span>
                <span className="font-bold text-primary">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <span>Content Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quality Score:</span>
                <span className="font-bold text-primary">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Spam Rate:</span>
                <span className="font-bold text-secondary">0.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Report Rate:</span>
                <span className="font-bold text-primary">1.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Community Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Member Retention:</span>
                <span className="font-bold text-primary">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Satisfaction Score:</span>
                <span className="font-bold text-secondary">4.7/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Moderators:</span>
                <span className="font-bold text-primary">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Trading Strategies', posts: 1044, engagement: 89, growth: 12 },
              { name: 'Market Analysis', posts: 1344, engagement: 92, growth: 8 },
              { name: 'Business Development', posts: 402, engagement: 76, growth: 25 },
              { name: 'Portfolio Showcase', posts: 722, engagement: 94, growth: 15 }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                <div>
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">{category.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-secondary">+{category.growth}%</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* User List */}
      <Card className="military-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left p-4 font-semibold">User</th>
                  <th className="text-center p-4 font-semibold">Level</th>
                  <th className="text-center p-4 font-semibold">Reputation</th>
                  <th className="text-center p-4 font-semibold">Posts</th>
                  <th className="text-center p-4 font-semibold">Status</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { username: 'goldwarrior', displayName: 'Gold Warrior', level: 'A-Tier', reputation: 2847, posts: 234, status: 'Active' },
                  { username: 'strategymaster', displayName: 'Strategy Master', level: 'S-Tier', reputation: 3456, posts: 189, status: 'Active' },
                  { username: 'riskexpert', displayName: 'Risk Expert', level: 'A-Tier', reputation: 2134, posts: 156, status: 'Active' }
                ].map((user, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{user.displayName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.displayName}</div>
                          <div className="text-xs text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="text-xs">{user.level}</Badge>
                    </td>
                    <td className="p-4 text-center font-medium">{user.reputation}</td>
                    <td className="p-4 text-center">{user.posts}</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-primary/10 text-primary text-xs">{user.status}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Forum Settings</h2>
      
      {/* General Settings */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Content Moderation</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-moderate spam</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require post approval</span>
                  <Button variant="outline" size="sm">Disabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Image moderation</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">User Permissions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New user posting</span>
                  <Button variant="outline" size="sm">Immediate</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Image uploads</span>
                  <Button variant="outline" size="sm">Verified Only</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Private messaging</span>
                  <Button variant="outline" size="sm">All Users</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Management */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Forum Categories</h4>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Trading Strategies', posts: 1044, active: true },
                { name: 'Market Analysis', posts: 1344, active: true },
                { name: 'Business Development', posts: 402, active: true },
                { name: 'Portfolio Showcase', posts: 722, active: true }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div>
                    <h5 className="font-medium">{category.name}</h5>
                    <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={category.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}>
                      {category.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forum
          </Button>
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-sm text-foreground/70">Forum management and moderation</p>
            </div>
          </div>
        </div>
        
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Shield className="w-4 h-4 mr-2" />
          Administrator
        </Badge>
      </div>

      {/* Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="moderation">
            Moderation
            {adminStats.pendingReports > 0 && (
              <Badge className="ml-2 bg-orange-500/10 text-orange-500 text-xs">
                {adminStats.pendingReports}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="moderation">
          {renderModeration()}
        </TabsContent>

        <TabsContent value="users">
          {renderUsers()}
        </TabsContent>

        <TabsContent value="settings">
          {renderSettings()}
        </TabsContent>
      </Tabs>
    </div>
  );
};