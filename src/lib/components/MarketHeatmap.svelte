<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		Activity, 
		BarChart3, 
		TrendingUp, 
		TrendingDown,
		Zap,
		Eye,
		RefreshCw,
		LogOut
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { CurrencyScore, CurrencyData } from '$lib/types/heatmap';
	import { 
		SAMPLE_HEATMAP_DATA, 
		SAMPLE_CURRENCY_DATA, 
		getScoreColor, 
		getBiasColor, 
		getCellColor 
	} from '$lib/types/heatmap';
	import CurrencyOverview from './heatmap/CurrencyOverview.svelte';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	let heatmapData: CurrencyScore[] = [...SAMPLE_HEATMAP_DATA];
	let currencyData: Record<string, CurrencyData> = { ...SAMPLE_CURRENCY_DATA };
	let selectedCurrency: string | null = null;
	let showCurrencyOverview = false;
	let lastUpdated = new Date();
	let isRefreshing = false;

	// Sort data by score (highest to lowest)
	$: sortedData = [...heatmapData].sort((a, b) => b.score - a.score);

	// Calculate summary statistics
	$: strongestAssets = sortedData.filter(item => item.score > 8);
	$: weakestAssets = sortedData.filter(item => item.score < -8);
	$: highConvictionCount = sortedData.filter(item => Math.abs(item.score) > 8).length;
	$: mediumConvictionCount = sortedData.filter(item => Math.abs(item.score) >= 4 && Math.abs(item.score) <= 8).length;

	function handleBack() {
		dispatch('back');
	}

	function handleLogout() {
		dispatch('logout');
	}

	function handleCurrencyClick(asset: string) {
		selectedCurrency = asset;
		showCurrencyOverview = true;
	}

	function handleRefresh() {
		isRefreshing = true;
		// Simulate data refresh
		setTimeout(() => {
			lastUpdated = new Date();
			isRefreshing = false;
		}, 1000);
	}

	function closeCurrencyOverview() {
		showCurrencyOverview = false;
		selectedCurrency = null;
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
		<div class="container-max mx-auto px-6">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-4">
					<Button variant="ghost" size="sm" on:click={handleBack}>
						<ArrowLeft class="w-4 h-4 mr-2"></ArrowLeft>
						Back to Dashboard
					</Button>
					<div class="flex items-center space-x-3">
						<div class="bg-secondary/10 p-2 rounded-lg">
							<Activity class="w-6 h-6 text-secondary"></Activity>
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Market Heatmap</h1>
							<p class="text-sm text-foreground/70">Real-time currency strength analysis</p>
						</div>
					</div>
				</div>

				<!-- Header Actions -->
				<div class="hidden md:flex items-center space-x-4">
					<div class="text-center">
						<div class="text-sm text-muted-foreground">Last Updated</div>
						<div class="text-sm font-semibold">{lastUpdated.toLocaleTimeString()}</div>
					</div>
					<Button 
						variant="outline" 
						size="sm" 
						on:click={handleRefresh}
						disabled={isRefreshing}
					>
						<RefreshCw class="w-4 h-4 mr-2 {isRefreshing ? 'animate-spin' : ''}"></RefreshCw>
						Refresh
					</Button>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2"></LogOut>
						Logout
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		{#if showCurrencyOverview && selectedCurrency}
			<CurrencyOverview 
				currency={selectedCurrency}
				{currencyData}
				on:close={closeCurrencyOverview}
			/>
		{:else}
			<!-- Market Overview Cards -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card class="military-card">
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-muted-foreground">Market Sentiment</p>
								<p class="text-2xl font-bold text-primary">Bullish</p>
							</div>
							<div class="bg-primary/10 p-3 rounded-xl">
								<TrendingUp class="w-6 h-6 text-primary"></TrendingUp>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-muted-foreground">High Conviction</p>
								<p class="text-2xl font-bold text-secondary">{highConvictionCount}</p>
							</div>
							<div class="bg-secondary/10 p-3 rounded-xl">
								<Zap class="w-6 h-6 text-secondary"></Zap>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-muted-foreground">Medium Conviction</p>
								<p class="text-2xl font-bold text-primary">{mediumConvictionCount}</p>
							</div>
							<div class="bg-primary/10 p-3 rounded-xl">
								<BarChart3 class="w-6 h-6 text-primary"></BarChart3>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-muted-foreground">Assets Tracked</p>
								<p class="text-2xl font-bold text-secondary">{heatmapData.length}</p>
							</div>
							<div class="bg-secondary/10 p-3 rounded-xl">
								<Activity class="w-6 h-6 text-secondary"></Activity>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Heatmap Table -->
			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2">
						<BarChart3 class="w-5 h-5 text-secondary"></BarChart3>
						<span>Currency Strength Heatmap</span>
					</CardTitle>
				</CardHeader>
				<CardContent class="p-0">
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-border/50">
									<th class="text-left p-4 font-semibold bg-muted/20">Asset</th>
									<th class="text-center p-4 font-semibold bg-muted/20">Bias</th>
									<th class="text-center p-4 font-semibold bg-muted/20">Score</th>
									
									<!-- Sentiment Column -->
									<th class="text-center p-2 font-semibold bg-red-900/20 text-red-300" colspan="2">Sentiment</th>
									
									<!-- Technical Column -->
									<th class="text-center p-2 font-semibold bg-blue-900/20 text-blue-300" colspan="2">Technical</th>
									
									<!-- Economic Column -->
									<th class="text-center p-2 font-semibold bg-purple-900/20 text-purple-300" colspan="8">Economic</th>
								</tr>
								<tr class="border-b border-border/50 text-xs">
									<th></th>
									<th></th>
									<th></th>
									
									<!-- Sentiment Sub-headers -->
									<th class="p-2 text-center bg-red-900/10">COT</th>
									<th class="p-2 text-center bg-red-900/10">Retail Pos</th>
									
									<!-- Technical Sub-headers -->
									<th class="p-2 text-center bg-blue-900/10">Seasonality</th>
									<th class="p-2 text-center bg-blue-900/10">Trend</th>
									
									<!-- Economic Sub-headers -->
									<th class="p-2 text-center bg-purple-900/10">GDP</th>
									<th class="p-2 text-center bg-purple-900/10">mPMI</th>
									<th class="p-2 text-center bg-purple-900/10">sPMI</th>
									<th class="p-2 text-center bg-purple-900/10">Retail Sales</th>
									<th class="p-2 text-center bg-purple-900/10">Inflation</th>
									<th class="p-2 text-center bg-purple-900/10">Employment Change</th>
									<th class="p-2 text-center bg-purple-900/10">Unemployment Rate</th>
									<th class="p-2 text-center bg-purple-900/10">Interest Rates</th>
								</tr>
							</thead>
							<tbody>
								{#each sortedData as item, index}
									<tr class="border-b border-border/50 hover:bg-muted/10 transition-colors">
										<td class="p-4">
											<div class="flex items-center space-x-2">
												<span class="font-semibold text-primary">{item.asset}</span>
												<Button
													variant="ghost"
													size="sm"
													class="h-6 w-6 p-0"
													on:click={() => handleCurrencyClick(item.asset)}
													title="View Currency Overview"
												>
													<Eye class="w-3 h-3"></Eye>
												</Button>
											</div>
										</td>
										<td class="p-4 text-center">
											<Badge class={getBiasColor(item.bias)}>
												{item.bias}
											</Badge>
										</td>
										<td class="p-4 text-center">
											<Badge class={getScoreColor(item.score)}>
												{item.score}
											</Badge>
										</td>
										
										<!-- Sentiment Data -->
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.sentiment.cot)}">
											{item.sentiment.cot}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.sentiment.retailPos)}">
											{item.sentiment.retailPos}
										</td>
										
										<!-- Technical Data -->
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.technical.seasonality)}">
											{item.technical.seasonality}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.technical.trend)}">
											{item.technical.trend}
										</td>
										
										<!-- Economic Data -->
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.gdp)}">
											{item.economic.gdp}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.mPMI)}">
											{item.economic.mPMI}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.sPMI)}">
											{item.economic.sPMI}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.retailSales)}">
											{item.economic.retailSales}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.inflation)}">
											{item.economic.inflation}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.employmentChange)}">
											{item.economic.employmentChange}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.unemploymentRate)}">
											{item.economic.unemploymentRate}
										</td>
										<td class="p-2 text-center text-sm font-medium {getCellColor(item.economic.interestRates)}">
											{item.economic.interestRates}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			<!-- Analysis Summary -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2 text-lg">
							<TrendingUp class="w-5 h-5 text-primary"></TrendingUp>
							<span>Strongest Assets</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							{#each strongestAssets.slice(0, 5) as item}
								<div class="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
									<span class="font-medium">{item.asset}</span>
									<Badge class="bg-primary/20 text-primary">+{item.score}</Badge>
								</div>
							{/each}
							{#if strongestAssets.length === 0}
								<p class="text-muted-foreground text-sm">No very bullish assets</p>
							{/if}
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2 text-lg">
							<TrendingDown class="w-5 h-5 text-destructive"></TrendingDown>
							<span>Weakest Assets</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							{#each weakestAssets.slice(0, 5) as item}
								<div class="flex items-center justify-between p-2 bg-destructive/10 rounded-lg">
									<span class="font-medium">{item.asset}</span>
									<Badge class="bg-destructive/20 text-destructive">{item.score}</Badge>
								</div>
							{/each}
							{#if weakestAssets.length === 0}
								<p class="text-muted-foreground text-sm">No very bearish assets</p>
							{/if}
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2 text-lg">
							<Zap class="w-5 h-5 text-secondary"></Zap>
							<span>Trading Opportunities</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							<div class="p-3 bg-primary/10 rounded-lg">
								<div class="font-semibold text-primary mb-1">High Conviction</div>
								<div class="text-sm text-muted-foreground">
									{highConvictionCount} assets with strong signals
								</div>
							</div>
							<div class="p-3 bg-secondary/10 rounded-lg">
								<div class="font-semibold text-secondary mb-1">Medium Conviction</div>
								<div class="text-sm text-muted-foreground">
									{mediumConvictionCount} assets with moderate signals
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="military-card">
					<CardHeader>
						<CardTitle class="flex items-center space-x-2 text-lg">
							<Eye class="w-5 h-5 text-primary"></Eye>
							<span>Currency Analysis</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							<div class="p-3 bg-primary/10 rounded-lg">
								<div class="font-semibold text-primary mb-1">Individual Analysis</div>
								<div class="text-sm text-muted-foreground">
									Click the eye icon next to any asset to view detailed fundamental analysis
								</div>
							</div>
							<div class="p-3 bg-secondary/10 rounded-lg">
								<div class="font-semibold text-secondary mb-1">Economic Indicators</div>
								<div class="text-sm text-muted-foreground">
									GDP, PMI, inflation, employment data and more
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		{/if}
	</div>
</div>
