<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    Users, 
    MessageCircle, 
    TrendingUp, 
    Star,
    Award,
    Calendar,
    BookOpen,
    Target,
    Brain,
    Building2,
    Search,
    Filter,
    Plus,
    Eye,
    ThumbsUp,
    Clock,
    ArrowRight,
    Zap,
    Trophy,
    Shield,
    Globe,
    Activity
  } from 'lucide-svelte';
</script>

<section id="community" class="section-padding">
  <div class="container-max mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <Badge class="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
        <Users class="w-4 h-4 mr-2" />
        Brotherhood of Warriors
      </Badge>
      
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        Join the Brotherhood of
        <span class="block gradient-text">Market Warriors</span>
      </h2>
      
      <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
        Connect with operators who understand that weakness is not an option. 
        Share the battlefield with warriors whose results command entrepreneurial respect.
      </p>
    </div>

    <!-- Community Features Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <!-- Squads Feature -->
      <div class="military-card">
        <div class="flex items-start space-x-4 mb-6">
          <div class="bg-primary/10 p-4 rounded-2xl">
            <Shield class="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Elite Squads</h3>
            <p class="text-primary font-semibold">Focused Learning & Accountability Groups</p>
          </div>
        </div>
        
        <p class="text-foreground/70 mb-6 leading-relaxed">
          Join intimate groups of 4-8 dedicated traders focused on specific goals, strategies, or skill development. 
          Squads provide structured accountability through regular check-ins, shared challenges, and peer mentorship 
          that accelerates your trading development through collective commitment and mutual support.
        </p>
        
        <div class="space-y-3 mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-primary rounded-full" />
            <span class="text-foreground/80">Small, focused groups for maximum accountability</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-primary rounded-full" />
            <span class="text-foreground/80">Regular meetings and progress tracking</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-primary rounded-full" />
            <span class="text-foreground/80">Peer mentorship and collaborative learning</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-primary rounded-full" />
            <span class="text-foreground/80">Specialized focus areas and trading strategies</span>
          </div>
        </div>

        <div class="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <div class="flex items-center space-x-2 mb-2">
            <Users class="w-4 h-4 text-primary" />
            <span class="text-sm font-semibold text-primary">Active Squads</span>
          </div>
          <div class="text-xs text-foreground/60">
            Gold Trading Masters • Macro Analysis Group • Psychology Warriors • Risk Management Experts
          </div>
        </div>
      </div>

      <!-- Forum Feature -->
      <div class="military-card">
        <div class="flex items-start space-x-4 mb-6">
          <div class="bg-secondary/10 p-4 rounded-2xl">
            <MessageCircle class="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Discussion Forums</h3>
            <p class="text-secondary font-semibold">Knowledge Exchange & Market Analysis</p>
          </div>
        </div>
        
        <p class="text-foreground/70 mb-6 leading-relaxed">
          Engage in structured discussions across specialized trading topics within organized forum categories. 
          Share trade ideas, market analysis, and insights while learning from experienced traders through 
          threaded conversations that support rich content including charts, detailed explanations, and real-time market commentary.
        </p>
        
        <div class="space-y-3 mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-secondary rounded-full" />
            <span class="text-foreground/80">Organized categories for focused discussions</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-secondary rounded-full" />
            <span class="text-foreground/80">Quality-verified content and expert insights</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-secondary rounded-full" />
            <span class="text-foreground/80">Trade ideas, market analysis, and strategy sharing</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-secondary rounded-full" />
            <span class="text-foreground/80">Community-driven moderation and reputation system</span>
          </div>
        </div>
        
        <div class="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
          <div class="flex items-center space-x-2 mb-2">
            <BarChart3 class="w-4 h-4 text-secondary" />
            <span class="text-sm font-semibold text-secondary">Popular Forums</span>
          </div>
          <div class="text-xs text-foreground/60">
            Gold Desk • FX Majors • Strategy Development • Market Psychology • Technical Analysis
          </div>
        </div>
      </div>
    </div>

    <!-- Community Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      <div class="military-card text-center">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users class="w-8 h-8 text-primary" />
        </div>
        <div class="text-3xl font-bold text-primary mb-2">5,000+</div>
        <div class="text-sm text-foreground/70">Active Members</div>
      </div>
      
      <div class="military-card text-center">
        <div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageCircle class="w-8 h-8 text-secondary" />
        </div>
        <div class="text-3xl font-bold text-secondary mb-2">1,200+</div>
        <div class="text-sm text-foreground/70">Daily Discussions</div>
      </div>
      
      <div class="military-card text-center">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield class="w-8 h-8 text-primary" />
        </div>
        <div class="text-3xl font-bold text-primary mb-2">150+</div>
        <div class="text-sm text-foreground/70">Active Squads</div>
      </div>
      
      <div class="military-card text-center">
        <div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target class="w-8 h-8 text-secondary" />
        </div>
        <div class="text-3xl font-bold text-secondary mb-2">24/7</div>
        <div class="text-sm text-foreground/70">Community Support</div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center">
      <div class="military-card max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold mb-4">Ready to Join the Brotherhood?</h3>
        <p class="text-foreground/70 mb-6 leading-relaxed">
          Connect with serious traders who understand that success requires discipline, accountability, 
          and continuous learning. Join our community of warriors committed to trading excellence.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
            Join the Community
            <ArrowRight class="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" class="border-secondary/20 hover:bg-secondary/10 px-8 py-4">
            Learn More About Membership
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>