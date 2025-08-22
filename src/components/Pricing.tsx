import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';

export const Pricing = () => {
  const plans = [
    {
      name: 'Foundation',
      price: '$97',
      period: '/month',
      description: 'Core warrior development fundamentals',
      features: [
        'Access to Four Pillars courses',
        'Systematic methodology training',
        'Brotherhood community access',
        'Weekly market analysis',
        'Foundation support protocols'
      ],
      buttonText: 'Begin Transformation',
      popular: false,
      color: 'secondary'
    },
    {
      name: 'Operator',
      price: '$197',
      period: '/month',
      description: 'Full warrior forge experience',
      features: [
        'Everything in Foundation',
        'Live operator sessions (3x/week)',
        'Mental conditioning protocols',
        'Real-time market intelligence',
        'Priority brotherhood support',
        'Monthly warrior assessment',
        'Advanced performance metrics'
      ],
      buttonText: 'Forge the Warrior',
      popular: true,
      color: 'primary'
    },
    {
      name: 'Commander',
      price: '$497',
      period: '/month',
      description: 'Elite warrior leadership development',
      features: [
        'Everything in Operator',
        'Daily command sessions',
        'Advanced bias analysis tools',
        'Personal warrior mentor',
        'Command-level brotherhood access',
        'Custom operational development',
        'Direct command line access',
        'Quarterly warrior evaluation'
      ],
      buttonText: 'Command Respect',
      popular: false,
      color: 'primary'
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-muted/10">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            The Contract
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Investment in Your
            <span className="block gradient-text">Warrior Transformation</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            We do not promise comfort. We promise pressure, clarity, and standards that turn you 
            into someone whose results demand respect. Choose your level of commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div key={index} className={`military-card relative ${
              plan.popular ? 'border-primary/30 bg-card/70' : ''
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground/60 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full bg-${plan.color}/10 flex items-center justify-center mt-0.5 flex-shrink-0`}>
                      <Check className={`w-3 h-3 text-${plan.color}`} />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                }`}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mb-16">
          <div className="military-card max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/20 p-3 rounded-xl mr-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">The Warrior Contract</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              This is the contract. We do not promise comfort. We promise pressure, clarity, 
              and standards that turn you into someone whose results demand respect. 
              If that is what you want, step in.
            </p>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Abandon Weakness?</h3>
          <p className="text-foreground/60 mb-6">
            Schedule a warrior assessment to determine if you have what it takes to join the brotherhood.
          </p>
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10">
            Request Warrior Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};