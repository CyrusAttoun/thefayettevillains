# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TheFayettevillains is a community postings site for residents of Fayetteville, AR and surrounding areas. It's a full-stack monorepo with:

- **Frontend**: React/TypeScript client with Radix UI components
- **Backend**: FastAPI/Python server with LanceDB for data storage
- **Features**: Home page carousel, rummage sale maps, general posts, real estate listings, restaurant finder, items for sale/free

## Common Commands

### Client (Frontend)
```bash
cd client/
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # Run TypeScript type checking
npm run preview      # Preview production build
```

### Server (Backend)
```bash
cd server/
poetry install       # Install dependencies
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000  # Start development server
```

### Development Workflow
- Use `npm run typecheck` in client/ to catch TypeScript errors before committing
- Both client and server have their own package managers (npm/yarn for client, Poetry for server)
- Package manager for client: yarn@4.9.1 (configured in package.json)

## Architecture Overview

### Data Layer
- **LanceDB**: Vector database for storing posts, taglines, and binary data (images)
- **Database Module**: `server/app/database.py` handles all data operations
- **Column Definitions**: `server/app/columns.py` defines schema constants
- **Configuration**: Environment variables managed through `server/app/config.py`

### Frontend Architecture
- **Routing**: HashRouter with routes for home (`/`) and rummage sales (`/rummage`)
- **Component Structure**: 
  - Main app in `client/src/components/App.tsx`
  - Feature-specific components in subdirectories (e.g., `rummages/`)
  - Reusable UI components in `ui/` directory
- **Styling**: Inline styles (Tailwind removed), CSS files in `public/` and component directories
- **State Management**: React Context for authentication (`AuthContext.tsx`)

### UI Component System
- **Base Components**: Custom implementations in `client/src/components/ui/`
- **Radix Integration**: Uses Radix UI primitives with custom styling
- **Icon System**: Custom SVG icons in `client/src/components/icons/`
- **Simple Implementations**: `simple-tabs.tsx`, `simple-select.tsx`, `simple-popover.tsx` for complex interactions

### Backend Architecture
- **FastAPI Application**: Main server in `server/app/main.py`
- **Database Operations**: Centralized in `database.py` with typed column access
- **API Endpoints**: RESTful endpoints for posts, taglines, and image uploads
- **CORS**: Configured for development (allow all origins)

### Authentication & Data Flow
- **Supabase Integration**: Client-side auth with callback handling
- **API Communication**: Frontend fetches data from FastAPI backend
- **Image Storage**: Binary data stored directly in LanceDB
- **Random Content**: Dynamic taglines fetched from database

## Environment Configuration

### Server Environment Variables
```bash
LANCEDB_URI=./lancedb_data              # Local development
LANCEDB_API_KEY=your_api_key_here       # For cloud instances
LANCEDB_PROJECT=thefayettevillains
APP_NAME=The Fayettevillains
APP_VERSION=1.0.0
```

### Railway Deployment
- Set `RAILPACK_PYTHON_VERSION=3.13.2` for Python version compatibility
- Configure LanceDB cloud connection variables for production

## Key Integration Points

### Client-Server Communication
- **WelcomeStatement Component**: Fetches random taglines from `/tagline` endpoint
- **Posts System**: Backend provides structured post data via `/posts` endpoint
- **Image Upload**: `/upload-image/{post_id}` endpoint handles binary file storage

### Database Schema
- **Posts Table**: Includes metadata, content, and binary image data
- **Taglines Table**: Community-specific taglines with active/inactive status
- **Type Safety**: Column names defined as constants in `columns.py`

## Development Notes

- **No Mixing**: Keep React/TypeScript in `client/`, FastAPI/Python in `server/`
- **UI Library**: Project uses Radix UI primitives, not Mantine (despite some documentation references)
- **Package Management**: Client uses yarn@4.9.1, server uses Poetry
- **TypeScript**: All frontend code is strictly typed
- **Database**: LanceDB handles both structured data and binary assets (images)
- **Tabs**: Always use 4 spaces for tabs
- **Styles**: When creating styles, create the styles as plain css modules with the same name as their react component. Prefer this over inline styles when possible.
- **React Components**: When creating React components, use 'function' instead of 'const'