<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './ui/Button.svelte';
	import Input from './ui/Input.svelte';
	import Label from './ui/Label.svelte';
	import Textarea from './ui/Textarea.svelte';
	import Select from './ui/Select.svelte';
	import SelectItem from './ui/SelectItem.svelte';
	import Checkbox from './ui/Checkbox.svelte';
	import Badge from './ui/Badge.svelte';
	import { createSquad, type SquadCategory, type SquadPrivacy } from '$lib/stores/squads';
	import { 
		X, 
		Shield, 
		Users, 
		Globe, 
		Lock, 
		Eye, 
		UserPlus, 
		CheckCircle,
		Plus,
		Minus,
		Clock,
		Target,
		BookOpen,
		TrendingUp,
		Building2,
		GraduationCap,
		Briefcase,
		Handshake,
		Rocket,
		Network,
		Lightbulb,
		Save,
		ArrowRight,
		ArrowLeft
	} from 'lucide-svelte';

	export let isOpen = false;

	const dispatch = createEventDispatcher();

	let currentStep = 1;
	let isLoading = false;

	// Form data
	let formData = {
		name: '',
		description: '',
		category: 'Trading Strategies' as SquadCategory,
		privacy: 'Open' as SquadPrivacy,
		maxMembers: 12,
		activityLevel: 'Medium' as 'Low' | 'Medium' | 'High' | 'Very High',
		meetingCadence: '',
		timezone: 'America/New_York',
		skillLevel: 'Mixed' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed',
		language: 'English',
		region: '',
		tags: [] as string[],
		goals: [] as string[],
		requirements: [] as string[],
		rules: [] as string[],
		focusAreas: [] as string[]
	};

	let newTag = '';
	let newGoal = '';
	let newRequirement = '';
	let newRule = '';
	let newFocusArea = '';

	const categories: { id: SquadCategory, name: string, icon: any, description: string }[] = [
		{ 
			id: 'Trading Strategies', 
			name: 'Trading Strategies', 
			icon: TrendingUp, 
			description: 'Focus on trading techniques, market analysis, and strategy development'
		},
		{ 
			id: 'Business Development', 
			name: 'Business Development', 
			icon: Building2, 
			description: 'Entrepreneurship, business growth, and professional development'
		},
		{ 
			id: 'Skill Learning', 
			name: 'Skill Learning', 
			icon: GraduationCap, 
			description: 'Learning new skills, courses, and educational content'
		},
		{ 
			id: 'Industry Specific', 
			name: 'Industry Specific', 
			icon: Briefcase, 
			description: 'Industry-focused discussions and networking'
		},
		{ 
			id: 'Accountability', 
			name: 'Accountability', 
			icon: Target, 
			description: 'Goal tracking, habit formation, and mutual accountability'
		},
		{ 
			id: 'Mentorship', 
			name: 'Mentorship', 
			icon: Handshake, 
			description: 'Mentor-mentee relationships and knowledge transfer'
		},
		{ 
			id: 'Project Based', 
			name: 'Project Based', 
			icon: Rocket, 
			description: 'Collaborative projects and team-based initiatives'
		},
		{ 
			id: 'Study Groups', 
			name: 'Study Groups', 
			icon: BookOpen, 
			description: 'Structured learning and study sessions'
		},
		{ 
			id: 'Networking', 
			name: 'Networking', 
			icon: Network, 
			description: 'Professional networking and relationship building'
		},
		{ 
			id: 'Career Development', 
			name: 'Career Development', 
			icon: Lightbulb, 
			description: 'Career advancement, job searching, and professional growth'
		}
	];

	const privacyOptions = [
		{ 
			id: 'Open', 
			name: 'Open', 
			icon: Eye, 
			description: 'Anyone can join immediately',
			color: 'bg-primary/10 text-primary'
		},
		{ 
			id: 'Application-Required', 
			name: 'Application Required', 
			icon: CheckCircle, 
			description: 'Members must apply and be approved',
			color: 'bg-orange-500/10 text-orange-500'
		},
		{ 
			id: 'Invite-Only', 
			name: 'Invite Only', 
			icon: UserPlus, 
			description: 'Members can only join by invitation',
			color: 'bg-secondary/10 text-secondary'
		},
		{ 
			id: 'Private', 
			name: 'Private', 
			icon: Lock, 
			description: 'Completely private, invitation only',
			color: 'bg-red-500/10 text-red-500'
		}
	];

	const activityLevels = [
		{ id: 'Low', name: 'Low', description: 'Weekly check-ins, casual participation' },
		{ id: 'Medium', name: 'Medium', description: 'Regular engagement, 2-3 times per week' },
		{ id: 'High', name: 'High', description: 'Daily participation expected' },
		{ id: 'Very High', name: 'Very High', description: 'Multiple daily interactions, high commitment' }
	];

	const skillLevels = [
		{ id: 'Beginner', name: 'Beginner', description: 'New to the topic, learning fundamentals' },
		{ id: 'Intermediate', name: 'Intermediate', description: 'Some experience, developing skills' },
		{ id: 'Advanced', name: 'Advanced', description: 'Experienced practitioners and experts' },
		{ id: 'Mixed', name: 'Mixed', description: 'All skill levels welcome' }
	];

	const timezones = [
		'America/New_York',
		'America/Chicago',
		'America/Denver',
		'America/Los_Angeles',
		'Europe/London',
		'Europe/Paris',
		'Europe/Berlin',
		'Asia/Tokyo',
		'Asia/Shanghai',
		'Asia/Kolkata',
		'Australia/Sydney'
	];

	function addTag() {
		if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
			formData.tags = [...formData.tags, newTag.trim()];
			newTag = '';
		}
	}

	function removeTag(tag: string) {
		formData.tags = formData.tags.filter(t => t !== tag);
	}

	function addGoal() {
		if (newGoal.trim() && !formData.goals.includes(newGoal.trim())) {
			formData.goals = [...formData.goals, newGoal.trim()];
			newGoal = '';
		}
	}

	function removeGoal(goal: string) {
		formData.goals = formData.goals.filter(g => g !== goal);
	}

	function addRequirement() {
		if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
			formData.requirements = [...formData.requirements, newRequirement.trim()];
			newRequirement = '';
		}
	}

	function removeRequirement(requirement: string) {
		formData.requirements = formData.requirements.filter(r => r !== requirement);
	}

	function addRule() {
		if (newRule.trim() && !formData.rules.includes(newRule.trim())) {
			formData.rules = [...formData.rules, newRule.trim()];
			newRule = '';
		}
	}

	function removeRule(rule: string) {
		formData.rules = formData.rules.filter(r => r !== rule);
	}

	function addFocusArea() {
		if (newFocusArea.trim() && !formData.focusAreas.includes(newFocusArea.trim())) {
			formData.focusAreas = [...formData.focusAreas, newFocusArea.trim()];
			newFocusArea = '';
		}
	}

	function removeFocusArea(area: string) {
		formData.focusAreas = formData.focusAreas.filter(a => a !== area);
	}

	function nextStep() {
		if (currentStep < 4) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	function closeModal() {
		isOpen = false;
		currentStep = 1;
		// Reset form data
		formData = {
			name: '',
			description: '',
			category: 'Trading Strategies',
			privacy: 'Open',
			maxMembers: 12,
			activityLevel: 'Medium',
			meetingCadence: '',
			timezone: 'America/New_York',
			skillLevel: 'Mixed',
			language: 'English',
			region: '',
			tags: [],
			goals: [],
			requirements: [],
			rules: [],
			focusAreas: []
		};
	}

	async function handleCreateSquad() {
		isLoading = true;
		
		try {
			// Validate required fields
			if (!formData.name.trim() || !formData.description.trim()) {
				throw new Error('Name and description are required');
			}

			// Create the squad with all current features
			const newSquad = createSquad({
				name: formData.name.trim(),
				description: formData.description.trim(),
				category: formData.category,
				privacy: formData.privacy,
				maxMembers: formData.maxMembers,
				activityLevel: formData.activityLevel,
				meetingCadence: formData.meetingCadence,
				timezone: formData.timezone,
				skillLevel: formData.skillLevel,
				language: formData.language,
				region: formData.region,
				tags: formData.tags,
				goals: formData.goals,
				requirements: formData.requirements,
				rules: formData.rules,
				focusAreas: formData.focusAreas,
				leaderId: 'current-user-id',
				moderatorIds: [],
				memberIds: ['current-user-id'],
				currentMembers: 1,
				pendingApplications: [],
				invitedUsers: [],
				resources: [],
				achievements: [],
				lastActivity: new Date(),
				isActive: true
			});
			
			isLoading = false;
			closeModal();
			dispatch('squadCreated', newSquad);
			
			// Show success message
			console.log('Squad created successfully:', newSquad);
		} catch (error) {
			isLoading = false;
			console.error('Failed to create squad:', error);
			// In a real app, you'd show an error toast here
		}
	}

	function canProceedToNext() {
		switch (currentStep) {
			case 1:
				return formData.name.trim().length >= 3 && formData.description.trim().length >= 20;
			case 2:
				return formData.category && formData.privacy;
			case 3:
				return formData.maxMembers >= 2 && formData.maxMembers <= 50 && formData.activityLevel && formData.skillLevel;
			case 4:
				return true; // Optional step
			default:
				return false;
		}
	}

	function getStepTitle(step: number) {
		switch (step) {
			case 1: return 'Basic Information';
			case 2: return 'Category & Privacy';
			case 3: return 'Settings & Requirements';
			case 4: return 'Goals & Guidelines';
			default: return 'Squad Creation';
		}
	}
</script>

{#if isOpen}
	<!-- Modal backdrop -->
	<div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" on:click={closeModal}>
		<!-- Modal content -->
		<div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-0 shadow-lg duration-200 rounded-lg max-h-[90vh] overflow-hidden" on:click|stopPropagation>
			<!-- Header -->
			<div class="flex items-center justify-between p-6 border-b border-border/50">
				<div class="flex items-center space-x-3">
					<div class="bg-primary/10 p-2 rounded-lg">
						<Shield class="w-6 h-6 text-primary" />
					</div>
					<div>
						<h2 class="text-xl font-bold gradient-text">Create New Squad</h2>
						<p class="text-sm text-muted-foreground">Step {currentStep} of 4: {getStepTitle(currentStep)}</p>
					</div>
				</div>
				<Button variant="ghost" size="sm" on:click={closeModal}>
					<X class="w-4 h-4" />
				</Button>
			</div>

			<!-- Progress Bar -->
			<div class="px-6">
				<div class="flex items-center space-x-2 mb-4">
					{#each [1, 2, 3, 4] as step}
						<div class="flex-1 h-2 rounded-full {step <= currentStep ? 'bg-primary' : 'bg-muted'}"></div>
					{/each}
				</div>
			</div>

			<!-- Form Content -->
			<div class="px-6 pb-6 overflow-y-auto flex-1">
				{#if currentStep === 1}
					<!-- Step 1: Basic Information -->
					<div class="space-y-6">
						<div class="space-y-2">
							<Label for="squadName">Squad Name *</Label>
							<Input
								id="squadName"
								placeholder="e.g., Gold Trading Masters"
								bind:value={formData.name}
								class="text-lg"
							/>
							<p class="text-xs text-muted-foreground">{formData.name.length}/50 characters</p>
						</div>

						<div class="space-y-2">
							<Label for="squadDescription">Description *</Label>
							<Textarea
								id="squadDescription"
								placeholder="Describe your squad's purpose, goals, and what members can expect..."
								bind:value={formData.description}
								rows={4}
							/>
							<p class="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
						</div>

						<div class="space-y-2">
							<Label for="squadTags">Tags (Optional)</Label>
							<div class="flex items-center space-x-2">
								<Input
									placeholder="Add a tag..."
									bind:value={newTag}
									on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
								/>
								<Button type="button" size="sm" on:click={addTag}>
									<Plus class="w-4 h-4" />
								</Button>
							</div>
							{#if formData.tags.length > 0}
								<div class="flex flex-wrap gap-2 mt-2">
									{#each formData.tags as tag}
										<Badge variant="outline" class="text-xs">
											#{tag}
											<button on:click={() => removeTag(tag)} class="ml-1 hover:text-destructive">
												<X class="w-3 h-3" />
											</button>
										</Badge>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{:else if currentStep === 2}
					<!-- Step 2: Category & Privacy -->
					<div class="space-y-6">
						<div class="space-y-4">
							<Label>Squad Category *</Label>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each categories as category}
									<div 
										class="p-4 border-2 rounded-lg cursor-pointer transition-colors {
											formData.category === category.id 
												? 'border-primary bg-primary/10' 
												: 'border-border hover:border-primary/50'
										}"
										on:click={() => formData.category = category.id}
									>
										<div class="flex items-center space-x-3">
											<svelte:component this={category.icon} class="w-5 h-5 text-primary" />
											<div>
												<div class="font-medium">{category.name}</div>
												<div class="text-xs text-muted-foreground">{category.description}</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div class="space-y-4">
							<Label>Privacy Level *</Label>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each privacyOptions as privacy}
									<div 
										class="p-4 border-2 rounded-lg cursor-pointer transition-colors {
											formData.privacy === privacy.id 
												? 'border-primary bg-primary/10' 
												: 'border-border hover:border-primary/50'
										}"
										on:click={() => formData.privacy = privacy.id}
									>
										<div class="flex items-center space-x-3">
											<div class="{privacy.color} p-2 rounded">
												<svelte:component this={privacy.icon} class="w-4 h-4" />
											</div>
											<div>
												<div class="font-medium">{privacy.name}</div>
												<div class="text-xs text-muted-foreground">{privacy.description}</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else if currentStep === 3}
					<!-- Step 3: Settings & Requirements -->
					<div class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="space-y-2">
								<Label for="maxMembers">Maximum Members *</Label>
								<Input
									id="maxMembers"
									type="number"
									min="2"
									max="50"
									bind:value={formData.maxMembers}
								/>
								<p class="text-xs text-muted-foreground {formData.maxMembers < 2 || formData.maxMembers > 50 ? 'text-destructive' : ''}">
									Recommended: 6-15 for optimal engagement (2-50 allowed)
								</p>
							</div>

							<div class="space-y-2">
								<Label for="skillLevel">Skill Level *</Label>
								<Select bind:value={formData.skillLevel}>
									{#each skillLevels as level}
										<SelectItem value={level.id} selectOption={(v) => formData.skillLevel = v}>
											{level.name} - {level.description}
										</SelectItem>
									{/each}
								</Select>
							</div>

							<div class="space-y-2">
								<Label for="activityLevel">Activity Level *</Label>
								<Select bind:value={formData.activityLevel}>
									{#each activityLevels as level}
										<SelectItem value={level.id} selectOption={(v) => formData.activityLevel = v}>
											{level.name} - {level.description}
										</SelectItem>
									{/each}
								</Select>
							</div>

							<div class="space-y-2">
								<Label for="timezone">Timezone</Label>
								<Select bind:value={formData.timezone}>
									{#each timezones as tz}
										<SelectItem value={tz} selectOption={(v) => formData.timezone = v}>
											{tz.replace('_', ' ')}
										</SelectItem>
									{/each}
								</Select>
							</div>

							<div class="space-y-2">
								<Label for="meetingCadence">Meeting Schedule</Label>
								<Input
									id="meetingCadence"
									placeholder="e.g., Weekly Mondays 7PM EST"
									bind:value={formData.meetingCadence}
								/>
							</div>

							<div class="space-y-2">
								<Label for="language">Primary Language</Label>
								<Select bind:value={formData.language}>
									<SelectItem value="English" selectOption={(v) => formData.language = v}>English</SelectItem>
									<SelectItem value="Spanish" selectOption={(v) => formData.language = v}>Spanish</SelectItem>
									<SelectItem value="French" selectOption={(v) => formData.language = v}>French</SelectItem>
									<SelectItem value="German" selectOption={(v) => formData.language = v}>German</SelectItem>
									<SelectItem value="Chinese" selectOption={(v) => formData.language = v}>Chinese</SelectItem>
									<SelectItem value="Japanese" selectOption={(v) => formData.language = v}>Japanese</SelectItem>
								</Select>
							</div>
						</div>

						<!-- Requirements -->
						<div class="space-y-2">
							<Label>Membership Requirements (Optional)</Label>
							<div class="flex items-center space-x-2">
								<Input
									placeholder="e.g., Minimum 6 months trading experience"
									bind:value={newRequirement}
									on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
								/>
								<Button type="button" size="sm" on:click={addRequirement}>
									<Plus class="w-4 h-4" />
								</Button>
							</div>
							{#if formData.requirements.length > 0}
								<div class="space-y-2 mt-2">
									{#each formData.requirements as requirement}
										<div class="flex items-center justify-between p-2 bg-muted/10 rounded">
											<span class="text-sm">{requirement}</span>
											<button on:click={() => removeRequirement(requirement)} class="text-destructive hover:text-destructive/80">
												<X class="w-3 h-3" />
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{:else if currentStep === 4}
					<!-- Step 4: Goals & Guidelines -->
					<div class="space-y-6">
						<!-- Goals -->
						<div class="space-y-2">
							<Label>Squad Goals (Optional)</Label>
							<div class="flex items-center space-x-2">
								<Input
									placeholder="e.g., Improve trading accuracy by 15%"
									bind:value={newGoal}
									on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
								/>
								<Button type="button" size="sm" on:click={addGoal}>
									<Plus class="w-4 h-4" />
								</Button>
							</div>
							{#if formData.goals.length > 0}
								<div class="space-y-2 mt-2">
									{#each formData.goals as goal}
										<div class="flex items-center justify-between p-2 bg-primary/10 rounded">
											<span class="text-sm">{goal}</span>
											<button on:click={() => removeGoal(goal)} class="text-destructive hover:text-destructive/80">
												<X class="w-3 h-3" />
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Focus Areas -->
						<div class="space-y-2">
							<Label>Focus Areas (Optional)</Label>
							<div class="flex items-center space-x-2">
								<Input
									placeholder="e.g., Risk Management"
									bind:value={newFocusArea}
									on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addFocusArea())}
								/>
								<Button type="button" size="sm" on:click={addFocusArea}>
									<Plus class="w-4 h-4" />
								</Button>
							</div>
							{#if formData.focusAreas.length > 0}
								<div class="flex flex-wrap gap-2 mt-2">
									{#each formData.focusAreas as area}
										<Badge variant="outline" class="text-xs">
											{area}
											<button on:click={() => removeFocusArea(area)} class="ml-1 hover:text-destructive">
												<X class="w-3 h-3" />
											</button>
										</Badge>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Rules -->
						<div class="space-y-2">
							<Label>Squad Rules (Optional)</Label>
							<div class="flex items-center space-x-2">
								<Input
									placeholder="e.g., Respect all members"
									bind:value={newRule}
									on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addRule())}
								/>
								<Button type="button" size="sm" on:click={addRule}>
									<Plus class="w-4 h-4" />
								</Button>
							</div>
							{#if formData.rules.length > 0}
								<div class="space-y-2 mt-2">
									{#each formData.rules as rule}
										<div class="flex items-center justify-between p-2 bg-muted/10 rounded">
											<span class="text-sm">{rule}</span>
											<button on:click={() => removeRule(rule)} class="text-destructive hover:text-destructive/80">
												<X class="w-3 h-3" />
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Preview -->
						<div class="p-4 bg-muted/10 rounded-lg">
							<h4 class="font-semibold mb-2">Squad Preview</h4>
							<div class="space-y-2 text-sm">
								<div><strong>Name:</strong> {formData.name || 'Your Squad Name'}</div>
								<div><strong>Category:</strong> {formData.category}</div>
								<div><strong>Privacy:</strong> {formData.privacy}</div>
								<div><strong>Max Members:</strong> {formData.maxMembers}</div>
								<div><strong>Activity Level:</strong> {formData.activityLevel}</div>
								<div><strong>Skill Level:</strong> {formData.skillLevel}</div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between p-6 border-t border-border/50">
				<div class="flex items-center space-x-2">
					{#if currentStep > 1}
						<Button variant="outline" on:click={prevStep}>
							<ArrowLeft class="w-4 h-4 mr-2" />
							Previous
						</Button>
					{/if}
				</div>

				<div class="flex items-center space-x-2">
					{#if currentStep < 4}
						<Button 
							on:click={nextStep}
							disabled={!canProceedToNext()}
							class="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							Next Step
							<ArrowRight class="w-4 h-4 ml-2" />
						</Button>
					{:else}
						<Button 
							on:click={handleCreateSquad}
							disabled={isLoading || !canProceedToNext()}
							class="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							{#if isLoading}
								<div class="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
								Creating Squad...
							{:else}
								<Save class="w-4 h-4 mr-2" />
								Create Squad
							{/if}
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}