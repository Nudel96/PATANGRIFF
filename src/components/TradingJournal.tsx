import React, { useState, useEffect } from 'react';
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
  LogOut
} from 'lucide-react';

interface Trade {
  id: string;
  date: Date;
  instrument: string;
  direction: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  stopLoss: number;
  takeProfit: number;
  pnl?: number;
  fees: number;
  strategy: string;
  timeframe: string;
  notes: string;
  tags: string[];
  status: 'open' | 'closed' | 'cancelled';
  duration?: number; // in minutes
  riskRewardRatio: number;
  emotionalState: string;
  marketCondition: string;
}

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  checked: boolean;
  required: boolean;
}

interface TradingJournalProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingJournal: React.FC<TradingJournalProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrategy, setFilterStrategy] = useState('all');
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    date: new Date(),
    direction: 'long',
    status: 'open'
  });

  // Pre-trade checklist items
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Market Analysis
    { id: '1', category: 'Market Analysis', item: 'Identified clear trend direction', checked: false, required: true },
    { id: '2', category: 'Market Analysis', item: 'Confirmed support/resistance levels', checked: false, required: true },
    { id: '3', category: 'Market Analysis', item: 'Analyzed volume patterns', checked: false, required: false },
    { id: '4', category: 'Market Analysis', item: 'Checked multiple timeframes', checked: false, required: true },
    { id: '5', category: 'Market Analysis', item: 'Identified key market drivers', checked: false, required: false },
    
    // Risk Management
    { id: '6', category: 'Risk Management', item: 'Calculated position size (max 2% risk)', checked: false, required: true },
    { id: '7', category: 'Risk Management', item: 'Set appropriate stop-loss level', checked: false, required: true },
    { id: '8', category: 'Risk Management', item: 'Confirmed risk-reward ratio (min 1:2)', checked: false, required: true },
    { id: '9', category: 'Risk Management', item: 'Verified account balance and margin', checked: false, required: true },
    
    // Strategy Validation
    { id: '10', category: 'Strategy Validation', item: 'Entry criteria fully met', checked: false, required: true },
    { id: '11', category: 'Strategy Validation', item: 'Exit strategy clearly defined', checked: false, required: true },
    { id: '12', category: 'Strategy Validation', item: 'Trade aligns with overall strategy', checked: false, required: true },
    
    // Emotional State
    { id: '13', category: 'Emotional State', item: 'Feeling calm and focused', checked: false, required: true },
    { id: '14', category: 'Emotional State', item: 'No revenge trading impulse', checked: false, required: true },
    { id: '15', category: 'Emotional State', item: 'Not overconfident from recent wins', checked: false, required: false },
    
    // Market Conditions
    { id: '16', category: 'Market Conditions', item: 'Checked economic calendar', checked: false, required: false },
    { id: '17', category: 'Market Conditions', item: 'Assessed market volatility', checked: false, required: true },
    { id: '18', category: 'Market Conditions', item: 'Confirmed adequate liquidity', checked: false, required: true }
  ]);

  // Sample trades data
  useEffect(() => {
    const sampleTrades: Trade[] = [
      {
        id: '1',
        date: new Date('2024-01-15'),
        instrument: 'EURUSD',
        direction: 'long',
        entryPrice: 1.0850,
        exitPrice: 1.0920,
        quantity: 100000,
        stopLoss: 1.0820,
        takeProfit: 1.0910,
        pnl: 700,
        fees: 15,
        strategy: 'Trend Following',
        timeframe: '4H',
        notes: 'Clean breakout above resistance with strong volume',
        tags: ['breakout', 'trend'],
        status: 'closed',
        duration: 240,
        riskRewardRatio: 2.3,
        emotionalState: 'Confident',
        marketCondition: 'Trending'
      },
      {
        id: '2',
        date: new Date('2024-01-16'),
        instrument: 'GBPJPY',
        direction: 'short',
        entryPrice: 185.50,
        exitPrice: 184.80,
        quantity: 50000,
        stopLoss: 186.00,
        takeProfit: 184.50,
        pnl: 350,
        fees: 12,
        strategy: 'Mean Reversion',
        timeframe: '1H',
        notes: 'Overbought conditions with divergence',
        tags: ['divergence', 'overbought'],
        status: 'closed',
        duration: 180,
        riskRewardRatio: 1.4,
        emotionalState: 'Calm',
        marketCondition: 'Ranging'
      }
    ];
    setTrades(sampleTrades);
  }, []);

  const handleChecklistToggle = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getChecklistProgress = () => {
    const totalRequired = checklistItems.filter(item => item.required).length;
    const completedRequired = checklistItems.filter(item => item.required && item.checked).length;
    return (completedRequired / totalRequired) * 100;
  };

  const getChecklistByCategory = () => {
    const categories = ['Market Analysis', 'Risk Management', 'Strategy Validation', 'Emotional State', 'Market Conditions'];
    return categories.map(category => ({
      category,
      items: checklistItems.filter(item => item.category === category)
    }));
  };

  const calculateStats = () => {
    const closedTrades = trades.filter(trade => trade.status === 'closed');
    const winningTrades = closedTrades.filter(trade => (trade.pnl || 0) > 0);
    const losingTrades = closedTrades.filter(trade => (trade.pnl || 0) < 0);
    
    const totalPnL = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const totalFees = closedTrades.reduce((sum, trade) => sum + trade.fees, 0);
    const netPnL = totalPnL - totalFees;
    
    const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
    const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / winningTrades.length : 0;
    const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / losingTrades.length) : 0;
    const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

    return {
      totalTrades: closedTrades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate,
      totalPnL,
      netPnL,
      avgWin,
      avgLoss,
      profitFactor,
      totalFees
    };
  };

  const stats = calculateStats();

  const addTrade = () => {
    if (!newTrade.instrument || !newTrade.entryPrice) return;
    
    const trade: Trade = {
      id: Date.now().toString(),
      date: newTrade.date || new Date(),
      instrument: newTrade.instrument,
      direction: newTrade.direction || 'long',
      entryPrice: newTrade.entryPrice,
      exitPrice: newTrade.exitPrice,
      quantity: newTrade.quantity || 0,
      stopLoss: newTrade.stopLoss || 0,
      takeProfit: newTrade.takeProfit || 0,
      pnl: newTrade.pnl,
      fees: newTrade.fees || 0,
      strategy: newTrade.strategy || '',
      timeframe: newTrade.timeframe || '',
      notes: newTrade.notes || '',
      tags: newTrade.tags || [],
      status: newTrade.status || 'open',
      duration: newTrade.duration,
      riskRewardRatio: newTrade.riskRewardRatio || 0,
      emotionalState: newTrade.emotionalState || '',
      marketCondition: newTrade.marketCondition || ''
    };

    setTrades([...trades, trade]);
    setNewTrade({ date: new Date(), direction: 'long', status: 'open' });
  };

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.strategy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStrategy = filterStrategy === 'all' || trade.strategy === filterStrategy;
    return matchesSearch && matchesStrategy;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Back Button and Title */}
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
                  <p className="text-sm text-foreground/70">Professional trade analysis</p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="checklist" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Pre-Trade Checklist</span>
            </TabsTrigger>
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
          </TabsList>

          {/* Pre-Trade Checklist */}
          <TabsContent value="checklist" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Pre-Trade Warrior Checklist</span>
                  </div>
                  <Badge className={`${getChecklistProgress() === 100 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    {Math.round(getChecklistProgress())}% Complete
                  </Badge>
                </CardTitle>
                <Progress value={getChecklistProgress()} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {getChecklistByCategory().map(({ category, items }) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        category === 'Market Analysis' ? 'bg-primary' :
                        category === 'Risk Management' ? 'bg-secondary' :
                        category === 'Strategy Validation' ? 'bg-primary' :
                        category === 'Emotional State' ? 'bg-secondary' : 'bg-primary'
                      }`} />
                      <span>{category}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => handleChecklistToggle(item.id)}
                          />
                          <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                            {item.item}
                            {item.required && <span className="text-primary ml-1">*</span>}
                          </Label>
                          {item.checked && <CheckCircle className="w-4 h-4 text-primary" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 border-t border-border/50">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={getChecklistProgress() < 100}
                  >
                    {getChecklistProgress() === 100 ? 'Execute Trade' : 'Complete Required Items'}
                    <Zap className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Journal */}
          <TabsContent value="journal" className="space-y-6">
            {/* Add New Trade */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Log New Trade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="100000"
                      value={newTrade.quantity || ''}
                      onChange={(e) => setNewTrade({...newTrade, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      value={newTrade.stopLoss || ''}
                      onChange={(e) => setNewTrade({...newTrade, stopLoss: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="takeProfit">Take Profit</Label>
                    <Input
                      id="takeProfit"
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      value={newTrade.takeProfit || ''}
                      onChange={(e) => setNewTrade({...newTrade, takeProfit: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Strategy</Label>
                    <Input
                      id="strategy"
                      placeholder="e.g., Trend Following"
                      value={newTrade.strategy || ''}
                      onChange={(e) => setNewTrade({...newTrade, strategy: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Trade Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Analysis, reasoning, and observations..."
                    value={newTrade.notes || ''}
                    onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                  />
                </div>

                <Button onClick={addTrade} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trade
                </Button>
              </CardContent>
            </Card>

            {/* Trade List */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-secondary" />
                    <span>Trade History</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search trades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Strategies</SelectItem>
                        <SelectItem value="Trend Following">Trend Following</SelectItem>
                        <SelectItem value="Mean Reversion">Mean Reversion</SelectItem>
                        <SelectItem value="Breakout">Breakout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTrades.map(trade => (
                    <div key={trade.id} className="p-4 bg-muted/10 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${trade.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                            {trade.direction.toUpperCase()}
                          </Badge>
                          <span className="font-semibold">{trade.instrument}</span>
                          <Badge variant="outline">{trade.strategy}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {trade.pnl !== undefined && (
                            <Badge className={`${trade.pnl > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                              {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                            </Badge>
                          )}
                          <Badge className={`${
                            trade.status === 'closed' ? 'bg-muted text-muted-foreground' :
                            trade.status === 'open' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {trade.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Entry:</span>
                          <span className="ml-2 font-medium">{trade.entryPrice}</span>
                        </div>
                        {trade.exitPrice && (
                          <div>
                            <span className="text-muted-foreground">Exit:</span>
                            <span className="ml-2 font-medium">{trade.exitPrice}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <span className="ml-2 font-medium">{trade.quantity.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">R:R:</span>
                          <span className="ml-2 font-medium">{trade.riskRewardRatio}</span>
                        </div>
                      </div>
                      
                      {trade.notes && (
                        <div className="mt-3 p-3 bg-muted/20 rounded text-sm">
                          <span className="text-muted-foreground">Notes:</span>
                          <p className="mt-1">{trade.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-2xl font-bold text-primary">{stats.winRate.toFixed(1)}%</p>
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
                      <p className="text-sm text-muted-foreground">Net P&L</p>
                      <p className={`text-2xl font-bold ${stats.netPnL >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        ${stats.netPnL.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-xl">
                      <DollarSign className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Trades</p>
                      <p className="text-2xl font-bold text-primary">{stats.totalTrades}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Profit Factor</p>
                      <p className="text-2xl font-bold text-secondary">{stats.profitFactor.toFixed(2)}</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    <span>Performance Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Winning Trades</span>
                      <span className="text-sm font-medium text-primary">{stats.winningTrades}</span>
                    </div>
                    <Progress value={(stats.winningTrades / stats.totalTrades) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Losing Trades</span>
                      <span className="text-sm font-medium text-destructive">{stats.losingTrades}</span>
                    </div>
                    <Progress value={(stats.losingTrades / stats.totalTrades) * 100} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Win:</span>
                        <span className="ml-2 font-medium text-primary">${stats.avgWin.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Loss:</span>
                        <span className="ml-2 font-medium text-destructive">${stats.avgLoss.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-secondary" />
                    <span>Export & Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export to CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate PDF Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Performance Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Psychology Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>Trading Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border border-border/50"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Trades on {selectedDate.toLocaleDateString()}
                    </h3>
                    
                    {trades
                      .filter(trade => trade.date.toDateString() === selectedDate.toDateString())
                      .map(trade => (
                        <div key={trade.id} className="p-3 bg-muted/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{trade.instrument}</span>
                            <Badge className={`${trade.pnl && trade.pnl > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                              {trade.pnl ? `${trade.pnl > 0 ? '+' : ''}$${trade.pnl.toFixed(2)}` : 'Open'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.direction.toUpperCase()} • {trade.strategy} • {trade.timeframe}
                          </div>
                        </div>
                      ))}
                    
                    {trades.filter(trade => trade.date.toDateString() === selectedDate.toDateString()).length === 0 && (
                      <p className="text-muted-foreground text-center py-8">No trades on this date</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};