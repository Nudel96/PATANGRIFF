import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { USDEconomicDashboard } from './USDEconomicDashboard';
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
  const [showUSDDashboard, setShowUSDDashboard] = useState(false);
  const currencyData: Record<string, CurrencyData> = {
    USD: {
      code: 'USD',
      name: 'US Dollar',
      flag: '🇺🇸',
      overallScore: 8.2,
      bias: 'Very Bullish',
      lastUpdated: new Date(),
      indicators: [
        // GDP Category
        {
          id: 'usd-gdp',
          name: 'GDP Annualized q/q (Advance)',
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
          description: 'Measures the annualized change in the value of goods and services produced (Advance estimate)'
        },
        {
          id: 'usd-gdp-second',
          name: 'GDP Annualized q/q (Second)',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-02-28'),
          lastValue: 3.2,
          forecast: 3.1,
          previous: 3.1,
          change: 0.1,
          weight: 1.0,
          description: 'Second estimate of GDP annualized quarterly change'
        },
        {
          id: 'usd-gdp-final',
          name: 'GDP Annualized q/q (Final)',
          category: 'GDP',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Quarterly',
          nextRelease: new Date('2024-03-28'),
          lastValue: 3.3,
          forecast: 3.2,
          previous: 3.2,
          change: 0.1,
          weight: 1.0,
          description: 'Final estimate of GDP annualized quarterly change'
        },
        // PMI and Business Surveys Category
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
          id: 'usd-ism-services',
          name: 'ISM Services PMI',
          category: 'PMI',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'index',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-21'),
          lastValue: 54.1,
          forecast: 53.5,
          previous: 53.8,
          change: 0.3,
          weight: 1.0,
          description: 'Measures services sector activity and business conditions'
        },
        {
          id: 'usd-sp-mfg-flash',
          name: 'S&P Global Manufacturing PMI (Flash)',
          category: 'PMI',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'index',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-24'),
          lastValue: 48.9,
          forecast: 48.5,
          previous: 48.2,
          change: 0.7,
          weight: 0.7,
          isFlash: true,
          description: 'Flash estimate of S&P Global Manufacturing PMI'
        },
        {
          id: 'usd-sp-services-flash',
          name: 'S&P Global Services PMI (Flash)',
          category: 'PMI',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'index',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-24'),
          lastValue: 52.3,
          forecast: 52.0,
          previous: 51.8,
          change: 0.5,
          weight: 0.7,
          isFlash: true,
          description: 'Flash estimate of S&P Global Services PMI'
        },
        // Retail Sales Category
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
          id: 'usd-retail-sales-ex-autos',
          name: 'Retail Sales ex-Autos m/m',
          category: 'Retail Sales',
          impact: 'High',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-18'),
          lastValue: 0.3,
          forecast: 0.4,
          previous: 0.1,
          change: 0.2,
          weight: 1.0,
          description: 'Retail sales excluding automotive sales month-over-month'
        },
        {
          id: 'usd-retail-control-group',
          name: 'Retail Sales Control Group m/m',
          category: 'Retail Sales',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-18'),
          lastValue: 0.2,
          forecast: 0.3,
          previous: 0.0,
          change: 0.2,
          weight: 0.7,
          description: 'Retail sales control group used in GDP calculations'
        },
        // Inflation Category
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
          description: 'Consumer Price Index year-over-year measures inflation in consumer goods and services'
        },
        {
          id: 'usd-cpi-mom',
          name: 'CPI m/m',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-22'),
          lastValue: 0.2,
          forecast: 0.3,
          previous: 0.4,
          change: -0.2,
          weight: 1.0,
          description: 'Consumer Price Index month-over-month change'
        },
        {
          id: 'usd-core-cpi-yoy',
          name: 'Core CPI y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-22'),
          lastValue: 2.8,
          forecast: 2.9,
          previous: 3.0,
          change: -0.2,
          weight: 1.0,
          description: 'Core CPI excluding food and energy year-over-year'
        },
        {
          id: 'usd-core-cpi-mom',
          name: 'Core CPI m/m',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-22'),
          lastValue: 0.2,
          forecast: 0.3,
          previous: 0.3,
          change: -0.1,
          weight: 1.0,
          description: 'Core CPI excluding food and energy month-over-month'
        },
        {
          id: 'usd-ppi-final-yoy',
          name: 'PPI Final Demand y/y',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-23'),
          lastValue: 3.3,
          forecast: 3.5,
          previous: 3.6,
          change: -0.3,
          weight: 0.7,
          description: 'Producer Price Index Final Demand year-over-year'
        },
        {
          id: 'usd-ppi-final-mom',
          name: 'PPI Final Demand m/m',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-23'),
          lastValue: 0.1,
          forecast: 0.2,
          previous: 0.3,
          change: -0.2,
          weight: 0.7,
          description: 'Producer Price Index Final Demand month-over-month'
        },
        {
          id: 'usd-core-ppi-yoy',
          name: 'Core PPI y/y',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-23'),
          lastValue: 2.8,
          forecast: 3.0,
          previous: 3.2,
          change: -0.4,
          weight: 0.7,
          description: 'Core Producer Price Index year-over-year'
        },
        {
          id: 'usd-core-ppi-mom',
          name: 'Core PPI m/m',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-23'),
          lastValue: 0.0,
          forecast: 0.1,
          previous: 0.2,
          change: -0.2,
          weight: 0.7,
          description: 'Core Producer Price Index month-over-month'
        },
        {
          id: 'usd-import-price',
          name: 'Import Price Index m/m',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-24'),
          lastValue: -0.2,
          forecast: 0.0,
          previous: 0.1,
          change: -0.3,
          weight: 0.7,
          description: 'Import Price Index month-over-month change'
        },
        {
          id: 'usd-export-price',
          name: 'Export Price Index m/m',
          category: 'Inflation',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-24'),
          lastValue: -0.1,
          forecast: 0.0,
          previous: 0.2,
          change: -0.3,
          weight: 0.7,
          description: 'Export Price Index month-over-month change'
        },
        {
          id: 'usd-pce-yoy',
          name: 'PCE Price Index y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-26'),
          lastValue: 2.6,
          forecast: 2.7,
          previous: 2.9,
          change: -0.3,
          weight: 1.0,
          description: 'Personal Consumption Expenditures Price Index year-over-year'
        },
        {
          id: 'usd-pce-mom',
          name: 'PCE Price Index m/m',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-26'),
          lastValue: 0.1,
          forecast: 0.2,
          previous: 0.3,
          change: -0.2,
          weight: 1.0,
          description: 'Personal Consumption Expenditures Price Index month-over-month'
        },
        {
          id: 'usd-core-pce-yoy',
          name: 'Core PCE Price Index y/y',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-26'),
          lastValue: 2.8,
          forecast: 2.9,
          previous: 3.0,
          change: -0.2,
          weight: 1.0,
          description: 'Core PCE Price Index excluding food and energy year-over-year'
        },
        {
          id: 'usd-core-pce-mom',
          name: 'Core PCE Price Index m/m',
          category: 'Inflation',
          impact: 'High',
          direction: 'Lower positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-26'),
          lastValue: 0.2,
          forecast: 0.3,
          previous: 0.3,
          change: -0.1,
          weight: 1.0,
          description: 'Core PCE Price Index excluding food and energy month-over-month'
        },
        // Employment Change Category
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
          id: 'usd-adp',
          name: 'ADP Employment Change',
          category: 'Employment Change',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'k',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-17'),
          lastValue: 122,
          forecast: 139,
          previous: 146,
          change: -24,
          weight: 0.7,
          description: 'ADP private sector employment change'
        },
        {
          id: 'usd-jolts',
          name: 'JOLTS Job Openings',
          category: 'Employment Change',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'k',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-30'),
          lastValue: 8100,
          forecast: 7730,
          previous: 7673,
          change: 427,
          weight: 0.7,
          description: 'Job Openings and Labor Turnover Survey - available job positions'
        },
        {
          id: 'usd-jobless-claims',
          name: 'Initial Jobless Claims',
          category: 'Employment Change',
          impact: 'Mid',
          direction: 'Lower positive',
          unit: 'k',
          frequency: 'Weekly',
          nextRelease: new Date('2024-01-18'),
          lastValue: 223,
          forecast: 221,
          previous: 220,
          change: 3,
          weight: 0.7,
          description: 'Weekly initial claims for unemployment insurance'
        },
        // Unemployment Category
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
          id: 'usd-participation-rate',
          name: 'Participation Rate',
          category: 'Unemployment',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-19'),
          lastValue: 62.5,
          forecast: 62.4,
          previous: 62.3,
          change: 0.2,
          weight: 0.7,
          description: 'Labor force participation rate as percentage of working-age population'
        },
        {
          id: 'usd-hourly-earnings-yoy',
          name: 'Average Hourly Earnings y/y',
          category: 'Unemployment',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-19'),
          lastValue: 4.0,
          forecast: 3.9,
          previous: 4.1,
          change: -0.1,
          weight: 0.7,
          description: 'Average hourly earnings year-over-year change'
        },
        {
          id: 'usd-hourly-earnings-mom',
          name: 'Average Hourly Earnings m/m',
          category: 'Unemployment',
          impact: 'Mid',
          direction: 'Higher positive',
          unit: 'pp',
          frequency: 'Monthly',
          nextRelease: new Date('2024-01-19'),
          lastValue: 0.4,
          forecast: 0.3,
          previous: 0.4,
          change: 0.0,
          weight: 0.7,
          description: 'Average hourly earnings month-over-month change'
        },
        // Interest Rates Category
        {
          id: 'usd-fed-rate',
          name: 'Fed Funds Rate Decision + Statement + SEP/Dot Plot + Press Conference',
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
          description: 'Federal Reserve interest rate decision with comprehensive policy communication including SEP projections and press conference'
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
    { id: 'Unemployment', name: 'Unemployment', icon: AlertCircle },
    { id: 'Interest Rates', name: 'Interest Rates', icon: Zap }
  ];

  const getChangeColor = (change: number, direction: string, asset: string) => {
    if (change === undefined) return 'text-muted-foreground';
    
    const isPositive = change > 0;
    const isGoodForCurrency = 
      (direction === 'Higher positive' && isPositive) ||
      (direction === 'Lower positive' && !isPositive) ||
      (direction === 'Tighter positive' && isPositive);
    
    // Extract currency from asset pair for other currencies
    let currency = '';
    if (asset.includes('USD')) {
      currency = asset.replace('USD', '');
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
      currency = 'USD';
    }
    
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

  const handleCurrencyClick = (currency: string) => {
    // Check if it's a USD-related asset for comprehensive dashboard
    if (currency === 'USD') {
      setShowUSDDashboard(true);
      return;
    }
    setActiveCurrency(currency);
  };

  if (showUSDDashboard) {
    return (
      <USDEconomicDashboard 
        onBack={() => setShowUSDDashboard(false)}
        onLogout={onLogout}
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
                  onClick={() => handleCurrencyClick(currency)}
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
            {/* Simplified Economic Dashboard */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>{currentCurrency.name} Economic Dashboard</span>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Live Data
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <th className="text-left p-4 font-semibold">Metric</th>
                        <th className="text-center p-4 font-semibold">Actual</th>
                        <th className="text-center p-4 font-semibold">Forecasted</th>
                        <th className="text-center p-4 font-semibold">Change Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* GDP Growth */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">GDP Growth</td>
                        <td className="p-4 text-center font-bold">3.10%</td>
                        <td className="p-4 text-center">2.80%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">0.30%</Badge>
                        </td>
                      </tr>
                      
                      {/* Manufacturing PMIs */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Manufacturing PMIs</td>
                        <td className="p-4 text-center font-bold">49.3</td>
                        <td className="p-4 text-center">48.2</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">1.10</Badge>
                        </td>
                      </tr>
                      
                      {/* Services PMIs */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Services PMIs</td>
                        <td className="p-4 text-center font-bold">54.1</td>
                        <td className="p-4 text-center">53.5</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">0.60</Badge>
                        </td>
                      </tr>
                      
                      {/* Retail Sales MoM */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Retail Sales MoM</td>
                        <td className="p-4 text-center font-bold">0.40</td>
                        <td className="p-4 text-center">0.60</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-destructive/20 text-destructive">-0.20</Badge>
                        </td>
                      </tr>
                      
                      {/* CPI YoY */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">CPI YoY</td>
                        <td className="p-4 text-center font-bold">2.9%</td>
                        <td className="p-4 text-center">2.9%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-muted text-muted-foreground">0.0%</Badge>
                        </td>
                      </tr>
                      
                      {/* Core CPI MoM */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Core CPI MoM</td>
                        <td className="p-4 text-center font-bold">0.2%</td>
                        <td className="p-4 text-center">0.3%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">-0.1%</Badge>
                        </td>
                      </tr>
                      
                      {/* PPI YoY */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">PPI YoY</td>
                        <td className="p-4 text-center font-bold">3.3%</td>
                        <td className="p-4 text-center">3.5%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">-0.2%</Badge>
                        </td>
                      </tr>
                      
                      {/* Core PCE */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Core PCE</td>
                        <td className="p-4 text-center font-bold">2.8%</td>
                        <td className="p-4 text-center">2.9%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">-0.10%</Badge>
                        </td>
                      </tr>
                      
                      {/* NFP */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">NFP</td>
                        <td className="p-4 text-center font-bold">256k</td>
                        <td className="p-4 text-center">160k</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">96k</Badge>
                        </td>
                      </tr>
                      
                      {/* Unemployment Rate */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Unemployment Rate</td>
                        <td className="p-4 text-center font-bold">4.1%</td>
                        <td className="p-4 text-center">4.2%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">-0.1%</Badge>
                        </td>
                      </tr>
                      
                      {/* Unemployment Claims */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">Unemployment Claims</td>
                        <td className="p-4 text-center font-bold">223K</td>
                        <td className="p-4 text-center">221K</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-destructive/20 text-destructive">+2K</Badge>
                        </td>
                      </tr>
                      
                      {/* ADP (USD) */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">ADP (USD)</td>
                        <td className="p-4 text-center font-bold">122K</td>
                        <td className="p-4 text-center">139K</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-destructive/20 text-destructive">-17K</Badge>
                        </td>
                      </tr>
                      
                      {/* JOLTS Job Openings */}
                      <tr className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">JOLTS Job Openings</td>
                        <td className="p-4 text-center font-bold">8.10M</td>
                        <td className="p-4 text-center">7.73M</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary/20 text-primary">0.37M</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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