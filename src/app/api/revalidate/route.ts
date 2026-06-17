import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { DEFAULT_REVALIDATE_PATHS } from '@/lib/revalidate-paths';

export async function POST(req: Request) {
  const secret = req.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const paths: string[] =
    Array.isArray(body.paths) && body.paths.length > 0 ? body.paths.map(String) : [...DEFAULT_REVALIDATE_PATHS];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
