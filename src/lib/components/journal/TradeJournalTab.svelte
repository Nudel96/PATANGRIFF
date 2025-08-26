<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Select } from '$lib/components/ui';
	import { Plus, Search, Filter, Edit, Trash2, Play, Square } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Trade } from '$lib/types/trading';
	import { TRADE_SETUPS } from '$lib/types/trading';
	import TradeForm from './TradeForm.svelte';

	const dispatch = createEventDispatcher<{
		addTrade: Trade;
		updateTrade: Trade;
		deleteTrade: string;
		openTrade: string;
		closeTrade: { tradeId: string; exitPrice: number; exitReason: string };
	}>();

	export const trades: Trade[] = [];
	export let filteredTrades: Trade[];
	export let searchTerm: string;
	export let filterSetup: string;
	export let showTradeForm: boolean;
	export let selectedTrade: Trade | null;

	function handleNewTrade() {
		selectedTrade = null;
		showTradeForm = true;
	}

	function handleEditTrade(trade: Trade) {
		selectedTrade = trade;
		showTradeForm = true;
	}

	function handleDeleteTrade(tradeId: string) {
		if (confirm('Are you sure you want to delete this trade?')) {
			dispatch('deleteTrade', tradeId);
		}
	}

	function handleOpenTrade(tradeId: string) {
		dispatch('openTrade', tradeId);
	}

	function handleCloseTrade(tradeId: string) {
		const exitPrice = prompt('Enter exit price:');
		const exitReason = prompt('Enter exit reason:');
		
		if (exitPrice && exitReason) {
			dispatch('closeTrade', {
				tradeId,
				exitPrice: parseFloat(exitPrice),
				exitReason
			});
		}
	}

	function handleTradeSubmit(event: CustomEvent<Trade>) {
		if (selectedTrade) {
			dispatch('updateTrade', event.detail);
		} else {
			dispatch('addTrade', event.detail);
		}
		showTradeForm = false;
		selectedTrade = null;
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'pending': return 'bg-yellow-500/10 text-yellow-500';
			case 'open': return 'bg-primary/10 text-primary';
			case 'closed': return 'bg-muted text-muted-foreground';
			case 'invalidated': return 'bg-destructive/10 text-destructive';
			default: return 'bg-muted text-muted-foreground';
		}
	}

	function getDirectionColor(direction: string): string {
		return direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary';
	}

	function getRColor(actualR?: number): string {
		if (!actualR) return 'text-muted-foreground';
		return actualR > 0 ? 'text-primary' : 'text-destructive';
	}
</script>

<div class="space-y-6">
	<!-- Header and Controls -->
	<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
		<h2 class="text-2xl font-bold">Trade Journal</h2>
		<Button on:click={handleNewTrade} class="bg-primary hover:bg-primary/90 text-primary-foreground">
			<Plus class="w-4 h-4 mr-2"></Plus>
			New Trade
		</Button>
	</div>

	<!-- Filters -->
	<div class="flex flex-col sm:flex-row gap-4">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"></Search>
			<Input
				placeholder="Search trades by instrument or notes..."
				bind:value={searchTerm}
				class="pl-10"
			/>
		</div>
		<div class="flex items-center space-x-2">
			<Filter class="w-4 h-4 text-muted-foreground"></Filter>
			<Select bind:value={filterSetup}>
				<option value="all">All Setups</option>
				{#each TRADE_SETUPS as setup}
					<option value={setup}>{setup.charAt(0).toUpperCase() + setup.slice(1)}</option>
				{/each}
			</Select>
		</div>
	</div>

	<!-- Trade Form Modal -->
	{#if showTradeForm}
		<TradeForm 
			trade={selectedTrade}
			on:submit={handleTradeSubmit}
			on:cancel={() => { showTradeForm = false; selectedTrade = null; }}
		/>
	{/if}

	<!-- Trades List -->
	<div class="space-y-4">
		{#each filteredTrades as trade (trade.id)}
			<Card class="military-card">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-3">
							<Badge class={getDirectionColor(trade.direction)}>
								{trade.direction.toUpperCase()}
							</Badge>
							<span class="font-semibold text-lg">{trade.instrument}</span>
							<Badge variant="outline">{trade.setup}</Badge>
							<Badge class={getStatusColor(trade.status)}>
								{trade.status}
							</Badge>
						</div>
						<div class="flex items-center space-x-2">
							{#if trade.status === 'pending'}
								<Button size="sm" variant="outline" on:click={() => handleOpenTrade(trade.id)}>
									<Play class="w-3 h-3 mr-1"></Play>
									Open
								</Button>
							{/if}
							{#if trade.status === 'open'}
								<Button size="sm" variant="outline" on:click={() => handleCloseTrade(trade.id)}>
									<Square class="w-3 h-3 mr-1"></Square>
									Close
								</Button>
							{/if}
							<Button size="sm" variant="ghost" on:click={() => handleEditTrade(trade)}>
								<Edit class="w-3 h-3"></Edit>
							</Button>
							<Button size="sm" variant="ghost" on:click={() => handleDeleteTrade(trade.id)}>
								<Trash2 class="w-3 h-3"></Trash2>
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
						<div>
							<div class="text-sm text-muted-foreground">Entry Price</div>
							<div class="font-semibold">{trade.entryPrice.toFixed(5)}</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Stop Loss</div>
							<div class="font-semibold">{trade.stopPrice.toFixed(5)}</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Target</div>
							<div class="font-semibold">{trade.targetPrice?.toFixed(5) || 'N/A'}</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Risk Amount</div>
							<div class="font-semibold">${trade.riskAmount}</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
						<div>
							<div class="text-sm text-muted-foreground">Planned R:R</div>
							<div class="font-semibold">1:{trade.plannedRR.toFixed(1)}</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Actual R</div>
							<div class="font-semibold {getRColor(trade.actualR)}">
								{trade.actualR ? `${trade.actualR > 0 ? '+' : ''}${trade.actualR.toFixed(2)}R` : 'Open'}
							</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Session</div>
							<div class="font-semibold">{trade.session}</div>
						</div>
						<div>
							<div class="text-sm text-muted-foreground">Checklist Score</div>
							<div class="font-semibold text-{trade.checklistScore >= 80 ? 'primary' : trade.checklistScore >= 60 ? 'yellow-500' : 'destructive'}">
								{trade.checklistScore}%
							</div>
						</div>
					</div>

					{#if trade.macroEvents.length > 0}
						<div class="mb-4">
							<div class="text-sm text-muted-foreground mb-2">Macro Events</div>
							<div class="flex flex-wrap gap-2">
								{#each trade.macroEvents as event}
									<Badge variant="outline" class="text-xs">{event}</Badge>
								{/each}
							</div>
						</div>
					{/if}

					{#if trade.notes}
						<div class="mb-4">
							<div class="text-sm text-muted-foreground mb-2">Notes</div>
							<p class="text-sm bg-muted/20 p-3 rounded-lg">{trade.notes}</p>
						</div>
					{/if}

					{#if trade.exitReason}
						<div class="mb-4">
							<div class="text-sm text-muted-foreground mb-2">Exit Reason</div>
							<p class="text-sm bg-muted/20 p-3 rounded-lg">{trade.exitReason}</p>
						</div>
					{/if}

					<div class="flex items-center justify-between text-xs text-muted-foreground">
						<span>Created: {trade.createdAt.toLocaleDateString()} {trade.createdAt.toLocaleTimeString()}</span>
						{#if trade.closedAt}
							<span>Closed: {trade.closedAt.toLocaleDateString()} {trade.closedAt.toLocaleTimeString()}</span>
						{/if}
					</div>
				</CardContent>
			</Card>
		{/each}

		{#if filteredTrades.length === 0}
			<Card class="military-card">
				<CardContent class="text-center py-12">
					<FileText class="w-12 h-12 text-muted-foreground mx-auto mb-4"></FileText>
					<h3 class="text-lg font-semibold mb-2">No trades found</h3>
					<p class="text-muted-foreground mb-4">
						{searchTerm || filterSetup !== 'all'
							? 'Try adjusting your search or filter criteria.'
							: 'Start by adding your first trade.'}
					</p>
					{#if !searchTerm && filterSetup === 'all'}
						<Button on:click={handleNewTrade} class="bg-primary hover:bg-primary/90 text-primary-foreground">
							<Plus class="w-4 h-4 mr-2"></Plus>
							Add Your First Trade
						</Button>
					{/if}
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
