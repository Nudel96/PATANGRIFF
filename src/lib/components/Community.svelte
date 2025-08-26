<script lang="ts">
	import { Badge, Button } from '$lib/components/ui';
	import { 
		Users, 
		Shield, 
		MessageCircle, 
		BarChart3, 
		Calendar,
		ArrowRight,
		Target
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ joinCommunity: void }>();

	const communityStats = [
		{
			icon: Users,
			value: '5,000+',
			label: 'Active Members',
			color: 'primary'
		},
		{
			icon: MessageCircle,
			value: '1,200+',
			label: 'Daily Discussions',
			color: 'secondary'
		},
		{
			icon: Shield,
			value: '150+',
			label: 'Active Squads',
			color: 'primary'
		},
		{
			icon: Calendar,
			value: '24/7',
			label: 'Live Support',
			color: 'secondary'
		}
	];

	function handleJoinCommunity() {
		dispatch('joinCommunity');
	}
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
					Join small, focused groups of committed traders for maximum accountability and accelerated learning. 
					Each squad focuses on specific trading strategies, market sectors, or skill development areas with 
					regular meetings, progress tracking, and peer mentorship.
				</p>
				
				<div class="space-y-3 mb-6">
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full"></div>
						<span class="text-foreground/80">Small, focused groups for maximum accountability</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full"></div>
						<span class="text-foreground/80">Regular meetings and progress tracking</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full"></div>
						<span class="text-foreground/80">Peer mentorship and collaborative learning</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-primary rounded-full"></div>
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
						<div class="w-2 h-2 bg-secondary rounded-full"></div>
						<span class="text-foreground/80">Organized categories for focused discussions</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-secondary rounded-full"></div>
						<span class="text-foreground/80">Rich content support with charts and analysis</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-secondary rounded-full"></div>
						<span class="text-foreground/80">Expert mentorship and professional guidance</span>
					</div>
					<div class="flex items-center space-x-3">
						<div class="w-2 h-2 bg-secondary rounded-full"></div>
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
			{#each communityStats as stat}
				<div class="military-card text-center">
					<div class="bg-{stat.color}/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svelte:component this={stat.icon} class="w-8 h-8 text-{stat.color}" />
					</div>
					<div class="text-3xl font-bold text-{stat.color} mb-2">{stat.value}</div>
					<div class="text-sm text-foreground/70">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Community Values -->
		<div class="military-card max-w-4xl mx-auto mb-16">
			<div class="text-center mb-8">
				<h3 class="text-2xl font-bold mb-4">Warrior Code of Conduct</h3>
				<p class="text-foreground/70">
					Our community operates under strict principles that ensure quality discussions and mutual respect.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="text-center">
					<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<Target class="w-6 h-6 text-primary" />
					</div>
					<h4 class="font-semibold mb-2">Results-Focused</h4>
					<p class="text-sm text-foreground/70">Share real trades, real results, and actionable insights</p>
				</div>
				
				<div class="text-center">
					<div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<Shield class="w-6 h-6 text-secondary" />
					</div>
					<h4 class="font-semibold mb-2">Mutual Respect</h4>
					<p class="text-sm text-foreground/70">Professional discourse and constructive feedback only</p>
				</div>
				
				<div class="text-center">
					<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
						<Users class="w-6 h-6 text-primary" />
					</div>
					<h4 class="font-semibold mb-2">Collaborative Growth</h4>
					<p class="text-sm text-foreground/70">Help others succeed while advancing your own skills</p>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h3 class="text-3xl font-bold mb-6">
				Ready to Join the
				<span class="gradient-text">Elite Brotherhood?</span>
			</h3>
			
			<p class="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
				Connect with serious traders who are committed to excellence. 
				No time-wasters, no excuses, only results-driven professionals.
			</p>
			
			<Button size="lg" class="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold" on:click={handleJoinCommunity}>
				Join the Brotherhood
				<ArrowRight class="ml-2 w-5 h-5" />
			</Button>
		</div>
	</div>
</section>
