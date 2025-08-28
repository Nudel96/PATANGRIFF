<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Textarea } from '$lib/components/ui';
	import { CheckCircle, Clock, Award, ArrowLeft, FileText, Calculator, TrendingUp, Target } from 'lucide-svelte';
	import type { ChallengeModule } from '$lib/types/learning';

	export let module: ChallengeModule;
	export let onComplete: (submission: string, timeSpent: number) => void;
	export let onBack: () => void;

	const dispatch = createEventDispatcher<{
		complete: { submission: string; timeSpent: number };
		back: void;
	}>();

	// Challenge state
	let submission = '';
	let startTime = Date.now();
	let showSubmission = false;
	let isCompleted = false;
	let timeSpent = 0;

	// Computed properties
	$: canSubmit = submission.trim().length >= 50; // Minimum submission length
	$: wordCount = submission.trim().split(/\s+/).filter(word => word.length > 0).length;
	$: challengeIcon = getChallengeIcon(module.challengeType);

	function getChallengeIcon(type: string) {
		switch (type) {
			case 'portfolio_analysis': return TrendingUp;
			case 'risk_calculation': return Calculator;
			case 'scenario_planning': return Target;
			case 'case_study': return FileText;
			default: return FileText;
		}
	}

	function getChallengeTypeLabel(type: string): string {
		switch (type) {
			case 'portfolio_analysis': return 'Portfolio Analysis';
			case 'risk_calculation': return 'Risk Calculation';
			case 'scenario_planning': return 'Scenario Planning';
			case 'case_study': return 'Case Study';
			default: return 'Challenge';
		}
	}

	function startChallenge() {
		showSubmission = true;
		startTime = Date.now();
	}

	function submitChallenge() {
		if (!canSubmit) return;

		timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
		isCompleted = true;

		// Dispatch completion event
		dispatch('complete', { submission, timeSpent });
		onComplete(submission, timeSpent);
	}

	function handleBack() {
		dispatch('back');
		onBack();
	}

	// Format time display
	function formatTime(minutes: number): string {
		if (minutes < 1) return '< 1 min';
		return `${minutes} min`;
	}

	// Get challenge-specific guidance
	function getChallengeGuidance(type: string): string[] {
		switch (type) {
			case 'portfolio_analysis':
				return [
					'Analyze the asset allocation and diversification',
					'Identify potential risk concentrations',
					'Evaluate liquidity and correlation risks',
					'Suggest specific improvements'
				];
			case 'risk_calculation':
				return [
					'Show your calculation methodology',
					'Explain your assumptions',
					'Present results clearly with units',
					'Discuss implications of the results'
				];
			case 'scenario_planning':
				return [
					'Define the scenario clearly',
					'Analyze potential impacts',
					'Develop contingency strategies',
					'Consider probability and severity'
				];
			case 'case_study':
				return [
					'Summarize the key facts',
					'Identify the main issues',
					'Apply relevant principles',
					'Provide actionable recommendations'
				];
			default:
				return [
					'Address all parts of the challenge',
					'Show your reasoning process',
					'Provide specific examples',
					'Draw clear conclusions'
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
			<!-- Challenge Overview -->
			<Card class="military-card mb-6">
				<CardHeader>
					<div class="flex items-center space-x-3 mb-4">
						<div class="bg-primary/10 p-3 rounded-lg">
							<svelte:component this={challengeIcon} class="w-6 h-6 text-primary" />
						</div>
						<div>
							<CardTitle class="text-xl">{module.title}</CardTitle>
							<p class="text-muted-foreground">{module.description}</p>
						</div>
					</div>
					<div class="flex items-center space-x-2">
						<Badge class="bg-primary/10 text-primary">
							{getChallengeTypeLabel(module.challengeType)}
						</Badge>
						<Badge variant="outline" class="text-xs">
							{module.submissionFormat} submission
						</Badge>
					</div>
				</CardHeader>
			</Card>

			<!-- Challenge Instructions -->
			<Card class="military-card mb-6">
				<CardHeader>
					<CardTitle class="text-lg">Challenge Instructions</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="prose prose-invert max-w-none">
						<p class="text-base leading-relaxed">{module.instructions}</p>
					</div>

					<!-- Evaluation Criteria -->
					{#if module.evaluationCriteria && module.evaluationCriteria.length > 0}
						<div class="mt-6">
							<h4 class="font-semibold mb-3">Evaluation Criteria:</h4>
							<ul class="space-y-2">
								{#each module.evaluationCriteria as criterion}
									<li class="flex items-start space-x-2">
										<CheckCircle class="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
										<span class="text-sm">{criterion}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Challenge Guidance -->
					<div class="mt-6">
						<h4 class="font-semibold mb-3">Guidance for Success:</h4>
						<ul class="space-y-2">
							{#each getChallengeGuidance(module.challengeType) as guidance}
								<li class="flex items-start space-x-2">
									<Target class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
									<span class="text-sm">{guidance}</span>
								</li>
							{/each}
						</ul>
					</div>

					{#if !showSubmission}
						<div class="pt-4 border-t border-border/50">
							<Button on:click={startChallenge} class="bg-primary hover:bg-primary/90">
								Start Challenge
								<ArrowLeft class="w-4 h-4 ml-2 rotate-180" />
							</Button>
						</div>
					{/if}
				</CardContent>
			</Card>

			<!-- Submission Area -->
			{#if showSubmission}
				<Card class="military-card">
					<CardHeader>
						<CardTitle class="text-lg">Your Submission</CardTitle>
						<div class="flex items-center space-x-4 text-sm text-muted-foreground">
							<span>Word count: {wordCount}</span>
							<span>Minimum: 50 words</span>
						</div>
					</CardHeader>
					<CardContent class="space-y-4">
						<Textarea
							bind:value={submission}
							placeholder="Enter your detailed response to the challenge here. Be thorough and show your reasoning..."
							class="min-h-[300px] resize-none"
						/>

						<!-- Submission Guidelines -->
						<div class="bg-muted/20 p-4 rounded-lg">
							<h5 class="font-semibold mb-2">Submission Tips:</h5>
							<ul class="text-sm text-muted-foreground space-y-1">
								<li>• Be specific and detailed in your analysis</li>
								<li>• Show your work and reasoning process</li>
								<li>• Use concrete examples where applicable</li>
								<li>• Address all parts of the challenge</li>
								<li>• Proofread before submitting</li>
							</ul>
						</div>

						<!-- Submit Button -->
						<div class="flex justify-between items-center pt-4 border-t border-border/50">
							<Button variant="outline" on:click={() => showSubmission = false}>
								Back to Instructions
							</Button>
							<Button 
								on:click={submitChallenge}
								disabled={!canSubmit}
								class="bg-secondary hover:bg-secondary/90"
							>
								Submit Challenge
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
						<CardTitle class="text-2xl text-secondary">Challenge Completed!</CardTitle>
						<p class="text-muted-foreground mt-2">
							Your submission has been recorded and you've earned XP for completing this challenge.
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
							<span class="font-semibold">Challenge XP Awarded!</span>
						</div>
						<p class="text-sm text-muted-foreground mt-2">
							Great work on completing this {getChallengeTypeLabel(module.challengeType).toLowerCase()}!
						</p>
					</div>

					<!-- Submission Preview -->
					<div class="text-left bg-muted/20 p-4 rounded-lg">
						<h4 class="font-semibold mb-2">Your Submission:</h4>
						<div class="text-sm text-muted-foreground max-h-32 overflow-y-auto">
							{submission.substring(0, 200)}{submission.length > 200 ? '...' : ''}
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
