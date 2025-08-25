<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, Textarea } from '$lib/components/ui';
	import { Plus, X, Calculator } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Trade } from '$lib/types/trading';
	import { TRADE_SETUPS, TRADING_SESSIONS, MACRO_EVENTS, getSetupChecklist, calculateChecklistScore } from '$lib/types/trading';

	const dispatch = createEventDispatcher<{
		submit: Trade;
		cancel: void;
	}>();

	export let trade: Trade | null = null;

	// Form state
	let formData = {
		instrument: '',
		direction: 'long' as 'long' | 'short',
		entryPrice: 0,
		stopPrice: 0,
		targetPrice: 0,
		riskAmount: 100,
		riskPercent: 1.0,
		session: 'London' as 'Asia' | 'London' | 'NY',
		setup: 'breakout',
		notes: '',
		macroEvents: [] as string[],
		redNewsNext15: false,
		atrPercentile: 50
	};

	// Initialize form with trade data if editing
	if (trade) {
		formData = {
			instrument: trade.instrument,
			direction: trade.direction,
			entryPrice: trade.entryPrice,
			stopPrice: trade.stopPrice,
			targetPrice: trade.targetPrice || 0,
			riskAmount: trade.riskAmount,
			riskPercent: trade.riskPercent,
			session: trade.session,
			setup: trade.setup,
			notes: trade.notes,
			macroEvents: [...trade.macroEvents],
			redNewsNext15: trade.redNewsNext15,
			atrPercentile: trade.atrPercentile || 50
		};
	}

	function calculateInitialRisk(): number {
		if (!formData.entryPrice || !formData.stopPrice) return 0;
		return Math.abs(formData.entryPrice - formData.stopPrice);
	}

	function calculatePlannedRR(): number {
		if (!formData.entryPrice || !formData.stopPrice || !formData.targetPrice) return 0;
		const risk = Math.abs(formData.entryPrice - formData.stopPrice);
		const reward = Math.abs(formData.targetPrice - formData.entryPrice);
		return risk > 0 ? reward / risk : 0;
	}

	function calculatePositionSize(): number {
		const risk = calculateInitialRisk();
		if (risk === 0 || !formData.riskAmount) return 0;
		return formData.riskAmount / risk;
	}

	function toggleMacroEvent(event: string) {
		if (formData.macroEvents.includes(event)) {
			formData.macroEvents = formData.macroEvents.filter(e => e !== event);
		} else {
			formData.macroEvents = [...formData.macroEvents, event];
		}
	}

	function handleSubmit() {
		const checklist = getSetupChecklist(formData.setup);
		
		const newTrade: Trade = {
			id: trade?.id || Date.now().toString(),
			date: trade?.date || new Date(),
			instrument: formData.instrument,
			direction: formData.direction,
			entryPrice: formData.entryPrice,
			stopPrice: formData.stopPrice,
			targetPrice: formData.targetPrice || undefined,
			exitPrice: trade?.exitPrice,
			quantity: calculatePositionSize(),
			riskAmount: formData.riskAmount,
			riskPercent: formData.riskPercent,
			plannedRR: calculatePlannedRR(),
			actualR: trade?.actualR,
			status: trade?.status || 'pending',
			session: formData.session,
			macroEvents: formData.macroEvents,
			redNewsNext15: formData.redNewsNext15,
			atrPercentile: formData.atrPercentile,
			beforeImage: trade?.beforeImage,
			afterImage: trade?.afterImage,
			mae: trade?.mae,
			mfe: trade?.mfe,
			highestPrice: trade?.highestPrice,
			lowestPrice: trade?.lowestPrice,
			notes: formData.notes,
			exitReason: trade?.exitReason,
			checklistScore: calculateChecklistScore(checklist),
			checklistItems: checklist,
			setup: formData.setup,
			mistakes: trade?.mistakes || [],
			partialCloses: trade?.partialCloses || [],
			createdAt: trade?.createdAt || new Date(),
			closedAt: trade?.closedAt
		};

		dispatch('submit', newTrade);
	}

	function handleCancel() {
		dispatch('cancel');
	}

	$: initialRisk = calculateInitialRisk();
	$: plannedRR = calculatePlannedRR();
	$: positionSize = calculatePositionSize();
</script>

<Card class="military-card">
	<CardHeader>
		<CardTitle class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<Plus class="w-5 h-5 text-primary" />
				<span>{trade ? 'Edit Trade' : 'New Trade Entry'}</span>
			</div>
			<Button variant="ghost" size="sm" on:click={handleCancel}>
				<X class="w-4 h-4" />
			</Button>
		</CardTitle>
	</CardHeader>
	<CardContent class="space-y-6">
		<!-- Basic Trade Info -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="space-y-2">
				<Label for="instrument">Instrument</Label>
				<Input
					id="instrument"
					placeholder="e.g., EURUSD"
					bind:value={formData.instrument}
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="direction">Direction</Label>
				<Select bind:value={formData.direction}>
					<option value="long">Long</option>
					<option value="short">Short</option>
				</Select>
			</div>
			<div class="space-y-2">
				<Label for="setup">Setup Type</Label>
				<Select bind:value={formData.setup}>
					{#each TRADE_SETUPS as setup}
						<option value={setup}>{setup.charAt(0).toUpperCase() + setup.slice(1)}</option>
					{/each}
				</Select>
			</div>
		</div>

		<!-- Price Levels -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="space-y-2">
				<Label for="entryPrice">Entry Price</Label>
				<Input
					id="entryPrice"
					type="number"
					step="0.00001"
					placeholder="1.08500"
					bind:value={formData.entryPrice}
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="stopPrice">Stop Loss</Label>
				<Input
					id="stopPrice"
					type="number"
					step="0.00001"
					placeholder="1.08200"
					bind:value={formData.stopPrice}
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="targetPrice">Target Price</Label>
				<Input
					id="targetPrice"
					type="number"
					step="0.00001"
					placeholder="1.09100"
					bind:value={formData.targetPrice}
				/>
			</div>
		</div>

		<!-- Risk Management -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="riskAmount">Risk Amount ($)</Label>
				<Input
					id="riskAmount"
					type="number"
					step="1"
					placeholder="100"
					bind:value={formData.riskAmount}
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="riskPercent">Risk Percent (%)</Label>
				<Input
					id="riskPercent"
					type="number"
					step="0.1"
					placeholder="1.0"
					bind:value={formData.riskPercent}
					required
				/>
			</div>
		</div>

		<!-- Calculated Values -->
		<div class="bg-muted/20 p-4 rounded-lg">
			<div class="flex items-center space-x-2 mb-3">
				<Calculator class="w-4 h-4 text-primary" />
				<span class="font-semibold">Calculated Values</span>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
				<div>
					<span class="text-muted-foreground">Initial Risk:</span>
					<span class="font-semibold ml-2">{initialRisk.toFixed(5)}</span>
				</div>
				<div>
					<span class="text-muted-foreground">Planned R:R:</span>
					<span class="font-semibold ml-2">1:{plannedRR.toFixed(2)}</span>
				</div>
				<div>
					<span class="text-muted-foreground">Position Size:</span>
					<span class="font-semibold ml-2">{positionSize.toFixed(0)} units</span>
				</div>
			</div>
		</div>

		<!-- Session and Market Context -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="session">Trading Session</Label>
				<Select bind:value={formData.session}>
					{#each TRADING_SESSIONS as session}
						<option value={session}>{session}</option>
					{/each}
				</Select>
			</div>
			<div class="space-y-2">
				<Label for="atrPercentile">ATR Percentile</Label>
				<Input
					id="atrPercentile"
					type="number"
					min="0"
					max="100"
					placeholder="50"
					bind:value={formData.atrPercentile}
				/>
			</div>
		</div>

		<!-- Macro Events -->
		<div class="space-y-2">
			<Label>Macro Events (Next 24h)</Label>
			<div class="flex flex-wrap gap-2">
				{#each MACRO_EVENTS as event}
					<button
						type="button"
						class="px-3 py-1 text-xs rounded-full border transition-colors {formData.macroEvents.includes(event) 
							? 'bg-primary text-primary-foreground border-primary' 
							: 'bg-background border-border hover:bg-muted'}"
						on:click={() => toggleMacroEvent(event)}
					>
						{event}
					</button>
				{/each}
			</div>
		</div>

		<!-- Red News Warning -->
		<div class="flex items-center space-x-2">
			<input
				type="checkbox"
				id="redNewsNext15"
				bind:checked={formData.redNewsNext15}
				class="rounded border-border"
			/>
			<Label for="redNewsNext15" class="text-sm">Red news event in next 15 minutes</Label>
		</div>

		<!-- Notes -->
		<div class="space-y-2">
			<Label for="notes">Trade Notes</Label>
			<Textarea
				id="notes"
				placeholder="Market context, setup details, confluence factors..."
				bind:value={formData.notes}
				rows={3}
			/>
		</div>

		<!-- Form Actions -->
		<div class="flex items-center justify-end space-x-4 pt-4 border-t border-border">
			<Button variant="outline" on:click={handleCancel}>
				Cancel
			</Button>
			<Button 
				on:click={handleSubmit}
				class="bg-primary hover:bg-primary/90 text-primary-foreground"
				disabled={!formData.instrument || !formData.entryPrice || !formData.stopPrice}
			>
				{trade ? 'Update Trade' : 'Create Trade'}
			</Button>
		</div>
	</CardContent>
</Card>
