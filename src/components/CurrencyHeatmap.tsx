import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyOverview } from './CurrencyOverview';
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  RefreshCw,
  ArrowLeft,
  LogOut,
  Target,
  Zap,
  Eye
} from 'lucide-react';

interface CurrencyScore {
  asset: string;
  bias: string;
  score: number;
  sentiment: {
    cot: number;
    retailPos: number;
  };
  technical: {
    seasonality: number;
    trend: number;
  };
  economic: {
    gdp: number;
    mPMI: number;
    sPMI: number;
    retailSales: number;
    inflation: number;
    employmentChange: number;
    unemploymentRate: number;
    interestRates: number;
  };
}

interface CurrencyHeatmapProps {
  onBack: () => void;
  onLogout: () => void;
}

export const CurrencyHeatmap: React.FC<CurrencyHeatmapProps> = ({ onBack, onLogout }) => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('daily');
  const [showCurrencyOverview, setShowCurrencyOverview] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  // Sample data matching the reference image structure
  const [heatmapData, setHeatmapData] = useState<CurrencyScore[]>([
    {
      asset: 'USOIL',
      bias: 'Very Bullish',
      score: 13,
      sentiment: { cot: 2, retailPos: 2 },
      technical: { seasonality: 1, trend: 2 },
      economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: 1 }
    },
    {
      asset: 'BITCOIN',
      bias: 'Very Bullish',
      score: 11,
      sentiment: { cot: 2, retailPos: -1 },
      technical: { seasonality: 2, trend: 2 },
      economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
    },
    {
      asset: 'COPPER',
      bias: 'Very Bullish',
      score: 10,
      sentiment: { cot: 2, retailPos: -1 },
      technical: { seasonality: 1, trend: 2 },
      economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
    },
    {
      asset: 'USDZAR',
      bias: 'Very Bullish',
      score: 10,
      sentiment: { cot: 2, retailPos: -1 },
      technical: { seasonality: -1, trend: 2 },
      economic: { gdp: 2, mPMI: 2, sPMI: 1, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
    },
    {
      asset: 'PLATINUM',
      bias: 'Very Bullish',
      score: 9,
      sentiment: { cot: 2, retailPos: -1 },
      technical: { seasonality: 1, trend: 1 },
      economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
    },
    {
      asset: 'USDCAD',
      bias: 'Very Bullish',
      score: 9,
      sentiment: { cot: 2, retailPos: 1 },
      technical: { seasonality: 1, trend: 2 },
      economic: { gdp: 2, mPMI: 0, sPMI: 1, retailSales: 2, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 1 }
    },
    {
      asset: 'USDCHF',
      bias: 'Very Bullish',
      score: 9,
      sentiment: { cot: 2, retailPos: 0 },
      technical: { seasonality: -1, trend: 2 },
      economic: { gdp: 1, mPMI: 1, sPMI: 0, retailSales: 2, inflation: 0, employmentChange: 0, unemploymentRate: 2, interestRates: 0 }
    },
    {
      asset: 'EURGBP',
      bias: 'Bullish',
      score: 8,
      sentiment: { cot: 2, retailPos: 1 },
      technical: { seasonality: -1, trend: 2 },
      economic: { gdp: 1, mPMI: 0, sPMI: 2, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
    },
    {
      asset: 'AUDNZD',
      bias: 'Bullish',
      score: 5,
      sentiment: { cot: 0, retailPos: 1 },
      technical: { seasonality: 1, trend: 1 },
      economic: { gdp: 0, mPMI: 0, sPMI: 1, retailSales: 2, inflation: -1, employmentChange: 2, unemploymentRate: 2, interestRates: 0 }
    },
    {
      asset: 'EURNZD',
      bias: 'Bullish',
      score: 5,
      sentiment: { cot: 2, retailPos: 1 },
      technical: { seasonality: 1, trend: -2 },
      economic: { gdp: 1, mPMI: 0, sPMI: 1, retailSales: -2, inflation: 0, employmentChange: 2, unemploymentRate: 1, interestRates: 0 }
    },
    {
      asset: 'DOW',
      bias: 'Bullish',
      score: 5,
      sentiment: { cot: 0, retailPos: -2 },
      technical: { seasonality: 2, trend: -1 },
      economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
    },
    {
      asset: 'GBPAUD',
      bias: 'Bearish',
      score: -5,
      sentiment: { cot: 0, retailPos: -1 },
      technical: { seasonality: 1, trend: -2 },
      economic: { gdp: 0, mPMI: 0, sPMI: -2, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: 1, interestRates: 0 }
    },
    {
      asset: 'GBPCAD',
      bias: 'Bearish',
      score: -6,
      sentiment: { cot: 0, retailPos: -1 },
      technical: { seasonality: 1, trend: -2 },
      economic: { gdp: 0, mPMI: -2, sPMI: -1, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: 0 }
    },
    {
      asset: 'NZDCAD',
      bias: 'Bearish',
      score: -7,
      sentiment: { cot: 0, retailPos: -1 },
      technical: { seasonality: -1, trend: -2 },
      economic: { gdp: 0, mPMI: -2, sPMI: 0, retailSales: 2, inflation: 1, employmentChange: -2, unemploymentRate: -2, interestRates: 0 }
    },
    {
      asset: 'CHFJPY',
      bias: 'Bearish',
      score: -8,
      sentiment: { cot: 0, retailPos: 0 },
      technical: { seasonality: 1, trend: -2 },
      economic: { gdp: -1, mPMI: -1, sPMI: 0, retailSales: -2, inflation: -1, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
    },
    {
      asset: 'EURUSD',
      bias: 'Bearish',
      score: -8,
      sentiment: { cot: 0, retailPos: 0 },
      technical: { seasonality: 1, trend: -2 },
      economic: { gdp: -1, mPMI: -2, sPMI: 0, retailSales: -2, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
    },
    {
      asset: 'GBPCHF',
      bias: 'Very Bearish',
      score: -9,
      sentiment: { cot: 0, retailPos: -1 },
      technical: { seasonality: -1, trend: 2 },
      economic: { gdp: -1, mPMI: -1, sPMI: -2, retailSales: 0, inflation: -1, employmentChange: 0, unemploymentRate: 1, interestRates: -1 }
    }
  ]);

  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'bg-primary text-primary-foreground'; // Very Bullish - Neon Green
    if (score >= 4) return 'bg-primary/70 text-primary-foreground'; // Bullish - Light Green
    if (score >= -3) return 'bg-muted text-muted-foreground'; // Neutral - Gray
    if (score >= -7) return 'bg-destructive/70 text-destructive-foreground'; // Bearish - Light Red
    return 'bg-destructive text-destructive-foreground'; // Very Bearish - Red
  };

  const getCellColor = (value: number): string => {
    if (value === 2) return 'bg-primary text-primary-foreground'; // Strong positive
    if (value === 1) return 'bg-primary/50 text-foreground'; // Moderate positive
    if (value === 0) return 'bg-muted text-muted-foreground'; // Neutral
    if (value === -1) return 'bg-destructive/50 text-foreground'; // Moderate negative
    if (value === -2) return 'bg-destructive text-destructive-foreground'; // Strong negative
    return 'bg-muted text-muted-foreground';
  };

  const getBiasColor = (bias: string): string => {
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
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 2000);
  };

  const handleCurrencyClick = (asset: string) => {
    // Extract currency from asset pair (e.g., EURUSD -> EUR, USDCAD -> USD)
    let currency = '';
    if (asset.includes('USD')) {
      currency = asset === 'USDCAD' || asset === 'USDCHF' || asset === 'USDZAR' ? 'USD' : asset.replace('USD', '');
    } else if (asset === 'EURGBP') {
      currency = 'EUR';
    } else if (asset === 'AUDNZD') {
      currency = 'AUD';
    } else if (asset === 'EURNZD') {
      currency = 'EUR';
    } else if (asset === 'GBPAUD' || asset === 'GBPCAD' || asset === 'GBPCHF') {
      currency = 'GBP';
    } else if (asset === 'NZDCAD') {
      currency = 'NZD';
    } else if (asset === 'CHFJPY') {
      currency = 'CHF';
    } else {
      // For single assets like BITCOIN, COPPER, etc., default to USD
      currency = 'USD';
    }
    
    setSelectedCurrency(currency);
    setShowCurrencyOverview(true);
  };

  if (showCurrencyOverview) {
    return (
      <CurrencyOverview 
        onBack={() => setShowCurrencyOverview(false)}
        onLogout={onLogout}
        selectedCurrency={selectedCurrency}
      />
    );
  }

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
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Market Heatmap</h1>
                  <p className="text-sm text-foreground/70">Real-time currency strength analysis</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
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
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Live Market Data
            </Badge>
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Bullish</span>
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span>Neutral</span>
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Bearish</span>
            </div>
          </div>
        </div>

        {/* Heatmap Table */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <span>Currency Strength Heatmap</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-semibold bg-muted/20">Asset</th>
                    <th className="text-center p-4 font-semibold bg-muted/20">Bias</th>
                    <th className="text-center p-4 font-semibold bg-muted/20">Score</th>
                    
                    {/* Sentiment Column */}
                    <th className="text-center p-2 font-semibold bg-red-900/20 text-red-300" colSpan={2}>Sentiment</th>
                    
                    {/* Technical Column */}
                    <th className="text-center p-2 font-semibold bg-blue-900/20 text-blue-300" colSpan={2}>Technical</th>
                    
                    {/* Economic Data Column */}
                    <th className="text-center p-2 font-semibold bg-purple-900/20 text-purple-300" colSpan={8}>Economic Data</th>
                  </tr>
                  <tr className="border-b border-border/50 text-xs">
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="p-2 text-center bg-red-900/10">COT</th>
                    <th className="p-2 text-center bg-red-900/10">Retail Pos</th>
                    <th className="p-2 text-center bg-blue-900/10">Seasonality</th>
                    <th className="p-2 text-center bg-blue-900/10">Trend</th>
                    <th className="p-2 text-center bg-purple-900/10">GDP</th>
                    <th className="p-2 text-center bg-purple-900/10">mPMI</th>
                    <th className="p-2 text-center bg-purple-900/10">sPMI</th>
                    <th className="p-2 text-center bg-purple-900/10">Retail Sales</th>
                    <th className="p-2 text-center bg-purple-900/10">Inflation</th>
                    <th className="p-2 text-center bg-purple-900/10">Employment Change</th>
                    <th className="p-2 text-center bg-purple-900/10">Unemployment Rate</th>
                    <th className="p-2 text-center bg-purple-900/10">Interest Rates</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-primary">{item.asset}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleCurrencyClick(item.asset)}
                            title="View Currency Overview"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Badge className={getBiasColor(item.bias)}>
                          {item.bias}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge className={getScoreColor(item.score)}>
                          {item.score}
                        </Badge>
                      </td>
                      
                      {/* Sentiment Data */}
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.sentiment.cot)}`}>
                        {item.sentiment.cot}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.sentiment.retailPos)}`}>
                        {item.sentiment.retailPos}
                      </td>
                      
                      {/* Technical Data */}
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.technical.seasonality)}`}>
                        {item.technical.seasonality}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.technical.trend)}`}>
                        {item.technical.trend}
                      </td>
                      
                      {/* Economic Data */}
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.gdp)}`}>
                        {item.economic.gdp}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.mPMI)}`}>
                        {item.economic.mPMI}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.sPMI)}`}>
                        {item.economic.sPMI}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.retailSales)}`}>
                        {item.economic.retailSales}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.inflation)}`}>
                        {item.economic.inflation}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.employmentChange)}`}>
                        {item.economic.employmentChange}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.unemploymentRate)}`}>
                        {item.economic.unemploymentRate}
                      </td>
                      <td className={`p-2 text-center text-sm font-medium ${getCellColor(item.economic.interestRates)}`}>
                        {item.economic.interestRates}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Strongest Assets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {heatmapData
                  .filter(item => item.score > 8)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
                      <span className="font-medium">{item.asset}</span>
                      <Badge className="bg-primary/20 text-primary">+{item.score}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="w-5 h-5 text-secondary" />
                <span>Market Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bullish Assets:</span>
                  <span className="font-semibold text-primary">
                    {heatmapData.filter(item => item.score > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bearish Assets:</span>
                  <span className="font-semibold text-destructive">
                    {heatmapData.filter(item => item.score < 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Neutral Assets:</span>
                  <span className="font-semibold text-muted-foreground">
                    {heatmapData.filter(item => item.score === 0).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Zap className="w-5 h-5 text-secondary" />
                <span>Trading Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="font-semibold text-primary mb-1">High Conviction</div>
                  <div className="text-sm text-muted-foreground">
                    {heatmapData.filter(item => Math.abs(item.score) > 8).length} assets with strong signals
                  </div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="font-semibold text-secondary mb-1">Medium Conviction</div>
                  <div className="text-sm text-muted-foreground">
                    {heatmapData.filter(item => Math.abs(item.score) >= 4 && Math.abs(item.score) <= 8).length} assets with moderate signals
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Eye className="w-5 h-5 text-primary" />
                <span>Currency Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="font-semibold text-primary mb-1">Individual Analysis</div>
                  <div className="text-sm text-muted-foreground">
                    Click the eye icon next to any asset to view detailed fundamental analysis
                  </div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="font-semibold text-secondary mb-1">Economic Indicators</div>
                  <div className="text-sm text-muted-foreground">
                    GDP, PMI, inflation, employment data and more
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};