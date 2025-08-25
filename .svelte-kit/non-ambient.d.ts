
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/dashboard/community" | "/dashboard/heatmap" | "/dashboard/journal" | "/dashboard/learning" | "/dashboard/learning/business-ops" | "/dashboard/learning/capital-mgmt" | "/dashboard/learning/psychology" | "/dashboard/learning/trading-mastery";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/dashboard/community": Record<string, never>;
			"/dashboard/heatmap": Record<string, never>;
			"/dashboard/journal": Record<string, never>;
			"/dashboard/learning": Record<string, never>;
			"/dashboard/learning/business-ops": Record<string, never>;
			"/dashboard/learning/capital-mgmt": Record<string, never>;
			"/dashboard/learning/psychology": Record<string, never>;
			"/dashboard/learning/trading-mastery": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/dashboard/community" | "/dashboard/community/" | "/dashboard/heatmap" | "/dashboard/heatmap/" | "/dashboard/journal" | "/dashboard/journal/" | "/dashboard/learning" | "/dashboard/learning/" | "/dashboard/learning/business-ops" | "/dashboard/learning/business-ops/" | "/dashboard/learning/capital-mgmt" | "/dashboard/learning/capital-mgmt/" | "/dashboard/learning/psychology" | "/dashboard/learning/psychology/" | "/dashboard/learning/trading-mastery" | "/dashboard/learning/trading-mastery/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | string & {};
	}
}