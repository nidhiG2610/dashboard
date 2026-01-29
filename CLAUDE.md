# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + Vite dashboard application with authentication flows, multiple page views, and a custom icon library. Uses React Router for navigation and Tailwind CSS for styling.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Architecture

### Routing Structure

The application uses `react-router-dom` with routes defined in `src/router/index.jsx`. The router is initialized in `src/main.jsx` and wraps the entire application with `<RouterProvider>`.

Routes include:
- Authentication pages: `/signup`, `/signin`, `/reset-password`, `/registration-completed`, `/details`
- Application pages: `/dashboard`, `/business`, `/notes`, `/tasks`, `/calendar`, `/messages`, `/files`, `/help`

### Layout System

**AppLayout** (`src/components/Layouts/AppLayout.jsx`):
- Main application layout wrapper used by dashboard pages
- Features:
  - Collapsible sidebar (always visible at 4rem width)
  - Toggleable updates panel that shifts grid layout between `grid-cols-[1fr_3fr]` and `grid-cols-[4fr]`
  - Sticky header with scroll-based shadow effect
  - Conditional rendering of panels: `showMessagePanel`, `showLatestUpdatesPanel`, `showEventsPanel`, `showConversionHistory`
- Grid structure: `grid-cols-[1fr_4fr]` with Sidebar taking first column, content taking remaining width minus 4rem (`w-[calc(100vw-4rem)]`)
- Includes WelcomeCard and optional side panels in left content area
- Main content area has `bg-primary-lightest` background

### Icon System

Custom icon library located in `src/assets/IconLibrary/`:
- `IconLibrary.js`: Core library with `getSvgString()` and `getReactIcon()` functions
- `IconLibraryHelper.js`: Contains icon definitions as `{ name, path }` objects
- Icons are mapped to a lookup object for fast retrieval
- `Icon` component (`src/components/Icon.jsx`) wraps the library for React usage

To add new icons:
1. Add SVG path to `IconLibraryHelper.js` icons array
2. Use via `<Icon name="iconName" />` component

### Styling System

**Tailwind Configuration** (`tailwind.config.js`):
- Custom design tokens for consistent theming
- Color palette:
  - `primary`: Blue spectrum with variants (DEFAULT: #4A7AF0, dark, light, lighter, lightest, pale, disabled, outline)
  - `secondary`: Neutral tones for ghost buttons and backgrounds
  - `text.primary`: #14171A, `text.secondary`: #657786, `text.disabled`: #AAB8C2
  - `warning`, `success`, `error` variants
- Custom spacing scale: `1` (4px), `5xl` (56px), `6xl` (64px)
- Typography scale: `h1-large` through `h6`, plus `xs` and `sm`
- Font: Poppins as primary sans-serif

**Utility Functions**:
- Use `tailwind-merge` (`twMerge`) to merge Tailwind classes properly when combining props and defaults

### Utilities

`src/Helpers/utitlies.js`:
- `formatDate(date)`: Converts ISO 8601 strings or Date objects to "Month Day, Year" format
- `getFirstChar(str)`: Safely extracts first character from string
- `formatTimestamp(ts)`: Converts Unix timestamps to relative time ("X minutes ago") or time strings

### Component Structure

Components are organized in:
- `src/components/`: Reusable UI components (Button, Input, Card, Icon, RadioButton, etc.)
- `src/components/Layouts/`: Layout wrappers (AppLayout)
- `src/pages/`: Page-level components
- `src/pages/Authentication/`: Auth flow pages

### ESLint Configuration

Flat config format using `eslint.config.js`:
- React Hooks rules enforced
- React Refresh rules for Vite
- Custom rule: Unused vars ignored if they start with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`)
- Ignores `dist` directory

## Notes

- The application uses React 19.2.0 with StrictMode enabled
- Vite provides HMR (Hot Module Replacement) during development
- Axios is included for HTTP requests (imported as dependency)
- Design reference: https://www.figma.com/proto/Meo91HH1tOJwcY9WA2U5qW/CRM-UI-Kit-for-SaaS-Dashboards--Community-
