<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { 
		Calendar, 
		Plus, 
		Clock, 
		Users,
		MapPin,
		Video,
		Star,
		Bell,
		ExternalLink
	} from 'lucide-svelte';
	import type { User, CommunityEvent } from '$lib/types/community';

	export let currentUser: User;

	let selectedView: 'upcoming' | 'my-events' | 'past' = 'upcoming';

	// Sample events data
	let events: CommunityEvent[] = [
		{
			id: '1',
			title: 'Weekly Gold Market Analysis',
			description: 'Deep dive into gold market fundamentals, technical analysis, and upcoming economic events that could impact precious metals prices.',
			type: 'AMA',
			hostId: 'user1',
			host: {
				id: 'user1',
				username: 'goldmaster',
				displayName: 'Gold Master',
				avatar: 'GM',
				level: 15,
				reputation: 2450,
				joinDate: new Date('2023-01-15'),
				lastActive: new Date(),
				tradingExperience: 'Expert',
				specialties: ['Gold Trading'],
				achievements: [],
				stats: {
					postsCount: 156,
					likesReceived: 892,
					likesGiven: 234,
					squadsJoined: 3,
					squadsLed: 1,
					helpfulAnswers: 67,
					tradingWins: 234,
					tradingLosses: 89
				}
			},
			startTime: new Date('2024-01-20T19:00:00'),
			endTime: new Date('2024-01-20T20:30:00'),
			timezone: 'EST',
			maxAttendees: 50,
			currentAttendees: 23,
			attendeeIds: ['user1', 'user2'],
			isRecurring: true,
			recurrencePattern: 'Weekly on Saturdays',
			location: 'Online',
			meetingLink: 'https://zoom.us/j/123456789',
			tags: ['gold', 'analysis', 'ama', 'weekly'],
			createdAt: new Date('2024-01-01')
		},
		{
			id: '2',
			title: 'Forex Psychology Workshop',
			description: 'Interactive workshop on trading psychology, emotional control, and developing a winning mindset for consistent trading success.',
			type: 'Workshop',
			hostId: 'user1',
			host: {
				id: 'user1',
				username: 'goldmaster',
				displayName: 'Gold Master',
				avatar: 'GM',
				level: 15,
				reputation: 2450,
				joinDate: new Date('2023-01-15'),
				lastActive: new Date(),
				tradingExperience: 'Expert',
				specialties: ['Gold Trading'],
				achievements: [],
				stats: {
					postsCount: 156,
					likesReceived: 892,
					likesGiven: 234,
					squadsJoined: 3,
					squadsLed: 1,
					helpfulAnswers: 67,
					tradingWins: 234,
					tradingLosses: 89
				}
			},
			startTime: new Date('2024-01-25T18:00:00'),
			endTime: new Date('2024-01-25T20:00:00'),
			timezone: 'EST',
			maxAttendees: 30,
			currentAttendees: 18,
			attendeeIds: ['user2'],
			isRecurring: false,
			location: 'Online',
			meetingLink: 'https://zoom.us/j/987654321',
			tags: ['psychology', 'workshop', 'mindset'],
			requirements: ['Minimum 3 months trading experience', 'Active community member'],
			createdAt: new Date('2024-01-05')
		},
		{
			id: '3',
			title: 'Live Trading Session - EUR/USD',
			description: 'Real-time trading session focusing on EUR/USD analysis and live trade execution with risk management principles.',
			type: 'Trading Session',
			hostId: 'user1',
			host: {
				id: 'user1',
				username: 'goldmaster',
				displayName: 'Gold Master',
				avatar: 'GM',
				level: 15,
				reputation: 2450,
				joinDate: new Date('2023-01-15'),
				lastActive: new Date(),
				tradingExperience: 'Expert',
				specialties: ['Gold Trading'],
				achievements: [],
				stats: {
					postsCount: 156,
					likesReceived: 892,
					likesGiven: 234,
					squadsJoined: 3,
					squadsLed: 1,
					helpfulAnswers: 67,
					tradingWins: 234,
					tradingLosses: 89
				}
			},
			startTime: new Date('2024-01-22T14:00:00'),
			endTime: new Date('2024-01-22T16:00:00'),
			timezone: 'EST',
			maxAttendees: 20,
			currentAttendees: 15,
			attendeeIds: ['user1'],
			isRecurring: false,
			location: 'Online',
			meetingLink: 'https://zoom.us/j/555666777',
			tags: ['eur-usd', 'live-trading', 'forex'],
			requirements: ['Intermediate+ trading level', 'Live trading account'],
			createdAt: new Date('2024-01-10')
		}
	];

	function getEventTypeColor(type: string): string {
		switch (type) {
			case 'AMA': return 'bg-primary/10 text-primary';
			case 'Webinar': return 'bg-secondary/10 text-secondary';
			case 'Trading Session': return 'bg-primary/10 text-primary';
			case 'Workshop': return 'bg-secondary/10 text-secondary';
			case 'Social': return 'bg-primary/10 text-primary';
			default: return 'bg-muted/10 text-muted-foreground';
		}
	}

	function formatEventTime(date: Date): string {
		return date.toLocaleDateString('en-US', { 
			weekday: 'short',
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatDuration(start: Date, end: Date): string {
		const diffMs = end.getTime() - start.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
		
		if (diffHours > 0) {
			return `${diffHours}h ${diffMins}m`;
		}
		return `${diffMins}m`;
	}

	function isUserAttending(event: CommunityEvent): boolean {
		return event.attendeeIds.includes(currentUser.id);
	}

	function canUserJoin(event: CommunityEvent): boolean {
		if (isUserAttending(event)) return false;
		if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) return false;
		return true;
	}

	function isEventUpcoming(event: CommunityEvent): boolean {
		return event.startTime > new Date();
	}

	$: upcomingEvents = events.filter(isEventUpcoming);
	$: myEvents = events.filter(event => isUserAttending(event));
	$: pastEvents = events.filter(event => !isEventUpcoming(event));
</script>

<div class="space-y-6">
	<!-- Header and Controls -->
	<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
		<h2 class="text-2xl font-bold">Community Events</h2>
		<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
			<Plus class="w-4 h-4 mr-2" />
			Create Event
		</Button>
	</div>

	<!-- View Tabs -->
	<div class="flex space-x-1 bg-muted/20 p-1 rounded-lg">
		<Button
			variant={selectedView === 'upcoming' ? 'default' : 'ghost'}
			size="sm"
			on:click={() => selectedView = 'upcoming'}
			class="flex-1"
		>
			Upcoming ({upcomingEvents.length})
		</Button>
		<Button
			variant={selectedView === 'my-events' ? 'default' : 'ghost'}
			size="sm"
			on:click={() => selectedView = 'my-events'}
			class="flex-1"
		>
			My Events ({myEvents.length})
		</Button>
		<Button
			variant={selectedView === 'past' ? 'default' : 'ghost'}
			size="sm"
			on:click={() => selectedView = 'past'}
			class="flex-1"
		>
			Past Events ({pastEvents.length})
		</Button>
	</div>

	<!-- Events List -->
	{#if selectedView === 'upcoming'}
		<div class="space-y-6">
			{#if upcomingEvents.length > 0}
				{#each upcomingEvents as event}
					<Card class="military-card hover:border-primary/30 transition-colors">
						<CardHeader>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<CardTitle class="text-xl">{event.title}</CardTitle>
										<Badge class={getEventTypeColor(event.type)}>
											{event.type}
										</Badge>
										{#if event.isRecurring}
											<Badge variant="outline" class="text-xs">Recurring</Badge>
										{/if}
									</div>
									<div class="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
										<div class="flex items-center space-x-1">
											<Clock class="w-4 h-4" />
											<span>{formatEventTime(event.startTime)} ({event.timezone})</span>
										</div>
										<div class="flex items-center space-x-1">
											<Calendar class="w-4 h-4" />
											<span>{formatDuration(event.startTime, event.endTime)}</span>
										</div>
										<div class="flex items-center space-x-1">
											<MapPin class="w-4 h-4" />
											<span>{event.location}</span>
										</div>
									</div>
									<div class="flex items-center space-x-3 mb-3">
										<div class="flex items-center space-x-2">
											<div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
												<span class="text-xs font-semibold text-primary">{event.host.avatar}</span>
											</div>
											<span class="text-sm font-medium">{event.host.displayName}</span>
											<Badge variant="outline" class="text-xs">{event.host.tradingExperience}</Badge>
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="text-lg font-bold text-{event.maxAttendees && event.currentAttendees >= event.maxAttendees ? 'destructive' : 'primary'}">
										{event.currentAttendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}
									</div>
									<div class="text-sm text-muted-foreground">Attendees</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-muted-foreground mb-4">{event.description}</p>
							
							<!-- Tags -->
							{#if event.tags.length > 0}
								<div class="flex flex-wrap gap-2 mb-4">
									{#each event.tags as tag}
										<Badge variant="outline" class="text-xs">{tag}</Badge>
									{/each}
								</div>
							{/if}

							<!-- Requirements -->
							{#if event.requirements && event.requirements.length > 0}
								<div class="mb-4">
									<div class="text-sm font-semibold mb-2">Requirements:</div>
									<ul class="space-y-1">
										{#each event.requirements as requirement}
											<li class="flex items-center space-x-2 text-sm text-muted-foreground">
												<Star class="w-3 h-3 text-primary" />
												<span>{requirement}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									{#if event.location === 'Online' && event.meetingLink}
										<Button variant="outline" size="sm">
											<Video class="w-4 h-4 mr-2" />
											Join Meeting
											<ExternalLink class="w-3 h-3 ml-2" />
										</Button>
									{/if}
								</div>
								
								<div class="flex items-center space-x-2">
									{#if isUserAttending(event)}
										<Button variant="outline" size="sm">
											<Bell class="w-4 h-4 mr-2" />
											Attending
										</Button>
									{:else if canUserJoin(event)}
										<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
											<Plus class="w-4 h-4 mr-2" />
											Join Event
										</Button>
									{:else}
										<Button variant="outline" size="sm" disabled>
											<Users class="w-4 h-4 mr-2" />
											Event Full
										</Button>
									{/if}
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}
			{:else}
				<Card class="military-card">
					<CardContent class="text-center py-12">
						<Calendar class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
						<h3 class="text-lg font-semibold mb-2">No upcoming events</h3>
						<p class="text-muted-foreground mb-4">
							Check back later for new community events and workshops.
						</p>
						<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
							<Plus class="w-4 h-4 mr-2" />
							Create First Event
						</Button>
					</CardContent>
				</Card>
			{/if}
		</div>
	{:else if selectedView === 'my-events'}
		<div class="space-y-6">
			{#if myEvents.length > 0}
				{#each myEvents as event}
					<Card class="military-card border-primary/30">
						<CardHeader>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<CardTitle class="text-xl">{event.title}</CardTitle>
										<Badge class={getEventTypeColor(event.type)}>
											{event.type}
										</Badge>
										<Badge class="bg-primary/20 text-primary">Attending</Badge>
									</div>
									<div class="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
										<div class="flex items-center space-x-1">
											<Clock class="w-4 h-4" />
											<span>{formatEventTime(event.startTime)} ({event.timezone})</span>
										</div>
										<div class="flex items-center space-x-1">
											<Calendar class="w-4 h-4" />
											<span>{formatDuration(event.startTime, event.endTime)}</span>
										</div>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-muted-foreground mb-4">{event.description}</p>
							
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									{#if event.location === 'Online' && event.meetingLink && isEventUpcoming(event)}
										<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
											<Video class="w-4 h-4 mr-2" />
											Join Meeting
											<ExternalLink class="w-3 h-3 ml-2" />
										</Button>
									{/if}
								</div>
								
								<Button variant="outline" size="sm">
									<Bell class="w-4 h-4 mr-2" />
									Manage Notifications
								</Button>
							</div>
						</CardContent>
					</Card>
				{/each}
			{:else}
				<Card class="military-card">
					<CardContent class="text-center py-12">
						<Calendar class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
						<h3 class="text-lg font-semibold mb-2">No events joined</h3>
						<p class="text-muted-foreground mb-4">
							Join upcoming events to see them here.
						</p>
						<Button on:click={() => selectedView = 'upcoming'} class="bg-primary hover:bg-primary/90 text-primary-foreground">
							Browse Upcoming Events
						</Button>
					</CardContent>
				</Card>
			{/if}
		</div>
	{:else}
		<!-- Past Events -->
		<Card class="military-card">
			<CardContent class="text-center py-12">
				<Clock class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
				<h3 class="text-lg font-semibold mb-2">Past Events</h3>
				<p class="text-muted-foreground">
					Past events archive will be implemented here.
				</p>
			</CardContent>
		</Card>
	{/if}
</div>
