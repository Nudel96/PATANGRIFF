<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import CardContent from './ui/CardContent.svelte';
	import CardHeader from './ui/CardHeader.svelte';
	import CardTitle from './ui/CardTitle.svelte';
	import Badge from './ui/Badge.svelte';
	import Input from './ui/Input.svelte';
	import Label from './ui/Label.svelte';
	import Tabs from './ui/Tabs.svelte';
	import TabsList from './ui/TabsList.svelte';
	import TabsTrigger from './ui/TabsTrigger.svelte';
	import TabsContent from './ui/TabsContent.svelte';
	import Select from './ui/Select.svelte';
	import SelectItem from './ui/SelectItem.svelte';
	import Textarea from './ui/Textarea.svelte';
	import Checkbox from './ui/Checkbox.svelte';
	import Progress from './ui/Progress.svelte';
	import { logout } from '$lib/stores/auth';
	import { trades, tradingStats } from '$lib/stores/trading';
	import { 
		FileText, 
		Plus, 
		Search, 
		Filter, 
		Calendar as CalendarIcon,
		TrendingUp,
		TrendingDown,
		Target,
		DollarSign,
		BarChart3,
		PieChart,
		Download,
		CheckCircle,
		XCircle,
		AlertTriangle,
		Brain,
		Activity,
		Clock,
		Zap,
		ArrowLeft,
		LogOut,
		Upload,
		Image,
		Camera,
		Eye,
		Edit,
		Save,
		X,
		AlertCircle,
		Calculator,
		Percent,
		Minus,
		PlayCircle,
		StopCircle,
		Settings
	} from 'lucide-svelte';

	let activeTab = 'journal';
	let selectedDate = new Date();
	let searchTerm = '';
	let filterSetup = 'all';
	let showTradeForm = false;

	// New trade form state
	let newTrade = {
		date: new Date(),
		instrument: '',
		direction: 'long',
		entryPrice: 0,
		stopPrice: 0,
		targetPrice: 0,
		riskAmount: 0,
		riskPercent: 0,
		session: 'London',
		setup: 'breakout',
		notes: '',
		beforeImage: null
	};

	function handleLogout() {
		logout();
		goto('/');
	}

	function handleBack() {
		goto('/dashboard');
	}

	function calculateInitialRisk() {
		if (!newTrade.entryPrice || !newTrade.stopPrice) return 0;
		return Math.abs(newTrade.entryPrice - newTrade.stopPrice);
	}

	function calculatePlannedRR() {
		if (!newTrade.entryPrice || !newTrade.stopPrice || !newTrade.targetPrice) return 0;
		const risk = Math.abs(newTrade.entryPrice - newTrade.stopPrice);
		const reward = Math.abs(newTrade.targetPrice - newTrade.entryPrice);
		return risk > 0 ? reward / risk : 0;
	}

	function calculatePositionSize() {
		const risk = calculateInitialRisk();
		if (risk === 0 || !newTrade.riskAmount) return 0;
		return newTrade.riskAmount / risk;
	}

	function handleRiskAmountChange(value) {
		newTrade.riskAmount = value;
		newTrade.riskPercent = value / 30000 * 100; // Assuming $30k account
	}

	function handleRiskPercentChange(value) {
		newTrade.riskPercent = value;
		newTrade.riskAmount = value * 30000 / 100; // Assuming $30k account
	}

	function addTrade() {
		if (!newTrade.instrument || !newTrade.entryPrice || !newTrade.stopPrice) return;
		
		const trade = {
			id: Date.now().toString(),
			date: newTrade.date,
			instrument: newTrade.instrument,
			direction: newTrade.direction,
			entryPrice: newTrade.entryPrice,
			stopPrice: newTrade.stopPrice,
			targetPrice: newTrade.targetPrice,
			quantity: calculatePositionSize(),
			riskAmount: newTrade.riskAmount,
			riskPercent: newTrade.riskPercent,
			plannedRR: calculatePlannedRR(),
			status: 'pending',
			session: newTrade.session,
			macroEvents: [],
			redNewsNext15: false,
			beforeImage: newTrade.beforeImage,
			notes: newTrade.notes,
			checklistScore: 85,
			checklistItems: [],
			setup: newTrade.setup,
			mistakes: [],
			partialCloses: [],
			createdAt: new Date()
		};

		trades.update(currentTrades => [...currentTrades, trade]);
		
		// Reset form
		newTrade = {
			date: new Date(),
			instrument: '',
			direction: 'long',
			entryPrice: 0,
			stopPrice: 0,
			targetPrice: 0,
			riskAmount: 0,
			riskPercent: 0,
			session: 'London',
			setup: 'breakout',
			notes: '',
			beforeImage: null
		};
		showTradeForm = false;
	}

	// Sample trade data
	onMount(() => {
		const sampleTrade = {
			id: '1',
			date: new Date('2024-01-15'),
			instrument: 'EURUSD',
			direction: 'long',
			entryPrice: 1.0850,
			stopPrice: 1.0820,
			targetPrice: 1.0910,
			exitPrice: 1.0920,
			quantity: 100000,
			riskAmount: 300,
			riskPercent: 1.0,
			plannedRR: 2.0,
			actualR: 2.3,
			status: 'closed',
			session: 'London',
			macroEvents: ['ECB'],
			redNewsNext15: false,
			atrPercentile: 65,
			mae: -0.5,
			mfe: 2.5,
			highestPrice: 1.0925,
			lowestPrice: 1.0845,
			notes: 'Clean breakout above resistance with strong volume',
			exitReason: 'Target hit',
			checklistScore: 95,
			checklistItems: [],
			setup: 'breakout',
			mistakes: [],
			partialCloses: [],
			createdAt: new Date('2024-01-15T08:30:00'),
			closedAt: new Date('2024-01-15T12:45:00')
		};
		
		trades.set([sampleTrade]);
	});
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
						<div class="bg-primary/10 p-2 rounded-lg">
							<FileText class="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 class="text-xl font-bold gradient-text">Trading Journal</h1>
							<p class="text-sm text-foreground/70">R-Multiple Performance Tracking</p>
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-4 text-sm">
						<div class="text-center">
							<div class="font-bold {$tradingStats.totalR >= 0 ? 'text-primary' : 'text-destructive'}">
								{$tradingStats.totalR >= 0 ? '+' : ''}{$tradingStats.totalR.toFixed(2)}R
							</div>
							<div class="text-xs text-muted-foreground">Total R</div>
						</div>
						<div class="text-center">
							<div class="font-bold text-secondary">{$tradingStats.avgDisciplineScore.toFixed(0)}%</div>
							<div class="text-xs text-muted-foreground">Discipline</div>
						</div>
					</div>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Exit Portal
					</Button>
				</div>
			</div>
		</div>
	</header>

	<div class="container-max mx-auto px-6 py-8">
		<Tabs bind:value={activeTab} class="space-y-6">
			<TabsList class="grid w-full grid-cols-4 bg-muted/20">
				<TabsTrigger value="journal" class="flex items-center space-x-2">
					<FileText class="w-4 h-4" />
					<span>Trade Journal</span>
				</TabsTrigger>
				<TabsTrigger value="analytics" class="flex items-center space-x-2">
					<BarChart3 class="w-4 h-4" />
					<span>Analytics</span>
				</TabsTrigger>
				<TabsTrigger value="calendar" class="flex items-center space-x-2">
					<CalendarIcon class="w-4 h-4" />
					<span>Calendar</span>
				</TabsTrigger>
				<TabsTrigger value="checklist" class="flex items-center space-x-2">
					<Settings class="w-4 h-4" />
					<span>Checklist Manager</span>
				</TabsTrigger>
			</TabsList>

			<!-- Trade Journal Tab -->
			<TabsContent value="journal" class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-bold">Trade Journal</h2>
					<Button on:click={() => showTradeForm = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
						<Plus class="w-4 h-4 mr-2" />
						New Trade
					</Button>
				</div>

				{#if showTradeForm}
					<Card class="military-card">
						<CardHeader>
							<CardTitle class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									<Plus class="w-5 h-5 text-primary" />
									<span>New Trade Entry</span>
								</div>
								<Button variant="ghost" size="sm" on:click={() => showTradeForm = false}>
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
										bind:value={newTrade.instrument}
									/>
								</div>
								<div class="space-y-2">
									<Label for="direction">Direction</Label>
									<Select bind:value={newTrade.direction}>
										<SelectItem value="long" selectOption={(v) => newTrade.direction = v}>Long</SelectItem>
										<SelectItem value="short" selectOption={(v) => newTrade.direction = v}>Short</SelectItem>
									</Select>
								</div>
								<div class="space-y-2">
									<Label for="setup">Setup Type</Label>
									<Select bind:value={newTrade.setup}>
										<SelectItem value="breakout" selectOption={(v) => newTrade.setup = v}>Breakout</SelectItem>
										<SelectItem value="retracement" selectOption={(v) => newTrade.setup = v}>Retracement</SelectItem>
										<SelectItem value="reversal" selectOption={(v) => newTrade.setup = v}>Reversal</SelectItem>
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
										placeholder="0.00000"
										bind:value={newTrade.entryPrice}
									/>
								</div>
								<div class="space-y-2">
									<Label for="stopPrice">Stop Price</Label>
									<Input
										id="stopPrice"
										type="number"
										step="0.00001"
										placeholder="0.00000"
										bind:value={newTrade.stopPrice}
									/>
								</div>
								<div class="space-y-2">
									<Label for="targetPrice">Target Price</Label>
									<Input
										id="targetPrice"
										type="number"
										step="0.00001"
										placeholder="0.00000"
										bind:value={newTrade.targetPrice}
									/>
								</div>
							</div>

							<!-- Risk Management -->
							<div class="space-y-4">
								<h4 class="font-semibold">Risk Management</h4>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div class="space-y-2">
										<Label for="riskAmount">Risk Amount ($)</Label>
										<div class="relative">
											<DollarSign class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
											<Input
												id="riskAmount"
												type="number"
												step="0.01"
												placeholder="300.00"
												class="pl-10"
												bind:value={newTrade.riskAmount}
												on:input={(e) => handleRiskAmountChange(parseFloat(e.target.value))}
											/>
										</div>
									</div>
									<div class="space-y-2">
										<Label for="riskPercent">Risk Percent (%)</Label>
										<div class="relative">
											<Percent class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
											<Input
												id="riskPercent"
												type="number"
												step="0.1"
												placeholder="1.0"
												class="pl-10"
												bind:value={newTrade.riskPercent}
												on:input={(e) => handleRiskPercentChange(parseFloat(e.target.value))}
											/>
										</div>
									</div>
								</div>
								
								<!-- Risk Calculations -->
								<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/10 rounded-lg">
									<div class="text-center">
										<div class="text-sm text-muted-foreground">Initial Risk (1R)</div>
										<div class="text-lg font-bold">{calculateInitialRisk().toFixed(5)}</div>
									</div>
									<div class="text-center">
										<div class="text-sm text-muted-foreground">Planned R:R</div>
										<div class="text-lg font-bold {calculatePlannedRR() < 1.5 ? 'text-destructive' : 'text-primary'}">
											{calculatePlannedRR().toFixed(2)}:1
										</div>
									</div>
									<div class="text-center">
										<div class="text-sm text-muted-foreground">Position Size</div>
										<div class="text-lg font-bold">{calculatePositionSize().toLocaleString()}</div>
									</div>
								</div>
								
								{#if calculatePlannedRR() < 1.5}
									<div class="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
										<AlertTriangle class="w-4 h-4 text-destructive" />
										<span class="text-sm text-destructive">Warning: R:R ratio below minimum requirement (1.5:1)</span>
									</div>
								{/if}
							</div>

							<!-- Notes -->
							<div class="space-y-2">
								<Label for="notes">Trade Notes</Label>
								<Textarea
									id="notes"
									placeholder="Trade rationale, setup details, market context..."
									bind:value={newTrade.notes}
									rows={3}
								/>
							</div>

							<div class="flex justify-between">
								<Button variant="outline" on:click={() => showTradeForm = false}>
									Cancel
								</Button>
								<Button 
									on:click={addTrade}
									disabled={!newTrade.instrument || !newTrade.entryPrice || !newTrade.stopPrice}
									class="bg-primary hover:bg-primary/90 text-primary-foreground"
								>
									Create Trade
								</Button>
							</div>
						</CardContent>
					</Card>
				{/if}

				<!-- Trades List -->
				<div class="space-y-4">
					{#each $trades as trade}
						<Card class="military-card">
							<CardHeader>
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-3">
										<Badge class="{trade.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}">
											{trade.direction.toUpperCase()}
										</Badge>
										<span class="font-semibold">{trade.instrument}</span>
										<Badge variant="outline">{trade.setup}</Badge>
										<Badge class="{
											trade.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
											trade.status === 'open' ? 'bg-primary/10 text-primary' :
											trade.status === 'closed' ? 'bg-muted text-muted-foreground' :
											'bg-destructive/10 text-destructive'
										}">
											{trade.status}
										</Badge>
									</div>
									<div class="flex items-center space-x-2">
										{#if trade.actualR !== undefined}
											<Badge class="{trade.actualR > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}">
												{trade.actualR > 0 ? '+' : ''}{trade.actualR.toFixed(2)}R
											</Badge>
										{/if}
										<Badge class="bg-secondary/10 text-secondary">
											{trade.checklistScore.toFixed(0)}% Discipline
										</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
									<div>
										<span class="text-muted-foreground">Entry:</span>
										<span class="ml-2 font-medium">{trade.entryPrice}</span>
									</div>
									<div>
										<span class="text-muted-foreground">Stop:</span>
										<span class="ml-2 font-medium">{trade.stopPrice}</span>
									</div>
									<div>
										<span class="text-muted-foreground">Planned R:R:</span>
										<span class="ml-2 font-medium">{trade.plannedRR.toFixed(2)}:1</span>
									</div>
									<div>
										<span class="text-muted-foreground">Session:</span>
										<span class="ml-2 font-medium">{trade.session}</span>
									</div>
								</div>

								<div class="flex justify-between items-center">
									<div class="text-xs text-muted-foreground">
										Created: {trade.createdAt.toLocaleString()}
									</div>
									<div class="flex space-x-2">
										<Button size="sm" variant="ghost">
											<Eye class="w-4 h-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</TabsContent>

			<!-- Analytics Tab -->
			<TabsContent value="analytics" class="space-y-6">
				<h2 class="text-2xl font-bold">R-Multiple Analytics Dashboard</h2>
				
				<!-- Key Metrics -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card class="military-card">
						<CardContent class="p-6">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm text-muted-foreground">Total R</p>
									<p class="text-2xl font-bold {$tradingStats.totalR >= 0 ? 'text-primary' : 'text-destructive'}">
										{$tradingStats.totalR >= 0 ? '+' : ''}{$tradingStats.totalR.toFixed(2)}R
									</p>
								</div>
								<div class="bg-primary/10 p-3 rounded-xl">
									<Target class="w-6 h-6 text-primary" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardContent class="p-6">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm text-muted-foreground">Win Rate</p>
									<p class="text-2xl font-bold text-secondary">{$tradingStats.winRate.toFixed(1)}%</p>
								</div>
								<div class="bg-secondary/10 p-3 rounded-xl">
									<TrendingUp class="w-6 h-6 text-secondary" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardContent class="p-6">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm text-muted-foreground">Expectancy</p>
									<p class="text-2xl font-bold {$tradingStats.expectancy >= 0 ? 'text-primary' : 'text-destructive'}">
										{$tradingStats.expectancy.toFixed(2)}R
									</p>
								</div>
								<div class="bg-primary/10 p-3 rounded-xl">
									<Calculator class="w-6 h-6 text-primary" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardContent class="p-6">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm text-muted-foreground">Avg Discipline</p>
									<p class="text-2xl font-bold text-secondary">{$tradingStats.avgDisciplineScore.toFixed(0)}%</p>
								</div>
								<div class="bg-secondary/10 p-3 rounded-xl">
									<Brain class="w-6 h-6 text-secondary" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<!-- Additional Analytics Placeholders -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card class="military-card">
						<CardHeader>
							<CardTitle>R-Distribution Histogram</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="h-64 flex items-center justify-center text-muted-foreground">
								Chart visualization coming soon
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardHeader>
							<CardTitle>MAE/MFE Analysis</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="h-64 flex items-center justify-center text-muted-foreground">
								Scatter plot visualization coming soon
							</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>

			<!-- Calendar Tab -->
			<TabsContent value="calendar" class="space-y-6">
				<h2 class="text-2xl font-bold">Trading Calendar</h2>
				
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card class="military-card">
						<CardHeader>
							<CardTitle>Calendar View</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="h-64 flex items-center justify-center text-muted-foreground">
								Calendar component coming soon
							</div>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardHeader>
							<CardTitle>
								Trades on {selectedDate.toLocaleDateString()}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-3">
								{#each $trades.filter(trade => trade.date.toDateString() === selectedDate.toDateString()) as trade}
									<div class="p-3 bg-muted/10 rounded-lg">
										<div class="flex items-center justify-between mb-2">
											<span class="font-medium">{trade.instrument}</span>
											<Badge class="{trade.actualR && trade.actualR > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}">
												{trade.actualR ? `${trade.actualR > 0 ? '+' : ''}${trade.actualR.toFixed(2)}R` : 'Open'}
											</Badge>
										</div>
										<div class="text-sm text-muted-foreground">
											{trade.direction.toUpperCase()} • {trade.setup} • {trade.session}
										</div>
									</div>
								{:else}
									<p class="text-muted-foreground text-center py-8">No trades on this date</p>
								{/each}
							</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>

			<!-- Checklist Manager Tab -->
			<TabsContent value="checklist" class="space-y-6">
				<h2 class="text-2xl font-bold">Pre-Trade Checklist Manager</h2>
				
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card class="military-card">
						<CardHeader>
							<CardTitle>Breakout Setup Checklist</CardTitle>
							<p class="text-sm text-muted-foreground">Setup: breakout</p>
						</CardHeader>
						<CardContent>
							<div class="space-y-3">
								{#each [
									{ item: 'Clear structure present (S/R, trendline)', category: 'Structure', required: true, weight: 1.0 },
									{ item: 'Volume confirmation on breakout', category: 'Structure', required: true, weight: 1.0 },
									{ item: 'R:R ratio meets minimum requirement', category: 'Risk', required: true, weight: 1.0 },
									{ item: 'Stop placement logical and tested', category: 'Risk', required: true, weight: 1.0 },
									{ item: 'No conflicting news in next 15 minutes', category: 'Context', required: true, weight: 1.0 }
								] as item, index}
									<div class="flex items-center justify-between p-2 bg-muted/10 rounded">
										<div class="flex-1">
											<div class="text-sm font-medium">{item.item}</div>
											<div class="text-xs text-muted-foreground">{item.category}</div>
										</div>
										<div class="flex items-center space-x-2">
											<Badge variant="outline" class="text-xs">
												Weight: {item.weight}
											</Badge>
											{#if item.required}
												<Badge class="bg-destructive/10 text-destructive text-xs">
													Required
												</Badge>
											{/if}
										</div>
									</div>
								{/each}
							</div>
							<Button variant="outline" class="w-full mt-4">
								<Edit class="w-4 h-4 mr-2" />
								Edit Template
							</Button>
						</CardContent>
					</Card>

					<Card class="military-card">
						<CardHeader>
							<CardTitle>Retracement Setup Checklist</CardTitle>
							<p class="text-sm text-muted-foreground">Setup: retracement</p>
						</CardHeader>
						<CardContent>
							<div class="space-y-3">
								{#each [
									{ item: 'Clear trend established', category: 'Structure', required: true, weight: 1.0 },
									{ item: 'Retracement to key level', category: 'Structure', required: true, weight: 1.0 },
									{ item: 'Confluence factors present', category: 'Structure', required: false, weight: 0.5 },
									{ item: 'R:R ratio meets minimum requirement', category: 'Risk', required: true, weight: 1.0 },
									{ item: 'No conflicting news in next 15 minutes', category: 'Context', required: true, weight: 1.0 }
								] as item, index}
									<div class="flex items-center justify-between p-2 bg-muted/10 rounded">
										<div class="flex-1">
											<div class="text-sm font-medium">{item.item}</div>
											<div class="text-xs text-muted-foreground">{item.category}</div>
										</div>
										<div class="flex items-center space-x-2">
											<Badge variant="outline" class="text-xs">
												Weight: {item.weight}
											</Badge>
											{#if item.required}
												<Badge class="bg-destructive/10 text-destructive text-xs">
													Required
												</Badge>
											{/if}
										</div>
									</div>
								{/each}
							</div>
							<Button variant="outline" class="w-full mt-4">
								<Edit class="w-4 h-4 mr-2" />
								Edit Template
							</Button>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>