import type { NextRequest } from 'next/server';

import type { ApiResponse, VisitStats } from '../../../../lib/types/visits.types';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

import { getDb } from '../../../../db';
import { createVisitsService } from '../../../../lib';

function isValidEnv(env: unknown): env is { DB: D1Database } {
  return env !== null && typeof env === 'object' && 'DB' in env && env.DB !== null;
}

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const { env } = getCloudflareContext();

    if (!isValidEnv(env)) {
      throw new Error('Database not configured');
    }

    const db = getDb({ DB: env.DB });
    const visitsService = createVisitsService(db);

    const stats = await visitsService.getVisitStats();

    const response: ApiResponse<VisitStats> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Stats fetch error:', error);

    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch stats',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
