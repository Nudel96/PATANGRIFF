<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
	import Input from './ui/Input.svelte';
	import Textarea from './ui/Textarea.svelte';
	import Tabs from './ui/Tabs.svelte';
	import TabsList from './ui/TabsList.svelte';
	import TabsTrigger from './ui/TabsTrigger.svelte';
	import TabsContent from './ui/TabsContent.svelte';
	import Progress from './ui/Progress.svelte';
	import { 
		squads, 
		squadMembers, 
		squadMessages, 
		squadProjects, 
		squadEvents,
		joinSquad,
		leaveSquad,
		applyToSquad,
		sendSquadMessage,
		type Squad,
		type SquadMember,
		type SquadMessage,
		type SquadProject,
		type SquadEvent
	} from '$lib/stores/squads';
	import { 
		ArrowLeft,
		LogOut,
		Users,
		MessageCircle,
		Calendar,
		FolderOpen,
		Settings,
		Crown,
		Shield,
		Star,
		Clock,
		Globe,
		Target,
		Award,
		Activity,
		Plus,
		Send,
		Paperclip,
		Smile,
		MoreVertical,
		UserPlus,
		UserMinus,
		Edit,
		Trash2,
		Eye,
		Lock,
		CheckCircle,
		AlertCircle,
		TrendingUp,
		FileText,
		Video,
		Link,
		Download,
		ThumbsUp,
		Heart,
		Laugh,
		Angry,
		Sad
	} from 'lucide-svelte';

	export let squadId: string;
	export let onBack: () => void;
	export let onLogout: () => void;

	let activeTab = 'overview';
	let newMessage = '';
	let isJoined = false;
	let userRole = 'Member';

	$: squad = $squads.find(s => s.id === squadId);
	$: members = $squadMembers[squadId] || [];
	$: messages = $squadMessages[squadId] || [];
	$: projects = $squadProjects[squadId] || [];
	$: events = $squadEvents[squadId] || [];

	// Sample data for squad details
	onMount(() => {
		if (squad) {
			// Check if user is already a member
			isJoined = squad.memberIds.includes('current-user-id');
			
			// Sample members data
			const sampleMembers: SquadMember[] = [
				{
					userId: squad.leaderId,
					squadId: squad.id,
					role: 'Leader',
					joinedAt: squad.createdAt,
					contributionScore: 95,
					lastActive: new Date(),
					achievements: ['Squad Founder', 'Top Contributor'],
					mentorshipOffered: ['Technical Analysis', 'Risk Management'],
					mentorshipSeeking: [],
					status: 'Active'
				},
				...squad.memberIds.slice(1).map((userId, index) => ({
					userId,
					squadId: squad.id,
					role: squad.moderatorIds.includes(userId) ? 'Moderator' : 'Active Member' as const,
					joinedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
					contributionScore: Math.floor(Math.random() * 50) + 50,
					lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
					achievements: [],
					mentorshipOffered: [],
					mentorshipSeeking: [],
					status: 'Active' as const
				}))
			];

			squadMembers.update(current => ({
				...current,
				[squadId]: sampleMembers
			}));

			// Sample messages
			const sampleMessages: SquadMessage[] = [
				{
					id: '1',
					squadId: squad.id,
					authorId: squad.leaderId,
					content: 'Welcome to the squad! Let\'s start by sharing our current trading goals and what we hope to achieve together.',
					type: 'announcement',
					timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
					reactions: { '👍': ['user2', 'user3'], '🔥': ['user4'] },
					replies: [],
					isPinned: true,
					tags: ['welcome'],
					attachments: []
				},
				{
					id: '2',
					squadId: squad.id,
					authorId: 'user2',
					content: 'Great analysis on XAUUSD today! The breakout setup was textbook perfect. Thanks for sharing the charts.',
					type: 'text',
					timestamp: new Date(Date.now() - 30 * 60 * 1000),
					reactions: { '👍': ['user1', 'user3'], '💯': ['user1'] },
					replies: [],
					isPinned: false,
					tags: ['gold', 'analysis'],
					attachments: []
				}
			];

			squadMessages.update(current => ({
				...current,
				[squadId]: sampleMessages
			}));

			// Sample projects
			const sampleProjects: SquadProject[] = [
				{
					id: '1',
					squadId: squad.id,
					title: 'Gold Trading Strategy Backtest',
					description: 'Collaborative backtesting of our gold trading strategies using historical data',
					goals: ['Test strategy performance', 'Identify optimization opportunities', 'Document findings'],
					milestones: [
						{
							id: '1',
							title: 'Data Collection',
							description: 'Gather 2 years of gold price data',
							dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
							completed: true,
							completedBy: 'user1',
							completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
						},
						{
							id: '2',
							title: 'Strategy Implementation',
							description: 'Code the trading strategy logic',
							dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
							completed: false
						}
					],
					assignedMembers: ['user1', 'user2', 'user3'],
					startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
					targetDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
					status: 'Active',
					progress: 35,
					resources: [],
					updates: []
				}
			];

			squadProjects.update(current => ({
				...current,
				[squadId]: sampleProjects
			}));

			// Sample events
			const sampleEvents: SquadEvent[] = [
				{
					id: '1',
					squadId: squad.id,
					title: 'Weekly Gold Market Review',
					description: 'Review this week\'s gold trades and discuss upcoming opportunities',
					type: 'meeting',
					startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
					endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
					timezone: squad.timezone,
					isVirtual: true,
					meetingLink: 'https://meet.example.com/gold-review',
					organizer: squad.leaderId,
					attendees: ['user1', 'user2', 'user3'],
					maxAttendees: squad.maxMembers,
					isRecurring: true,
					recurrencePattern: 'Weekly',
					reminders: [],
					agenda: ['Review last week\'s trades', 'Analyze current market conditions', 'Plan next week\'s strategy'],
					notes: '',
					recordings: []
				}
			];

			squadEvents.update(current => ({
				...current,
				[squadId]: sampleEvents
			}));
		}
	});

	function handleJoinSquad() {
		if (squad) {
			if (squad.privacy === 'Open') {
				joinSquad(squad.id, 'current-user-id');
				isJoined = true;
			} else {
				applyToSquad(squad.id, 'current-user-id', 'I would like to join this squad to improve my trading skills.');
			}
		}
	}

	function handleLeaveSquad() {
		if (squad) {
			leaveSquad(squad.id, 'current-user-id');
			isJoined = false;
		}
	}

	function handleSendMessage() {
		if (newMessage.trim() && squad) {
			sendSquadMessage(squad.id, {
				squadId: squad.id,
				authorId: 'current-user-id',
				content: newMessage.trim(),
				type: 'text',
				reactions: {},
				replies: [],
				isPinned: false,
				tags: [],
				attachments: []
			});
			newMessage = '';
		}
	}

	function getRoleIcon(role: string) {
		switch (role) {
			case 'Leader': return Crown;
			case 'Moderator': return Shield;
			case 'Active Member': return Star;
			default: return Users;
		}
	}

	function getRoleColor(role: string) {
		switch (role) {
			case 'Leader': return 'text-primary';
			case 'Moderator': return 'text-secondary';
			case 'Active Member': return 'text-blue-500';
			default: return 'text-muted-foreground';
		}
	}

	function getPrivacyIcon(privacy: string) {
		switch (privacy) {
			case 'Open': return Eye;
			case 'Invite-Only': return UserPlus;
			case 'Application-Required': return CheckCircle;
			case 'Private': return Lock;
			default: return Globe;
		}
	}

	function getPrivacyColor(privacy: string) {
		switch (privacy) {
			case 'Open': return 'bg-primary/10 text-primary';
			case 'Invite-Only': return 'bg-secondary/10 text-secondary';
			case 'Application-Required': return 'bg-orange-500/10 text-orange-500';
			case 'Private': return 'bg-red-500/10 text-red-500';
			default: return 'bg-muted text-muted-foreground';
		}
	}
</script>

{#if squad}
	<div class="min-h-screen bg-background">
		<!-- Header -->
		<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
			<div class="container-max mx-auto px-6">
				<div class="flex items-center justify-between h-16">
					<div class="flex items-center space-x-4">
						<Button variant="ghost" size="sm" on:click={onBack}>
							<ArrowLeft class="w-4 h-4 mr-2" />
							Back to Squads
						</Button>
						<div class="flex items-center space-x-3">
							<div class="bg-secondary/10 p-2 rounded-lg">
								<Shield class="w-6 h-6 text-secondary" />
							</div>
							<div>
								<h1 class="text-xl font-bold gradient-text">{squad.name}</h1>
								<p class="text-sm text-foreground/70">{squad.currentMembers} members • {squad.category}</p>
							</div>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<Badge class="{getPrivacyColor(squad.privacy)}">
							<svelte:component this={getPrivacyIcon(squad.privacy)} class="w-3 h-3 mr-1" />
							{squad.privacy}
						</Badge>
						{#if isJoined}
							<Button variant="outline" size="sm" on:click={handleLeaveSquad}>
								<UserMinus class="w-4 h-4 mr-2" />
								Leave Squad
							</Button>
						{:else}
							<Button size="sm" on:click={handleJoinSquad} class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<UserPlus class="w-4 h-4 mr-2" />
								{squad.privacy === 'Open' ? 'Join Squad' : 'Apply to Join'}
							</Button>
						{/if}
						<Button variant="outline" size="sm" on:click={onLogout}>
							<LogOut class="w-4 h-4 mr-2" />
							Exit Portal
						</Button>
					</div>
				</div>
			</div>
		</header>

		<div class="container-max mx-auto px-6 py-8">
			<Tabs bind:value={activeTab} class="space-y-6">
				<TabsList class="grid w-full grid-cols-6 bg-muted/20">
					<TabsTrigger value="overview" class="flex items-center space-x-2">
						<Eye class="w-4 h-4" />
						<span>Overview</span>
					</TabsTrigger>
					<TabsTrigger value="discussion" class="flex items-center space-x-2">
						<MessageCircle class="w-4 h-4" />
						<span>Discussion</span>
					</TabsTrigger>
					<TabsTrigger value="members" class="flex items-center space-x-2">
						<Users class="w-4 h-4" />
						<span>Members</span>
					</TabsTrigger>
					<TabsTrigger value="projects" class="flex items-center space-x-2">
						<FolderOpen class="w-4 h-4" />
						<span>Projects</span>
					</TabsTrigger>
					<TabsTrigger value="events" class="flex items-center space-x-2">
						<Calendar class="w-4 h-4" />
						<span>Events</span>
					</TabsTrigger>
					<TabsTrigger value="resources" class="flex items-center space-x-2">
						<FileText class="w-4 h-4" />
						<span>Resources</span>
					</TabsTrigger>
				</TabsList>

				<!-- Overview Tab -->
				<TabsContent value="overview" class="space-y-6">
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<!-- Main Info -->
						<div class="lg:col-span-2 space-y-6">
							<Card class="military-card">
								<CardHeader>
									<CardTitle>About This Squad</CardTitle>
								</CardHeader>
								<CardContent>
									<p class="text-foreground/80 leading-relaxed mb-6">{squad.description}</p>
									
									{#if squad.goals.length > 0}
										<div class="mb-6">
											<h4 class="font-semibold mb-3">Squad Goals</h4>
											<div class="space-y-2">
												{#each squad.goals as goal}
													<div class="flex items-center space-x-2">
														<Target class="w-4 h-4 text-primary" />
														<span class="text-sm">{goal}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									{#if squad.focusAreas.length > 0}
										<div class="mb-6">
											<h4 class="font-semibold mb-3">Focus Areas</h4>
											<div class="flex flex-wrap gap-2">
												{#each squad.focusAreas as area}
													<Badge variant="outline" class="text-xs">{area}</Badge>
												{/each}
											</div>
										</div>
									{/if}

									{#if squad.requirements.length > 0}
										<div class="mb-6">
											<h4 class="font-semibold mb-3">Requirements</h4>
											<div class="space-y-2">
												{#each squad.requirements as requirement}
													<div class="flex items-center space-x-2">
														<CheckCircle class="w-4 h-4 text-orange-500" />
														<span class="text-sm">{requirement}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									{#if squad.rules.length > 0}
										<div>
											<h4 class="font-semibold mb-3">Squad Rules</h4>
											<div class="space-y-2">
												{#each squad.rules as rule}
													<div class="flex items-center space-x-2">
														<Shield class="w-4 h-4 text-secondary" />
														<span class="text-sm">{rule}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</CardContent>
							</Card>

							<!-- Recent Activity -->
							<Card class="military-card">
								<CardHeader>
									<CardTitle>Recent Activity</CardTitle>
								</CardHeader>
								<CardContent>
									<div class="space-y-4">
										<div class="flex items-start space-x-3">
											<div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
												<MessageCircle class="w-4 h-4 text-primary" />
											</div>
											<div>
												<p class="text-sm font-medium">New discussion started</p>
												<p class="text-xs text-muted-foreground">2 hours ago</p>
											</div>
										</div>
										<div class="flex items-start space-x-3">
											<div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
												<UserPlus class="w-4 h-4 text-secondary" />
											</div>
											<div>
												<p class="text-sm font-medium">New member joined</p>
												<p class="text-xs text-muted-foreground">1 day ago</p>
											</div>
										</div>
										<div class="flex items-start space-x-3">
											<div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
												<Award class="w-4 h-4 text-primary" />
											</div>
											<div>
												<p class="text-sm font-medium">Squad achievement unlocked</p>
												<p class="text-xs text-muted-foreground">3 days ago</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<!-- Sidebar -->
						<div class="space-y-6">
							<!-- Squad Stats -->
							<Card class="military-card">
								<CardHeader>
									<CardTitle class="text-lg">Squad Stats</CardTitle>
								</CardHeader>
								<CardContent class="space-y-4">
									<div class="flex justify-between">
										<span class="text-sm text-muted-foreground">Members:</span>
										<span class="font-semibold">{squad.currentMembers}/{squad.maxMembers}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-sm text-muted-foreground">Activity Level:</span>
										<Badge class="text-xs">{squad.activityLevel}</Badge>
									</div>
									<div class="flex justify-between">
										<span class="text-sm text-muted-foreground">Skill Level:</span>
										<Badge class="text-xs">{squad.skillLevel}</Badge>
									</div>
									<div class="flex justify-between">
										<span class="text-sm text-muted-foreground">Created:</span>
										<span class="text-sm">{squad.createdAt.toLocaleDateString()}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-sm text-muted-foreground">Last Active:</span>
										<span class="text-sm">{squad.lastActivity.toLocaleDateString()}</span>
									</div>
								</CardContent>
							</Card>

							<!-- Quick Actions -->
							<Card class="military-card">
								<CardHeader>
									<CardTitle class="text-lg">Quick Actions</CardTitle>
								</CardHeader>
								<CardContent class="space-y-3">
									{#if isJoined}
										<Button class="w-full" variant="outline">
											<MessageCircle class="w-4 h-4 mr-2" />
											Start Discussion
										</Button>
										<Button class="w-full" variant="outline">
											<Calendar class="w-4 h-4 mr-2" />
											Schedule Event
										</Button>
										<Button class="w-full" variant="outline">
											<UserPlus class="w-4 h-4 mr-2" />
											Invite Members
										</Button>
									{:else}
										<Button class="w-full" on:click={handleJoinSquad}>
											<UserPlus class="w-4 h-4 mr-2" />
											{squad.privacy === 'Open' ? 'Join Squad' : 'Apply to Join'}
										</Button>
									{/if}
								</CardContent>
							</Card>

							<!-- Tags -->
							{#if squad.tags.length > 0}
								<Card class="military-card">
									<CardHeader>
										<CardTitle class="text-lg">Tags</CardTitle>
									</CardHeader>
									<CardContent>
										<div class="flex flex-wrap gap-2">
											{#each squad.tags as tag}
												<Badge variant="outline" class="text-xs">#{tag}</Badge>
											{/each}
										</div>
									</CardContent>
								</Card>
							{/if}
						</div>
					</div>
				</TabsContent>

				<!-- Discussion Tab -->
				<TabsContent value="discussion" class="space-y-6">
					{#if isJoined}
						<!-- Message Input -->
						<Card class="military-card">
							<CardContent class="p-4">
								<div class="flex items-end space-x-3">
									<div class="flex-1">
										<Textarea
											placeholder="Share your thoughts with the squad..."
											bind:value={newMessage}
											rows={3}
											class="resize-none"
										/>
									</div>
									<div class="flex flex-col space-y-2">
										<Button size="sm" variant="outline">
											<Paperclip class="w-4 h-4" />
										</Button>
										<Button size="sm" on:click={handleSendMessage} disabled={!newMessage.trim()} class="bg-primary hover:bg-primary/90 text-primary-foreground">
											<Send class="w-4 h-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						<!-- Messages -->
						<div class="space-y-4">
							{#each messages as message}
								<Card class="military-card {message.isPinned ? 'border-primary/30' : ''}">
									<CardContent class="p-4">
										<div class="flex items-start space-x-3">
											<div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
												{message.authorId.slice(-2).toUpperCase()}
											</div>
											<div class="flex-1">
												<div class="flex items-center space-x-2 mb-2">
													<span class="font-semibold">User {message.authorId}</span>
													{#if message.authorId === squad.leaderId}
														<Badge class="bg-primary/10 text-primary text-xs">
															<Crown class="w-3 h-3 mr-1" />
															Leader
														</Badge>
													{/if}
													{#if message.isPinned}
														<Badge class="bg-secondary/10 text-secondary text-xs">Pinned</Badge>
													{/if}
													<span class="text-xs text-muted-foreground">{message.timestamp.toLocaleString()}</span>
												</div>
												<p class="text-sm text-foreground/80 mb-3">{message.content}</p>
												
												{#if message.tags.length > 0}
													<div class="flex flex-wrap gap-1 mb-3">
														{#each message.tags as tag}
															<Badge variant="outline" class="text-xs">#{tag}</Badge>
														{/each}
													</div>
												{/if}

												<!-- Reactions -->
												<div class="flex items-center space-x-4">
													<div class="flex items-center space-x-2">
														{#each Object.entries(message.reactions) as [emoji, userIds]}
															<button class="flex items-center space-x-1 px-2 py-1 bg-muted/20 rounded-full hover:bg-muted/40 transition-colors">
																<span>{emoji}</span>
																<span class="text-xs">{userIds.length}</span>
															</button>
														{/each}
														<Button variant="ghost" size="sm" class="h-6 px-2">
															<Smile class="w-3 h-3" />
														</Button>
													</div>
													<Button variant="ghost" size="sm" class="h-6 px-2 text-xs">
														Reply
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							{/each}
						</div>
					{:else}
						<div class="text-center py-12">
							<MessageCircle class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
							<h3 class="text-xl font-semibold mb-2">Join to Participate</h3>
							<p class="text-muted-foreground mb-6">Join this squad to access discussions and collaborate with members.</p>
							<Button on:click={handleJoinSquad} class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<UserPlus class="w-4 h-4 mr-2" />
								{squad.privacy === 'Open' ? 'Join Squad' : 'Apply to Join'}
							</Button>
						</div>
					{/if}
				</TabsContent>

				<!-- Members Tab -->
				<TabsContent value="members" class="space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-bold">Squad Members ({squad.currentMembers})</h3>
						{#if isJoined}
							<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<UserPlus class="w-4 h-4 mr-2" />
								Invite Members
							</Button>
						{/if}
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each members as member}
							<Card class="military-card">
								<CardContent class="p-4">
									<div class="flex items-center space-x-3 mb-4">
										<div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
											{member.userId.slice(-2).toUpperCase()}
										</div>
										<div>
											<div class="font-semibold">User {member.userId}</div>
											<div class="flex items-center space-x-2">
												<Badge class="text-xs {getRoleColor(member.role)}">
													<svelte:component this={getRoleIcon(member.role)} class="w-3 h-3 mr-1" />
													{member.role}
												</Badge>
												<Badge class="text-xs {member.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}">
													{member.status}
												</Badge>
											</div>
										</div>
									</div>

									<div class="space-y-2 text-xs">
										<div class="flex justify-between">
											<span class="text-muted-foreground">Joined:</span>
											<span>{member.joinedAt.toLocaleDateString()}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-muted-foreground">Contribution:</span>
											<span class="font-semibold text-primary">{member.contributionScore}%</span>
										</div>
										<div class="flex justify-between">
											<span class="text-muted-foreground">Last Active:</span>
											<span>{member.lastActive.toLocaleDateString()}</span>
										</div>
									</div>

									{#if member.mentorshipOffered.length > 0}
										<div class="mt-3">
											<div class="text-xs text-muted-foreground mb-1">Offers mentorship in:</div>
											<div class="flex flex-wrap gap-1">
												{#each member.mentorshipOffered as skill}
													<Badge variant="outline" class="text-xs">{skill}</Badge>
												{/each}
											</div>
										</div>
									{/if}
								</CardContent>
							</Card>
						{/each}
					</div>
				</TabsContent>

				<!-- Projects Tab -->
				<TabsContent value="projects" class="space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-bold">Squad Projects</h3>
						{#if isJoined}
							<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2" />
								New Project
							</Button>
						{/if}
					</div>

					{#if projects.length > 0}
						<div class="space-y-6">
							{#each projects as project}
								<Card class="military-card">
									<CardHeader>
										<div class="flex items-center justify-between">
											<CardTitle class="text-lg">{project.title}</CardTitle>
											<Badge class="{
												project.status === 'Active' ? 'bg-primary/10 text-primary' :
												project.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
												project.status === 'Planning' ? 'bg-orange-500/10 text-orange-500' :
												'bg-muted text-muted-foreground'
											}">
												{project.status}
											</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<p class="text-sm text-muted-foreground mb-4">{project.description}</p>
										
										<div class="space-y-4">
											<div>
												<div class="flex justify-between text-sm mb-2">
													<span>Progress</span>
													<span>{project.progress}%</span>
												</div>
												<Progress value={project.progress} class="h-2" />
											</div>

											<div class="grid grid-cols-2 gap-4 text-sm">
												<div>
													<span class="text-muted-foreground">Start Date:</span>
													<span class="ml-2">{project.startDate.toLocaleDateString()}</span>
												</div>
												<div>
													<span class="text-muted-foreground">Target Date:</span>
													<span class="ml-2">{project.targetDate.toLocaleDateString()}</span>
												</div>
											</div>

											<div>
												<div class="text-sm text-muted-foreground mb-2">Assigned Members:</div>
												<div class="flex -space-x-2">
													{#each project.assignedMembers.slice(0, 5) as memberId}
														<div class="w-8 h-8 bg-secondary/20 rounded-full border-2 border-background flex items-center justify-center">
															<span class="text-xs font-semibold">{memberId.slice(-2).toUpperCase()}</span>
														</div>
													{/each}
													{#if project.assignedMembers.length > 5}
														<div class="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center">
															<span class="text-xs">+{project.assignedMembers.length - 5}</span>
														</div>
													{/if}
												</div>
											</div>

											{#if project.milestones.length > 0}
												<div>
													<div class="text-sm text-muted-foreground mb-2">Milestones:</div>
													<div class="space-y-2">
														{#each project.milestones as milestone}
															<div class="flex items-center space-x-2">
																{#if milestone.completed}
																	<CheckCircle class="w-4 h-4 text-primary" />
																{:else}
																	<Clock class="w-4 h-4 text-muted-foreground" />
																{/if}
																<span class="text-sm {milestone.completed ? 'line-through text-muted-foreground' : ''}">{milestone.title}</span>
															</div>
														{/each}
													</div>
												</div>
											{/if}
										</div>
									</CardContent>
								</Card>
							{/each}
						</div>
					{:else}
						<div class="text-center py-12">
							<FolderOpen class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
							<h3 class="text-xl font-semibold mb-2">No Projects Yet</h3>
							<p class="text-muted-foreground mb-6">Start a collaborative project to work together towards common goals.</p>
							{#if isJoined}
								<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
									<Plus class="w-4 h-4 mr-2" />
									Create First Project
								</Button>
							{/if}
						</div>
					{/if}
				</TabsContent>

				<!-- Events Tab -->
				<TabsContent value="events" class="space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-bold">Squad Events</h3>
						{#if isJoined}
							<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2" />
								Schedule Event
							</Button>
						{/if}
					</div>

					{#if events.length > 0}
						<div class="space-y-4">
							{#each events as event}
								<Card class="military-card">
									<CardContent class="p-4">
										<div class="flex items-start justify-between">
											<div class="flex items-start space-x-3">
												<div class="bg-primary/10 p-2 rounded-lg">
													<Calendar class="w-5 h-5 text-primary" />
												</div>
												<div>
													<h4 class="font-semibold">{event.title}</h4>
													<p class="text-sm text-muted-foreground mb-2">{event.description}</p>
													<div class="flex items-center space-x-4 text-xs text-muted-foreground">
														<span>{event.startTime.toLocaleDateString()} at {event.startTime.toLocaleTimeString()}</span>
														<span>{event.attendees.length} attending</span>
														{#if event.isVirtual}
															<Badge class="bg-secondary/10 text-secondary text-xs">Virtual</Badge>
														{/if}
													</div>
												</div>
											</div>
											<Button size="sm" variant="outline">
												{event.attendees.includes('current-user-id') ? 'Attending' : 'Join Event'}
											</Button>
										</div>
									</CardContent>
								</Card>
							{/each}
						</div>
					{:else}
						<div class="text-center py-12">
							<Calendar class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
							<h3 class="text-xl font-semibold mb-2">No Events Scheduled</h3>
							<p class="text-muted-foreground mb-6">Schedule events to bring the squad together for meetings and activities.</p>
							{#if isJoined}
								<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
									<Plus class="w-4 h-4 mr-2" />
									Schedule First Event
								</Button>
							{/if}
						</div>
					{/if}
				</TabsContent>

				<!-- Resources Tab -->
				<TabsContent value="resources" class="space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-bold">Squad Resources</h3>
						{#if isJoined}
							<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2" />
								Add Resource
							</Button>
						{/if}
					</div>

					<div class="text-center py-12">
						<FileText class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
						<h3 class="text-xl font-semibold mb-2">No Resources Yet</h3>
						<p class="text-muted-foreground mb-6">Share documents, links, and resources with your squad members.</p>
						{#if isJoined}
							<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2" />
								Add First Resource
							</Button>
						{/if}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-background flex items-center justify-center">
		<div class="text-center">
			<AlertCircle class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
			<h2 class="text-xl font-bold mb-2">Squad Not Found</h2>
			<p class="text-muted-foreground mb-6">The squad you're looking for doesn't exist or has been removed.</p>
			<Button on:click={onBack} variant="outline">
				<ArrowLeft class="w-4 h-4 mr-2" />
				Back to Squads
			</Button>
		</div>
	</div>
{/if}