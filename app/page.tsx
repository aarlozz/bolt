'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Target,
  CalendarClock,
  FileCheck2,
  MapPinned,
  Sparkles,
  GraduationCap,
  Users,
  Languages,
  TrendingUp,
  BadgeCheck,
  AlertTriangle,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';
import { HimalayanSkyline } from '@/components/himalayan-skyline';
import { FloatingScholarshipCards } from '@/components/floating-scholarship-cards';
import { useI18n } from '@/components/i18n-provider';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function Home() {
  const reduce = useReducedMotion();
  const { t, locale } = useI18n();

  const features = [
    { icon: Target, title: 'Match Score Engine', desc: 'A 2-minute onboarding scores every scholarship against your profile — with a plain-language "why".', accent: 'bg-accent text-accent-foreground' },
    { icon: BadgeCheck, title: 'Scam Shield & Verified', desc: 'Every listing carries a verification status. Report suspicious offers and check the public scam watchlist.', accent: 'bg-success/15 text-success' },
    { icon: CalendarClock, title: 'BS + AD Deadlines', desc: 'Deadlines in Bikram Sambat and AD, with days-left urgency and .ics export to your calendar.', accent: 'bg-warning/15 text-warning' },
    { icon: FileCheck2, title: 'Document Vault', desc: 'Securely store transcripts, citizenship, and recommendations with expiry reminders and a readiness checklist.', accent: 'bg-accent text-accent-foreground' },
    { icon: MapPinned, title: 'Local Opportunities Map', desc: 'An interactive Nepal map surfaces hidden municipal and provincial scholarships you\'d otherwise miss.', accent: 'bg-primary/15 text-primary' },
    { icon: GraduationCap, title: 'Roadmap Builder', desc: 'Pick a goal — MEXT Master\'s 2027 — and get a month-by-month timeline from language test to deadline.', accent: 'bg-accent text-accent-foreground' },
    { icon: Users, title: 'Mentor & Alumni Network', desc: 'Past awardees share stories, answer questions, and open 15-minute mentor slots.', accent: 'bg-primary/15 text-primary' },
    { icon: Languages, title: 'नेपाली / English', desc: 'Full content toggle, Romanized Nepali search, and a Parent Mode for Nepali-first browsing.', accent: 'bg-accent text-accent-foreground' },
  ];

  const levels = [
    { label: 'SEE', count: '120+' },
    { label: '+2 / Class 11–12', count: '210+' },
    { label: 'Bachelor\'s', count: '340+' },
    { label: 'Master\'s', count: '280+' },
    { label: 'PhD', count: '90+' },
  ];

  const testimonials = [
    {
      name: 'Sarita Tamang',
      role: 'MEXT Awardee 2025 · Engineering, Tokyo',
      quote: 'I had never heard of MEXT until the match score put it at 94%. The roadmap walked me from IELTS to SOP to interview in eight months.',
    },
    {
      name: 'Bibek K.C.',
      role: 'Karnali Province STEM Grant',
      quote: 'A municipal scholarship I never saw on Facebook showed up on the map. Applied, got it, and the tracker reminded me of every step.',
    },
    {
      name: 'Anjila Rai',
      role: 'Chevening Fellow 2026',
      quote: 'The Scam Shield flagged a "consultancy" charging for a free scholarship. Avasar is the trust Nepali students have been missing.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative isolate">
        {/* animated mesh */}
        <div className="pointer-events-none absolute inset-0 -z-10 mesh-mocha dark:mesh-mocha-dark animate-mesh-drift" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="container grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0}
            className="max-w-2xl"
          >
            <Badge className="gap-1.5 rounded-full border-accent bg-accent/60 text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              {locale === 'ne' ? 'नेपालका लागि बीटा' : 'Beta for Nepal'}
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {locale === 'ne' ? (
                <>
                  नेपाल र विश्वका <span className="text-primary">सबै छात्रवृत्ति</span>। तपाईंका लागि म्याच।
                </>
              ) : (
                <>
                  Every scholarship in Nepal and beyond.{' '}
                  <span className="text-primary">Matched to you.</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {locale === 'ne'
                ? 'खोज्नुहोस्, म्याच गर्नुहोस्, आवेदन दिनुहोस्, र ट्र्याक गर्नुहोस् — SEE देखि PhD सम्म, स्थानीय र अन्तर्राष्ट्रिय। ठगी निगरानी र दुवै पात्रोमा समयसीमा।'
                : 'Discover, match, apply, and track — from SEE to PhD, local and international. With a Scam Shield and deadlines in both calendars.'}
            </p>

            {/* Search bar */}
            <form className="mt-7 flex items-center gap-2 rounded-2xl glass-strong p-2 shadow-sm" onSubmit={(e) => e.preventDefault()}>
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="search"
                placeholder={locale === 'ne' ? 'क्षेत्र, प्रदेश, वा छात्रवृत्ति खोज्नुहोस्…' : 'Search field, province, or scholarship…'}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                aria-label="Search scholarships"
              />
              <Button size="sm" className="rounded-xl font-semibold" asChild>
                <Link href="/explore">{t('cta.browse')}</Link>
              </Button>
            </form>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="rounded-full font-semibold" asChild>
                <Link href="/onboarding" className="gap-2">
                  {t('cta.onboard')} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold" asChild>
                <Link href="/check">{t('cta.checker')}</Link>
              </Button>
            </div>

            {/* Live counters */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                  <AnimatedCounter to={412} prefix="NPR " suffix=" Cr+" />
                </p>
                <p className="text-xs text-muted-foreground">in scholarships listed</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                  <AnimatedCounter to={1240} suffix="+" />
                </p>
                <p className="text-xs text-muted-foreground">open right now</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                  <AnimatedCounter to={60} suffix="+" />
                </p>
                <p className="text-xs text-muted-foreground">verified providers</p>
              </div>
            </div>
          </motion.div>

          {/* Floating cards visual */}
          <div className="relative hidden h-[420px] sm:block lg:h-[500px]">
            <FloatingScholarshipCards />
          </div>
        </div>

        {/* Himalayan skyline */}
        <HimalayanSkyline className="relative w-full" />
      </section>

      {/* ─── LEVELS STRIP ─── */}
      <section className="border-y border-border bg-card/60">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm">
          <span className="font-medium text-muted-foreground">Scholarships for every level:</span>
          {levels.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{l.label}</span>
              <Badge variant="secondary" className="rounded-full">{l.count}</Badge>
            </span>
          ))}
        </div>
      </section>

      {/* ─── FEATURES BENTO ─── */}
      <section className="container py-16 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={reveal}
          custom={0}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {locale === 'ne' ? 'विश्वास र अवसर एकै ठाउँमा' : 'Trust and opportunity, in one place'}
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            {locale === 'ne'
              ? 'फेसबुक पेज, पत्रपत्रिका, र मुख्य जानकारी छरिएका छन्। अबसरले सबै भरपर्दो र संरचित बनाउँछ।'
              : 'Scholarship info is scattered across Facebook, newspapers, and word of mouth. Avasar makes it trusted and structured.'}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={reveal}
                custom={i + 1}
                className="group rounded-2xl glass p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${f.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-card/40 border-y border-border">
        <div className="container py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {locale === 'ne' ? 'कसरी काम गर्छ' : 'How it works'}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {locale === 'ne' ? 'चार चरणमा योग्य छात्रवृत्ति सम्म पुग्नुहोस्।' : 'Get to a scholarship you qualify for in four steps.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', title: 'Build your profile', desc: 'Grade, stream, GPA, district, income, inclusion — 2 minutes.', icon: Target },
              { n: '02', title: 'See your matches', desc: 'Every listing shows a match % and a plain-language reason.', icon: TrendingUp },
              { n: '03', title: 'Check readiness', desc: 'Document vault tells you 5/8 ready and what\'s missing.', icon: FileCheck2 },
              { n: '04', title: 'Track & get reminders', desc: 'Kanban tracker with email, SMS, and WhatsApp nudges.', icon: CalendarClock },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={reveal}
                  custom={i}
                  className="relative rounded-2xl glass p-6"
                >
                  <span className="font-display text-5xl font-semibold text-primary/20">{s.n}</span>
                  <div className="mt-3 grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TRUST / SCAM SHIELD ─── */}
      <section className="container py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            custom={0}
          >
            <Badge className="gap-1.5 rounded-full bg-success/15 text-success border-success/30">
              <ShieldCheck className="h-3.5 w-3.5" /> Scam Shield
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {locale === 'ne' ? 'नक्कली छात्रवृत्तिबाट बच्नुहोस्' : 'Never fall for a fake scholarship again'}
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              {locale === 'ne'
                ? 'हामी दाताहरू र सूचीहरू प्रमाणित गर्छौं। अनौठो अफर देख्नुभयो? एक क्लिकमा रिपोर्ट गर्नुहोस्। हाम्रो सार्वजनिक ठगी निगरानी सूची हेर्नुहोस्।'
                : 'We verify providers and listings. Spot something off? Report it in one tap. Check our public scam watchlist before you pay anyone.'}
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                'Verified by Team / Provider Verified / Unverified badges',
                'One-tap "Report suspicious scholarship or consultancy"',
                'Public Known Scams watchlist, updated weekly',
                'No listing goes live without a verification check',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6 rounded-full" variant="outline" asChild>
              <Link href="/scams" className="gap-2">
                <AlertTriangle className="h-4 w-4" /> {locale === 'ne' ? 'ठगी निगरानी हेर्नुहोस्' : 'View scam watchlist'}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            custom={1}
            className="rounded-3xl glass p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Recent scam watchlist</h3>
              <Badge variant="secondary" className="ml-auto rounded-full">Sample</Badge>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                { name: '"Global Nepal Scholarship Consultancy"', reason: 'Charges NPR 15,000 for a free DAAD listing', status: 'Confirmed scam' },
                { name: '"USA Full Ride 2026 — Apply Now"', reason: 'Fake Facebook page, no provider website', status: 'Unverified' },
                { name: '"Quick MBA Grant — Pay processing fee"', reason: 'Asks for bank details upfront', status: 'Under review' },
              ].map((s) => (
                <li key={s.name} className="flex items-start gap-3 rounded-xl bg-background/60 p-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive/15 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.reason}</p>
                    <Badge variant="outline" className="mt-1 rounded-full text-[10px]">
                      {s.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-card/40 border-y border-border">
        <div className="container py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {locale === 'ne' ? 'सफलताका कथाहरू' : 'Stories from awardees'}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {locale === 'ne' ? 'पुरस्कृत विद्यार्थीहरूले साझा गरेका वास्तविक यात्रा।' : 'Real journeys from students who won, shared in their words.'}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={reveal}
                custom={i}
                className="rounded-2xl glass p-6 shadow-sm"
              >
                <Quote className="h-6 w-6 text-primary/30" />
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90 text-pretty">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER STRIP ─── */}
      <section className="container py-12">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {locale === 'ne' ? 'साझेदार विश्वविद्यालय र संस्थाहरू' : 'Partner universities & organizations'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {['Tribhuvan Univ.', 'Kathmandu Univ.', 'Pokhara Univ.', 'Fulbright Nepal', 'DAAD', 'British Council', 'JICA'].map((p) => (
            <span key={p} className="font-display text-lg font-semibold text-muted-foreground">{p}</span>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="container pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={reveal}
          custom={0}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-lg sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 mesh-mocha opacity-30" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {locale === 'ne' ? 'आजै म्याच खोज्नुहोस्' : 'Find your match today'}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-primary-foreground/80 text-pretty">
              {locale === 'ne' ? '२ मिनेटमा प्रोफाइल बनाउनुहोस् र योग्य छात्रवृत्ति देख्नुहोस्।' : 'Build your profile in 2 minutes and see every scholarship you qualify for.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" className="rounded-full font-semibold" asChild>
                <Link href="/onboarding" className="gap-2">
                  {t('cta.onboard')} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/check">{t('cta.checker')}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}