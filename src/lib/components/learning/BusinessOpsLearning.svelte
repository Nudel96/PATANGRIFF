<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Progress } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		Briefcase, 
		CheckCircle, 
		Lock, 
		Play,
		Target,
		Award,
		Clock,
		LogOut,
		Building,
		TrendingUp
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LearningLevel, LearningModule } from '$lib/types/learning';
	import { SAMPLE_BUSINESS_OPS_LEVELS, getModuleTypeColor, getTierColor } from '$lib/types/learning';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	let userXP = 0;
	let selectedLevel: LearningLevel | null = null;
	let selectedModule: LearningModule | null = null;
	let activeTab = 'beginner';

	// Extended sample data for demonstration
	let learningLevels: LearningLevel[] = [
		...SAMPLE_BUSINESS_OPS_LEVELS,
		{
			level: 2,
			title: "Building Your Trading Business Foundation",
			description: "Establish the core infrastructure and systems for professional trading operations",
			tier: "Beginner",
			unlockRequirement: 50,
			completed: false,
			locked: true,
			totalXP: 75,
			modules: [
				{
					id: "2-1",
					title: "Business Structure & Legal Setup",
					description: "Choose the right business entity and understand tax implications",
					type: "lesson",
					xpReward: 50,
					duration: "30 min",
					completed: false,
					locked: false,
					content: "Professional traders often operate as businesses to optimize taxes and liability protection. Consider LLC or Corporation structures depending on your situation. Maintain separate business accounts, track all trading-related expenses, and understand the tax implications of trader vs. investor status. Consult with qualified professionals for your specific circumstances."
				},
				{
					id: "2-2",
					title: "Business Planning Assessment",
					description: "Create your trading business plan and structure",
					type: "assessment",
					xpReward: 25,
					duration: "20 min",
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

	$: beginnerLevels = learningLevels.filter(level => level.tier === 'Beginner');
	$: intermediateLevels = learningLevels.filter(level => level.tier === 'Intermediate');
	$: professionalLevels = learningLevels.filter(level => level.tier === 'Professional');
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
						<div class="bg-primary/10 p-2 rounded-lg">
							<Briefcase class="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Business Operations</h1>
							<p class="text-sm text-foreground/70">Build → Scale → Optimize → Succeed</p>
						</div>
					</div>
				</div>

				<!-- Progress and Actions -->
				<div class="hidden md:flex items-center space-x-4">
					<div class="text-center">
						<div class="text-sm text-muted-foreground">XP Earned</div>
						<div class="font-bold text-primary">{userXP}</div>
					</div>
					<div class="text-center">
						<div class="text-sm text-muted-foreground">Progress</div>
						<div class="font-bold text-secondary">{overallProgress.toFixed(0)}%</div>
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
										class="bg-primary hover:bg-primary/90 text-primary-foreground"
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
								<Building class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
								<h3 class="text-lg font-semibold mb-2">{selectedModule.type.charAt(0).toUpperCase() + selectedModule.type.slice(1)} Content</h3>
								<p class="text-muted-foreground mb-4">
									Interactive {selectedModule.type} content will be implemented here.
								</p>
								<Button 
									class="bg-primary hover:bg-primary/90 text-primary-foreground"
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
									<CheckCircle class="w-12 h-12 text-primary mx-auto mb-2" />
									<div class="text-sm font-semibold text-primary">Completed</div>
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
										class="military-card cursor-pointer hover:border-primary/30 transition-colors {module.locked ? 'opacity-50' : ''}"
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
														<CheckCircle class="w-6 h-6 text-primary" />
													{:else if module.locked}
														<Lock class="w-6 h-6 text-muted-foreground" />
													{:else}
														<Play class="w-6 h-6 text-secondary" />
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
					<div class="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
						<Briefcase class="w-10 h-10 text-primary" />
					</div>
					<h2 class="text-4xl font-bold mb-4">Business Operations Mastery</h2>
					<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
						Transform from individual trader to professional trading business. Learn systems, 
						processes, and strategies that scale beyond personal limitations.
					</p>
					<div class="flex items-center justify-center space-x-8">
						<div class="text-center">
							<div class="text-2xl font-bold text-primary">{userXP}</div>
							<div class="text-sm text-muted-foreground">Total XP</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-secondary">{overallProgress.toFixed(0)}%</div>
							<div class="text-sm text-muted-foreground">Complete</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-primary">{learningLevels.filter(l => l.completed).length}/30</div>
							<div class="text-sm text-muted-foreground">Levels</div>
						</div>
					</div>
					<Progress value={overallProgress} class="w-full max-w-md mx-auto mt-4" />
				</div>

				<!-- Key Business Concepts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Target class="w-12 h-12 text-primary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Strategic Planning</h3>
							<p class="text-sm text-muted-foreground">
								Develop long-term vision and systematic approaches to trading success
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Building class="w-12 h-12 text-secondary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Systems & Processes</h3>
							<p class="text-sm text-muted-foreground">
								Build scalable systems that work consistently without constant oversight
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<TrendingUp class="w-12 h-12 text-primary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Growth & Scaling</h3>
							<p class="text-sm text-muted-foreground">
								Scale your trading operations and build sustainable competitive advantages
							</p>
						</CardContent>
					</Card>
				</div>

				<!-- Learning Tiers -->
				<Tabs bind:value={activeTab} class="space-y-6">
					<TabsList class="grid w-full grid-cols-3 bg-muted/20">
						<TabsTrigger value="beginner">Beginner (1-10)</TabsTrigger>
						<TabsTrigger value="intermediate">Intermediate (11-20)</TabsTrigger>
						<TabsTrigger value="professional">Professional (21-30)</TabsTrigger>
					</TabsList>

					<TabsContent value="beginner">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each beginnerLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors {level.locked ? 'opacity-50' : ''}"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
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
					</TabsContent>

					<TabsContent value="intermediate">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each intermediateLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors {level.locked ? 'opacity-50' : ''}"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
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
					</TabsContent>

					<TabsContent value="professional">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each professionalLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors {level.locked ? 'opacity-50' : ''}"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
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
					</TabsContent>
				</Tabs>
			</div>
		{/if}
	</div>
</div>
