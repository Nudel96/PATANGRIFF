<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { learningActions, currentPillarProgress, currentLevelProgression, xpNotifications } from '$lib/stores/learning';
	import { PILLAR_IDS } from '$lib/types/learning';
	import { CAPITAL_MANAGEMENT_LEVELS } from '$lib/data/capitalManagement';
	import { Award, RotateCcw, Zap } from 'lucide-svelte';

	let testResults: string[] = [];

	onMount(() => {
		// Initialize the learning system
		learningActions.initialize();
		learningActions.setCurrentPillar(PILLAR_IDS.CAPITAL_MANAGEMENT);
		learningActions.setLevelsForPillar(PILLAR_IDS.CAPITAL_MANAGEMENT, CAPITAL_MANAGEMENT_LEVELS);
		
		addTestResult('✅ Learning system initialized');
	});

	function addTestResult(message: string) {
		testResults = [...testResults, `${new Date().toLocaleTimeString()}: ${message}`];
	}

	function testModuleCompletion() {
		const firstLevel = CAPITAL_MANAGEMENT_LEVELS[0];
		const firstModule = firstLevel.modules[0];
		
		const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, firstModule, {
			score: 95,
			timeSpent: 15
		});
		
		addTestResult(`✅ Completed module "${firstModule.title}"`);
		addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP}`);
		
		if (result.leveledUp) {
			addTestResult(`🎉 Level up! New level: ${result.newLevel}`);
		}
		
		if (result.achievements.length > 0) {
			addTestResult(`🏆 Achievements unlocked: ${result.achievements.length}`);
		}
	}

	function testQuizCompletion() {
		const firstLevel = CAPITAL_MANAGEMENT_LEVELS[0];
		const quizModule = firstLevel.modules.find(m => m.type === 'quiz');
		
		if (quizModule) {
			const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, quizModule, {
				score: 100,
				timeSpent: 8,
				attempts: 1
			});
			
			addTestResult(`✅ Completed quiz "${quizModule.title}" with perfect score`);
			addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP} (includes bonus for perfect score)`);
		}
	}

	function testChallengeCompletion() {
		const firstLevel = CAPITAL_MANAGEMENT_LEVELS[0];
		const challengeModule = firstLevel.modules.find(m => m.type === 'challenge');
		
		if (challengeModule) {
			const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, challengeModule, {
				submissionContent: 'This is a detailed analysis of the portfolio risk factors. I identified concentration risk in technology stocks, insufficient diversification across sectors, and lack of defensive positions. My recommendations include reducing tech allocation from 40% to 25%, adding healthcare and utilities for stability, and implementing a 10% cash buffer for opportunities.',
				timeSpent: 20
			});
			
			addTestResult(`✅ Completed challenge "${challengeModule.title}"`);
			addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP} (includes quality bonus)`);
		}
	}

	function testReflectionCompletion() {
		const firstLevel = CAPITAL_MANAGEMENT_LEVELS[0];
		const reflectionModule = firstLevel.modules.find(m => m.type === 'reflection');

		if (reflectionModule) {
			const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, reflectionModule, {
				submissionContent: 'After completing this level, I realize that my understanding of risk was quite superficial before. I used to think risk was just about losing money, but now I understand it encompasses uncertainty, volatility, and the potential for both gains and losses. The concept of treating capital as a precious resource really resonates with me. In my own investing, I think I have been too casual about position sizing and not systematic enough about risk management. Going forward, I want to implement a formal risk assessment process before making any investment decisions. I also need to be more honest about my risk tolerance versus my risk capacity - they might not be the same thing.',
				timeSpent: 25
			});

			addTestResult(`✅ Completed reflection "${reflectionModule.title}"`);
			addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP} (includes depth bonus)`);
		}
	}

	function testIntermediateLevelAccess() {
		// Test accessing Level 11 (first intermediate level)
		const level11 = CAPITAL_MANAGEMENT_LEVELS.find(l => l.level === 11);
		if (level11) {
			const isUnlocked = learningActions.isLevelUnlocked(PILLAR_IDS.CAPITAL_MANAGEMENT, 11);
			addTestResult(`🔓 Level 11 (Diversification) unlocked: ${isUnlocked}`);
			addTestResult(`📋 Level 11 requires ${level11.unlockRequirement} XP, current: ${progress.totalXP}`);

			if (isUnlocked) {
				const lessonModule = level11.modules.find(m => m.type === 'lesson');
				if (lessonModule) {
					const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, lessonModule);
					addTestResult(`✅ Completed Level 11 lesson: "${lessonModule.title}"`);
					addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP} (Intermediate level bonus!)`);
				}
			}
		}
	}

	function testProfessionalLevelAccess() {
		// Test accessing Level 21 (first professional institutional level)
		const level21 = CAPITAL_MANAGEMENT_LEVELS.find(l => l.level === 21);
		if (level21) {
			const isUnlocked = learningActions.isLevelUnlocked(PILLAR_IDS.CAPITAL_MANAGEMENT, 21);
			addTestResult(`🏛️ Level 21 (Institutional Mindset) unlocked: ${isUnlocked}`);
			addTestResult(`📋 Level 21 requires ${level21.unlockRequirement} XP, current: ${progress.totalXP}`);
			addTestResult(`🎯 Professional tier: 100 XP per level`);

			if (isUnlocked) {
				const lessonModule = level21.modules.find(m => m.type === 'lesson');
				if (lessonModule) {
					const result = learningActions.completeModule(PILLAR_IDS.CAPITAL_MANAGEMENT, lessonModule);
					addTestResult(`✅ Completed Level 21 lesson: "${lessonModule.title}"`);
					addTestResult(`📊 XP earned: ${result.xpCalculation.totalXP} (Professional level!)`);
				}
			}
		}
	}

	function resetProgress() {
		learningActions.resetAllProgress();
		testResults = [];
		addTestResult('🔄 Progress reset - all data cleared');
	}

	$: progress = $currentPillarProgress;
	$: levelProgression = $currentLevelProgression;
	$: notifications = $xpNotifications;
</script>

<div class="min-h-screen bg-background p-6">
	<div class="max-w-6xl mx-auto">
		<div class="mb-8">
			<h1 class="text-3xl font-bold mb-2">XP System Test Page</h1>
			<p class="text-muted-foreground">Test the Capital Management XP system functionality (30 levels: Risk Foundations + Portfolio Management + Institutional Systems)</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Current Progress -->
			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2">
						<Award class="w-5 h-5" />
						<span>Current Progress</span>
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="text-center">
							<div class="text-2xl font-bold text-secondary">{progress.totalXP}</div>
							<div class="text-sm text-muted-foreground">Total XP</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-primary">Level {progress.currentLevel}</div>
							<div class="text-sm text-muted-foreground">Current Level</div>
						</div>
					</div>
					
					<div class="space-y-2">
						<div class="flex justify-between text-sm">
							<span>Progress to next level</span>
							<span>{levelProgression.progressPercentage.toFixed(1)}%</span>
						</div>
						<div class="w-full bg-muted rounded-full h-2">
							<div 
								class="bg-primary h-2 rounded-full transition-all duration-300"
								style="width: {levelProgression.progressPercentage}%"
							></div>
						</div>
						{#if levelProgression.xpToNextLevel > 0}
							<div class="text-xs text-muted-foreground text-center">
								{levelProgression.xpToNextLevel} XP needed for Level {progress.currentLevel + 1}
							</div>
						{/if}
					</div>

					<div class="space-y-2">
						<div class="text-sm font-semibold">Completed Modules:</div>
						<div class="text-xs text-muted-foreground">
							{progress.completedModules.length} modules completed
						</div>
						{#if progress.completedModules.length > 0}
							<div class="flex flex-wrap gap-1">
								{#each progress.completedModules.slice(0, 5) as moduleId}
									<Badge variant="outline" class="text-xs">{moduleId}</Badge>
								{/each}
								{#if progress.completedModules.length > 5}
									<Badge variant="outline" class="text-xs">+{progress.completedModules.length - 5} more</Badge>
								{/if}
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>

			<!-- Test Actions -->
			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2">
						<Zap class="w-5 h-5" />
						<span>Test Actions</span>
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<Button 
						on:click={testModuleCompletion}
						class="w-full bg-primary hover:bg-primary/90"
					>
						Complete Lesson Module
					</Button>
					
					<Button 
						on:click={testQuizCompletion}
						class="w-full bg-secondary hover:bg-secondary/90"
					>
						Complete Quiz (Perfect Score)
					</Button>
					
					<Button 
						on:click={testChallengeCompletion}
						class="w-full bg-primary hover:bg-primary/90"
					>
						Complete Challenge (Quality Submission)
					</Button>
					
					<Button
						on:click={testReflectionCompletion}
						class="w-full bg-secondary hover:bg-secondary/90"
					>
						Complete Reflection (Thoughtful Response)
					</Button>

					<Button
						on:click={testIntermediateLevelAccess}
						class="w-full bg-primary hover:bg-primary/90"
					>
						Test Level 11 Access (Intermediate)
					</Button>

					<Button
						on:click={testProfessionalLevelAccess}
						class="w-full bg-secondary hover:bg-secondary/90"
					>
						Test Level 21 Access (Professional)
					</Button>

					<div class="pt-4 border-t border-border/50">
						<Button 
							on:click={resetProgress}
							variant="destructive"
							class="w-full"
						>
							<RotateCcw class="w-4 h-4 mr-2" />
							Reset All Progress
						</Button>
					</div>
				</CardContent>
			</Card>

			<!-- Notifications -->
			{#if notifications.length > 0}
				<Card class="military-card lg:col-span-2">
					<CardHeader>
						<CardTitle>Recent Notifications ({notifications.length})</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-2 max-h-40 overflow-y-auto">
							{#each notifications.slice(0, 10) as notification}
								<div class="flex items-center space-x-2 p-2 bg-muted/20 rounded">
									<Badge variant="outline" class="text-xs">{notification.type}</Badge>
									<span class="text-sm flex-1">{notification.message}</span>
									<span class="text-xs text-muted-foreground">
										{notification.timestamp.toLocaleTimeString()}
									</span>
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>
			{/if}

			<!-- Test Results -->
			<Card class="military-card lg:col-span-2">
				<CardHeader>
					<CardTitle>Test Results</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-1 max-h-60 overflow-y-auto font-mono text-sm">
						{#each testResults as result}
							<div class="text-muted-foreground">{result}</div>
						{/each}
						{#if testResults.length === 0}
							<div class="text-muted-foreground italic">No tests run yet. Click the buttons above to test the XP system.</div>
						{/if}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
