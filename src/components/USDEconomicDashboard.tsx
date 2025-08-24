import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  BarChart3,
  Activity,
  DollarSign,
  TrendingUp,
  Users,
  TrendingDown,
  Zap,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

interface EconomicIndicator {
  id: string;
  name: string;
  impact: 'High' | 'Mid';
  direction: 'Higher positive' | 'Lower positive' | 'Tighter positive';
  unit: 'percentage points' | 'thousands' | 'index points';
  frequency: string;
  actual?: number;
  forecast?: number;
  previous?: number;
  change?: number;
  nextRelease?: string;
  description: string;
}

interface CategoryData {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  indicators: EconomicIndicator[];
  description: string;
}

interface USDEconomicDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

export const USDEconomicDashboard: React.FC<USDEconomicDashboardProps> = ({ onBack, onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: CategoryData[] = [
    {
      id: 'gdp',
      name: 'GDP',
      icon: BarChart3,
      color: 'primary',
      description: 'Gross Domestic Product measures the total economic output and growth',
      indicators: [
        {
          id: 'gdp-advance',
          name: 'GDP Annualized q/q (Advance)',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Quarterly',
          actual: 3.1,
          forecast: 2.8,
          previous: 2.9,
          change: 0.2,
          nextRelease: 'Jan 25, 2024',
          description: 'First estimate of quarterly GDP growth, annualized'
        },
        {
          id: 'gdp-second',
          name: 'GDP Annualized q/q (Second)',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Quarterly',
          actual: 3.2,
          forecast: 3.1,
          previous: 3.1,
          change: 0.1,
          nextRelease: 'Feb 28, 2024',
          description: 'Second estimate of quarterly GDP growth with more complete data'
        },
        {
          id: 'gdp-final',
          name: 'GDP Annualized q/q (Final)',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Quarterly',
          actual: 3.3,
          forecast: 3.2,
          previous: 3.2,
          change: 0.1,
          nextRelease: 'Mar 28, 2024',
          description: 'Final estimate of quarterly GDP growth with comprehensive data'
        }
      ]
    },
    {
      id: 'pmi',
      name: 'PMI & Business',
      icon: Activity,
      color: 'secondary',
      description: 'Purchasing Managers Index and business sentiment surveys',
      indicators: [
        {
          id: 'ism-manufacturing',
          name: 'ISM Manufacturing PMI',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'index points',
          frequency: 'Monthly',
          actual: 49.3,
          forecast: 48.2,
          previous: 48.1,
          change: 1.2,
          nextRelease: 'Jan 20, 2024',
          description: 'Manufacturing sector activity and business conditions'
        },
        {
          id: 'ism-services',
          name: 'ISM Services PMI',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'index points',
          frequency: 'Monthly',
          actual: 54.1,
          forecast: 53.5,
          previous: 53.8,
          change: 0.3,
          nextRelease: 'Jan 21, 2024',
          description: 'Services sector activity and business conditions'
        },
        {
          id: 'sp-manufacturing-flash',
          name: 'S&P Global Manufacturing PMI (Flash)',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'index points',
          frequency: 'Monthly',
          actual: 48.9,
          forecast: 48.5,
          previous: 48.2,
          change: 0.7,
          nextRelease: 'Jan 24, 2024',
          description: 'Flash estimate of S&P Global Manufacturing PMI'
        },
        {
          id: 'sp-services-flash',
          name: 'S&P Global Services PMI (Flash)',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'index points',
          frequency: 'Monthly',
          actual: 52.3,
          forecast: 52.0,
          previous: 51.8,
          change: 0.5,
          nextRelease: 'Jan 24, 2024',
          description: 'Flash estimate of S&P Global Services PMI'
        }
      ]
    },
    {
      id: 'retail',
      name: 'Retail Sales',
      icon: DollarSign,
      color: 'primary',
      description: 'Consumer spending and retail activity indicators',
      indicators: [
        {
          id: 'retail-sales',
          name: 'Retail Sales m/m',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.4,
          forecast: 0.6,
          previous: 0.2,
          change: 0.2,
          nextRelease: 'Jan 18, 2024',
          description: 'Month-over-month change in retail sales volume'
        },
        {
          id: 'retail-sales-ex-autos',
          name: 'Retail Sales ex-Autos m/m',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.3,
          forecast: 0.4,
          previous: 0.1,
          change: 0.2,
          nextRelease: 'Jan 18, 2024',
          description: 'Retail sales excluding automotive sales'
        },
        {
          id: 'retail-control-group',
          name: 'Retail Sales Control Group m/m',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.2,
          forecast: 0.3,
          previous: 0.0,
          change: 0.2,
          nextRelease: 'Jan 18, 2024',
          description: 'Retail sales control group used in GDP calculations'
        }
      ]
    },
    {
      id: 'inflation',
      name: 'Inflation',
      icon: TrendingUp,
      color: 'secondary',
      description: 'Price level changes and inflation measures',
      indicators: [
        {
          id: 'cpi-yoy',
          name: 'CPI y/y',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 2.9,
          forecast: 2.9,
          previous: 3.1,
          change: -0.2,
          nextRelease: 'Jan 22, 2024',
          description: 'Consumer Price Index year-over-year'
        },
        {
          id: 'cpi-mom',
          name: 'CPI m/m',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.2,
          forecast: 0.3,
          previous: 0.4,
          change: -0.2,
          nextRelease: 'Jan 22, 2024',
          description: 'Consumer Price Index month-over-month'
        },
        {
          id: 'core-cpi-yoy',
          name: 'Core CPI y/y',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 2.8,
          forecast: 2.9,
          previous: 3.0,
          change: -0.2,
          nextRelease: 'Jan 22, 2024',
          description: 'Core CPI excluding food and energy year-over-year'
        },
        {
          id: 'core-cpi-mom',
          name: 'Core CPI m/m',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.2,
          forecast: 0.3,
          previous: 0.3,
          change: -0.1,
          nextRelease: 'Jan 22, 2024',
          description: 'Core CPI excluding food and energy month-over-month'
        },
        {
          id: 'ppi-final-yoy',
          name: 'PPI Final Demand y/y',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 3.3,
          forecast: 3.5,
          previous: 3.6,
          change: -0.3,
          nextRelease: 'Jan 23, 2024',
          description: 'Producer Price Index Final Demand year-over-year'
        },
        {
          id: 'ppi-final-mom',
          name: 'PPI Final Demand m/m',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.1,
          forecast: 0.2,
          previous: 0.3,
          change: -0.2,
          nextRelease: 'Jan 23, 2024',
          description: 'Producer Price Index Final Demand month-over-month'
        },
        {
          id: 'core-ppi-yoy',
          name: 'Core PPI y/y',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 2.8,
          forecast: 3.0,
          previous: 3.2,
          change: -0.4,
          nextRelease: 'Jan 23, 2024',
          description: 'Core Producer Price Index year-over-year'
        },
        {
          id: 'core-ppi-mom',
          name: 'Core PPI m/m',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.0,
          forecast: 0.1,
          previous: 0.2,
          change: -0.2,
          nextRelease: 'Jan 23, 2024',
          description: 'Core Producer Price Index month-over-month'
        },
        {
          id: 'import-price',
          name: 'Import Price Index m/m',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: -0.2,
          forecast: 0.0,
          previous: 0.1,
          change: -0.3,
          nextRelease: 'Jan 24, 2024',
          description: 'Import Price Index month-over-month'
        },
        {
          id: 'export-price',
          name: 'Export Price Index m/m',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: -0.1,
          forecast: 0.0,
          previous: 0.2,
          change: -0.3,
          nextRelease: 'Jan 24, 2024',
          description: 'Export Price Index month-over-month'
        },
        {
          id: 'pce-yoy',
          name: 'PCE Price Index y/y',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 2.6,
          forecast: 2.7,
          previous: 2.9,
          change: -0.3,
          nextRelease: 'Jan 26, 2024',
          description: 'Personal Consumption Expenditures Price Index year-over-year'
        },
        {
          id: 'pce-mom',
          name: 'PCE Price Index m/m',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.1,
          forecast: 0.2,
          previous: 0.3,
          change: -0.2,
          nextRelease: 'Jan 26, 2024',
          description: 'Personal Consumption Expenditures Price Index month-over-month'
        },
        {
          id: 'core-pce-yoy',
          name: 'Core PCE Price Index y/y',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 2.8,
          forecast: 2.9,
          previous: 3.0,
          change: -0.2,
          nextRelease: 'Jan 26, 2024',
          description: 'Core PCE Price Index excluding food and energy year-over-year'
        },
        {
          id: 'core-pce-mom',
          name: 'Core PCE Price Index m/m',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.2,
          forecast: 0.3,
          previous: 0.3,
          change: -0.1,
          nextRelease: 'Jan 26, 2024',
          description: 'Core PCE Price Index excluding food and energy month-over-month'
        }
      ]
    },
    {
      id: 'employment',
      name: 'Employment',
      icon: Users,
      color: 'primary',
      description: 'Job creation and employment change indicators',
      indicators: [
        {
          id: 'nfp',
          name: 'Non-Farm Payrolls (NFP)',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'thousands',
          frequency: 'Monthly',
          actual: 256,
          forecast: 160,
          previous: 227,
          change: 29,
          nextRelease: 'Jan 19, 2024',
          description: 'Change in number of employed people in non-agricultural sectors'
        },
        {
          id: 'adp',
          name: 'ADP Employment Change',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'thousands',
          frequency: 'Monthly',
          actual: 122,
          forecast: 139,
          previous: 146,
          change: -24,
          nextRelease: 'Jan 17, 2024',
          description: 'ADP private sector employment change'
        },
        {
          id: 'jolts',
          name: 'JOLTS Job Openings',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'thousands',
          frequency: 'Monthly',
          actual: 8100,
          forecast: 7730,
          previous: 7673,
          change: 427,
          nextRelease: 'Jan 30, 2024',
          description: 'Job Openings and Labor Turnover Survey'
        },
        {
          id: 'jobless-claims',
          name: 'Initial Jobless Claims',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'thousands',
          frequency: 'Weekly',
          actual: 223,
          forecast: 221,
          previous: 220,
          change: 3,
          nextRelease: 'Jan 18, 2024',
          description: 'Weekly initial claims for unemployment insurance'
        }
      ]
    },
    {
      id: 'unemployment',
      name: 'Unemployment',
      icon: TrendingDown,
      color: 'secondary',
      description: 'Unemployment rates and labor market conditions',
      indicators: [
        {
          id: 'unemployment-rate',
          name: 'Unemployment Rate',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 4.1,
          forecast: 4.2,
          previous: 4.2,
          change: -0.1,
          nextRelease: 'Jan 19, 2024',
          description: 'Percentage of labor force that is unemployed'
        },
        {
          id: 'participation-rate',
          name: 'Participation Rate',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 62.5,
          forecast: 62.4,
          previous: 62.3,
          change: 0.2,
          nextRelease: 'Jan 19, 2024',
          description: 'Labor force participation rate'
        },
        {
          id: 'hourly-earnings-yoy',
          name: 'Average Hourly Earnings y/y',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 4.0,
          forecast: 3.9,
          previous: 4.1,
          change: -0.1,
          nextRelease: 'Jan 19, 2024',
          description: 'Average hourly earnings year-over-year'
        },
        {
          id: 'hourly-earnings-mom',
          name: 'Average Hourly Earnings m/m',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'percentage points',
          frequency: 'Monthly',
          actual: 0.4,
          forecast: 0.3,
          previous: 0.4,
          change: 0.0,
          nextRelease: 'Jan 19, 2024',
          description: 'Average hourly earnings month-over-month'
        }
      ]
    },
    {
      id: 'rates',
      name: 'Interest Rates',
      icon: Zap,
      color: 'primary',
      description: 'Federal Reserve monetary policy decisions',
      indicators: [
        {
          id: 'fed-rate',
          name: 'Fed Funds Rate Decision + Statement + SEP/Dot Plot + Press Conference',
          impact: 'High',
          direction: 'Tighter positive',
          unit: 'percentage points',
          frequency: '8 times per year',
          actual: 5.5,
          forecast: 5.5,
          previous: 5.5,
          change: 0,
          nextRelease: 'Jan 31, 2024',
          description: 'Federal Reserve interest rate decision with comprehensive policy communication'
        }
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    return impact === 'High' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'Higher positive': return 'text-primary';
      case 'Lower positive': return 'text-secondary';
      case 'Tighter positive': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeColor = (change: number, direction: string) => {
    if (change === 0) return 'text-muted-foreground';
    
    const isPositive = change > 0;
    const isGoodForCurrency = 
      (direction === 'Higher positive' && isPositive) ||
      (direction === 'Lower positive' && !isPositive) ||
      (direction === 'Tighter positive' && isPositive);
    
    return isGoodForCurrency ? 'text-primary' : 'text-destructive';
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'thousands') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}M` : `${value}K`;
    }
    return `${value}${unit === 'percentage points' ? '%' : ''}`;
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
          <div className="container-max mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center space-x-3">
                  <div className={`bg-${selectedCategoryData.color}/10 p-2 rounded-lg`}>
                    <selectedCategoryData.icon className={`w-6 h-6 text-${selectedCategoryData.color}`} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold gradient-text">{selectedCategoryData.name}</h1>
                    <p className="text-sm text-foreground/70">{selectedCategoryData.description}</p>
                  </div>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Clock className="w-4 h-4 mr-2" />
                Live Data
              </Badge>
            </div>
          </div>
        </header>

        <div className="container-max mx-auto px-6 py-8">
          {/* Category Overview */}
          <Card className="military-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <selectedCategoryData.icon className={`w-5 h-5 text-${selectedCategoryData.color}`} />
                <span>{selectedCategoryData.name} Indicators</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {selectedCategoryData.indicators.map(indicator => (
                  <Card key={indicator.id} className="military-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{indicator.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getImpactColor(indicator.impact)}>
                            {indicator.impact} Impact
                          </Badge>
                          <Badge variant="outline" className={getDirectionColor(indicator.direction)}>
                            {indicator.direction}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{indicator.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Actual</div>
                          <div className="text-lg font-bold">
                            {indicator.actual !== undefined ? formatValue(indicator.actual, indicator.unit) : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Forecast</div>
                          <div className="text-lg font-semibold">
                            {indicator.forecast !== undefined ? formatValue(indicator.forecast, indicator.unit) : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Previous</div>
                          <div className="text-lg">
                            {indicator.previous !== undefined ? formatValue(indicator.previous, indicator.unit) : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Change Δ</div>
                          <div className={`text-lg font-bold ${indicator.change !== undefined ? getChangeColor(indicator.change, indicator.direction) : 'text-muted-foreground'}`}>
                            {indicator.change !== undefined ? 
                              `${indicator.change > 0 ? '+' : ''}${formatValue(indicator.change, indicator.unit)}` : 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Frequency: {indicator.frequency}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Unit: {indicator.unit}</span>
                          </div>
                        </div>
                        {indicator.nextRelease && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-primary font-medium">Next: {indicator.nextRelease}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
                Back to Overview
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">US Dollar Economic Dashboard</h1>
                  <p className="text-sm text-foreground/70">Comprehensive fundamental analysis</p>
                </div>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Clock className="w-4 h-4 mr-2" />
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        {/* Main Dashboard */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            US Dollar
            <span className="block gradient-text">Economic Categories</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Click on any category to view detailed economic indicators and their impact on USD strength
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map(category => (
            <Card 
              key={category.id}
              className="military-card cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg group"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`bg-${category.color}/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${category.color}/20 transition-colors`}>
                  <category.icon className={`w-8 h-8 text-${category.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                <p className="text-sm text-foreground/70">{category.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Indicators:</span>
                    <span className="font-semibold text-primary">{category.indicators.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">High Impact:</span>
                    <span className="font-semibold text-primary">
                      {category.indicators.filter(i => i.impact === 'High').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mid Impact:</span>
                    <span className="font-semibold text-secondary">
                      {category.indicators.filter(i => i.impact === 'Mid').length}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className={`w-full mt-4 bg-${category.color} hover:bg-${category.color}/90 text-${category.color}-foreground group`}
                  size="sm"
                >
                  View Details
                  <ArrowLeft className="ml-2 w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Summary */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Dashboard Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {categories.reduce((sum, cat) => sum + cat.indicators.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Indicators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {categories.reduce((sum, cat) => sum + cat.indicators.filter(i => i.impact === 'High').length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">High Impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-2">
                  {categories.reduce((sum, cat) => sum + cat.indicators.filter(i => i.impact === 'Mid').length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Mid Impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">7</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};