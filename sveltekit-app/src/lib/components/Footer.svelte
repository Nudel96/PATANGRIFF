<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Shield, TrendingUp, Mail, MessageCircle, Youtube, Twitter } from 'lucide-svelte';
</script>

<footer class="bg-background border-t border-border/50">
  <div class="container-max mx-auto px-6">
    <!-- Main Footer Content -->
    <div class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div>
          <div class="flex items-center space-x-3 mb-6">
            <div class="relative">
              <Shield class="w-8 h-8 text-primary" />
              <TrendingUp class="w-4 h-4 text-secondary absolute -top-1 -right-1" />
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
              <span class="text-sm text-muted-foreground -mt-1">FORGE WARRIORS</span>
            </div>
          </div>
          <p class="text-foreground/70 mb-6 leading-relaxed">
            We forge warriors even the biggest entrepreneurs respect. Weakness is no option. 
            Only systematic transformation through discipline, pressure, and uncompromising standards.
          </p>
          <div class="flex space-x-4">
            <Button size="sm" variant="outline" class="p-2">
              <Mail class="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" class="p-2">
              <MessageCircle class="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" class="p-2">
              <Youtube class="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" class="p-2">
              <Twitter class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- Education Links -->
        <div>
          <h4 class="font-semibold mb-4">Education</h4>
          <ul class="space-y-3">
            <li>
              <a href="#courses" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Trading Courses
              </a>
            </li>
            <li>
              <a href="#analysis" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Market Analysis
              </a>
            </li>
            <li>
              <a href="#sessions" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Live Sessions
              </a>
            </li>
            <li>
              <a href="#resources" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Resource Library
              </a>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-3">
            <li>
              <a href="#help" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Help Center
              </a>
            </li>
            <li>
              <a href="#contact" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#guidelines" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="#terms" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-3">
            <li>
              <a href="#about" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#mission" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#privacy" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#careers" class="text-foreground/60 hover:text-primary transition-colors duration-200">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="py-8 border-t border-border/50">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-xl font-bold mb-2">Stay Sharp. Stay Informed.</h3>
        <p class="text-foreground/70 mb-6">
          Get daily market insights and exclusive trading content delivered to your inbox.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button class="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
            Subscribe
          </Button>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="py-6 border-t border-border/50">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="text-sm text-foreground/60">
          © 2024 Warrior Traders. All rights reserved.
        </div>
        <div class="flex items-center space-x-6 text-sm">
          <span class="text-foreground/60">
            <span class="text-primary font-semibold">Discipline.</span>
            <span class="text-secondary font-semibold">Strategy.</span>
            <span class="text-primary font-semibold">Results.</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</footer>