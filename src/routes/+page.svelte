<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import PositioningStatement from '$lib/components/PositioningStatement.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import FourPillars from '$lib/components/FourPillars.svelte';
	import PlatformTools from '$lib/components/PlatformTools.svelte';

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

	function handlePricing() {
		// Scroll to pricing section or navigate to pricing page
		const pricingSection = document.getElementById('pricing');
		if (pricingSection) {
			pricingSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>PAT ANGRIFF - Elite Trading Platform</title>
	<meta name="description" content="Transform from chart-watcher to market operator with PAT ANGRIFF's elite trading platform." />
</svelte:head>

<!-- Landing Page Content -->
<div class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<Header on:login={openLoginModal} />

	<!-- Hero Section -->
	<Hero on:login={openLoginModal} on:pricing={handlePricing} />

	<!-- Positioning Statement -->
	<PositioningStatement />

	<!-- Stats Section -->
	<Stats />

	<!-- Four Pillars Section -->
	<FourPillars on:startJourney={openLoginModal} />

	<!-- Platform Tools Section -->
	<PlatformTools on:accessPlatform={openLoginModal} />

	<!-- Placeholder for remaining sections -->
	<section class="section-padding bg-card/20" id="pricing">
		<div class="container-max mx-auto text-center">
			<h2 class="text-3xl font-bold mb-8">Additional Components</h2>
			<p class="text-muted-foreground">
				TrainingSection, Community, Pricing, and Footer components will be migrated next.
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
