<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import PositioningStatement from '$lib/components/PositioningStatement.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import FourPillars from '$lib/components/FourPillars.svelte';
	import PlatformTools from '$lib/components/PlatformTools.svelte';
	import TrainingSection from '$lib/components/TrainingSection.svelte';
	import Community from '$lib/components/Community.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Footer from '$lib/components/Footer.svelte';

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

	function handleNewsletterSubscribe(event: CustomEvent<{ email: string }>) {
		console.log('Newsletter subscription:', event.detail.email);
		// In real app, this would call an API to subscribe the user
	}

	function handleSocialLink(event: CustomEvent<{ platform: string }>) {
		console.log('Social link clicked:', event.detail.platform);
		// In real app, this would open the appropriate social media link
	}

	function handleFooterLink(event: CustomEvent<{ section: string; link: string }>) {
		console.log('Footer link clicked:', event.detail.section, event.detail.link);
		// In real app, this would navigate to the appropriate page
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

	<!-- Training Section -->
	<TrainingSection
		on:startTraining={openLoginModal}
		on:viewCurriculum={openLoginModal}
		on:unlockPotential={openLoginModal}
		on:scheduleAssessment={openLoginModal}
	/>

	<!-- Community Section -->
	<Community on:joinCommunity={openLoginModal} />

	<!-- Pricing Section -->
	<Pricing
		on:selectPlan={openLoginModal}
		on:contactSupport={openLoginModal}
	/>
</div>

<!-- Footer -->
<Footer
	on:subscribe={handleNewsletterSubscribe}
	on:socialLink={handleSocialLink}
	on:footerLink={handleFooterLink}
/>

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
