<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
	import Button from './ui/Button.svelte';
	import Select from './ui/Select.svelte';
	import SelectItem from './ui/SelectItem.svelte';
	import { logout } from '$lib/stores/auth';
	import { heatmapData, lastUpdated } from '$lib/stores/market';
	import { 
		Activity, 
		TrendingUp, 
		BarChart3, 
		RefreshCw,
		ArrowLeft,
		LogOut,
		Target,
		Zap,
		Eye
	} from 'lucide-svelte';

	let timeframe = 'daily';
	let refreshing = false;

	// Sample data matching the reference image structure
	const sampleHeatmapData = [
		{
			asset: 'USOIL',
			bias: 'Very Bullish',
			score: 13,
			sentiment: { cot: 2, retailPos: 2 },
			technical: { seasonality: 1, trend: 2 },
			economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: 1 }
		},
		{
			asset: 'BITCOIN',
			bias: 'Very Bullish',
			score: 11,
			sentiment: { cot: 2, retailPos: -1 },
			technical: { seasonality: 2, trend: 2 },
			economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
		},
		{
			asset: 'COPPER',
			bias: 'Very Bullish',
			score: 10,
			sentiment: { cot: 2, retailPos: -1 },
			technical: { seasonality: 1, trend: 2 },
			economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
		},
		{
			asset: 'USDZAR',
			bias: 'Very Bullish',
			score: 10,
			sentiment: { cot: 2, retailPos: -1 },
			technical: { seasonality: -1, trend: 2 },
			economic: { gdp: 2, mPMI: 2, sPMI: 1, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
		},
		{
			asset: 'EURUSD',
			bias: 'Bearish',
			score: -8,
			sentiment: { cot: 0, retailPos: 0 },
			technical: { seasonality: 1, trend: -2 },
			economic: { gdp: -1, mPMI: -2, sPMI: 0, retailSales: -2, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
		},
		{
			asset: 'GBPCHF',
			bias: 'Very Bearish',
			score: -9,
			sentiment: { cot: 0, retailPos: -1 },
			technical: { seasonality: -1, trend: 2 },
			economic: { gdp: -1, mPMI: -1, sPMI: -2, retailSales: 0, inflation: -1, employmentChange: 0, unemploymentRate: 1, interestRates: -1 }
		}
	];

	onMount(() => {
		heatmapData.set(sampleHeatmapData);
		lastUpdated.set(new Date());
	});

	function getScoreColor(score) {
		if (score >= 8) return 'bg-primary text-primary-foreground';
		if (score >= 4) return 'bg-primary/70 text-primary-foreground';
		if (score >= -3) return 'bg-muted text-muted-foreground';
		if (score >= -7) return 'bg-destructive/70 text-destructive-foreground';
		return 'bg-destructive text-destructive-foreground';
	}

	function getCellColor(value) {
		if (value === 2) return 'bg-primary text-primary-foreground';
		if (value === 1) return 'bg-primary/50 text-foreground';
		if (value === 0) return 'bg-muted text-muted-foreground';
		if (value === -1) return 'bg-destructive/50 text-foreground';
		if (value === -2) return 'bg-destructive text-destructive-foreground';
		return 'bg-muted text-muted-foreground';
	}

	function getBiasColor(bias) {
		switch (bias) {
			case 'Very Bullish': return 'bg-primary/10 text-primary border-primary/20';
			case 'Bullish': return 'bg-primary/20 text-primary border-primary/30';
			case 'Neutral': return 'bg-muted text-muted-foreground border-border';
			case 'Bearish': return 'bg-destructive/20 text-destructive border-destructive/30';
			case 'Very Bearish': return 'bg-destructive/10 text-destructive border-destructive/20';
			default: return 'bg-muted text-muted-foreground border-border';
		}
	}

	async function handleRefresh() {
		refreshing = true;
		setTimeout(() => {
			lastUpdated.set(new Date());
			refreshing = false;
		}, 2000);
	}

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard');
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
						Back to Dashboard
					</Button>
					<div class="flex items-center space-x-3">
						<div class="bg-secondary/10 p-2 rounded-lg">
							<Activity class="w-6 h-6 text-secondary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Market Heatmap</h1>
							<p class="text-sm text-foreground/70">Real-time currency strength analysis</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<Select bind:value={timeframe}>
						<SelectItem value="daily" selectOption={(v) => timeframe = v}>Daily</SelectItem>
						<SelectItem value="weekly" selectOption={(v) => timeframe = v}>Weekly</SelectItem>
						<SelectItem value="monthly" selectOption={(v) => timeframe = v}>Monthly</SelectItem>
					</Select>
					<Button 
						variant="outline" 
						size="sm" 
						on:click={handleRefresh}
						disabled={refreshing}
					>
						<RefreshCw class="w-4 h-4 mr-2 {refreshing ? 'animate-spin' : ''}" />
						Refresh
					</Button>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		<!-- Status Bar -->
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center space-x-4">
				<Badge class="bg-primary/10 text-primary border-primary/20 px-4 py-2">
					<Target class="w-4 h-4 mr-2" />
					Live Market Data
				</Badge>
				<span class="text-sm text-muted-foreground">
					Last updated: {$lastUpdated.toLocaleTimeString()}
				</span>
			</div>
			<div class="flex items-center space-x-2">
				<div class="flex items-center space-x-2 text-sm">
					<div class="w-3 h-3 bg-primary rounded-full"></div>
					<span>Bullish</span>
					<div class="w-3 h-3 bg-muted rounded-full"></div>
					<span>Neutral</span>
					<div class="w-3 h-3 bg-destructive rounded-full"></div>
					<span>Bearish</span>
				</div>
			</div>
		</div>

		<!-- Heatmap Table -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<BarChart3 class="w-5 h-5 text-secondary" />
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
								<th class="text-center p-2 font-semibold bg-red-900/20 text-red-300" colspan="2">Sentiment</th>
								<th class="text-center p-2 font-semibold bg-blue-900/20 text-blue-300" colspan="2">Technical</th>
								<th class="text-center p-2 font-semibold bg-purple-900/20 text-purple-300" colspan="8">Economic Data</th>
							</tr>
							<tr class="border-b border-border/50 text-xs">
								<th></th>
								<th></th>
								<th></th>
								<th class="p-2 text-center bg-red-900/10">COT</th>
								<th class="p-2 text-center bg-red-900/10">Retail Pos</th>
								<th class="p-2 text-center bg-blue-900/10">Seasonality</th>
								<th class="p-2 text-center bg-blue-900/10">Trend</th>
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
							{#each $heatmapData as item, index}
								<tr class="border-b border-border/50 hover:bg-muted/10 transition-colors">
									<td class="p-4">
										<div class="flex items-center space-x-2">
											<span class="font-semibold text-primary">{item.asset}</span>
											<Button
												variant="ghost"
												size="sm"
												class="h-6 w-6 p-0"
												title="View Currency Overview"
											>
												<Eye class="w-3 h-3" />
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
						<TrendingUp class="w-5 h-5 text-primary" />
						<span>Strongest Assets</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-3">
						{#each $heatmapData.filter(item => item.score > 8).slice(0, 5) as item}
							<div class="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
								<span class="font-medium">{item.asset}</span>
								<Badge class="bg-primary/20 text-primary">+{item.score}</Badge>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>

			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2 text-lg">
						<Activity class="w-5 h-5 text-secondary" />
						<span>Market Overview</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						<div class="flex justify-between">
							<span class="text-sm text-muted-foreground">Bullish Assets:</span>
							<span class="font-semibold text-primary">
								{$heatmapData.filter(item => item.score > 0).length}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-sm text-muted-foreground">Bearish Assets:</span>
							<span class="font-semibold text-destructive">
								{$heatmapData.filter(item => item.score < 0).length}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-sm text-muted-foreground">Neutral Assets:</span>
							<span class="font-semibold text-muted-foreground">
								{$heatmapData.filter(item => item.score === 0).length}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2 text-lg">
						<Zap class="w-5 h-5 text-secondary" />
						<span>Trading Opportunities</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="space-y-3">
						<div class="p-3 bg-primary/10 rounded-lg">
							<div class="font-semibold text-primary mb-1">High Conviction</div>
							<div class="text-sm text-muted-foreground">
								{$heatmapData.filter(item => Math.abs(item.score) > 8).length} assets with strong signals
							</div>
						</div>
						<div class="p-3 bg-secondary/10 rounded-lg">
							<div class="font-semibold text-secondary mb-1">Medium Conviction</div>
							<div class="text-sm text-muted-foreground">
								{$heatmapData.filter(item => Math.abs(item.score) >= 4 && Math.abs(item.score) <= 8).length} assets with moderate signals
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card class="military-card">
				<CardHeader>
					<CardTitle class="flex items-center space-x-2 text-lg">
						<Eye class="w-5 h-5 text-primary" />
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
	</div>
</div>