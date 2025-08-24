import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, TrendingUp, Users } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, hsl(var(--primary)) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container-max mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Target className="w-4 h-4 mr-2" />
            Premium Warrior Development Program
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ELIMINATE EMOTIONAL TRADING
            <span className="block gradient-text">WITH SYSTEMATIC BIAS ANALYSIS</span>
            BIAS-TOOL-SOLO
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="text-primary font-semibold">Make data-driven decisions</span>{' '}
            <span className="text-secondary font-semibold">with professional-grade bias detection.</span>{' '}
            <span className="text-primary font-semibold">Same powerful features, better value with longer plans.</span>
          </p>

          {/* Description */}
          <p className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto">
            Stop second-guessing your market analysis. Bias-Tool-solo provides systematic bias detection 
            and directional clarity for confident trading decisions. All features included in every plan - 
            choose longer terms for maximum savings.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold group"
            >
              Get Bias-Tool-Solo Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10"
            >
              See Pricing Plans
            </Button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-primary/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-sm text-foreground/60">Active Users</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-secondary/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-foreground/60">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-primary/20 p-3 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-foreground/60">Market Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};