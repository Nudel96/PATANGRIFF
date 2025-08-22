import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Video, 
  Award,
  Star,
  TrendingUp,
  Quote
} from 'lucide-react';

export const Community = () => {
  const testimonials = [
    {
      name: 'Marcus Chen',
      role: 'Day Trader',
      content: 'The four pillars approach completely transformed my trading. I went from emotional gambling to systematic execution in 90 days.',
      rating: 5,
      profit: '+287%'
    },
    {
      name: 'Sarah Johnson',
      role: 'Swing Trader',
      content: 'The psychology pillar alone was worth the entire program. Finally learned to control my emotions and stick to my system.',
      rating: 5,
      profit: '+156%'
    },
    {
      name: 'David Rodriguez',
      role: 'Options Trader',
      content: 'Best trading education I\'ve ever received. The community support and daily analysis keep me disciplined and focused.',
      rating: 5,
      profit: '+423%'
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: 'Elite Network',
      description: '10,000+ serious traders sharing strategies and insights'
    },
    {
      icon: MessageCircle,
      title: 'Daily Discussions',
      description: 'Active channels for market analysis and trade ideas'
    },
    {
      icon: Video,
      title: 'Live Sessions',
      description: 'Weekly live trading and Q&A with expert mentors'
    },
    {
      icon: Award,
      title: 'Recognition Program',
      description: 'Celebrate achievements and milestone progress'
    }
  ];

  return (
    <section id="community" className="section-padding">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Brotherhood of Warriors
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Brotherhood of
            <span className="block gradient-text">Market Warriors</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Connect with operators who understand that weakness is not an option. 
            Share the battlefield with warriors whose results command entrepreneurial respect.
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <div key={index} className="military-card text-center group">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/60">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">What Our Warriors Are Saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="military-card relative">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-foreground/60">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                  <span className="ml-2 text-sm text-primary font-semibold">
                    {testimonial.profit} Return
                  </span>
                </div>
                
                <Quote className="w-6 h-6 text-primary/30 mb-2" />
                <p className="text-foreground/80 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="military-card max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-foreground/70">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">500+</div>
              <div className="text-foreground/70">Daily Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-foreground/70">Member Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join the Elite?</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Transform your trading career with our proven methodology and supportive community. 
            Start your journey from chart-watcher to market operator today.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mr-4">
            Join Community
          </Button>
          <Button variant="outline" size="lg" className="border-secondary/20 hover:bg-secondary/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};