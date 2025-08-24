<script lang="ts">
	import Badge from './ui/Badge.svelte';
	import { Shield, Target, TrendingUp } from 'lucide-svelte';
</script>

<section class="section-padding bg-muted/20">
	<div class="container-max mx-auto">
		<div class="text-center mb-16">
			<Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
				<Shield class="w-4 h-4 mr-2" />
				Why Bias-Tool-Solo Works
			</Badge>
			
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				Stop Guessing.
				<span class="block gradient-text">Start Knowing.</span>
			</h2>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
			<!-- Left Side - What Others Do -->
			<div class="military-card bg-muted/30 border-destructive/20">
				<div class="text-center mb-6">
					<div class="bg-destructive/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<Target class="w-8 h-8 text-destructive" />
					</div>
					<h3 class="text-2xl font-bold text-destructive mb-2">Traditional Analysis</h3>
					<p class="text-foreground/60">Emotional, inconsistent, unreliable</p>
				</div>
				
				<ul class="space-y-4">
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/70">Relies on gut feelings and emotional reactions</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/70">Inconsistent results and second-guessing</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/70">Time-consuming manual analysis</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/70">Missed opportunities and poor timing</span>
					</li>
				</ul>
			</div>

			<!-- Right Side - What We Do -->
			<div class="military-card border-primary/30">
				<div class="text-center mb-6">
					<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<TrendingUp class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-2xl font-bold text-primary mb-2">Bias-Tool-Solo Method</h3>
					<p class="text-foreground/60">Systematic, data-driven, precise</p>
				</div>
				
				<ul class="space-y-4">
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/80">Eliminates emotional bias with systematic analysis</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/80">Provides clear directional signals with confidence levels</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/80">Instant analysis across multiple timeframes</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
						<span class="text-foreground/80">94% accuracy rate with consistent performance</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Methodology Section -->
		<div class="military-card max-w-5xl mx-auto">
			<div class="text-center mb-8">
				<h3 class="text-3xl font-bold mb-4">How Bias-Tool-Solo Works</h3>
				<p class="text-foreground/70 text-lg">
					Data → Analysis → Signal → Decision
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div class="text-center">
					<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<span class="text-primary font-bold text-lg">1</span>
					</div>
					<h4 class="font-semibold mb-2 text-primary">DATA</h4>
					<p class="text-sm text-foreground/60">Real-time market data across all major instruments</p>
				</div>
				
				<div class="text-center">
					<div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<span class="text-secondary font-bold text-lg">2</span>
					</div>
					<h4 class="font-semibold mb-2 text-secondary">ANALYSIS</h4>
					<p class="text-sm text-foreground/60">Advanced algorithms detect bias patterns</p>
				</div>
				
				<div class="text-center">
					<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<span class="text-primary font-bold text-lg">3</span>
					</div>
					<h4 class="font-semibold mb-2 text-primary">SIGNAL</h4>
					<p class="text-sm text-foreground/60">Clear directional signals with confidence ratings</p>
				</div>
				
				<div class="text-center">
					<div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<span class="text-secondary font-bold text-lg">4</span>
					</div>
					<h4 class="font-semibold mb-2 text-secondary">DECISION</h4>
					<p class="text-sm text-foreground/60">Make confident trades based on systematic analysis</p>
				</div>
			</div>
		</div>

		<!-- Professional Standards -->
		<div class="mt-16 text-center">
			<h3 class="text-2xl font-bold mb-8">Why Professionals Choose Bias-Tool-Solo</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="military-card">
					<h4 class="font-bold text-primary mb-2">94% Accuracy</h4>
					<p class="text-sm text-foreground/70">Proven track record of reliable signals.</p>
				</div>
				<div class="military-card">
					<h4 class="font-bold text-secondary mb-2">Instant Analysis</h4>
					<p class="text-sm text-foreground/70">Real-time bias detection across all markets.</p>
				</div>
				<div class="military-card">
					<h4 class="font-bold text-primary mb-2">All Features Included</h4>
					<p class="text-sm text-foreground/70">Every plan includes complete functionality.</p>
				</div>
				<div class="military-card">
					<h4 class="font-bold text-secondary mb-2">Better Value</h4>
					<p class="text-sm text-foreground/70">Longer plans offer significant savings.</p>
				</div>
			</div>
		</div>
	</div>
</section>