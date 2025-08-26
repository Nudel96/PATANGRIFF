<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui';
	import { 
		ArrowLeft, 
		FileText, 
		BarChart3, 
		Calendar as CalendarIcon, 
		Settings,
		Plus,
		LogOut
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Trade, TradingStats } from '$lib/types/trading';
	import TradeJournalTab from './journal/TradeJournalTab.svelte';
	import AnalyticsTab from './journal/AnalyticsTab.svelte';
	import CalendarTab from './journal/CalendarTab.svelte';
	import ChecklistTab from './journal/ChecklistTab.svelte';

	const dispatch = createEventDispatcher<{
		back: void;
		logout: void;
	}>();

	export let activeTab: string = 'journal';

	let trades: Trade[] = [];
	let selectedDate = new Date();
	let searchTerm = '';
	let filterSetup = 'all';
	let selectedTrade: Trade | null = null;
	let showTradeForm = false;

	// Sample trades data
	const sampleTrades: Trade[] = [
		{
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
		},
		{
			id: '2',
			date: new Date('2024-01-16'),
			instrument: 'GBPJPY',
			direction: 'short',
			entryPrice: 185.50,
			stopPrice: 186.20,
			targetPrice: 184.10,
			quantity: 50000,
			riskAmount: 350,
			riskPercent: 1.2,
			plannedRR: 2.0,
			status: 'open',
			session: 'London',
			macroEvents: ['BOE'],
			redNewsNext15: false,
			atrPercentile: 72,
			notes: 'Rejection at key resistance level with bearish divergence',
			checklistScore: 88,
			checklistItems: [],
			setup: 'reversal',
			mistakes: [],
			partialCloses: [],
			createdAt: new Date('2024-01-16T09:15:00')
		}
	];

	// Initialize trades
	trades = sampleTrades;

	function calculateStats(): TradingStats {
		const closedTrades = trades.filter(trade => trade.status === 'closed');
		const totalR = closedTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0);
		const winningTrades = closedTrades.filter(trade => (trade.actualR || 0) > 0);
		const losingTrades = closedTrades.filter(trade => (trade.actualR || 0) < 0);
		
		const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
		const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / winningTrades.length : 0;
		const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / losingTrades.length) : 0;
		const expectancy = (winRate / 100 * avgWin) - ((100 - winRate) / 100 * avgLoss);
		const avgDisciplineScore = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + trade.checklistScore, 0) / closedTrades.length : 0;

		return {
			totalTrades: closedTrades.length,
			totalR,
			winRate,
			avgWin,
			avgLoss,
			expectancy,
			avgDisciplineScore
		};
	}

	function addTrade(trade: Trade) {
		trades = [...trades, trade];
	}

	function updateTrade(updatedTrade: Trade) {
		trades = trades.map(trade => trade.id === updatedTrade.id ? updatedTrade : trade);
	}

	function deleteTrade(tradeId: string) {
		trades = trades.filter(trade => trade.id !== tradeId);
	}

	function openTrade(tradeId: string) {
		trades = trades.map(trade => 
			trade.id === tradeId 
				? { ...trade, status: 'open' as const }
				: trade
		);
	}

	function closeTrade(tradeId: string, exitPrice: number, exitReason: string) {
		trades = trades.map(trade => {
			if (trade.id === tradeId) {
				const risk = Math.abs(trade.entryPrice - trade.stopPrice);
				const actualReturn = trade.direction === 'long' 
					? exitPrice - trade.entryPrice 
					: trade.entryPrice - exitPrice;
				const actualR = risk > 0 ? actualReturn / risk : 0;
				
				return {
					...trade,
					status: 'closed' as const,
					exitPrice,
					exitReason,
					actualR,
					closedAt: new Date()
				};
			}
			return trade;
		});
	}

	function handleBack() {
		dispatch('back');
	}

	function handleLogout() {
		dispatch('logout');
	}

	$: stats = calculateStats();
	$: filteredTrades = trades.filter(trade => {
		const matchesSearch = searchTerm === '' || 
			trade.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
			trade.notes.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesSetup = filterSetup === 'all' || trade.setup === filterSetup;
		return matchesSearch && matchesSetup;
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

				<!-- Quick Stats -->
				<div class="hidden md:flex items-center space-x-6">
					<div class="text-center">
						<div class="text-sm text-muted-foreground">Total R</div>
						<div class="font-bold text-{stats.totalR >= 0 ? 'primary' : 'destructive'}">
							{stats.totalR >= 0 ? '+' : ''}{stats.totalR.toFixed(2)}R
						</div>
					</div>
					<div class="text-center">
						<div class="text-sm text-muted-foreground">Win Rate</div>
						<div class="font-bold text-primary">{stats.winRate.toFixed(1)}%</div>
					</div>
					<Button variant="outline" size="sm" on:click={handleLogout}>
						<LogOut class="w-4 h-4 mr-2" />
						Logout
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

			<TabsContent value="journal">
				<TradeJournalTab 
					{trades}
					{filteredTrades}
					bind:searchTerm
					bind:filterSetup
					bind:showTradeForm
					bind:selectedTrade
					on:addTrade={(e) => addTrade(e.detail)}
					on:updateTrade={(e) => updateTrade(e.detail)}
					on:deleteTrade={(e) => deleteTrade(e.detail)}
					on:openTrade={(e) => openTrade(e.detail)}
					on:closeTrade={(e) => closeTrade(e.detail.tradeId, e.detail.exitPrice, e.detail.exitReason)}
				/>
			</TabsContent>

			<TabsContent value="analytics">
				<AnalyticsTab {trades} {stats} />
			</TabsContent>

			<TabsContent value="calendar">
				<CalendarTab {trades} bind:selectedDate />
			</TabsContent>

			<TabsContent value="checklist">
				<ChecklistTab />
			</TabsContent>
		</Tabs>
	</div>
</div>
