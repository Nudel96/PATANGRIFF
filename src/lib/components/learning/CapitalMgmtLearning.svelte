<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		Shield, 
		CheckCircle, 
		Lock, 
		Play,
		DollarSign,
		Award,
		Clock,
		LogOut,
		TrendingDown,
		Target
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LearningLevel, LearningModule } from '$lib/types/learning';
	import { SAMPLE_CAPITAL_MGMT_LEVELS, getModuleTypeColor, getTierColor } from '$lib/types/learning';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	let userXP = 0;
	let selectedLevel: LearningLevel | null = null;
	let selectedModule: LearningModule | null = null;

	// Extended sample data for demonstration
	let learningLevels: LearningLevel[] = [
		...SAMPLE_CAPITAL_MGMT_LEVELS,
		{
			level: 2,
			title: "Risk Assessment & Position Sizing",
			description: "Learn to calculate appropriate position sizes based on account risk and trade setup",
			tier: "Beginner",
			unlockRequirement: 50,
			completed: false,
			locked: true,
			totalXP: 80,
			modules: [
				{
					id: "2-1",
					title: "The 1% Rule & Position Sizing",
					description: "Master the fundamental rule of never risking more than 1% per trade",
					type: "lesson",
					xpReward: 60,
					duration: "25 min",
					completed: false,
					locked: false,
					content: "The 1% rule is the foundation of capital preservation. Never risk more than 1% of your account on any single trade. Calculate position size using: Position Size = (Account Risk ÷ Trade Risk) × Account Balance. For example: $10,000 account × 1% = $100 risk. If your stop loss is 50 pips on EUR/USD, your position size should be 2,000 units (0.02 lots). This ensures you can survive 100 consecutive losses."
				},
				{
					id: "2-2",
					title: "Position Sizing Calculator",
					description: "Practice calculating position sizes for different scenarios",
					type: "assessment",
					xpReward: 20,
					duration: "15 min",
					completed: false,
					locked: false
				}
			]
		}
	];

	function handleBack() {
		dispatch('back');
	}

	function handleLogout() {
		dispatch('logout');
	}

	function selectLevel(level: LearningLevel) {
		if (!level.locked) {
			selectedLevel = level;
			selectedModule = null;
		}
	}

	function selectModule(module: LearningModule) {
		if (!module.locked) {
			selectedModule = module;
		}
	}

	function completeModule(moduleId: string, xpReward: number) {
		userXP += xpReward;
		learningLevels = learningLevels.map(level => ({
			...level,
			modules: level.modules.map(module => 
				module.id === moduleId ? { ...module, completed: true } : module
			)
		}));
		
		if (selectedLevel) {
			const allModulesComplete = selectedLevel.modules.every(m => m.completed || m.id === moduleId);
			if (allModulesComplete) {
				learningLevels = learningLevels.map(level => 
					level.level === selectedLevel!.level ? { ...level, completed: true } : level
				);
			}
		}
		
		learningLevels = learningLevels.map(level => ({
			...level,
			locked: userXP < level.unlockRequirement
		}));
		
		selectedModule = null;
	}

	function backToLevels() {
		selectedLevel = null;
		selectedModule = null;
	}

	function backToLevel() {
		selectedModule = null;
	}

	$: overallProgress = (learningLevels.filter(level => level.completed).length / learningLevels.length) * 100;
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
							<Shield class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Capital Management</h1>
							<p class="text-sm text-foreground/70">Preserve → Protect → Profit → Prosper</p>
						</div>
					</div>
				</div>

				<!-- Progress and Actions -->
				<div class="hidden md:flex items-center space-x-4">
					<div class="text-center">
						<div class="text-sm text-muted-foreground">XP Earned</div>
						<div class="font-bold text-secondary">{userXP}</div>
					</div>
					<div class="text-center">
						<div class="text-sm text-muted-foreground">Progress</div>
						<div class="font-bold text-primary">{overallProgress.toFixed(0)}%</div>
					</div>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		{#if selectedModule}
			<!-- Module Content View -->
			<div class="space-y-6">
				<Button variant="ghost" on:click={backToLevel}>
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to Level {selectedLevel?.level}
				</Button>

				<Card class="military-card">
					<CardHeader>
						<div class="flex items-center justify-between">
							<div>
								<CardTitle class="text-2xl mb-2">{selectedModule.title}</CardTitle>
								<p class="text-muted-foreground">{selectedModule.description}</p>
							</div>
							<div class="flex items-center space-x-2">
								<Badge class={getModuleTypeColor(selectedModule.type)}>
									{selectedModule.type}
								</Badge>
								<Badge variant="outline">
									<Clock class="w-3 h-3 mr-1" />
									{selectedModule.duration}
								</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{#if selectedModule.type === 'lesson'}
							<div class="space-y-4">
								<div class="prose prose-invert max-w-none">
									<p class="text-lg leading-relaxed">{selectedModule.content}</p>
								</div>
								<div class="flex justify-between items-center pt-4 border-t border-border/50">
									<Button variant="outline" on:click={backToLevel}>
										Back to Level
									</Button>
									<Button 
										class="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
										on:click={() => completeModule(selectedModule!.id, selectedModule!.xpReward)}
										disabled={selectedModule.completed}
									>
										{selectedModule.completed ? 'Completed' : 'Complete Lesson'}
										<CheckCircle class="w-4 h-4 ml-2" />
									</Button>
								</div>
							</div>
						{:else}
							<div class="text-center py-12">
								<DollarSign class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
								<h3 class="text-lg font-semibold mb-2">{selectedModule.type.charAt(0).toUpperCase() + selectedModule.type.slice(1)} Content</h3>
								<p class="text-muted-foreground mb-4">
									Interactive {selectedModule.type} content will be implemented here.
								</p>
								<Button 
									class="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
									on:click={() => completeModule(selectedModule!.id, selectedModule!.xpReward)}
									disabled={selectedModule.completed}
								>
									{selectedModule.completed ? 'Completed' : `Complete ${selectedModule.type}`}
									<CheckCircle class="w-4 h-4 ml-2" />
								</Button>
							</div>
						{/if}
					</CardContent>
				</Card>
			</div>
		{:else if selectedLevel}
			<!-- Level Detail View -->
			<div class="space-y-6">
				<Button variant="ghost" on:click={backToLevels}>
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to All Levels
				</Button>

				<Card class="military-card">
					<CardHeader>
						<div class="flex items-center justify-between">
							<div>
								<CardTitle class="text-2xl mb-2">Level {selectedLevel.level}: {selectedLevel.title}</CardTitle>
								<p class="text-muted-foreground mb-4">{selectedLevel.description}</p>
								<div class="flex items-center space-x-2">
									<Badge class={getTierColor(selectedLevel.tier)}>
										{selectedLevel.tier}
									</Badge>
									<Badge variant="outline">
										<Award class="w-3 h-3 mr-1" />
										{selectedLevel.totalXP} XP
									</Badge>
								</div>
							</div>
							{#if selectedLevel.completed}
								<div class="text-center">
									<CheckCircle class="w-12 h-12 text-secondary mx-auto mb-2" />
									<div class="text-sm font-semibold text-secondary">Completed</div>
								</div>
							{/if}
						</div>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Learning Modules</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								{#each selectedLevel.modules as module}
									<Card 
										class="military-card cursor-pointer hover:border-secondary/30 transition-colors {module.locked ? 'opacity-50' : ''}"
										on:click={() => selectModule(module)}
									>
										<CardContent class="p-4">
											<div class="flex items-start justify-between mb-2">
												<div class="flex-1">
													<h4 class="font-semibold mb-1">{module.title}</h4>
													<p class="text-sm text-muted-foreground mb-2">{module.description}</p>
													<div class="flex items-center space-x-2">
														<Badge class="{getModuleTypeColor(module.type)} text-xs">
															{module.type}
														</Badge>
														<Badge variant="outline" class="text-xs">
															<Clock class="w-3 h-3 mr-1" />
															{module.duration}
														</Badge>
														<Badge variant="outline" class="text-xs">
															{module.xpReward} XP
														</Badge>
													</div>
												</div>
												<div class="ml-2">
													{#if module.completed}
														<CheckCircle class="w-6 h-6 text-secondary" />
													{:else if module.locked}
														<Lock class="w-6 h-6 text-muted-foreground" />
													{:else}
														<Play class="w-6 h-6 text-primary" />
													{/if}
												</div>
											</div>
										</CardContent>
									</Card>
								{/each}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		{:else}
			<!-- Levels Overview -->
			<div class="space-y-8">
				<!-- Header -->
				<div class="text-center">
					<div class="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
						<Shield class="w-10 h-10 text-secondary" />
					</div>
					<h2 class="text-4xl font-bold mb-4">Capital Management Mastery</h2>
					<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
						Master the art of capital preservation and systematic risk management. Learn the 
						mathematical foundations that separate professional traders from gamblers.
					</p>
					<div class="flex items-center justify-center space-x-8">
						<div class="text-center">
							<div class="text-2xl font-bold text-secondary">{userXP}</div>
							<div class="text-sm text-muted-foreground">Total XP</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-primary">{overallProgress.toFixed(0)}%</div>
							<div class="text-sm text-muted-foreground">Complete</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-secondary">{learningLevels.filter(l => l.completed).length}/30</div>
							<div class="text-sm text-muted-foreground">Levels</div>
						</div>
					</div>
					<Progress value={overallProgress} class="w-full max-w-md mx-auto mt-4" />
				</div>

				<!-- Key Capital Management Concepts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Shield class="w-12 h-12 text-secondary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Capital Preservation</h3>
							<p class="text-sm text-muted-foreground">
								Protect your trading capital through systematic risk management principles
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Target class="w-12 h-12 text-primary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Position Sizing</h3>
							<p class="text-sm text-muted-foreground">
								Calculate optimal position sizes based on account risk and trade setup
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<TrendingDown class="w-12 h-12 text-secondary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Drawdown Management</h3>
							<p class="text-sm text-muted-foreground">
								Survive inevitable losing streaks and recover systematically
							</p>
						</CardContent>
					</Card>
				</div>

				<!-- Learning Levels -->
				<div class="space-y-6">
					<h3 class="text-2xl font-bold text-center">Capital Management Learning Path</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each learningLevels as level}
							<Card 
								class="military-card cursor-pointer hover:border-secondary/30 transition-colors {level.locked ? 'opacity-50' : ''}"
								on:click={() => selectLevel(level)}
							>
								<CardContent class="p-6">
									<div class="flex items-start justify-between mb-4">
										<div class="flex-1">
											<div class="flex items-center space-x-2 mb-2">
												<span class="text-2xl font-bold text-secondary">L{level.level}</span>
												{#if level.completed}
													<CheckCircle class="w-5 h-5 text-secondary" />
												{:else if level.locked}
													<Lock class="w-5 h-5 text-muted-foreground" />
												{/if}
											</div>
											<h3 class="font-semibold mb-2">{level.title}</h3>
											<p class="text-sm text-muted-foreground mb-3">{level.description}</p>
											<div class="flex items-center space-x-2">
												<Badge class="{getTierColor(level.tier)} text-xs">
													{level.tier}
												</Badge>
												<Badge variant="outline" class="text-xs">
													{level.totalXP} XP
												</Badge>
												<Badge variant="outline" class="text-xs">
													{level.modules.length} modules
												</Badge>
											</div>
										</div>
									</div>
									{#if level.unlockRequirement > 0}
										<div class="text-xs text-muted-foreground">
											Requires {level.unlockRequirement} XP
										</div>
									{/if}
								</CardContent>
							</Card>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
