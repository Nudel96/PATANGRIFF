import React from 'react';
import { TrendingUp, Shield, Target, Users } from 'lucide-react';

export const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '5,000+',
      label: 'Active Users',
      description: 'Professional traders worldwide'
    },
    {
      icon: TrendingUp,
      value: '94%',
      label: 'Accuracy Rate',
      description: 'Verified signal accuracy'
    },
    {
      icon: Target,
      value: '24/7',
      label: 'Market Coverage',
      description: 'Continuous bias analysis'
    },
    {
      icon: Shield,
      value: '< 1s',
      label: 'Signal Speed',
      description: 'Real-time analysis delivery'
    }
  ];

  return (
    <section className="section-padding bg-muted/20">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven Results
            <span className="block gradient-text">Trusted by Professionals</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Bias-Tool-Solo delivers consistent, reliable bias analysis that professionals 
            depend on for systematic trading decisions. Real results, real accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="military-card text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2 gradient-text">{stat.value}</div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-sm text-foreground/60">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 text-center">
          <div className="military-card max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">4 Years</div>
                <p className="text-foreground/70">of proven methodology</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
                <p className="text-foreground/70">community support</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">90 Days</div>
                <p className="text-foreground/70">to transformation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};