<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		Brain, 
		CheckCircle, 
		Lock, 
		Play,
		Heart,
		Award,
		Clock,
		LogOut,
		Target,
		Shield
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LearningLevel, LearningModule } from '$lib/types/learning';
	import { SAMPLE_PSYCHOLOGY_LEVELS, getModuleTypeColor, getTierColor } from '$lib/types/learning';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	let userXP = 0;
	let selectedLevel: LearningLevel | null = null;
	let selectedModule: LearningModule | null = null;

	// Extended sample data for demonstration
	let learningLevels: LearningLevel[] = [
		...SAMPLE_PSYCHOLOGY_LEVELS,
		{
			level: 3,
			title: "Cognitive Biases in Trading",
			description: "Recognize and overcome common psychological traps that sabotage trading performance",
			tier: "Beginner",
			unlockRequirement: 110,
			completed: false,
			locked: true,
			totalXP: 70,
			modules: [
				{
					id: "3-1",
					title: "Confirmation Bias & Anchoring",
					description: "Learn how these biases distort market analysis and decision-making",
					type: "lesson",
					xpReward: 50,
					duration: "30 min",
					completed: false,
					locked: false,
					content: "Confirmation bias leads traders to seek information that confirms their existing beliefs while ignoring contradictory evidence. Anchoring bias causes traders to rely too heavily on the first piece of information encountered. Both biases can prevent objective market analysis and lead to poor trading decisions. Combat these by actively seeking opposing viewpoints and regularly questioning your assumptions."
				},
				{
					id: "3-2",
					title: "Bias Recognition Exercise",
					description: "Practice identifying biases in real trading scenarios",
					type: "assessment",
					xpReward: 20,
					duration: "15 min",
					completed: false,
					locked: false
				}
			]
		},
		{
			level: 12,
			title: "Advanced Emotional Regulation",
			description: "Master sophisticated techniques for maintaining emotional equilibrium during volatile markets",
			tier: "Intermediate",
			unlockRequirement: 600,
			completed: false,
			locked: true,
			totalXP: 120,
			modules: [
				{
					id: "12-1",
					title: "Stress Inoculation Training",
					description: "Build resilience through controlled exposure to trading stress",
					type: "lesson",
					xpReward: 80,
					duration: "45 min",
					completed: false,
					locked: false,
					content: "Stress inoculation training involves gradually exposing yourself to controlled trading stress to build psychological resilience. Start with small position sizes during volatile periods, practice breathing techniques during drawdowns, and develop pre-planned responses to various market scenarios. This builds confidence and reduces emotional reactivity during high-pressure situations."
				},
				{
					id: "12-2",
					title: "Emotional Regulation Challenge",
					description: "Apply regulation techniques in simulated high-stress scenarios",
					type: "challenge",
					xpReward: 40,
					duration: "30 min",
					completed: false,
					locked: false
				}
			]
		},
		{
			level: 25,
			title: "Peak Performance Psychology",
			description: "Achieve and maintain optimal psychological states for consistent trading excellence",
			tier: "Professional",
			unlockRequirement: 1500,
			completed: false,
			locked: true,
			totalXP: 200,
			modules: [
				{
					id: "25-1",
					title: "Flow State Mastery",
					description: "Enter and maintain peak performance states consistently",
					type: "lesson",
					xpReward: 150,
					duration: "60 min",
					completed: false,
					locked: false,
					content: "Flow state is characterized by complete absorption in trading activities, optimal performance, and effortless concentration. Achieve flow through: clear goals, immediate feedback, balance between challenge and skill, elimination of distractions, and deep focus on the present moment. Professional traders cultivate flow states through consistent routines, optimal challenge levels, and mindfulness practices."
				},
				{
					id: "25-2",
					title: "Performance Optimization Project",
					description: "Design your personal peak performance protocol",
					type: "project",
					xpReward: 50,
					duration: "90 min",
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
		// Update module completion status
		learningLevels = learningLevels.map(level => ({
			...level,
			modules: level.modules.map(module => 
				module.id === moduleId ? { ...module, completed: true } : module
			)
		}));
		
		// Check if level is complete
		if (selectedLevel) {
			const allModulesComplete = selectedLevel.modules.every(m => m.completed || m.id === moduleId);
			if (allModulesComplete) {
				learningLevels = learningLevels.map(level => 
					level.level === selectedLevel!.level ? { ...level, completed: true } : level
				);
			}
		}
		
		// Update level locks based on new XP
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
							<Brain class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Trading Psychology</h1>
							<p class="text-sm text-foreground/70">Master Your Mind → Master the Markets</p>
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
								<Heart class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
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
						<Brain class="w-10 h-10 text-secondary" />
					</div>
					<h2 class="text-4xl font-bold mb-4">Trading Psychology Mastery</h2>
					<p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
						Develop unshakeable mental discipline and emotional control. Master the psychological skills 
						that separate consistently profitable traders from the 90% who fail.
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

				<!-- Key Psychology Concepts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Heart class="w-12 h-12 text-secondary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Emotional Mastery</h3>
							<p class="text-sm text-muted-foreground">
								Control fear, greed, hope, and regret to make rational trading decisions
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Target class="w-12 h-12 text-primary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Mental Discipline</h3>
							<p class="text-sm text-muted-foreground">
								Develop unwavering focus and consistency in following your trading plan
							</p>
						</CardContent>
					</Card>
					<Card class="military-card">
						<CardContent class="p-6 text-center">
							<Shield class="w-12 h-12 text-secondary mx-auto mb-4" />
							<h3 class="font-bold mb-2">Resilience Building</h3>
							<p class="text-sm text-muted-foreground">
								Build psychological armor to withstand inevitable losses and drawdowns
							</p>
						</CardContent>
					</Card>
				</div>

				<!-- Learning Levels -->
				<div class="space-y-6">
					<h3 class="text-2xl font-bold text-center">Psychology Learning Path</h3>
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
