import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Mail, MessageCircle, Youtube, Twitter } from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Four Pillars', href: '#pillars', description: 'Comprehensive warrior development through Trading Mastery, Business Operations, Capital Management, and Psychology' },
        { label: 'Trading Tools', href: '#tools', description: 'Professional-grade platform tools including market heatmap, trading journal, and bias analysis systems' },
        { label: 'Community', href: '#community', description: 'Elite brotherhood of traders with squads, forums, and collaborative learning environments' },
        { label: 'Pricing', href: '#pricing', description: 'Flexible membership plans designed for serious traders committed to systematic transformation' }
      ]
    },
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
        { label: 'Help Center', href: '#help', description: 'Comprehensive support documentation, tutorials, and troubleshooting guides for all platform features' },
        { label: 'Contact Us', href: '#contact', description: '24/7 support team ready to assist with technical issues, account questions, and platform guidance' },
        { label: 'Community Guidelines', href: '#guidelines', description: 'Standards and expectations for warrior brotherhood participation and professional conduct' },
        { label: 'Terms of Service', href: '#terms', description: 'Legal framework governing platform usage, membership rights, and community participation' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about', description: 'Founded by professional traders committed to forging warriors through systematic transformation and uncompromising standards' },
        { label: 'Our Mission', href: '#mission', description: 'Transform chart-watchers into market operators through discipline, pressure, and systematic development that commands respect' },
        { label: 'Privacy Policy', href: '#privacy', description: 'Comprehensive data protection and privacy practices ensuring secure handling of your personal and trading information' },
        { label: 'Careers', href: '#careers', description: 'Join our team of elite trading professionals and help forge the next generation of market warriors' }
      ]
    }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container-max mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
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
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-foreground/60 hover:text-primary transition-colors duration-200 group"
                        title={link.description}
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
  );
};