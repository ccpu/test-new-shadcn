'use client';

import { useVisits, useVisitStats } from '../../lib/hooks/useVisits';

export default function Analytics() {
  const { visits, loading: visitsLoading, error: visitsError } = useVisits();
  const { stats, loading: statsLoading, error: statsError } = useVisitStats();

  if (visitsLoading || statsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (visitsError != null || statsError != null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <p className="text-red-500">Error: {visitsError ?? statsError}</p>
          <p className="mt-2 text-sm text-gray-600">
            Make sure you have set up the visitor database. See{' '}
            <strong>VISITOR_DATABASE_SETUP.md</strong> for instructions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Page Visit Analytics</h1>

        {visits.length === 0 ? (
          <p className="text-gray-500">No visits recorded yet.</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Summary</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-white p-4 shadow">
                  <p className="text-sm text-gray-600">Total Pages</p>
                  <p className="text-2xl font-bold">{stats?.totalPages ?? 0}</p>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow">
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold">{stats?.totalDays ?? 0}</p>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow">
                  <p className="text-sm text-gray-600">Total Visits</p>
                  <p className="text-2xl font-bold">{stats?.totalVisits ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <h2 className="mb-4 text-xl font-semibold">Visit Details</h2>
              <table className="w-full rounded-lg border bg-white shadow">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-700">
                      Page
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <tr key={visit.id} className="border-b">
                      <td className="px-4 py-3">{visit.page_path}</td>
                      <td className="px-4 py-3">{visit.visit_date}</td>
                      <td className="px-4 py-3">{visit.visitor_country ?? 'Unknown'}</td>
                      <td className="px-4 py-3 font-mono">{visit.total_visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
