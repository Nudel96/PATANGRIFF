<script lang="ts">
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
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
		DollarSign,
		AlertTriangle,
		CheckCircle,
		Flame,
		TrendingDown,
		MapPin,
		Bell,
		Settings,
		HelpCircle,
		Flag,
		Edit,
		Share,
		Bookmark,
		Hash,
		ChevronRight,
		PlayCircle,
		Video,
		Mic,
		Image,
		Link,
		Quote,
		Plus,
		Eye,
		ThumbsUp,
		Clock
	} from 'lucide-svelte';

	let activeTab = 'home';
	let selectedForum = 'all';
	let searchTerm = '';
	let filterAsset = 'all';
	let filterType = 'all';

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
			type: 'trade-recap',
			title: 'EURUSD Short Recap - Stopped Out',
			author: 'FXAnalyst',
			authorLevel: 'B-Tier',
			timestamp: '4 hours ago',
			content: 'Got stopped on EUR short. Plan was solid but missed the NFP volatility spike. Key lesson: check calendar before London close entries.',
			asset: 'EURUSD',
			direction: 'short',
			timeframe: '1H',
			setupType: 'retest',
			outcome: 'loss',
			rMultiple: -1,
			tags: ['eurusd', 'lesson-learned', 'news-impact'],
			likes: 18,
			replies: 12,
			views: 89,
			hasImage: true,
			isQualityVerified: true,
			isWikiCandidate: false
		},
		{
			id: '3',
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
		{ id: 'macro', name: 'Macro & Data', icon: TrendingUp, color: 'text-purple-500', posts: 167 },
		{ id: 'strategy', name: 'Strategy & Playbooks', icon: Target, color: 'text-red-500', posts: 298 },
		{ id: 'research', name: 'Backtesting & Research', icon: Activity, color: 'text-indigo-500', posts: 123 },
		{ id: 'mindset', name: 'Mindset & Performance', icon: Brain, color: 'text-pink-500', posts: 345 },
		{ id: 'business', name: 'Business & Career', icon: Building2, color: 'text-orange-500', posts: 156 }
	];

	const challenges = [
		{
			id: '1',
			title: '30-Day Consistency Challenge',
			description: 'Daily trade plans and recaps for 30 days',
			participants: 89,
			daysLeft: 12,
			reward: '500 XP + Badge'
		},
		{
			id: '2',
			title: 'Gold Mastery Sprint',
			description: '2-week focused gold trading with mentor reviews',
			participants: 34,
			daysLeft: 5,
			reward: '300 XP + Gold Badge'
		}
	];

	function renderPostCard(post) {
		return post;
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
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
						<MessageCircle class="w-8 h-8 text-secondary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Discussion Forums</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">8 specialized forums for focused discussions on trading strategies, market analysis, and professional development.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
						<Camera class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Trade Gallery</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Share trade setups, analysis, and results with the community. Learn from others' successes and mistakes.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
						<Shield class="w-8 h-8 text-secondary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Squads & Accountability</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Join small accountability groups for focused development and peer support in your trading journey.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
						<Calendar class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Events & AMAs</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Live sessions, workshops, and Q&A events with expert traders and market analysts.</p>
				</CardContent>
			</Card>
		</div>

		<!-- Sample Posts Preview -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Recent Community Activity</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
							<p class="text-sm text-foreground/80 mb-3 line-clamp-2">{post.content}</p>
							
							<!-- Trade-specific info -->
							{#if post.type === 'trade-idea' || post.type === 'trade-recap'}
								<div class="flex items-center space-x-4 mb-3 text-xs">
									{#if post.asset}
										<Badge variant="outline" class="text-xs">{post.asset}</Badge>
									{/if}
									{#if post.direction}
										<Badge class="text-xs {post.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}">
											{post.direction.toUpperCase()}
										</Badge>
									{/if}
									{#if post.timeframe}
										<span class="text-muted-foreground">{post.timeframe}</span>
									{/if}
									{#if post.rMultiple !== undefined}
										<span class="font-semibold {post.rMultiple > 0 ? 'text-primary' : 'text-destructive'}">
											{post.rMultiple > 0 ? '+' : ''}{post.rMultiple}R
										</span>
									{/if}
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
			</div>
		</div>

		<!-- Forums Overview -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Specialized Discussion Forums</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
		</div>

		<!-- Challenges Section -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Active Challenges</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
				{#each challenges as challenge}
					<Card class="military-card">
						<CardHeader>
							<div class="flex items-center justify-between">
								<CardTitle class="text-lg">{challenge.title}</CardTitle>
								<Badge class="bg-primary/10 text-primary">
									{challenge.daysLeft} days left
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground mb-4">{challenge.description}</p>
							
							<div class="space-y-3">
								<div class="flex justify-between text-sm">
									<span class="text-muted-foreground">Participants:</span>
									<span class="font-medium">{challenge.participants}</span>
								</div>
								<div class="flex justify-between text-sm">
									<span class="text-muted-foreground">Reward:</span>
									<span class="font-medium text-primary">{challenge.reward}</span>
								</div>
								
								<Button class="w-full">Join Challenge</Button>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<div class="military-card max-w-4xl mx-auto">
				<h3 class="text-2xl font-bold mb-4">Ready to Join the Brotherhood?</h3>
				<p class="text-foreground/70 mb-6 leading-relaxed">
					Connect with serious traders who are committed to excellence. Share knowledge, 
					hold each other accountable, and grow together in a community that values 
					discipline and results above all else.
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground">
						Access Community
						<Users class="ml-2 w-5 h-5" />
					</Button>
					<Button variant="outline" size="lg" class="border-secondary/20 hover:bg-secondary/10">
						Learn More
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>