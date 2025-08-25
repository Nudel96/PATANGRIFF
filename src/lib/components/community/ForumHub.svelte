<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { 
		MessageCircle, 
		Plus, 
		Star, 
		Clock, 
		Eye,
		ThumbsUp,
		Pin,
		Lock,
		TrendingUp,
		Target,
		Coins
	} from 'lucide-svelte';
	import type { User, ForumCategory, ForumPost } from '$lib/types/community';
	import { SAMPLE_FORUM_CATEGORIES } from '$lib/types/community';

	export let currentUser: User;

	let activeView: 'categories' | 'category' | 'post' | 'create' = 'categories';
	let selectedCategory: string | null = null;
	let selectedPost: string | null = null;

	// Sample forum data
	let forumCategories: ForumCategory[] = SAMPLE_FORUM_CATEGORIES;
	
	let featuredPosts: ForumPost[] = [
		{
			id: '1',
			title: 'Gold Analysis: Key Levels to Watch This Week',
			content: 'Comprehensive analysis of gold price action and key technical levels...',
			authorId: 'user1',
			author: {
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
			categoryId: 'gold-desk',
			createdAt: new Date('2024-01-15T10:30:00'),
			updatedAt: new Date('2024-01-15T10:30:00'),
			likes: 45,
			replies: 23,
			views: 234,
			isPinned: false,
			isFeatured: true,
			isLocked: false,
			tags: ['gold', 'technical-analysis', 'weekly-outlook'],
			lastReplyAt: new Date('2024-01-15T15:45:00'),
			lastReplyBy: 'user2'
		},
		{
			id: '2',
			title: 'EUR/USD: ECB Decision Impact Analysis',
			content: 'Breaking down the ECB decision and its impact on EUR/USD...',
			authorId: 'user1',
			author: {
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
			categoryId: 'fx-majors',
			createdAt: new Date('2024-01-14T14:20:00'),
			updatedAt: new Date('2024-01-14T14:20:00'),
			likes: 32,
			replies: 18,
			views: 187,
			isPinned: true,
			isFeatured: true,
			isLocked: false,
			tags: ['eur-usd', 'ecb', 'fundamental-analysis'],
			lastReplyAt: new Date('2024-01-14T18:30:00'),
			lastReplyBy: 'user3'
		}
	];

	let recentPosts: ForumPost[] = [
		{
			id: '3',
			title: 'Weekly Trading Plan Discussion',
			content: 'Share your trading plans for this week...',
			authorId: 'user2',
			author: {
				id: 'user2',
				username: 'forexnewbie',
				displayName: 'Forex Newbie',
				avatar: 'FN',
				level: 3,
				reputation: 145,
				joinDate: new Date('2024-01-01'),
				lastActive: new Date(),
				tradingExperience: 'Beginner',
				specialties: ['Learning'],
				achievements: [],
				stats: {
					postsCount: 23,
					likesReceived: 45,
					likesGiven: 67,
					squadsJoined: 2,
					squadsLed: 0,
					helpfulAnswers: 3,
					tradingWins: 12,
					tradingLosses: 18
				}
			},
			categoryId: 'general',
			createdAt: new Date('2024-01-15T09:15:00'),
			updatedAt: new Date('2024-01-15T09:15:00'),
			likes: 12,
			replies: 8,
			views: 67,
			isPinned: false,
			isFeatured: false,
			isLocked: false,
			tags: ['weekly-plan', 'discussion'],
			lastReplyAt: new Date('2024-01-15T11:20:00'),
			lastReplyBy: 'user4'
		}
	];

	function handleCategorySelect(categoryId: string) {
		selectedCategory = categoryId;
		activeView = 'category';
	}

	function handlePostSelect(postId: string) {
		selectedPost = postId;
		activeView = 'post';
	}

	function handleCreatePost() {
		activeView = 'create';
	}

	function getIconComponent(iconName: string) {
		switch (iconName) {
			case 'MessageCircle': return MessageCircle;
			case 'Coins': return Coins;
			case 'TrendingUp': return TrendingUp;
			case 'Target': return Target;
			default: return MessageCircle;
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
</script>

<div class="space-y-6">
	{#if activeView === 'categories'}
		<!-- Featured Posts -->
		<div class="mb-8">
			<h3 class="text-xl font-bold mb-4 flex items-center space-x-2">
				<Star class="w-5 h-5 text-primary" />
				<span>Featured Discussions</span>
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each featuredPosts as post}
					<Card class="military-card cursor-pointer hover:border-primary/30" on:click={() => handlePostSelect(post.id)}>
						<CardHeader>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<CardTitle class="text-lg mb-2 line-clamp-2">{post.title}</CardTitle>
									<div class="flex items-center space-x-2 mb-2">
										<div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
											<span class="text-xs font-semibold text-primary">{post.author.avatar}</span>
										</div>
										<span class="text-sm text-muted-foreground">{post.author.displayName}</span>
										<Badge variant="outline" class="text-xs">{post.author.tradingExperience}</Badge>
									</div>
									<div class="flex items-center space-x-4 text-sm text-muted-foreground">
										<span class="flex items-center space-x-1">
											<ThumbsUp class="w-4 h-4" />
											<span>{post.likes}</span>
										</span>
										<span class="flex items-center space-x-1">
											<MessageCircle class="w-4 h-4" />
											<span>{post.replies}</span>
										</span>
										<span class="flex items-center space-x-1">
											<Eye class="w-4 h-4" />
											<span>{post.views}</span>
										</span>
									</div>
								</div>
								<div class="flex flex-col items-end space-y-1">
									{#if post.isPinned}
										<Pin class="w-4 h-4 text-primary" />
									{/if}
									{#if post.isLocked}
										<Lock class="w-4 h-4 text-muted-foreground" />
									{/if}
								</div>
							</div>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Forum Categories -->
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<h3 class="text-xl font-bold">Forum Categories</h3>
				<Button on:click={handleCreatePost} class="bg-primary hover:bg-primary/90 text-primary-foreground">
					<Plus class="w-4 h-4 mr-2" />
					New Post
				</Button>
			</div>
			
			<div class="space-y-4">
				{#each forumCategories as category}
					<Card class="military-card cursor-pointer hover:border-primary/30" on:click={() => handleCategorySelect(category.id)}>
						<CardContent class="p-6">
							<div class="flex items-center justify-between">
								<div class="flex items-start space-x-4 flex-1">
									<div class="bg-primary/10 p-3 rounded-xl">
										<svelte:component this={getIconComponent(category.icon)} class="w-6 h-6 {category.color}" />
									</div>
									<div class="flex-1">
										<div class="flex items-center space-x-2 mb-2">
											<h3 class="text-lg font-bold">{category.name}</h3>
											{#if category.isRestricted}
												<Badge variant="outline" class="text-xs">
													Level {category.requiredLevel}+ Required
												</Badge>
											{/if}
										</div>
										<p class="text-muted-foreground mb-3">{category.description}</p>
										<div class="flex items-center space-x-4 text-sm text-muted-foreground">
											<span>{category.postCount} posts</span>
											<span>Last activity: {formatTimeAgo(category.lastActivity)}</span>
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="text-2xl font-bold text-primary">{category.postCount}</div>
									<div class="text-sm text-muted-foreground">Posts</div>
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2">
						<Clock class="w-5 h-5 text-secondary" />
						<span>Recent Posts</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each recentPosts as post}
							<div class="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer" on:click={() => handlePostSelect(post.id)}>
								<div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
									<span class="text-xs font-semibold text-primary">{post.author.avatar}</span>
								</div>
								<div class="flex-1 min-w-0">
									<h4 class="font-medium text-sm line-clamp-2 mb-1">{post.title}</h4>
									<div class="flex items-center space-x-2 text-xs text-muted-foreground">
										<span>{post.author.displayName}</span>
										<span>•</span>
										<span>{formatTimeAgo(post.createdAt)}</span>
										<span>•</span>
										<span>{post.replies} replies</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>

			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2">
						<Star class="w-5 h-5 text-primary" />
						<span>Top Contributors</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						<div class="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
							<div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
								<span class="text-xs font-semibold text-primary">GM</span>
							</div>
							<div class="flex-1">
								<div class="font-medium text-sm">Gold Master</div>
								<div class="text-xs text-muted-foreground">2,450 reputation • 156 posts</div>
							</div>
							<Badge class="bg-primary/20 text-primary">Expert</Badge>
						</div>
						<div class="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
							<div class="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
								<span class="text-xs font-semibold text-secondary">FN</span>
							</div>
							<div class="flex-1">
								<div class="font-medium text-sm">Forex Newbie</div>
								<div class="text-xs text-muted-foreground">145 reputation • 23 posts</div>
							</div>
							<Badge class="bg-secondary/20 text-secondary">Beginner</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	{:else if activeView === 'category'}
		<!-- Category View - Placeholder -->
		<div class="text-center py-12">
			<MessageCircle class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
			<h3 class="text-lg font-semibold mb-2">Category View</h3>
			<p class="text-muted-foreground mb-4">
				Category posts view will be implemented here.
			</p>
			<Button on:click={() => activeView = 'categories'}>
				Back to Categories
			</Button>
		</div>
	{:else if activeView === 'post'}
		<!-- Post Detail View - Placeholder -->
		<div class="text-center py-12">
			<MessageCircle class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
			<h3 class="text-lg font-semibold mb-2">Post Detail View</h3>
			<p class="text-muted-foreground mb-4">
				Individual post view will be implemented here.
			</p>
			<Button on:click={() => activeView = 'categories'}>
				Back to Categories
			</Button>
		</div>
	{:else if activeView === 'create'}
		<!-- Create Post View - Placeholder -->
		<div class="text-center py-12">
			<Plus class="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
			<h3 class="text-lg font-semibold mb-2">Create New Post</h3>
			<p class="text-muted-foreground mb-4">
				Post creation form will be implemented here.
			</p>
			<Button on:click={() => activeView = 'categories'}>
				Back to Categories
			</Button>
		</div>
	{/if}
</div>
