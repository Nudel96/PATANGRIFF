<script lang="ts">
	import { Button, Badge } from '$lib/components/ui';
	import { Check, Crown, Zap, Star, DollarSign, Shield } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ 
		selectPlan: { plan: string; price: string };
		contactSupport: void;
	}>();

	const standardPlans = [
		{
			name: '1 Month',
			subtitle: 'Try it out',
			price: '$39',
			period: '/month',
			totalPrice: '$39 per month',
			savings: null,
			features: [
				'Complete bias analysis system',
				'Real-time market signals',
				'All timeframes covered',
				'Basic support'
			],
			buttonText: 'Start 1 Month',
			popular: false
		},
		{
			name: '3 Months',
			subtitle: 'Save $18',
			price: '$99',
			period: 'total',
			totalPrice: '$33 per month',
			savings: 'Save $18',
			features: [
				'Everything in 1 Month',
				'15% savings vs monthly',
				'Priority support',
				'Extended trial period'
			],
			buttonText: 'Save with 3 Months',
			popular: false
		},
		{
			name: '6 Months',
			subtitle: 'Save $35',
			price: '$199',
			period: 'total',
			totalPrice: '$33.17 per month',
			savings: 'Save $35',
			features: [
				'Everything in 3 Months',
				'15% savings vs monthly',
				'Premium support',
				'Quarterly reviews'
			],
			buttonText: 'Great Value - 6 Months',
			popular: false
		},
		{
			name: '12 Months',
			subtitle: 'Save $109',
			price: '$359',
			period: 'total',
			totalPrice: '$29.92 per month',
			savings: 'Save $109',
			features: [
				'Everything in 6 Months',
				'23% savings vs monthly',
				'Premium support',
				'Annual strategy review'
			],
			buttonText: 'Maximum Savings - 12 Months',
			popular: true
		}
	];

	const exclusivePlans = [
		{
			name: 'Lifetime Access',
			subtitle: 'One-time payment',
			price: '$997',
			period: 'forever',
			totalPrice: 'Pay once, use forever',
			savings: 'Save $1,571',
			features: [
				'Lifetime access to all features',
				'All future updates included',
				'VIP priority support',
				'Exclusive member benefits',
				'No recurring payments'
			],
			buttonText: 'Get Lifetime Access',
			popular: false,
			exclusive: true
		}
	];

	const valuePoints = [
		{
			icon: DollarSign,
			title: 'Maximum Savings',
			description: 'Save up to 36% with longer commitments',
			color: 'primary'
		},
		{
			icon: Zap,
			title: 'Same Features',
			description: 'Every plan includes all functionality',
			color: 'secondary'
		},
		{
			icon: Shield,
			title: 'Proven Results',
			description: '94% accuracy rate across all timeframes',
			color: 'primary'
		}
	];

	function handleSelectPlan(plan: any) {
		dispatch('selectPlan', { plan: plan.name, price: plan.price });
	}

	function handleContactSupport() {
		dispatch('contactSupport');
	}
</script>

<section id="pricing" class="section-padding bg-muted/10">
	<div class="container-max mx-auto">
		<div class="text-center mb-16">
			<Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
				<Crown class="w-4 h-4 mr-2" />
				Choose Your Plan
			</Badge>
			
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				Same Powerful Features,
				<span class="block gradient-text">Better Value with Longer Plans</span>
			</h2>
			
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
				All Bias-Tool-Solo plans include every feature. Choose longer terms to maximize your savings 
				and get the best value for professional-grade bias analysis.
			</p>
		</div>

		<!-- Standard Plans -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Standard Plans</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
				{#each standardPlans as plan}
					<div class="military-card relative" class:border-primary/30={plan.popular}>
						{#if plan.popular}
							<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<Badge class="bg-primary text-primary-foreground px-4 py-1">
									<Star class="w-3 h-3 mr-1" />
									Best Value
								</Badge>
							</div>
						{/if}
						
						<div class="text-center mb-6">
							<h3 class="text-xl font-bold mb-2">{plan.name}</h3>
							<p class="text-foreground/60 mb-4">{plan.subtitle}</p>
							<div class="flex items-baseline justify-center mb-2">
								<span class="text-3xl font-bold">{plan.price}</span>
								<span class="text-foreground/60 ml-1">/{plan.period}</span>
							</div>
							<div class="text-sm" class:text-primary={plan.savings} class:font-semibold={plan.savings}>
								{plan.totalPrice}
							</div>
						</div>
						
						<ul class="space-y-3 mb-6">
							{#each plan.features as feature}
								<li class="flex items-start space-x-3">
									<div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
										<Check class="w-3 h-3 text-primary" />
									</div>
									<span class="text-foreground/80 text-sm">{feature}</span>
								</li>
							{/each}
						</ul>
						
						<Button 
							class="w-full {plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}"
							on:click={() => handleSelectPlan(plan)}
						>
							{plan.buttonText}
						</Button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Exclusive Plans -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Bias-Tool-Solo Exclusive</h3>
			<div class="max-w-md mx-auto">
				{#each exclusivePlans as plan}
					<div class="military-card relative border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
						<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<Badge class="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
								<Crown class="w-3 h-3 mr-1" />
								Exclusive
							</Badge>
						</div>
						
						<div class="text-center mb-6">
							<h3 class="text-2xl font-bold mb-2">{plan.name}</h3>
							<p class="text-foreground/60 mb-4">{plan.subtitle}</p>
							<div class="flex items-baseline justify-center mb-2">
								<span class="text-4xl font-bold gradient-text">{plan.price}</span>
								<span class="text-foreground/60 ml-1">{plan.period}</span>
							</div>
							<div class="text-sm text-primary font-semibold">{plan.totalPrice}</div>
							<div class="text-sm text-secondary font-semibold">{plan.savings}</div>
						</div>
						
						<ul class="space-y-4 mb-8">
							{#each plan.features as feature}
								<li class="flex items-start space-x-3">
									<div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
										<Check class="w-3 h-3 text-primary" />
									</div>
									<span class="text-foreground/80">{feature}</span>
								</li>
							{/each}
						</ul>
						
						<Button 
							class="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
							on:click={() => handleSelectPlan(plan)}
						>
							{plan.buttonText}
						</Button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Value Comparison -->
		<div class="text-center mb-16">
			<div class="military-card max-w-4xl mx-auto">
				<h3 class="text-2xl font-bold mb-6">Why Choose Longer Plans?</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{#each valuePoints as point}
						<div class="text-center">
							<div class="bg-{point.color}/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<svelte:component this={point.icon} class="w-8 h-8 text-{point.color}" />
							</div>
							<h4 class="font-bold text-{point.color} mb-2">{point.title}</h4>
							<p class="text-sm text-foreground/70">{point.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Guarantee -->
		<div class="text-center mb-16">
			<div class="military-card max-w-4xl mx-auto">
				<div class="flex items-center justify-center mb-4">
					<div class="bg-primary/20 p-3 rounded-xl mr-4">
						<Zap class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-2xl font-bold">30-Day Money-Back Guarantee</h3>
				</div>
				<p class="text-foreground/70 leading-relaxed">
					Try Bias-Tool-Solo risk-free for 30 days. If you're not completely satisfied with the 
					systematic bias analysis and signal accuracy, we'll refund your entire purchase. 
					No questions asked.
				</p>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h3 class="text-xl font-semibold mb-4">Ready to Eliminate Emotional Trading?</h3>
			<p class="text-foreground/60 mb-6">
				Join thousands of traders who've upgraded to systematic bias analysis. 
				Choose your plan and start making data-driven decisions today.
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4" on:click={() => handleSelectPlan(standardPlans[3])}>
					Start with Best Value Plan
				</Button>
				<Button variant="outline" size="lg" class="border-secondary/20 hover:bg-secondary/10 px-8 py-4" on:click={handleContactSupport}>
					Questions? Contact Support
				</Button>
			</div>
		</div>
	</div>
</section>
