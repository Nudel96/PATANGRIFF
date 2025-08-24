import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Award,
  Calendar,
  BookOpen,
  Target,
  Brain,
  Building2,
  Search,
  Filter,
  Plus,
  Eye,
  ThumbsUp,
  Clock,
  ArrowRight,
  Zap,
  Trophy,
  Shield,
  Globe,
  Activity,
  FileText,
  Camera,
  BarChart3,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Flame,
  TrendingDown,
  MapPin,
  Bell,
  Settings,
  HelpCircle,
  Flag,
  Edit,
  Share,
  Bookmark,
  Hash,
  ChevronRight,
  PlayCircle,
  Video,
  Mic,
  Image,
  Link,
  Quote
} from 'lucide-react';

interface Post {
  id: string;
  type: 'trade-idea' | 'trade-recap' | 'macro-thesis' | 'question' | 'resource' | 'mindset' | 'business';
  title: string;
  author: string;
  authorLevel: string;
  timestamp: string;
  content: string;
  asset?: string;
  direction?: 'long' | 'short';
  timeframe?: string;
  setupType?: string;
  rMultiple?: number;
  outcome?: 'win' | 'loss' | 'breakeven';
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  hasImage: boolean;
  isQualityVerified: boolean;
  isWikiCandidate: boolean;
}

interface Squad {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  meetingCadence: string;
  tags: string[];
  isOpen: boolean;
}

interface Event {
  id: string;
  title: string;
  type: 'ama' | 'workshop' | 'review' | 'market-prep';
  date: string;
  time: string;
  host: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
}

export const Community = () => {

  return (
    <section id="community" className="section-padding">
      <div className="container-max mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Brotherhood of Warriors
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Brotherhood of
            <span className="block gradient-text">Market Warriors</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Connect with operators who understand that weakness is not an option. 
            Share the battlefield with warriors whose results command entrepreneurial respect.
          </p>
        </div>

        {/* Community Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Squads Feature */}
          <div className="military-card">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Elite Squads</h3>
                <p className="text-primary font-semibold">Focused Learning & Accountability Groups</p>
              </div>
            </div>
            
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Join intimate groups of 4-8 dedicated traders focused on specific goals, strategies, or skill development. 
              Squads provide structured accountability through regular check-ins, shared challenges, and peer mentorship 
              that accelerates your trading development through collective commitment and mutual support.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/80">Small, focused groups for maximum accountability</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/80">Regular meetings and progress tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/80">Peer mentorship and collaborative learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/80">Specialized focus areas and trading strategies</span>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Active Squads</span>
              </div>
              <div className="text-xs text-foreground/60">
                Gold Trading Masters • Macro Analysis Group • Psychology Warriors • Risk Management Experts
              </div>
            </div>
          </div>

          {/* Forum Feature */}
          <div className="military-card">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-secondary/10 p-4 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Discussion Forums</h3>
                <p className="text-secondary font-semibold">Knowledge Exchange & Market Analysis</p>
              </div>
            </div>
            
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Engage in structured discussions across specialized trading topics within organized forum categories. 
              Share trade ideas, market analysis, and insights while learning from experienced traders through 
              threaded conversations that support rich content including charts, detailed explanations, and real-time market commentary.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/80">Organized categories for focused discussions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/80">Quality-verified content and expert insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/80">Trade ideas, market analysis, and strategy sharing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/80">Community-driven moderation and reputation system</span>
              </div>
            </div>
            <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">Popular Forums</span>
              </div>
              <div className="text-xs text-foreground/60">
                Gold Desk • FX Majors • Strategy Development • Market Psychology • Technical Analysis
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="military-card text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-sm text-foreground/70">Active Members</div>
          </div>
          
          <div className="military-card text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-2">1,200+</div>
            <div className="text-sm text-foreground/70">Daily Discussions</div>
          </div>
          
          <div className="military-card text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-foreground/70">Active Squads</div>
          </div>
          
          <div className="military-card text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-sm text-foreground/70">Community Support</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="military-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Brotherhood?</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Connect with serious traders who understand that success requires discipline, accountability, 
              and continuous learning. Join our community of warriors committed to trading excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                Join the Community
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-secondary/20 hover:bg-secondary/10 px-8 py-4">
                Learn More About Membership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};