import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Activity, 
  FileText, 
  Brain, 
  Target,
  ArrowRight,
  Zap
} from 'lucide-react';

export const PlatformTools = () => {
  const tools = [
    {
      icon: BookOpen,
      title: 'Trading Education Hub',
      description: 'Comprehensive course library with daily market analysis, video lessons, and actionable insights from professional traders.',
      features: ['Daily market analysis', 'Video course library', 'Live trading sessions', 'Market commentary'],
      status: 'Available',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'Elite Member Community',
      description: 'Private community access with live Q&A sessions, peer discussions, and direct mentorship from experienced traders.',
      features: ['Private Discord server', 'Live Q&A sessions', 'Peer networking', 'Mentor access'],
      status: 'Available',
      color: 'secondary'
    },
    {
      icon: Activity,
      title: 'Market Heatmap',
      description: 'Real-time color-coded market strength visualization to identify opportunities and gauge overall market sentiment.',
      features: ['Real-time data', 'Sector analysis', 'Strength indicators', 'Custom alerts'],
      status: 'Available',
      color: 'primary'
    },
    {
      icon: FileText,
      title: 'Trading Journal Pro',
      description: 'Integrated trade logging and review system with advanced analytics to track your progress and identify improvement areas.',
      features: ['Trade tracking', 'Performance analytics', 'Pattern recognition', 'Progress reports'],
      status: 'Available',
      color: 'secondary'
    },
    {
      icon: Brain,
      title: 'Money Mindset Coaching',
      description: 'Daily protocols and frameworks designed to develop the psychological discipline required for consistent trading success.',
      features: ['Daily protocols', 'Mindset exercises', 'Psychological assessments', 'Mental coaching'],
      status: 'Available',
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Bias Analysis Tool',
      description: 'Proprietary "Biastool" for systematic market direction analysis, helping you identify and eliminate emotional decision-making.',
      features: ['Bias detection', 'Market direction analysis', 'Decision frameworks', 'Systematic approach'],
      status: 'Coming Soon',
      color: 'secondary'
    }
  ];

  return (
    <section id="platform" className="section-padding bg-muted/10">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Warrior Development Arsenal
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Arsenal That
            <span className="block gradient-text">Forges Operators</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Every tool designed with military precision to transform weakness into strength. 
            No comfort zones. Only systematic development and measurable progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => (
            <div key={index} className="military-card group relative">
              {/* Status Badge */}
              <div className="absolute -top-3 -right-3">
                <Badge className={`${
                  tool.status === 'Available' 
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {tool.status}
                </Badge>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className={`bg-${tool.color}/10 p-3 rounded-xl group-hover:bg-${tool.color}/20 transition-colors`}>
                  <tool.icon className={`w-6 h-6 text-${tool.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                </div>
              </div>
              
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-foreground/80">Key Features:</h4>
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 bg-${tool.color} rounded-full`} />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                variant="outline" 
                className={`w-full border-${tool.color}/20 hover:bg-${tool.color}/10 group ${
                  tool.status === 'Coming Soon' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={tool.status === 'Coming Soon'}
              >
                {tool.status === 'Available' ? 'Access Tool' : 'Coming Soon'}
                {tool.status === 'Available' && (
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Integration Message */}
        <div className="text-center">
          <div className="military-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Integrated Ecosystem</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              All tools work seamlessly together, creating a comprehensive trading environment 
              that supports every aspect of your development from novice to professional operator. 
              Your journal feeds your analytics, your community discussions inform your strategy, 
              and your mindset work reinforces your systematic approach.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Access Full Platform
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};