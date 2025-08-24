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
	import { userXP, userLevel } from '$lib/stores/learning';
	import { 
		TrendingUp,
		ArrowLeft,
		LogOut,
		BookOpen,
		Trophy,
		Star,
		Lock,
		CheckCircle,
		PlayCircle,
		Award,
		Coins
	} from 'lucide-svelte';

	let selectedModule = null;

	// Sample learning levels for Trading Mastery
	const learningLevels = [
		{
			level: 1,
			title: "Introduction to Trading & Markets",
			description: "Discover what trading is and explore different financial markets",
			tier: "Beginner",
			unlockRequirement: 0,
			completed: false,
			locked: false,
			totalXP: 50,
			modules: [
				{
					id: "1-1",
					title: "Welcome to Trading",
					description: "Understanding financial markets and how traders profit from price movements",
					type: "lesson",
					xpReward: 30,
					duration: "15 min",
					completed: false,
					locked: false,
					content: "Trading is the art and science of buying and selling financial instruments to profit from price movements..."
				},
				{
					id: "1-2",
					title: "Market Types Quiz",
					description: "Test your understanding of different financial markets",
					type: "quiz",
					xpReward: 20,
					duration: "5 min",
					completed: false,
					locked: false
				}
			]
		},
		{
			level: 2,
			title: "Key Trading Terminology",
			description: "Master essential trading terms and definitions",
			tier: "Beginner",
			unlockRequirement: 50,
			completed: false,
			locked: true,
			totalXP: 75,
			modules: [
				{
					id: "2-1",
					title: "Trading Vocabulary",
					description: "Learn pips, lots, leverage, margin, and order types",
					type: "lesson",
					xpReward: 50,
					duration: "20 min",
					completed: false,
					locked: false
				}
			]
		}
	];

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard/learning');
	}

	function getTierColor(tier) {
		switch (tier) {
			case 'Beginner': return 'bg-green-500';
			case 'Intermediate': return 'bg-blue-500';
			case 'Professional': return 'bg-purple-500';
			default: return 'bg-gray-500';
		}
	}

	function renderLevelCard(level) {
		const completedModules = level.modules.filter(m => m.completed).length;
		const totalModules = level.modules.length;
		const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

		return {
			level,
			completedModules,
			totalModules,
			progress
		};
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
						Back to Learning
					</Button>
					<div class="flex items-center space-x-3">
						<div class="bg-primary/10 p-2 rounded-lg">
							<TrendingUp class="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Trading Mastery</h1>
							<p class="text-sm text-foreground/70">30-Level Professional Development</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-lg">
						<Coins class="w-4 h-4 text-primary" />
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
		{#if selectedModule}
			<!-- Module Content View -->
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-2xl font-bold">{selectedModule.title}</h2>
						<p class="text-muted-foreground">{selectedModule.description}</p>
					</div>
					<div class="flex items-center space-x-4">
						<Badge class="bg-primary/10 text-primary">
							<Coins class="w-3 h-3 mr-1" />
							{selectedModule.xpReward} XP
						</Badge>
						<Badge variant="outline">
							{selectedModule.duration}
						</Badge>
					</div>
				</div>

				<Card class="military-card">
					<CardContent class="p-6">
						{#if selectedModule.type === 'lesson'}
							<div class="space-y-4">
								<div class="prose prose-invert max-w-none">
									<p>{selectedModule.content}</p>
								</div>
								<div class="flex justify-between items-center pt-4 border-t border-border/50">
									<Button variant="outline" on:click={() => selectedModule = null}>
										Back to Level
									</Button>
									<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
										Complete Lesson
										<CheckCircle class="w-4 h-4 ml-2" />
									</Button>
								</div>
							</div>
						{:else if selectedModule.type === 'quiz'}
							<div class="space-y-4">
								<div class="text-center py-8">
									<Trophy class="w-16 h-16 text-primary mx-auto mb-4" />
									<h3 class="text-xl font-semibold mb-2">Quiz Challenge</h3>
									<p class="text-muted-foreground mb-6">Test your knowledge and earn XP!</p>
									<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
										Start Quiz
									</Button>
								</div>
							</div>
						{/if}
					</CardContent>
				</Card>
			</div>
		{:else}
			<!-- Level Overview -->
			<div class="space-y-8">
				<div class="text-center mb-12">
					<h2 class="text-4xl font-bold mb-4">
						Master Trading Through
						<span class="block gradient-text">30 Progressive Levels</span>
					</h2>
					<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
						From complete beginner to professional trader. Each level builds upon the previous, 
						ensuring comprehensive mastery of technical analysis, risk management, psychology, and market fundamentals.
					</p>
				</div>

				<!-- Tier Overview Cards -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					<Card class="military-card">
						<CardHeader>
							<CardTitle class="flex items-center space-x-2">
								<div class="bg-green-500/20 p-2 rounded-lg">
									<BookOpen class="w-5 h-5 text-green-500" />
								</div>
								<span>Beginner Tier</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="text-2xl font-bold text-green-500">Levels 1-10</div>
								<p class="text-sm text-muted-foreground">
									Foundation concepts, basic terminology, chart reading, and introduction to trading psychology.
								</p>
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<span>Progress</span>
										<span>10%</span>
									</div>
									<Progress value={10} class="h-2" />
								</div>
								<div class="text-sm text-muted-foreground">
									Total XP Available: 575
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardHeader>
							<CardTitle class="flex items-center space-x-2">
								<div class="bg-blue-500/20 p-2 rounded-lg">
									<Target class="w-5 h-5 text-blue-500" />
								</div>
								<span>Intermediate Tier</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="text-2xl font-bold text-blue-500">Levels 11-20</div>
								<p class="text-sm text-muted-foreground">
									Advanced strategies, risk management, macroeconomics, and cognitive bias training.
								</p>
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<span>Progress</span>
										<span>0%</span>
									</div>
									<Progress value={0} class="h-2" />
								</div>
								<div class="text-sm text-muted-foreground">
									Total XP Available: 760
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardHeader>
							<CardTitle class="flex items-center space-x-2">
								<div class="bg-purple-500/20 p-2 rounded-lg">
									<Trophy class="w-5 h-5 text-purple-500" />
								</div>
								<span>Professional Tier</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="text-2xl font-bold text-purple-500">Levels 21-30</div>
								<p class="text-sm text-muted-foreground">
									Master-level concepts, institutional analysis, and complete psychological mastery.
								</p>
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<span>Progress</span>
										<span>0%</span>
									</div>
									<Progress value={0} class="h-2" />
								</div>
								<div class="text-sm text-muted-foreground">
									Total XP Available: 850
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<!-- Level Cards -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each learningLevels as level}
						{@const levelData = renderLevelCard(level)}
						<Card class="military-card cursor-pointer transition-all duration-300 {level.locked ? 'opacity-50' : 'hover:border-primary/30'}">
							<CardHeader class="pb-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-3">
										<div class="w-12 h-12 rounded-xl flex items-center justify-center {level.locked ? 'bg-muted' : level.completed ? 'bg-primary/20' : 'bg-secondary/20'}">
											{#if level.locked}
												<Lock class="w-6 h-6 text-muted-foreground" />
											{:else if level.completed}
												<CheckCircle class="w-6 h-6 text-primary" />
											{:else}
												<BookOpen class="w-6 h-6 text-secondary" />
											{/if}
										</div>
										<div>
											<CardTitle class="text-lg">Level {level.level}</CardTitle>
											<Badge class="{getTierColor(level.tier)} text-white text-xs">
												{level.tier}
											</Badge>
										</div>
									</div>
									<div class="text-right">
										<div class="flex items-center space-x-1 text-primary">
											<Coins class="w-4 h-4" />
											<span class="font-bold">{level.totalXP} XP</span>
										</div>
										{#if level.unlockRequirement > 0}
											<div class="text-xs text-muted-foreground">
												Requires {level.unlockRequirement} XP
											</div>
										{/if}
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<h3 class="font-semibold mb-2">{level.title}</h3>
								<p class="text-sm text-muted-foreground mb-4">{level.description}</p>
								
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<span>Progress</span>
										<span>{levelData.completedModules}/{levelData.totalModules} modules</span>
									</div>
									<Progress value={levelData.progress} class="h-2" />
								</div>

								<div class="mt-4 flex items-center justify-between">
									<div class="text-xs text-muted-foreground">
										{level.modules.length} module{level.modules.length !== 1 ? 's' : ''}
									</div>
									{#if !level.locked}
										<Button size="sm" variant="outline" on:click={() => selectedModule = level.modules[0]}>
											{level.completed ? 'Review' : 'Start'}
										</Button>
									{/if}
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>