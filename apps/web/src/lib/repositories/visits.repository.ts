import type { Database } from '../../db';
import type { CreateVisitData, PageVisit } from '../types/visits.types';

import { and, eq, gte, lte, sql } from 'drizzle-orm';

import { pageVisits } from '../../db/schema';

export class VisitsRepository {
  constructor(private db: Database) {}

  async findExistingVisit(
    pagePath: string,
    date: string,
    country: string,
  ): Promise<PageVisit | null> {
    const existing = await this.db
      .select()
      .from(pageVisits)
      .where(
        and(
          eq(pageVisits.page_path, pagePath),
          eq(pageVisits.visit_date, date),
          eq(pageVisits.visitor_country, country),
        ),
      )
      .limit(1);

    return existing[0] || null;
  }

  async incrementVisit(id: number): Promise<void> {
    await this.db
      .update(pageVisits)
      .set({
        total_visits: sql`${pageVisits.total_visits} + 1`,
        updated_at: new Date().toISOString(),
      })
      .where(eq(pageVisits.id, id));
  }

  async createVisit(data: CreateVisitData): Promise<void> {
    // Only validate at the database boundary - Drizzle will enforce constraints
    await this.db.insert(pageVisits).values({
      page_path: data.pagePath,
      visit_date: data.date,
      visitor_country: data.country,
      total_visits: 1,
    });
  }

  async getAllVisits(): Promise<PageVisit[]> {
    // Trust Drizzle's type inference - no need for runtime validation
    return this.db.select().from(pageVisits).orderBy(pageVisits.visit_date);
  }

  async getVisitsByDateRange(startDate: string, endDate: string): Promise<PageVisit[]> {
    return this.db
      .select()
      .from(pageVisits)
      .where(
        and(gte(pageVisits.visit_date, startDate), lte(pageVisits.visit_date, endDate)),
      )
      .orderBy(pageVisits.visit_date);
  }
}
