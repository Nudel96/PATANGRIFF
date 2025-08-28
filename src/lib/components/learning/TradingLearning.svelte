<script lang="ts">
	import BaseLearningTemplate from './BaseLearningTemplate.svelte';
	import { TRADING_MASTERY_CONFIG } from '$lib/config/pillarConfigs';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();
</script>

<BaseLearningTemplate 
	pillarConfig={TRADING_MASTERY_CONFIG}
	on:back={() => dispatch('back')}
	on:logout={() => dispatch('logout')}
/>
