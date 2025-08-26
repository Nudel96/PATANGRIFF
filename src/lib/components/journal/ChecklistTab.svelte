<script lang="ts">
	import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '$lib/components/ui';
	import { Plus, Edit, Trash2, Settings, CheckCircle } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ChecklistTemplate, ChecklistItem } from '$lib/types/trading';
	import { DEFAULT_CHECKLIST_TEMPLATES } from '$lib/types/trading';

	const dispatch = createEventDispatcher();

	let templates: ChecklistTemplate[] = [...DEFAULT_CHECKLIST_TEMPLATES];
	let selectedTemplate: ChecklistTemplate | null = null;
	let showTemplateForm = false;
	let editingTemplate: ChecklistTemplate | null = null;

	// Form state for creating/editing templates
	let templateForm = {
		name: '',
		items: [] as ChecklistItem[]
	};

	function handleNewTemplate() {
		templateForm = {
			name: '',
			items: []
		};
		editingTemplate = null;
		showTemplateForm = true;
	}

	function handleEditTemplate(template: ChecklistTemplate) {
		templateForm = {
			name: template.name,
			items: [...template.items]
		};
		editingTemplate = template;
		showTemplateForm = true;
	}

	function handleDeleteTemplate(templateId: string) {
		if (confirm('Are you sure you want to delete this checklist template?')) {
			templates = templates.filter(t => t.id !== templateId);
		}
	}

	function addChecklistItem() {
		const newItem: ChecklistItem = {
			id: Date.now().toString(),
			text: '',
			checked: false,
			weight: 10
		};
		templateForm.items = [...templateForm.items, newItem];
	}

	function removeChecklistItem(itemId: string) {
		templateForm.items = templateForm.items.filter(item => item.id !== itemId);
	}

	function updateChecklistItem(itemId: string, field: keyof ChecklistItem, value: any) {
		templateForm.items = templateForm.items.map(item => 
			item.id === itemId ? { ...item, [field]: value } : item
		);
	}

	function saveTemplate() {
		if (!templateForm.name.trim()) {
			alert('Please enter a template name');
			return;
		}

		if (templateForm.items.length === 0) {
			alert('Please add at least one checklist item');
			return;
		}

		const totalWeight = templateForm.items.reduce((sum, item) => sum + item.weight, 0);
		if (totalWeight !== 100) {
			alert(`Total weight must equal 100%. Current total: ${totalWeight}%`);
			return;
		}

		const template: ChecklistTemplate = {
			id: editingTemplate?.id || Date.now().toString(),
			name: templateForm.name,
			items: templateForm.items.map(item => ({
				...item,
				text: item.text.trim()
			}))
		};

		if (editingTemplate) {
			templates = templates.map(t => t.id === editingTemplate.id ? template : t);
		} else {
			templates = [...templates, template];
		}

		showTemplateForm = false;
		editingTemplate = null;
	}

	function cancelTemplateForm() {
		showTemplateForm = false;
		editingTemplate = null;
	}

	function selectTemplate(template: ChecklistTemplate) {
		selectedTemplate = template;
	}

	function calculateTotalWeight(items: ChecklistItem[]): number {
		return items.reduce((sum, item) => sum + item.weight, 0);
	}

	$: totalWeight = calculateTotalWeight(templateForm.items);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Checklist Manager</h2>
		<Button on:click={handleNewTemplate} class="bg-primary hover:bg-primary/90 text-primary-foreground">
			<Plus class="w-4 h-4 mr-2"></Plus>
			New Template
		</Button>
	</div>

	{#if showTemplateForm}
		<!-- Template Form -->
		<Card class="military-card">
			<CardHeader>
				<CardTitle>
					{editingTemplate ? 'Edit Template' : 'Create New Template'}
				</CardTitle>
			</CardHeader>
			<CardContent class="space-y-6">
				<!-- Template Name -->
				<div class="space-y-2">
					<Label for="templateName">Template Name</Label>
					<Input
						id="templateName"
						placeholder="e.g., Breakout Setup"
						bind:value={templateForm.name}
					/>
				</div>

				<!-- Checklist Items -->
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<Label>Checklist Items</Label>
						<div class="text-sm text-muted-foreground">
							Total Weight: <span class="font-semibold {totalWeight === 100 ? 'text-primary' : 'text-destructive'}">{totalWeight}%</span>
						</div>
					</div>

					<div class="space-y-3">
						{#each templateForm.items as item, index (item.id)}
							<div class="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
								<div class="flex-1">
									<Input
										placeholder="Checklist item description"
										bind:value={item.text}
									/>
								</div>
								<div class="w-20">
									<Input
										type="number"
										min="1"
										max="100"
										placeholder="Weight"
										bind:value={item.weight}
									/>
								</div>
								<Button
									size="sm"
									variant="ghost"
									on:click={() => removeChecklistItem(item.id)}
								>
									<Trash2 class="w-4 h-4"></Trash2>
								</Button>
							</div>
						{/each}
					</div>

					<Button variant="outline" on:click={addChecklistItem} class="w-full">
						<Plus class="w-4 h-4 mr-2"></Plus>
						Add Item
					</Button>
				</div>

				<!-- Form Actions -->
				<div class="flex items-center justify-end space-x-4 pt-4 border-t border-border">
					<Button variant="outline" on:click={cancelTemplateForm}>
						Cancel
					</Button>
					<Button 
						on:click={saveTemplate}
						class="bg-primary hover:bg-primary/90 text-primary-foreground"
						disabled={!templateForm.name.trim() || templateForm.items.length === 0 || totalWeight !== 100}
					>
						{editingTemplate ? 'Update Template' : 'Create Template'}
					</Button>
				</div>
			</CardContent>
		</Card>
	{:else}
		<!-- Templates List -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Templates -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Available Templates</h3>
				{#each templates as template}
					<Card 
						class="military-card cursor-pointer transition-all duration-200 {selectedTemplate?.id === template.id ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/30'}"
						on:click={() => selectTemplate(template)}
					>
						<CardHeader>
							<div class="flex items-center justify-between">
								<CardTitle class="text-lg">{template.name}</CardTitle>
								<div class="flex items-center space-x-2">
									<Button
										size="sm"
										variant="ghost"
										on:click={(e) => {
											e.stopPropagation();
											handleEditTemplate(template);
										}}
									>
										<Edit class="w-3 h-3"></Edit>
									</Button>
									<Button
										size="sm"
										variant="ghost"
										on:click={(e) => {
											e.stopPropagation();
											handleDeleteTemplate(template.id);
										}}
									>
										<Trash2 class="w-3 h-3"></Trash2>
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div class="space-y-2">
								<div class="text-sm text-muted-foreground">
									{template.items.length} items • Total weight: {calculateTotalWeight(template.items)}%
								</div>
								<div class="space-y-1">
									{#each template.items.slice(0, 3) as item}
										<div class="text-sm flex items-center justify-between">
											<span class="truncate">{item.text}</span>
											<span class="text-muted-foreground ml-2">{item.weight}%</span>
										</div>
									{/each}
									{#if template.items.length > 3}
										<div class="text-xs text-muted-foreground">
											+{template.items.length - 3} more items...
										</div>
									{/if}
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}

				{#if templates.length === 0}
					<Card class="military-card">
						<CardContent class="text-center py-12">
							<Settings class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50"></Settings>
							<h3 class="text-lg font-semibold mb-2">No templates yet</h3>
							<p class="text-muted-foreground mb-4">
								Create your first checklist template to ensure consistent trade execution.
							</p>
							<Button on:click={handleNewTemplate} class="bg-primary hover:bg-primary/90 text-primary-foreground">
								<Plus class="w-4 h-4 mr-2"></Plus>
								Create First Template
							</Button>
						</CardContent>
					</Card>
				{/if}
			</div>

			<!-- Template Preview -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Template Preview</h3>
				{#if selectedTemplate}
					<Card class="military-card">
						<CardHeader>
							<CardTitle class="flex items-center space-x-2">
								<CheckCircle class="w-5 h-5 text-primary"></CheckCircle>
								<span>{selectedTemplate.name}</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="text-sm text-muted-foreground mb-4">
									This checklist will be automatically applied when creating trades with the "{selectedTemplate.id}" setup.
								</div>

								<div class="space-y-3">
									{#each selectedTemplate.items as item}
										<div class="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
											<input
												type="checkbox"
												disabled
												class="mt-1 rounded border-border"
											/>
											<div class="flex-1">
												<div class="text-sm">{item.text}</div>
												<div class="text-xs text-muted-foreground mt-1">
													Weight: {item.weight}%
												</div>
											</div>
										</div>
									{/each}
								</div>

								<div class="bg-primary/10 p-3 rounded-lg">
									<div class="text-sm font-semibold text-primary mb-1">
										Scoring System
									</div>
									<div class="text-xs text-muted-foreground">
										Each checked item contributes its weight percentage to your discipline score. 
										Aim for 80%+ to maintain high trading standards.
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				{:else}
					<Card class="military-card">
						<CardContent class="text-center py-12">
							<CheckCircle class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50"></CheckCircle>
							<p class="text-muted-foreground">
								Select a template to preview its checklist items and scoring system.
							</p>
						</CardContent>
					</Card>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Usage Instructions -->
	<Card class="military-card">
		<CardHeader>
			<CardTitle>How Checklists Work</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h4 class="font-semibold mb-3">Creating Templates</h4>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li>• Create templates for each setup type (breakout, pullback, etc.)</li>
						<li>• Each item should have a weight that reflects its importance</li>
						<li>• Total weight must equal 100% for accurate scoring</li>
						<li>• Focus on objective, measurable criteria</li>
					</ul>
				</div>
				<div>
					<h4 class="font-semibold mb-3">Using in Trades</h4>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li>• Checklists auto-populate based on setup selection</li>
						<li>• Complete before entering any trade</li>
						<li>• Discipline score tracks your consistency</li>
						<li>• Aim for 80%+ scores for optimal results</li>
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
