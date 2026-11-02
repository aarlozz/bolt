'use client';

import { Button } from '@/components/ui/button';
import { AlertOctagon } from 'lucide-react';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-destructive/15 text-destructive">
        <AlertOctagon className="h-10 w-10" />
      </div>
      <p className="mt-6 font-display text-5xl font-semibold text-primary">500</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-muted-foreground text-pretty">
        An unexpected error occurred. Try again, or head back home if it persists.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} className="rounded-full">Try again</Button>
        <Button variant="outline" asChild className="rounded-full">
          <a href="/">Back home</a>
        </Button>
      </div>
    </div>
  );
}