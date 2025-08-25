<script lang="ts">
	import { Button, Card, CardContent } from '$lib/components/ui';
	import Collapsible from '$lib/components/ui/Collapsible.svelte';
	import { TrendingUp, Building2, DollarSign, Brain, ArrowRight } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ startJourney: void }>();

	let openPillar: string | null = null;

	const pillars = [
		{
			id: 'trading-mastery',
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
			color: 'primary',
			detailedDescription: 'Transform from chart-watcher to market operator through our comprehensive 30-level progression system. Master the complete trading sequence: macro-economic regime identification → technical confluence analysis → precise execution with mathematical risk control. Learn to read market regimes across 6 critical factors, develop systematic bias detection protocols, and execute with institutional-grade precision. This pillar builds the analytical foundation that separates professional operators from retail traders.',
			outcomes: [
				'Systematic market regime analysis across all timeframes',
				'Professional-grade technical analysis with confluence factors',
				'Mathematical position sizing and risk control protocols',
				'Institutional execution techniques and order management',
				'Advanced pattern recognition and market structure analysis'
			]
		},
		{
			id: 'business-operations',
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
			color: 'secondary',
			detailedDescription: 'Elevate trading from hobby to professional enterprise through systematic business operations. Develop comprehensive Standard Operating Procedures (SOPs) for every trading activity, implement KPI tracking systems that measure what matters, and build scalable processes that create lasting competitive advantages. Learn to structure your trading operation like an institutional fund, with proper documentation, performance metrics, and growth protocols.',
			outcomes: [
				'Complete trading business framework and structure',
				'Systematic SOPs for all trading and business activities',
				'Advanced KPI tracking and performance optimization',
				'Scalable process documentation and knowledge management',
				'Professional business development and growth strategies'
			]
		},
		{
			id: 'capital-management',
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
			color: 'primary',
			detailedDescription: 'Build the financial foundation that ensures trading longevity through all market conditions. Master bankroll management with proper allocation strategies, implement cashflow separation protocols that protect your lifestyle, and develop survival systems that handle worst-case scenarios. Learn institutional-grade capital management techniques including correlation-adjusted position sizing, drawdown recovery protocols, and systematic capital allocation across multiple strategies and timeframes.',
			outcomes: [
				'Professional bankroll structure and allocation strategies',
				'Systematic cashflow separation and lifestyle protection',
				'Advanced risk-adjusted position sizing methodologies',
				'Comprehensive survival and recovery planning protocols',
				'Institutional-grade capital management techniques'
			]
		},
		{
			id: 'trading-psychology',
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
			color: 'secondary',
			detailedDescription: 'Develop the mental conditioning required for consistent market success through our proven psychological framework. Master the 7 Pillars of Resilience, implement anti-tilt protocols that maintain clarity under pressure, and forge the professional identity that commands respect in high-stakes trading environments. This pillar transforms your relationship with risk, uncertainty, and performance pressure into competitive advantages.',
			outcomes: [
				'Complete mastery of the 7 Pillars of Resilience framework',
				'Advanced anti-tilt strategies and emotional regulation',
				'Professional identity formation and confidence building',
				'Pressure leadership development and stress optimization',
				'Systematic mental conditioning and performance psychology'
			]
		}
	];

	function togglePillar(pillarId: string) {
		openPillar = openPillar === pillarId ? null : pillarId;
	}

	function handleStartJourney() {
		dispatch('startJourney');
	}
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
								<div class="w-2 h-2 bg-{pillar.color} rounded-full"></div>
								<span class="text-foreground/80">{feature}</span>
							</li>
						{/each}
					</ul>
					
					<Collapsible open={openPillar === pillar.id} on:openChange={() => togglePillar(pillar.id)}>
						<Button 
							variant="outline" 
							class="w-full border-{pillar.color}/20 hover:bg-{pillar.color}/10 group"
							on:click={() => togglePillar(pillar.id)}
						>
							Learn More
							<ArrowRight class="ml-2 w-4 h-4 transition-transform {openPillar === pillar.id ? 'rotate-90' : 'group-hover:translate-x-1'}" />
						</Button>
						
						{#if openPillar === pillar.id}
							<div transition:slide={{ duration: 300 }}>
								<Card class="mt-4 border-border/50">
									<CardContent class="p-6">
										<h4 class="text-lg font-bold text-{pillar.color} mb-4">Complete Learning Path</h4>
										<p class="text-foreground/80 mb-6 leading-relaxed">
											{pillar.detailedDescription}
										</p>
										
										<h5 class="font-semibold mb-3">What You'll Master:</h5>
										<ul class="space-y-2 mb-6">
											{#each pillar.outcomes as outcome}
												<li class="flex items-start space-x-3">
													<div class="w-1.5 h-1.5 bg-{pillar.color} rounded-full mt-2 flex-shrink-0"></div>
													<span class="text-sm text-foreground/80">{outcome}</span>
												</li>
											{/each}
										</ul>
										
										<Button 
											size="sm"
											class="bg-{pillar.color} hover:bg-{pillar.color}/90 text-{pillar.color}-foreground"
										>
											Start This Pillar
											<ArrowRight class="ml-2 w-4 h-4" />
										</Button>
									</CardContent>
								</Card>
							</div>
						{/if}
					</Collapsible>
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
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground" on:click={handleStartJourney}>
					Start Your Journey
				</Button>
			</div>
		</div>
	</div>
</section>
