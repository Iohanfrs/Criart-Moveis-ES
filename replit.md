# Criart Móveis Planejados

## Overview

A landing page and lead capture system for Criart Móveis Planejados, a custom furniture company based in Espírito Santo, Brazil. The application allows potential customers to browse the company's portfolio and submit inquiry forms that are stored in a database and forwarded to WhatsApp for direct contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for scroll animations and reveal effects
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript (ESM modules)
- **API Design**: REST endpoints defined in shared route definitions with Zod schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (required via DATABASE_URL environment variable)
- **Schema**: Single `inquiries` table storing customer contact information
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions (available but not currently used)

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page components (Home, not-found)
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Drizzle database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle schema definitions
│   └── routes.ts     # API route contracts with Zod
└── migrations/       # Drizzle database migrations
```

### Key Design Patterns
- **Shared Types**: Schema definitions and API contracts shared between frontend and backend via `@shared/*` path alias
- **Type-Safe API**: Zod schemas define input validation and response types for API endpoints
- **Component Library**: shadcn/ui components with custom theming (yellow/black brand colors)
- **Database Layer**: Repository pattern via `storage.ts` abstracting database operations

### Development vs Production
- **Development**: Vite dev server with HMR, tsx for TypeScript execution
- **Production**: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Required database connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database schema management with `db:push` command

### Third-Party Integrations
- **WhatsApp Business API**: Contact form submissions redirect to WhatsApp (wa.me/5527996019018)
- **Instagram**: Floating button links to @criartmoveis.es

### Key NPM Packages
- `drizzle-orm` / `drizzle-zod`: Database ORM and schema validation
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library
- `react-hook-form` / `zod`: Form handling and validation
- `shadcn/ui` components: Full suite of Radix-based UI primitives