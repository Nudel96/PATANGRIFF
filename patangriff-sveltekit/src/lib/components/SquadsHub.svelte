<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
	import Input from './ui/Input.svelte';
	import Tabs from './ui/Tabs.svelte';
	import TabsList from './ui/TabsList.svelte';
	import TabsTrigger from './ui/TabsTrigger.svelte';
	import TabsContent from './ui/TabsContent.svelte';
	import Select from './ui/Select.svelte';
	import SelectItem from './ui/SelectItem.svelte';
	import CreateSquadModal from './CreateSquadModal.svelte';
	import SquadDetailView from './SquadDetailView.svelte';
	import { logout } from '$lib/stores/auth';
	import { 
		squads, 
		userSquads, 
		squadStats, 
		recommendedSquads, 
		selectedSquad,
		type Squad,
		type SquadCategory 
	} from '$lib/stores/squads';
	import { 
		Shield, 
		Users, 
		Plus, 
		Search, 
		Filter,
		TrendingUp,
		Brain,
		Building2,
		Target,
		BookOpen,
		Network,
		Award,
		Clock,
		Globe,
		Lock,
		Eye,
		UserPlus,
		MessageCircle,
		Calendar,
		BarChart3,
		Star,
		ArrowLeft,
		LogOut,
		Zap,
		Activity,
		Crown,
		CheckCircle,
		AlertCircle,
		Users2,
		Briefcase,
		GraduationCap,
		Handshake,
		Lightbulb,
		Code,
		DollarSign,
		Rocket,
		Coffee
	} from 'lucide-svelte';

	let activeTab = 'discover';
	let searchTerm = '';
	let selectedCategory = 'all';
	let selectedPrivacy = 'all';
	let selectedSkillLevel = 'all';
	let showCreateModal = false;
	let selectedSquadId = '';

	// Sample squad data
	const sampleSquads: Squad[] = [
		{
			id: '1',
			name: 'Gold Trading Masters',
			description: 'Daily gold analysis and trade reviews. Focus on London/NY sessions with systematic approach to precious metals trading.',
			category: 'Trading Strategies',
			privacy: 'Open',
			maxMembers: 12,
			currentMembers: 8,
			leaderId: 'user1',
			moderatorIds: ['user2'],
			memberIds: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8'],
			pendingApplications: [],
			invitedUsers: [],
			tags: ['gold', 'precious-metals', 'technical-analysis', 'daily-review'],
			goals: ['Improve gold trading accuracy', 'Share market insights', 'Develop systematic approach'],
			activityLevel: 'Very High',
			meetingCadence: 'Daily 8AM EST',
			timezone: 'America/New_York',
			requirements: ['Minimum 6 months trading experience', 'Daily participation expected'],
			resources: [],
			achievements: [],
			createdAt: new Date('2024-01-01'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['Respect all members', 'Share quality analysis only', 'No spam or self-promotion'],
			focusAreas: ['Technical Analysis', 'Risk Management', 'Market Psychology'],
			skillLevel: 'Intermediate',
			language: 'English',
			region: 'North America'
		},
		{
			id: '2',
			name: 'Forex Fundamentals Study Group',
			description: 'Weekly deep dives into economic data, central bank policies, and their impact on major currency pairs.',
			category: 'Skill Learning',
			privacy: 'Application-Required',
			maxMembers: 15,
			currentMembers: 12,
			leaderId: 'user9',
			moderatorIds: ['user10', 'user11'],
			memberIds: ['user9', 'user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'user17', 'user18', 'user19', 'user20'],
			pendingApplications: ['user21', 'user22'],
			invitedUsers: [],
			tags: ['forex', 'fundamentals', 'economics', 'central-banks'],
			goals: ['Master fundamental analysis', 'Understand economic indicators', 'Predict currency movements'],
			activityLevel: 'High',
			meetingCadence: 'Weekly Sundays 2PM EST',
			timezone: 'America/New_York',
			requirements: ['Basic understanding of forex markets', 'Commitment to weekly sessions'],
			resources: [],
			achievements: [],
			createdAt: new Date('2023-12-15'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['Come prepared with questions', 'Share research findings', 'Maintain professional discourse'],
			focusAreas: ['Economic Analysis', 'Central Bank Policy', 'Currency Correlations'],
			skillLevel: 'Beginner',
			language: 'English',
			region: 'Global'
		},
		{
			id: '3',
			name: 'Trading Psychology Warriors',
			description: 'Mindset work, emotional regulation, and performance optimization. Focus on building mental resilience and discipline.',
			category: 'Business Development',
			privacy: 'Invite-Only',
			maxMembers: 8,
			currentMembers: 6,
			leaderId: 'user23',
			moderatorIds: ['user24'],
			memberIds: ['user23', 'user24', 'user25', 'user26', 'user27', 'user28'],
			pendingApplications: [],
			invitedUsers: ['user29', 'user30'],
			tags: ['psychology', 'mindset', 'discipline', 'performance'],
			goals: ['Develop mental resilience', 'Overcome trading fears', 'Build consistent habits'],
			activityLevel: 'Medium',
			meetingCadence: 'Bi-weekly Thursdays 7PM EST',
			timezone: 'America/New_York',
			requirements: ['Serious commitment to personal development', 'Willingness to share challenges'],
			resources: [],
			achievements: [],
			createdAt: new Date('2024-01-10'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['Confidentiality is paramount', 'Support each other', 'No judgment zone'],
			focusAreas: ['Emotional Control', 'Habit Formation', 'Stress Management'],
			skillLevel: 'Mixed',
			language: 'English',
			region: 'Global'
		},
		{
			id: '4',
			name: 'Algorithmic Trading Developers',
			description: 'For developers building trading algorithms, backtesting systems, and automated strategies.',
			category: 'Industry Specific',
			privacy: 'Application-Required',
			maxMembers: 10,
			currentMembers: 7,
			leaderId: 'user31',
			moderatorIds: ['user32'],
			memberIds: ['user31', 'user32', 'user33', 'user34', 'user35', 'user36', 'user37'],
			pendingApplications: ['user38'],
			invitedUsers: [],
			tags: ['algorithmic', 'programming', 'backtesting', 'automation'],
			goals: ['Share coding best practices', 'Collaborate on projects', 'Improve algorithm performance'],
			activityLevel: 'High',
			meetingCadence: 'Weekly Saturdays 10AM EST',
			timezone: 'America/New_York',
			requirements: ['Programming experience required', 'Portfolio of trading algorithms'],
			resources: [],
			achievements: [],
			createdAt: new Date('2023-11-20'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['Share code responsibly', 'Help debug issues', 'Respect intellectual property'],
			focusAreas: ['Algorithm Development', 'Backtesting', 'Risk Management'],
			skillLevel: 'Advanced',
			language: 'English',
			region: 'Global'
		},
		{
			id: '5',
			name: 'Business Scaling Masterminds',
			description: 'Entrepreneurs and business owners focused on scaling operations, building teams, and systematic growth.',
			category: 'Business Development',
			privacy: 'Application-Required',
			maxMembers: 6,
			currentMembers: 4,
			leaderId: 'user39',
			moderatorIds: [],
			memberIds: ['user39', 'user40', 'user41', 'user42'],
			pendingApplications: ['user43', 'user44'],
			invitedUsers: [],
			tags: ['scaling', 'entrepreneurship', 'systems', 'leadership'],
			goals: ['Scale businesses systematically', 'Share growth strategies', 'Build accountability'],
			activityLevel: 'Medium',
			meetingCadence: 'Monthly first Monday 6PM EST',
			timezone: 'America/New_York',
			requirements: ['Active business owner', 'Revenue > $100k annually', 'Serious about growth'],
			resources: [],
			achievements: [],
			createdAt: new Date('2024-01-05'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['Confidentiality required', 'Come with specific challenges', 'Provide actionable feedback'],
			focusAreas: ['Operations', 'Team Building', 'Strategic Planning'],
			skillLevel: 'Advanced',
			language: 'English',
			region: 'North America'
		},
		{
			id: '6',
			name: 'New Trader Bootcamp',
			description: 'Supportive environment for complete beginners to learn trading fundamentals and build confidence.',
			category: 'Skill Learning',
			privacy: 'Open',
			maxMembers: 20,
			currentMembers: 15,
			leaderId: 'user45',
			moderatorIds: ['user46', 'user47'],
			memberIds: Array.from({length: 15}, (_, i) => `user${45 + i}`),
			pendingApplications: [],
			invitedUsers: [],
			tags: ['beginner', 'fundamentals', 'support', 'education'],
			goals: ['Learn trading basics', 'Build confidence', 'Develop good habits'],
			activityLevel: 'High',
			meetingCadence: 'Daily check-ins, Weekly lessons',
			timezone: 'America/New_York',
			requirements: ['Complete beginner or less than 6 months experience'],
			resources: [],
			achievements: [],
			createdAt: new Date('2024-01-12'),
			lastActivity: new Date(),
			isActive: true,
			rules: ['No question is too basic', 'Help each other learn', 'Practice patience'],
			focusAreas: ['Chart Reading', 'Risk Management', 'Platform Usage'],
			skillLevel: 'Beginner',
			language: 'English',
			region: 'Global'
		}
	];

	onMount(() => {
		squads.set(sampleSquads);
		userSquads.set([sampleSquads[0], sampleSquads[2]]); // User is in Gold Trading Masters and Psychology Warriors
	});

	const categories: { id: SquadCategory | 'all', name: string, icon: any, color: string }[] = [
		{ id: 'all', name: 'All Categories', icon: Globe, color: 'text-primary' },
		{ id: 'Trading Strategies', name: 'Trading Strategies', icon: TrendingUp, color: 'text-green-500' },
		{ id: 'Business Development', name: 'Business Development', icon: Building2, color: 'text-blue-500' },
		{ id: 'Skill Learning', name: 'Skill Learning', icon: GraduationCap, color: 'text-purple-500' },
		{ id: 'Industry Specific', name: 'Industry Specific', icon: Briefcase, color: 'text-orange-500' },
		{ id: 'Accountability', name: 'Accountability', icon: Target, color: 'text-red-500' },
		{ id: 'Mentorship', name: 'Mentorship', icon: Handshake, color: 'text-indigo-500' },
		{ id: 'Project Based', name: 'Project Based', icon: Rocket, color: 'text-pink-500' },
		{ id: 'Study Groups', name: 'Study Groups', icon: BookOpen, color: 'text-teal-500' },
		{ id: 'Networking', name: 'Networking', icon: Network, color: 'text-cyan-500' },
		{ id: 'Career Development', name: 'Career Development', icon: Lightbulb, color: 'text-yellow-500' }
	];

	const privacyLevels = [
		{ id: 'all', name: 'All Types', icon: Globe },
		{ id: 'Open', name: 'Open', icon: Eye },
		{ id: 'Invite-Only', name: 'Invite Only', icon: UserPlus },
		{ id: 'Application-Required', name: 'Application Required', icon: CheckCircle },
		{ id: 'Private', name: 'Private', icon: Lock }
	];

	const skillLevels = [
		{ id: 'all', name: 'All Levels' },
		{ id: 'Beginner', name: 'Beginner' },
		{ id: 'Intermediate', name: 'Intermediate' },
		{ id: 'Advanced', name: 'Advanced' },
		{ id: 'Mixed', name: 'Mixed' }
	];

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard');
	}

	function getPrivacyIcon(privacy: string) {
		switch (privacy) {
			case 'Open': return Eye;
			case 'Invite-Only': return UserPlus;
			case 'Application-Required': return CheckCircle;
			case 'Private': return Lock;
			default: return Globe;
		}
	}

	function getPrivacyColor(privacy: string) {
		switch (privacy) {
			case 'Open': return 'bg-primary/10 text-primary';
			case 'Invite-Only': return 'bg-secondary/10 text-secondary';
			case 'Application-Required': return 'bg-orange-500/10 text-orange-500';
			case 'Private': return 'bg-red-500/10 text-red-500';
			default: return 'bg-muted text-muted-foreground';
		}
	}

	function getActivityColor(level: string) {
		switch (level) {
			case 'Very High': return 'bg-red-500/10 text-red-500';
			case 'High': return 'bg-orange-500/10 text-orange-500';
			case 'Medium': return 'bg-yellow-500/10 text-yellow-500';
			case 'Low': return 'bg-green-500/10 text-green-500';
			default: return 'bg-muted text-muted-foreground';
		}
	}

	function getCategoryIcon(category: SquadCategory) {
		const cat = categories.find(c => c.id === category);
		return cat?.icon || Globe;
	}

	function getCategoryColor(category: SquadCategory) {
		const cat = categories.find(c => c.id === category);
		return cat?.color || 'text-muted-foreground';
	}

	function getSkillLevelColor(level: string) {
		switch (level) {
			case 'Beginner': return 'bg-green-500/10 text-green-500';
			case 'Intermediate': return 'bg-blue-500/10 text-blue-500';
			case 'Advanced': return 'bg-purple-500/10 text-purple-500';
			case 'Mixed': return 'bg-orange-500/10 text-orange-500';
			default: return 'bg-muted text-muted-foreground';
		}
	}

	function openSquadDetail(squadId: string) {
		selectedSquadId = squadId;
		const squad = $squads.find(s => s.id === squadId);
		if (squad) {
			selectedSquad.set(squad);
		}
	}

	function closeSquadDetail() {
		selectedSquadId = '';
		selectedSquad.set(null);
	}

	$: filteredSquads = $squads.filter(squad => {
		const matchesSearch = squad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			squad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			squad.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		
		const matchesCategory = selectedCategory === 'all' || squad.category === selectedCategory;
		const matchesPrivacy = selectedPrivacy === 'all' || squad.privacy === selectedPrivacy;
		const matchesSkillLevel = selectedSkillLevel === 'all' || squad.skillLevel === selectedSkillLevel;
		
		return matchesSearch && matchesCategory && matchesPrivacy && matchesSkillLevel;
	});

	$: mySquads = $userSquads;
</script>

{#if selectedSquadId}
	<SquadDetailView squadId={selectedSquadId} onBack={closeSquadDetail} {onLogout} />
{:else}
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
							<div class="bg-secondary/10 p-2 rounded-lg">
								<Shield class="w-6 h-6 text-secondary" />
							</div>
							<div>
								<h1 class="text-xl font-bold gradient-text">Squads Hub</h1>
								<p class="text-sm text-foreground/70">Collaborative Learning & Accountability</p>
							</div>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="flex items-center space-x-4 text-sm">
							<div class="text-center">
								<div class="font-bold text-primary">{$squadStats.userSquadCount}</div>
								<div class="text-xs text-muted-foreground">My Squads</div>
							</div>
							<div class="text-center">
								<div class="font-bold text-secondary">{$squadStats.totalSquads}</div>
								<div class="text-xs text-muted-foreground">Total Active</div>
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

		<div class="container-max mx-auto px-6 py-8">
			<Tabs bind:value={activeTab} class="space-y-6">
				<TabsList class="grid w-full grid-cols-5 bg-muted/20">
					<TabsTrigger value="discover" class="flex items-center space-x-2">
						<Search class="w-4 h-4" />
						<span>Discover</span>
					</TabsTrigger>
					<TabsTrigger value="my-squads" class="flex items-center space-x-2">
						<Users class="w-4 h-4" />
						<span>My Squads</span>
					</TabsTrigger>
					<TabsTrigger value="recommended" class="flex items-center space-x-2">
						<Star class="w-4 h-4" />
						<span>Recommended</span>
					</TabsTrigger>
					<TabsTrigger value="create" class="flex items-center space-x-2">
						<Plus class="w-4 h-4" />
						<span>Create</span>
					</TabsTrigger>
					<TabsTrigger value="analytics" class="flex items-center space-x-2">
						<BarChart3 class="w-4 h-4" />
						<span>Analytics</span>
					</TabsTrigger>
				</TabsList>

				<!-- Discover Squads -->
				<TabsContent value="discover" class="space-y-6">
					<!-- Search and Filters -->
					<div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
						<div class="flex items-center space-x-4 w-full md:w-auto">
							<div class="relative flex-1 md:w-80">
								<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
								<Input
									placeholder="Search squads, topics, or tags..."
									bind:value={searchTerm}
									class="pl-10"
								/>
							</div>
							<Button variant="outline" size="sm">
								<Filter class="w-4 h-4 mr-2" />
								Filters
							</Button>
						</div>
						<Button on:click={() => showCreateModal = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
							<Plus class="w-4 h-4 mr-2" />
							Create Squad
						</Button>
					</div>

					<!-- Filter Controls -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="space-y-2">
							<label class="text-sm font-medium">Category</label>
							<Select bind:value={selectedCategory}>
								{#each categories as category}
									<SelectItem value={category.id} selectOption={(v) => selectedCategory = v}>
										{category.name}
									</SelectItem>
								{/each}
							</Select>
						</div>
						<div class="space-y-2">
							<label class="text-sm font-medium">Privacy</label>
							<Select bind:value={selectedPrivacy}>
								{#each privacyLevels as privacy}
									<SelectItem value={privacy.id} selectOption={(v) => selectedPrivacy = v}>
										{privacy.name}
									</SelectItem>
								{/each}
							</Select>
						</div>
						<div class="space-y-2">
							<label class="text-sm font-medium">Skill Level</label>
							<Select bind:value={selectedSkillLevel}>
								{#each skillLevels as level}
									<SelectItem value={level.id} selectOption={(v) => selectedSkillLevel = v}>
										{level.name}
									</SelectItem>
								{/each}
							</Select>
						</div>
					</div>

					<!-- Squad Grid -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredSquads as squad}
							<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer group" on:click={() => openSquadDetail(squad.id)}>
								<CardHeader>
									<div class="flex items-start justify-between">
										<div class="flex items-start space-x-3">
											<div class="bg-{getCategoryColor(squad.category)}/10 p-2 rounded-lg">
												<svelte:component this={getCategoryIcon(squad.category)} class="w-5 h-5 {getCategoryColor(squad.category)}" />
											</div>
											<div class="flex-1">
												<CardTitle class="text-lg group-hover:text-primary transition-colors">{squad.name}</CardTitle>
												<Badge class="{getPrivacyColor(squad.privacy)} text-xs">
													<svelte:component this={getPrivacyIcon(squad.privacy)} class="w-3 h-3 mr-1" />
													{squad.privacy}
												</Badge>
											</div>
										</div>
										<Badge class="{getActivityColor(squad.activityLevel)} text-xs">
											{squad.activityLevel}
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<p class="text-sm text-muted-foreground mb-4 line-clamp-2">{squad.description}</p>
									
									<!-- Squad Stats -->
									<div class="grid grid-cols-2 gap-4 mb-4 text-xs">
										<div class="flex items-center space-x-2">
											<Users class="w-3 h-3 text-muted-foreground" />
											<span>{squad.currentMembers}/{squad.maxMembers} members</span>
										</div>
										<div class="flex items-center space-x-2">
											<Clock class="w-3 h-3 text-muted-foreground" />
											<span>{squad.meetingCadence}</span>
										</div>
									</div>

									<!-- Tags -->
									<div class="flex flex-wrap gap-1 mb-4">
										{#each squad.tags.slice(0, 3) as tag}
											<Badge variant="outline" class="text-xs">#{tag}</Badge>
										{/each}
										{#if squad.tags.length > 3}
											<span class="text-xs text-muted-foreground">+{squad.tags.length - 3}</span>
										{/if}
									</div>

									<!-- Skill Level and Category -->
									<div class="flex items-center justify-between mb-4">
										<Badge class="{getSkillLevelColor(squad.skillLevel)} text-xs">
											{squad.skillLevel}
										</Badge>
										<Badge variant="outline" class="text-xs">
											{squad.category}
										</Badge>
									</div>

									<!-- Action Button -->
									<Button class="w-full" variant="outline" size="sm">
										{#if squad.privacy === 'Open'}
											Join Squad
										{:else if squad.privacy === 'Application-Required'}
											Apply to Join
										{:else if squad.privacy === 'Invite-Only'}
											Request Invite
										{:else}
											View Details
										{/if}
									</Button>
								</CardContent>
							</Card>
						{/each}
					</div>

					{#if filteredSquads.length === 0}
						<div class="text-center py-12">
							<Search class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
							<h3 class="text-xl font-semibold mb-2">No squads found</h3>
							<p class="text-muted-foreground mb-6">Try adjusting your search criteria or create a new squad.</p>
							<Button on:click={() => showCreateModal = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2" />
								Create Your Squad
							</Button>
						</div>
					{/if}
				</TabsContent>

				<!-- My Squads -->
				<TabsContent value="my-squads" class="space-y-6">
					<div class="flex items-center justify-between">
						<h2 class="text-2xl font-bold">My Squads ({mySquads.length})</h2>
						<Button on:click={() => showCreateModal = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
							<Plus class="w-4 h-4 mr-2" />
							Create Squad
						</Button>
					</div>

					{#if mySquads.length > 0}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each mySquads as squad}
								<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer group" on:click={() => openSquadDetail(squad.id)}>
									<CardHeader>
										<div class="flex items-start justify-between">
											<div class="flex items-start space-x-3">
												<div class="bg-{getCategoryColor(squad.category)}/10 p-2 rounded-lg">
													<svelte:component this={getCategoryIcon(squad.category)} class="w-5 h-5 {getCategoryColor(squad.category)}" />
												</div>
												<div class="flex-1">
													<CardTitle class="text-lg group-hover:text-primary transition-colors">{squad.name}</CardTitle>
													<div class="flex items-center space-x-2 mt-1">
														<Badge class="{squad.leaderId === 'user1' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} text-xs">
															{squad.leaderId === 'user1' ? 'Leader' : 'Member'}
														</Badge>
														<Badge class="{getActivityColor(squad.activityLevel)} text-xs">
															{squad.activityLevel}
														</Badge>
													</div>
												</div>
											</div>
											<div class="text-right text-xs text-muted-foreground">
												<div>Last active</div>
												<div>{squad.lastActivity.toLocaleDateString()}</div>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<p class="text-sm text-muted-foreground mb-4 line-clamp-2">{squad.description}</p>
										
										<div class="grid grid-cols-2 gap-4 mb-4 text-xs">
											<div class="flex items-center space-x-2">
												<Users class="w-3 h-3 text-muted-foreground" />
												<span>{squad.currentMembers}/{squad.maxMembers}</span>
											</div>
											<div class="flex items-center space-x-2">
												<MessageCircle class="w-3 h-3 text-muted-foreground" />
												<span>12 new messages</span>
											</div>
										</div>

										<div class="flex items-center justify-between">
											<Badge class="{getSkillLevelColor(squad.skillLevel)} text-xs">
												{squad.skillLevel}
											</Badge>
											<Button variant="outline" size="sm">
												Enter Squad
											</Button>
										</div>
									</CardContent>
								</Card>
							{/each}
						</div>
					{:else}
						<div class="text-center py-12">
							<Shield class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
							<h3 class="text-xl font-semibold mb-2">No squads yet</h3>
							<p class="text-muted-foreground mb-6">Join existing squads or create your own to start collaborating.</p>
							<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Button on:click={() => activeTab = 'discover'} variant="outline">
									<Search class="w-4 h-4 mr-2" />
									Discover Squads
								</Button>
								<Button on:click={() => showCreateModal = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
									<Plus class="w-4 h-4 mr-2" />
									Create Squad
								</Button>
							</div>
						</div>
					{/if}
				</TabsContent>

				<!-- Recommended Squads -->
				<TabsContent value="recommended" class="space-y-6">
					<div class="text-center mb-8">
						<h2 class="text-2xl font-bold mb-4">Recommended for You</h2>
						<p class="text-muted-foreground">Based on your interests and current squad memberships</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each $recommendedSquads as squad}
							<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer group" on:click={() => openSquadDetail(squad.id)}>
								<CardHeader>
									<div class="flex items-start justify-between">
										<div class="flex items-start space-x-3">
											<div class="bg-{getCategoryColor(squad.category)}/10 p-2 rounded-lg">
												<svelte:component this={getCategoryIcon(squad.category)} class="w-5 h-5 {getCategoryColor(squad.category)}" />
											</div>
											<div class="flex-1">
												<CardTitle class="text-lg group-hover:text-primary transition-colors">{squad.name}</CardTitle>
												<Badge class="{getPrivacyColor(squad.privacy)} text-xs">
													<svelte:component this={getPrivacyIcon(squad.privacy)} class="w-3 h-3 mr-1" />
													{squad.privacy}
												</Badge>
											</div>
										</div>
										<Badge class="bg-primary/10 text-primary text-xs">
											<Star class="w-3 h-3 mr-1" />
											Recommended
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<p class="text-sm text-muted-foreground mb-4 line-clamp-2">{squad.description}</p>
									
									<div class="grid grid-cols-2 gap-4 mb-4 text-xs">
										<div class="flex items-center space-x-2">
											<Users class="w-3 h-3 text-muted-foreground" />
											<span>{squad.currentMembers}/{squad.maxMembers}</span>
										</div>
										<div class="flex items-center space-x-2">
											<Activity class="w-3 h-3 text-muted-foreground" />
											<span>{squad.activityLevel}</span>
										</div>
									</div>

									<div class="flex flex-wrap gap-1 mb-4">
										{#each squad.tags.slice(0, 2) as tag}
											<Badge variant="outline" class="text-xs">#{tag}</Badge>
										{/each}
									</div>

									<Button class="w-full" size="sm">
										{#if squad.privacy === 'Open'}
											Join Squad
										{:else}
											Apply to Join
										{/if}
									</Button>
								</CardContent>
							</Card>
						{/each}
					</div>
				</TabsContent>

				<!-- Create Squad -->
				<TabsContent value="create" class="space-y-6">
					<div class="text-center mb-8">
						<h2 class="text-2xl font-bold mb-4">Create Your Squad</h2>
						<p class="text-muted-foreground">Build a focused community around your expertise and interests</p>
					</div>

					<div class="max-w-2xl mx-auto">
						<Button on:click={() => showCreateModal = true} class="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-8 text-lg">
							<Plus class="w-6 h-6 mr-3" />
							Launch Squad Creation Wizard
						</Button>
					</div>

					<!-- Squad Creation Benefits -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
						<Card class="military-card text-center">
							<CardContent class="p-6">
								<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Crown class="w-6 h-6 text-primary" />
								</div>
								<h3 class="font-semibold mb-2">Leadership</h3>
								<p class="text-sm text-muted-foreground">Build leadership skills by guiding others</p>
							</CardContent>
						</Card>

						<Card class="military-card text-center">
							<CardContent class="p-6">
								<div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Network class="w-6 h-6 text-secondary" />
								</div>
								<h3 class="font-semibold mb-2">Network</h3>
								<p class="text-sm text-muted-foreground">Connect with like-minded professionals</p>
							</CardContent>
						</Card>

						<Card class="military-card text-center">
							<CardContent class="p-6">
								<div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Award class="w-6 h-6 text-primary" />
								</div>
								<h3 class="font-semibold mb-2">Recognition</h3>
								<p class="text-sm text-muted-foreground">Earn reputation and platform recognition</p>
							</CardContent>
						</Card>

						<Card class="military-card text-center">
							<CardContent class="p-6">
								<div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Zap class="w-6 h-6 text-secondary" />
								</div>
								<h3 class="font-semibold mb-2">Impact</h3>
								<p class="text-sm text-muted-foreground">Make a meaningful difference in others' growth</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<!-- Analytics -->
				<TabsContent value="analytics" class="space-y-6">
					<h2 class="text-2xl font-bold">Squad Analytics</h2>
					
					<!-- Overview Stats -->
					<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card class="military-card">
							<CardContent class="p-6">
								<div class="flex items-center justify-between">
									<div>
										<p class="text-sm text-muted-foreground">Total Squads</p>
										<p class="text-2xl font-bold text-primary">{$squadStats.totalSquads}</p>
									</div>
									<div class="bg-primary/10 p-3 rounded-xl">
										<Shield class="w-6 h-6 text-primary" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card class="military-card">
							<CardContent class="p-6">
								<div class="flex items-center justify-between">
									<div>
										<p class="text-sm text-muted-foreground">Active Members</p>
										<p class="text-2xl font-bold text-secondary">1,247</p>
									</div>
									<div class="bg-secondary/10 p-3 rounded-xl">
										<Users class="w-6 h-6 text-secondary" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card class="military-card">
							<CardContent class="p-6">
								<div class="flex items-center justify-between">
									<div>
										<p class="text-sm text-muted-foreground">Daily Messages</p>
										<p class="text-2xl font-bold text-primary">2,834</p>
									</div>
									<div class="bg-primary/10 p-3 rounded-xl">
										<MessageCircle class="w-6 h-6 text-primary" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card class="military-card">
							<CardContent class="p-6">
								<div class="flex items-center justify-between">
									<div>
										<p class="text-sm text-muted-foreground">Success Rate</p>
										<p class="text-2xl font-bold text-secondary">87%</p>
									</div>
									<div class="bg-secondary/10 p-3 rounded-xl">
										<Trophy class="w-6 h-6 text-secondary" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<!-- Category Distribution -->
					<Card class="military-card">
						<CardHeader>
							<CardTitle>Squad Categories</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
								{#each categories.slice(1) as category}
									<div class="text-center p-4 bg-muted/10 rounded-lg">
										<svelte:component this={category.icon} class="w-8 h-8 {category.color} mx-auto mb-2" />
										<div class="font-semibold text-sm">{category.name}</div>
										<div class="text-xs text-muted-foreground">
											{$squadStats.categoryCounts[category.id] || 0} squads
										</div>
									</div>
								{/each}
							</div>
						</CardContent>
					</Card>

					<!-- Engagement Metrics -->
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card class="military-card">
							<CardHeader>
								<CardTitle>Weekly Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div class="h-64 flex items-center justify-center text-muted-foreground">
									Activity chart visualization coming soon
								</div>
							</CardContent>
						</Card>

						<Card class="military-card">
							<CardHeader>
								<CardTitle>Member Growth</CardTitle>
							</CardHeader>
							<CardContent>
								<div class="h-64 flex items-center justify-center text-muted-foreground">
									Growth chart visualization coming soon
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>

		<!-- Create Squad Modal -->
		<CreateSquadModal bind:isOpen={showCreateModal} />
	</div>
{/if}