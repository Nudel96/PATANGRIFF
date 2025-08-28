import type { LearningLevel } from '$lib/types/learning';

// Trading Mastery Intermediate Levels (11-20)
export const TRADING_MASTERY_INTERMEDIATE_LEVELS: LearningLevel[] = [
	{
		level: 11,
		title: "Advanced Chart Patterns",
		description: "Master complex chart patterns for better trade entries",
		tier: "Intermediate",
		unlockRequirement: 650,
		completed: false,
		locked: true,
		totalXP: 85,
		modules: [
			{
				id: "11-1",
				title: "Head and Shoulders Patterns",
				description: "Identify and trade reversal patterns",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Head and shoulders patterns signal trend reversals. The pattern consists of three peaks: left shoulder, head (highest), and right shoulder. The neckline connects the lows between peaks. A break below the neckline confirms the reversal with a target equal to the head's height."
			},
			{
				id: "11-2",
				title: "Triangle and Wedge Patterns",
				description: "Master continuation and reversal patterns",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Triangles show consolidation before continuation. Ascending triangles are bullish, descending are bearish. Symmetrical triangles can break either way. Wedges are reversal patterns - rising wedges are bearish, falling wedges are bullish."
			}
		]
	},
	{
		level: 12,
		title: "Multiple Timeframe Analysis",
		description: "Analyze markets across different timeframes",
		tier: "Intermediate",
		unlockRequirement: 735,
		completed: false,
		locked: true,
		totalXP: 90,
		modules: [
			{
				id: "12-1",
				title: "Top-Down Analysis",
				description: "Start with higher timeframes and drill down",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Top-down analysis starts with monthly/weekly charts for major trend, daily for intermediate trend, and hourly for entry timing. Higher timeframes provide context and direction. Lower timeframes provide precise entry and exit points. Always align your trades with the higher timeframe trend."
			},
			{
				id: "12-2",
				title: "Timeframe Harmony",
				description: "Ensure all timeframes align for high-probability trades",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "The best trades occur when multiple timeframes align. Look for: weekly uptrend, daily pullback to support, hourly reversal signal. This creates high-probability setups with favorable risk-reward ratios."
			}
		]
	},
	{
		level: 13,
		title: "Volume Analysis",
		description: "Use volume to confirm price movements",
		tier: "Intermediate",
		unlockRequirement: 825,
		completed: false,
		locked: true,
		totalXP: 85,
		modules: [
			{
				id: "13-1",
				title: "Volume Price Analysis",
				description: "Understand the relationship between volume and price",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Volume confirms price movements. Rising prices on increasing volume show strength. Rising prices on decreasing volume show weakness. Volume spikes often occur at turning points. Use volume to validate breakouts and identify false moves."
			},
			{
				id: "13-2",
				title: "Volume Indicators",
				description: "Master OBV, VWAP, and volume oscillators",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "On-Balance Volume (OBV) tracks cumulative volume flow. VWAP shows average price weighted by volume. Volume oscillators identify overbought/oversold conditions based on volume patterns."
			}
		]
	},
	{
		level: 14,
		title: "Fibonacci Analysis",
		description: "Master Fibonacci retracements and extensions",
		tier: "Intermediate",
		unlockRequirement: 910,
		completed: false,
		locked: true,
		totalXP: 80,
		modules: [
			{
				id: "14-1",
				title: "Fibonacci Retracements",
				description: "Identify potential support and resistance levels",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Fibonacci retracements identify potential reversal levels during pullbacks. Key levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. The 61.8% level is often the most significant. Use these levels to plan entries and set stop losses."
			},
			{
				id: "14-2",
				title: "Fibonacci Extensions",
				description: "Project price targets using Fibonacci ratios",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Fibonacci extensions project potential price targets beyond the original move. Key extension levels are 127.2%, 161.8%, and 261.8%. Use these to set profit targets and identify potential reversal zones."
			}
		]
	},
	{
		level: 15,
		title: "Market Structure Analysis",
		description: "Understand how markets move and behave",
		tier: "Intermediate",
		unlockRequirement: 990,
		completed: false,
		locked: true,
		totalXP: 95,
		modules: [
			{
				id: "15-1",
				title: "Market Phases",
				description: "Identify accumulation, markup, distribution, and decline phases",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Markets move in four phases: Accumulation (smart money buying), Markup (public participation), Distribution (smart money selling), Decline (public selling). Identify these phases to trade with institutional flow."
			},
			{
				id: "15-2",
				title: "Supply and Demand Zones",
				description: "Identify institutional order flow areas",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Supply and demand zones are areas where institutional orders create imbalances. Look for strong moves away from consolidation areas. These zones often provide high-probability reversal points when retested."
			}
		]
	}
];

// Trading Mastery Professional Levels (21-30)
export const TRADING_MASTERY_PROFESSIONAL_LEVELS: LearningLevel[] = [
	{
		level: 21,
		title: "Macro-Economic Analysis",
		description: "Understand how economic factors drive markets",
		tier: "Professional",
		unlockRequirement: 1450,
		completed: false,
		locked: true,
		totalXP: 110,
		modules: [
			{
				id: "21-1",
				title: "Economic Indicators",
				description: "Master GDP, inflation, employment, and sentiment data",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Economic indicators drive long-term market trends. GDP shows economic growth, inflation affects interest rates, employment indicates economic health. Leading indicators predict future conditions, lagging indicators confirm trends."
			},
			{
				id: "21-2",
				title: "Economic Calendar Trading",
				description: "Trade around major economic releases",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Major economic releases create volatility and trading opportunities. Plan trades around NFP, CPI, GDP, and central bank meetings. Understand market expectations vs actual results to predict price reactions."
			}
		]
	},
	{
		level: 22,
		title: "Central Bank Policy Impact",
		description: "Understand monetary policy effects on markets",
		tier: "Professional",
		unlockRequirement: 1560,
		completed: false,
		locked: true,
		totalXP: 115,
		modules: [
			{
				id: "22-1",
				title: "Interest Rate Policy",
				description: "How central bank rates affect currency values",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Central bank interest rates are the primary driver of currency values. Higher rates attract foreign investment, strengthening currency. Rate expectations often matter more than actual rates. Monitor central bank communications for policy hints."
			},
			{
				id: "22-2",
				title: "Quantitative Easing Effects",
				description: "Understand QE impact on markets and currencies",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Quantitative Easing increases money supply, typically weakening currency but boosting asset prices. QE creates liquidity that flows into risk assets. Monitor QE announcements and tapering for major market moves."
			}
		]
	},
	{
		level: 23,
		title: "Intermarket Analysis",
		description: "Analyze relationships between different markets",
		tier: "Professional",
		unlockRequirement: 1675,
		completed: false,
		locked: true,
		totalXP: 105,
		modules: [
			{
				id: "23-1",
				title: "Currency Correlations",
				description: "Understand how currency pairs move together",
				type: "lesson",
				xpReward: 60,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Currency correlations show how pairs move relative to each other. EUR/USD and GBP/USD are positively correlated. USD/CHF and EUR/USD are negatively correlated. Use correlations for portfolio diversification and confirmation signals."
			},
			{
				id: "23-2",
				title: "Commodity-Currency Links",
				description: "Trade currencies based on commodity relationships",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Commodity currencies (AUD, CAD, NZD) correlate with commodity prices. AUD follows gold and iron ore, CAD follows oil, NZD follows dairy prices. Use commodity trends to predict currency movements."
			}
		]
	},
	{
		level: 24,
		title: "Advanced Position Sizing",
		description: "Optimize position sizes for maximum returns",
		tier: "Professional",
		unlockRequirement: 1780,
		completed: false,
		locked: true,
		totalXP: 120,
		modules: [
			{
				id: "24-1",
				title: "Kelly Criterion",
				description: "Mathematical approach to position sizing",
				type: "lesson",
				xpReward: 70,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Kelly Criterion calculates optimal position size based on win rate and average win/loss ratio. Formula: f = (bp - q) / b, where b = odds, p = win probability, q = loss probability. Use fractional Kelly to reduce volatility."
			},
			{
				id: "24-2",
				title: "Risk Parity Models",
				description: "Balance risk across multiple positions",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Risk parity allocates equal risk to each position rather than equal capital. Adjust position sizes based on volatility and correlation. This approach maximizes diversification benefits and reduces portfolio volatility."
			}
		]
	},
	{
		level: 25,
		title: "Portfolio Management",
		description: "Manage multiple positions and strategies",
		tier: "Professional",
		unlockRequirement: 1900,
		completed: false,
		locked: true,
		totalXP: 115,
		modules: [
			{
				id: "25-1",
				title: "Portfolio Construction",
				description: "Build diversified trading portfolios",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Portfolio construction involves selecting uncorrelated strategies and markets. Combine trend following, mean reversion, and breakout strategies. Diversify across timeframes, markets, and geographic regions to reduce overall portfolio risk."
			},
			{
				id: "25-2",
				title: "Performance Attribution",
				description: "Analyze what drives portfolio returns",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Performance attribution breaks down returns by strategy, market, and time period. Identify which strategies and markets contribute most to profits. Use this analysis to optimize portfolio allocation and eliminate underperforming elements."
			}
		]
	},
	{
		level: 26,
		title: "Algorithmic Trading Concepts",
		description: "Introduction to systematic trading approaches",
		tier: "Professional",
		unlockRequirement: 2015,
		completed: false,
		locked: true,
		totalXP: 125,
		modules: [
			{
				id: "26-1",
				title: "Strategy Development Process",
				description: "Systematic approach to creating trading algorithms",
				type: "lesson",
				xpReward: 75,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Algorithmic strategy development follows a structured process: hypothesis formation, rule definition, backtesting, optimization, walk-forward analysis, and live implementation. Each step validates the strategy's robustness and profitability."
			},
			{
				id: "26-2",
				title: "Backtesting Best Practices",
				description: "Avoid common backtesting pitfalls",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Proper backtesting requires out-of-sample data, realistic transaction costs, and proper handling of survivorship bias. Avoid over-optimization and curve fitting. Use walk-forward analysis to validate strategy robustness across different market conditions."
			}
		]
	},
	{
		level: 27,
		title: "Risk-Adjusted Returns",
		description: "Measure and optimize risk-adjusted performance",
		tier: "Professional",
		unlockRequirement: 2140,
		completed: false,
		locked: true,
		totalXP: 110,
		modules: [
			{
				id: "27-1",
				title: "Sharpe and Sortino Ratios",
				description: "Calculate and interpret risk-adjusted metrics",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Sharpe ratio measures excess return per unit of total risk. Sortino ratio focuses on downside risk only. Higher ratios indicate better risk-adjusted performance. Target Sharpe ratios above 1.0 for good strategies, above 2.0 for excellent strategies."
			},
			{
				id: "27-2",
				title: "Maximum Drawdown Analysis",
				description: "Understand and manage drawdown risk",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Maximum drawdown measures the largest peak-to-trough decline. It indicates the worst-case scenario for strategy performance. Use drawdown analysis to set appropriate position sizes and determine if a strategy fits your risk tolerance."
			}
		]
	},
	{
		level: 28,
		title: "Professional Trading Systems",
		description: "Build institutional-grade trading systems",
		tier: "Professional",
		unlockRequirement: 2250,
		completed: false,
		locked: true,
		totalXP: 130,
		modules: [
			{
				id: "28-1",
				title: "System Architecture",
				description: "Design robust trading system infrastructure",
				type: "lesson",
				xpReward: 75,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Professional trading systems require robust architecture: data feeds, signal generation, risk management, order management, and performance monitoring. Build redundancy and failsafes to handle system failures and market disruptions."
			},
			{
				id: "28-2",
				title: "Risk Management Integration",
				description: "Embed risk controls throughout the system",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Integrate risk management at every level: position limits, sector limits, correlation limits, and overall portfolio limits. Implement real-time monitoring and automatic position reduction when limits are breached."
			}
		]
	},
	{
		level: 29,
		title: "Institutional Trading Strategies",
		description: "Learn how institutions approach the markets",
		tier: "Professional",
		unlockRequirement: 2380,
		completed: false,
		locked: true,
		totalXP: 125,
		modules: [
			{
				id: "29-1",
				title: "Order Flow Analysis",
				description: "Read institutional order flow and positioning",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Institutional order flow creates market structure. Large orders are broken into smaller pieces and executed over time. Look for absorption at key levels, unusual volume patterns, and price rejection areas to identify institutional activity."
			},
			{
				id: "29-2",
				title: "Market Making vs Taking",
				description: "Understand different institutional approaches",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Market makers provide liquidity and profit from bid-ask spreads. Market takers consume liquidity for directional moves. Understand when to provide liquidity (range markets) vs take liquidity (trending markets)."
			}
		]
	},
	{
		level: 30,
		title: "Master Trader Capstone",
		description: "Integrate all skills into a complete trading approach",
		tier: "Professional",
		unlockRequirement: 2505,
		completed: false,
		locked: true,
		totalXP: 150,
		modules: [
			{
				id: "30-1",
				title: "Complete Trading Framework",
				description: "Develop your personal trading methodology",
				type: "lesson",
				xpReward: 80,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "A complete trading framework integrates market analysis, risk management, psychology, and execution. Define your edge, document your process, and continuously refine your approach. Successful trading is about consistent execution of a proven methodology."
			},
			{
				id: "30-2",
				title: "Master Trader Assessment",
				description: "Comprehensive evaluation of trading skills",
				type: "challenge",
				xpReward: 70,
				duration: "120 min",
				completed: false,
				locked: false
			}
		]
	}
];

// Combine all Trading Mastery levels
export const COMPLETE_TRADING_MASTERY_LEVELS: LearningLevel[] = [
	// Levels 1-10 are defined in learning.ts
	...TRADING_MASTERY_INTERMEDIATE_LEVELS,
	...TRADING_MASTERY_PROFESSIONAL_LEVELS
];
