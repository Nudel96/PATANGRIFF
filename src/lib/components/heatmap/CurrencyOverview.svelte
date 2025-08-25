<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { ArrowLeft, Calendar, TrendingUp, AlertCircle, Clock } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { CurrencyData, EconomicIndicator } from '$lib/types/heatmap';
	import { getBiasColor } from '$lib/types/heatmap';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let currency: string;
	export let currencyData: Record<string, CurrencyData>;

	$: data = currencyData[currency];
	$: indicators = data?.indicators || [];

	function handleClose() {
		dispatch('close');
	}

	function getImpactColor(impact: string): string {
		return impact === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary';
	}

	function getDirectionColor(direction: string): string {
		switch (direction) {
			case 'Higher positive': return 'text-primary';
			case 'Lower positive': return 'text-secondary';
			case 'Tighter positive': return 'text-primary';
			default: return 'text-muted-foreground';
		}
	}

	function getCategoryColor(category: string): string {
		switch (category) {
			case 'GDP': return 'bg-primary/10 text-primary';
			case 'PMI': return 'bg-secondary/10 text-secondary';
			case 'Retail Sales': return 'bg-primary/10 text-primary';
			case 'Inflation': return 'bg-destructive/10 text-destructive';
			case 'Employment Change': return 'bg-secondary/10 text-secondary';
			case 'Unemployment': return 'bg-destructive/10 text-destructive';
			case 'Interest Rates': return 'bg-primary/10 text-primary';
			default: return 'bg-muted/10 text-muted-foreground';
		}
	}

	function formatValue(value: number | undefined, unit: string): string {
		if (value === undefined) return 'N/A';
		return `${value}${unit}`;
	}

	function getChangeColor(change: number | undefined): string {
		if (change === undefined) return 'text-muted-foreground';
		return change > 0 ? 'text-primary' : change < 0 ? 'text-destructive' : 'text-muted-foreground';
	}

	function isUpcoming(date: Date | undefined): boolean {
		if (!date) return false;
		return date > new Date();
	}

	function formatDate(date: Date | undefined): string {
		if (!date) return 'TBD';
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<Button variant="ghost" size="sm" on:click={handleClose}>
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Heatmap
		</Button>
		<div class="text-sm text-muted-foreground">
			Last updated: {data?.lastUpdated.toLocaleString() || 'Unknown'}
		</div>
	</div>

	{#if data}
		<!-- Currency Header -->
		<Card class="military-card">
			<CardContent class="p-6">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<div class="text-4xl">{data.flag}</div>
						<div>
							<h1 class="text-3xl font-bold">{data.code}</h1>
							<p class="text-lg text-muted-foreground">{data.name}</p>
						</div>
					</div>
					<div class="text-right">
						<div class="text-3xl font-bold {data.overallScore > 0 ? 'text-primary' : 'text-destructive'}">
							{data.overallScore > 0 ? '+' : ''}{data.overallScore.toFixed(1)}
						</div>
						<Badge class={getBiasColor(data.bias)} class="text-lg px-4 py-2">
							{data.bias}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Economic Indicators -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<TrendingUp class="w-5 h-5 text-primary" />
					<span>Economic Indicators</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each indicators as indicator}
						<div class="p-4 bg-muted/10 rounded-lg">
							<div class="flex items-start justify-between mb-3">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<h3 class="font-semibold">{indicator.name}</h3>
										<Badge class={getCategoryColor(indicator.category)} class="text-xs">
											{indicator.category}
										</Badge>
										<Badge class={getImpactColor(indicator.impact)} class="text-xs">
											{indicator.impact} Impact
										</Badge>
									</div>
									<p class="text-sm text-muted-foreground mb-2">{indicator.description}</p>
									<div class="flex items-center space-x-4 text-sm">
										<span class="text-muted-foreground">Frequency:</span>
										<span>{indicator.frequency}</span>
										<span class="text-muted-foreground">Direction:</span>
										<span class={getDirectionColor(indicator.direction)}>{indicator.direction}</span>
									</div>
								</div>
							</div>

							<!-- Data Values -->
							<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
								<div class="text-center p-3 bg-background/50 rounded-lg">
									<div class="text-sm text-muted-foreground mb-1">Last Value</div>
									<div class="font-semibold">
										{formatValue(indicator.lastValue, indicator.unit)}
									</div>
								</div>
								<div class="text-center p-3 bg-background/50 rounded-lg">
									<div class="text-sm text-muted-foreground mb-1">Forecast</div>
									<div class="font-semibold">
										{formatValue(indicator.forecast, indicator.unit)}
									</div>
								</div>
								<div class="text-center p-3 bg-background/50 rounded-lg">
									<div class="text-sm text-muted-foreground mb-1">Previous</div>
									<div class="font-semibold">
										{formatValue(indicator.previous, indicator.unit)}
									</div>
								</div>
								<div class="text-center p-3 bg-background/50 rounded-lg">
									<div class="text-sm text-muted-foreground mb-1">Change</div>
									<div class="font-semibold {getChangeColor(indicator.change)}">
										{indicator.change !== undefined 
											? `${indicator.change > 0 ? '+' : ''}${indicator.change}${indicator.unit}`
											: 'N/A'
										}
									</div>
								</div>
							</div>

							<!-- Next Release -->
							{#if indicator.nextRelease}
								<div class="mt-4 p-3 bg-primary/10 rounded-lg">
									<div class="flex items-center space-x-2">
										{#if isUpcoming(indicator.nextRelease)}
											<Clock class="w-4 h-4 text-primary" />
											<span class="text-sm font-semibold text-primary">Next Release:</span>
										{:else}
											<Calendar class="w-4 h-4 text-muted-foreground" />
											<span class="text-sm font-semibold text-muted-foreground">Last Release:</span>
										{/if}
										<span class="text-sm">{formatDate(indicator.nextRelease)}</span>
									</div>
								</div>
							{/if}
						</div>
					{/each}

					{#if indicators.length === 0}
						<div class="text-center py-8">
							<AlertCircle class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
							<h3 class="text-lg font-semibold mb-2">No indicators available</h3>
							<p class="text-muted-foreground">
								Economic indicator data for {currency} is not currently available.
							</p>
						</div>
					{/if}
				</div>
			</CardContent>
		</Card>

		<!-- Analysis Summary -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle>Analysis Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 class="font-semibold mb-3 text-primary">Key Strengths</h4>
						<ul class="space-y-2 text-sm">
							{#if data.overallScore > 5}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-primary rounded-full"></div>
									<span>Strong overall fundamental score ({data.overallScore.toFixed(1)})</span>
								</li>
							{/if}
							{#if indicators.some(i => i.category === 'GDP' && (i.change || 0) > 0)}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-primary rounded-full"></div>
									<span>Positive GDP growth momentum</span>
								</li>
							{/if}
							{#if indicators.some(i => i.category === 'Inflation' && (i.change || 0) < 0)}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-primary rounded-full"></div>
									<span>Declining inflation pressure</span>
								</li>
							{/if}
							{#if indicators.length === 0}
								<li class="text-muted-foreground">Analysis pending - insufficient data</li>
							{/if}
						</ul>
					</div>
					<div>
						<h4 class="font-semibold mb-3 text-destructive">Key Risks</h4>
						<ul class="space-y-2 text-sm">
							{#if data.overallScore < -3}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-destructive rounded-full"></div>
									<span>Weak fundamental outlook ({data.overallScore.toFixed(1)})</span>
								</li>
							{/if}
							{#if indicators.some(i => i.category === 'GDP' && (i.change || 0) < 0)}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-destructive rounded-full"></div>
									<span>Declining economic growth</span>
								</li>
							{/if}
							{#if indicators.some(i => i.category === 'Unemployment' && (i.change || 0) > 0)}
								<li class="flex items-center space-x-2">
									<div class="w-2 h-2 bg-destructive rounded-full"></div>
									<span>Rising unemployment concerns</span>
								</li>
							{/if}
							{#if indicators.length === 0}
								<li class="text-muted-foreground">Risk assessment pending - insufficient data</li>
							{/if}
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Trading Implications -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle>Trading Implications</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="p-4 bg-{data.overallScore > 0 ? 'primary' : 'destructive'}/10 rounded-lg">
					<div class="font-semibold text-{data.overallScore > 0 ? 'primary' : 'destructive'} mb-2">
						{data.bias} Outlook
					</div>
					<p class="text-sm text-muted-foreground">
						{#if data.overallScore > 5}
							Strong fundamental support suggests {currency} strength against weaker currencies. 
							Look for long opportunities in {currency} pairs where the counter-currency shows weakness.
						{:else if data.overallScore > 0}
							Moderate fundamental support for {currency}. Consider selective long positions 
							with proper risk management and confirmation from technical analysis.
						{:else if data.overallScore > -5}
							Mixed fundamental picture for {currency}. Exercise caution and wait for 
							clearer directional signals before taking significant positions.
						{:else}
							Weak fundamentals suggest {currency} vulnerability. Consider short opportunities 
							in {currency} pairs, especially against stronger currencies.
						{/if}
					</p>
				</div>
			</CardContent>
		</Card>
	{:else}
		<Card class="military-card">
			<CardContent class="text-center py-12">
				<AlertCircle class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
				<h3 class="text-lg font-semibold mb-2">Currency data not available</h3>
				<p class="text-muted-foreground">
					No data found for currency: {currency}
				</p>
			</CardContent>
		</Card>
	{/if}
</div>
