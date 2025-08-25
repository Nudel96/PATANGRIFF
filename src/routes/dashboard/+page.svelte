<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { Button, Card, CardHeader, CardContent, CardTitle, Badge } from '$lib/components/ui';
	import { Shield, TrendingUp, FileText, Activity, Users, GraduationCap } from 'lucide-svelte';

	// This will be replaced with the actual Dashboard component migration
	// For now, just a placeholder with navigation using our new UI components

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
	
	function navigateToJournal() {
		goto('/dashboard/journal');
	}
	
	function navigateToHeatmap() {
		goto('/dashboard/heatmap');
	}
	
	function navigateToCommunity() {
		goto('/dashboard/community');
	}
	
	function navigateToTradingMastery() {
		goto('/dashboard/learning/trading-mastery');
	}
	
	function navigateToBusinessOps() {
		goto('/dashboard/learning/business-ops');
	}
	
	function navigateToPsychology() {
		goto('/dashboard/learning/psychology');
	}
	
	function navigateToCapitalMgmt() {
		goto('/dashboard/learning/capital-mgmt');
	}
</script>

<svelte:head>
	<title>Dashboard - PAT ANGRIFF</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Dashboard Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container mx-auto px-6">
			<div class="flex items-center justify-between h-16">
				<!-- Logo -->
				<div class="flex items-center space-x-3">
					<div class="relative">
						<Shield class="w-8 h-8 text-primary" />
						<TrendingUp class="w-4 h-4 text-secondary absolute -top-1 -right-1" />
					</div>
					<div class="flex flex-col">
						<span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
						<span class="text-sm text-muted-foreground -mt-1">WARRIOR PORTAL</span>
					</div>
				</div>

				<!-- User Actions -->
				<div class="flex items-center space-x-4">
					<Button variant="destructive" on:click={handleLogout}>
						Logout
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<div class="container mx-auto px-6 py-8">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">
				Welcome back, <span class="gradient-text">Warrior</span>
			</h1>
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
				Continue your transformation from chart-watcher to market operator. 
				Choose your path to excellence.
			</p>
		</div>

		<!-- Navigation Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
			<!-- Trading Journal -->
			<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" on:click={navigateToJournal}>
				<CardContent class="text-center p-6">
					<div class="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
						<FileText class="w-10 h-10 text-primary" />
					</div>
					<CardTitle class="text-2xl mb-2">Trading Journal</CardTitle>
					<Badge variant="default" class="text-primary bg-primary/10">Track & Analyze</Badge>
				</CardContent>
			</Card>

			<!-- Currency Heatmap -->
			<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" on:click={navigateToHeatmap}>
				<CardContent class="text-center p-6">
					<div class="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
						<Activity class="w-10 h-10 text-secondary" />
					</div>
					<CardTitle class="text-2xl mb-2">Currency Heatmap</CardTitle>
					<Badge variant="secondary" class="text-secondary bg-secondary/10">Market Analysis</Badge>
				</CardContent>
			</Card>

			<!-- Community -->
			<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" on:click={navigateToCommunity}>
				<CardContent class="text-center p-6">
					<div class="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
						<Users class="w-10 h-10 text-accent" />
					</div>
					<CardTitle class="text-2xl mb-2">Community</CardTitle>
					<Badge variant="outline" class="text-accent border-accent/20">Connect & Learn</Badge>
				</CardContent>
			</Card>

			<!-- Learning Hub -->
			<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" on:click={navigateToTradingMastery}>
				<CardContent class="text-center p-6">
					<div class="bg-muted/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-muted/20 transition-colors">
						<GraduationCap class="w-10 h-10 text-muted-foreground" />
					</div>
					<CardTitle class="text-2xl mb-2">Learning Hub</CardTitle>
					<Badge variant="outline" class="text-muted-foreground border-muted">Master Skills</Badge>
				</CardContent>
			</Card>
		</div>

		<!-- Learning Modules -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<button class="military-card p-4 text-left hover:bg-card/70 transition-colors" on:click={navigateToTradingMastery}>
				<h4 class="font-semibold mb-2">Trading Mastery</h4>
				<p class="text-sm text-muted-foreground">Advanced trading techniques</p>
			</button>
			
			<button class="military-card p-4 text-left hover:bg-card/70 transition-colors" on:click={navigateToBusinessOps}>
				<h4 class="font-semibold mb-2">Business Operations</h4>
				<p class="text-sm text-muted-foreground">Professional trading setup</p>
			</button>
			
			<button class="military-card p-4 text-left hover:bg-card/70 transition-colors" on:click={navigateToPsychology}>
				<h4 class="font-semibold mb-2">Trading Psychology</h4>
				<p class="text-sm text-muted-foreground">Mental game mastery</p>
			</button>
			
			<button class="military-card p-4 text-left hover:bg-card/70 transition-colors" on:click={navigateToCapitalMgmt}>
				<h4 class="font-semibold mb-2">Capital Management</h4>
				<p class="text-sm text-muted-foreground">Risk & money management</p>
			</button>
		</div>
	</div>
</div>
