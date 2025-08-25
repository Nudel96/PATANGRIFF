<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Progress } from '$lib/components/ui';
	import { 
		GraduationCap, 
		TrendingUp, 
		Building2, 
		DollarSign, 
		Brain,
		Users,
		BookOpen,
		Award,
		ArrowRight
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		navigateToPillar: { pillar: string };
		startLevel: { pillar: string; level: number };
	}>();

	export let pillarsProgress: any[];

	const learningPillars = [
		{
			id: 'trading-mastery',
			title: 'Trading Mastery',
			subtitle: 'Strategy → Macro → Technicals → Execution',
			description: 'Master the complete trading sequence from macro-economic analysis to precise execution. Develop systematic approaches to market analysis and risk-managed position sizing.',
			icon: TrendingUp,
			color: 'primary',
			progress: 75,
			currentLevel: 23,
			totalLevels: 30,
			sections: [
				{ range: '1-10', title: 'Foundations', status: 'completed' },
				{ range: '11-20', title: 'Advanced', status: 'completed' },
				{ range: '21-30', title: 'Professional', status: 'current' }
			],
			onClick: () => dispatch('navigateToPillar', { pillar: 'trading-mastery' })
		},
		{
			id: 'business-operations',
			title: 'Business Operations',
			subtitle: 'Trading as Professional Enterprise',
			description: 'Transform trading into a systematic business operation. Develop SOPs, implement KPI tracking, and build scalable processes.',
			icon: Building2,
			color: 'secondary',
			progress: 45,
			currentLevel: 14,
			totalLevels: 30,
			sections: [
				{ range: '1-10', title: 'Business Basics', status: 'completed' },
				{ range: '11-20', title: 'Systems', status: 'current' },
				{ range: '21-30', title: 'Scaling', status: 'locked' }
			],
			onClick: () => dispatch('navigateToPillar', { pillar: 'business-operations' })
		},
		{
			id: 'capital-management',
			title: 'Capital Management',
			subtitle: 'Survival and Growth Protocols',
			description: 'Master the financial architecture of professional trading: bankroll structure, allocation, cashflow separation, and survival protocols.',
			icon: DollarSign,
			color: 'primary',
			progress: 60,
			currentLevel: 18,
			totalLevels: 30,
			sections: [
				{ range: '1-10', title: 'Risk Basics', status: 'completed' },
				{ range: '11-20', title: 'Portfolio', status: 'current' },
				{ range: '21-30', title: 'Advanced', status: 'locked' }
			],
			onClick: () => dispatch('navigateToPillar', { pillar: 'capital-management' })
		},
		{
			id: 'trading-psychology',
			title: 'Trading Psychology',
			subtitle: 'Warrior Mental Conditioning',
			description: 'Forge the mental framework of elite operators: protocol development, anti-tilt strategies, ego management, and professional identity formation.',
			icon: Brain,
			color: 'secondary',
			progress: 30,
			currentLevel: 9,
			totalLevels: 30,
			sections: [
				{ range: '1-10', title: 'Mindset', status: 'current' },
				{ range: '11-20', title: 'Discipline', status: 'locked' },
				{ range: '21-30', title: 'Mastery', status: 'locked' }
			],
			onClick: () => dispatch('navigateToPillar', { pillar: 'trading-psychology' })
		}
	];

	function getSectionStatusColor(status: string): string {
		switch (status) {
			case 'completed': return 'green-500';
			case 'current': return 'blue-500';
			case 'locked': return 'muted-foreground';
			default: return 'muted-foreground';
		}
	}

	function handleStartLevel(pillar: string, level: number) {
		dispatch('startLevel', { pillar, level });
	}
</script>

<div class="space-y-8">
	<!-- Learning Header -->
	<div class="text-center mb-12">
		<div class="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
			<GraduationCap class="w-10 h-10 text-primary" />
		</div>
		<h2 class="text-4xl font-bold mb-4">
			Warrior Development
			<span class="block gradient-text">Learning Center</span>
		</h2>
		<p class="text-xl text-foreground/70 max-w-3xl mx-auto">
			Master the Four Pillars of Trading Excellence through our comprehensive 30-level progression system. 
			Each pillar builds the skills needed to transform from chart-watcher to market operator.
		</p>
	</div>

	<!-- Four Pillars Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
		{#each learningPillars as pillar}
			<Card class="military-card group cursor-pointer transition-all duration-300 hover:border-{pillar.color}/30" on:click={pillar.onClick}>
				<CardHeader>
					<div class="flex items-start space-x-4 mb-4">
						<div class="bg-{pillar.color}/10 p-4 rounded-2xl group-hover:bg-{pillar.color}/20 transition-colors">
							<svelte:component this={pillar.icon} class="w-8 h-8 text-{pillar.color}" />
						</div>
						<div class="flex-1">
							<CardTitle class="text-2xl mb-1">{pillar.title}</CardTitle>
							<p class="text-{pillar.color} font-semibold text-sm">{pillar.subtitle}</p>
						</div>
					</div>
				</CardHeader>
				
				<CardContent>
					<p class="text-foreground/70 mb-6 leading-relaxed">
						{pillar.description}
					</p>
					
					<!-- Progress Bar -->
					<div class="space-y-2 mb-4">
						<div class="flex justify-between text-sm">
							<span>Progress</span>
							<span>{pillar.progress}%</span>
						</div>
						<Progress value={pillar.progress} class="h-2" />
						<div class="flex justify-between text-xs text-muted-foreground">
							<span>Level {pillar.currentLevel}</span>
							<span>of {pillar.totalLevels}</span>
						</div>
					</div>
					
					<!-- Level Sections -->
					<div class="grid grid-cols-3 gap-2 text-xs text-center mb-6">
						{#each pillar.sections as section}
							<div class="p-2 bg-{getSectionStatusColor(section.status)}/10 rounded">
								<div class="font-bold text-{getSectionStatusColor(section.status)}">{section.range}</div>
								<div class="text-muted-foreground">{section.title}</div>
							</div>
						{/each}
					</div>
					
					<Button 
						class="w-full bg-{pillar.color} hover:bg-{pillar.color}/90 text-{pillar.color}-foreground group"
						size="lg"
					>
						Continue Level {pillar.currentLevel}
						<ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Community and Additional Features -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2 text-lg">
					<Users class="w-5 h-5 text-secondary" />
					<span>Community</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Active Members:</span>
						<span class="font-semibold text-secondary">10,247</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Daily Messages:</span>
						<span class="font-semibold text-secondary">1,834</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Study Groups:</span>
						<span class="font-semibold text-secondary">156</span>
					</div>
				</div>
				<Button variant="outline" class="w-full mt-4">
					Join Discussions
				</Button>
			</CardContent>
		</Card>

		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2 text-lg">
					<BookOpen class="w-5 h-5 text-primary" />
					<span>Resources</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Video Lessons:</span>
						<span class="font-semibold text-primary">480+</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Templates:</span>
						<span class="font-semibold text-primary">67</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Checklists:</span>
						<span class="font-semibold text-primary">23</span>
					</div>
				</div>
				<Button variant="outline" class="w-full mt-4">
					Browse Library
				</Button>
			</CardContent>
		</Card>

		<Card class="military-card">
			<CardHeader>
				<CardTitle class="flex items-center space-x-2 text-lg">
					<Award class="w-5 h-5 text-secondary" />
					<span>Achievements</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Badges Earned:</span>
						<span class="font-semibold text-secondary">12</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">XP Points:</span>
						<span class="font-semibold text-secondary">8,450</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-muted-foreground">Rank:</span>
						<span class="font-semibold text-secondary">Warrior</span>
					</div>
				</div>
				<Button variant="outline" class="w-full mt-4">
					View All
				</Button>
			</CardContent>
		</Card>
	</div>
</div>
