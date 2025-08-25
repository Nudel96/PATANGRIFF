<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let isLoggedIn = false;
	let showLoginModal = false;

	// Subscribe to auth store
	authStore.subscribe(auth => {
		isLoggedIn = auth.isAuthenticated;
	});

	// Redirect to dashboard if already logged in
	$: if (isLoggedIn) {
		goto('/dashboard');
	}

	function handleLogin() {
		// Mock login - in real app this would authenticate with backend
		authStore.login({
			id: '1',
			name: 'Warrior',
			email: 'warrior@patangriff.com',
			avatar: ''
		});
	}

	function openLoginModal() {
		showLoginModal = true;
	}

	function closeLoginModal() {
		showLoginModal = false;
	}
</script>

<svelte:head>
	<title>PAT ANGRIFF - Elite Trading Platform</title>
	<meta name="description" content="Transform from chart-watcher to market operator with PAT ANGRIFF's elite trading platform." />
</svelte:head>

<!-- Landing Page Content -->
<div class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container mx-auto px-6">
			<div class="flex items-center justify-between h-16">
				<!-- Logo -->
				<div class="flex items-center space-x-3">
					<div class="relative">
						<div class="w-8 h-8 bg-primary rounded"></div>
					</div>
					<div class="flex flex-col">
						<span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
						<span class="text-sm text-muted-foreground -mt-1">ELITE TRADING</span>
					</div>
				</div>

				<!-- Login Button -->
				<button
					class="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 font-semibold"
					on:click={openLoginModal}
				>
					Login
				</button>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="section-padding">
		<div class="container-max mx-auto text-center">
			<h1 class="text-5xl md:text-7xl font-bold mb-8">
				Transform Into A <span class="gradient-text">Market Operator</span>
			</h1>
			<p class="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-12">
				Stop being a chart-watcher. Start being a market operator.
				PAT ANGRIFF delivers the elite training and tools you need to dominate the markets.
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
				<button
					class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-md"
					on:click={openLoginModal}
				>
					Access Warrior Portal →
				</button>
				<button class="border border-primary/20 hover:bg-primary/10 px-8 py-6 text-lg rounded-md">
					See Pricing Plans
				</button>
			</div>
		</div>
	</section>

	<!-- Placeholder for other sections -->
	<section class="section-padding bg-card/20">
		<div class="container-max mx-auto text-center">
			<h2 class="text-3xl font-bold mb-8">Landing Page Components</h2>
			<p class="text-muted-foreground">
				Hero, PositioningStatement, Stats, FourPillars, PlatformTools,
				TrainingSection, Community, Pricing, and Footer components will be migrated here.
			</p>
		</div>
	</section>
</div>

<!-- Login Modal -->
{#if showLoginModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" on:click={closeLoginModal}>
		<div class="bg-card p-8 rounded-lg max-w-md w-full mx-4" on:click|stopPropagation>
			<h2 class="text-2xl font-bold mb-6">Access Warrior Portal</h2>
			<p class="text-muted-foreground mb-6">
				This is a demo login. In the real application, this would connect to your authentication system.
			</p>
			<div class="flex gap-4">
				<button
					class="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 flex-1"
					on:click={handleLogin}
				>
					Demo Login
				</button>
				<button
					class="border border-border px-6 py-2 rounded-md hover:bg-muted/50"
					on:click={closeLoginModal}
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
