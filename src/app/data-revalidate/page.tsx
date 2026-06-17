'use client';

import { DEFAULT_REVALIDATE_PATHS } from '@/lib/revalidate-paths';
import { useState } from 'react';

export default function DataRevalidatePage() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; paths?: string[] } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-secret': secret
        },
        body: JSON.stringify({ paths: [...DEFAULT_REVALIDATE_PATHS] })
      });

      const data = (await res.json()) as { revalidated?: boolean; paths?: string[]; message?: string };

      if (!res.ok) {
        setResult({ ok: false, message: data.message ?? 'Revalidate failed' });
        return;
      }

      setResult({
        ok: true,
        message: 'Cache revalidated successfully.',
        paths: data.paths
      });
    } catch {
      setResult({ ok: false, message: 'Could not reach server.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-xl font-bold">Data Revalidate</h1>
        <p className="mt-1 text-sm text-muted-foreground">Force refresh public page cache after CMS changes.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="secret" className="mb-1 block text-sm font-medium">
              Revalidate Secret
            </label>
            <input
              id="secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              className="flex h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
              placeholder="REVALIDATE_SECRET"
              autoComplete="off"
            />
          </div>

          <div className="rounded-xl border border-border bg-background/50 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Paths</p>
            <ul className="max-h-40 space-y-1 overflow-y-auto text-xs text-muted-foreground">
              {DEFAULT_REVALIDATE_PATHS.map((path) => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading || !secret}
            className="flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Revalidating...' : 'Revalidate now'}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              result.ok
                ? 'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400'
                : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
            role="status"
          >
            <p>{result.message}</p>
            {result.paths && result.paths.length > 0 && (
              <p className="mt-1 text-xs opacity-80">{result.paths.length} path(s) updated</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
