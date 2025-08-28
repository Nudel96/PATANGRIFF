<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '$lib/components/ui';
	import { CheckCircle, X, Clock, Award, ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { QuizQuestion, QuizModule } from '$lib/types/learning';

	export let module: QuizModule;
	export let questions: QuizQuestion[];
	export let onComplete: (score: number, timeSpent: number) => void;
	export let onBack: () => void;

	const dispatch = createEventDispatcher<{
		complete: { score: number; timeSpent: number };
		back: void;
	}>();

	// Quiz state
	let currentQuestionIndex = 0;
	let answers: Record<string, string | number> = {};
	let showResults = false;
	let score = 0;
	let startTime = Date.now();
	let timeSpent = 0;
	let selectedAnswer: string | number | null = null;
	let showExplanation = false;
	let quizCompleted = false;

	// Computed properties
	$: currentQuestion = questions[currentQuestionIndex];
	$: progress = ((currentQuestionIndex + 1) / questions.length) * 100;
	$: isLastQuestion = currentQuestionIndex === questions.length - 1;
	$: canProceed = selectedAnswer !== null;
	$: totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
	$: finalScore = Math.round((score / totalPoints) * 100);
	$: passed = finalScore >= (module.passingScore || 70);

	function selectAnswer(answer: string | number) {
		selectedAnswer = answer;
		showExplanation = false;
	}

	function submitAnswer() {
		if (selectedAnswer === null) return;

		answers[currentQuestion.id] = selectedAnswer;
		
		// Check if answer is correct
		const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
		if (isCorrect) {
			score += currentQuestion.points;
		}

		showExplanation = true;
	}

	function nextQuestion() {
		if (isLastQuestion) {
			completeQuiz();
		} else {
			currentQuestionIndex++;
			selectedAnswer = null;
			showExplanation = false;
		}
	}

	function previousQuestion() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
			selectedAnswer = answers[currentQuestion.id] || null;
			showExplanation = false;
		}
	}

	function completeQuiz() {
		timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
		quizCompleted = true;
		showResults = true;
		
		// Dispatch completion event
		dispatch('complete', { score: finalScore, timeSpent });
		onComplete(finalScore, timeSpent);
	}

	function restartQuiz() {
		currentQuestionIndex = 0;
		answers = {};
		showResults = false;
		score = 0;
		startTime = Date.now();
		timeSpent = 0;
		selectedAnswer = null;
		showExplanation = false;
		quizCompleted = false;
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

		{#if !showResults}
			<!-- Quiz Progress -->
			<Card class="military-card mb-6">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="text-xl">{module.title}</CardTitle>
						<div class="text-sm text-muted-foreground">
							Question {currentQuestionIndex + 1} of {questions.length}
						</div>
					</div>
					<Progress value={progress} class="w-full" />
				</CardHeader>
			</Card>

			<!-- Current Question -->
			<Card class="military-card">
				<CardHeader>
					<CardTitle class="text-lg">{currentQuestion.question}</CardTitle>
					<div class="flex items-center space-x-2">
						<Badge variant="outline" class="text-xs">
							{currentQuestion.points} points
						</Badge>
						<Badge variant="outline" class="text-xs">
							{currentQuestion.type.replace('_', ' ')}
						</Badge>
					</div>
				</CardHeader>
				<CardContent class="space-y-4">
					<!-- Answer Options -->
					{#if currentQuestion.type === 'multiple_choice'}
						<div class="space-y-3">
							{#each currentQuestion.options || [] as option, index}
								<button
									class="w-full p-4 text-left border rounded-lg transition-colors hover:border-primary/50 {selectedAnswer === index ? 'border-primary bg-primary/5' : 'border-border'}"
									on:click={() => selectAnswer(index)}
									disabled={showExplanation}
								>
									<div class="flex items-center space-x-3">
										<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center {selectedAnswer === index ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}">
											{String.fromCharCode(65 + index)}
										</div>
										<span>{option}</span>
									</div>
								</button>
							{/each}
						</div>
					{:else if currentQuestion.type === 'true_false'}
						<div class="space-y-3">
							<button
								class="w-full p-4 text-left border rounded-lg transition-colors hover:border-primary/50 {selectedAnswer === 'true' ? 'border-primary bg-primary/5' : 'border-border'}"
								on:click={() => selectAnswer('true')}
								disabled={showExplanation}
							>
								<div class="flex items-center space-x-3">
									<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center {selectedAnswer === 'true' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}">
										T
									</div>
									<span>True</span>
								</div>
							</button>
							<button
								class="w-full p-4 text-left border rounded-lg transition-colors hover:border-primary/50 {selectedAnswer === 'false' ? 'border-primary bg-primary/5' : 'border-border'}"
								on:click={() => selectAnswer('false')}
								disabled={showExplanation}
							>
								<div class="flex items-center space-x-3">
									<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center {selectedAnswer === 'false' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}">
										F
									</div>
									<span>False</span>
								</div>
							</button>
						</div>
					{:else if currentQuestion.type === 'short_answer'}
						<div>
							<input
								type="text"
								class="w-full p-3 border rounded-lg bg-background"
								placeholder="Enter your answer..."
								bind:value={selectedAnswer}
								disabled={showExplanation}
							/>
						</div>
					{/if}

					<!-- Explanation (shown after answering) -->
					{#if showExplanation}
						<div class="mt-6 p-4 rounded-lg {selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}">
							<div class="flex items-center space-x-2 mb-2">
								{#if selectedAnswer === currentQuestion.correctAnswer}
									<CheckCircle class="w-5 h-5 text-green-500" />
									<span class="font-semibold text-green-500">Correct!</span>
								{:else}
									<X class="w-5 h-5 text-red-500" />
									<span class="font-semibold text-red-500">Incorrect</span>
								{/if}
							</div>
							<p class="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
						</div>
					{/if}

					<!-- Action Buttons -->
					<div class="flex justify-between items-center pt-4 border-t border-border/50">
						<Button 
							variant="outline" 
							on:click={previousQuestion}
							disabled={currentQuestionIndex === 0}
						>
							<ArrowLeft class="w-4 h-4 mr-2" />
							Previous
						</Button>

						{#if !showExplanation}
							<Button 
								on:click={submitAnswer}
								disabled={!canProceed}
								class="bg-primary hover:bg-primary/90"
							>
								Submit Answer
							</Button>
						{:else}
							<Button 
								on:click={nextQuestion}
								class="bg-secondary hover:bg-secondary/90"
							>
								{isLastQuestion ? 'Complete Quiz' : 'Next Question'}
								{#if !isLastQuestion}
									<ArrowRight class="w-4 h-4 ml-2" />
								{/if}
							</Button>
						{/if}
					</div>
				</CardContent>
			</Card>
		{:else}
			<!-- Quiz Results -->
			<Card class="military-card">
				<CardHeader class="text-center">
					<div class="mb-4">
						{#if passed}
							<CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
							<CardTitle class="text-2xl text-green-500">Quiz Passed!</CardTitle>
						{:else}
							<X class="w-16 h-16 text-red-500 mx-auto mb-4" />
							<CardTitle class="text-2xl text-red-500">Quiz Failed</CardTitle>
						{/if}
					</div>
				</CardHeader>
				<CardContent class="text-center space-y-6">
					<!-- Score Display -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="text-center">
							<div class="text-3xl font-bold {passed ? 'text-green-500' : 'text-red-500'}">{finalScore}%</div>
							<div class="text-sm text-muted-foreground">Final Score</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-primary">{score}/{totalPoints}</div>
							<div class="text-sm text-muted-foreground">Points Earned</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-secondary">{formatTime(timeSpent)}</div>
							<div class="text-sm text-muted-foreground">Time Taken</div>
						</div>
					</div>

					<!-- XP Reward -->
					{#if passed}
						<div class="bg-secondary/10 p-4 rounded-lg">
							<div class="flex items-center justify-center space-x-2">
								<Award class="w-5 h-5 text-secondary" />
								<span class="font-semibold">+{module.xpReward} XP Earned!</span>
							</div>
						</div>
					{:else}
						<div class="bg-muted/50 p-4 rounded-lg">
							<p class="text-sm text-muted-foreground">
								You need {module.passingScore || 70}% to pass. Try again to earn XP!
							</p>
						</div>
					{/if}

					<!-- Action Buttons -->
					<div class="flex justify-center space-x-4">
						<Button variant="outline" on:click={handleBack}>
							Back to Level
						</Button>
						{#if !passed}
							<Button on:click={restartQuiz} class="bg-primary hover:bg-primary/90">
								Try Again
							</Button>
						{/if}
					</div>
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
