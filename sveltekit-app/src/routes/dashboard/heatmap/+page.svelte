<script lang="ts">
  import { heatmapData, lastUpdated, selectedTimeframe, marketSummary, refreshMarketData } from '$lib/stores/market';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  import { 
    Activity, 
    BarChart3, 
    RefreshCw,
    Target,
    TrendingUp,
    Eye,
    Zap
  } from 'lucide-svelte';
  
  let refreshing = false;

  function getScoreColor(score: number): string {
    if (score >= 8) return 'bg-primary text-primary-foreground';
    if (score >= 4) return 'bg-primary/70 text-primary-foreground';
    if (score >= -3) return 'bg-muted text-muted-foreground';
    if (score >= -7) return 'bg-destructive/70 text-destructive-foreground';
    return 'bg-destructive text-destructive-foreground';
  }

  function getCellColor(value: number): string {
    if (value === 2) return 'bg-primary text-primary-foreground';
    if (value === 1) return 'bg-primary/50 text-foreground';
    if (value === 0) return 'bg-muted text-muted-foreground';
    if (value === -1) return 'bg-destructive/50 text-foreground';
    if (value === -2) return 'bg-destructive text-destructive-foreground';
    return 'bg-muted text-muted-foreground';
  }

  function getBiasColor(bias: string): string {
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
    refreshMarketData();
    setTimeout(() => {
      refreshing = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>Market Heatmap - PRICEACTIONTALK</title>
</svelte:head>

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
    <div class="flex items-center space-x-4">
      <Select bind:value={$selectedTimeframe}>
        <SelectTrigger class="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
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
    </div>
  </div>

  <!-- Heatmap Table -->
  <Card class="military-card mb-8">
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
              <th class="p-2 text-center bg-purple-900/10">Employment</th>
              <th class="p-2 text-center bg-purple-900/10">Unemployment</th>
              <th class="p-2 text-center bg-purple-900/10">Interest Rates</th>
            </tr>
          </thead>
          <tbody>
            {#each $heatmapData as item}
              <tr class="border-b border-border/50 hover:bg-muted/10 transition-colors">
                <td class="p-4">
                  <div class="flex items-center space-x-2">
                    <span class="font-semibold text-primary">{item.asset}</span>
                    <Button variant="ghost" size="sm" class="h-6 w-6 p-0">
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

  <!-- Market Summary -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card class="military-card">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2 text-lg">
          <TrendingUp class="w-5 h-5 text-primary" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Bullish Assets:</span>
            <span class="font-semibold text-primary">{$marketSummary.bullishAssets}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Bearish Assets:</span>
            <span class="font-semibold text-destructive">{$marketSummary.bearishAssets}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Strong Signals:</span>
            <span class="font-semibold text-secondary">{$marketSummary.strongSignals}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="military-card">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2 text-lg">
          <Activity class="w-5 h-5 text-secondary" />
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

    <Card class="military-card" colspan="2">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2 text-lg">
          <Target class="w-5 h-5 text-primary" />
          <span>Strongest Signals</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          {#each $heatmapData.filter(item => Math.abs(item.score) > 8).slice(0, 5) as item}
            <div class="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
              <span class="font-medium">{item.asset}</span>
              <Badge class="{item.score > 0 ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}">
                {item.score > 0 ? '+' : ''}{item.score}
              </Badge>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </div>
</div>