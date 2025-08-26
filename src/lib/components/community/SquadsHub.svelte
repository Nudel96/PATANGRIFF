<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input } from '$lib/components/ui';
	import { 
		Shield, 
		Plus, 
		Users, 
		Search,
		Clock,
		Globe,
		Lock,
		UserCheck,
		Target,
		TrendingUp,
		BookOpen,
		Heart,
		Brain
	} from 'lucide-svelte';
	import type { User, Squad } from '$lib/types/community';
	import { SAMPLE_SQUADS } from '$lib/types/community';

	export let currentUser: User;

	let searchTerm = '';
	let selectedCategory = 'all';
	let squads: Squad[] = SAMPLE_SQUADS;

	const squadCategories = [
		{ id: 'all', name: 'All Squads', icon: Shield },
		{ id: 'Trading Strategies', name: 'Trading Strategies', icon: TrendingUp },
		{ id: 'Skill Learning', name: 'Skill Learning', icon: BookOpen },
		{ id: 'Accountability', name: 'Accountability', icon: Target },
		{ id: 'Market Analysis', name: 'Market Analysis', icon: TrendingUp },
		{ id: 'Psychology', name: 'Psychology', icon: Brain }
	];

	function getPrivacyIcon(privacy: string) {
		switch (privacy) {
			case 'Open': return Globe;
			case 'Application Required': return UserCheck;
			case 'Invite Only': return Lock;
			default: return Globe;
		}
	}

	function getPrivacyColor(privacy: string): string {
		switch (privacy) {
			case 'Open': return 'bg-primary/10 text-primary';
			case 'Application Required': return 'bg-secondary/10 text-secondary';
			case 'Invite Only': return 'bg-destructive/10 text-destructive';
			default: return 'bg-muted/10 text-muted-foreground';
		}
	}

	function getCategoryColor(category: string): string {
		switch (category) {
			case 'Trading Strategies': return 'bg-primary/10 text-primary';
			case 'Skill Learning': return 'bg-secondary/10 text-secondary';
			case 'Accountability': return 'bg-primary/10 text-primary';
			case 'Market Analysis': return 'bg-secondary/10 text-secondary';
			case 'Psychology': return 'bg-primary/10 text-primary';
			default: return 'bg-muted/10 text-muted-foreground';
		}
	}

	function getActivityColor(level: string): string {
		switch (level) {
			case 'High': return 'text-primary';
			case 'Medium': return 'text-secondary';
			case 'Low': return 'text-muted-foreground';
			default: return 'text-muted-foreground';
		}
	}

	function formatTimeAgo(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMins / 60);
		const diffDays = Math.floor(diffHours / 24);

		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		return `${diffDays}d ago`;
	}

	function isUserInSquad(squad: Squad): boolean {
		return squad.memberIds.includes(currentUser.id);
	}

	function canUserJoin(squad: Squad): boolean {
		if (isUserInSquad(squad)) return false;
		if (squad.currentMembers >= squad.maxMembers) return false;
		return true;
	}

	$: filteredSquads = squads.filter(squad => {
		const matchesSearch = searchTerm === '' || 
			squad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			squad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			squad.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		
		const matchesCategory = selectedCategory === 'all' || squad.category === selectedCategory;
		
		return matchesSearch && matchesCategory;
	});
</script>

<div class="space-y-6">
	<!-- Header and Controls -->
	<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
		<h2 class="text-2xl font-bold">Trading Squads</h2>
		<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
			<Plus class="w-4 h-4 mr-2" />
			Create Squad
		</Button>
	</div>

	<!-- Filters -->
	<div class="flex flex-col lg:flex-row gap-4">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
			<Input
				placeholder="Search squads by name, description, or tags..."
				bind:value={searchTerm}
				class="pl-10"
			/>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each squadCategories as category}
				<Button
					variant={selectedCategory === category.id ? 'default' : 'outline'}
					size="sm"
					on:click={() => selectedCategory = category.id}
					class="flex items-center space-x-2"
				>
					<svelte:component this={category.icon} class="w-4 h-4" />
					<span>{category.name}</span>
				</Button>
			{/each}
		</div>
	</div>

	<!-- My Squads -->
	{#if squads.some(squad => isUserInSquad(squad))}
		<div class="space-y-4">
			<h3 class="text-lg font-semibold flex items-center space-x-2">
				<Shield class="w-5 h-5 text-primary" />
				<span>My Squads</span>
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each squads.filter(squad => isUserInSquad(squad)) as squad}
					<Card class="military-card border-primary/30">
						<CardHeader>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<CardTitle class="text-lg mb-2">{squad.name}</CardTitle>
									<div class="flex items-center space-x-2 mb-2">
										<Badge class={getCategoryColor(squad.category)}>
											{squad.category}
										</Badge>
										<Badge class={getPrivacyColor(squad.privacy)}>
											<svelte:component this={getPrivacyIcon(squad.privacy)} class="w-3 h-3 mr-1" />
											{squad.privacy}
										</Badge>
									</div>
								</div>
								<div class="text-right">
									<div class="text-sm font-semibold text-primary">
										{squad.currentMembers}/{squad.maxMembers}
									</div>
									<div class="text-xs text-muted-foreground">Members</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground mb-4 line-clamp-3">{squad.description}</p>
							
							<div class="space-y-2 mb-4">
								<div class="flex items-center justify-between text-sm">
									<span class="text-muted-foreground">Activity Level:</span>
									<span class="font-semibold {getActivityColor(squad.activityLevel)}">{squad.activityLevel}</span>
								</div>
								{#if squad.meetingCadence}
									<div class="flex items-center justify-between text-sm">
										<span class="text-muted-foreground">Meetings:</span>
										<span class="font-semibold">{squad.meetingCadence}</span>
									</div>
								{/if}
								<div class="flex items-center justify-between text-sm">
									<span class="text-muted-foreground">Last Active:</span>
									<span class="font-semibold">{formatTimeAgo(squad.lastActivity)}</span>
								</div>
							</div>

							<Button variant="outline" class="w-full">
								<Shield class="w-4 h-4 mr-2" />
								Enter Squad
							</Button>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Available Squads -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold flex items-center space-x-2">
			<Users class="w-5 h-5 text-secondary" />
			<span>Available Squads</span>
		</h3>
		
		{#if filteredSquads.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredSquads as squad}
					<Card class="military-card hover:border-primary/30 transition-colors">
						<CardHeader>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<CardTitle class="text-lg mb-2">{squad.name}</CardTitle>
									<div class="flex items-center space-x-2 mb-2">
										<Badge class={getCategoryColor(squad.category)}>
											{squad.category}
										</Badge>
										<Badge class={getPrivacyColor(squad.privacy)}>
											<svelte:component this={getPrivacyIcon(squad.privacy)} class="w-3 h-3 mr-1" />
											{squad.privacy}
										</Badge>
									</div>
								</div>
								<div class="text-right">
									<div class="text-sm font-semibold text-{squad.currentMembers >= squad.maxMembers ? 'destructive' : 'primary'}">
										{squad.currentMembers}/{squad.maxMembers}
									</div>
									<div class="text-xs text-muted-foreground">Members</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground mb-4 line-clamp-3">{squad.description}</p>
							
							<!-- Squad Goals -->
							{#if squad.goals.length > 0}
								<div class="mb-4">
									<div class="text-sm font-semibold mb-2">Goals:</div>
									<div class="space-y-1">
										{#each squad.goals.slice(0, 2) as goal}
											<div class="flex items-center space-x-2 text-sm">
												<Target class="w-3 h-3 text-primary" />
												<span class="text-muted-foreground line-clamp-1">{goal}</span>
											</div>
										{/each}
										{#if squad.goals.length > 2}
											<div class="text-xs text-muted-foreground">+{squad.goals.length - 2} more goals</div>
										{/if}
									</div>
								</div>
							{/if}

							<!-- Squad Tags -->
							{#if squad.tags.length > 0}
								<div class="flex flex-wrap gap-1 mb-4">
									{#each squad.tags.slice(0, 3) as tag}
										<Badge variant="outline" class="text-xs">{tag}</Badge>
									{/each}
									{#if squad.tags.length > 3}
										<Badge variant="outline" class="text-xs">+{squad.tags.length - 3}</Badge>
									{/if}
								</div>
							{/if}

							<div class="space-y-2 mb-4">
								<div class="flex items-center justify-between text-sm">
									<span class="text-muted-foreground">Activity Level:</span>
									<span class="font-semibold {getActivityColor(squad.activityLevel)}">{squad.activityLevel}</span>
								</div>
								{#if squad.meetingCadence}
									<div class="flex items-center justify-between text-sm">
										<span class="text-muted-foreground">Meetings:</span>
										<span class="font-semibold text-xs">{squad.meetingCadence}</span>
									</div>
								{/if}
								<div class="flex items-center justify-between text-sm">
									<span class="text-muted-foreground">Last Active:</span>
									<span class="font-semibold">{formatTimeAgo(squad.lastActivity)}</span>
								</div>
							</div>

							{#if isUserInSquad(squad)}
								<Button variant="outline" class="w-full" disabled>
									<Shield class="w-4 h-4 mr-2" />
									Already Joined
								</Button>
							{:else if !canUserJoin(squad)}
								<Button variant="outline" class="w-full" disabled>
									<Users class="w-4 h-4 mr-2" />
									Squad Full
								</Button>
							{:else if squad.privacy === 'Open'}
								<Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
									<Plus class="w-4 h-4 mr-2" />
									Join Squad
								</Button>
							{:else if squad.privacy === 'Application Required'}
								<Button variant="outline" class="w-full">
									<UserCheck class="w-4 h-4 mr-2" />
									Apply to Join
								</Button>
							{:else}
								<Button variant="outline" class="w-full" disabled>
									<Lock class="w-4 h-4 mr-2" />
									Invite Only
								</Button>
							{/if}
						</CardContent>
					</Card>
				{/each}
			</div>
		{:else}
			<Card class="military-card">
				<CardContent class="text-center py-12">
					<Shield class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
					<h3 class="text-lg font-semibold mb-2">No squads found</h3>
					<p class="text-muted-foreground mb-4">
						{searchTerm || selectedCategory !== 'all' 
							? 'Try adjusting your search or filter criteria.' 
							: 'No squads available at the moment.'}
					</p>
					{#if !searchTerm && selectedCategory === 'all'}
						<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
							<Plus class="w-4 h-4 mr-2" />
							Create the First Squad
						</Button>
					{/if}
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
