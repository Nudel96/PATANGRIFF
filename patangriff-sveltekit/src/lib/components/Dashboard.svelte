<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import CardContent from './ui/CardContent.svelte';
	import Badge from './ui/Badge.svelte';
	import Progress from './ui/Progress.svelte';
	import { logout, currentUser } from '$lib/stores/auth';
	import { 
		Shield, 
		TrendingUp, 
		BookOpen, 
		Users, 
		Activity, 
		FileText, 
		Brain, 
		Target,
		DollarSign,
		Building2,
		Award,
		Calendar,
		BarChart3,
		LogOut,
		ArrowRight,
		Home,
		GraduationCap,
		Plus,
		LineChart,
		MessageCircle
	} from 'lucide-svelte';

	// Quick stats for overview
	const quickStats = [
		{ label: 'Total Progress', value: '52%', icon: BarChart3, color: 'primary' },
		{ label: 'Trades Logged', value: '127', icon: FileText, color: 'secondary' },
		{ label: 'Win Rate', value: '73%', icon: Target, color: 'primary' },
		{ label: 'Days Active', value: '89', icon: Calendar, color: 'secondary' }
	];

	// Four Pillars progress data
	const pillarsProgress = [
		{ name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp },
		{ name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2 },
		{ name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign },
		{ name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain }
	];

	// Recent activity data
	const recentActivity = [
		{ action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course', icon: Award },
		{ action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade', icon: TrendingUp },
		{ action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session', icon: Users },
		{ action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement', icon: Award }
	];

	const mainSections = [
		{
			id: 'learning',
			title: 'Learning Center',
			subtitle: 'Master the Four Pillars',
			description: 'Comprehensive education across Trading Mastery, Business Operations, Psychology, and Capital Management',
			icon: GraduationCap,
			color: 'primary',
			features: ['30 Levels per Pillar', 'XP Progression', 'Interactive Modules', 'Assessments'],
			action: 'Start Learning',
			href: '/dashboard/learning'
		},
		{
			id: 'heatmap',
			title: 'Market Heatmap',
			subtitle: 'Real-time Market Analysis',
			description: 'Live currency strength analysis with comprehensive economic data and trading signals',
			icon: Activity,
			color: 'secondary',
			features: ['Live Data', 'Currency Strength', 'Economic Indicators', 'Trading Signals'],
			action: 'View Markets',
			href: '/dashboard/heatmap'
		},
		{
			id: 'community',
			title: 'Community Hub',
			subtitle: 'Brotherhood of Warriors',
			description: 'Connect with fellow traders, share insights, join squads, and participate in challenges. Access exclusive forums and mentorship.',
			icon: Users,
			color: 'secondary',
			features: ['Discussion Forums', 'Trade Gallery', 'Squads & Accountability', 'Events & AMAs'],
			action: 'Enter Community',
			href: '/dashboard/community'
		},
		{
			id: 'squads',
			title: 'Squads Hub',
			subtitle: 'Collaborative Learning',
			description: 'Join focused learning groups, create accountability partnerships, and collaborate on projects with like-minded professionals.',
			icon: Shield,
			color: 'primary',
			features: ['Learning Groups', 'Accountability Partners', 'Collaborative Projects', 'Peer Mentorship'],
			action: 'Explore Squads',
			href: '/dashboard/squads'
		},
		{
			id: 'journal',
			title: 'Trading Journal',
			subtitle: 'Track & Analyze Performance',
			description: 'Professional trade logging with pre-trade checklists, analytics, and performance tracking',
			icon: FileText,
			color: 'primary',
			features: ['Trade Logging', 'Pre-trade Checklist', 'Analytics', 'Calendar View'],
			action: 'Open Journal',
			href: '/dashboard/journal'
		}
	];

	function handleLogout() {
		logout();
		goto('/');
	}

	function navigateToSection(href: string) {
		goto(href);
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Dashboard Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container-max mx-auto px-6">
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

				<!-- Main Navigation -->
				<nav class="hidden md:flex items-center space-x-6">
					<Button variant="default" size="sm" class="flex items-center space-x-2">
						<Home class="w-4 h-4" />
						<span>Dashboard</span>
					</Button>
					<Button variant="ghost" size="sm" on:click={() => navigateToSection('/dashboard/learning')} class="flex items-center space-x-2">
						<GraduationCap class="w-4 h-4" />
						<span>Learning</span>
					</Button>
					<Button variant="ghost" size="sm" on:click={() => navigateToSection('/dashboard/heatmap')} class="flex items-center space-x-2">
						<Activity class="w-4 h-4" />
						<span>Heatmap</span>
					</Button>
					<Button variant="ghost" size="sm" on:click={() => navigateToSection('/dashboard/journal')} class="flex items-center space-x-2">
						<FileText class="w-4 h-4" />
						<span>Journal</span>
					</Button>
					<Button variant="ghost" size="sm" on:click={() => navigateToSection('/dashboard/community')} class="flex items-center space-x-2">
						<Users class="w-4 h-4" />
						<span>Community</span>
					</Button>
				</nav>

				<!-- Header Actions -->
				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-4 text-sm">
						<div class="text-center">
							<div class="font-bold text-primary">+12.5R</div>
							<div class="text-xs text-muted-foreground">Total R</div>
						</div>
						<div class="text-center">
							<div class="font-bold text-secondary">85%</div>
							<div class="text-xs text-muted-foreground">Discipline</div>
						</div>
					</div>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<div class="container-max mx-auto px-6 py-8">
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
				{#each quickStats as stat}
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
				{#each mainSections as section}
					<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" on:click={() => navigateToSection(section.href)}>
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
								{#each section.features as feature}
									<div class="flex items-center space-x-2 text-sm">
										<div class="w-2 h-2 bg-{section.color} rounded-full" />
										<span class="text-foreground/80">{feature}</span>
									</div>
								{/each}
							</div>
							
							<Button 
								class="w-full bg-{section.color} hover:bg-{section.color}/90 text-{section.color}-foreground group"
								size="lg"
							>
								{section.action}
								<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
							</Button>
						</CardContent>
					</Card>
				{/each}
			</div>

			<!-- Secondary Features Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<!-- Four Pillars Progress -->
				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2">
							<Shield class="w-5 h-5 text-primary" />
							<span>Four Pillars Progress</span>
						</CardTitle>
					</CardHeader>
					<CardContent class="space-y-6">
						{#each pillarsProgress as pillar}
							<div class="space-y-3 cursor-pointer group">
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-3">
										<div class="bg-{pillar.color}/10 p-2 rounded-lg group-hover:bg-{pillar.color}/20 transition-colors">
											<svelte:component this={pillar.icon} class="w-4 h-4 text-{pillar.color}" />
										</div>
										<span class="font-semibold group-hover:text-primary transition-colors">{pillar.name}</span>
									</div>
									<div class="flex items-center space-x-2">
										<span class="text-{pillar.color} font-bold">{pillar.progress}%</span>
										<ArrowRight class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
									</div>
								</div>
								<Progress value={pillar.progress} class="h-2" />
							</div>
						{/each}
					</CardContent>
				</Card>

				<!-- Recent Activity -->
				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2">
							<Activity class="w-5 h-5 text-secondary" />
							<span>Recent Activity</span>
						</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						{#each recentActivity as activity}
							<div class="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
								<div class="w-8 h-8 rounded-lg flex items-center justify-center {
									activity.type === 'course' ? 'bg-primary/10' :
									activity.type === 'trade' ? 'bg-secondary/10' :
									activity.type === 'session' ? 'bg-primary/10' : 'bg-secondary/10'
								}">
									<svelte:component this={activity.icon} class="w-4 h-4 {
										activity.type === 'course' ? 'text-primary' :
										activity.type === 'trade' ? 'text-secondary' :
										activity.type === 'session' ? 'text-primary' : 'text-secondary'
									}" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-medium">{activity.action}</p>
									<p class="text-xs text-muted-foreground">{activity.time}</p>
								</div>
							</div>
						{/each}
						
						<Button variant="outline" class="w-full mt-4">
							View All Activity
							<ArrowRight class="ml-2 w-4 h-4" />
						</Button>
					</CardContent>
				</Card>
			</div>

			<!-- Quick Actions Bar -->
			<Card class="military-card">
				<CardContent class="p-6">
					<h3 class="text-lg font-semibold mb-4 flex items-center space-x-2">
						<Target class="w-5 h-5 text-primary" />
						<span>Quick Actions</span>
					</h3>
					<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2" on:click={() => navigateToSection('/dashboard/journal')}>
							<Plus class="w-5 h-5 text-primary" />
							<span class="text-sm">Log Trade</span>
						</Button>
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2" on:click={() => navigateToSection('/dashboard/heatmap')}>
							<LineChart class="w-5 h-5 text-secondary" />
							<span class="text-sm">Check Markets</span>
						</Button>
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2" on:click={() => navigateToSection('/dashboard/community')}>
							<Users class="w-5 h-5 text-secondary" />
							<span class="text-sm">Community</span>
						</Button>
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2" on:click={() => navigateToSection('/dashboard/learning')}>
							<BookOpen class="w-5 h-5 text-primary" />
							<span class="text-sm">Continue Learning</span>
						</Button>
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2" on:click={() => navigateToSection('/dashboard/squads')}>
							<Shield class="w-5 h-5 text-secondary" />
							<span class="text-sm">Join Squads</span>
						</Button>
						<Button variant="outline" class="h-auto p-4 flex flex-col items-center space-y-2">
							<MessageCircle class="w-5 h-5 text-secondary" />
							<span class="text-sm">Support</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>