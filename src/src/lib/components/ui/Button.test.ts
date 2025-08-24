import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from './Button.svelte';

describe('Button Component', () => {
	it('renders with default variant', () => {
		render(Button, { props: { children: 'Test Button' } });
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Test Button');
	});

	it('applies correct variant classes', () => {
		render(Button, { props: { variant: 'outline', children: 'Outline Button' } });
		const button = screen.getByRole('button');
		expect(button).toHaveClass('border');
	});

	it('handles click events', async () => {
		let clicked = false;
		const handleClick = () => { clicked = true; };
		
		render(Button, { 
			props: { 
				children: 'Click Me',
				onclick: handleClick
			} 
		});
		
		const button = screen.getByRole('button');
		await button.click();
		expect(clicked).toBe(true);
	});

	it('can be disabled', () => {
		render(Button, { props: { disabled: true, children: 'Disabled' } });
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});
});