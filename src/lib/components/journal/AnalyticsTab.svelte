<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui';
	import { Target, TrendingUp, TrendingDown, Award, BarChart3, PieChart } from 'lucide-svelte';
	import type { Trade, TradingStats } from '$lib/types/trading';

	export let trades: Trade[];
	export let stats: TradingStats;

	function getSetupBreakdown() {
		const setupCounts: Record<string, { count: number; totalR: number; winRate: number }> = {};
		
		trades.filter(t => t.status === 'closed').forEach(trade => {
			if (!setupCounts[trade.setup]) {
				setupCounts[trade.setup] = { count: 0, totalR: 0, winRate: 0 };
			}
			setupCounts[trade.setup].count++;
			setupCounts[trade.setup].totalR += trade.actualR || 0;
		});

		// Calculate win rates
		Object.keys(setupCounts).forEach(setup => {
			const setupTrades = trades.filter(t => t.setup === setup && t.status === 'closed');
			const wins = setupTrades.filter(t => (t.actualR || 0) > 0).length;
			setupCounts[setup].winRate = setupTrades.length > 0 ? (wins / setupTrades.length) * 100 : 0;
		});

		return setupCounts;
	}

	function getSessionBreakdown() {
		const sessionCounts: Record<string, { count: number; totalR: number; winRate: number }> = {};
		
		trades.filter(t => t.status === 'closed').forEach(trade => {
			if (!sessionCounts[trade.session]) {
				sessionCounts[trade.session] = { count: 0, totalR: 0, winRate: 0 };
			}
			sessionCounts[trade.session].count++;
			sessionCounts[trade.session].totalR += trade.actualR || 0;
		});

		// Calculate win rates
		Object.keys(sessionCounts).forEach(session => {
			const sessionTrades = trades.filter(t => t.session === session && t.status === 'closed');
			const wins = sessionTrades.filter(t => (t.actualR || 0) > 0).length;
			sessionCounts[session].winRate = sessionTrades.length > 0 ? (wins / sessionTrades.length) * 100 : 0;
		});

		return sessionCounts;
	}

	function getRecentPerformance() {
		const last30Days = new Date();
		last30Days.setDate(last30Days.getDate() - 30);
		
		const recentTrades = trades.filter(t => 
			t.status === 'closed' && 
			t.closedAt && 
			t.closedAt >= last30Days
		);

		const totalR = recentTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0);
		const winningTrades = recentTrades.filter(trade => (trade.actualR || 0) > 0);
		const winRate = recentTrades.length > 0 ? (winningTrades.length / recentTrades.length) * 100 : 0;

		return {
			totalTrades: recentTrades.length,
			totalR,
			winRate
		};
	}

	$: setupBreakdown = getSetupBreakdown();
	$: sessionBreakdown = getSessionBreakdown();
	$: recentPerformance = getRecentPerformance();
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">R-Multiple Analytics Dashboard</h2>
	
	<!-- Key Metrics -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<Card class="military-card">
			<CardContent class="p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-muted-foreground">Total R</p>
						<p class="text-2xl font-bold {stats.totalR >= 0 ? 'text-primary' : 'text-destructive'}">
							{stats.totalR >= 0 ? '+' : ''}{stats.totalR.toFixed(2)}R
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
						<p class="text-2xl font-bold text-primary">{stats.winRate.toFixed(1)}%</p>
					</div>
					<div class="bg-primary/10 p-3 rounded-xl">
						<TrendingUp class="w-6 h-6 text-primary" />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card class="military-card">
			<CardContent class="p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-muted-foreground">Expectancy</p>
						<p class="text-2xl font-bold {stats.expectancy >= 0 ? 'text-primary' : 'text-destructive'}">
							{stats.expectancy >= 0 ? '+' : ''}{stats.expectancy.toFixed(2)}R
						</p>
					</div>
					<div class="bg-secondary/10 p-3 rounded-xl">
						<BarChart3 class="w-6 h-6 text-secondary" />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card class="military-card">
			<CardContent class="p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-muted-foreground">Avg Discipline</p>
						<p class="text-2xl font-bold text-{stats.avgDisciplineScore >= 80 ? 'primary' : stats.avgDisciplineScore >= 60 ? 'yellow-500' : 'destructive'}">
							{stats.avgDisciplineScore.toFixed(0)}%
						</p>
					</div>
					<div class="bg-secondary/10 p-3 rounded-xl">
						<Award class="w-6 h-6 text-secondary" />
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Performance Breakdown -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Setup Performance -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<PieChart class="w-5 h-5 text-primary" />
					<span>Performance by Setup</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each Object.entries(setupBreakdown) as [setup, data]}
						<div class="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
							<div>
								<div class="font-medium capitalize">{setup}</div>
								<div class="text-sm text-muted-foreground">{data.count} trades</div>
							</div>
							<div class="text-right">
								<div class="font-bold {data.totalR >= 0 ? 'text-primary' : 'text-destructive'}">
									{data.totalR >= 0 ? '+' : ''}{data.totalR.toFixed(2)}R
								</div>
								<div class="text-sm text-muted-foreground">{data.winRate.toFixed(1)}% win rate</div>
							</div>
						</div>
					{/each}
					
					{#if Object.keys(setupBreakdown).length === 0}
						<p class="text-muted-foreground text-center py-8">No closed trades yet</p>
					{/if}
				</div>
			</CardContent>
		</Card>

		<!-- Session Performance -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2">
					<BarChart3 class="w-5 h-5 text-secondary" />
					<span>Performance by Session</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each Object.entries(sessionBreakdown) as [session, data]}
						<div class="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
							<div>
								<div class="font-medium">{session}</div>
								<div class="text-sm text-muted-foreground">{data.count} trades</div>
							</div>
							<div class="text-right">
								<div class="font-bold {data.totalR >= 0 ? 'text-primary' : 'text-destructive'}">
									{data.totalR >= 0 ? '+' : ''}{data.totalR.toFixed(2)}R
								</div>
								<div class="text-sm text-muted-foreground">{data.winRate.toFixed(1)}% win rate</div>
							</div>
						</div>
					{/each}
					
					{#if Object.keys(sessionBreakdown).length === 0}
						<p class="text-muted-foreground text-center py-8">No closed trades yet</p>
					{/if}
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Recent Performance -->
	<Card class="military-card">
		<CardHeader>
			<CardTitle class="flex items-center space-x-2">
				<TrendingUp class="w-5 h-5 text-primary" />
				<span>Last 30 Days Performance</span>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="text-center">
					<div class="text-2xl font-bold text-primary mb-2">{recentPerformance.totalTrades}</div>
					<div class="text-sm text-muted-foreground">Trades Completed</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold {recentPerformance.totalR >= 0 ? 'text-primary' : 'text-destructive'} mb-2">
						{recentPerformance.totalR >= 0 ? '+' : ''}{recentPerformance.totalR.toFixed(2)}R
					</div>
					<div class="text-sm text-muted-foreground">Total Return</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-primary mb-2">{recentPerformance.winRate.toFixed(1)}%</div>
					<div class="text-sm text-muted-foreground">Win Rate</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Additional Analytics Placeholders -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<Card class="military-card">
			<CardHeader>
				<CardTitle>R-Distribution Histogram</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="h-64 flex items-center justify-center text-muted-foreground">
					<div class="text-center">
						<BarChart3 class="w-12 h-12 mx-auto mb-4 opacity-50" />
						<p>Chart visualization coming soon</p>
						<p class="text-sm">R-multiple distribution analysis</p>
					</div>
				</div>
			</CardContent>
		</Card>

		<Card class="military-card">
			<CardHeader>
				<CardTitle>MAE/MFE Analysis</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="h-64 flex items-center justify-center text-muted-foreground">
					<div class="text-center">
						<TrendingDown class="w-12 h-12 mx-auto mb-4 opacity-50" />
						<p>Scatter plot visualization coming soon</p>
						<p class="text-sm">Maximum Adverse/Favorable Excursion</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Performance Summary -->
	<Card class="military-card">
		<CardHeader>
			<CardTitle>Performance Summary</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h4 class="font-semibold mb-3">Strengths</h4>
					<ul class="space-y-2 text-sm">
						{#if stats.winRate >= 60}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-primary rounded-full"></div>
								<span>Strong win rate ({stats.winRate.toFixed(1)}%)</span>
							</li>
						{/if}
						{#if stats.expectancy > 0}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-primary rounded-full"></div>
								<span>Positive expectancy ({stats.expectancy.toFixed(2)}R)</span>
							</li>
						{/if}
						{#if stats.avgDisciplineScore >= 80}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-primary rounded-full"></div>
								<span>High discipline score ({stats.avgDisciplineScore.toFixed(0)}%)</span>
							</li>
						{/if}
					</ul>
				</div>
				<div>
					<h4 class="font-semibold mb-3">Areas for Improvement</h4>
					<ul class="space-y-2 text-sm">
						{#if stats.winRate < 50}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-destructive rounded-full"></div>
								<span>Win rate below 50% - review entry criteria</span>
							</li>
						{/if}
						{#if stats.expectancy <= 0}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-destructive rounded-full"></div>
								<span>Negative expectancy - improve risk/reward</span>
							</li>
						{/if}
						{#if stats.avgDisciplineScore < 70}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-destructive rounded-full"></div>
								<span>Low discipline score - follow checklist more strictly</span>
							</li>
						{/if}
						{#if stats.totalTrades < 30}
							<li class="flex items-center space-x-2">
								<div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
								<span>Small sample size - need more trades for reliable statistics</span>
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
