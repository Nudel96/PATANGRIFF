<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle, Badge } from '$lib/components/ui';
	import { Calendar, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Trade } from '$lib/types/trading';

	export let trades: Trade[];
	export let selectedDate: Date;

	let currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

	function getMonthName(date: Date): string {
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	}

	function getDaysInMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}

	function getFirstDayOfMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	}

	function getTradesForDate(date: Date): Trade[] {
		return trades.filter(trade => {
			const tradeDate = new Date(trade.date);
			return tradeDate.toDateString() === date.toDateString();
		});
	}

	function getDayR(date: Date): number {
		const dayTrades = getTradesForDate(date);
		return dayTrades
			.filter(trade => trade.status === 'closed')
			.reduce((sum, trade) => sum + (trade.actualR || 0), 0);
	}

	function previousMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
	}

	function selectDate(day: number) {
		selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
	}

	function isToday(date: Date): boolean {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	}

	function isSelectedDate(date: Date): boolean {
		return date.toDateString() === selectedDate.toDateString();
	}

	$: daysInMonth = getDaysInMonth(currentMonth);
	$: firstDay = getFirstDayOfMonth(currentMonth);
	$: selectedDateTrades = getTradesForDate(selectedDate);
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Trading Calendar</h2>
	
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Calendar -->
		<div class="lg:col-span-2">
			<Card class="military-card">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="flex items-center space-x-2">
							<Calendar class="w-5 h-5 text-primary" />
							<span>{getMonthName(currentMonth)}</span>
						</CardTitle>
						<div class="flex items-center space-x-2">
							<button
								on:click={previousMonth}
								class="p-2 hover:bg-muted rounded-lg transition-colors"
							>
								<ChevronLeft class="w-4 h-4" />
							</button>
							<button
								on:click={nextMonth}
								class="p-2 hover:bg-muted rounded-lg transition-colors"
							>
								<ChevronRight class="w-4 h-4" />
							</button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<!-- Calendar Grid -->
					<div class="grid grid-cols-7 gap-1 mb-4">
						<!-- Day Headers -->
						{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
							<div class="p-2 text-center text-sm font-medium text-muted-foreground">
								{day}
							</div>
						{/each}
						
						<!-- Empty cells for days before month starts -->
						{#each Array(firstDay) as _}
							<div class="p-2"></div>
						{/each}
						
						<!-- Days of the month -->
						{#each Array(daysInMonth) as _, i}
							{@const day = i + 1}
							{@const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)}
							{@const dayTrades = getTradesForDate(date)}
							{@const dayR = getDayR(date)}
							
							<button
								on:click={() => selectDate(day)}
								class="p-2 text-center text-sm rounded-lg transition-colors relative {
									isToday(date) ? 'bg-primary/20 text-primary font-bold' :
									isSelectedDate(date) ? 'bg-primary text-primary-foreground' :
									dayTrades.length > 0 ? 'bg-muted/50 hover:bg-muted' :
									'hover:bg-muted/30'
								}"
							>
								<div>{day}</div>
								{#if dayTrades.length > 0}
									<div class="absolute -top-1 -right-1 w-5 h-5 bg-{dayR >= 0 ? 'primary' : 'destructive'} text-white text-xs rounded-full flex items-center justify-center">
										{dayTrades.length}
									</div>
								{/if}
								{#if dayR !== 0}
									<div class="text-xs text-{dayR >= 0 ? 'primary' : 'destructive'} font-semibold">
										{dayR >= 0 ? '+' : ''}{dayR.toFixed(1)}R
									</div>
								{/if}
							</button>
						{/each}
					</div>
					
					<!-- Legend -->
					<div class="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-primary rounded-full"></div>
							<span>Profitable Day</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-destructive rounded-full"></div>
							<span>Loss Day</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-muted rounded-full"></div>
							<span>No Trades</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Selected Date Details -->
		<div>
			<Card class="military-card">
				<CardHeader>
					<CardTitle>
						{selectedDate.toLocaleDateString('en-US', { 
							weekday: 'long', 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{#if selectedDateTrades.length > 0}
						<div class="space-y-4">
							<!-- Day Summary -->
							<div class="bg-muted/20 p-3 rounded-lg">
								<div class="text-sm text-muted-foreground mb-2">Day Summary</div>
								<div class="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span class="text-muted-foreground">Trades:</span>
										<span class="font-semibold ml-2">{selectedDateTrades.length}</span>
									</div>
									<div>
										<span class="text-muted-foreground">Total R:</span>
										<span class="font-semibold ml-2 {getDayR(selectedDate) >= 0 ? 'text-primary' : 'text-destructive'}">
											{getDayR(selectedDate) >= 0 ? '+' : ''}{getDayR(selectedDate).toFixed(2)}R
										</span>
									</div>
								</div>
							</div>

							<!-- Trades List -->
							<div class="space-y-3">
								{#each selectedDateTrades as trade}
									<div class="p-3 bg-muted/10 rounded-lg">
										<div class="flex items-center justify-between mb-2">
											<div class="flex items-center space-x-2">
												<Badge class={trade.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}>
													{trade.direction.toUpperCase()}
												</Badge>
												<span class="font-semibold">{trade.instrument}</span>
											</div>
											<Badge class={
												trade.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
												trade.status === 'open' ? 'bg-primary/10 text-primary' :
												trade.status === 'closed' ? 'bg-muted text-muted-foreground' :
												'bg-destructive/10 text-destructive'
											}>
												{trade.status}
											</Badge>
										</div>
										
										<div class="grid grid-cols-2 gap-2 text-xs">
											<div>
												<span class="text-muted-foreground">Entry:</span>
												<span class="ml-1">{trade.entryPrice.toFixed(5)}</span>
											</div>
											<div>
												<span class="text-muted-foreground">Stop:</span>
												<span class="ml-1">{trade.stopPrice.toFixed(5)}</span>
											</div>
											{#if trade.actualR !== undefined}
												<div class="col-span-2">
													<span class="text-muted-foreground">Result:</span>
													<span class="ml-1 font-semibold {trade.actualR >= 0 ? 'text-primary' : 'text-destructive'}">
														{trade.actualR >= 0 ? '+' : ''}{trade.actualR.toFixed(2)}R
													</span>
												</div>
											{/if}
										</div>
										
										{#if trade.notes}
											<div class="mt-2 text-xs text-muted-foreground">
												{trade.notes.length > 50 ? trade.notes.substring(0, 50) + '...' : trade.notes}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<div class="text-center py-8">
							<Calendar class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
							<p class="text-muted-foreground">No trades on this date</p>
						</div>
					{/if}
				</CardContent>
			</Card>
		</div>
	</div>

	<!-- Monthly Statistics -->
	<Card class="military-card">
		<CardHeader>
			<CardTitle>Monthly Statistics - {getMonthName(currentMonth)}</CardTitle>
		</CardHeader>
		<CardContent>
			{@const monthTrades = trades.filter(trade => {
				const tradeDate = new Date(trade.date);
				return tradeDate.getMonth() === currentMonth.getMonth() && 
					   tradeDate.getFullYear() === currentMonth.getFullYear();
			})}
			{@const closedMonthTrades = monthTrades.filter(trade => trade.status === 'closed')}
			{@const monthR = closedMonthTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0)}
			{@const monthWins = closedMonthTrades.filter(trade => (trade.actualR || 0) > 0).length}
			{@const monthWinRate = closedMonthTrades.length > 0 ? (monthWins / closedMonthTrades.length) * 100 : 0}
			
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div class="text-center">
					<div class="text-2xl font-bold text-primary mb-2">{monthTrades.length}</div>
					<div class="text-sm text-muted-foreground">Total Trades</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold {monthR >= 0 ? 'text-primary' : 'text-destructive'} mb-2">
						{monthR >= 0 ? '+' : ''}{monthR.toFixed(2)}R
					</div>
					<div class="text-sm text-muted-foreground">Monthly Return</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-primary mb-2">{monthWinRate.toFixed(1)}%</div>
					<div class="text-sm text-muted-foreground">Win Rate</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-secondary mb-2">{closedMonthTrades.length}</div>
					<div class="text-sm text-muted-foreground">Closed Trades</div>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
