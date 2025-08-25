<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui';
	import { Menu, X, Shield, TrendingUp } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ login: void }>();

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
		{ label: 'Education', href: '#education' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function openLoginModal() {
		isLoginModalOpen = true;
		dispatch('login');
	}

	function handleNavClick() {
		closeMenu();
	}
</script>

<header class="fixed top-0 w-full z-50 transition-all duration-300" 
        class:bg-background/95={isScrolled}
        class:backdrop-blur-md={isScrolled}
        class:border-b={isScrolled}
        class:border-border/50={isScrolled}
        class:bg-transparent={!isScrolled}>
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
			</div>

			<!-- Desktop Actions -->
			<div class="hidden md:flex items-center space-x-4">
				<Button variant="outline" on:click={openLoginModal}>
					Login
				</Button>
				<Button class="bg-primary hover:bg-primary/90 text-primary-foreground">
					Join Now
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
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
							on:click={handleNavClick}
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
</header>
