<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './ui/Button.svelte';
	import LoginModal from './LoginModal.svelte';
	import { Menu, X, Shield, TrendingUp, Users } from 'lucide-svelte';

	let isMenuOpen = false;
	let isScrolled = false;
	let isLoginModalOpen = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const navItems = [
		{ label: 'Platform', href: '#platform' },
		{ label: 'Education', href: '#education' },
		{ label: 'Community', href: '#community' },
		{ label: 'Pricing', href: '#pricing' },
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function openLoginModal() {
		isLoginModalOpen = true;
	}

	function closeLoginModal() {
		isLoginModalOpen = false;
	}
</script>

<header class="fixed top-0 w-full z-50 transition-all duration-300 {isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-transparent'}">
	<div class="container-max mx-auto px-6">
		<nav class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex items-center space-x-3">
				<div class="relative">
					<Shield class="w-8 h-8 text-primary" />
					<TrendingUp class="w-4 h-4 text-secondary absolute -top-1 -right-1" />
				</div>
				<div class="flex flex-col">
					<span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
					<span class="text-sm text-muted-foreground -mt-1">FORGE WARRIORS</span>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
					>
						{item.label}
					</a>
				{/each}
				<button class="justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex items-center space-x-2">
					<Users class="w-4 h-4" />
					<span>Community</span>
				</button>
			</div>

			<!-- CTA Buttons -->
			<div class="hidden md:flex items-center space-x-4">
				<Button variant="outline" size="sm" on:click={openLoginModal}>
					Login
				</Button>
				<Button size="sm" class="bg-primary hover:bg-primary/90 text-primary-foreground">
					Join Now
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2"
				on:click={toggleMenu}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</nav>

		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
				<div class="py-6 px-6 space-y-4">
					{#each navItems as item}
						<a
							href={item.href}
							class="block text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
							on:click={() => isMenuOpen = false}
						>
							{item.label}
						</a>
					{/each}
					<div class="pt-4 space-y-3">
						<Button variant="outline" class="w-full" on:click={openLoginModal}>
							Login
						</Button>
						<Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
							Join Now
						</Button>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<LoginModal bind:isOpen={isLoginModalOpen} />
</header>