import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, LogOut, Activity, BarChart3 } from 'lucide-react';

interface USDEconomicDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

export const USDEconomicDashboard: React.FC<USDEconomicDashboardProps> = ({ onBack, onLogout }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Currency Overview
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">USD Economic Dashboard</h1>
                  <p className="text-sm text-foreground/70">Comprehensive US Dollar analysis</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>USD Economic Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">USD Economic Dashboard</h3>
              <p className="text-muted-foreground mb-6">
                Detailed USD economic analysis dashboard coming soon.
              </p>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                Under Development
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};