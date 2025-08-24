<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import { logout } from '$lib/stores/auth';
	import { Brain, ArrowLeft, LogOut } from 'lucide-svelte';

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
						<div class="bg-secondary/10 p-2 rounded-lg">
							<Brain class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Trading Psychology</h1>
							<p class="text-sm text-foreground/70">Mental Framework & Discipline</p>
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
			<div class="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
				<Brain class="w-8 h-8 text-secondary" />
			</div>
			<h2 class="text-2xl font-bold mb-2">Trading Psychology Learning</h2>
			<p class="text-muted-foreground">Mental conditioning curriculum coming soon.</p>
		</div>
	</div>
</div>