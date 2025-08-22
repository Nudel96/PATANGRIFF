import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Mail, MessageCircle, Youtube, Twitter } from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Four Pillars', href: '#pillars' },
        { label: 'Trading Tools', href: '#tools' },
        { label: 'Community', href: '#community' },
        { label: 'Pricing', href: '#pricing' }
      ]
    },
    {
      title: 'Education',
      links: [
        { label: 'Trading Courses', href: '#' },
        { label: 'Market Analysis', href: '#' },
        { label: 'Live Sessions', href: '#' },
        { label: 'Resource Library', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Community Guidelines', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Our Mission', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Careers', href: '#' }
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
                        className="text-foreground/60 hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
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