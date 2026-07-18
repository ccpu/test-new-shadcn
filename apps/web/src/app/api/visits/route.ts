import type { NextRequest } from 'next/server';

import type { ApiResponse, PageVisit } from '../../../lib/types/visits.types';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getDb } from '../../../db';
import { recordVisitSchema } from '../../../db/schema';
import { createVisitsService } from '../../../lib';

/**
 * Edge runtime cannot be enabled in this file due to OpenNext Cloudflare limitations.
 * See: https://opennext.js.org/cloudflare#supported-nextjs-runtimes
 */
// export const runtime = 'edge';

function isValidEnv(env: unknown): env is { DB: D1Database } {
  return env !== null && typeof env === 'object' && 'DB' in env && env.DB !== null;
}

function getVisitsService() {
  const { env } = getCloudflareContext();

  if (!isValidEnv(env)) {
    throw new Error('Database not configured');
  }

  const db = getDb({ DB: env.DB });
  return createVisitsService(db);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const visitsService = getVisitsService();

    const body = await request.json();

    // Validate request body with Zod
    const validatedData = recordVisitSchema.parse(body);
    const { pagePath } = validatedData;

    const country = request.headers.get('CF-IPCountry') ?? 'Unknown';

    await visitsService.recordVisit(pagePath, country);

    const response: ApiResponse<null> = { success: true };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Visit recording error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const response: ApiResponse<null> = {
        success: false,
        error: `Validation error: ${error.issues.map((issue) => issue.message).join(', ')}`,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to record visit',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const visitsService = getVisitsService();

    // Optional: Handle query parameters for date range
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let visits: PageVisit[];

    if (startDate != null && endDate != null) {
      // Validate date range parameters
      const validatedParams = z
        .object({
          startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
          endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
        })
        .parse({ startDate, endDate });

      visits = await visitsService.getVisitsByDateRange(
        validatedParams.startDate,
        validatedParams.endDate,
      );
    } else {
      visits = await visitsService.getAllVisits();
    }

    const response: ApiResponse<{ visits: PageVisit[] }> = {
      success: true,
      data: { visits },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Visits fetch error:', error);

    if (error instanceof z.ZodError) {
      const response: ApiResponse<null> = {
        success: false,
        error: `Invalid parameters: ${error.issues.map((issue) => issue.message).join(', ')}`,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch visits',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
