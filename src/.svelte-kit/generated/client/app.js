export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/dashboard": [4,[2]],
		"/dashboard/community": [5,[2]],
		"/dashboard/heatmap": [6,[2]],
		"/dashboard/journal": [7,[2]],
		"/dashboard/learning": [8,[2]],
		"/dashboard/learning/business-operations": [9,[2]],
		"/dashboard/learning/capital-management": [10,[2]],
		"/dashboard/learning/trading-mastery": [11,[2]],
		"/dashboard/learning/trading-psychology": [12,[2]],
		"/dashboard/squads": [13,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';