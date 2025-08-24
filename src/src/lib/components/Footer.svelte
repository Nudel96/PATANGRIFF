<script lang="ts">
	import Button from './ui/Button.svelte';
	import { Shield, TrendingUp, Mail, MessageCircle, Youtube, Twitter } from 'lucide-svelte';

	const footerSections = [
		{
			title: 'Platform',
			links: [
				{ label: 'Four Pillars', href: '#pillars' },
				{ label: 'Trading Tools', href: '#tools' },
				{ label: 'Community', href: '#community' },
				{ label: 'Pricing', href: '#pricing' }
			]
		},
		{
			title: 'Education',
			links: [
				{ label: 'Trading Courses', href: '#' },
				{ label: 'Market Analysis', href: '#' },
				{ label: 'Live Sessions', href: '#' },
				{ label: 'Resource Library', href: '#' }
			]
		},
		{
			title: 'Support',
			links: [
				{ label: 'Help Center', href: '#' },
				{ label: 'Contact Us', href: '#' },
				{ label: 'Community Guidelines', href: '#' },
				{ label: 'Terms of Service', href: '#' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '#' },
				{ label: 'Our Mission', href: '#' },
				{ label: 'Privacy Policy', href: '#' },
				{ label: 'Careers', href: '#' }
			]
		}
	];

	let email = '';

	function handleSubscribe() {
		// Handle newsletter subscription
		console.log('Subscribe:', email);
		email = '';
	}
</script>

<footer class="bg-background border-t border-border/50">
	<div class="container-max mx-auto px-6">
		<!-- Main Footer Content -->
		<div class="py-16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
				<!-- Logo and Description -->
				<div class="lg:col-span-2">
					<div class="flex items-center space-x-3 mb-6">
						<div class="relative">
							<Shield class="w-8 h-8 text-primary" />
							<TrendingUp class="w-4 h-4 text-secondary absolute -top-1 -right-1" />
						</div>
						<div class="flex flex-col">
							<span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
							<span class="text-sm text-muted-foreground -mt-1">FORGE WARRIORS</span>
						</div>
					</div>
					<p class="text-foreground/70 mb-6 leading-relaxed">
						We forge warriors even the biggest entrepreneurs respect. Weakness is no option. 
						Only systematic transformation through discipline, pressure, and uncompromising standards.
					</p>
					<div class="flex space-x-4">
						<Button size="sm" variant="outline" class="p-2">
							<Mail class="w-4 h-4" />
						</Button>
						<Button size="sm" variant="outline" class="p-2">
							<MessageCircle class="w-4 h-4" />
						</Button>
						<Button size="sm" variant="outline" class="p-2">
							<Youtube class="w-4 h-4" />
						</Button>
						<Button size="sm" variant="outline" class="p-2">
							<Twitter class="w-4 h-4" />
						</Button>
					</div>
				</div>

				<!-- Footer Links -->
				{#each footerSections as section, index}
					<div>
						<h4 class="font-semibold mb-4">{section.title}</h4>
						<ul class="space-y-3">
							{#each section.links as link}
								<li>
									<a 
										href={link.href}
										class="text-foreground/60 hover:text-primary transition-colors duration-200"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- Newsletter Signup -->
		<div class="py-8 border-t border-border/50">
			<div class="max-w-4xl mx-auto text-center">
				<h3 class="text-xl font-bold mb-2">Stay Sharp. Stay Informed.</h3>
				<p class="text-foreground/70 mb-6">
					Get daily market insights and exclusive trading content delivered to your inbox.
				</p>
				<form on:submit|preventDefault={handleSubscribe} class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
					<input
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						class="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
						required
					/>
					<Button type="submit" class="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
						Subscribe
					</Button>
				</form>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="py-6 border-t border-border/50">
			<div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
				<div class="text-sm text-foreground/60">
					© 2024 Warrior Traders. All rights reserved.
				</div>
				<div class="flex items-center space-x-6 text-sm">
					<span class="text-foreground/60">
						<span class="text-primary font-semibold">Discipline.</span>{' '}
						<span class="text-secondary font-semibold">Strategy.</span>{' '}
						<span class="text-primary font-semibold">Results.</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</footer>