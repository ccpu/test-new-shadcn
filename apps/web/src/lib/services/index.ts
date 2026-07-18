import type { Database } from '../../db';

import { VisitsRepository } from '../repositories/visits.repository';
import { VisitsService } from './visits.service';

export function createVisitsService(db: Database): VisitsService {
  const visitsRepository = new VisitsRepository(db);
  return new VisitsService(visitsRepository);
}

// You can add more services here as your app grows
export function createServices(db: Database): { visits: VisitsService } {
  return {
    visits: createVisitsService(db),
  };
}
