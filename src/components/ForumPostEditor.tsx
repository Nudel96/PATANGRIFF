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
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  BarChart3,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  X,
  Plus,
  Eye,
  Save,
  Send,
  FileText,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Tag,
  Hash,
  AlertTriangle,
  Info,
  CheckCircle,
  Zap
} from 'lucide-react';

interface ForumPostEditorProps {
  category: any;
  onSave: (postData: any) => void;
  onCancel: () => void;
  editingPost?: any;
}

interface PostFormData {
  title: string;
  content: string;
  type: 'discussion' | 'question' | 'analysis' | 'news' | 'poll' | 'trade-idea';
  subCategory: string;
  tags: string[];
  isPrivate: boolean;
  allowComments: boolean;
  notifyFollowers: boolean;
  scheduledDate?: Date;
  tradingData?: {
    instrument: string;
    direction: 'long' | 'short';
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    timeframe: string;
    analysis: string;
  };
  pollData?: {
    question: string;
    options: string[];
    allowMultiple: boolean;
    expiresIn: number;
  };
  attachments: File[];
  chartImages: File[];
}

export const ForumPostEditor: React.FC<ForumPostEditorProps> = ({
  category,
  onSave,
  onCancel,
  editingPost
}) => {
  const [activeTab, setActiveTab] = useState('compose');
  const [isPreview, setIsPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PostFormData>({
    title: editingPost?.title || '',
    content: editingPost?.content || '',
    type: editingPost?.type || 'discussion',
    subCategory: editingPost?.subCategory || '',
    tags: editingPost?.tags || [],
    isPrivate: false,
    allowComments: true,
    notifyFollowers: true,
    attachments: [],
    chartImages: []
  });

  const postTypes = [
    { id: 'discussion', name: 'Discussion', icon: MessageCircle, description: 'General discussion topic' },
    { id: 'question', name: 'Question', icon: MessageSquare, description: 'Ask for help or advice' },
    { id: 'analysis', name: 'Analysis', icon: BarChart3, description: 'Market or technical analysis' },
    { id: 'trade-idea', name: 'Trade Idea', icon: TrendingUp, description: 'Share a trading setup' },
    { id: 'news', name: 'News', icon: Bell, description: 'Market news and updates' },
    { id: 'poll', name: 'Poll', icon: Target, description: 'Community poll or survey' }
  ];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'attachment' | 'chart') => {
    const files = Array.from(event.target.files || []);
    if (type === 'attachment') {
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
    } else {
      setFormData(prev => ({ ...prev, chartImages: [...prev.chartImages, ...files] }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return; // Show validation error
    }

    const postData = {
      ...formData,
      category: category?.id,
      createdAt: new Date(),
      author: 'current-user' // Would come from auth context
    };

    onSave(postData);
  };

  const renderToolbar = () => (
    <div className="flex items-center space-x-2 p-3 border-b border-border/50 bg-muted/10">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Underline className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="w-px h-6 bg-border/50" />
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="w-px h-6 bg-border/50" />
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Quote className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Code className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="w-px h-6 bg-border/50" />
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
          <Image className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => chartInputRef.current?.click()}>
          <BarChart3 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Link className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1" />
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsPreview(!isPreview)}
      >
        <Eye className="w-4 h-4 mr-2" />
        {isPreview ? 'Edit' : 'Preview'}
      </Button>
    </div>
  );

  const renderTradingDataForm = () => (
    <Card className="military-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Trading Setup Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instrument">Instrument</Label>
            <Input
              id="instrument"
              placeholder="e.g., XAUUSD, EURUSD"
              value={formData.tradingData?.instrument || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tradingData: { ...prev.tradingData!, instrument: e.target.value }
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select 
              value={formData.tradingData?.direction || 'long'} 
              onValueChange={(value: 'long' | 'short') => setFormData(prev => ({
                ...prev,
                tradingData: { ...prev.tradingData!, direction: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
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
          <div className="space-y-2">
            <Label htmlFor="takeProfit">Take Profit</Label>
            <Input
              id="takeProfit"
              type="number"
              step="0.00001"
              placeholder="0.00000"
              value={formData.tradingData?.takeProfit || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tradingData: { ...prev.tradingData!, takeProfit: parseFloat(e.target.value) }
              }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select 
              value={formData.tradingData?.timeframe || '4H'} 
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                tradingData: { ...prev.tradingData!, timeframe: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
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
            <Label>Risk/Reward Ratio</Label>
            <div className="p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-bold text-primary">
                {formData.tradingData?.entryPrice && formData.tradingData?.stopLoss && formData.tradingData?.takeProfit
                  ? (Math.abs(formData.tradingData.takeProfit - formData.tradingData.entryPrice) / 
                     Math.abs(formData.tradingData.entryPrice - formData.tradingData.stopLoss)).toFixed(2)
                  : '0.00'}:1
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="analysis">Analysis Summary</Label>
          <Textarea
            id="analysis"
            placeholder="Brief summary of your analysis and reasoning..."
            value={formData.tradingData?.analysis || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              tradingData: { ...prev.tradingData!, analysis: e.target.value }
            }))}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderPollForm = () => (
    <Card className="military-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-secondary" />
          <span>Poll Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pollQuestion">Poll Question</Label>
          <Input
            id="pollQuestion"
            placeholder="What's your outlook for the market this week?"
            value={formData.pollData?.question || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              pollData: { ...prev.pollData!, question: e.target.value }
            }))}
          />
        </div>

        <div className="space-y-3">
          <Label>Poll Options</Label>
          {(formData.pollData?.options || ['', '']).map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...(formData.pollData?.options || [])];
                  newOptions[index] = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    pollData: { ...prev.pollData!, options: newOptions }
                  }));
                }}
              />
              {index > 1 && (
                <Button variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowMultiple"
              checked={formData.pollData?.allowMultiple || false}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                pollData: { ...prev.pollData!, allowMultiple: checked as boolean }
              }))}
            />
            <Label htmlFor="allowMultiple">Allow multiple selections</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiresIn">Expires in (days)</Label>
            <Select 
              value={(formData.pollData?.expiresIn || 7).toString()} 
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                pollData: { ...prev.pollData!, expiresIn: parseInt(value) }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="trading" disabled={formData.type !== 'trade-idea'}>Trading Setup</TabsTrigger>
          <TabsTrigger value="poll" disabled={formData.type !== 'poll'}>Poll Options</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          {/* Post Type Selection */}
          <Card className="military-card">
            <CardHeader>
              <CardTitle>Post Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {postTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.type === type.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <type.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Basic Post Information */}
          <Card className="military-card">
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your post..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub-Category</Label>
                <Select value={formData.subCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category?.subCategories.map((sub: any) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      #{tag} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="military-card">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {renderToolbar()}
              <div className="p-4">
                {isPreview ? (
                  <div className="min-h-[300px] prose prose-invert max-w-none">
                    <h3>{formData.title}</h3>
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  </div>
                ) : (
                  <Textarea
                    placeholder="Share your insights, analysis, or questions with the community..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    className="border-0 resize-none focus:ring-0"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Uploads */}
          <Card className="military-card">
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Images & Files</Label>
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'attachment')}
                      className="hidden"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Trading Charts</Label>
                  <div className="mt-2">
                    <input
                      ref={chartInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'chart')}
                      className="hidden"
                    />
                    <Button variant="outline" onClick={() => chartInputRef.current?.click()}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Upload Charts
                    </Button>
                  </div>
                  {formData.chartImages.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.chartImages.map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading">
          {renderTradingDataForm()}
        </TabsContent>

        <TabsContent value="poll">
          {renderPollForm()}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="military-card">
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="notifyFollowers">Notify my followers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPrivate: checked as boolean }))}
                />
                <Label htmlFor="isPrivate">Private post (only visible to followers)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.title.trim() || !formData.content.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish Post
          </Button>
        </div>
      </div>
    </div>
  );
};