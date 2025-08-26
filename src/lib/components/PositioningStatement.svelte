<script lang="ts">
	import { Badge } from '$lib/components/ui';
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
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Guessing market direction based on "feelings"</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Inconsistent analysis methods</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Emotional decision making</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">No systematic approach</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
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
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Systematic bias detection across all timeframes</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Data-driven directional analysis</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Removes emotional decision making</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Consistent methodology every time</span>
					</li>
					<li class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
						<span class="text-foreground/70">Perfect timing with precise entry signals</span>
					</li>
				</ul>
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
					<h4 class="font-bold text-accent mb-2">Zero Emotions</h4>
					<p class="text-sm text-foreground/70">Systematic approach eliminates guesswork.</p>
				</div>
				<div class="military-card">
					<h4 class="font-bold text-primary mb-2">All Markets</h4>
					<p class="text-sm text-foreground/70">Works on Forex, Stocks, Crypto, Commodities.</p>
				</div>
			</div>
		</div>
	</div>
</section>
