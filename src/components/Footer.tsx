import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp, Mail, MessageCircle, Youtube, Twitter } from 'lucide-react';

export const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const footerSections = [
    {
      title: 'Education',
      links: [
        { label: 'Trading Courses', href: '#courses', description: '120+ progressive levels across four pillars with XP tracking and systematic skill development' },
        { label: 'Market Analysis', href: '#analysis', description: 'Daily market insights, regime analysis, and professional-grade technical and fundamental research' },
        { label: 'Live Sessions', href: '#sessions', description: 'Real-time trading rooms, market reviews, and interactive learning with expert mentors' },
        { label: 'Resource Library', href: '#resources', description: 'Comprehensive collection of trading templates, checklists, and professional development materials' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help', description: 'Comprehensive support documentation, tutorials, and troubleshooting guides for all platform features', modal: 'help' },
        { label: 'Contact Us', href: '#contact', description: '24/7 support team ready to assist with technical issues, account questions, and platform guidance', modal: 'contact' },
        { label: 'Community Guidelines', href: '#guidelines', description: 'Standards and expectations for warrior brotherhood participation and professional conduct' },
        { label: 'Terms of Service', href: '#terms', description: 'Legal framework governing platform usage, membership rights, and community participation' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about', description: 'Founded by professional traders committed to forging warriors through systematic transformation and uncompromising standards', modal: 'about' },
        { label: 'Our Mission', href: '#mission', description: 'Transform chart-watchers into market operators through discipline, pressure, and systematic development that commands respect', modal: 'mission' },
        { label: 'Privacy Policy', href: '#privacy', description: 'Comprehensive data protection and privacy practices ensuring secure handling of your personal and trading information' },
        { label: 'Careers', href: '#careers', description: 'Join our team of elite trading professionals and help forge the next generation of market warriors' }
      ]
    }
  ];

  const handleLinkClick = (link: any) => {
    if (link.modal) {
      setActiveModal(link.modal);
    } else {
      // Handle regular navigation
      window.location.href = link.href;
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'help':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Help Center</h2>
              <p className="text-muted-foreground">Get the support you need to maximize your trading education experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Platform navigation and setup</li>
                    <li>• Account configuration and preferences</li>
                    <li>• First steps in your warrior journey</li>
                    <li>• Understanding the Four Pillars system</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>Technical Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Login and account access issues</li>
                    <li>• Platform performance troubleshooting</li>
                    <li>• Mobile app support and optimization</li>
                    <li>• Browser compatibility and updates</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>Learning Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Course navigation and progress tracking</li>
                    <li>• Assignment submission and feedback</li>
                    <li>• Live session access and recordings</li>
                    <li>• Community participation guidelines</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardHeader>
                  <CardTitle>Billing & Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Subscription management and billing</li>
                    <li>• Payment methods and updates</li>
                    <li>• Refund requests and processing</li>
                    <li>• Account upgrades and downgrades</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Support Team
              </Button>
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Contact Our Support Team</h2>
              <p className="text-muted-foreground">Professional support for warriors committed to excellence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="military-card text-center">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">General inquiries and technical support</p>
                  <p className="text-primary font-medium">support@priceactiontalk.com</p>
                  <p className="text-xs text-muted-foreground mt-2">Response within 24 hours</p>
                </CardContent>
              </Card>
              
              <Card className="military-card text-center">
                <CardContent className="p-6">
                  <MessageCircle className="w-8 h-8 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">Immediate assistance during business hours</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Start Chat
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Mon-Fri 9AM-6PM EST</p>
                </CardContent>
              </Card>
              
              <Card className="military-card text-center">
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Priority Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">Dedicated support for premium members</p>
                  <p className="text-primary font-medium">priority@priceactiontalk.com</p>
                  <p className="text-xs text-muted-foreground mt-2">Response within 4 hours</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/20 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Before Contacting Support</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">For Technical Issues:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Clear your browser cache and cookies</li>
                    <li>• Try accessing from an incognito window</li>
                    <li>• Check your internet connection stability</li>
                    <li>• Update your browser to the latest version</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">For Account Issues:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Have your account email address ready</li>
                    <li>• Note any error messages you received</li>
                    <li>• Describe the steps that led to the issue</li>
                    <li>• Include screenshots if helpful</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">About PRICEACTIONTALK</h2>
              <p className="text-muted-foreground">Forging the next generation of market warriors</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-primary">Our Foundation</h3>
                <p className="text-foreground/80 leading-relaxed">
                  PRICEACTIONTALK was founded by professional traders who recognized a critical gap in trading education. 
                  While most platforms focus on quick fixes and get-rich-quick schemes, we understood that true trading 
                  success requires systematic transformation across four critical areas: Trading Mastery, Business Operations, 
                  Capital Management, and Trading Psychology.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-secondary">Our Approach</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We don't promise comfort or easy paths to success. Instead, we provide pressure, clarity, and uncompromising 
                  standards that forge chart-watchers into market operators. Our methodology is built on military-grade 
                  discipline, systematic thinking, and measurable progression through our Four Pillars framework.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-primary">Our Community</h3>
                <p className="text-foreground/80 leading-relaxed">
                  The PRICEACTIONTALK brotherhood consists of over 5,000 active traders who understand that weakness 
                  is not an option. Our members are committed to excellence, mutual accountability, and the systematic 
                  development that commands respect from the biggest entrepreneurs and market professionals.
                </p>
              </div>
              
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h4 className="font-bold text-primary mb-3">Our Promise</h4>
                <p className="text-foreground/80">
                  We will transform you from someone who watches charts to someone who operates in markets with 
                  confidence, discipline, and systematic precision. This transformation requires commitment, 
                  but the results speak for themselves.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'mission':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">Transforming chart-watchers into market operators</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  "Forge warriors even the biggest entrepreneurs respect"
                </h3>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-primary">Core Mission</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To systematically transform aspiring traders into professional market operators through discipline, 
                  pressure, and uncompromising standards. We reject the comfort-zone mentality that keeps traders 
                  mediocre and instead forge warriors whose results command respect in any room.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-secondary">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-bold text-secondary mb-2">Discipline</h4>
                    <p className="text-sm text-foreground/70">Systematic execution over emotional reactions</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">Strategy</h4>
                    <p className="text-sm text-foreground/70">Methodical approach over random actions</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-bold text-secondary mb-2">Results</h4>
                    <p className="text-sm text-foreground/70">Measurable outcomes over empty promises</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-primary">The Transformation</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We take individuals who are tired of mediocrity and transform them through our Four Pillars methodology. 
                  This isn't about quick fixes or shortcuts—it's about fundamental transformation that creates lasting 
                  competitive advantages in the markets and in life.
                </p>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-lg">
                <h4 className="font-bold mb-3">What Sets Us Apart</h4>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Military-grade systematic development approach</li>
                  <li>• Focus on character development alongside technical skills</li>
                  <li>• Brotherhood accountability that ensures progress</li>
                  <li>• Standards that command respect from industry leaders</li>
                  <li>• Proven methodology with measurable results</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <footer className="bg-background border-t border-border/50">
      <div className="container-max mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Shield className="w-8 h-8 text-primary" />
                  <TrendingUp className="w-4 h-4 text-secondary absolute -top-1 -right-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
                  <span className="text-sm text-muted-foreground -mt-1">FORGE WARRIORS</span>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                We forge warriors even the biggest entrepreneurs respect. Weakness is no option. 
                Only systematic transformation through discipline, pressure, and uncompromising standards.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="p-2">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.slice(0, 3).map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-foreground/60 hover:text-primary transition-colors duration-200 group cursor-pointer"
                        title={link.description}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link);
                        }}
                      >
                        <div className="group-hover:text-primary transition-colors">
                          <div className="font-medium">{link.label}</div>
                          <div className="text-xs text-foreground/50 mt-1 leading-relaxed">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Stay Sharp. Stay Informed.</h3>
            <p className="text-foreground/70 mb-6">
              Get daily market insights and exclusive trading content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-foreground/60">
              © 2024 Warrior Traders. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-foreground/60">
                <span className="text-primary font-semibold">Discipline.</span>{' '}
                <span className="text-secondary font-semibold">Strategy.</span>{' '}
                <span className="text-primary font-semibold">Results.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      </footer>
      
      {/* Modal for Support and Company Content */}
      <Dialog open={activeModal !== null} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="sr-only">Support Information</DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};