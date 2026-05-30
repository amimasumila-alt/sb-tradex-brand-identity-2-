import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Shield, Target, Layers, Quote, Check, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { IktaLogoWithText, SBTradexLogo, ParticleField, MarketTicker, Counter } from '../components/Primitives';
import { testimonials, faqData } from '../data/mockData';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6E3] relative cursor-custom">
      <Nav />
      <Hero />
      <MarketTicker />
      <AuthorityStrip />
      <WhatIsTradex />
      <Architect />
      <LivePulse />
      <Testimonials />
      <Plans />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-[#1F1F2E]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C5A23E] blur-xl opacity-20" />
            <div className="relative w-9 h-9 rounded-sm bg-[#050505] border border-[#C5A23E]/40 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <defs>
                  <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8a7229" />
                    <stop offset="50%" stopColor="#F4E08A" />
                    <stop offset="100%" stopColor="#8a7229" />
                  </linearGradient>
                </defs>
                <path d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z" fill="url(#navGold)" />
                <rect x="47" y="30" width="6" height="40" fill="url(#navGold)" />
                <rect x="42" y="30" width="16" height="3" fill="url(#navGold)" />
                <rect x="42" y="67" width="16" height="3" fill="url(#navGold)" />
              </svg>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-sm font-semibold tracking-tight">SB TRADEX</div>
            <div className="font-label text-[8px] tracking-[0.25em] text-[#6B6B7B]">BY IKTAJ GROUP</div>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8 font-label text-[11px] tracking-[0.2em] text-[#6B6B7B]">
          <a href="#platform" className="hover:text-[#C5A23E] transition-colors">Platform</a>
          <a href="#architect" className="hover:text-[#C5A23E] transition-colors">The Architect</a>
          <a href="#plans" className="hover:text-[#C5A23E] transition-colors">Tiers</a>
          <a href="#faq" className="hover:text-[#C5A23E] transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-block font-label text-[11px] tracking-[0.2em] text-[#6B6B7B] hover:text-[#E8E6E3] transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link to="/signup" className="btn-outline-gold font-label text-[11px] tracking-[0.2em] px-5 py-2.5 rounded-sm">
            Request Access
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleField density={50} />

      {/* Radial gold spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#C5A23E] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#7B2FBE] opacity-[0.03] blur-[100px]" />
      </div>

      {/* Geometric grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#C5A23E" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* IKTAJ GROUP reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <IktaLogoWithText size={72} />
        </motion.div>

        {/* Presents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-label text-[11px] tracking-[0.4em] text-[#6B6B7B] mb-6"
        >
          PRESENTS
        </motion.div>

        {/* SB TRADEX wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.03em' }}
          transition={{ delay: 1.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.9] tracking-tight"
        >
          <span className="text-[#E8E6E3]">SB </span>
          <span className="gold-shimmer">TRADEX</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10"
        >
          <div className="divider-gold max-w-xs mx-auto mb-8" />
          <p className="font-display text-lg md:text-2xl text-[#E8E6E3]/90 italic font-light">
            Where Capital Meets Conviction
          </p>
          <p className="font-label text-[11px] tracking-[0.3em] text-[#6B6B7B] mt-4">
            AN INVITE-ONLY TRADING INTELLIGENCE PLATFORM
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="group relative inline-flex items-center gap-3 btn-outline-gold font-label text-[12px] tracking-[0.25em] px-10 py-4 rounded-sm"
          >
            Enter The Platform
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href="#platform"
            className="font-label text-[11px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors px-6 py-4"
          >
            Learn More ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-label text-[9px] tracking-[0.3em] text-[#6B6B7B]">SCROLL</span>
        <div className="scroll-indicator" />
      </motion.div>
    </section>
  );
}

function AuthorityStrip() {
  return (
    <section className="relative py-24 border-t border-[#1F1F2E]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">
            ◆ THE CONVICTION ◆
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#E8E6E3] mb-12 max-w-3xl mx-auto leading-tight">
            Trusted by a quiet circle of serious traders across <span className="gold-shimmer">four continents</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {[
            { num: 8500, suffix: '+', label: 'Active Traders' },
            { num: 78, suffix: '%', label: 'Signal Win Rate' },
            { num: 12, suffix: '+', label: 'Markets Covered' },
            { num: 14, suffix: 'Y', label: 'Years of Research' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold gold-shimmer mb-2">
                <Counter to={stat.num} suffix={stat.suffix} duration={2200} />
              </div>
              <div className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsTradex() {
  const features = [
    {
      icon: <Shield className="w-7 h-7" strokeWidth={1.2} />,
      title: 'Market Intelligence',
      body: 'Real-time analysis across equities, forex, crypto, and commodities. Distilled from institutional-grade research.',
    },
    {
      icon: <Target className="w-7 h-7" strokeWidth={1.2} />,
      title: 'Precision Signals',
      body: 'Curated trade setups with entry, stop-loss, and three-tier take-profit. Every signal is a thesis, not a tip.',
    },
    {
      icon: <Layers className="w-7 h-7" strokeWidth={1.2} />,
      title: 'Wealth Architecture',
      body: 'Long-term portfolio strategy, risk frameworks, and private mentorship. Engineered capital, not gambled capital.',
    },
  ];

  return (
    <section id="platform" className="relative py-32 border-t border-[#1F1F2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ THE SYSTEM ◆</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
            Not a Signal. <br />
            <span className="italic font-light text-[#E8E6E3]/70">A System.</span>
          </h2>
          <p className="text-lg text-[#6B6B7B] leading-relaxed">
            Signals are noise. Systems are signal. SB TRADEX is a complete framework for reading markets, sizing risk, and compounding conviction over decades — not days.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass rounded-sm p-8 card-lift relative overflow-hidden group"
            >
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C5A23E]/30" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C5A23E]/30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C5A23E]/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C5A23E]/30" />

              {/* Gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#C5A23E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E]/70 mb-8">
                  0{i + 1}
                </div>
                <div className="w-14 h-14 rounded-sm border border-[#C5A23E]/30 bg-[#050505] flex items-center justify-center text-[#C5A23E] mb-6 group-hover:border-[#C5A23E] transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#E8E6E3] mb-3">{f.title}</h3>
                <p className="text-[#6B6B7B] leading-relaxed text-sm">{f.body}</p>
                <div className="mt-8 pt-6 border-t border-[#1F1F2E] flex items-center justify-between">
                  <span className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B]">EXPLORE</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A23E]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architect() {
  return (
    <section id="architect" className="relative py-32 border-t border-[#1F1F2E] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A23E] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
        {/* Portrait placeholder — abstract silhouette */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-md mx-auto">
            {/* Ornate frame */}
            <div className="absolute inset-0 gold-hairline" />
            <div className="absolute -inset-3 border border-[#C5A23E]/10" />
            <div className="absolute -inset-6 border border-[#C5A23E]/5" />

            {/* Portrait silhouette */}
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0A0A12] via-[#111118] to-[#050505]">
              <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="portraitLight" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#C5A23E" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#C5A23E" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="silhouette" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1A1A25" />
                    <stop offset="100%" stopColor="#050505" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#portraitLight)" />
                {/* Silhouette */}
                <ellipse cx="150" cy="130" rx="55" ry="68" fill="url(#silhouette)" />
                <path d="M 60 400 Q 60 240 150 240 Q 240 240 240 400 Z" fill="url(#silhouette)" />
                {/* Gold accent line */}
                <line x1="150" y1="0" x2="150" y2="400" stroke="#C5A23E" strokeOpacity="0.08" strokeWidth="0.5" />
              </svg>
              {/* Monogram overlay */}
              <div className="absolute bottom-6 right-6 opacity-40">
                <div className="w-16 h-16 border border-[#C5A23E] flex items-center justify-center">
                  <span className="font-display text-xl font-bold gold-shimmer">IM</span>
                </div>
              </div>
              <div className="absolute top-6 left-6">
                <div className="font-label text-[9px] tracking-[0.3em] text-[#C5A23E]/60">PORTRAIT 001</div>
                <div className="font-mono text-[10px] text-[#6B6B7B] mt-1">IK / FOUNDER</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ THE ARCHITECT ◆</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8">
            Ikbal <br />
            <span className="gold-shimmer italic font-light">Malik.</span>
          </h2>
          <div className="divider-gold max-w-sm mb-8" />
          <p className="text-lg text-[#E8E6E3]/85 leading-relaxed mb-6 font-light">
            Ikbal Malik founded IKTAJ GROUP with a singular belief: <span className="text-[#C5A23E]">wealth is not found — it is engineered.</span>
          </p>
          <p className="text-[#6B6B7B] leading-relaxed mb-10">
            Fourteen years navigating global markets — through euphoria, through collapse, through every regime in between. SB TRADEX is the instrument of that philosophy. Not a product. A discipline, made available.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 border-t border-[#1F1F2E] pt-8">
            {[
              { num: 14, suffix: '+', label: 'Years in Markets' },
              { num: 8500, suffix: '+', label: 'Traders Mentored' },
              { num: 12, suffix: '', label: 'Markets Covered' },
            ].map((s, i) => (
              <div key={i} className="border-l border-[#1F1F2E] first:border-0 pl-4 first:pl-0">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#C5A23E] mb-1">
                  <Counter to={s.num} suffix={s.suffix} />
                </div>
                <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LivePulse() {
  // Animated candlestick visualization
  const candles = [
    { o: 50, c: 62, h: 68, l: 48, up: true },
    { o: 62, c: 58, h: 65, l: 55, up: false },
    { o: 58, c: 72, h: 76, l: 56, up: true },
    { o: 72, c: 68, h: 74, l: 65, up: false },
    { o: 68, c: 82, h: 88, l: 66, up: true },
    { o: 82, c: 78, h: 85, l: 76, up: false },
    { o: 78, c: 94, h: 98, l: 76, up: true },
    { o: 94, c: 88, h: 96, l: 86, up: false },
    { o: 88, c: 104, h: 108, l: 86, up: true },
    { o: 104, c: 98, h: 106, l: 96, up: false },
    { o: 98, c: 116, h: 122, l: 96, up: true },
    { o: 116, c: 112, h: 120, l: 110, up: false },
    { o: 112, c: 128, h: 134, l: 110, up: true },
    { o: 128, c: 122, h: 130, l: 120, up: false },
    { o: 122, c: 138, h: 142, l: 120, up: true },
    { o: 138, c: 134, h: 140, l: 132, up: false },
    { o: 134, c: 150, h: 156, l: 132, up: true },
    { o: 150, c: 144, h: 152, l: 142, up: false },
    { o: 144, c: 162, h: 168, l: 142, up: true },
    { o: 162, c: 158, h: 164, l: 156, up: false },
    { o: 158, c: 176, h: 182, l: 156, up: true },
    { o: 176, c: 170, h: 178, l: 168, up: false },
    { o: 170, c: 188, h: 194, l: 168, up: true },
    { o: 188, c: 184, h: 190, l: 182, up: false },
  ];
  const maxH = Math.max(...candles.map((c) => c.h));
  const chartH = 280;

  return (
    <section className="relative py-32 border-t border-[#1F1F2E] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4"
        >
          <div>
            <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ LIVE MARKET PULSE ◆</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Markets, <span className="italic font-light text-[#E8E6E3]/70">made legible.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF9F] animate-pulse" />
            <span className="font-mono text-xs text-[#00FF9F]">LIVE — LONDON SESSION</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass rounded-sm p-6 md:p-10 relative"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1F1F2E]">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#6B6B7B]">SBX-CONVICTION INDEX</div>
              <div className="font-display text-3xl font-bold text-[#E8E6E3] mt-1">
                184.27 <span className="text-[#00FF9F] text-lg">+2.41%</span>
              </div>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((tf, i) => (
                <button
                  key={tf}
                  className={`font-mono text-[10px] px-3 py-1.5 border transition-colors ${
                    i === 2
                      ? 'border-[#C5A23E] text-[#C5A23E] bg-[#C5A23E]/5'
                      : 'border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/40 hover:text-[#C5A23E]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Candlestick chart */}
          <div className="relative" style={{ height: chartH }}>
            {/* Horizontal grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute inset-x-0 border-t border-[#1F1F2E]/60"
                style={{ top: `${(i / 4) * 100}%` }}
              />
            ))}
            <svg className="w-full h-full" viewBox={`0 0 ${candles.length * 20} ${chartH}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="candleUp" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00FF9F" />
                  <stop offset="100%" stopColor="#00aa6a" />
                </linearGradient>
                <linearGradient id="candleDown" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF0A3E" />
                  <stop offset="100%" stopColor="#aa0428" />
                </linearGradient>
                <linearGradient id="areaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C5A23E" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C5A23E" stopOpacity="0" />
                </linearGradient>
              </defs>
              {candles.map((c, i) => {
                const x = i * 20 + 10;
                const yH = chartH - (c.h / maxH) * (chartH - 20) - 10;
                const yL = chartH - (c.l / maxH) * (chartH - 20) - 10;
                const yO = chartH - (c.o / maxH) * (chartH - 20) - 10;
                const yC = chartH - (c.c / maxH) * (chartH - 20) - 10;
                return (
                  <g key={i}>
                    <line x1={x} y1={yH} x2={x} y2={yL} stroke={c.up ? '#00FF9F' : '#FF0A3E'} strokeWidth="0.5" strokeOpacity="0.6" />
                    <rect
                      x={x - 4}
                      y={Math.min(yO, yC)}
                      width="8"
                      height={Math.abs(yO - yC) || 0.5}
                      fill={c.up ? 'url(#candleUp)' : 'url(#candleDown)'}
                    />
                  </g>
                );
              })}
            </svg>
            {/* Current price line */}
            <div
              className="absolute inset-x-0 border-t border-dashed border-[#C5A23E]/50 pointer-events-none"
              style={{ top: '12%' }}
            >
              <span className="absolute right-2 -top-2.5 font-mono text-[10px] text-[#C5A23E] bg-[#0A0A12] px-2 py-0.5">
                184.27
              </span>
            </div>
          </div>

          {/* Footer stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#1F1F2E]">
            {[
              { label: '24H VOLUME', value: '$4.82B' },
              { label: 'HIGH', value: '186.40' },
              { label: 'LOW', value: '179.84' },
              { label: 'MOMENTUM', value: '+14.2%', color: 'text-[#00FF9F]' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">{s.label}</div>
                <div className={`font-mono text-lg font-semibold ${s.color || 'text-[#E8E6E3]'}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-32 border-t border-[#1F1F2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ TESTIMONIALS ◆</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            The Inner Circle <span className="italic font-light text-[#E8E6E3]/70">Speaks.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-smoke rounded-sm p-8 md:p-10 card-lift relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C5A23E]/20" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-[#C5A23E] text-[#C5A23E]" />
                ))}
              </div>
              <p className="text-[#E8E6E3]/90 leading-relaxed mb-8 text-lg font-light italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-[#1F1F2E]">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-[#050505] font-display font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-[#E8E6E3]">{t.name}</div>
                  <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B]">
                    {t.role} • {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plans() {
  const tiers = [
    {
      name: 'Observer',
      price: 'FREE',
      period: '',
      tagline: 'For the curious.',
      features: ['Basic market updates', 'Community access', 'Weekly insights digest', 'Academy — Module 1'],
      cta: 'Begin',
      highlight: false,
    },
    {
      name: 'Strategist',
      price: '₹4,999',
      period: '/mo',
      tagline: 'For the committed.',
      features: ['Everything in Observer', 'Daily premium signals', 'Live trading sessions', 'Full Academy access', 'Priority support'],
      cta: 'Elevate',
      highlight: true,
    },
    {
      name: 'Architect',
      price: '₹19,999',
      period: '/mo',
      tagline: 'For the conviction.',
      features: ['Everything in Strategist', '1-on-1 with Ikbal Malik', 'Private portfolio review', 'Inner Circle access', 'Direct concierge line'],
      cta: 'Ascend',
      highlight: false,
      premium: true,
    },
  ];

  return (
    <section id="plans" className="relative py-32 border-t border-[#1F1F2E] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C5A23E] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ TIERS ◆</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
            Choose Your <span className="italic font-light text-[#E8E6E3]/70">Tier.</span>
          </h2>
          <p className="text-[#6B6B7B] max-w-xl mx-auto">
            Access is earned. Tiers are earned. Begin where you are — ascend as you grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative rounded-sm p-8 md:p-10 card-lift ${
                t.premium
                  ? 'bg-gradient-to-b from-[#1A1A25] via-[#111118] to-[#0A0A12] gold-hairline-strong gold-glow-strong md:scale-[1.03]'
                  : t.highlight
                  ? 'glass gold-hairline md:scale-[1.02]'
                  : 'glass-smoke border-[#1F1F2E]'
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-[#050505] font-label text-[9px] tracking-[0.25em] px-3 py-1">
                  MOST POPULAR
                </div>
              )}
              {t.premium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#050505] border border-[#C5A23E] text-[#C5A23E] font-label text-[9px] tracking-[0.25em] px-3 py-1">
                  INNER CIRCLE
                </div>
              )}

              {/* Corner ornaments for premium */}
              {t.premium && (
                <>
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C5A23E]" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C5A23E]" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C5A23E]" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C5A23E]" />
                </>
              )}

              <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">TIER 0{i + 1}</div>
              <h3 className="font-display text-3xl font-bold text-[#E8E6E3] mb-2">{t.name}</h3>
              <p className="text-sm text-[#6B6B7B] italic mb-8">{t.tagline}</p>

              <div className="mb-8 pb-8 border-b border-[#1F1F2E]">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-5xl font-bold ${t.premium ? 'gold-shimmer' : 'text-[#E8E6E3]'}`}>{t.price}</span>
                  {t.period && <span className="font-mono text-sm text-[#6B6B7B]">{t.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#E8E6E3]/85">
                    <div className={`mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center shrink-0 ${
                      t.premium ? 'bg-[#C5A23E] text-[#050505]' : 'border border-[#C5A23E] text-[#C5A23E]'
                    }`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block text-center font-label text-[11px] tracking-[0.25em] py-4 transition-all ${
                  t.premium
                    ? 'btn-gold'
                    : t.highlight
                    ? 'btn-outline-gold'
                    : 'border border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/50 hover:text-[#C5A23E]'
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-label text-[10px] tracking-[0.2em] text-[#6B6B7B] mt-12">
          PRICED IN INR • USD AVAILABLE ON REQUEST • CANCEL ANYTIME
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 border-t border-[#1F1F2E]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ CLARITY ◆</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Clarity Before <span className="italic font-light text-[#E8E6E3]/70">Commitment.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqData.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`border transition-all duration-500 ${
                open === i ? 'border-[#C5A23E]/40 bg-[#111118]/40' : 'border-[#1F1F2E] hover:border-[#C5A23E]/20'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-[#C5A23E]/60 pt-1">0{i + 1}</span>
                  <span className="font-display text-base md:text-lg font-medium text-[#E8E6E3]">{f.q}</span>
                </div>
                <div className={`w-8 h-8 rounded-sm border flex items-center justify-center shrink-0 transition-all duration-500 ${
                  open === i ? 'border-[#C5A23E] bg-[#C5A23E] text-[#050505] rotate-45' : 'border-[#1F1F2E] text-[#C5A23E]'
                }`}>
                  <Plus className="w-4 h-4" strokeWidth={2} />
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pl-16 text-[#6B6B7B] leading-relaxed">{f.a}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-[#1F1F2E] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <IktaLogoWithText size={56} className="items-start mb-6" />
            <SBTradexLogo className="mb-6" />
            <p className="text-sm text-[#6B6B7B] max-w-sm leading-relaxed">
              An elite, invite-style trading intelligence platform. Where capital meets conviction — and conviction meets compounding.
            </p>
          </div>
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">PLATFORM</div>
            <ul className="space-y-2 text-sm text-[#6B6B7B]">
              <li><a href="#platform" className="hover:text-[#E8E6E3] transition-colors">The System</a></li>
              <li><a href="#architect" className="hover:text-[#E8E6E3] transition-colors">The Architect</a></li>
              <li><a href="#plans" className="hover:text-[#E8E6E3] transition-colors">Tiers</a></li>
              <li><Link to="/login" className="hover:text-[#E8E6E3] transition-colors">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">CONNECT</div>
            <ul className="space-y-2 text-sm text-[#6B6B7B]">
              <li><a href="#" className="hover:text-[#E8E6E3] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#E8E6E3] transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-[#E8E6E3] transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-[#E8E6E3] transition-colors">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] font-label tracking-[0.2em] text-[#6B6B7B]">
          <div>© 2025 IKTAJ GROUP. ALL RIGHTS RESERVED.</div>
          <div className="text-[#3A3A4A] max-w-2xl md:text-right">
            MARKETS INVOLVE RISK. PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS. SB TRADEX PROVIDES EDUCATIONAL CONTENT AND DOES NOT CONSTITUTE FINANCIAL ADVICE.
          </div>
        </div>
      </div>
    </footer>
  );
}
