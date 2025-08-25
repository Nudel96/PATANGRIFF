import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Share,
  Bookmark,
  Flag,
  MoreHorizontal,
  Eye,
  Clock,
  Target,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  Pin,
  Shield,
  Edit,
  Trash2,
  Send,
  Image,
  FileText,
  ExternalLink,
  Award,
  CheckCircle,
  AlertTriangle,
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  DollarSign,
  Activity
} from 'lucide-react';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onUserProfile: (userId: string) => void;
}

interface PostReply {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    level: string;
    reputation: number;
    badges: string[];
  };
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  parentId?: string;
  replies: PostReply[];
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId, onBack, onUserProfile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Sample post data (would come from API)
  const post = {
    id: '1',
    title: 'XAUUSD Breakout Strategy - 3R Setup with Volume Confirmation',
    content: `# Complete XAUUSD Breakout Strategy

After 18 months of development and testing, I'm sharing my systematic approach to gold breakouts above key resistance levels. This strategy has delivered consistent results with a 73% win rate and average 2.4R returns.

## Strategy Overview

This strategy focuses on:
- **Volume confirmation** on breakout candles
- **Multiple timeframe alignment** (1H, 4H, Daily)
- **Risk management** with clear stop placement
- **Target selection** based on measured moves

## Entry Criteria

1. **Structure Break**: Clean break above previous resistance
2. **Volume Spike**: 150%+ of average volume on breakout candle
3. **Timeframe Alignment**: Higher timeframe trend support
4. **Session Timing**: London or NY session preferred
5. **Risk/Reward**: Minimum 2:1 R:R ratio

## Risk Management

- **Stop Loss**: Below breakout structure (typically 20-30 pips)
- **Position Size**: 1-2% account risk per trade
- **Partial Profits**: 50% at 1.5R, remainder at 3R target

## Backtesting Results

- **Total Trades**: 234 over 18 months
- **Win Rate**: 73%
- **Average Winner**: +2.8R
- **Average Loser**: -0.9R
- **Expectancy**: +1.6R per trade
- **Maximum Drawdown**: 8.2%

## Live Example

Current setup forming on XAUUSD 4H chart. Watching for breakout above 2020 resistance with volume confirmation. Entry at 2021, stop at 2000, target at 2080 (3R setup).

*Risk Disclaimer: This is educational content only. Past performance does not guarantee future results.*`,
    author: {
      id: 'user1',
      username: 'goldwarrior',
      displayName: 'Gold Warrior',
      avatar: 'GW',
      level: 'A-Tier',
      reputation: 2847,
      badges: ['Gold Specialist', 'Strategy Developer', 'Mentor'],
      joinDate: '2022-03-15',
      postCount: 234,
      tradingStats: {
        winRate: 73,
        totalTrades: 234,
        avgReturn: 2.4,
        maxDrawdown: 8.2
      }
    },
    category: 'trading-strategies',
    subcategory: 'price-action',
    tags: ['gold', 'breakout', 'volume', 'strategy', 'backtesting'],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    views: 456,
    likes: 34,
    replies: 12,
    isPinned: false,
    isLocked: false,
    isFeatured: true,
    hasImages: true,
    hasCharts: true,
    tradingData: {
      asset: 'XAUUSD',
      direction: 'long',
      entryPrice: 2021,
      targetPrice: 2080,
      stopLoss: 2000,
      timeframe: '4H',
      confidence: 85,
      riskReward: 3.0
    },
    attachments: [
      { id: '1', name: 'XAUUSD_4H_Chart.png', type: 'image', size: 245000 },
      { id: '2', name: 'Backtesting_Results.xlsx', type: 'document', size: 156000 }
    ]
  };

  // Sample replies
  const [replies, setReplies] = useState<PostReply[]>([
    {
      id: '1',
      content: 'Excellent strategy breakdown! I\'ve been looking for a systematic approach to gold trading. Quick question: how do you handle news events like NFP or FOMC during your setups?',
      author: {
        id: 'user2',
        username: 'tradingnovice',
        displayName: 'Trading Novice',
        avatar: 'TN',
        level: 'B-Tier',
        reputation: 567,
        badges: ['Active Learner']
      },
      createdAt: new Date('2024-01-15T11:15:00'),
      likes: 8,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          content: 'Great question! I always check the economic calendar before entering. If high-impact news is within 2 hours, I either skip the trade or reduce position size by 50%. News can invalidate technical setups quickly.',
          author: {
            id: 'user1',
            username: 'goldwarrior',
            displayName: 'Gold Warrior',
            avatar: 'GW',
            level: 'A-Tier',
            reputation: 2847,
            badges: ['Gold Specialist', 'Strategy Developer', 'Mentor']
          },
          createdAt: new Date('2024-01-15T11:45:00'),
          likes: 12,
          isLiked: false,
          replies: []
        }
      ]
    },
    {
      id: '2',
      content: 'This is exactly what I needed! Been struggling with breakout trades. Your volume confirmation rule is brilliant. Do you use any specific volume indicators or just raw volume?',
      author: {
        id: 'user3',
        username: 'volumetrader',
        displayName: 'Volume Trader',
        avatar: 'VT',
        level: 'B-Tier',
        reputation: 1234,
        badges: ['Volume Expert']
      },
      createdAt: new Date('2024-01-15T12:30:00'),
      likes: 5,
      isLiked: false,
      replies: []
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReply = (parentId?: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: PostReply = {
      id: Date.now().toString(),
      content: replyContent,
      author: {
        id: 'current-user',
        username: 'currentuser',
        displayName: 'Current User',
        avatar: 'CU',
        level: 'A-Tier',
        reputation: 1500,
        badges: ['Active Member']
      },
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      parentId,
      replies: []
    };

    if (parentId) {
      // Add as nested reply
      setReplies(prev => prev.map(reply => 
        reply.id === parentId 
          ? { ...reply, replies: [...reply.replies, newReply] }
          : reply
      ));
    } else {
      // Add as top-level reply
      setReplies(prev => [...prev, newReply]);
    }

    setReplyContent('');
    setShowReplyForm(false);
    setReplyingTo(null);
  };

  const renderReply = (reply: PostReply, isNested = false) => (
    <div key={reply.id} className={`${isNested ? 'ml-8 border-l-2 border-border/50 pl-4' : ''}`}>
      <Card className="military-card">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8 cursor-pointer" onClick={() => onUserProfile(reply.author.id)}>
              <AvatarFallback className="text-xs">{reply.author.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium cursor-pointer hover:text-primary" onClick={() => onUserProfile(reply.author.id)}>
                  {reply.author.displayName}
                </span>
                <Badge className="text-xs">{reply.author.level}</Badge>
                {reply.author.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{reply.createdAt.toLocaleDateString()}</span>
              </div>
              
              <div className="prose prose-invert max-w-none mb-3">
                <p className="whitespace-pre-wrap text-sm">{reply.content}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => {/* handle like */}}
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {reply.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => {
                    setReplyingTo(reply.id);
                    setShowReplyForm(true);
                  }}
                >
                  <Reply className="w-3 h-3 mr-1" />
                  Reply
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Flag className="w-3 h-3 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Nested replies */}
      {reply.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {reply.replies.map(nestedReply => renderReply(nestedReply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Category
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Post */}
      <Card className="military-card">
        <CardContent className="p-6">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                {post.isFeatured && <Star className="w-4 h-4 text-secondary" />}
                <Badge className="text-xs bg-primary/10 text-primary">Trading Strategy</Badge>
                {post.tradingData && (
                  <Badge className={`text-xs ${
                    post.tradingData.direction === 'long' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                  }`}>
                    {post.tradingData.direction.toUpperCase()}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 cursor-pointer" onClick={() => onUserProfile(post.author.id)}>
                    <AvatarFallback>{post.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium cursor-pointer hover:text-primary" onClick={() => onUserProfile(post.author.id)}>
                        {post.author.displayName}
                      </span>
                      <Badge className="text-xs">{post.author.level}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{post.author.reputation} reputation</span>
                      <span>•</span>
                      <span>{post.author.postCount} posts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </span>
                </div>
              </div>

              {/* Author Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.author.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Data */}
          {post.tradingData && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Trading Setup Details</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Asset:</span>
                  <span className="ml-2 font-medium">{post.tradingData.asset}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Direction:</span>
                  <span className="ml-2 font-medium capitalize">{post.tradingData.direction}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Entry:</span>
                  <span className="ml-2 font-medium">{post.tradingData.entryPrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Target:</span>
                  <span className="ml-2 font-medium">{post.tradingData.targetPrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Stop Loss:</span>
                  <span className="ml-2 font-medium">{post.tradingData.stopLoss}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeframe:</span>
                  <span className="ml-2 font-medium">{post.tradingData.timeframe}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">R:R Ratio:</span>
                  <span className="ml-2 font-medium text-primary">{post.tradingData.riskReward}:1</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="ml-2 font-medium">{post.tradingData.confidence}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-invert max-w-none mb-6">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>

          {/* Attachments */}
          {post.attachments.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Attachments</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {post.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                    <div className="bg-secondary/20 p-2 rounded">
                      {attachment.type === 'image' ? (
                        <Image className="w-4 h-4 text-secondary" />
                      ) : (
                        <FileText className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{attachment.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(attachment.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={isLiked ? 'text-primary' : ''}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {post.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? 'text-secondary' : ''}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{post.replies} replies</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reply Form */}
      {showReplyForm && (
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="text-lg">
              {replyingTo ? 'Reply to Comment' : 'Reply to Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, questions, or insights..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
              />
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {replyContent.length}/1000 characters
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReply(replyingTo || undefined)}
                    disabled={!replyContent.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Replies Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Replies ({replies.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Sort by Best
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {replies.map(reply => renderReply(reply))}
          
          {replies.length === 0 && (
            <Card className="military-card">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No replies yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share your thoughts on this post!
                </p>
                <Button onClick={() => setShowReplyForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Reply className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Related Posts */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-secondary" />
            <span>Related Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: 'Gold Trading Psychology - Managing FOMO', author: 'MindfulTrader', replies: 8 },
              { title: 'Volume Analysis Techniques for Breakouts', author: 'VolumeExpert', replies: 15 },
              { title: 'Risk Management for Precious Metals', author: 'RiskMaster', replies: 12 }
            ].map((related, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                <div>
                  <h4 className="font-medium text-sm">{related.title}</h4>
                  <div className="text-xs text-muted-foreground">by {related.author}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {related.replies} replies
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};