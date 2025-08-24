import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  BarChart3,
  PieChart,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Brain,
  Activity,
  Clock,
  Zap,
  ArrowLeft,
  LogOut,
  Upload,
  Image,
  Camera,
  Eye,
  Edit,
  Save,
  X,
  AlertCircle,
  Calculator,
  Percent,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Minus,
  PlayCircle,
  StopCircle,
  Settings
} from 'lucide-react';

interface Trade {
  id: string;
  date: Date;
  instrument: string;
  direction: 'long' | 'short';
  entryPrice: number;
  stopPrice: number;
  targetPrice?: number;
  exitPrice?: number;
  quantity: number;
  riskAmount: number;
  riskPercent: number;
  plannedRR: number;
  actualR?: number;
  status: 'pending' | 'open' | 'closed' | 'invalidated';
  session: 'Asia' | 'London' | 'NY';
  macroEvents: string[];
  redNewsNext15: boolean;
  atrPercentile?: number;
  beforeImage?: string;
  afterImage?: string;
  mae?: number; // Maximum Adverse Excursion
  mfe?: number; // Maximum Favorable Excursion
  highestPrice?: number;
  lowestPrice?: number;
  notes: string;
  exitReason?: string;
  checklistScore: number;
  checklistItems: ChecklistItem[];
  setup: string;
  mistakes: string[];
  partialCloses: PartialClose[];
  createdAt: Date;
  closedAt?: Date;
}

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  checked: boolean;
  required: boolean;
  weight: number;
}

interface PartialClose {
  id: string;
  percentage: number;
  price: number;
  reason: string;
  timestamp: Date;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  setup: string;
  items: Omit<ChecklistItem, 'id' | 'checked'>[];
}

interface TradingJournalProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingJournal: React.FC<TradingJournalProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('journal');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSetup, setFilterSetup] = useState('all');
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [checklistTemplates, setChecklistTemplates] = useState<ChecklistTemplate[]>([]);
  const beforeImageRef = useRef<HTMLInputElement>(null);
  const afterImageRef = useRef<HTMLInputElement>(null);

  // New trade form state
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    date: new Date(),
    direction: 'long',
    status: 'pending',
    session: 'London',
    macroEvents: [],
    redNewsNext15: false,
    checklistItems: [],
    partialCloses: [],
    mistakes: []
  });

  // Default checklist templates
  useEffect(() => {
    const defaultTemplates: ChecklistTemplate[] = [
      {
        id: '1',
        name: 'Breakout Setup',
        setup: 'breakout',
        items: [
          { category: 'Structure', item: 'Clear structure present (S/R, trendline)', required: true, weight: 1.0 },
          { category: 'Structure', item: 'Volume confirmation on breakout', required: true, weight: 1.0 },
          { category: 'Risk', item: 'R:R ratio meets minimum requirement', required: true, weight: 1.0 },
          { category: 'Risk', item: 'Stop placement logical and tested', required: true, weight: 1.0 },
          { category: 'Context', item: 'No conflicting news in next 15 minutes', required: true, weight: 1.0 },
          { category: 'Context', item: 'Spread acceptable for timeframe', required: false, weight: 0.5 },
          { category: 'Timing', item: 'Optimal session for instrument', required: false, weight: 0.5 }
        ]
      },
      {
        id: '2',
        name: 'Retracement Setup',
        setup: 'retracement',
        items: [
          { category: 'Structure', item: 'Clear trend established', required: true, weight: 1.0 },
          { category: 'Structure', item: 'Retracement to key level', required: true, weight: 1.0 },
          { category: 'Structure', item: 'Confluence factors present', required: false, weight: 0.5 },
          { category: 'Risk', item: 'R:R ratio meets minimum requirement', required: true, weight: 1.0 },
          { category: 'Context', item: 'No conflicting news in next 15 minutes', required: true, weight: 1.0 },
          { category: 'Timing', item: 'Entry during optimal session', required: false, weight: 0.5 }
        ]
      }
    ];
    setChecklistTemplates(defaultTemplates);
  }, []);

  // Sample trades data
  useEffect(() => {
    const sampleTrades: Trade[] = [
      {
        id: '1',
        date: new Date('2024-01-15'),
        instrument: 'EURUSD',
        direction: 'long',
        entryPrice: 1.0850,
        stopPrice: 1.0820,
        targetPrice: 1.0910,
        exitPrice: 1.0920,
        quantity: 100000,
        riskAmount: 300,
        riskPercent: 1.0,
        plannedRR: 2.0,
        actualR: 2.3,
        status: 'closed',
        session: 'London',
        macroEvents: ['ECB'],
        redNewsNext15: false,
        atrPercentile: 65,
        mae: -0.5,
        mfe: 2.5,
        highestPrice: 1.0925,
        lowestPrice: 1.0845,
        notes: 'Clean breakout above resistance with strong volume',
        exitReason: 'Target hit',
        checklistScore: 95,
        checklistItems: [],
        setup: 'breakout',
        mistakes: [],
        partialCloses: [],
        createdAt: new Date('2024-01-15T08:30:00'),
        closedAt: new Date('2024-01-15T12:45:00')
      }
    ];
    setTrades(sampleTrades);
  }, []);

  const calculateInitialRisk = () => {
    if (!newTrade.entryPrice || !newTrade.stopPrice) return 0;
    return Math.abs(newTrade.entryPrice - newTrade.stopPrice);
  };

  const calculatePlannedRR = () => {
    if (!newTrade.entryPrice || !newTrade.stopPrice || !newTrade.targetPrice) return 0;
    const risk = Math.abs(newTrade.entryPrice - newTrade.stopPrice);
    const reward = Math.abs(newTrade.targetPrice - newTrade.entryPrice);
    return risk > 0 ? reward / risk : 0;
  };

  const calculatePositionSize = () => {
    const risk = calculateInitialRisk();
    if (risk === 0 || !newTrade.riskAmount) return 0;
    return newTrade.riskAmount / risk;
  };

  const handleRiskAmountChange = (value: number) => {
    setNewTrade(prev => ({
      ...prev,
      riskAmount: value,
      riskPercent: value / 30000 * 100 // Assuming $30k account
    }));
  };

  const handleRiskPercentChange = (value: number) => {
    setNewTrade(prev => ({
      ...prev,
      riskPercent: value,
      riskAmount: value * 30000 / 100 // Assuming $30k account
    }));
  };

  const handleImageUpload = (type: 'before' | 'after', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        if (type === 'before') {
          setNewTrade(prev => ({ ...prev, beforeImage: imageData }));
        } else {
          setNewTrade(prev => ({ ...prev, afterImage: imageData }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateChecklistScore = (items: ChecklistItem[]) => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const completedWeight = items.filter(item => item.checked).reduce((sum, item) => sum + item.weight, 0);
    return totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
  };

  const getSetupChecklist = (setup: string) => {
    const template = checklistTemplates.find(t => t.setup === setup);
    if (!template) return [];
    
    return template.items.map((item, index) => ({
      id: `${setup}-${index}`,
      ...item,
      checked: false
    }));
  };

  const addTrade = () => {
    if (!newTrade.instrument || !newTrade.entryPrice || !newTrade.stopPrice) return;
    
    const checklist = getSetupChecklist(newTrade.setup || 'breakout');
    const trade: Trade = {
      id: Date.now().toString(),
      date: newTrade.date || new Date(),
      instrument: newTrade.instrument,
      direction: newTrade.direction || 'long',
      entryPrice: newTrade.entryPrice,
      stopPrice: newTrade.stopPrice,
      targetPrice: newTrade.targetPrice,
      quantity: calculatePositionSize(),
      riskAmount: newTrade.riskAmount || 0,
      riskPercent: newTrade.riskPercent || 0,
      plannedRR: calculatePlannedRR(),
      status: 'pending',
      session: newTrade.session || 'London',
      macroEvents: newTrade.macroEvents || [],
      redNewsNext15: newTrade.redNewsNext15 || false,
      atrPercentile: newTrade.atrPercentile,
      beforeImage: newTrade.beforeImage,
      notes: newTrade.notes || '',
      checklistScore: calculateChecklistScore(checklist),
      checklistItems: checklist,
      setup: newTrade.setup || 'breakout',
      mistakes: [],
      partialCloses: [],
      createdAt: new Date()
    };

    setTrades([...trades, trade]);
    setNewTrade({ 
      date: new Date(), 
      direction: 'long', 
      status: 'pending',
      session: 'London',
      macroEvents: [],
      redNewsNext15: false,
      checklistItems: [],
      partialCloses: [],
      mistakes: []
    });
    setShowTradeForm(false);
  };

  const openTrade = (tradeId: string) => {
    setTrades(trades.map(trade => 
      trade.id === tradeId 
        ? { ...trade, status: 'open' as const }
        : trade
    ));
  };

  const closeTrade = (tradeId: string, exitPrice: number, exitReason: string) => {
    setTrades(trades.map(trade => {
      if (trade.id === tradeId) {
        const risk = Math.abs(trade.entryPrice - trade.stopPrice);
        const actualReturn = trade.direction === 'long' 
          ? exitPrice - trade.entryPrice 
          : trade.entryPrice - exitPrice;
        const actualR = risk > 0 ? actualReturn / risk : 0;
        
        return {
          ...trade,
          status: 'closed' as const,
          exitPrice,
          exitReason,
          actualR,
          closedAt: new Date()
        };
      }
      return trade;
    }));
  };

  const calculateStats = () => {
    const closedTrades = trades.filter(trade => trade.status === 'closed');
    const totalR = closedTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0);
    const winningTrades = closedTrades.filter(trade => (trade.actualR || 0) > 0);
    const losingTrades = closedTrades.filter(trade => (trade.actualR || 0) < 0);
    
    const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
    const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / winningTrades.length : 0;
    const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / losingTrades.length) : 0;
    const expectancy = (winRate / 100 * avgWin) - ((100 - winRate) / 100 * avgLoss);
    const avgDisciplineScore = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + trade.checklistScore, 0) / closedTrades.length : 0;

    return {
      totalTrades: closedTrades.length,
      totalR,
      winRate,
      avgWin,
      avgLoss,
      expectancy,
      avgDisciplineScore
    };
  };

  const stats = calculateStats();

  const renderTradeForm = () => (
    <Card className="military-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-primary" />
            <span>New Trade Entry</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowTradeForm(false)}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Trade Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instrument">Instrument</Label>
            <Input
              id="instrument"
              placeholder="e.g., EURUSD"
              value={newTrade.instrument || ''}
              onChange={(e) => setNewTrade({...newTrade, instrument: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={newTrade.direction} onValueChange={(value: 'long' | 'short') => setNewTrade({...newTrade, direction: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="setup">Setup Type</Label>
            <Select value={newTrade.setup} onValueChange={(value) => setNewTrade({...newTrade, setup: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select setup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakout">Breakout</SelectItem>
                <SelectItem value="retracement">Retracement</SelectItem>
                <SelectItem value="reversal">Reversal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              step="0.00001"
              placeholder="0.00000"
              value={newTrade.entryPrice || ''}
              onChange={(e) => setNewTrade({...newTrade, entryPrice: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopPrice">Stop Price</Label>
            <Input
              id="stopPrice"
              type="number"
              step="0.00001"
              placeholder="0.00000"
              value={newTrade.stopPrice || ''}
              onChange={(e) => setNewTrade({...newTrade, stopPrice: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetPrice">Target Price</Label>
            <Input
              id="targetPrice"
              type="number"
              step="0.00001"
              placeholder="0.00000"
              value={newTrade.targetPrice || ''}
              onChange={(e) => setNewTrade({...newTrade, targetPrice: parseFloat(e.target.value)})}
            />
          </div>
        </div>

        {/* Risk Management */}
        <div className="space-y-4">
          <h4 className="font-semibold">Risk Management</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="riskAmount">Risk Amount ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="riskAmount"
                  type="number"
                  step="0.01"
                  placeholder="300.00"
                  className="pl-10"
                  value={newTrade.riskAmount || ''}
                  onChange={(e) => handleRiskAmountChange(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskPercent">Risk Percent (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="riskPercent"
                  type="number"
                  step="0.1"
                  placeholder="1.0"
                  className="pl-10"
                  value={newTrade.riskPercent || ''}
                  onChange={(e) => handleRiskPercentChange(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          {/* Risk Calculations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/10 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Initial Risk (1R)</div>
              <div className="text-lg font-bold">{calculateInitialRisk().toFixed(5)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Planned R:R</div>
              <div className={`text-lg font-bold ${calculatePlannedRR() < 1.5 ? 'text-destructive' : 'text-primary'}`}>
                {calculatePlannedRR().toFixed(2)}:1
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Position Size</div>
              <div className="text-lg font-bold">{calculatePositionSize().toLocaleString()}</div>
            </div>
          </div>
          
          {calculatePlannedRR() < 1.5 && (
            <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">Warning: R:R ratio below minimum requirement (1.5:1)</span>
            </div>
          )}
        </div>

        {/* Context Section */}
        <div className="space-y-4">
          <h4 className="font-semibold">Trade Context</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Select value={newTrade.session} onValueChange={(value: 'Asia' | 'London' | 'NY') => setNewTrade({...newTrade, session: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="atrPercentile">ATR Percentile</Label>
              <Input
                id="atrPercentile"
                type="number"
                placeholder="65"
                value={newTrade.atrPercentile || ''}
                onChange={(e) => setNewTrade({...newTrade, atrPercentile: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label>Red News Next 15 Min?</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="redNews"
                  checked={newTrade.redNewsNext15}
                  onCheckedChange={(checked) => setNewTrade({...newTrade, redNewsNext15: checked as boolean})}
                />
                <Label htmlFor="redNews">High impact news expected</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Before Image Upload */}
        <div className="space-y-4">
          <h4 className="font-semibold">Before Screenshot (Required)</h4>
          <div className="flex items-center space-x-4">
            <input
              ref={beforeImageRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('before', e)}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => beforeImageRef.current?.click()}
            >
              <Camera className="w-4 h-4 mr-2" />
              Upload Before Screenshot
            </Button>
            {newTrade.beforeImage && (
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Image uploaded</span>
              </div>
            )}
          </div>
          {newTrade.beforeImage && (
            <div className="w-32 h-24 border border-border rounded overflow-hidden">
              <img src={newTrade.beforeImage} alt="Before" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Pre-Trade Checklist */}
        {newTrade.setup && (
          <div className="space-y-4">
            <h4 className="font-semibold">Pre-Trade Checklist</h4>
            <div className="space-y-3">
              {getSetupChecklist(newTrade.setup).map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                  <Checkbox
                    id={`checklist-${index}`}
                    checked={item.checked}
                    onCheckedChange={(checked) => {
                      const updatedItems = getSetupChecklist(newTrade.setup || 'breakout');
                      updatedItems[index].checked = checked as boolean;
                      setNewTrade({...newTrade, checklistItems: updatedItems});
                    }}
                  />
                  <Label htmlFor={`checklist-${index}`} className="flex-1">
                    {item.item}
                    {item.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Compliance Score: {calculateChecklistScore(newTrade.checklistItems || []).toFixed(0)}%
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setShowTradeForm(false)}>
            Cancel
          </Button>
          <Button 
            onClick={addTrade}
            disabled={!newTrade.instrument || !newTrade.entryPrice || !newTrade.stopPrice || !newTrade.beforeImage}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Create Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderTradeCard = (trade: Trade) => (
    <Card key={trade.id} className="military-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={`${trade.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
              {trade.direction.toUpperCase()}
            </Badge>
            <span className="font-semibold">{trade.instrument}</span>
            <Badge variant="outline">{trade.setup}</Badge>
            <Badge className={`${
              trade.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
              trade.status === 'open' ? 'bg-primary/10 text-primary' :
              trade.status === 'closed' ? 'bg-muted text-muted-foreground' :
              'bg-destructive/10 text-destructive'
            }`}>
              {trade.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {trade.actualR !== undefined && (
              <Badge className={`${trade.actualR > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                {trade.actualR > 0 ? '+' : ''}{trade.actualR.toFixed(2)}R
              </Badge>
            )}
            <Badge className="bg-secondary/10 text-secondary">
              {trade.checklistScore.toFixed(0)}% Discipline
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <span className="text-muted-foreground">Entry:</span>
            <span className="ml-2 font-medium">{trade.entryPrice}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Stop:</span>
            <span className="ml-2 font-medium">{trade.stopPrice}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Planned R:R:</span>
            <span className="ml-2 font-medium">{trade.plannedRR.toFixed(2)}:1</span>
          </div>
          <div>
            <span className="text-muted-foreground">Session:</span>
            <span className="ml-2 font-medium">{trade.session}</span>
          </div>
        </div>

        {trade.beforeImage && (
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-2">Before Screenshot:</div>
            <div className="w-32 h-24 border border-border rounded overflow-hidden">
              <img src={trade.beforeImage} alt="Before" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Created: {trade.createdAt.toLocaleString()}
          </div>
          <div className="flex space-x-2">
            {trade.status === 'pending' && (
              <>
                <Button size="sm" onClick={() => openTrade(trade.id)}>
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Open
                </Button>
                <Button size="sm" variant="outline">
                  <X className="w-4 h-4 mr-1" />
                  Invalidate
                </Button>
              </>
            )}
            {trade.status === 'open' && (
              <Button size="sm" variant="outline" onClick={() => closeTrade(trade.id, trade.targetPrice || trade.entryPrice, 'Manual close')}>
                <StopCircle className="w-4 h-4 mr-1" />
                Close
              </Button>
            )}
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Trading Journal</h1>
                  <p className="text-sm text-foreground/70">R-Multiple Performance Tracking</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className={`font-bold ${stats.totalR >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {stats.totalR >= 0 ? '+' : ''}{stats.totalR.toFixed(2)}R
                  </div>
                  <div className="text-xs text-muted-foreground">Total R</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-secondary">{stats.avgDisciplineScore.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">Discipline</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="journal" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Trade Journal</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Checklist Manager</span>
            </TabsTrigger>
          </TabsList>

          {/* Trade Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trade Journal</h2>
              <Button onClick={() => setShowTradeForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Trade
              </Button>
            </div>

            {showTradeForm && renderTradeForm()}

            <div className="space-y-4">
              {trades.map(renderTradeCard)}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">R-Multiple Analytics Dashboard</h2>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total R</p>
                      <p className={`text-2xl font-bold ${stats.totalR >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {stats.totalR >= 0 ? '+' : ''}{stats.totalR.toFixed(2)}R
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-2xl font-bold text-secondary">{stats.winRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Expectancy</p>
                      <p className={`text-2xl font-bold ${stats.expectancy >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {stats.expectancy.toFixed(2)}R
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Discipline</p>
                      <p className="text-2xl font-bold text-secondary">{stats.avgDisciplineScore.toFixed(0)}%</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-xl">
                      <Brain className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>R-Distribution Histogram</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart visualization coming soon
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle>MAE/MFE Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Scatter plot visualization coming soon
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <h2 className="text-2xl font-bold">Trading Calendar</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border border-border/50"
                  />
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle>
                    Trades on {selectedDate.toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trades
                      .filter(trade => trade.date.toDateString() === selectedDate.toDateString())
                      .map(trade => (
                        <div key={trade.id} className="p-3 bg-muted/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{trade.instrument}</span>
                            <Badge className={`${trade.actualR && trade.actualR > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                              {trade.actualR ? `${trade.actualR > 0 ? '+' : ''}${trade.actualR.toFixed(2)}R` : 'Open'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.direction.toUpperCase()} • {trade.setup} • {trade.session}
                          </div>
                        </div>
                      ))}
                    
                    {trades.filter(trade => trade.date.toDateString() === selectedDate.toDateString()).length === 0 && (
                      <p className="text-muted-foreground text-center py-8">No trades on this date</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Checklist Manager Tab */}
          <TabsContent value="checklist" className="space-y-6">
            <h2 className="text-2xl font-bold">Pre-Trade Checklist Manager</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {checklistTemplates.map(template => (
                <Card key={template.id} className="military-card">
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Setup: {template.setup}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {template.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.item}</div>
                            <div className="text-xs text-muted-foreground">{item.category}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              Weight: {item.weight}
                            </Badge>
                            {item.required && (
                              <Badge className="bg-destructive/10 text-destructive text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};