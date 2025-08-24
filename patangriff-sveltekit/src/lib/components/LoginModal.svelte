<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './ui/Button.svelte';
	import Input from './ui/Input.svelte';
	import Badge from './ui/Badge.svelte';
	import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-svelte';
	import { login } from '$lib/stores/auth';

	export let isOpen = false;

	let showPassword = false;
	let email = '';
	let password = '';
	let isLoading = false;

	const dispatch = createEventDispatcher();

	async function handleLogin() {
		isLoading = true;
		
		// Simulate login process
		setTimeout(() => {
			isLoading = false;
			login({
				id: '1',
				email,
				displayName: 'Elite Warrior',
				membershipLevel: 'Operator'
			});
			isOpen = false;
			dispatch('login');
		}, 1500);
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	function closeModal() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<!-- Modal backdrop -->
	<div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" on:click={closeModal}>
		<!-- Modal content -->
		<div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-lg duration-200 rounded-lg" on:click|stopPropagation>
			<div class="text-center">
				<div class="flex items-center justify-center mb-4">
					<div class="relative">
						<Shield class="w-12 h-12 text-primary" />
						<div class="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
							<div class="w-2 h-2 bg-primary-foreground rounded-full" />
						</div>
					</div>
				</div>
				<h2 class="text-2xl font-bold gradient-text mb-2">WARRIOR ACCESS</h2>
				<Badge class="bg-primary/10 text-primary border-primary/20">
					Elite Operator Portal
				</Badge>
			</div>

			<form on:submit|preventDefault={handleLogin} class="space-y-6 mt-6">
				<div class="space-y-4">
					<div class="space-y-2">
						<label for="email" class="text-sm font-semibold">
							Email Address
						</label>
						<div class="relative">
							<Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								id="email"
								type="email"
								placeholder="warrior@example.com"
								bind:value={email}
								class="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<label for="password" class="text-sm font-semibold">
							Password
						</label>
						<div class="relative">
							<Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter your password"
								bind:value={password}
								class="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary/50"
								required
							/>
							<button
								type="button"
								on:click={togglePasswordVisibility}
								class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
							>
								{#if showPassword}
									<EyeOff class="w-4 h-4" />
								{:else}
									<Eye class="w-4 h-4" />
								{/if}
							</button>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-between text-sm">
					<label class="flex items-center space-x-2 cursor-pointer">
						<input type="checkbox" class="rounded border-border/50" />
						<span class="text-muted-foreground">Remember me</span>
					</label>
					<a href="#" class="text-primary hover:text-primary/80 font-medium">
						Forgot password?
					</a>
				</div>

				<Button
					type="submit"
					class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 group"
					disabled={isLoading}
				>
					{#if isLoading}
						<div class="flex items-center space-x-2">
							<div class="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
							<span>Accessing Warrior Portal...</span>
						</div>
					{:else}
						Enter the Arena
						<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
					{/if}
				</Button>

				<div class="text-center">
					<p class="text-sm text-muted-foreground">
						New to the brotherhood?{' '}
						<a href="#pricing" class="text-primary hover:text-primary/80 font-medium">
							Join the Warriors
						</a>
					</p>
				</div>
			</form>

			<div class="mt-6 pt-6 border-t border-border/50">
				<div class="text-center">
					<p class="text-xs text-muted-foreground mb-2">
						"Discipline. Strategy. Results."
					</p>
					<div class="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
						<span class="text-primary">●</span>
						<span>Secure Access</span>
						<span class="text-secondary">●</span>
						<span>Elite Community</span>
						<span class="text-primary">●</span>
						<span>Professional Tools</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}