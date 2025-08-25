<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '$lib/components/ui';
	import { 
		Shield, 
		TrendingUp, 
		FileText, 
		Activity, 
		Users, 
		GraduationCap,
		Home,
		BarChart3,
		Target,
		Calendar,
		Award,
		ArrowRight,
		Settings,
		LogOut,
		Building2,
		DollarSign,
		Brain
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		logout: void;
		navigateToJournal: void;
		navigateToHeatmap: void;
		navigateToCommunity: void;
		navigateToTradingMastery: void;
		navigateToBusinessOps: void;
		navigateToPsychology: void;
		navigateToCapitalMgmt: void;
	}>();

	export let activeSection: string = 'home';

	let showUserSettings = false;

	// Quick stats for overview
	const quickStats = [
		{ label: 'Total Progress', value: '52%', icon: BarChart3, color: 'primary' },
		{ label: 'Trades Logged', value: '127', icon: FileText, color: 'secondary' },
		{ label: 'Win Rate', value: '73%', icon: Target, color: 'primary' },
		{ label: 'Days Active', value: '89', icon: Calendar, color: 'secondary' }
	];

	// Four Pillars progress data
	const pillarsProgress = [
		{ name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp, onClick: () => dispatch('navigateToTradingMastery') },
		{ name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2, onClick: () => dispatch('navigateToBusinessOps') },
		{ name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign, onClick: () => dispatch('navigateToCapitalMgmt') },
		{ name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain, onClick: () => dispatch('navigateToPsychology') }
	];

	// Community section
	const communitySection = {
		id: 'community',
		title: 'Community Hub',
		subtitle: 'Brotherhood of Warriors',
		description: 'Connect with fellow traders, share insights, join squads, and participate in challenges. Access exclusive forums and mentorship.',
		icon: Users,
		color: 'secondary',
		features: ['Discussion Forums', 'Trade Gallery', 'Squads & Accountability', 'Events & AMAs'],
		action: 'Enter Community',
		onClick: () => dispatch('navigateToCommunity')
	};

	const updatedMainSections = [
		{
			id: 'learning',
			title: 'Learning Center',
			subtitle: 'Master the Four Pillars',
			description: 'Comprehensive education across Trading Mastery, Business Operations, Psychology, and Capital Management',
			icon: GraduationCap,
			color: 'primary',
			features: ['30 Levels per Pillar', 'XP Progression', 'Interactive Modules', 'Assessments'],
			action: 'Start Learning',
			onClick: () => activeSection = 'learning'
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
			onClick: () => dispatch('navigateToHeatmap')
		},
		communitySection,
		{
			id: 'journal',
			title: 'Trading Journal',
			subtitle: 'Track & Analyze Performance',
			description: 'Professional trade logging with pre-trade checklists, analytics, and performance tracking',
			icon: FileText,
			color: 'primary',
			features: ['Trade Logging', 'Pre-trade Checklist', 'Analytics', 'Calendar View'],
			action: 'Open Journal',
			onClick: () => dispatch('navigateToJournal')
		}
	];

	function handleLogout() {
		dispatch('logout');
	}

	function setActiveSection(section: string) {
		activeSection = section;
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
					<Button 
						variant={activeSection === 'home' ? 'default' : 'ghost'} 
						size="sm"
						on:click={() => setActiveSection('home')}
						class="flex items-center space-x-2"
					>
						<Home class="w-4 h-4" />
						<span>Dashboard</span>
					</Button>
					<Button 
						variant={activeSection === 'learning' ? 'default' : 'ghost'} 
						size="sm"
						on:click={() => setActiveSection('learning')}
						class="flex items-center space-x-2"
					>
						<GraduationCap class="w-4 h-4" />
						<span>Learning</span>
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToHeatmap')}
						class="flex items-center space-x-2"
					>
						<Activity class="w-4 h-4" />
						<span>Heatmap</span>
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToJournal')}
						class="flex items-center space-x-2"
					>
						<FileText class="w-4 h-4" />
						<span>Journal</span>
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToCommunity')}
						class="flex items-center space-x-2"
					>
						<Users class="w-4 h-4" />
						<span>Community</span>
					</Button>
				</nav>

				<!-- User Menu -->
				<div class="flex items-center space-x-4">
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => showUserSettings = !showUserSettings}
						class="flex items-center space-x-2"
					>
						<Settings class="w-4 h-4" />
						<span class="hidden md:inline">Settings</span>
					</Button>
					<Button 
						variant="outline" 
						size="sm"
						on:click={handleLogout}
						class="flex items-center space-x-2"
					>
						<LogOut class="w-4 h-4" />
						<span class="hidden md:inline">Logout</span>
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Mobile Navigation -->
	<div class="md:hidden bg-card/30 backdrop-blur-sm border-b border-border/50">
		<div class="container-max mx-auto px-6">
			<div class="flex items-center justify-between py-3">
				<div class="flex space-x-2">
					<Button 
						variant={activeSection === 'home' ? 'default' : 'ghost'} 
						size="sm"
						on:click={() => setActiveSection('home')}
					>
						<Home class="w-4 h-4" />
					</Button>
					<Button 
						variant={activeSection === 'learning' ? 'default' : 'ghost'} 
						size="sm"
						on:click={() => setActiveSection('learning')}
					>
						<GraduationCap class="w-4 h-4" />
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToHeatmap')}
					>
						<Activity class="w-4 h-4" />
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToJournal')}
					>
						<FileText class="w-4 h-4" />
					</Button>
					<Button 
						variant="ghost" 
						size="sm"
						on:click={() => dispatch('navigateToCommunity')}
					>
						<Users class="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="container-max mx-auto px-6 py-8">
		<slot {activeSection} {quickStats} {pillarsProgress} {updatedMainSections} />
	</div>
</div>
