'use client';

import type { ApiResponse, PageVisit, VisitStats } from '../types/visits.types';

import { useEffect, useState } from 'react';

export function useVisits(): {
  visits: PageVisit[];
  loading: boolean;
  error: string | null;
} {
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits');
        const response: ApiResponse<{ visits: PageVisit[] }> = await res.json();

        // Trust the API response - basic error handling only
        if (!response.success) {
          setError(response.error ?? 'Failed to fetch visits');
          return;
        }

        setVisits(response.data?.visits ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits().catch(console.error);
  }, []);

  return { visits, loading, error };
}

export function useVisitStats(): {
  stats: VisitStats | null;
  loading: boolean;
  error: string | null;
} {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/visits/stats');
        const response: ApiResponse<VisitStats> = await res.json();

        // Trust the API response - basic error handling only
        if (!response.success) {
          setError(response.error ?? 'Failed to fetch stats');
          return;
        }

        setStats(response.data ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats().catch(console.error);
  }, []);

  return { stats, loading, error };
}
