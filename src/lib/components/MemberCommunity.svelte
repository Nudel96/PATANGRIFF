<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		Users, 
		MessageCircle, 
		Shield, 
		Calendar,
		LogOut,
		Bell,
		Search
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { User } from '$lib/types/community';
	import { SAMPLE_USERS } from '$lib/types/community';
	import ForumHub from './community/ForumHub.svelte';
	import SquadsHub from './community/SquadsHub.svelte';
	import EventsHub from './community/EventsHub.svelte';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	export let activeTab: string = 'forums';

	// Mock current user - in real app this would come from auth store
	let currentUser: User = SAMPLE_USERS[0];
	let notifications = 3;

	function handleBack() {
		dispatch('back');
	}

	function handleLogout() {
		dispatch('logout');
	}

	// Community stats
	const communityStats = [
		{
			icon: Users,
			value: '5,000+',
			label: 'Active Members',
			color: 'primary'
		},
		{
			icon: MessageCircle,
			value: '1,200+',
			label: 'Daily Discussions',
			color: 'secondary'
		},
		{
			icon: Shield,
			value: '150+',
			label: 'Active Squads',
			color: 'primary'
		},
		{
			icon: Calendar,
			value: '24/7',
			label: 'Live Support',
			color: 'secondary'
		}
	];
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
							<Users class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Community Hub</h1>
							<p class="text-sm text-foreground/70">Brotherhood of Warriors</p>
						</div>
					</div>
				</div>

				<!-- Header Actions -->
				<div class="hidden md:flex items-center space-x-4">
					<!-- Search -->
					<div class="relative">
						<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search community..."
							class="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						/>
					</div>

					<!-- Notifications -->
					<Button variant="outline" size="sm" class="relative">
						<Bell class="w-4 h-4" />
						{#if notifications > 0}
							<span class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
								{notifications}
							</span>
						{/if}
					</Button>

					<!-- User Info -->
					<div class="flex items-center space-x-3">
						<div class="text-right">
							<div class="text-sm font-semibold">{currentUser.displayName}</div>
							<div class="text-xs text-muted-foreground">Level {currentUser.level}</div>
						</div>
						<div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
							<span class="text-sm font-semibold text-primary">{currentUser.avatar}</span>
						</div>
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
		<!-- Community Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
			{#each communityStats as stat}
				<Card class="military-card">
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-muted-foreground">{stat.label}</p>
								<p class="text-2xl font-bold text-{stat.color}">{stat.value}</p>
							</div>
							<div class="bg-{stat.color}/10 p-3 rounded-xl">
								<svelte:component this={stat.icon} class="w-6 h-6 text-{stat.color}" />
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>

		<!-- Main Content Tabs -->
		<Tabs bind:value={activeTab} class="space-y-6">
			<TabsList class="grid w-full grid-cols-3 bg-muted/20">
				<TabsTrigger value="forums" class="flex items-center space-x-2">
					<MessageCircle class="w-4 h-4" />
					<span>Forums</span>
				</TabsTrigger>
				<TabsTrigger value="squads" class="flex items-center space-x-2">
					<Shield class="w-4 h-4" />
					<span>Squads</span>
				</TabsTrigger>
				<TabsTrigger value="events" class="flex items-center space-x-2">
					<Calendar class="w-4 h-4" />
					<span>Events</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="forums">
				<ForumHub {currentUser} />
			</TabsContent>

			<TabsContent value="squads">
				<SquadsHub {currentUser} />
			</TabsContent>

			<TabsContent value="events">
				<EventsHub {currentUser} />
			</TabsContent>
		</Tabs>
	</div>
</div>

<style>
	/* Custom styles for dynamic classes */
	:global(.text-primary) {
		color: hsl(var(--primary));
	}
	:global(.text-secondary) {
		color: hsl(var(--secondary));
	}
	:global(.bg-primary\/10) {
		background-color: hsl(var(--primary) / 0.1);
	}
	:global(.bg-secondary\/10) {
		background-color: hsl(var(--secondary) / 0.1);
	}
</style>
