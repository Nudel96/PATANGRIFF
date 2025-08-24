<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import { logout } from '$lib/stores/auth';
	import { DollarSign, ArrowLeft, LogOut } from 'lucide-svelte';

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard/learning');
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container-max mx-auto px-6">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-4">
					<Button variant="ghost" size="sm" on:click={handleBack}>
						<ArrowLeft class="w-4 h-4 mr-2" />
						Back to Learning
					</Button>
					<div class="flex items-center space-x-3">
						<div class="bg-primary/10 p-2 rounded-lg">
							<DollarSign class="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Capital Management</h1>
							<p class="text-sm text-foreground/70">Financial Risk & Money Management</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		<div class="text-center py-12">
			<div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
				<DollarSign class="w-8 h-8 text-primary" />
			</div>
			<h2 class="text-2xl font-bold mb-2">Capital Management Learning</h2>
			<p class="text-muted-foreground">Risk and money management curriculum coming soon.</p>
		</div>
	</div>
</div>