import type {
  insertPageVisitSchema,
  recordVisitSchema,
  selectPageVisitSchema,
} from '../../db/schema';

import { z } from 'zod';

// Infer types from Zod schemas
export type PageVisit = z.infer<typeof selectPageVisitSchema>;
export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type RecordVisitRequest = z.infer<typeof recordVisitSchema>;

export interface CreateVisitData {
  pagePath: string;
  country: string;
  date: string;
}

export interface VisitStats {
  totalPages: number;
  totalDays: number;
  totalVisits: number;
}

// API response types
export const visitStatsSchema = z.object({
  totalPages: z.number(),
  totalDays: z.number(),
  totalVisits: z.number(),
});

export function apiResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
): z.ZodObject<{
  success: z.ZodBoolean;
  data: z.ZodOptional<T>;
  error: z.ZodOptional<z.ZodString>;
}> {
  return z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
  });
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
