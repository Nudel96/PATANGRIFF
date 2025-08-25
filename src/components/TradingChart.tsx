import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  Maximize,
  Download,
  Share,
  Settings
} from 'lucide-react';

interface TradingChartProps {
  instrument: string;
  timeframe: string;
  data?: any;
  showControls?: boolean;
  height?: number;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  instrument,
  timeframe,
  data,
  showControls = true,
  height = 400
}) => {
  return (
    <Card className="military-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>{instrument} - {timeframe}</span>
          </CardTitle>
          {showControls && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart Placeholder */}
        <div 
          className="bg-muted/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border/50"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">TradingView Chart Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Interactive {instrument} chart for {timeframe} timeframe
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Real-time data</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-secondary" />
                <span>Technical indicators</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-primary" />
                <span>Drawing tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        {showControls && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Live Data</Badge>
              <Badge variant="outline">Technical Analysis</Badge>
              <Badge variant="outline">Drawing Tools</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Powered by TradingView
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};