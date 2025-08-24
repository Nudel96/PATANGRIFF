import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, TrendingUp } from 'lucide-react';

export const PositioningStatement = () => {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Why Bias-Tool-Solo Works
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Guessing.
            <span className="block gradient-text">Start Knowing.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - What Others Do */}
          <div className="military-card bg-muted/30 border-destructive/20">
            <div className="text-center mb-6">
              <div className="bg-destructive/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive mb-2">Traditional Analysis</h3>
              <p className="text-foreground/60">Emotional, inconsistent, unreliable</p>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Relies on gut feelings and emotional reactions</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Inconsistent results and second-guessing</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Time-consuming manual analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Missed opportunities and poor timing</span>
              </li>
            </ul>
          </div>

          {/* Right Side - What We Do */}
          <div className="military-card border-primary/30">
            <div className="text-center mb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Bias-Tool-Solo Method</h3>
              <p className="text-foreground/60">Systematic, data-driven, precise</p>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Eliminates emotional bias with systematic analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Provides clear directional signals with confidence levels</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Instant analysis across multiple timeframes</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">94% accuracy rate with consistent performance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="military-card max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">How Bias-Tool-Solo Works</h3>
            <p className="text-foreground/70 text-lg">
              Data → Analysis → Signal → Decision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-primary">DATA</h4>
              <p className="text-sm text-foreground/60">Real-time market data across all major instruments</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-secondary">ANALYSIS</h4>
              <p className="text-sm text-foreground/60">Advanced algorithms detect bias patterns</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-primary">SIGNAL</h4>
              <p className="text-sm text-foreground/60">Clear directional signals with confidence ratings</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-secondary">DECISION</h4>
              <p className="text-sm text-foreground/60">Make confident trades based on systematic analysis</p>
            </div>
          </div>
        </div>

        {/* Professional Standards */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Why Professionals Choose Bias-Tool-Solo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="military-card">
              <h4 className="font-bold text-primary mb-2">94% Accuracy</h4>
              <p className="text-sm text-foreground/70">Proven track record of reliable signals.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-secondary mb-2">Instant Analysis</h4>
              <p className="text-sm text-foreground/70">Real-time bias detection across all markets.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-primary mb-2">All Features Included</h4>
              <p className="text-sm text-foreground/70">Every plan includes complete functionality.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-secondary mb-2">Better Value</h4>
              <p className="text-sm text-foreground/70">Longer plans offer significant savings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};