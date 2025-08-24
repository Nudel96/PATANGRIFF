<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Progress from '$lib/components/ui/Progress.svelte';
	import { logout } from '$lib/stores/auth';
	import { userXP, userLevel, learningProgress } from '$lib/stores/learning';
	import { 
		TrendingUp, 
		Building2, 
		DollarSign, 
		Brain,
		ArrowLeft,
		LogOut,
		GraduationCap,
		Award,
		ArrowRight
	} from 'lucide-svelte';

	const pillars = [
		{
			id: 'trading-mastery',
			icon: TrendingUp,
			title: 'Trading Mastery',
			subtitle: 'Analytical & Execution Excellence',
			description: 'Master the complete trading sequence from macro-economic analysis to precise execution.',
			color: 'primary',
			href: '/dashboard/learning/trading-mastery'
		},
		{
			id: 'business-operations',
			icon: Building2,
			title: 'Business Operations',
			subtitle: 'Professional Trading Practices',
			description: 'Transform trading from hobby to professional enterprise through systematic operations.',
			color: 'secondary',
			href: '/dashboard/learning/business-operations'
		},
		{
			id: 'trading-psychology',
			icon: Brain,
			title: 'Trading Psychology',
			subtitle: 'Mental Framework & Discipline',
			description: 'Forge the mental conditioning required for consistent market success.',
			color: 'secondary',
			href: '/dashboard/learning/trading-psychology'
		},
		{
			id: 'capital-management',
			icon: DollarSign,
			title: 'Capital Management',
			subtitle: 'Financial Risk & Money Management',
			description: 'Master the financial architecture of professional trading.',
			color: 'primary',
			href: '/dashboard/learning/capital-management'
		}
	];

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard');
	}

	function navigateToPillar(href: string) {
		goto(href);
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container-max mx-auto px-6">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-4">
					<Button variant="ghost" size="sm" on:click={handleBack}>
						<ArrowLeft class="w-4 h-4 mr-2" />
						Back to Dashboard
					</Button>
					<div class="flex items-center space-x-3">
						<div class="bg-primary/10 p-2 rounded-lg">
							<GraduationCap class="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Learning Center</h1>
							<p class="text-sm text-foreground/70">Master the Four Pillars</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-lg">
						<Award class="w-4 h-4 text-primary" />
						<span class="font-bold text-primary">{$userXP} XP</span>
					</div>
					<Badge class="bg-secondary/10 text-secondary border-secondary/20">
						Level {$userLevel}
					</Badge>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		<!-- Learning Center Overview -->
		<div class="text-center mb-12">
			<div class="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
				<GraduationCap class="w-10 h-10 text-primary" />
			</div>
			<h2 class="text-4xl font-bold mb-4">
				Warrior Development
				<span class="block gradient-text">Learning Center</span>
			</h2>
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
				Master the Four Pillars of Trading Excellence through our comprehensive 30-level progression system. 
				Each pillar builds the skills needed to transform from chart-watcher to market operator.
			</p>
		</div>

		<!-- Four Pillars Learning Paths -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each pillars as pillar}
				<Card class="military-card group cursor-pointer" on:click={() => navigateToPillar(pillar.href)}>
					<CardHeader>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="bg-{pillar.color}/10 p-3 rounded-xl group-hover:bg-{pillar.color}/20 transition-colors">
									<svelte:component this={pillar.icon} class="w-6 h-6 text-{pillar.color}" />
								</div>
								<div>
									<CardTitle class="text-xl">{pillar.title}</CardTitle>
									<p class="text-{pillar.color} font-semibold">{pillar.subtitle}</p>
								</div>
							</div>
							<Badge class="bg-{pillar.color}/10 text-{pillar.color}">
								Level {Math.floor($learningProgress[pillar.id] / 100 * 30)}/30
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<p class="text-foreground/70 mb-4">
							{pillar.description}
						</p>
						<div class="space-y-2 mb-4">
							<div class="flex justify-between text-sm">
								<span>Progress</span>
								<span>{$learningProgress[pillar.id]}%</span>
							</div>
							<Progress value={$learningProgress[pillar.id]} class="h-2" />
						</div>
						<div class="grid grid-cols-3 gap-2 text-xs text-center mb-4">
							<div class="p-2 bg-green-500/10 rounded">
								<div class="font-bold text-green-500">1-10</div>
								<div class="text-muted-foreground">Foundations</div>
							</div>
							<div class="p-2 bg-blue-500/10 rounded">
								<div class="font-bold text-blue-500">11-20</div>
								<div class="text-muted-foreground">Advanced</div>
							</div>
							<div class="p-2 bg-purple-500/10 rounded">
								<div class="font-bold text-purple-500">21-30</div>
								<div class="text-muted-foreground">Professional</div>
							</div>
						</div>
						<Button class="w-full bg-{pillar.color} hover:bg-{pillar.color}/90 text-{pillar.color}-foreground group">
							Continue Journey
							<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</div>