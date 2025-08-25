import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Image,
  BarChart3,
  Link2,
  Hash,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  FileText,
  Camera,
  Paperclip,
  Globe,
  Users,
  Building2,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';

interface PostCreatorProps {
  onBack: () => void;
  onPostCreated: (postId: string) => void;
}

interface PostFormData {
  title: string;
  content: string;
  category: string;
  subcategory: string;
  tags: string[];
  postType: 'discussion' | 'trade-idea' | 'analysis' | 'question' | 'resource' | 'business' | 'event';
  tradingData?: {
    asset: string;
    direction: 'long' | 'short' | 'neutral';
    entryPrice?: number;
    targetPrice?: number;
    stopLoss?: number;
    timeframe: string;
    confidence: number;
    riskReward?: number;
  };
  businessData?: {
    type: 'opportunity' | 'partnership' | 'resource' | 'event';
    industry?: string;
    location?: string;
    budget?: string;
    timeline?: string;
    contactMethod?: string;
  };
  attachments: File[];
  isPublic: boolean;
  allowComments: boolean;
  notifyFollowers: boolean;
}

export const PostCreator: React.FC<PostCreatorProps> = ({ onBack, onPostCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    subcategory: '',
    tags: [],
    postType: 'discussion',
    attachments: [],
    isPublic: true,
    allowComments: true,
    notifyFollowers: false
  });

  const categories = [
    { id: 'trading-strategies', name: 'Trading Strategies & Systems', icon: Target },
    { id: 'market-analysis', name: 'Market Analysis & Research', icon: BarChart3 },
    { id: 'business-development', name: 'Business Development', icon: Building2 },
    { id: 'portfolio-showcase', name: 'Portfolio Showcase', icon: TrendingUp },
    { id: 'education-resources', name: 'Education & Resources', icon: FileText },
    { id: 'technology-tools', name: 'Technology & Tools', icon: Globe },
    { id: 'networking-events', name: 'Networking & Events', icon: Users }
  ];

  const postTypes = [
    { id: 'discussion', name: 'General Discussion', icon: MessageCircle, description: 'Open discussion on trading topics' },
    { id: 'trade-idea', name: 'Trade Idea', icon: Target, description: 'Specific trading opportunity with analysis' },
    { id: 'analysis', name: 'Market Analysis', icon: BarChart3, description: 'Detailed market or instrument analysis' },
    { id: 'question', name: 'Question', icon: HelpCircle, description: 'Ask for help or clarification' },
    { id: 'resource', name: 'Resource Share', icon: FileText, description: 'Share useful tools, articles, or materials' },
    { id: 'business', name: 'Business Opportunity', icon: Briefcase, description: 'Business partnerships or opportunities' },
    { id: 'event', name: 'Event Announcement', icon: Calendar, description: 'Announce meetups, webinars, or events' }
  ];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.content.trim()) throw new Error('Content is required');
      if (!formData.category) throw new Error('Category is required');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new post ID
      const newPostId = Date.now().toString();
      
      // Call success handler
      onPostCreated(newPostId);
      
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Create New Post</h3>
        <p className="text-muted-foreground">Share your knowledge with the warrior community</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postType">Post Type *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {postTypes.map(type => (
              <div
                key={type.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.postType === type.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, postType: type.id as any }))}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <type.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{type.name}</h4>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={formData.subcategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-action">Price Action Trading</SelectItem>
                <SelectItem value="technical-analysis">Technical Analysis</SelectItem>
                <SelectItem value="algorithmic">Algorithmic Trading</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Post Title *</Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title for your post..."
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">{formData.title.length}/100 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            placeholder="Share your insights, analysis, or discussion topic..."
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={8}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">{formData.content.length}/5000 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
            />
            <Button type="button" onClick={addTag} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                #{tag} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradingData = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Trading Information</h3>
        <p className="text-muted-foreground">Add trading-specific details to your post</p>
      </div>

      {(formData.postType === 'trade-idea' || formData.postType === 'analysis') && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="asset">Asset/Instrument *</Label>
              <Input
                id="asset"
                placeholder="e.g., EURUSD, XAUUSD, AAPL"
                value={formData.tradingData?.asset || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tradingData: { ...prev.tradingData!, asset: e.target.value }
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select 
                value={formData.tradingData?.direction || 'neutral'} 
                onValueChange={(value: 'long' | 'short' | 'neutral') => 
                  setFormData(prev => ({
                    ...prev,
                    tradingData: { ...prev.tradingData!, direction: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long (Bullish)</SelectItem>
                  <SelectItem value="short">Short (Bearish)</SelectItem>
                  <SelectItem value="neutral">Neutral/Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.tradingData?.entryPrice || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tradingData: { ...prev.tradingData!, entryPrice: parseFloat(e.target.value) }
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetPrice">Target Price</Label>
              <Input
                id="targetPrice"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.tradingData?.targetPrice || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tradingData: { ...prev.tradingData!, targetPrice: parseFloat(e.target.value) }
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input
                id="stopLoss"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.tradingData?.stopLoss || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tradingData: { ...prev.tradingData!, stopLoss: parseFloat(e.target.value) }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select 
                value={formData.tradingData?.timeframe || ''} 
                onValueChange={(value) => 
                  setFormData(prev => ({
                    ...prev,
                    tradingData: { ...prev.tradingData!, timeframe: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1M">1 Minute</SelectItem>
                  <SelectItem value="5M">5 Minutes</SelectItem>
                  <SelectItem value="15M">15 Minutes</SelectItem>
                  <SelectItem value="1H">1 Hour</SelectItem>
                  <SelectItem value="4H">4 Hours</SelectItem>
                  <SelectItem value="1D">Daily</SelectItem>
                  <SelectItem value="1W">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confidence">Confidence Level (%)</Label>
              <Input
                id="confidence"
                type="number"
                min="0"
                max="100"
                placeholder="85"
                value={formData.tradingData?.confidence || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tradingData: { ...prev.tradingData!, confidence: parseInt(e.target.value) }
                }))}
              />
            </div>
          </div>

          {/* Risk/Reward Calculation */}
          {formData.tradingData?.entryPrice && formData.tradingData?.targetPrice && formData.tradingData?.stopLoss && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Risk/Reward Analysis</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Risk:</span>
                  <span className="ml-2 font-medium">
                    {Math.abs(formData.tradingData.entryPrice - formData.tradingData.stopLoss).toFixed(5)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Reward:</span>
                  <span className="ml-2 font-medium">
                    {Math.abs(formData.tradingData.targetPrice - formData.tradingData.entryPrice).toFixed(5)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">R:R Ratio:</span>
                  <span className="ml-2 font-medium text-primary">
                    {(Math.abs(formData.tradingData.targetPrice - formData.tradingData.entryPrice) / 
                      Math.abs(formData.tradingData.entryPrice - formData.tradingData.stopLoss)).toFixed(2)}:1
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {formData.postType === 'business' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select 
                value={formData.businessData?.type || ''} 
                onValueChange={(value: 'opportunity' | 'partnership' | 'resource' | 'event') => 
                  setFormData(prev => ({
                    ...prev,
                    businessData: { ...prev.businessData!, type: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opportunity">Business Opportunity</SelectItem>
                  <SelectItem value="partnership">Partnership Proposal</SelectItem>
                  <SelectItem value="resource">Business Resource</SelectItem>
                  <SelectItem value="event">Business Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Fintech, Education, Trading"
                value={formData.businessData?.industry || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  businessData: { ...prev.businessData!, industry: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget/Investment</Label>
              <Input
                id="budget"
                placeholder="e.g., $10k-50k, Equity-based"
                value={formData.businessData?.budget || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  businessData: { ...prev.businessData!, budget: e.target.value }
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 3-6 months, Immediate"
                value={formData.businessData?.timeline || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  businessData: { ...prev.businessData!, timeline: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., New York, Remote, Global"
              value={formData.businessData?.location || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                businessData: { ...prev.businessData!, location: e.target.value }
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderAttachments = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Attachments & Media</h3>
        <p className="text-muted-foreground">Add charts, images, and documents to support your post</p>
      </div>

      <div className="space-y-4">
        {/* File Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Upload Files</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>
          </div>

          {/* Attachment List */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Attached Files</h4>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary/20 p-2 rounded">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-secondary" />
                        ) : (
                          <FileText className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Post Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold">Post Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked as boolean }))}
              />
              <Label htmlFor="isPublic">Make post public (visible to all members)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowComments"
                checked={formData.allowComments}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowComments: checked as boolean }))}
              />
              <Label htmlFor="allowComments">Allow comments and replies</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifyFollowers"
                checked={formData.notifyFollowers}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifyFollowers: checked as boolean }))}
              />
              <Label htmlFor="notifyFollowers">Notify my followers about this post</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Post Preview</h3>
        <p className="text-muted-foreground">Review your post before publishing</p>
      </div>

      <Card className="military-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="text-xs bg-primary/10 text-primary">
                  {postTypes.find(t => t.id === formData.postType)?.name}
                </Badge>
                {formData.tradingData?.direction && (
                  <Badge className={`text-xs ${
                    formData.tradingData.direction === 'long' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                  }`}>
                    {formData.tradingData.direction.toUpperCase()}
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-xl mb-3">{formData.title}</h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">YU</span>
                </div>
                <span className="text-sm font-medium">Your Username</span>
                <Badge className="text-xs">A-Tier</Badge>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none mb-4">
            <p className="whitespace-pre-wrap">{formData.content}</p>
          </div>
          
          {/* Trading Data Preview */}
          {formData.tradingData && formData.tradingData.asset && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-4">
              <h4 className="font-semibold text-primary mb-3">Trading Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Asset:</span>
                  <span className="ml-2 font-medium">{formData.tradingData.asset}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Direction:</span>
                  <span className="ml-2 font-medium">{formData.tradingData.direction}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeframe:</span>
                  <span className="ml-2 font-medium">{formData.tradingData.timeframe}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="ml-2 font-medium">{formData.tradingData.confidence}%</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Tags Preview */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Attachments Preview */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Attachments</h4>
              <div className="flex flex-wrap gap-2">
                {formData.attachments.map((file, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Paperclip className="w-3 h-3 mr-1" />
                    {file.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
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
            Back to Category
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New Post</h1>
            <p className="text-sm text-muted-foreground">Share your insights with the community</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === currentStep
                ? 'bg-primary text-primary-foreground'
                : step < currentStep
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="military-card">
        <CardContent className="p-6">
          {!previewMode ? (
            <>
              {currentStep === 1 && renderBasicInfo()}
              {currentStep === 2 && renderTradingData()}
              {currentStep === 3 && renderAttachments()}
            </>
          ) : (
            renderPreview()
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (currentStep === 1) {
              onBack();
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
          disabled={isLoading}
        >
          {currentStep === 1 ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </>
          )}
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </span>
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && (!formData.title.trim() || !formData.content.trim() || !formData.category)) ||
                (currentStep === 2 && formData.postType === 'trade-idea' && !formData.tradingData?.asset)
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !formData.title.trim() || !formData.content.trim() || !formData.category}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Publish Post
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};