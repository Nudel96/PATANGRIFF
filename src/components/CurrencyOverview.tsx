import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  LogOut,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Clock,
  Target,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Minus,
  RefreshCw,
  Filter,
  Eye,
  Bell,
  Star,
  Zap,
  Globe,
  DollarSign,
  Euro,
  PoundSterling
} from 'lucide-react';

interface EconomicIndicator {
  id: string;
  name: string;
  category: 'GDP' | 'PMI' | 'Retail Sales' | 'Inflation' | 'Employment Change' | 'Unemployment' | 'Interest Rates';
  impact: 'High' | 'Mid';
  direction: 'Higher positive' | 'Lower positive' | 'Tighter positive';
  unit: 'pp' | 'k' | 'index' | '%';
  frequency: string;
  nextRelease?: Date;
  lastValue?: number;
  forecast?: number;
  previous?: number;
  change?: number;
  weight: number;
  isFlash?: boolean;
  description: string;
}

interface CurrencyData {
  code: string;
  name: string;
  flag: string;
  overallScore: number;
  bias: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Very Bearish';
  indicators: EconomicIndicator[];
  lastUpdated: Date;
}

interface CurrencyOverviewProps {
  onBack: () => void;
  onLogout: () => void;
  selectedCurrency?: string;
}

export const CurrencyOverview: React.FC<CurrencyOverviewProps> = ({ 
  onBack, 
  onLogout, 
  selectedCurrency = 'USD' 
}) => {
  const [activeCurrency, setActiveCurrency] = useState(selectedCurrency);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [timeframe, setTimeframe] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Sample currency data with comprehensive indicators
  const currencyData: Record<string, CurrencyData> = {
    USD: {
      code: 'USD',
      name: 'US Dollar',
      flag: '🇺🇸',
      overallScore: 8.2,
      bias: 'Very Bullish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'usd-gdp',
          name: 'GDP Annualized q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-01-25'),
          lastValue: 3.1,
          forecast: 2.8,
          previous: 2.9,
          change: 0.2,
          weight: 1.0,
          description: 'Measures the annualized change in the value of goods and services produced'
        },
        {
          id: 'usd-ism-mfg',
          name: 'ISM Manufacturing PMI',
          category: 'PMI',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'index',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-20'),
          lastValue: 49.3,
          forecast: 48.2,
          previous: 48.1,
          change: 1.2,
          weight: 1.0,
          description: 'Measures manufacturing sector activity and business conditions'
        },
        {
          id: 'usd-retail-sales',
          name: 'Retail Sales m/m',
          category: 'Retail Sales',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-18'),
          lastValue: 0.4,
          forecast: 0.6,
          previous: 0.2,
          change: 0.2,
          weight: 1.0,
          description: 'Measures month-over-month change in retail sales volume'
        },
        {
          id: 'usd-cpi',
          name: 'CPI y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-22'),
          lastValue: 2.9,
          forecast: 2.9,
          previous: 3.1,
          change: -0.2,
          weight: 1.0,
          description: 'Consumer Price Index measures inflation in consumer goods and services'
        },
        {
          id: 'usd-nfp',
          name: 'Non-Farm Payrolls',
          category: 'Employment Change',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'k',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-19'),
          lastValue: 256,
          forecast: 160,
          previous: 227,
          change: 29,
          weight: 1.0,
          description: 'Measures the change in number of employed people in non-agricultural sectors'
        },
        {
          id: 'usd-unemployment',
          name: 'Unemployment Rate',
          category: 'Unemployment',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-19'),
          lastValue: 4.1,
          forecast: 4.2,
          previous: 4.2,
          change: -0.1,
          weight: 1.0,
          description: 'Percentage of labor force that is unemployed and actively seeking employment'
        },
        {
          id: 'usd-fed-rate',
          name: 'Fed Funds Rate Decision',
          category: 'Interest Rates',
          impact: 'High',
          direction: 'Tighter positive',
          unit: 'pp',
          frequency: '8 times per year',
          nextRelease: new Date('2024-01-31'),
          lastValue: 5.5,
          forecast: 5.5,
          previous: 5.5,
          change: 0,
          weight: 1.0,
          description: 'Federal Reserve interest rate decision with statement and press conference'
        }
      ]
    },
    EUR: {
      code: 'EUR',
      name: 'Euro',
      flag: '🇪🇺',
      overallScore: -2.1,
      bias: 'Bearish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'eur-gdp',
          name: 'Euro Area GDP q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-01-30'),
          lastValue: 0.1,
          forecast: 0.2,
          previous: 0.1,
          change: 0,
          weight: 1.0,
          description: 'Measures quarterly change in Eurozone economic output'
        },
        {
          id: 'eur-pmi-mfg',
          name: 'Euro Area HCOB Manufacturing PMI',
          category: 'PMI',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'index',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-24'),
          lastValue: 46.8,
          forecast: 47.2,
          previous: 46.2,
          change: 0.6,
          weight: 1.0,
          description: 'Purchasing Managers Index for Eurozone manufacturing sector'
        },
        {
          id: 'eur-hicp',
          name: 'Euro Area HICP y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-17'),
          lastValue: 2.4,
          forecast: 2.3,
          previous: 2.4,
          change: 0,
          weight: 1.0,
          description: 'Harmonized Index of Consumer Prices for the Eurozone'
        }
      ]
    },
    GBP: {
      code: 'GBP',
      name: 'British Pound',
      flag: '🇬🇧',
      overallScore: -1.8,
      bias: 'Bearish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'gbp-gdp',
          name: 'Monthly GDP m/m',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-26'),
          lastValue: 0.2,
          forecast: 0.1,
          previous: 0.0,
          change: 0.2,
          weight: 1.0,
          description: 'Monthly change in UK Gross Domestic Product'
        },
        {
          id: 'gbp-cpi',
          name: 'CPI y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-17'),
          lastValue: 4.0,
          forecast: 3.8,
          previous: 4.6,
          change: -0.6,
          weight: 1.0,
          description: 'UK Consumer Price Index year-over-year change'
        }
      ]
    },
    JPY: {
      code: 'JPY',
      name: 'Japanese Yen',
      flag: '🇯🇵',
      overallScore: -3.2,
      bias: 'Bearish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'jpy-gdp',
          name: 'GDP q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-02-15'),
          lastValue: -0.7,
          forecast: 0.2,
          previous: 1.2,
          change: -1.9,
          weight: 1.0,
          description: 'Japan quarterly GDP growth rate'
        }
      ]
    },
    CHF: {
      code: 'CHF',
      name: 'Swiss Franc',
      flag: '🇨🇭',
      overallScore: 1.5,
      bias: 'Neutral',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'chf-gdp',
          name: 'GDP q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-02-29'),
          lastValue: 0.3,
          forecast: 0.2,
          previous: 0.1,
          change: 0.2,
          weight: 1.0,
          description: 'Swiss quarterly GDP growth rate'
        }
      ]
    },
    AUD: {
      code: 'AUD',
      name: 'Australian Dollar',
      flag: '🇦🇺',
      overallScore: 2.8,
      bias: 'Bullish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'aud-gdp',
          name: 'GDP q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-03-06'),
          lastValue: 0.2,
          forecast: 0.3,
          previous: 0.4,
          change: -0.2,
          weight: 1.0,
          description: 'Australian quarterly GDP growth rate'
        }
      ]
    },
    NZD: {
      code: 'NZD',
      name: 'New Zealand Dollar',
      flag: '🇳🇿',
      overallScore: 0.8,
      bias: 'Neutral',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'nzd-gdp',
          name: 'GDP q/q',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-03-21'),
          lastValue: 0.9,
          forecast: 0.5,
          previous: 1.1,
          change: -0.2,
          weight: 1.0,
          description: 'New Zealand quarterly GDP growth rate'
        }
      ]
    },
    CAD: {
      code: 'CAD',
      name: 'Canadian Dollar',
      flag: '🇨🇦',
      overallScore: 3.5,
      bias: 'Bullish',
      lastUpdated: new Date(),
      indicators: [
        {
          id: 'cad-gdp',
          name: 'GDP m/m',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-30'),
          lastValue: 0.3,
          forecast: 0.2,
          previous: 0.1,
          change: 0.2,
          weight: 1.0,
          description: 'Canadian monthly GDP growth rate'
        }
      ]
    }
  };

  const currencies = Object.keys(currencyData);
  const currentCurrency = currencyData[activeCurrency];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'GDP', name: 'GDP', icon: BarChart3 },
    { id: 'PMI', name: 'PMI & Business', icon: Activity },
    { id: 'Retail Sales', name: 'Retail Sales', icon: DollarSign },
    { id: 'Inflation', name: 'Inflation', icon: TrendingUp },
    { id: 'Employment Change', name: 'Employment', icon: Target },
    { id: 'Unemployment', name: 'Unemployment', icon: TrendingDown },
    { id: 'Interest Rates', name: 'Interest Rates', icon: Zap }
  ];

  const filteredIndicators = activeCategory === 'all' 
    ? currentCurrency.indicators 
    : currentCurrency.indicators.filter(indicator => indicator.category === activeCategory);

  const getImpactColor = (impact: string) => {
    return impact === 'High' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  };

  const getChangeColor = (change: number, direction: string) => {
    const isPositive = change > 0;
    const isGoodForCurrency = 
      (direction === 'Higher positive' && isPositive) ||
      (direction === 'Lower positive' && !isPositive) ||
      (direction === 'Tighter positive' && isPositive);
    
    if (change === 0) return 'text-muted-foreground';
    return isGoodForCurrency ? 'text-primary' : 'text-destructive';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'Very Bullish': return 'bg-primary/10 text-primary border-primary/20';
      case 'Bullish': return 'bg-primary/20 text-primary border-primary/30';
      case 'Neutral': return 'bg-muted text-muted-foreground border-border';
      case 'Bearish': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Very Bearish': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case 'USD': return <DollarSign className="w-4 h-4" />;
      case 'EUR': return <Euro className="w-4 h-4" />;
      case 'GBP': return <PoundSterling className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Heatmap
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Currency Overview</h1>
                  <p className="text-sm text-foreground/70">Fundamental analysis by currency</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1D</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="30d">30D</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        {/* Currency Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Select Currency</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Live Data
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {currencies.map(currency => {
              const data = currencyData[currency];
              const isActive = currency === activeCurrency;
              
              return (
                <Card 
                  key={currency}
                  className={`military-card cursor-pointer transition-all duration-300 ${
                    isActive ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/30'
                  }`}
                  onClick={() => setActiveCurrency(currency)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{data.flag}</div>
                    <div className="font-bold text-sm mb-1">{currency}</div>
                    <div className="text-xs text-muted-foreground mb-2">{data.name}</div>
                    <Badge className={`text-xs ${getBiasColor(data.bias)}`}>
                      {data.overallScore > 0 ? '+' : ''}{data.overallScore}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Currency Details */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Currency Summary */}
          <div className="lg:col-span-1">
            <Card className="military-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="text-3xl">{currentCurrency.flag}</div>
                  <div>
                    <div className="text-xl font-bold">{currentCurrency.code}</div>
                    <div className="text-sm text-muted-foreground">{currentCurrency.name}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Overall Score</span>
                      <span className={`font-bold text-lg ${
                        currentCurrency.overallScore > 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {currentCurrency.overallScore > 0 ? '+' : ''}{currentCurrency.overallScore}
                      </span>
                    </div>
                    <Progress 
                      value={Math.abs(currentCurrency.overallScore) * 10} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Market Bias</div>
                    <Badge className={getBiasColor(currentCurrency.bias)}>
                      {currentCurrency.bias}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Indicators</div>
                    <div className="text-lg font-bold">{currentCurrency.indicators.length}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Last Updated</div>
                    <div className="text-sm">{currentCurrency.lastUpdated.toLocaleTimeString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Indicators List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {activeCategory === 'all' ? 'All Indicators' : categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{filteredIndicators.length} indicators</span>
              </div>
            </div>

            <div className="space-y-4">
              {filteredIndicators.map(indicator => (
                <Card key={indicator.id} className="military-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-lg">{indicator.name}</CardTitle>
                          <Badge className={getImpactColor(indicator.impact)}>
                            {indicator.impact}
                          </Badge>
                          {indicator.isFlash && (
                            <Badge className="bg-secondary/10 text-secondary">
                              Flash
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{indicator.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Weight</div>
                        <div className="font-bold">{indicator.weight}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Actual</div>
                        <div className="font-bold text-lg">
                          {indicator.lastValue}
                          {indicator.unit === 'pp' ? '%' : indicator.unit === 'k' ? 'K' : ''}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Forecast</div>
                        <div className="font-bold text-lg">
                          {indicator.forecast}
                          {indicator.unit === 'pp' ? '%' : indicator.unit === 'k' ? 'K' : ''}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Previous</div>
                        <div className="font-bold text-lg">
                          {indicator.previous}
                          {indicator.unit === 'pp' ? '%' : indicator.unit === 'k' ? 'K' : ''}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Change</div>
                        <div className={`font-bold text-lg flex items-center justify-center space-x-1 ${
                          getChangeColor(indicator.change || 0, indicator.direction)
                        }`}>
                          {getChangeIcon(indicator.change || 0)}
                          <span>
                            {indicator.change && indicator.change > 0 ? '+' : ''}{indicator.change}
                            {indicator.unit === 'pp' ? '%' : indicator.unit === 'k' ? 'K' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-muted-foreground">Direction: </span>
                          <span className="font-medium">{indicator.direction}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency: </span>
                          <span className="font-medium">{indicator.frequency}</span>
                        </div>
                      </div>
                      {indicator.nextRelease && (
                        <div className="flex items-center space-x-1 text-primary">
                          <Calendar className="w-4 h-4" />
                          <span>Next: {indicator.nextRelease.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIndicators.length === 0 && (
              <Card className="military-card">
                <CardContent className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Indicators Found</h3>
                  <p className="text-muted-foreground">
                    No indicators available for the selected category and currency.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Scoring Methodology */}
        <Card className="military-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Scoring Methodology</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Impact Weights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>High Impact:</span>
                    <span className="font-bold text-primary">1.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mid Impact:</span>
                    <span className="font-bold text-secondary">0.70</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Release Multipliers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Flash Releases:</span>
                    <span className="font-bold text-primary">×1.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Releases:</span>
                    <span className="font-bold text-secondary">×1.00</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Special Rules</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• EUR: Euro Area aggregates prioritized</div>
                  <div>• PMI: Flash treated as High impact</div>
                  <div>• Country-specific employment cadences</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};