'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Compass, Target, TrendingUp, LayoutDashboard, ListChecks, FolderLock, Users, Trophy, ShieldAlert, BookOpen, LogIn, UserPlus, User, Info, Mail, HelpCircle, Lock, FileText, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Compass, Target, TrendingUp, LayoutDashboard, ListChecks, FolderLock, Users, Trophy, ShieldAlert, BookOpen, LogIn, UserPlus, User, Info, Mail, HelpCircle, Lock, FileText,
};

type Props = {
  title: string;
  description: string;
  icon: keyof typeof icons;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PlaceholderPage({ title, description, icon, ctaHref = '/', ctaLabel = 'Back home' }: Props) {
  const Icon = icons[icon] ?? Info;
  return (
    <div className="container py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl rounded-3xl glass p-10 text-center shadow-sm"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Icon className="h-8 w-8" />
        </div>
        <Badge className="mt-4 gap-1.5 rounded-full bg-accent/60 text-accent-foreground">
          <Sparkles className="h-3 w-3" /> Coming soon
        </Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-muted-foreground text-pretty">{description}</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href={ctaHref} className="gap-2">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}