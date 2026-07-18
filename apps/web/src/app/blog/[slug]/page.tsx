'use client';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;
  return (
    <main className="flex flex-col items-center gap-[32px] p-8 sm:items-start">
      <h1 className="mb-4 text-3xl font-bold">Blog Post: {slug}</h1>
      <p>
        This is a sample blog post page for <strong>{slug}</strong>.
      </p>
    </main>
  );
}
