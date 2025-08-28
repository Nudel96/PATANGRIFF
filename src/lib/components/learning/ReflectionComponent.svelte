<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Textarea } from '$lib/components/ui';
	import { CheckCircle, Clock, Award, ArrowLeft, MessageCircle, Lightbulb, Heart, Brain } from 'lucide-svelte';
	import type { ReflectionModule } from '$lib/types/learning';

	export let module: ReflectionModule;
	export let onComplete: (reflection: string, timeSpent: number) => void;
	export let onBack: () => void;

	const dispatch = createEventDispatcher<{
		complete: { reflection: string; timeSpent: number };
		back: void;
	}>();

	// Reflection state
	let reflection = '';
	let startTime = Date.now();
	let showReflection = false;
	let isCompleted = false;
	let timeSpent = 0;
	let currentQuestionIndex = 0;

	// Computed properties
	$: wordCount = reflection.trim().split(/\s+/).filter(word => word.length > 0).length;
	$: canSubmit = wordCount >= module.minWordCount;
	$: reflectionIcon = getReflectionIcon(module.reflectionType);
	$: progressPercentage = Math.min(100, (wordCount / module.minWordCount) * 100);

	function getReflectionIcon(type: string) {
		switch (type) {
			case 'personal': return Heart;
			case 'analytical': return Brain;
			case 'strategic': return Lightbulb;
			default: return MessageCircle;
		}
	}

	function getReflectionTypeLabel(type: string): string {
		switch (type) {
			case 'personal': return 'Personal Reflection';
			case 'analytical': return 'Analytical Reflection';
			case 'strategic': return 'Strategic Reflection';
			default: return 'Reflection';
		}
	}

	function startReflection() {
		showReflection = true;
		startTime = Date.now();
	}

	function submitReflection() {
		if (!canSubmit) return;

		timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
		isCompleted = true;

		// Dispatch completion event
		dispatch('complete', { reflection, timeSpent });
		onComplete(reflection, timeSpent);
	}

	function handleBack() {
		dispatch('back');
		onBack();
	}

	function nextGuidingQuestion() {
		if (currentQuestionIndex < module.guidingQuestions.length - 1) {
			currentQuestionIndex++;
		}
	}

	function previousGuidingQuestion() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
		}
	}

	// Format time display
	function formatTime(minutes: number): string {
		if (minutes < 1) return '< 1 min';
		return `${minutes} min`;
	}

	// Get reflection-specific guidance
	function getReflectionGuidance(type: string): string[] {
		switch (type) {
			case 'personal':
				return [
					'Be honest about your feelings and reactions',
					'Consider your personal experiences and biases',
					'Think about how this applies to your situation',
					'Reflect on what you learned about yourself'
				];
			case 'analytical':
				return [
					'Break down the concepts systematically',
					'Analyze cause and effect relationships',
					'Compare different approaches or strategies',
					'Evaluate the evidence and reasoning'
				];
			case 'strategic':
				return [
					'Think about long-term implications',
					'Consider how to apply this knowledge',
					'Plan specific actions you will take',
					'Anticipate challenges and solutions'
				];
			default:
				return [
					'Think deeply about the topic',
					'Connect to your own experience',
					'Consider multiple perspectives',
					'Draw meaningful conclusions'
				];
		}
	}
</script>

<div class="min-h-screen bg-background p-6">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-6">
			<Button variant="ghost" on:click={handleBack}>
				<ArrowLeft class="w-4 h-4 mr-2" />
				Back to Level
			</Button>
			<div class="flex items-center space-x-4">
				<Badge variant="outline">
					<Clock class="w-3 h-3 mr-1" />
					{module.duration}
				</Badge>
				<Badge variant="outline">
					<Award class="w-3 h-3 mr-1" />
					{module.xpReward} XP
				</Badge>
			</div>
		</div>

		{#if !isCompleted}
			<!-- Reflection Overview -->
			<Card class="military-card mb-6">
				<CardHeader>
					<div class="flex items-center space-x-3 mb-4">
						<div class="bg-primary/10 p-3 rounded-lg">
							<svelte:component this={reflectionIcon} class="w-6 h-6 text-primary" />
						</div>
						<div>
							<CardTitle class="text-xl">{module.title}</CardTitle>
							<p class="text-muted-foreground">{module.description}</p>
						</div>
					</div>
					<div class="flex items-center space-x-2">
						<Badge class="bg-primary/10 text-primary">
							{getReflectionTypeLabel(module.reflectionType)}
						</Badge>
						<Badge variant="outline" class="text-xs">
							{module.minWordCount}+ words required
						</Badge>
					</div>
				</CardHeader>
			</Card>

			<!-- Reflection Prompt -->
			<Card class="military-card mb-6">
				<CardHeader>
					<CardTitle class="text-lg">Reflection Prompt</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="bg-primary/5 p-4 rounded-lg border border-primary/20">
						<p class="text-base leading-relaxed font-medium">{module.prompt}</p>
					</div>

					<!-- Guiding Questions -->
					{#if module.guidingQuestions && module.guidingQuestions.length > 0}
						<div class="mt-6">
							<h4 class="font-semibold mb-3">Guiding Questions to Consider:</h4>
							<div class="space-y-3">
								{#each module.guidingQuestions as question, index}
									<div class="flex items-start space-x-3 p-3 rounded-lg {index === currentQuestionIndex ? 'bg-secondary/10 border border-secondary/20' : 'bg-muted/20'}">
										<div class="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-semibold mt-0.5">
											{index + 1}
										</div>
										<p class="text-sm flex-1">{question}</p>
									</div>
								{/each}
							</div>
							
							{#if module.guidingQuestions.length > 1}
								<div class="flex justify-between mt-4">
									<Button 
										variant="outline" 
										size="sm"
										on:click={previousGuidingQuestion}
										disabled={currentQuestionIndex === 0}
									>
										Previous Question
									</Button>
									<Button 
										variant="outline" 
										size="sm"
										on:click={nextGuidingQuestion}
										disabled={currentQuestionIndex === module.guidingQuestions.length - 1}
									>
										Next Question
									</Button>
								</div>
							{/if}
						</div>
					{/if}

					<!-- Reflection Guidance -->
					<div class="mt-6">
						<h4 class="font-semibold mb-3">Reflection Guidelines:</h4>
						<ul class="space-y-2">
							{#each getReflectionGuidance(module.reflectionType) as guidance}
								<li class="flex items-start space-x-2">
									<Lightbulb class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
									<span class="text-sm">{guidance}</span>
								</li>
							{/each}
						</ul>
					</div>

					{#if !showReflection}
						<div class="pt-4 border-t border-border/50">
							<Button on:click={startReflection} class="bg-primary hover:bg-primary/90">
								Begin Reflection
								<MessageCircle class="w-4 h-4 ml-2" />
							</Button>
						</div>
					{/if}
				</CardContent>
			</Card>

			<!-- Reflection Writing Area -->
			{#if showReflection}
				<Card class="military-card">
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-lg">Your Reflection</CardTitle>
							<div class="flex items-center space-x-4 text-sm">
								<span class="text-muted-foreground">
									{wordCount} / {module.minWordCount} words
								</span>
								<div class="w-24 h-2 bg-muted rounded-full overflow-hidden">
									<div 
										class="h-full bg-primary transition-all duration-300"
										style="width: {progressPercentage}%"
									></div>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent class="space-y-4">
						<Textarea
							bind:value={reflection}
							placeholder="Take your time to reflect thoughtfully on the prompt and guiding questions. Write about your insights, experiences, and how you plan to apply what you've learned..."
							class="min-h-[400px] resize-none"
						/>

						<!-- Writing Tips -->
						<div class="bg-muted/20 p-4 rounded-lg">
							<h5 class="font-semibold mb-2">Reflection Tips:</h5>
							<ul class="text-sm text-muted-foreground space-y-1">
								<li>• Take your time - quality reflection requires thoughtful consideration</li>
								<li>• Be specific with examples from your own experience</li>
								<li>• Consider both what you learned and how you'll apply it</li>
								<li>• Address the guiding questions but don't feel limited by them</li>
								<li>• Be honest and authentic in your responses</li>
							</ul>
						</div>

						<!-- Submit Button -->
						<div class="flex justify-between items-center pt-4 border-t border-border/50">
							<Button variant="outline" on:click={() => showReflection = false}>
								Back to Prompt
							</Button>
							<Button 
								on:click={submitReflection}
								disabled={!canSubmit}
								class="bg-secondary hover:bg-secondary/90"
							>
								Submit Reflection
								<CheckCircle class="w-4 h-4 ml-2" />
							</Button>
						</div>
					</CardContent>
				</Card>
			{/if}
		{:else}
			<!-- Completion Confirmation -->
			<Card class="military-card">
				<CardHeader class="text-center">
					<div class="mb-4">
						<CheckCircle class="w-16 h-16 text-secondary mx-auto mb-4" />
						<CardTitle class="text-2xl text-secondary">Reflection Complete!</CardTitle>
						<p class="text-muted-foreground mt-2">
							Thank you for taking the time to reflect thoughtfully. Your insights are valuable for your learning journey.
						</p>
					</div>
				</CardHeader>
				<CardContent class="text-center space-y-6">
					<!-- Completion Stats -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="text-center">
							<div class="text-3xl font-bold text-secondary">{wordCount}</div>
							<div class="text-sm text-muted-foreground">Words Written</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-primary">{formatTime(timeSpent)}</div>
							<div class="text-sm text-muted-foreground">Time Spent</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-secondary">+{module.xpReward}</div>
							<div class="text-sm text-muted-foreground">XP Earned</div>
						</div>
					</div>

					<!-- XP Reward -->
					<div class="bg-secondary/10 p-4 rounded-lg">
						<div class="flex items-center justify-center space-x-2">
							<Award class="w-5 h-5 text-secondary" />
							<span class="font-semibold">Reflection XP Awarded!</span>
						</div>
						<p class="text-sm text-muted-foreground mt-2">
							Your thoughtful reflection contributes to deeper learning and understanding.
						</p>
					</div>

					<!-- Reflection Preview -->
					<div class="text-left bg-muted/20 p-4 rounded-lg">
						<h4 class="font-semibold mb-2">Your Reflection:</h4>
						<div class="text-sm text-muted-foreground max-h-32 overflow-y-auto">
							{reflection.substring(0, 300)}{reflection.length > 300 ? '...' : ''}
						</div>
					</div>

					<!-- Action Button -->
					<div class="flex justify-center">
						<Button on:click={handleBack} class="bg-primary hover:bg-primary/90">
							Back to Level
						</Button>
					</div>
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
