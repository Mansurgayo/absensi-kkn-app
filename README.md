# Absensi KKN App

A Next.js application for managing attendance during KKN, equipped with
admin dashboards, PDF reports, user authentication, and Prisma ORM.

## Setup (Local Development)

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL (SQLite for dev or PostgreSQL for prod)
   ```

2. **Install deps & generate Prisma client**
   ```bash
   npm install
   npx prisma generate
   ```

3. **Create/migrate database**
   For SQLite (default):
   ```bash
   npx prisma migrate dev --name init
   ```
   For PostgreSQL (recommended before deploying):
   ```bash
   npx prisma migrate dev --name init
   ```
   _This will create SQL migrations under `prisma/migrations`._

4. **Add an admin user**

   You can seed an administrator account in whichever database you are
   currently pointing at via `DATABASE_URL`.

   ```bash
   # local development (SQLite is default)
   EMAIL=admin@example.com PASSWORD=pass123 NAME="Admin" npm run create-admin

   # or, to write directly to your production Postgres database:
   DATABASE_URL="postgres://user:pass@host:5432/dbname" \
     EMAIL=admin@example.com PASSWORD=pass123 NAME="Admin" npm run create-admin
   ```

   The script will create the user or update it if it already exists. Once
   the account exists you can log in at `/login` with the specified email
   and password.

5. **Run the app**
   ```bash
   npm run dev
   # or production build
   npm run build && npm start
   ```

Browse http://localhost:3000 to access the site. Login as admin
to access `/admin/dashboard` and generate PDF reports.

## Environment Variables

| Name         | Example                                                   | Description                     |
|--------------|-----------------------------------------------------------|---------------------------------|
| DATABASE_URL | `postgres://user:pass@host:5432/dbname` or `file:./prisma/dev.db` | Prisma connection string        |

Secrets (e.g. JWT, cookies) can also be added to `.env` and to
Vercel's settings.

## Deployment to Vercel

1. **Connect GitHub repo** to Vercel and set **Root Directory** to the
   workspace root (it already contains the app after consolidation).
2. **Set environment variables** in Vercel (at least `DATABASE_URL`).
   Prefer a managed PostgreSQL database for production.
3. **Push changes**; Vercel will run `npm install`, `prisma migrate deploy`,
   and `npm run build` automatically.

Sample `vercel.json` is provided to ensure proper build
configuration.

### Notes for Production

* Do **not** use SQLite in production; deploy a cloud DB.
* Ensure Prisma migrations have been applied (`prisma migrate deploy`).
* The admin account must be created via script or manually in the DB.

## Useful Scripts

| Command            | Description                            |
|--------------------|----------------------------------------|
| `npm run dev`      | Start development server               |
| `npm run build`    | Build for production (runs migrations) |
| `npm run start`    | Run built app                          |
| `npm run create-admin` | Create/update admin user             |

---

Happy deploying!

