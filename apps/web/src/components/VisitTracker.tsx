'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page visit
    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagePath: pathname }),
    }).catch(console.error);
  }, [pathname]);

  return null; // This component doesn't render anything
}
