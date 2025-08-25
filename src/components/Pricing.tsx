import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, DollarSign, Shield } from 'lucide-react';

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
            Choose Your Plan
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Same Powerful Features,
            <span className="block gradient-text">Better Value with Longer Plans</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            All Bias-Tool-Solo plans include every feature. Choose longer terms to maximize your savings 
            and get the best value for professional-grade bias analysis.
          </p>
        </div>

        {/* Standard Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Standard Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            <div className="military-card relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">1 Month</h3>
                <p className="text-foreground/60 mb-4">Try it out</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl font-bold">$39</span>
                  <span className="text-foreground/60 ml-1">/month</span>
                </div>
                <div className="text-sm text-foreground/60">$39 per month</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">All bias analysis features</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Real-time market signals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">24/7 market coverage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Email support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Start 1 Month Plan
              </Button>
            </div>

            <div className="military-card relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">6 Months</h3>
                <p className="text-foreground/60 mb-4">Save $35</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="text-foreground/60 ml-1">total</span>
                </div>
                <div className="text-sm text-primary font-semibold">$33.17 per month</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Everything in 1 Month</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">15% savings vs monthly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Priority support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Save with 6 Months
              </Button>
            </div>

            <div className="military-card relative border-primary/30">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Best Value
                </Badge>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">12 Months</h3>
                <p className="text-foreground/60 mb-4">Save $109</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl font-bold">$359</span>
                  <span className="text-foreground/60 ml-1">total</span>
                </div>
                <div className="text-sm text-primary font-semibold">$29.92 per month</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Everything in 6 Months</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">23% savings vs monthly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Premium support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Maximum Savings - 12 Months
              </Button>
            </div>

            <div className="military-card relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">24 Months</h3>
                <p className="text-foreground/60 mb-4">Save $337</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl font-bold">$599</span>
                  <span className="text-foreground/60 ml-1">total</span>
                </div>
                <div className="text-sm text-primary font-semibold">$24.96 per month</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Everything in 12 Months</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">36% savings vs monthly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">VIP support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Ultimate Value - 24 Months
              </Button>
            </div>
          </div>
        </div>

        {/* Exclusive Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Bias-Tool-Solo Exclusive</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div key="exclusive-6-months" className="military-card relative">
              {false && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Exclusive
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">6 Months Exclusive</h3>
                <p className="text-foreground/60 mb-6">Save $24 vs Standard</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">$175</span>
                  <span className="text-foreground/60 ml-1">total</span>
                </div>
                <div className="text-sm text-secondary font-semibold">$29.17 per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-foreground/80">All standard features</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-foreground/80">12% additional savings</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-foreground/80">Exclusive member benefits</span>
                </li>
              </ul>

              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Get Exclusive 6 Months
              </Button>
            </div>

            <div key="lifetime-access" className="military-card relative border-primary/30">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  Lifetime
                </Badge>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                <p className="text-foreground/60 mb-6">One-time payment, forever access</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">$3,000</span>
                  <span className="text-foreground/60 ml-1">once</span>
                </div>
                <div className="text-sm text-primary font-semibold">Never pay again</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Lifetime access to all features</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">All future updates included</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Premium lifetime support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80">Exclusive lifetime member status</span>
                </li>
              </ul>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Lifetime Access
              </Button>
            </div>
          </div>
        </div>

        {/* Value Comparison */}
        <div className="text-center mb-16">
          <div className="military-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Why Choose Longer Plans?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-primary mb-2">Maximum Savings</h4>
                <p className="text-sm text-foreground/70">Save up to 36% with longer commitments</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-bold text-secondary mb-2">Same Features</h4>
                <p className="text-sm text-foreground/70">Every plan includes all functionality</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-primary mb-2">Proven Results</h4>
                <p className="text-sm text-foreground/70">94% accuracy rate across all timeframes</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Eliminate Emotional Trading?</h3>
          <p className="text-foreground/60 mb-6">
            Join thousands of traders who've upgraded to systematic bias analysis. 
            Choose your plan and start making data-driven decisions today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
              Start with Best Value Plan
            </Button>
            <Button variant="outline" size="lg" className="border-secondary/20 hover:bg-secondary/10 px-8 py-4">
              Questions? Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export const OldPricing = () => {
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
              <h3 className="text-2xl font-bold">30-Day Money-Back Guarantee</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              Try Bias-Tool-Solo risk-free for 30 days. If you're not completely satisfied with the 
              systematic bias analysis and signal accuracy, we'll refund your entire purchase. 
              No questions asked.
            </p>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Eliminate Emotional Trading?</h3>
          <p className="text-foreground/60 mb-6">
            Join thousands of traders who've upgraded to systematic bias analysis. 
            Choose your plan and start making data-driven decisions today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
              Start with Best Value Plan
            </Button>
            <Button variant="outline" size="lg" className="border-secondary/20 hover:bg-secondary/10 px-8 py-4">
              Questions? Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};