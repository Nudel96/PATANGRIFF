# Routing Migration Map

## React → SvelteKit Route Mapping

### Current React Routing (State-Based)
The React app uses conditional rendering based on authentication and view state rather than URL-based routing.

### Target SvelteKit File-Based Routing

```
React State-Based Navigation → SvelteKit File Routes
```

## Route Structure

### Public Routes (No Authentication Required)

| React Component | SvelteKit Route | Description |
|----------------|-----------------|-------------|
| `App.tsx` (landing) | `src/routes/+page.svelte` | Landing page with marketing content |
| `Header` | `src/routes/+layout.svelte` | Global header component |
| `Footer` | `src/routes/+layout.svelte` | Global footer component |

### Protected Routes (Authentication Required)

| React View State | SvelteKit Route | Description |
|-----------------|-----------------|-------------|
| `currentView: 'dashboard'` | `src/routes/dashboard/+page.svelte` | Main dashboard |
| `currentView: 'journal'` | `src/routes/dashboard/journal/+page.svelte` | Trading journal |
| `currentView: 'heatmap'` | `src/routes/dashboard/heatmap/+page.svelte` | Currency heatmap |
| `currentView: 'community'` | `src/routes/dashboard/community/+page.svelte` | Community hub |
| `currentView: 'trading-mastery'` | `src/routes/dashboard/learning/trading-mastery/+page.svelte` | Trading education |
| `currentView: 'business-ops'` | `src/routes/dashboard/learning/business-ops/+page.svelte` | Business education |
| `currentView: 'psychology'` | `src/routes/dashboard/learning/psychology/+page.svelte` | Psychology education |
| `currentView: 'capital-mgmt'` | `src/routes/dashboard/learning/capital-mgmt/+page.svelte` | Capital management |

### Community Sub-Routes

| React Component | SvelteKit Route | Description |
|----------------|-----------------|-------------|
| `ForumHub` | `src/routes/dashboard/community/forums/+page.svelte` | Forum main page |
| `ForumCategory` | `src/routes/dashboard/community/forums/[categoryId]/+page.svelte` | Category view |
| `PostDetail` | `src/routes/dashboard/community/forums/[categoryId]/[postId]/+page.svelte` | Post detail |
| `PostCreator` | `src/routes/dashboard/community/forums/create/+page.svelte` | Create post |
| `UserProfile` | `src/routes/dashboard/community/users/[userId]/+page.svelte` | User profile |
| `SquadsHub` | `src/routes/dashboard/community/squads/+page.svelte` | Squads main |
| `AdminDashboard` | `src/routes/dashboard/admin/+page.svelte` | Admin panel |

### Settings Routes

| React Component | SvelteKit Route | Description |
|----------------|-----------------|-------------|
| `UserSettings` | `src/routes/dashboard/settings/+page.svelte` | User settings |

### API Routes

| Purpose | SvelteKit Route | Description |
|---------|-----------------|-------------|
| Health Check | `src/routes/api/health/+server.ts` | API health endpoint |
| Forum API | `src/routes/api/forum/+server.ts` | Forum operations |
| User API | `src/routes/api/users/+server.ts` | User management |

## Layout Structure

### Root Layout (`src/routes/+layout.svelte`)
- Global styles and theme
- Authentication state management
- Toast notifications
- Meta tags and SEO

### Dashboard Layout (`src/routes/dashboard/+layout.svelte`)
- Authentication guard
- Dashboard navigation
- User context
- Protected route wrapper

### Community Layout (`src/routes/dashboard/community/+layout.svelte`)
- Community-specific navigation
- Forum/squad context
- Community-wide state

## Authentication Flow

### React Authentication
```typescript
// Current React flow
const [isLoggedIn, setIsLoggedIn] = useState(false);
if (isLoggedIn) {
  return <Dashboard />;
} else {
  return <LandingPage />;
}
```

### SvelteKit Authentication
```typescript
// Target SvelteKit flow
// src/routes/dashboard/+layout.ts
export const load: LayoutLoad = async ({ url }) => {
  const isLoggedIn = /* check auth */;
  if (!isLoggedIn) {
    throw redirect(302, '/');
  }
  return { user: /* user data */ };
};
```

## Navigation Migration

### React Navigation Handlers
```typescript
// Current React navigation
const handleNavigateToJournal = () => setCurrentView('journal');
const handleNavigateToHeatmap = () => setCurrentView('heatmap');
```

### SvelteKit Navigation
```typescript
// Target SvelteKit navigation
import { goto } from '$app/navigation';
const navigateToJournal = () => goto('/dashboard/journal');
const navigateToHeatmap = () => goto('/dashboard/heatmap');
```

## Data Loading Strategy

### React Data Loading
```typescript
// Current React pattern
useEffect(() => {
  fetchData().then(setData);
}, []);
```

### SvelteKit Data Loading
```typescript
// Target SvelteKit pattern
// +page.ts for client-side
export const load: PageLoad = async ({ fetch }) => {
  const data = await fetch('/api/data').then(r => r.json());
  return { data };
};

// +page.server.ts for server-side
export const load: PageServerLoad = async ({ locals }) => {
  const data = await getServerData(locals.user);
  return { data };
};
```

## Route Protection Strategy

### Implementation
- **Layout-based protection**: `src/routes/dashboard/+layout.ts`
- **Server-side validation**: Check authentication on server
- **Client-side guards**: Redirect unauthenticated users
- **Role-based access**: Admin routes with role checking

### Error Handling
- **404 Pages**: Custom error pages for missing routes
- **403 Pages**: Access denied for protected routes
- **Error Boundaries**: Global error handling

## SEO Considerations

### Public Routes
- **Server-side rendering**: Landing page and marketing content
- **Meta tags**: Dynamic meta tag generation
- **Open Graph**: Social media sharing optimization

### Protected Routes
- **Client-side rendering**: Dashboard and user-specific content
- **No indexing**: Private content excluded from search engines

## Migration Notes

### Preserved Functionality
- All existing user flows maintained
- Authentication behavior identical
- Component props and behavior preserved
- Design system and styling unchanged

### Enhanced Features
- **URL-based navigation**: Bookmarkable dashboard states
- **Server-side rendering**: Improved SEO and performance
- **File-based routing**: Cleaner route organization
- **Type-safe routing**: Automatic route type generation

### Breaking Changes
- **URL Structure**: New URL patterns for dashboard views
- **Navigation**: Programmatic navigation API changes
- **State Management**: Global state moved to stores

## Testing Strategy

### Route Testing
- **E2E Tests**: Verify all routes resolve correctly
- **Navigation Tests**: Test programmatic navigation
- **Authentication Tests**: Verify route protection
- **Error Handling**: Test 404 and error scenarios

### Component Testing
- **Unit Tests**: Component behavior verification
- **Integration Tests**: Multi-component interactions
- **Visual Tests**: Design system consistency