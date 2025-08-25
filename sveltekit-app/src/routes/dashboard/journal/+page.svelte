<script lang="ts">
  import { onMount } from 'svelte';
  import { trades, tradingStats, addTrade, openTrade, closeTrade } from '$lib/stores/trading';
  import { toast } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  import { 
    FileText, 
    Plus, 
    Target,
    BarChart3,
    Calculator,
    Brain,
    TrendingUp,
    PlayCircle,
    StopCircle,
    Eye,
    X,
    AlertTriangle
  } from 'lucide-svelte';
  
  let showTradeForm = false;
  let newTrade = {
    instrument: '',
    direction: 'long' as 'long' | 'short',
    entryPrice: 0,
    stopPrice: 0,
    targetPrice: 0,
    riskAmount: 0,
    riskPercent: 0,
    session: 'London' as 'Asia' | 'London' | 'NY',
    notes: '',
    setup: 'breakout'
  };

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

  function handleAddTrade() {
    if (!newTrade.instrument || !newTrade.entryPrice || !newTrade.stopPrice) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const plannedRR = calculatePlannedRR();
    if (plannedRR < 1.5) {
      toast.warning('Risk/Reward ratio below minimum requirement (1.5:1)');
    }
    
    addTrade({
      date: new Date(),
      instrument: newTrade.instrument,
      direction: newTrade.direction,
      entryPrice: newTrade.entryPrice,
      stopPrice: newTrade.stopPrice,
      targetPrice: newTrade.targetPrice,
      quantity: 100000, // Default quantity
      riskAmount: newTrade.riskAmount || 300,
      riskPercent: newTrade.riskPercent || 1.0,
      plannedRR: plannedRR,
      status: 'pending',
      session: newTrade.session,
      notes: newTrade.notes,
      checklistScore: 85, // Mock checklist score
      setup: newTrade.setup
    });

    // Reset form
    newTrade = {
      instrument: '',
      direction: 'long',
      entryPrice: 0,
      stopPrice: 0,
      targetPrice: 0,
      riskAmount: 0,
      riskPercent: 0,
      session: 'London',
      notes: '',
      setup: 'breakout'
    };
    showTradeForm = false;
    toast.success('Trade added to journal');
  }

  function handleOpenTrade(tradeId: string) {
    openTrade(tradeId);
    toast.success('Trade opened');
  }

  function handleCloseTrade(tradeId: string) {
    const trade = $trades.find(t => t.id === tradeId);
    if (trade) {
      closeTrade(tradeId, trade.targetPrice || trade.entryPrice, 'Manual close');
      toast.success('Trade closed');
    }
  }
</script>

<svelte:head>
  <title>Trading Journal - PRICEACTIONTALK</title>
</svelte:head>

<div class="container-max mx-auto px-6 py-8">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold gradient-text">Trading Journal</h1>
      <p class="text-foreground/70">R-Multiple Performance Tracking</p>
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
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

  <!-- Action Bar -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold">Trade Journal</h2>
    <Button on:click={() => showTradeForm = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
      <Plus class="w-4 h-4 mr-2" />
      New Trade
    </Button>
  </div>

  <!-- New Trade Form -->
  {#if showTradeForm}
    <Card class="military-card mb-6">
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
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="setup">Setup Type</Label>
            <Select bind:value={newTrade.setup}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakout">Breakout</SelectItem>
                <SelectItem value="retracement">Retracement</SelectItem>
                <SelectItem value="reversal">Reversal</SelectItem>
              </SelectContent>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="riskAmount">Risk Amount ($)</Label>
            <Input
              id="riskAmount"
              type="number"
              step="0.01"
              placeholder="300.00"
              bind:value={newTrade.riskAmount}
            />
          </div>
          <div class="space-y-2">
            <Label for="session">Session</Label>
            <Select bind:value={newTrade.session}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Risk Calculations -->
        {#if newTrade.entryPrice && newTrade.stopPrice && newTrade.targetPrice}
          <div class="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 class="font-semibold text-primary mb-2">Risk/Reward Analysis</h4>
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span class="text-muted-foreground">Risk:</span>
                <span class="ml-2 font-medium">{calculateInitialRisk().toFixed(5)}</span>
              </div>
              <div>
                <span class="text-muted-foreground">Reward:</span>
                <span class="ml-2 font-medium">
                  {Math.abs(newTrade.targetPrice - newTrade.entryPrice).toFixed(5)}
                </span>
              </div>
              <div>
                <span class="text-muted-foreground">R:R Ratio:</span>
                <span class="ml-2 font-medium text-primary">{calculatePlannedRR().toFixed(2)}:1</span>
              </div>
            </div>
          </div>
          
          {#if calculatePlannedRR() < 1.5}
            <div class="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle class="w-4 h-4 text-destructive" />
              <span class="text-sm text-destructive">Warning: R:R ratio below minimum requirement (1.5:1)</span>
            </div>
          {/if}
        {/if}

        <!-- Notes -->
        <div class="space-y-2">
          <Label for="notes">Trade Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add your trade analysis and reasoning..."
            bind:value={newTrade.notes}
            rows={3}
          />
        </div>

        <div class="flex justify-between">
          <Button variant="outline" on:click={() => showTradeForm = false}>
            Cancel
          </Button>
          <Button 
            on:click={handleAddTrade}
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
    {#each $trades as trade (trade.id)}
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

          {#if trade.notes}
            <div class="mb-4 p-3 bg-muted/10 rounded-lg">
              <p class="text-sm">{trade.notes}</p>
            </div>
          {/if}

          <div class="flex justify-between items-center">
            <div class="text-xs text-muted-foreground">
              Created: {trade.createdAt.toLocaleString()}
            </div>
            <div class="flex space-x-2">
              {#if trade.status === 'pending'}
                <Button size="sm" on:click={() => handleOpenTrade(trade.id)}>
                  <PlayCircle class="w-4 h-4 mr-1" />
                  Open
                </Button>
                <Button size="sm" variant="outline">
                  <X class="w-4 h-4 mr-1" />
                  Invalidate
                </Button>
              {/if}
              {#if trade.status === 'open'}
                <Button size="sm" variant="outline" on:click={() => handleCloseTrade(trade.id)}>
                  <StopCircle class="w-4 h-4 mr-1" />
                  Close
                </Button>
              {/if}
              <Button size="sm" variant="ghost">
                <Eye class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    {/each}

    {#if $trades.length === 0}
      <Card class="military-card">
        <CardContent class="p-12 text-center">
          <FileText class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">No trades logged yet</h3>
          <p class="text-muted-foreground mb-6">
            Start tracking your trading performance with your first trade entry.
          </p>
          <Button on:click={() => showTradeForm = true} class="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus class="w-4 h-4 mr-2" />
            Log Your First Trade
          </Button>
        </CardContent>
      </Card>
    {/if}
  </div>
</div>