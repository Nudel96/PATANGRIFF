import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Building2, DollarSign, Brain, ArrowRight } from 'lucide-react';

export const FourPillars = () => {
  const pillars = [
    {
      icon: TrendingUp,
      title: 'TRADING MASTERY',
      subtitle: 'Strategy → Macro → Technicals → Execution',
      description: 'Master the complete sequence from macro-economic analysis to precise execution. Regime reading across 6 key factors, systematic bias/timing with clear entry/exit rules, and risk mathematics that protect capital.',
      features: [
        'Macro-to-technical analysis sequence',
        'Regime reading across 6 key factors',
        'Systematic bias/timing protocols',
        'Risk mathematics and execution rules'
      ],
      color: 'primary'
    },
    {
      icon: Building2,
      title: 'BUSINESS OPERATIONS',
      subtitle: 'Trading as Professional Enterprise',
      description: 'Transform trading into a systematic business operation. Develop SOPs for all activities, implement KPI tracking systems, and build assets through process documentation that scales.',
      features: [
        'Trading business framework',
        'Systems and SOPs for all activities',
        'KPI tracking and performance metrics',
        'Asset building through documentation'
      ],
      color: 'secondary'
    },
    {
      icon: DollarSign,
      title: 'CAPITAL MANAGEMENT',
      subtitle: 'Survival and Growth Protocols',
      description: 'Master the financial architecture of professional trading: bankroll structure, allocation strategies, cashflow separation, and survival protocols that ensure longevity in all market conditions.',
      features: [
        'Bankroll structure and allocation',
        'Cashflow separation protocols',
        'Buffer maintenance systems',
        'Survival and recovery planning'
      ],
      color: 'primary'
    },
    {
      icon: Brain,
      title: 'TRADING PSYCHOLOGY',
      subtitle: 'Warrior Mental Conditioning',
      description: 'Forge the mental framework of elite operators: protocol development, anti-tilt strategies, ego management, and professional identity formation that commands market respect.',
      features: [
        'Mental conditioning protocols',
        'Anti-tilt strategies and ego management',
        'Professional identity formation',
        'Pressure leadership development'
      ],
      color: 'secondary'
    }
  ];

  return (
    <section id="education" className="section-padding">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Four Pillars That
            <span className="block gradient-text">Forge Warriors</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            This is not typical trading education. We systematically transform chart readers into 
            operators through discipline, systems thinking, and uncompromising standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <div key={index} className="military-card group">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`bg-${pillar.color}/10 p-4 rounded-2xl group-hover:bg-${pillar.color}/20 transition-colors`}>
                  <pillar.icon className={`w-8 h-8 text-${pillar.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{pillar.title}</h3>
                  <p className={`text-${pillar.color} font-semibold`}>{pillar.subtitle}</p>
                </div>
              </div>
              
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {pillar.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {pillar.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 bg-${pillar.color} rounded-full`} />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className={`w-full border-${pillar.color}/20 hover:bg-${pillar.color}/10 group`}
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="military-card max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Master All Four Pillars?</h3>
            <p className="text-foreground/70 mb-6">
              Join our comprehensive program and transform your trading approach with our proven methodology.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};