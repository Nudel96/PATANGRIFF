# Library Migration Mapping

## React → SvelteKit Library Replacements

### UI Component Libraries

| React Library | SvelteKit Replacement | Migration Notes |
|---------------|----------------------|-----------------|
| `@radix-ui/react-*` | `bits-ui` | Complete headless component library |
| `lucide-react` | `lucide-svelte` | Direct icon library replacement |
| `next-themes` | `mode-watcher` | Theme management for SvelteKit |
| `sonner` | `svelte-sonner` | Toast notification system |
| `vaul` | `bits-ui` drawer | Drawer/sheet component |
| `cmdk` | `cmdk-sv` | Command palette component |
| `react-day-picker` | `bits-ui` calendar | Date picker component |
| `embla-carousel-react` | `embla-carousel-svelte` | Carousel component |
| `react-resizable-panels` | `paneforge` | Resizable panel system |
| `input-otp` | `bits-ui` pin-input | OTP input component |

### Form Libraries

| React Library | SvelteKit Replacement | Migration Notes |
|---------------|----------------------|-----------------|
| `react-hook-form` | `sveltekit-superforms` | Enhanced form handling with actions |
| `@hookform/resolvers` | `sveltekit-superforms/adapters` | Validation adapter |
| `zod` | `zod` | Keep - validation schema library |

### Chart Libraries

| React Library | SvelteKit Replacement | Migration Notes |
|---------------|----------------------|-----------------|
| `recharts` | `svelte-apexcharts` | More feature-rich charting |
| Alternative | `chart.js` + `svelte-chartjs` | Lighter weight option |

### State Management

| React Pattern | SvelteKit Replacement | Migration Notes |
|---------------|----------------------|-----------------|
| `useState` | `$state()` rune or `writable` | Local component state |
| `useEffect` | `$effect()` rune or `onMount` | Side effects |
| `useContext` | `setContext/getContext` | Component context |
| `useMemo` | `$derived()` rune | Computed values |
| `useCallback` | `$derived()` rune | Memoized functions |
| Custom hooks | Svelte stores | Shared state logic |

### Utility Libraries (Keep)

| Library | Version | Notes |
|---------|---------|-------|
| `clsx` | 2.1.1 | Class name utility |
| `tailwind-merge` | 2.5.2 | Tailwind class merging |
| `class-variance-authority` | 0.7.0 | Component variants |
| `tailwindcss-animate` | 1.0.7 | Animation utilities |
| `date-fns` | 3.6.0 | Date manipulation |
| `zod` | 3.23.8 | Schema validation |

## Detailed Migration Strategy

### 1. UI Components Migration

#### shadcn/ui → shadcn-svelte
```bash
# Install shadcn-svelte
npx shadcn-svelte@latest init
npx shadcn-svelte@latest add button card input label
```

**Component Mapping:**
- `Button.tsx` → `Button.svelte`
- `Card.tsx` → `Card.svelte`
- `Input.tsx` → `Input.svelte`
- `Dialog.tsx` → `Dialog.svelte`
- `Select.tsx` → `Select.svelte`
- `Tabs.tsx` → `Tabs.svelte`
- `Badge.tsx` → `Badge.svelte`
- `Avatar.tsx` → `Avatar.svelte`
- `Progress.tsx` → `Progress.svelte`
- `Checkbox.tsx` → `Checkbox.svelte`
- `Textarea.tsx` → `Textarea.svelte`
- `Calendar.tsx` → `Calendar.svelte`
- `Collapsible.tsx` → `Collapsible.svelte`

### 2. Icon Migration

#### Lucide React → Lucide Svelte
```typescript
// React
import { TrendingUp, Users, Shield } from 'lucide-react';

// Svelte
import { TrendingUp, Users, Shield } from 'lucide-svelte';
```

### 3. Form Handling Migration

#### react-hook-form → sveltekit-superforms
```typescript
// React pattern
const { register, handleSubmit, formState: { errors } } = useForm();

// SvelteKit pattern
import { superForm } from 'sveltekit-superforms/client';
const { form, errors, enhance } = superForm(data.form);
```

### 4. State Management Migration

#### React State → Svelte Stores
```typescript
// React
const [isLoggedIn, setIsLoggedIn] = useState(false);

// Svelte Store
import { writable } from 'svelte/store';
export const isLoggedIn = writable(false);

// Svelte 5 Runes (if available)
let isLoggedIn = $state(false);
```

### 5. Chart Migration

#### Recharts → ApexCharts
```typescript
// React Recharts
import { LineChart, Line, XAxis, YAxis } from 'recharts';

// Svelte ApexCharts
import ApexCharts from 'svelte-apexcharts';
```

### 6. Theme Management

#### next-themes → mode-watcher
```typescript
// React
import { useTheme } from 'next-themes';

// SvelteKit
import { mode, setMode } from 'mode-watcher';
```

## Installation Commands

### Remove React Dependencies
```bash
npm uninstall react react-dom @types/react @types/react-dom
npm uninstall @radix-ui/react-* lucide-react next-themes sonner vaul
npm uninstall react-hook-form @hookform/resolvers recharts
npm uninstall embla-carousel-react react-resizable-panels
```

### Install SvelteKit Dependencies
```bash
# Core SvelteKit
npm install @sveltejs/kit @sveltejs/adapter-auto
npm install svelte @sveltejs/vite-plugin-svelte

# UI Components
npm install bits-ui lucide-svelte mode-watcher
npm install svelte-sonner cmdk-sv paneforge

# Forms and Validation
npm install sveltekit-superforms zod

# Charts
npm install svelte-apexcharts
# OR
npm install chart.js svelte-chartjs

# Development
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-svelte svelte-check
npm install -D prettier prettier-plugin-svelte
npm install -D vitest @testing-library/svelte
npm install -D @playwright/test
```

## Component API Preservation

### Props Interface Compatibility
```typescript
// Maintain identical prop interfaces where possible
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void; // → on:click in Svelte
}
```

### Event Handler Migration
```typescript
// React
<Button onClick={handleClick} />

// Svelte
<Button on:click={handleClick} />
```

## Migration Validation

### Functionality Checklist
- [ ] All components render correctly
- [ ] Event handlers work as expected
- [ ] Form validation functions properly
- [ ] Charts display data accurately
- [ ] Theme switching works
- [ ] Responsive design maintained
- [ ] Accessibility preserved
- [ ] Performance improved

### Testing Strategy
- **Unit Tests**: Component behavior verification
- **Integration Tests**: Multi-component workflows
- **E2E Tests**: Complete user journeys
- **Visual Tests**: Design consistency
- **Performance Tests**: Load time and bundle size

## Risk Mitigation

### High-Risk Areas
1. **Complex Forms**: Multi-step forms with validation
2. **Chart Components**: Data visualization accuracy
3. **Real-time Features**: WebSocket integration
4. **State Synchronization**: Cross-component state

### Mitigation Strategies
1. **Incremental Migration**: Migrate components individually
2. **Parallel Testing**: Run React and Svelte versions side-by-side
3. **Feature Flags**: Gradual rollout of migrated features
4. **Rollback Plan**: Ability to revert to React version

## Post-Migration Optimization

### Performance Improvements
- **Bundle Size**: Expect 30-40% reduction
- **Runtime Performance**: Faster reactivity system
- **SSR Benefits**: Improved SEO and initial load
- **Tree Shaking**: Better dead code elimination

### Developer Experience
- **Less Boilerplate**: Simpler component syntax
- **Better TypeScript**: Enhanced type inference
- **Faster Builds**: Improved development speed
- **Cleaner Code**: More readable component structure