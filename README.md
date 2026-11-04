This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database architecture

The PostgreSQL schema is in [`prisma/schema.prisma`](./prisma/schema.prisma). It uses Prisma ORM and contains:

- A unique-email `User` account record with a single account type, plus separate candidate and company profiles. Student and freelancer details extend candidate profiles instead of duplicating accounts.
- Company memberships, jobs (including internships via `EmploymentType`), applications, freelance projects and proposals.
- Shared skills and skill categories with explicit many-to-many link tables; education and work experience are attached to a candidate profile.
- Conversations, participants, messages, notifications, interviews and reviews.
- Currency-referenced decimal amounts for listings, proposals, payments and subscriptions. Currency and country codes use ISO-style codes; user locale and timezone support international accounts.
- Admin roles and permissions through role/permission join tables, plus reports and audit logs.

Foreign keys, unique constraints and query indexes are declared in the Prisma schema. Accounts use a soft-deactivation field; job/project deletion is restricted where it would erase business records. Authorization checks (including company membership, conversation participation, and report-target consistency) must also be enforced in application code. The schema does not integrate an authentication provider or payment gateway, and this setup does not run migrations or insert seed data.

Store account email addresses in lowercase before creating users so the unique email constraint prevents case-variant duplicate accounts.

## Prisma setup

1. Install dependencies with `npm install`.
2. Create a local `.env` file (ignored by Git) and set `DATABASE_URL` to your PostgreSQL connection string. Keep credentials private; do not commit `.env`.
3. Generate the Prisma Client with `npm run db:generate`.
4. Check schema syntax/configuration with `npm run db:validate`.
5. When you are ready to create a database migration, review the schema and use `npx prisma migrate dev --name init` locally. No migration is run as part of this setup.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
