<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '$lib/components/ui';
	import {
		ArrowLeft,
		CheckCircle,
		Play,
		Award,
		Clock,
		LogOut
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LearningLevel, LearningModule } from '$lib/types/learning';
	import { getModuleTypeColor, getTierColor } from '$lib/types/learning';

	// Props for pillar configuration
	export let pillarConfig: {
		id: string;
		title: string;
		subtitle: string;
		description: string;
		icon: any;
		conceptCards: Array<{
			icon: any;
			title: string;
			description: string;
		}>;
		levels: LearningLevel[];
	};

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	// State management
	let userXP = 0;
	let selectedLevel: LearningLevel | null = null;
	let selectedModule: LearningModule | null = null;
	let activeTab = 'beginner';

	// Use the levels from pillar config
	$: learningLevels = pillarConfig.levels;

	// Navigation functions
	function handleBack() {
		dispatch('back');
	}

	function handleLogout() {
		dispatch('logout');
	}

	function selectLevel(level: LearningLevel) {
		// Remove locking restrictions for frontend-only version
		selectedLevel = level;
		selectedModule = null;
	}

	function selectModule(module: LearningModule) {
		// Remove locking restrictions for frontend-only version
		selectedModule = module;
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
		
		// Unlock next levels (simplified for prototype)
		learningLevels = learningLevels.map(level => ({
			...level,
			locked: false
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

	// Reactive calculations
	$: overallProgress = (learningLevels.filter(level => level.completed).length / learningLevels.length) * 100;
	$: beginnerLevels = learningLevels.filter(level => level.level >= 1 && level.level <= 10);
	$: intermediateLevels = learningLevels.filter(level => level.level >= 11 && level.level <= 20);
	$: professionalLevels = learningLevels.filter(level => level.level >= 21 && level.level <= 30);
</script>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<Button variant="ghost" size="sm" on:click={handleBack}>
						<ArrowLeft class="w-4 h-4 mr-2" />
						Dashboard
					</Button>
					<div class="h-6 w-px bg-border"></div>
					<div class="flex items-center space-x-2">
						<svelte:component this={pillarConfig.icon} class="w-5 h-5 text-primary" />
						<span class="font-semibold">{pillarConfig.title}</span>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2">
						<Award class="w-4 h-4 text-primary" />
						<span class="font-semibold">{userXP} XP</span>
					</div>
					<Button variant="ghost" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto px-4 py-8">
		{#if selectedModule}
			<!-- Module Detail View -->
			<div class="space-y-6">
				<Button variant="ghost" on:click={backToLevel}>
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to Level {selectedLevel?.level}
				</Button>

				<Card class="military-card">
					<CardHeader>
						<CardTitle class="text-2xl">{selectedModule.title}</CardTitle>
						<p class="text-muted-foreground">{selectedModule.description}</p>
						<div class="flex items-center space-x-2">
							<Badge class="{getModuleTypeColor(selectedModule.type)}">
								{selectedModule.type}
							</Badge>
							<Badge variant="outline">
								<Clock class="w-3 h-3 mr-1" />
								{selectedModule.duration}
							</Badge>
							<Badge variant="outline">
								<Award class="w-3 h-3 mr-1" />
								{selectedModule.xpReward} XP
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						{#if selectedModule.content}
							<div class="prose prose-sm max-w-none mb-6">
								<p>{selectedModule.content}</p>
							</div>
							<div class="flex justify-center">
								<Button 
									class="bg-primary hover:bg-primary/90 text-primary-foreground"
									on:click={() => completeModule(selectedModule!.id, selectedModule!.xpReward)}
									disabled={selectedModule.completed}
								>
									{selectedModule.completed ? 'Completed' : 'Complete Lesson'}
									<CheckCircle class="w-4 h-4 ml-2" />
								</Button>
							</div>
						{:else}
							<div class="text-center py-12">
								<svelte:component this={pillarConfig.icon} class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
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
										class="military-card cursor-pointer hover:border-primary/30 transition-colors"
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
						<svelte:component this={pillarConfig.icon} class="w-10 h-10 text-primary" />
					</div>
					<h2 class="text-4xl font-bold mb-4">{pillarConfig.title}</h2>
					<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
						{pillarConfig.description}
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

				<!-- Key Concepts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{#each pillarConfig.conceptCards as concept}
						<Card class="military-card">
							<CardContent class="p-6 text-center">
								<svelte:component this={concept.icon} class="w-12 h-12 text-primary mx-auto mb-4" />
								<h3 class="font-bold mb-2">{concept.title}</h3>
								<p class="text-sm text-muted-foreground">
									{concept.description}
								</p>
							</CardContent>
						</Card>
					{/each}
				</div>

				<!-- Learning Tiers -->
				<div class="space-y-6">
					<!-- Custom Tab Implementation -->
					<div class="grid w-full grid-cols-3 bg-muted/20 rounded-lg p-1">
						<button
							class="px-3 py-2 text-sm font-medium rounded-md transition-colors {activeTab === 'beginner' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
							on:click={() => activeTab = 'beginner'}
						>
							Beginner (1-10)
						</button>
						<button
							class="px-3 py-2 text-sm font-medium rounded-md transition-colors {activeTab === 'intermediate' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
							on:click={() => activeTab = 'intermediate'}
						>
							Intermediate (11-20)
						</button>
						<button
							class="px-3 py-2 text-sm font-medium rounded-md transition-colors {activeTab === 'professional' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
							on:click={() => activeTab = 'professional'}
						>
							Professional (21-30)
						</button>
					</div>

					<!-- Beginner Content -->
					{#if activeTab === 'beginner'}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each beginnerLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
													{/if}
												</div>
												<h3 class="font-semibold mb-2">{level.title}</h3>
												<p class="text-sm text-muted-foreground mb-3">{level.description}</p>
												<div class="flex items-center space-x-2">
													<Badge class="{getTierColor(level.tier)} text-xs">
														{level.tier}
													</Badge>
													<Badge variant="outline" class="text-xs">
														<Award class="w-3 h-3 mr-1" />
														{level.totalXP} XP
													</Badge>
												</div>
											</div>
										</div>
										<Progress value={level.completed ? 100 : 0} class="w-full" />
									</CardContent>
								</Card>
							{/each}
						</div>
				{/if}

				<!-- Intermediate Content -->
				{#if activeTab === 'intermediate'}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each intermediateLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
													{/if}
												</div>
												<h3 class="font-semibold mb-2">{level.title}</h3>
												<p class="text-sm text-muted-foreground mb-3">{level.description}</p>
												<div class="flex items-center space-x-2">
													<Badge class="{getTierColor(level.tier)} text-xs">
														{level.tier}
													</Badge>
													<Badge variant="outline" class="text-xs">
														<Award class="w-3 h-3 mr-1" />
														{level.totalXP} XP
													</Badge>
												</div>
											</div>
										</div>
										<Progress value={level.completed ? 100 : 0} class="w-full" />
									</CardContent>
								</Card>
							{/each}
						</div>
				{/if}

				<!-- Professional Content -->
				{#if activeTab === 'professional'}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each professionalLevels as level}
								<Card
									class="military-card cursor-pointer hover:border-primary/30 transition-colors"
									on:click={() => selectLevel(level)}
								>
									<CardContent class="p-6">
										<div class="flex items-start justify-between mb-4">
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="text-2xl font-bold text-primary">L{level.level}</span>
													{#if level.completed}
														<CheckCircle class="w-5 h-5 text-primary" />
													{/if}
												</div>
												<h3 class="font-semibold mb-2">{level.title}</h3>
												<p class="text-sm text-muted-foreground mb-3">{level.description}</p>
												<div class="flex items-center space-x-2">
													<Badge class="{getTierColor(level.tier)} text-xs">
														{level.tier}
													</Badge>
													<Badge variant="outline" class="text-xs">
														<Award class="w-3 h-3 mr-1" />
														{level.totalXP} XP
													</Badge>
												</div>
											</div>
										</div>
										<Progress value={level.completed ? 100 : 0} class="w-full" />
									</CardContent>
								</Card>
							{/each}
						</div>
				{/if}
			</div>
			</div>
		{/if}
	</main>
</div>
