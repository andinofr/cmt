# Vue Frontend - CMT Portal

This is a Vue 3 conversion of the React CMT (Contract Management Team) Portal application.

## Conversion Details

### Original React Features Converted:
- ✅ Authentication system (React Context → Pinia store)
- ✅ Routing (React Router → Vue Router)
- ✅ Component-based architecture (React Components → Vue SFCs)
- ✅ Tailwind CSS styling (maintained)
- ✅ TypeScript support (added)
- ✅ UI components (Radix UI → Custom Vue components)

### Key Changes:
- **State Management**: React Context API → Pinia store
- **Routing**: React Router DOM → Vue Router 4
- **Components**: Functional components → Vue Single File Components
- **Styling**: Tailwind CSS configuration maintained
- **Icons**: Lucide React → Lucide Vue Next
- **Build Tool**: Create React App → Vite

### Project Structure:
```
vue-frontend/
├── src/
│   ├── components/ui/     # UI components (converted from Radix UI)
│   ├── views/            # Page components (converted from React pages)
│   ├── stores/           # Pinia stores (converted from React Context)
│   ├── router/           # Vue Router configuration
│   ├── lib/              # Utility functions
│   └── assets/           # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Features

- 🔐 Authentication with role-based access (CMT Team vs General User)
- 📊 Multiple workspaces (Planning, Execution, Central Hub)
- 🎨 Modern UI with Tailwind CSS
- 🚀 Vue 3 Composition API
- 📦 TypeScript support
- 🔄 Vue Router for navigation
- 📱 Responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Vue** - Icon library
- **Headless UI** - Unstyled accessible components