import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, 
  Target, 
  Shield, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Calendar,
  Clock,
  Flag,
  Tag,
  Settings,
  BookOpen,
  TrendingUp,
  Building2,
  Brain,
  Award,
  Lightbulb,
  MessageCircle,
  Briefcase,
  GraduationCap,
  HandHeart,
  Network,
  Rocket,
  Zap
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'trading' | 'business' | 'learning' | 'accountability';
  priority: 'low' | 'medium' | 'high';
  assignedDate: Date;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  tags: string[];
  estimatedHours?: number;
}

interface CreateSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSquadCreated: (squad: any) => void;
  pastTasks: Task[];
}

interface SquadFormData {
  name: string;
  description: string;
  category: string;
  privacy: 'open' | 'application' | 'invite' | 'private';
  maxMembers: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  activityLevel: 'low' | 'medium' | 'high' | 'very-high';
  meetingCadence: string;
  timezone: string;
  language: string;
  region: string;
  tags: string[];
  goals: string[];
  rules: string[];
  requirements: string[];
  focusAreas: string[];
  selectedTasks: string[];
}

export const CreateSquadModal: React.FC<CreateSquadModalProps> = ({
  isOpen,
  onClose,
  onSquadCreated,
  pastTasks
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const [formData, setFormData] = useState<SquadFormData>({
    name: '',
    description: '',
    category: '',
    privacy: 'open',
    maxMembers: 8,
    skillLevel: 'mixed',
    activityLevel: 'medium',
    meetingCadence: 'weekly',
    timezone: 'America/New_York',
    language: 'English',
    region: '',
    tags: [],
    goals: [],
    rules: [],
    requirements: [],
    focusAreas: [],
    selectedTasks: []
  });

  const squadCategories = [
    { 
      id: 'trading-strategies', 
      name: 'Trading Strategies', 
      icon: TrendingUp, 
      description: 'Focus on developing and refining trading strategies, market analysis, and execution techniques' 
    },
    { 
      id: 'business-development', 
      name: 'Business Development', 
      icon: Building2, 
      description: 'Entrepreneurship, scaling trading operations, and building trading-related businesses' 
    },
    { 
      id: 'skill-learning', 
      name: 'Skill Learning', 
      icon: GraduationCap, 
      description: 'Structured learning groups for courses, certifications, and skill development' 
    },
    { 
      id: 'accountability', 
      name: 'Accountability', 
      icon: Target, 
      description: 'Goal tracking, habit formation, and mutual support for consistent progress' 
    },
    { 
      id: 'mentorship', 
      name: 'Mentorship', 
      icon: HandHeart, 
      description: 'Mentor-mentee relationships and knowledge transfer between experienced and new traders' 
    },
    { 
      id: 'project-based', 
      name: 'Project Based', 
      icon: Rocket, 
      description: 'Collaborative projects, research initiatives, and group challenges' 
    },
    { 
      id: 'networking', 
      name: 'Networking', 
      icon: Network, 
      description: 'Professional connections, industry relationships, and career development' 
    },
    { 
      id: 'study-groups', 
      name: 'Study Groups', 
      icon: BookOpen, 
      description: 'Structured study sessions for trading education and market analysis' 
    }
  ];

  const privacyLevels = [
    {
      id: 'open',
      name: 'Open',
      icon: Globe,
      description: 'Anyone can join immediately without approval'
    },
    {
      id: 'application',
      name: 'Application Required',
      icon: Eye,
      description: 'Members must apply and be approved by squad leaders'
    },
    {
      id: 'invite',
      name: 'Invite Only',
      icon: Shield,
      description: 'Members can only join through direct invitations'
    },
    {
      id: 'private',
      name: 'Private',
      icon: Lock,
      description: 'Completely private, invitation only with strict access control'
    }
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

  const addGoal = () => {
    if (newGoal.trim()) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleTaskSelection = (taskId: string, selected: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedTasks: selected 
        ? [...prev.selectedTasks, taskId]
        : prev.selectedTasks.filter(id => id !== taskId)
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Squad name is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Squad description is required');
      }
      if (!formData.category) {
        throw new Error('Squad category is required');
      }

      // Get selected tasks to include in squad
      const selectedTasksData = pastTasks.filter(task => 
        formData.selectedTasks.includes(task.id)
      );

      // Create squad object
      const newSquad = {
        id: Date.now().toString(),
        ...formData,
        includedTasks: selectedTasksData,
        createdAt: new Date(),
        leaderId: 'current-user-id', // Would come from auth context
        memberIds: ['current-user-id'],
        currentMembers: 1,
        isActive: true,
        lastActivity: new Date()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call success handler
      onSquadCreated(newSquad);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        privacy: 'open',
        maxMembers: 8,
        skillLevel: 'mixed',
        activityLevel: 'medium',
        meetingCadence: 'weekly',
        timezone: 'America/New_York',
        language: 'English',
        region: '',
        tags: [],
        goals: [],
        rules: [],
        requirements: [],
        focusAreas: [],
        selectedTasks: []
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Error creating squad:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTaskCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return TrendingUp;
      case 'business': return Building2;
      case 'learning': return BookOpen;
      case 'accountability': return Target;
      default: return Flag;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Basic Information</h3>
        <p className="text-muted-foreground">Give your squad a name and describe its purpose</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="squadName">Squad Name *</Label>
          <Input
            id="squadName"
            placeholder="e.g., Gold Trading Masters, Macro Analysis Group"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="squadDescription">Description *</Label>
          <Textarea
            id="squadDescription"
            placeholder="Describe your squad's purpose, goals, and what members can expect..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Tags (for discoverability)</Label>
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
                {tag} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Category & Privacy</h3>
        <p className="text-muted-foreground">Choose your squad's focus area and access level</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Squad Category *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {squadCategories.map((category) => (
              <div
                key={category.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.category === category.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Privacy Level *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {privacyLevels.map((level) => (
              <div
                key={level.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.privacy === level.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-border hover:border-secondary/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, privacy: level.id as any }))}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-secondary/20 p-2 rounded-lg">
                    <level.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{level.name}</h4>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Squad Settings</h3>
        <p className="text-muted-foreground">Configure member limits and activity expectations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Select value={formData.maxMembers.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, maxMembers: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 members</SelectItem>
                <SelectItem value="6">6 members</SelectItem>
                <SelectItem value="8">8 members</SelectItem>
                <SelectItem value="10">10 members</SelectItem>
                <SelectItem value="12">12 members</SelectItem>
                <SelectItem value="15">15 members</SelectItem>
                <SelectItem value="20">20 members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">Target Skill Level</Label>
            <Select value={formData.skillLevel} onValueChange={(value: any) => setFormData(prev => ({ ...prev, skillLevel: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="mixed">Mixed Levels</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel">Expected Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={(value: any) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Few messages per week)</SelectItem>
                <SelectItem value="medium">Medium (Daily interaction)</SelectItem>
                <SelectItem value="high">High (Multiple daily interactions)</SelectItem>
                <SelectItem value="very-high">Very High (Constant engagement)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meetingCadence">Meeting Schedule</Label>
            <Select value={formData.meetingCadence} onValueChange={(value) => setFormData(prev => ({ ...prev, meetingCadence: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="as-needed">As needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={formData.timezone} onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Primary Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Goals & Past Tasks</h3>
        <p className="text-muted-foreground">Set squad objectives and include relevant past tasks</p>
      </div>

      <div className="space-y-6">
        {/* Squad Goals */}
        <div className="space-y-4">
          <Label>Squad Goals</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            />
            <Button type="button" onClick={addGoal} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                <span className="text-sm">{goal}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, goals: prev.goals.filter((_, i) => i !== index) }))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Past Tasks Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Include Past Tasks ({pastTasks.length} available)</Label>
            <Badge className="bg-primary/10 text-primary">
              {formData.selectedTasks.length} selected
            </Badge>
          </div>
          
          {pastTasks.length === 0 ? (
            <div className="text-center py-8 bg-muted/10 rounded-lg">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="font-semibold mb-2">No Past Tasks Found</h4>
              <p className="text-sm text-muted-foreground">
                You can still create your squad. Tasks can be added later once you start collaborating.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pastTasks.map((task) => {
                const CategoryIcon = getTaskCategoryIcon(task.category);
                const isSelected = formData.selectedTasks.includes(task.id);
                
                return (
                  <div
                    key={task.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleTaskSelection(task.id, !isSelected)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => {}} // Handled by parent click
                        />
                        <div className="bg-primary/20 p-1 rounded">
                          <CategoryIcon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{task.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getTaskPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Assigned: {task.assignedDate.toLocaleDateString()}</span>
                          {task.dueDate && <span>Due: {task.dueDate.toLocaleDateString()}</span>}
                          {task.estimatedHours && <span>{task.estimatedHours}h estimated</span>}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Squad Rules */}
        <div className="space-y-4">
          <Label>Squad Rules (Optional)</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a rule..."
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRule()}
            />
            <Button type="button" onClick={addRule} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.rules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                <span className="text-sm">{rule}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((step) => (
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
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="gradient-text">Create New Squad</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {renderStepIndicator()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : prevStep}
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
                Step {currentStep} of 4
              </span>
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!formData.name.trim() || !formData.description.trim())) ||
                    (currentStep === 2 && (!formData.category || !formData.privacy))
                  }
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name.trim() || !formData.description.trim() || !formData.category}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Creating Squad...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Create Squad
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};