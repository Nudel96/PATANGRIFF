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
            The Priceactiontalk Difference
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            We Don't Create
            <span className="block gradient-text">Typical Traders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - What Others Do */}
          <div className="military-card bg-muted/30 border-destructive/20">
            <div className="text-center mb-6">
              <div className="bg-destructive/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive mb-2">Typical Trading Education</h3>
              <p className="text-foreground/60">What the market is flooded with</p>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Creates chart readers who react to price movements</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Focuses on quick fixes and emotional trading</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Promises comfort and easy profits</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/70">Produces gamblers disguised as traders</span>
              </li>
            </ul>
          </div>

          {/* Right Side - What We Do */}
          <div className="military-card border-primary/30">
            <div className="text-center mb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">The Priceactiontalk Method</h3>
              <p className="text-foreground/60">Forging market warriors</p>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Transforms chart-watchers into market operators</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Builds systems thinking and leadership under pressure</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Demands pressure, clarity, and uncompromising standards</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80">Creates warriors even entrepreneurs respect</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="military-card max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Our Systematic Methodology</h3>
            <p className="text-foreground/70 text-lg">
              Strategy → Macro → Technicals → Execution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-primary">STRATEGY</h4>
              <p className="text-sm text-foreground/60">Define the operational framework before market engagement</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-secondary">MACRO</h4>
              <p className="text-sm text-foreground/60">Read market regime across 6 critical factors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-primary">TECHNICALS</h4>
              <p className="text-sm text-foreground/60">Apply systematic bias and timing protocols</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-secondary">EXECUTION</h4>
              <p className="text-sm text-foreground/60">Execute with precision and capital protection</p>
            </div>
          </div>
        </div>

        {/* Professional Standards */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Professional Standards That Command Respect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="military-card">
              <h4 className="font-bold text-primary mb-2">Capital Protection</h4>
              <p className="text-sm text-foreground/70">Survival comes before profits. Always.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-secondary mb-2">Process Over Emotion</h4>
              <p className="text-sm text-foreground/70">Systems thinking eliminates emotional decisions.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-primary mb-2">Measurable Improvement</h4>
              <p className="text-sm text-foreground/70">Every action tracked, analyzed, optimized.</p>
            </div>
            <div className="military-card">
              <h4 className="font-bold text-secondary mb-2">Leadership Under Pressure</h4>
              <p className="text-sm text-foreground/70">Maintain discipline when markets test you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};