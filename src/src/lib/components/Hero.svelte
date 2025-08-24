<script lang="ts">
	import Button from './ui/Button.svelte';
	import Badge from './ui/Badge.svelte';
	import { ArrowRight, Target, TrendingUp, Users } from 'lucide-svelte';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 40% 40%, hsl(var(--primary)) 0%, transparent 50%)" />
	</div>

	<div class="container-max mx-auto px-6 relative z-10">
		<div class="max-w-5xl mx-auto text-center">
			<!-- Badge -->
			<Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
				<Target class="w-4 h-4 mr-2" />
				Premium Warrior Development Program
			</Badge>

			<!-- Main Headline -->
			<h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
				ELIMINATE EMOTIONAL TRADING
				<span class="block gradient-text">WITH SYSTEMATIC BIAS ANALYSIS</span>
				BIAS-TOOL-SOLO
			</h1>

			<!-- Tagline -->
			<p class="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
				<span class="text-primary font-semibold">Make data-driven decisions</span>{' '}
				<span class="text-secondary font-semibold">with professional-grade bias detection.</span>{' '}
				<span class="text-primary font-semibold">Same powerful features, better value with longer plans.</span>
			</p>

			<!-- Description -->
			<p class="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto">
				Stop second-guessing your market analysis. Bias-Tool-solo provides systematic bias detection 
				and directional clarity for confident trading decisions. All features included in every plan - 
				choose longer terms for maximum savings.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
				<Button 
					size="lg" 
					class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold group"
				>
					Get Bias-Tool-Solo Now
					<ArrowRight class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
				</Button>
				<Button 
					variant="outline" 
					size="lg"
					class="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10"
				>
					See Pricing Plans
				</Button>
			</div>

			<!-- Social Proof -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
				<div class="flex items-center justify-center space-x-3">
					<div class="bg-primary/20 p-3 rounded-xl">
						<Users class="w-6 h-6 text-primary" />
					</div>
					<div class="text-left">
						<div class="text-2xl font-bold">5,000+</div>
						<div class="text-sm text-foreground/60">Active Users</div>
					</div>
				</div>
				
				<div class="flex items-center justify-center space-x-3">
					<div class="bg-secondary/20 p-3 rounded-xl">
						<TrendingUp class="w-6 h-6 text-secondary" />
					</div>
					<div class="text-left">
						<div class="text-2xl font-bold">94%</div>
						<div class="text-sm text-foreground/60">Accuracy Rate</div>
					</div>
				</div>
				
				<div class="flex items-center justify-center space-x-3">
					<div class="bg-primary/20 p-3 rounded-xl">
						<Target class="w-6 h-6 text-primary" />
					</div>
					<div class="text-left">
						<div class="text-2xl font-bold">24/7</div>
						<div class="text-sm text-foreground/60">Market Coverage</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>