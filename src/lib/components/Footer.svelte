<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { Mail, MessageCircle, Youtube, Twitter } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ 
		subscribe: { email: string };
		socialLink: { platform: string };
		footerLink: { section: string; link: string };
	}>();

	let email = '';

	const footerSections = [
		{
			title: 'Education',
			links: [
				{ label: 'Trading Courses', href: '#courses', description: '120+ progressive levels across four pillars with XP tracking and systematic skill development' },
				{ label: 'Market Analysis', href: '#analysis', description: 'Daily market insights, regime analysis, and professional-grade technical and fundamental research' },
				{ label: 'Live Sessions', href: '#sessions', description: 'Real-time trading rooms, market reviews, and interactive learning with expert mentors' },
				{ label: 'Resource Library', href: '#resources', description: 'Comprehensive collection of trading templates, checklists, and professional development materials' }
			]
		},
		{
			title: 'Support',
			links: [
				{ label: 'Help Center', href: '#help', description: 'Comprehensive support documentation, tutorials, and troubleshooting guides for all platform features' },
				{ label: 'Contact Us', href: '#contact', description: '24/7 support team ready to assist with technical issues, account questions, and platform guidance' },
				{ label: 'Community Guidelines', href: '#guidelines', description: 'Standards and expectations for warrior brotherhood participation and professional conduct' },
				{ label: 'Terms of Service', href: '#terms', description: 'Legal framework governing platform usage, membership rights, and community participation' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '#about', description: 'Founded by professional traders committed to forging warriors through systematic transformation and uncompromising standards' },
				{ label: 'Our Mission', href: '#mission', description: 'Transform chart-watchers into market operators through discipline, pressure, and systematic development that commands respect' },
				{ label: 'Privacy Policy', href: '#privacy', description: 'Comprehensive data protection and privacy practices ensuring secure handling of your personal and trading information' },
				{ label: 'Careers', href: '#careers', description: 'Join our team of elite trading professionals and help forge the next generation of market warriors' }
			]
		}
	];

	const socialPlatforms = [
		{ icon: Mail, platform: 'email' },
		{ icon: MessageCircle, platform: 'discord' },
		{ icon: Youtube, platform: 'youtube' },
		{ icon: Twitter, platform: 'twitter' }
	];

	function handleSubscribe() {
		if (email.trim()) {
			dispatch('subscribe', { email: email.trim() });
			email = '';
		}
	}

	function handleSocialClick(platform: string) {
		dispatch('socialLink', { platform });
	}

	function handleFooterLinkClick(section: string, link: any) {
		dispatch('footerLink', { section, link: link.label });
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubscribe();
		}
	}
</script>

<footer class="bg-background border-t border-border/50">
	<div class="container-max mx-auto px-6">
		<!-- Main Footer Content -->
		<div class="py-16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<!-- Logo and Description -->
				<div>
					<div class="flex items-center space-x-3 mb-6">
						<div class="relative">
							<img src="/Logo.svg" alt="PAT ANGRIFF Logo" class="w-8 h-8 object-contain" />
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
						{#each socialPlatforms as social}
							<Button 
								size="sm" 
								variant="outline" 
								class="p-2"
								on:click={() => handleSocialClick(social.platform)}
							>
								<svelte:component this={social.icon} class="w-4 h-4" />
							</Button>
						{/each}
					</div>
				</div>

				<!-- Footer Links -->
				{#each footerSections as section, index}
					<div>
						<h4 class="font-semibold mb-4">{section.title}</h4>
						<ul class="space-y-3">
							{#each section.links as link}
								<li>
									<button 
										class="text-foreground/60 hover:text-primary transition-colors duration-200 group cursor-pointer text-left"
										title={link.description}
										on:click={() => handleFooterLinkClick(section.title, link)}
									>
										<div class="group-hover:text-primary transition-colors">
											<div class="font-medium">{link.label}</div>
											<div class="text-xs text-foreground/50 mt-1 leading-relaxed">
												{link.description}
											</div>
										</div>
									</button>
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
				<div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
					<input
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						on:keypress={handleKeyPress}
						class="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
					<Button 
						class="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
						on:click={handleSubscribe}
					>
						Subscribe
					</Button>
				</div>
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
						<span class="text-primary font-semibold">Discipline.</span>
						<span class="text-secondary font-semibold">Strategy.</span>
						<span class="text-primary font-semibold">Results.</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</footer>
