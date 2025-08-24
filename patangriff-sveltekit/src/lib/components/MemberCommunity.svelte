<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
	import Tabs from './ui/Tabs.svelte';
	import TabsList from './ui/TabsList.svelte';
	import TabsTrigger from './ui/TabsTrigger.svelte';
	import TabsContent from './ui/TabsContent.svelte';
	import { logout } from '$lib/stores/auth';
	import { 
		Users, 
		MessageCircle, 
		TrendingUp, 
		Star,
		Award,
		Calendar,
		BookOpen,
		Target,
		Brain,
		Building2,
		ArrowRight,
		Zap,
		Trophy,
		Shield,
		Globe,
		Activity,
		FileText,
		Camera,
		BarChart3,
		ArrowLeft,
		LogOut,
		Plus,
		Eye,
		ThumbsUp,
		CheckCircle,
		Image,
		ChevronRight
	} from 'lucide-svelte';

	let activeTab = 'home';

	// Sample data
	const samplePosts = [
		{
			id: '1',
			type: 'trade-idea',
			title: 'XAUUSD Long Setup - London Session Breakout',
			author: 'GoldWarrior',
			authorLevel: 'A-Tier',
			timestamp: '2 hours ago',
			content: 'Clean breakout above 2020 resistance with strong volume confluence. Risk 1.5% for 3R target at 2045.',
			asset: 'XAUUSD',
			direction: 'long',
			timeframe: '4H',
			setupType: 'breakout',
			tags: ['gold', 'breakout', 'london-session'],
			likes: 24,
			replies: 8,
			views: 156,
			hasImage: true,
			isQualityVerified: true,
			isWikiCandidate: false
		},
		{
			id: '2',
			type: 'macro-thesis',
			title: 'USD Strength into Q1 2024 - Rate Differential Play',
			author: 'MacroMind',
			authorLevel: 'S-Tier',
			timestamp: '6 hours ago',
			content: 'Fed hawkish pivot vs ECB dovish hold creates compelling USD strength narrative. Key levels and trade implications inside.',
			tags: ['macro', 'usd', 'fed', 'rates'],
			likes: 45,
			replies: 23,
			views: 234,
			hasImage: false,
			isQualityVerified: true,
			isWikiCandidate: true
		}
	];

	const forums = [
		{ id: 'gold-desk', name: 'Gold Desk (XAU)', icon: Trophy, color: 'text-yellow-500', posts: 234 },
		{ id: 'fx-majors', name: 'FX Majors & Crosses', icon: Globe, color: 'text-blue-500', posts: 456 },
		{ id: 'indices', name: 'Indices & Metals', icon: BarChart3, color: 'text-green-500', posts: 189 },
		{ id: 'macro', name: 'Macro & Data', icon: TrendingUp, color: 'text-purple-500', posts: 167 }
	];

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard');
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
						<div class="bg-secondary/10 p-2 rounded-lg">
							<Users class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Member Community</h1>
							<p class="text-sm text-foreground/70">Brotherhood of Warriors</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		<Tabs bind:value={activeTab} class="space-y-8">
			<TabsList class="grid w-full grid-cols-6 bg-muted/20">
				<TabsTrigger value="home" class="flex items-center space-x-2">
					<Activity class="w-4 h-4" />
					<span class="hidden sm:inline">Home</span>
				</TabsTrigger>
				<TabsTrigger value="forums" class="flex items-center space-x-2">
					<MessageCircle class="w-4 h-4" />
					<span class="hidden sm:inline">Forums</span>
				</TabsTrigger>
				<TabsTrigger value="trades" class="flex items-center space-x-2">
					<BarChart3 class="w-4 h-4" />
					<span class="hidden sm:inline">Trades</span>
				</TabsTrigger>
				<TabsTrigger value="squads" class="flex items-center space-x-2">
					<Shield class="w-4 h-4" />
					<span class="hidden sm:inline">Squads</span>
				</TabsTrigger>
				<TabsTrigger value="events" class="flex items-center space-x-2">
					<Calendar class="w-4 h-4" />
					<span class="hidden sm:inline">Events</span>
				</TabsTrigger>
				<TabsTrigger value="challenges" class="flex items-center space-x-2">
					<Trophy class="w-4 h-4" />
					<span class="hidden sm:inline">Challenges</span>
				</TabsTrigger>
			</TabsList>

			<!-- Home Feed -->
			<TabsContent value="home" class="space-y-8">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<!-- Main Feed -->
					<div class="lg:col-span-2 space-y-6">
						<Card class="military-card">
							<CardHeader>
								<CardTitle class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
										<Activity class="w-5 h-5 text-primary" />
										<span>Today's Highlights</span>
									</div>
									<Button variant="outline" size="sm">
										<Plus class="w-4 h-4 mr-2" />
										New Post
									</Button>
								</CardTitle>
							</CardHeader>
							<CardContent class="space-y-4">
								{#each samplePosts as post}
									<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
										<CardHeader class="pb-3">
											<div class="flex items-start justify-between">
												<div class="flex items-start space-x-3">
													<div class="w-10 h-10 bg-primary/20 text-primary font-semibold text-sm rounded-full flex items-center justify-center">
														{post.author.slice(0, 2).toUpperCase()}
													</div>
													<div class="flex-1">
														<div class="flex items-center space-x-2 mb-1">
															<span class="font-semibold">{post.author}</span>
															<Badge class="{post.authorLevel === 'S-Tier' ? 'bg-purple-500/10 text-purple-500' :
																post.authorLevel === 'A-Tier' ? 'bg-primary/10 text-primary' :
																'bg-secondary/10 text-secondary'}">
																{post.authorLevel}
															</Badge>
															<span class="text-xs text-muted-foreground">{post.timestamp}</span>
														</div>
														<h3 class="font-semibold text-sm leading-tight">{post.title}</h3>
													</div>
												</div>
												<div class="flex items-center space-x-1">
													{#if post.isQualityVerified}
														<CheckCircle class="w-4 h-4 text-primary" title="Quality Verified" />
													{/if}
													{#if post.isWikiCandidate}
														<BookOpen class="w-4 h-4 text-secondary" title="Wiki Candidate" />
													{/if}
													{#if post.hasImage}
														<Image class="w-4 h-4 text-muted-foreground" title="Has Image" />
													{/if}
												</div>
											</div>
										</CardHeader>
										<CardContent class="pt-0">
											<p class="text-sm text-foreground/80 mb-3">{post.content}</p>
											
											<!-- Trade-specific info -->
											{#if post.type === 'trade-idea' && post.asset}
												<div class="flex items-center space-x-4 mb-3 text-xs">
													<Badge variant="outline" class="text-xs">{post.asset}</Badge>
													<Badge class="text-xs {post.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}">
														{post.direction.toUpperCase()}
													</Badge>
													<span class="text-muted-foreground">{post.timeframe}</span>
												</div>
											{/if}

											<!-- Tags -->
											<div class="flex flex-wrap gap-1 mb-3">
												{#each post.tags.slice(0, 3) as tag}
													<Badge variant="outline" class="text-xs">
														#{tag}
													</Badge>
												{/each}
												{#if post.tags.length > 3}
													<span class="text-xs text-muted-foreground">+{post.tags.length - 3} more</span>
												{/if}
											</div>

											<!-- Engagement stats -->
											<div class="flex items-center justify-between text-xs text-muted-foreground">
												<div class="flex items-center space-x-4">
													<div class="flex items-center space-x-1">
														<ThumbsUp class="w-3 h-3" />
														<span>{post.likes}</span>
													</div>
													<div class="flex items-center space-x-1">
														<MessageCircle class="w-3 h-3" />
														<span>{post.replies}</span>
													</div>
													<div class="flex items-center space-x-1">
														<Eye class="w-3 h-3" />
														<span>{post.views}</span>
													</div>
												</div>
												<Button variant="ghost" size="sm" class="h-6 px-2 text-xs">
													View Thread
													<ArrowRight class="w-3 h-3 ml-1" />
												</Button>
											</div>
										</CardContent>
									</Card>
								{/each}
							</CardContent>
						</Card>
					</div>

					<!-- Sidebar -->
					<div class="space-y-6">
						<!-- Quick Stats -->
						<Card class="military-card">
							<CardHeader>
								<CardTitle class="text-lg">Community Pulse</CardTitle>
							</CardHeader>
							<CardContent class="space-y-4">
								<div class="flex justify-between">
									<span class="text-sm text-muted-foreground">Active Members:</span>
									<span class="font-semibold text-secondary">1,247</span>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-muted-foreground">Posts Today:</span>
									<span class="font-semibold text-primary">89</span>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-muted-foreground">Live Events:</span>
									<span class="font-semibold text-secondary">3</span>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-muted-foreground">Unanswered:</span>
									<span class="font-semibold text-orange-500">12</span>
								</div>
							</CardContent>
						</Card>

						<!-- Trending Topics -->
						<Card class="military-card">
							<CardHeader>
								<CardTitle class="text-lg flex items-center space-x-2">
									<TrendingUp class="w-4 h-4 text-primary" />
									<span>Trending Topics</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div class="space-y-3">
									{#each ['#gold-breakout', '#fed-pivot', '#london-session', '#risk-management', '#psychology'] as tag}
										<div class="flex items-center justify-between p-2 bg-muted/10 rounded hover:bg-muted/20 cursor-pointer">
											<span class="text-sm font-medium">{tag}</span>
											<Badge variant="outline" class="text-xs">
												{Math.floor(Math.random() * 50) + 10}
											</Badge>
										</div>
									{/each}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</TabsContent>

			<!-- Forums -->
			<TabsContent value="forums" class="space-y-6">
				<div class="flex items-center justify-between">
					<h3 class="text-2xl font-bold">Discussion Forums</h3>
					<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
						<Plus class="w-4 h-4 mr-2" />
						New Thread
					</Button>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each forums as forum}
						<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
							<CardHeader>
								<div class="flex items-center space-x-3">
									<div class="bg-muted/20 p-3 rounded-xl">
										<svelte:component this={forum.icon} class="w-6 h-6 {forum.color}" />
									</div>
									<div>
										<CardTitle class="text-lg">{forum.name}</CardTitle>
										<p class="text-sm text-muted-foreground">{forum.posts} posts</p>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div class="space-y-3">
									<div class="text-sm text-muted-foreground">
										Latest: "XAUUSD breakout analysis" • 2h ago
									</div>
									<div class="flex items-center justify-between">
										<div class="flex items-center space-x-2">
											<div class="flex -space-x-2">
												{#each [1, 2, 3] as i}
													<div class="w-6 h-6 border-2 border-background bg-primary/20 text-primary text-xs rounded-full flex items-center justify-center">
														{String.fromCharCode(65 + i)}
													</div>
												{/each}
											</div>
											<span class="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5} active</span>
										</div>
										<ChevronRight class="w-4 h-4 text-muted-foreground" />
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</TabsContent>

			<!-- Other tabs with placeholder content -->
			<TabsContent value="trades" class="space-y-6">
				<h3 class="text-2xl font-bold">Trade Gallery</h3>
				<div class="text-center py-12">
					<Camera class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
					<p class="text-muted-foreground">Trade gallery coming soon</p>
				</div>
			</TabsContent>

			<TabsContent value="squads" class="space-y-6">
				<h3 class="text-2xl font-bold">Squads & Accountability</h3>
				<div class="text-center py-12">
					<Shield class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
					<p class="text-muted-foreground">Squad system coming soon</p>
				</div>
			</TabsContent>

			<TabsContent value="events" class="space-y-6">
				<h3 class="text-2xl font-bold">Events & AMAs</h3>
				<div class="text-center py-12">
					<Calendar class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
					<p class="text-muted-foreground">Events calendar coming soon</p>
				</div>
			</TabsContent>

			<TabsContent value="challenges" class="space-y-6">
				<h3 class="text-2xl font-bold">Challenges & Sprints</h3>
				<div class="text-center py-12">
					<Trophy class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
					<p class="text-muted-foreground">Challenge system coming soon</p>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>