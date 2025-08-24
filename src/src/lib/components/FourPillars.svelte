<script lang="ts">
	import Button from './ui/Button.svelte';
	import { TrendingUp, Building2, DollarSign, Brain, ArrowRight } from 'lucide-svelte';

	const pillars = [
		{
			icon: TrendingUp,
			title: 'TRADING MASTERY',
			subtitle: 'Strategy → Macro → Technicals → Execution',
			description: 'Master the complete sequence from macro-economic analysis to precise execution. Regime reading across 6 key factors, systematic bias/timing with clear entry/exit rules, and risk mathematics that protect capital.',
			features: [
				'Macro-to-technical analysis sequence',
				'Regime reading across 6 key factors',
				'Systematic bias/timing protocols',
				'Risk mathematics and execution rules'
			],
			color: 'primary'
		},
		{
			icon: Building2,
			title: 'BUSINESS OPERATIONS',
			subtitle: 'Trading as Professional Enterprise',
			description: 'Transform trading into a systematic business operation. Develop SOPs for all activities, implement KPI tracking systems, and build assets through process documentation that scales.',
			features: [
				'Trading business framework',
				'Systems and SOPs for all activities',
				'KPI tracking and performance metrics',
				'Asset building through documentation'
			],
			color: 'secondary'
		},
		{
			icon: DollarSign,
			title: 'CAPITAL MANAGEMENT',
			subtitle: 'Survival and Growth Protocols',
			description: 'Master the financial architecture of professional trading: bankroll structure, allocation strategies, cashflow separation, and survival protocols that ensure longevity in all market conditions.',
			features: [
				'Bankroll structure and allocation',
				'Cashflow separation protocols',
				'Buffer maintenance systems',
				'Survival and recovery planning'
			],
			color: 'primary'
		},
		{
			icon: Brain,
			title: 'TRADING PSYCHOLOGY',
			subtitle: 'Warrior Mental Conditioning',
			description: 'Forge the mental framework of elite operators: protocol development, anti-tilt strategies, ego management, and professional identity formation that commands market respect.',
			features: [
				'Mental conditioning protocols',
				'Anti-tilt strategies and ego management',
				'Professional identity formation',
				'Pressure leadership development'
			],
			color: 'secondary'
		}
	];
</script>

<section id="education" class="section-padding">
	<div class="container-max mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				The Four Pillars That
				<span class="block gradient-text">Forge Warriors</span>
			</h2>
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
				This is not typical trading education. We systematically transform chart readers into 
				operators through discipline, systems thinking, and uncompromising standards.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
			{#each pillars as pillar, index}
				<div class="military-card group">
					<div class="flex items-start space-x-4 mb-6">
						<div class="bg-{pillar.color}/10 p-4 rounded-2xl group-hover:bg-{pillar.color}/20 transition-colors">
							<svelte:component this={pillar.icon} class="w-8 h-8 text-{pillar.color}" />
						</div>
						<div>
							<h3 class="text-2xl font-bold mb-1">{pillar.title}</h3>
							<p class="text-{pillar.color} font-semibold">{pillar.subtitle}</p>
						</div>
					</div>
					
					<p class="text-foreground/70 mb-6 leading-relaxed">
						{pillar.description}
					</p>
					
					<ul class="space-y-3 mb-6">
						{#each pillar.features as feature}
							<li class="flex items-center space-x-3">
								<div class="w-2 h-2 bg-{pillar.color} rounded-full" />
								<span class="text-foreground/80">{feature}</span>
							</li>
						{/each}
					</ul>
					
					<Button 
						variant="outline" 
						class="w-full border-{pillar.color}/20 hover:bg-{pillar.color}/10 group"
					>
						Learn More
						<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<div class="military-card max-w-3xl mx-auto">
				<h3 class="text-2xl font-bold mb-4">Ready to Master All Four Pillars?</h3>
				<p class="text-foreground/70 mb-6">
					Join our comprehensive program and transform your trading approach with our proven methodology.
				</p>
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground">
					Start Your Journey
				</Button>
			</div>
		</div>
	</div>
</section>