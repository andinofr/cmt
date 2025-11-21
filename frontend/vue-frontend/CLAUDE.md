# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 frontend for a CMT (Contract Management Team) portal, built with TypeScript, Vite, and Tailwind CSS. The application provides role-based access for CMT team members and general users, with different workspaces for planning, execution, and central hub functionalities.

## Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint with auto-fix on all Vue, JS, and TS files

## Architecture

### Core Technology Stack
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** for build tooling and development server
- **Pinia** for state management
- **Vue Router** for navigation with authentication guards
- **Tailwind CSS** for styling with custom design system
- **Headless UI** for accessible components
- **Zod** for schema validation

### Project Structure
- `src/main.ts` - Application entry point with Pinia and Router setup
- `src/App.vue` - Root component with RouterView and Toaster
- `src/router/index.ts` - Route definitions with authentication guards
- `src/stores/auth.ts` - Pinia store for authentication and user state
- `src/views/` - Page components (Login, WorkspaceSelector, PlanningWorkspace, ExecutionWorkspace, CentralHub)
- `src/components/ui/` - Reusable UI components (Input, Label, Card, Toaster)
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging

### Authentication System
- Role-based authentication with two roles: `CMT_TEAM` and `GENERAL_USER`
- LocalStorage-based session persistence
- Route guards protecting authenticated and CMT-only pages
- Auth store initialized in App.vue's onMounted

### Routing Structure
- `/login` - Login page (public)
- `/workspace-selector` - Workspace selection (authenticated users)
- `/planning` - Planning workspace (authenticated users)
- `/execution` - Execution workspace (authenticated users)
- `/central-hub` - Central hub (CMT team only)
- Wildcard routes redirect to login

### UI Component System
- Uses Headless UI primitives with custom Tailwind styling
- Custom design tokens in tailwind.config.js
- Consistent color scheme with primary `#007d79` teal color
- Card-based layout with rounded corners and shadows
- Toast notifications via Sonner library

### State Management
- Pinia stores using Composition API pattern
- Authentication state with user data and loading states
- Reactive computed properties for role-based access

## Key Features
- Role-based access control (RBAC)
- Responsive design with Tailwind CSS
- TypeScript for enhanced developer experience
- Modern Vue 3 patterns throughout
- Clean component architecture with separation of concerns