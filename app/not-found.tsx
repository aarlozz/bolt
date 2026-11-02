import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-accent text-accent-foreground">
        <Construction className="h-10 w-10" />
      </div>
      <p className="mt-6 font-display text-5xl font-semibold text-primary">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground text-pretty">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild className="rounded-full">
          <Link href="/">Back home</Link>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/explore">Browse scholarships</Link>
        </Button>
      </div>
    </div>
  );
}