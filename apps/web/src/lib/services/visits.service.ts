import type { VisitsRepository } from '../repositories/visits.repository';
import type { PageVisit, VisitStats } from '../types/visits.types';

export class VisitsService {
  constructor(private visitsRepository: VisitsRepository) {}

  async recordVisit(pagePath: string, country: string): Promise<void> {
    // Basic business validation - ensure page path is not empty
    if (!pagePath.trim()) {
      throw new Error('Page path cannot be empty');
    }

    const today = new Date().toISOString().split('T')[0] ?? '';

    const existingVisit = await this.visitsRepository.findExistingVisit(
      pagePath.trim(),
      today,
      country,
    );

    if (existingVisit) {
      await this.visitsRepository.incrementVisit(existingVisit.id);
    } else {
      await this.visitsRepository.createVisit({
        pagePath: pagePath.trim(),
        country,
        date: today,
      });
    }
  }

  async getAllVisits(): Promise<PageVisit[]> {
    return this.visitsRepository.getAllVisits();
  }

  async getVisitStats(): Promise<VisitStats> {
    const visits = await this.getAllVisits();

    return {
      totalPages: new Set(visits.map((v) => v.page_path)).size,
      totalDays: new Set(visits.map((v) => v.visit_date)).size,
      totalVisits: visits.reduce((sum, v) => sum + v.total_visits, 0),
    };
  }

  async getVisitsByDateRange(startDate: string, endDate: string): Promise<PageVisit[]> {
    return this.visitsRepository.getVisitsByDateRange(startDate, endDate);
  }
}
