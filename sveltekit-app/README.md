# PRICEACTIONTALK - Frontend-Only SvelteKit Application

A comprehensive trading education platform built with SvelteKit, featuring a complete frontend-only implementation with local storage persistence and mock data.

## Features

### 🎯 Core Functionality
- **Authentication System**: Login/logout with demo credentials
- **Trading Journal**: R-multiple performance tracking with local storage
- **Market Heatmap**: Currency strength analysis with real-time mock data
- **Community Hub**: Forums and squads with mock interactions
- **Learning System**: Four Pillars education with XP progression
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🛠 Technical Stack
- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide Svelte
- **State Management**: Svelte stores with localStorage persistence
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint + Prettier with Svelte plugins

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone and install dependencies
cd sveltekit-app
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Demo Credentials
- **Email**: warrior@example.com
- **Password**: password123

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   │   ├── ui/             # Base UI components (Button, Card, etc.)
│   │   ├── Header.svelte   # Main navigation
│   │   ├── LoginModal.svelte
│   │   └── ...
│   ├── stores/             # Svelte stores for state management
│   │   ├── auth.ts         # Authentication state
│   │   ├── trading.ts      # Trading journal data
│   │   ├── market.ts       # Market heatmap data
│   │   ├── community.ts    # Community features
│   │   ├── learning.ts     # Learning progress
│   │   └── toast.ts        # Notifications
│   ├── data/
│   │   └── mockData.ts     # Mock data for demo
│   └── utils.ts            # Utility functions
├── routes/
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Landing page
│   └── dashboard/          # Protected dashboard routes
│       ├── +layout.svelte  # Dashboard layout
│       ├── +page.svelte    # Dashboard home
│       ├── journal/        # Trading journal
│       ├── heatmap/        # Market analysis
│       ├── community/      # Community features
│       └── learning/       # Education modules
└── app.css                 # Global styles
```

## Key Features

### Authentication
- Frontend-only authentication with localStorage persistence
- Demo user accounts with different membership levels
- Route protection for dashboard areas
- Automatic redirect handling

### Trading Journal
- Complete trade logging with R-multiple tracking
- Pre-trade checklists and risk management
- Performance analytics and statistics
- Local storage persistence for all trade data

### Market Heatmap
- Real-time currency strength visualization
- Economic indicator analysis
- Market sentiment tracking
- Comprehensive scoring system

### Community Features
- Discussion forums with categories
- Squad creation and management
- User profiles and reputation system
- Mock data for realistic interactions

### Learning System
- Four Pillars education framework
- 30-level progression system per pillar
- XP tracking and achievements
- Progress persistence across sessions

## Data Persistence

All user data is stored locally using browser localStorage:

- **Authentication**: Login state and user profile
- **Trading Data**: Complete trade history and statistics
- **Learning Progress**: XP, completed modules, and achievements
- **Community Data**: Squad memberships and forum interactions
- **User Preferences**: Settings and customizations

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # Type checking
npm run lint         # ESLint
npm run format       # Prettier formatting

# Testing
npm run test         # Unit tests with Vitest
npm run test:e2e     # E2E tests with Playwright
```

### Adding New Features

1. **Components**: Add to `src/lib/components/`
2. **Pages**: Add to `src/routes/`
3. **State**: Add stores to `src/lib/stores/`
4. **Mock Data**: Update `src/lib/data/mockData.ts`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the existing design system (primary/secondary colors)
- Use the `.military-card` class for consistent card styling
- Maintain responsive design patterns

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

Test coverage includes:
- Authentication flow
- Navigation between sections
- Trading journal functionality
- Market heatmap interactions
- Community features

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built application in the `build/` directory can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables
Copy `.env.example` to `.env` and configure as needed. All variables are optional for the frontend-only version.

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: Optimized with SvelteKit's automatic code splitting
- **Runtime**: Efficient reactivity with Svelte's compiled approach
- **Loading**: Fast initial page loads with SSR
- **Caching**: Aggressive caching for static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

Private - All rights reserved

## Support

For questions or support:
- Email: support@priceactiontalk.com
- Documentation: See inline code comments
- Issues: Create GitHub issues for bugs or feature requests

---

**"Discipline. Strategy. Results."**

*Transform from chart-watcher to market operator.*