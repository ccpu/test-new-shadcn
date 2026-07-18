# Visitor Database Setup (Drizzle + Cloudflare D1) - Optional

This template includes optional privacy-friendly page visit tracking using Drizzle ORM with Cloudflare D1 database.

**Important**: Visitor tracking is **disabled by default**. This guide shows you how to set up the database and enable the feature if you want to use it.

## Prerequisites

Before setting up the visitor database, you need to:

1. **Enable the VisitTracker component** in your layout file (`apps/web/src/app/layout.tsx`):

   ```tsx
   // Uncomment these lines:
   import VisitTracker from '../components/VisitTracker';

   // And in the JSX:
   <VisitTracker />;
   ```

2. **Follow the database setup steps below**

## ✅ Setup Complete Status

If you've followed the setup steps correctly, you should have:

- ✅ Created a Cloudflare D1 database named `page-visits`
- ✅ Applied migrations to both local and remote databases
- ✅ A working `page_visits` table with the following structure:
  - `id` (Primary Key, Auto Increment)
  - `page_path` (Text, Required)
  - `visit_date` (Text, Required, YYYY-MM-DD format)
  - `visitor_country` (Text, Optional country code)
  - `total_visits` (Integer, Default: 1)
  - `created_at` (Text, Default: CURRENT_TIMESTAMP)
  - `updated_at` (Text, Default: CURRENT_TIMESTAMP)

## Quick Setup

### 1. Create D1 Database

```bash
cd apps/web
pnpm wrangler d1 create page-visits
```

This returns a database ID. Copy it for the next step.

### 2. Update Configuration

Update `apps/web/wrangler.jsonc`:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "page-visits",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ]
}
```

### 3. Run Database Migration

```bash
cd apps/web
# Apply migration to both local and remote databases
pnpm wrangler d1 migrations apply page-visits
pnpm wrangler d1 migrations apply page-visits --remote
```

> **Note**: Always run migrations on both local (for development) and remote (for production) databases.

### 4. Deploy

```bash
pnpm deploy
```

## Local Development

For local development, migrations are automatically applied to the local database when you run:

```bash
cd apps/web
pnpm wrangler d1 migrations apply page-visits
```

Then run your dev server normally:

```bash
pnpm dev
```

## What's Included

- **Page visit tracking**: Automatically tracks page visits by country (GDPR-friendly)
- **Analytics page**: Visit `/analytics` to see tracked data
- **API endpoints**: `GET/POST /api/visits` for retrieving and storing visit data
- **Privacy-first**: Only tracks page path, date, and country - no personal data

## Database Commands

- `pnpm db:generate` - Generate migration files from schema changes
- `pnpm db:migrate` - Alias for `drizzle-kit migrate` (generates migrations)
- `pnpm db:studio` - Open Drizzle Studio (requires setup)
- `pnpm wrangler d1 migrations apply page-visits` - Apply migrations to local database
- `pnpm wrangler d1 migrations apply page-visits --remote` - Apply migrations to remote database
- `pnpm wrangler d1 migrations list page-visits` - List applied migrations
- `pnpm wrangler d1 execute page-visits --command "SELECT * FROM page_visits"` - Query local database
- `pnpm wrangler d1 execute page-visits --remote --command "SELECT * FROM page_visits"` - Query remote database

## Database Migration Workflow

1. **Modify Schema**: Edit `src/db/schema.ts` to define your database structure
2. **Generate Migration**: Run `pnpm db:generate` to create migration files
3. **Apply Locally**: Run `pnpm wrangler d1 migrations apply page-visits` for local development
4. **Apply Remotely**: Run `pnpm wrangler d1 migrations apply page-visits --remote` for production

## Verifying Database Setup

Check if tables were created successfully:

```bash
# List all tables
pnpm wrangler d1 execute page-visits --command "SELECT name FROM sqlite_master WHERE type='table'"

# Check table structure
pnpm wrangler d1 execute page-visits --command "PRAGMA table_info(page_visits)"

# Query data (local)
pnpm wrangler d1 execute page-visits --command "SELECT * FROM page_visits"

# Query data (remote)
pnpm wrangler d1 execute page-visits --remote --command "SELECT * FROM page_visits"
```
