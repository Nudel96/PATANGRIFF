<script lang="ts">
	import Button from './ui/Button.svelte';
	import Badge from './ui/Badge.svelte';
	import { 
		BookOpen, 
		Users, 
		Activity, 
		FileText, 
		Brain, 
		Target,
		ArrowRight,
		Zap
	} from 'lucide-svelte';

	const tools = [
		{
			icon: BookOpen,
			title: 'Trading Education Hub',
			description: 'Comprehensive course library with daily market analysis, video lessons, and actionable insights from professional traders.',
			features: ['Daily market analysis', 'Video course library', 'Live trading sessions', 'Market commentary'],
			status: 'Available',
			color: 'primary'
		},
		{
			icon: Users,
			title: 'Elite Member Community',
			description: 'Private community access with live Q&A sessions, peer discussions, and direct mentorship from experienced traders.',
			features: ['Private Discord server', 'Live Q&A sessions', 'Peer networking', 'Mentor access'],
			status: 'Available',
			color: 'secondary'
		},
		{
			icon: Activity,
			title: 'Market Heatmap',
			description: 'Real-time color-coded market strength visualization to identify opportunities and gauge overall market sentiment.',
			features: ['Real-time data', 'Sector analysis', 'Strength indicators', 'Custom alerts'],
			status: 'Available',
			color: 'primary'
		},
		{
			icon: FileText,
			title: 'Trading Journal Pro',
			description: 'Integrated trade logging and review system with advanced analytics to track your progress and identify improvement areas.',
			features: ['Trade tracking', 'Performance analytics', 'Pattern recognition', 'Progress reports'],
			status: 'Available',
			color: 'secondary'
		},
		{
			icon: Brain,
			title: 'Money Mindset Coaching',
			description: 'Daily protocols and frameworks designed to develop the psychological discipline required for consistent trading success.',
			features: ['Daily protocols', 'Mindset exercises', 'Psychological assessments', 'Mental coaching'],
			status: 'Available',
			color: 'primary'
		},
		{
			icon: Target,
			title: 'Bias Analysis Tool',
			description: 'Proprietary "Biastool" for systematic market direction analysis, helping you identify and eliminate emotional decision-making.',
			features: ['Bias detection', 'Market direction analysis', 'Decision frameworks', 'Systematic approach'],
			status: 'Coming Soon',
			color: 'secondary'
		}
	];
</script>

<section id="platform" class="section-padding bg-muted/10">
	<div class="container-max mx-auto">
		<div class="text-center mb-16">
			<Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
				<Zap class="w-4 h-4 mr-2" />
				Warrior Development Arsenal
			</Badge>
			
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				The Arsenal That
				<span class="block gradient-text">Forges Operators</span>
			</h2>
			
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
				Every tool designed with military precision to transform weakness into strength. 
				No comfort zones. Only systematic development and measurable progress.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
			{#each tools as tool, index}
				<div class="military-card group relative">
					<!-- Status Badge -->
					<div class="absolute -top-3 -right-3">
						<Badge class="{tool.status === 'Available' 
							? 'bg-primary/10 text-primary border-primary/20' 
							: 'bg-muted text-muted-foreground border-border'}">
							{tool.status}
						</Badge>
					</div>

					<div class="flex items-start space-x-4 mb-6">
						<div class="bg-{tool.color}/10 p-3 rounded-xl group-hover:bg-{tool.color}/20 transition-colors">
							<svelte:component this={tool.icon} class="w-6 h-6 text-{tool.color}" />
						</div>
						<div>
							<h3 class="text-xl font-bold mb-2">{tool.title}</h3>
						</div>
					</div>
					
					<p class="text-foreground/70 mb-6 leading-relaxed">
						{tool.description}
					</p>
					
					<div class="mb-6">
						<h4 class="text-sm font-semibold mb-3 text-foreground/80">Key Features:</h4>
						<ul class="space-y-2">
							{#each tool.features as feature}
								<li class="flex items-center space-x-2">
									<div class="w-1.5 h-1.5 bg-{tool.color} rounded-full" />
									<span class="text-sm text-foreground/70">{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
					
					<Button 
						variant="outline" 
						class="w-full border-{tool.color}/20 hover:bg-{tool.color}/10 group {tool.status === 'Coming Soon' ? 'opacity-50 cursor-not-allowed' : ''}"
						disabled={tool.status === 'Coming Soon'}
					>
						{tool.status === 'Available' ? 'Access Tool' : 'Coming Soon'}
						{#if tool.status === 'Available'}
							<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
						{/if}
					</Button>
				</div>
			{/each}
		</div>

		<!-- Integration Message -->
		<div class="text-center">
			<div class="military-card max-w-4xl mx-auto">
				<h3 class="text-2xl font-bold mb-4">Integrated Ecosystem</h3>
				<p class="text-foreground/70 mb-6 leading-relaxed">
					All tools work seamlessly together, creating a comprehensive trading environment 
					that supports every aspect of your development from novice to professional operator. 
					Your journal feeds your analytics, your community discussions inform your strategy, 
					and your mindset work reinforces your systematic approach.
				</p>
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground">
					Access Full Platform
				</Button>
			</div>
		</div>
	</div>
</section>