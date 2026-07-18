import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const pageVisits = sqliteTable('page_visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  page_path: text('page_path').notNull(),
  visit_date: text('visit_date').notNull(), // YYYY-MM-DD format
  visitor_country: text('visitor_country'), // Optional country code
  total_visits: integer('total_visits').notNull().default(1),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Generate Zod schemas from Drizzle schema - only for API boundaries
export const insertPageVisitSchema = createInsertSchema(pageVisits, {
  page_path: z.string().min(1, 'Page path is required'),
  visit_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, 'Invalid date format (YYYY-MM-DD)'),
  visitor_country: z.string().optional(),
  total_visits: z.number().int().positive().default(1),
});

export const selectPageVisitSchema = createSelectSchema(pageVisits);

// API validation schemas - used only at API boundaries
export const recordVisitSchema = z.object({
  pagePath: z.string().min(1, 'Page path is required'),
});
