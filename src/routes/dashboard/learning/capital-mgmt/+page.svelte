<script lang="ts">
	import { goto } from '$app/navigation';
	
	function handleBack() {
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Capital Management - PAT ANGRIFF</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-6 py-8">
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-3xl font-bold">Capital Management Learning</h1>
			<button 
				class="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
				on:click={handleBack}
			>
				← Back to Dashboard
			</button>
		</div>
		
		<div class="military-card p-8 text-center">
			<h2 class="text-2xl font-semibold mb-4">Capital Management Learning Component</h2>
			<p class="text-muted-foreground">
				This will be migrated from the React CapitalManagementLearning component.
				It will include risk management and money management strategies.
			</p>
		</div>
	</div>
</div>
