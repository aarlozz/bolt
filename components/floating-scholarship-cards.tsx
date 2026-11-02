'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Globe2, ShieldCheck, Clock } from 'lucide-react';

type FloatingCard = {
  title: string;
  meta: string;
  amount: string;
  match: number;
  icon: React.ElementType;
  delay: number;
  className: string;
};

const cards: FloatingCard[] = [
  {
    title: 'MEXT Master\u2019s 2027',
    meta: 'Japan · Govt.',
    amount: 'Full tuition + stipend',
    match: 92,
    icon: Globe2,
    delay: 0.2,
    className: 'left-[2%] top-[18%] w-[200px] sm:w-[230px]',
  },
  {
    title: 'Karnali Province STEM',
    meta: 'Nepal · Province',
    amount: 'NPR 60,000/yr',
    match: 98,
    icon: GraduationCap,
    delay: 0.5,
    className: 'right-[3%] top-[8%] w-[210px] sm:w-[250px]',
  },
  {
    title: 'Chevening Fellowship',
    meta: 'UK · FCO',
    amount: 'Full funding',
    match: 86,
    icon: ShieldCheck,
    delay: 0.8,
    className: 'left-[8%] bottom-[16%] w-[200px] sm:w-[240px]',
  },
];

export function FloatingScholarshipCards() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-full w-full">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -3 : 3 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: i % 2 === 0 ? -2 : 2,
            }}
            transition={{ duration: 0.7, delay: c.delay, ease: 'easeOut' }}
            className={`absolute ${c.className}`}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.delay,
              }}
              className="glass-strong rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-primary text-primary-foreground"
                >
                  {c.match}% match
                </Badge>
              </div>
              <p className="mt-3 font-display text-base font-semibold leading-tight">
                {c.title}
              </p>
              <p className="text-xs text-muted-foreground">{c.meta}</p>
              <p className="mt-2 text-sm font-medium text-foreground/80">{c.amount}</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> Deadline in 38 days
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}