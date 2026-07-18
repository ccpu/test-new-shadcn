import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';

import * as schema from './schema';

export function getDb(env: { DB: D1Database }): DrizzleD1Database<typeof schema> {
  return drizzle(env.DB, { schema });
}

export type Database = ReturnType<typeof getDb>;
export { schema };
