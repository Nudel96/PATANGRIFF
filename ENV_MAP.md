# Environment Variables Migration Map

## Current Environment Setup

### React Environment Variables
The current React application uses Vite environment variables with the `VITE_` prefix for client-side access.

### Identified Environment Variables

#### From Configuration Files
Based on the codebase analysis, the following environment variables are expected:

```bash
# Supabase Configuration (from database integration)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
VITE_APP_NAME=PRICEACTIONTALK
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3001

# Feature Flags
VITE_ENABLE_FORUMS=true
VITE_ENABLE_SQUADS=true
VITE_ENABLE_REAL_TIME=true

# External Services
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_ANALYTICS_ID=your_analytics_id
```

## SvelteKit Environment Migration

### Environment Variable Mapping

| React (Vite) | SvelteKit | Access Pattern | Usage |
|--------------|-----------|----------------|-------|
| `VITE_SUPABASE_URL` | `PUBLIC_SUPABASE_URL` | `$env/static/public` | Client-side Supabase config |
| `VITE_SUPABASE_ANON_KEY` | `PUBLIC_SUPABASE_ANON_KEY` | `$env/static/public` | Client-side Supabase auth |
| `SUPABASE_SERVICE_ROLE_KEY` | `SUPABASE_SERVICE_ROLE_KEY` | `$env/static/private` | Server-side Supabase operations |
| `VITE_APP_NAME` | `PUBLIC_APP_NAME` | `$env/static/public` | Application branding |
| `VITE_APP_VERSION` | `PUBLIC_APP_VERSION` | `$env/static/public` | Version display |
| `VITE_API_BASE_URL` | `PUBLIC_API_BASE_URL` | `$env/static/public` | API endpoint configuration |
| `VITE_WS_URL` | `PUBLIC_WS_URL` | `$env/static/public` | WebSocket connection |
| `VITE_ENABLE_FORUMS` | `PUBLIC_ENABLE_FORUMS` | `$env/static/public` | Feature flag |
| `VITE_ENABLE_SQUADS` | `PUBLIC_ENABLE_SQUADS` | `$env/static/public` | Feature flag |
| `VITE_ENABLE_REAL_TIME` | `PUBLIC_ENABLE_REAL_TIME` | `$env/static/public` | Feature flag |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `PUBLIC_STRIPE_PUBLISHABLE_KEY` | `$env/static/public` | Payment processing |
| `VITE_ANALYTICS_ID` | `PUBLIC_ANALYTICS_ID` | `$env/static/public` | Analytics tracking |

### New Server-Only Variables

| Variable | Access Pattern | Usage |
|----------|----------------|-------|
| `DATABASE_URL` | `$env/static/private` | Database connection |
| `JWT_SECRET` | `$env/static/private` | Authentication tokens |
| `STRIPE_SECRET_KEY` | `$env/static/private` | Payment processing |
| `EMAIL_API_KEY` | `$env/static/private` | Email notifications |
| `WEBHOOK_SECRET` | `$env/static/private` | Webhook validation |

## Environment File Structure

### Development Environment (`.env.local`)
```bash
# Public variables (accessible in browser)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PUBLIC_APP_NAME=PRICEACTIONTALK
PUBLIC_APP_VERSION=1.0.0
PUBLIC_API_BASE_URL=http://localhost:5173/api
PUBLIC_WS_URL=ws://localhost:5173
PUBLIC_ENABLE_FORUMS=true
PUBLIC_ENABLE_SQUADS=true
PUBLIC_ENABLE_REAL_TIME=true
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
PUBLIC_ANALYTICS_ID=your_analytics_id

# Private variables (server-only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
EMAIL_API_KEY=your_email_api_key
WEBHOOK_SECRET=your_webhook_secret
```

### Production Environment (`.env.production`)
```bash
# Public variables
PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
PUBLIC_APP_NAME=PRICEACTIONTALK
PUBLIC_APP_VERSION=1.0.0
PUBLIC_API_BASE_URL=https://api.priceactiontalk.com
PUBLIC_WS_URL=wss://ws.priceactiontalk.com
PUBLIC_ENABLE_FORUMS=true
PUBLIC_ENABLE_SQUADS=true
PUBLIC_ENABLE_REAL_TIME=true
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
PUBLIC_ANALYTICS_ID=your_prod_analytics_id

# Private variables
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key
DATABASE_URL=postgresql://prod-db-url
JWT_SECRET=your_prod_jwt_secret
STRIPE_SECRET_KEY=sk_live_...
EMAIL_API_KEY=your_prod_email_api_key
WEBHOOK_SECRET=your_prod_webhook_secret
```

## Usage Patterns

### Client-Side Access (Browser)
```typescript
// React pattern
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// SvelteKit pattern
import { PUBLIC_API_BASE_URL } from '$env/static/public';
const apiUrl = PUBLIC_API_BASE_URL;

// Or dynamic (if needed)
import { env } from '$env/dynamic/public';
const apiUrl = env.PUBLIC_API_BASE_URL;
```

### Server-Side Access (Node.js)
```typescript
// SvelteKit server-side
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

// Or dynamic
import { env } from '$env/dynamic/private';
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
```

### Component Usage Examples

#### Supabase Client Configuration
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
```

#### API Endpoint Configuration
```typescript
// src/lib/api.ts
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const apiClient = {
  baseURL: PUBLIC_API_BASE_URL,
  // ... other configuration
};
```

#### Feature Flags
```typescript
// src/lib/features.ts
import { 
  PUBLIC_ENABLE_FORUMS, 
  PUBLIC_ENABLE_SQUADS, 
  PUBLIC_ENABLE_REAL_TIME 
} from '$env/static/public';

export const features = {
  forums: PUBLIC_ENABLE_FORUMS === 'true',
  squads: PUBLIC_ENABLE_SQUADS === 'true',
  realTime: PUBLIC_ENABLE_REAL_TIME === 'true'
};
```

## Environment Validation

### Runtime Validation Schema
```typescript
// src/lib/env.ts
import { z } from 'zod';

const publicEnvSchema = z.object({
  PUBLIC_SUPABASE_URL: z.string().url(),
  PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  PUBLIC_APP_NAME: z.string().default('PRICEACTIONTALK'),
  PUBLIC_API_BASE_URL: z.string().url(),
  PUBLIC_ENABLE_FORUMS: z.string().default('true'),
  PUBLIC_ENABLE_SQUADS: z.string().default('true'),
  PUBLIC_ENABLE_REAL_TIME: z.string().default('true')
});

const privateEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  DATABASE_URL: z.string().url()
});

// Validate on app startup
export const validateEnv = () => {
  // Validation logic
};
```

## Migration Steps

### 1. Create Environment Files
```bash
# Copy current .env files and rename variables
cp .env .env.backup
# Update variable names with PUBLIC_ prefix for client-side vars
```

### 2. Update Import Statements
```typescript
// Find and replace all instances
// import.meta.env.VITE_ → import from $env/static/public
// Add proper imports at top of files
```

### 3. Update Configuration Files
```typescript
// Update vite.config.ts, svelte.config.js
// Remove Vite env prefix configuration
// Add SvelteKit environment handling
```

### 4. Validation and Testing
```bash
# Test environment variable access
npm run dev
# Verify all variables are accessible
# Check browser console for undefined variables
```

## Security Considerations

### Public vs Private Variables
- **PUBLIC_**: Accessible in browser, included in client bundle
- **Private**: Server-only, never sent to client
- **Sensitive Data**: Always use private variables for secrets

### Best Practices
1. **Minimal Public Exposure**: Only expose necessary variables to client
2. **Validation**: Validate all environment variables on startup
3. **Documentation**: Document all required variables
4. **Defaults**: Provide sensible defaults where possible
5. **Type Safety**: Use TypeScript for environment variable types

## Deployment Considerations

### Vercel/Netlify
- Set environment variables in deployment dashboard
- Use build-time variable injection
- Configure preview/production environments

### Docker
```dockerfile
# Build-time variables
ARG PUBLIC_API_BASE_URL
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL

# Runtime variables
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
```

### CI/CD Pipeline
```yaml
# GitHub Actions example
env:
  PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
  SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

## Troubleshooting

### Common Issues
1. **Undefined Variables**: Check PUBLIC_ prefix for client-side variables
2. **Build Errors**: Verify all imports use correct $env modules
3. **Runtime Errors**: Validate environment variable availability
4. **Type Errors**: Ensure proper TypeScript environment types

### Debug Commands
```bash
# Check environment variable loading
npm run build -- --verbose
# Verify client bundle doesn't contain secrets
npm run preview
```