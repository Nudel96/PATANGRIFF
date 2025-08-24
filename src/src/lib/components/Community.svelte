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
				Elite Trading Community
			</Badge>
			
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				Connect, Learn, and Grow with
				<span class="block gradient-text">Elite Trading Professionals</span>
			</h2>
			
			<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
				Join a community of serious traders who are committed to excellence. Access expert mentorship, 
				collaborate with peers, and accelerate your trading journey through structured learning and accountability.
			</p>
		</div>

		<!-- Core Community Features -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
						<Users class="w-8 h-8 text-secondary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Expert-Led Mentorship</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Connect directly with experienced traders who provide personalized guidance, strategy reviews, and real-time market insights to accelerate your learning.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
						<Shield class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Focused Learning Squads</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Join small, focused groups of 6-12 traders working together on specific skills. Get accountability, peer feedback, and collaborative learning experiences.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
						<MessageCircle class="w-8 h-8 text-secondary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Specialized Discussion Areas</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Engage in focused discussions on market analysis, trading psychology, risk management, and business development with like-minded professionals.</p>
				</CardContent>
			</Card>

			<Card class="military-card text-center group">
				<CardContent class="p-6">
					<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
						<TrendingUp class="w-8 h-8 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Live Market Sessions</h3>
					<p class="text-sm text-foreground/70 leading-relaxed">Participate in live trading sessions, market analysis workshops, and Q&A events with professional traders and industry experts.</p>
				</CardContent>
			</Card>
		</div>

		<!-- Community Value Proposition -->
		<div class="mb-16">
			<div class="military-card max-w-4xl mx-auto">
				<h3 class="text-2xl font-bold text-center mb-6">Why Traders Choose Our Community</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h4 class="text-lg font-semibold text-primary mb-3">Expert Mentorship Network</h4>
						<p class="text-foreground/80 mb-4">
							Connect with verified professional traders who share their strategies, review your trades, 
							and provide personalized guidance. Our mentors have proven track records and are committed 
							to helping you develop systematic trading skills.
						</p>
						<ul class="space-y-2 text-sm text-foreground/70">
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-primary" />
								<span>1-on-1 strategy reviews and feedback</span>
							</li>
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-primary" />
								<span>Real-time market analysis and insights</span>
							</li>
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-primary" />
								<span>Personalized learning path recommendations</span>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="text-lg font-semibold text-secondary mb-3">Collaborative Learning Squads</h4>
						<p class="text-foreground/80 mb-4">
							Join small, focused groups of 6-12 traders working together on specific skills like risk management, 
							technical analysis, or trading psychology. Experience accelerated learning through peer accountability 
							and collaborative problem-solving.
						</p>
						<ul class="space-y-2 text-sm text-foreground/70">
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-secondary" />
								<span>Weekly group sessions and trade reviews</span>
							</li>
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-secondary" />
								<span>Peer accountability and goal tracking</span>
							</li>
							<li class="flex items-center space-x-2">
								<CheckCircle class="w-4 h-4 text-secondary" />
								<span>Collaborative projects and challenges</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Specialized Learning Areas -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-8">Specialized Knowledge Exchange</h3>
			<p class="text-center text-foreground/70 mb-8 max-w-3xl mx-auto">
				Access focused discussion areas where traders share insights, analyze markets, and collaborate on 
				specific aspects of trading and business development.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each [
					{ name: 'Market Analysis Hub', icon: BarChart3, color: 'text-green-500', description: 'Daily market breakdowns and technical analysis' },
					{ name: 'Strategy Development', icon: Target, color: 'text-blue-500', description: 'Trading system creation and optimization' },
					{ name: 'Risk Management', icon: Shield, color: 'text-purple-500', description: 'Capital preservation and position sizing' },
					{ name: 'Trading Psychology', icon: Brain, color: 'text-pink-500', description: 'Mental conditioning and discipline building' }
				] as area}
					<Card class="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
						<CardHeader>
							<div class="flex items-center space-x-3">
								<div class="bg-muted/20 p-3 rounded-xl">
									<svelte:component this={area.icon} class="w-6 h-6 {area.color}" />
								</div>
								<div>
									<CardTitle class="text-lg">{area.name}</CardTitle>
									<p class="text-sm text-muted-foreground">Active discussions</p>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-foreground/70 mb-4">{area.description}</p>
							<div class="flex items-center justify-between">
								<div class="flex -space-x-2">
									{#each [1, 2, 3] as i}
										<div class="w-6 h-6 border-2 border-background bg-primary/20 text-primary text-xs rounded-full flex items-center justify-center">
											{String.fromCharCode(65 + i)}
										</div>
									{/each}
								</div>
								<span class="text-xs text-muted-foreground">Expert-moderated</span>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Community Benefits -->
		<div class="mb-16">
			<div class="military-card max-w-5xl mx-auto">
				<h3 class="text-2xl font-bold text-center mb-8">Transform Your Trading Through Community</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="text-center">
						<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Users class="w-8 h-8 text-primary" />
						</div>
						<h4 class="font-bold text-primary mb-3">Peer Learning Network</h4>
						<p class="text-sm text-foreground/70">
							Learn faster through collaboration with traders at your skill level. Share experiences, 
							get feedback on your trades, and discover new strategies through peer interaction.
						</p>
					</div>
					<div class="text-center">
						<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Target class="w-8 h-8 text-secondary" />
						</div>
						<h4 class="font-bold text-secondary mb-3">Accountability Partners</h4>
						<p class="text-sm text-foreground/70">
							Stay committed to your trading goals with accountability partners who track your progress, 
							celebrate your wins, and help you learn from setbacks.
						</p>
					</div>
					<div class="text-center">
						<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Award class="w-8 h-8 text-primary" />
						</div>
						<h4 class="font-bold text-primary mb-3">Professional Growth</h4>
						<p class="text-sm text-foreground/70">
							Build lasting professional relationships, expand your network, and access opportunities 
							for career advancement in the trading and finance industry.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<div class="military-card max-w-4xl mx-auto">
				<h3 class="text-2xl font-bold mb-4">Ready to Accelerate Your Trading Success?</h3>
				<p class="text-foreground/70 mb-6 leading-relaxed">
					Join a community of dedicated traders who are serious about improving their skills and achieving 
					consistent profitability. Get the mentorship, accountability, and collaborative learning environment 
					you need to reach the next level in your trading career.
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground">
						Join Our Community
						<Users class="ml-2 w-5 h-5" />
					</Button>
					<Button variant="outline" size="lg" class="border-secondary/20 hover:bg-secondary/10">
						Explore Features
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>