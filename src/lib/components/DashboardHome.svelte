<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { Award, ArrowRight } from 'lucide-svelte';

	export let quickStats: any[];
	export let updatedMainSections: any[];




</script>

<div class="space-y-8">
	<!-- Welcome Section -->
	<div class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">
			Welcome back, <span class="gradient-text">Warrior</span>
		</h1>
		<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
			Continue your transformation from chart-watcher to market operator. 
			Choose your path to excellence.
		</p>
		<Badge class="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-lg">
			<Award class="w-5 h-5 mr-2" />
			Elite Warrior Member
		</Badge>
	</div>

	<!-- Quick Stats Overview -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
		{#each quickStats as stat, index}
			<Card class="military-card">
				<CardContent class="p-4">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-muted-foreground">{stat.label}</p>
							<p class="text-2xl font-bold text-{stat.color}">{stat.value}</p>
						</div>
						<div class="bg-{stat.color}/10 p-2 rounded-lg">
							<svelte:component this={stat.icon} class="w-5 h-5 text-{stat.color}" />
						</div>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Main Navigation Sections -->
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
		{#each updatedMainSections as section, index}
			<Card
				class="military-card group transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
			>
				<CardHeader class="text-center pb-4">
					<div class="bg-{section.color}/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-{section.color}/20 transition-colors">
						<svelte:component this={section.icon} class="w-10 h-10 text-{section.color}" />
					</div>
					<CardTitle class="text-2xl mb-2">{section.title}</CardTitle>
					<p class="text-{section.color} font-semibold">{section.subtitle}</p>
				</CardHeader>
				<CardContent class="text-center">
					<p class="text-foreground/70 mb-6 leading-relaxed">
						{section.description}
					</p>
					
					<div class="grid grid-cols-2 gap-2 mb-6">
						{#each section.features as feature, featureIndex}
							<div class="flex items-center space-x-2 text-sm">
								<div class="w-2 h-2 bg-{section.color} rounded-full"></div>
								<span class="text-foreground/80">{feature}</span>
							</div>
						{/each}
					</div>
					
					<a
						href="/dashboard/{section.id}"
						class="block w-full bg-{section.color} hover:bg-{section.color}/90 text-{section.color}-foreground group px-6 py-3 rounded-md text-center font-medium transition-colors"
					>
						<span class="flex items-center justify-center">
							{section.action}
							<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
						</span>
					</a>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Recent Activity Section -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Recent Trades -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<div class="bg-primary/10 p-2 rounded-lg">
						<ArrowRight class="w-4 h-4 text-primary" />
					</div>
					<span>Recent Activity</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
						<div>
							<p class="font-semibold">EUR/USD Long</p>
							<p class="text-sm text-muted-foreground">2 hours ago</p>
						</div>
						<Badge class="bg-green-500/10 text-green-500">+2.3%</Badge>
					</div>
					<div class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
						<div>
							<p class="font-semibold">GBP/JPY Short</p>
							<p class="text-sm text-muted-foreground">1 day ago</p>
						</div>
						<Badge class="bg-red-500/10 text-red-500">-1.1%</Badge>
					</div>
					<div class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
						<div>
							<p class="font-semibold">Gold Long</p>
							<p class="text-sm text-muted-foreground">3 days ago</p>
						</div>
						<Badge class="bg-green-500/10 text-green-500">+4.7%</Badge>
					</div>
				</div>
				<Button variant="outline" class="w-full mt-4">
					View All Trades
				</Button>
			</CardContent>
		</Card>

		<!-- Learning Progress -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<div class="bg-secondary/10 p-2 rounded-lg">
						<Award class="w-4 h-4 text-secondary" />
					</div>
					<span>Learning Progress</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Trading Mastery</span>
						<span class="text-sm text-muted-foreground">Level 23/30</span>
					</div>
					<div class="w-full bg-muted/20 rounded-full h-2">
						<div class="bg-primary h-2 rounded-full" style="width: 75%"></div>
					</div>
					
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Psychology</span>
						<span class="text-sm text-muted-foreground">Level 9/30</span>
					</div>
					<div class="w-full bg-muted/20 rounded-full h-2">
						<div class="bg-secondary h-2 rounded-full" style="width: 30%"></div>
					</div>
					
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Capital Management</span>
						<span class="text-sm text-muted-foreground">Level 18/30</span>
					</div>
					<div class="w-full bg-muted/20 rounded-full h-2">
						<div class="bg-primary h-2 rounded-full" style="width: 60%"></div>
					</div>
				</div>
				<Button variant="outline" class="w-full mt-4">
					Continue Learning
				</Button>
			</CardContent>
		</Card>
	</div>
</div>
