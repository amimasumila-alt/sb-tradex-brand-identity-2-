import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Filter, Search,
  BookOpen, Lock, Clock, Zap
} from 'lucide-react';
import { signalsData, marketIndices, academyModules } from '../data/mockData';
import { SignalCard } from './DashboardHome';

// ======================== SIGNALS PAGE ========================
export function SignalsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? signalsData : signalsData.filter((s) => s.market === filter);

  const stats = {
    total: signalsData.length,
    winRate: 78,
    avgRR: '1:3.4',
    active: signalsData.filter((s) => s.status === 'Active').length,
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ SIGNAL ARCHIVE ◆</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">The <span className="gold-shimmer italic font-light">Ledger.</span></h1>
        <p className="text-[#6B6B7B] mt-3">Every conviction. Every thesis. Archived, unfiltered.</p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Signals', value: stats.total },
          { label: 'Win Rate', value: stats.winRate, suffix: '%' },
          { label: 'Avg R:R', value: stats.avgRR },
          { label: 'Active Now', value: stats.active },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-sm p-4">
            <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">{s.label.toUpperCase()}</div>
            <div className="font-display text-2xl font-bold text-[#E8E6E3]">
              {s.value}{s.suffix || ''}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 border border-[#1F1F2E] rounded-sm bg-[#0A0A12]/60">
          <Search className="w-3.5 h-3.5 text-[#6B6B7B]" />
          <input className="bg-transparent outline-none text-xs font-mono flex-1 placeholder:text-[#6B6B7B]" placeholder="Search signal, asset..." />
        </div>
        <div className="flex gap-2">
          {['All', 'Forex', 'Stocks', 'Crypto', 'Commodities'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-label text-[10px] tracking-[0.2em] px-3 py-2 border rounded-sm transition-colors ${
                filter === f ? 'border-[#C5A23E] text-[#C5A23E] bg-[#C5A23E]/5' : 'border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/40'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="font-label text-[10px] tracking-[0.2em] px-3 py-2 border border-[#1F1F2E] rounded-sm text-[#6B6B7B] hover:border-[#C5A23E]/40 flex items-center gap-2">
          <Filter className="w-3 h-3" /> MORE FILTERS
        </button>
      </motion.div>

      {/* Signals list */}
      <div className="space-y-3">
        {filtered.map((s, i) => (
          <SignalCard key={s.id} signal={s} index={i} />
        ))}
      </div>
    </div>
  );
}

// ======================== MARKET PULSE ========================
export function MarketPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ MARKET PULSE ◆</div>
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Live <span className="gold-shimmer italic font-light">Markets.</span></h1>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
            <span className="font-mono text-xs text-[#00FF9F]">REAL-TIME • LONDON OPEN</span>
          </div>
        </div>
      </motion.div>

      {/* Indices grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndices.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-sm p-5 card-lift relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] font-semibold text-[#E8E6E3]">{m.symbol}</div>
              {m.change > 0 ? (
                <TrendingUp className="w-3.5 h-3.5 text-[#00FF9F]" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-[#FF0A3E]" />
              )}
            </div>
            <div className="font-display text-xl font-bold text-[#E8E6E3] mb-1">
              {m.price.toLocaleString()}
            </div>
            <div className={`font-mono text-xs ${m.change > 0 ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
              {m.change > 0 ? '+' : ''}{m.change.toFixed(2)}%
            </div>
            {/* Mini sparkline */}
            <svg viewBox="0 0 100 40" className="w-full h-10 mt-3">
              <defs>
                <linearGradient id={`spark${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={m.change > 0 ? '#00FF9F' : '#FF0A3E'} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={m.change > 0 ? '#00FF9F' : '#FF0A3E'} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points={m.data.map((d, j) => {
                  const min = Math.min(...m.data);
                  const max = Math.max(...m.data);
                  const range = max - min || 1;
                  const x = (j / (m.data.length - 1)) * 100;
                  const y = 40 - ((d - min) / range) * 35 - 2;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke={m.change > 0 ? '#00FF9F' : '#FF0A3E'}
                strokeWidth="1.5"
              />
              <polygon
                points={`0,40 ${m.data.map((d, j) => {
                  const min = Math.min(...m.data);
                  const max = Math.max(...m.data);
                  const range = max - min || 1;
                  const x = (j / (m.data.length - 1)) * 100;
                  const y = 40 - ((d - min) / range) * 35 - 2;
                  return `${x},${y}`;
                }).join(' ')} 100,40`}
                fill={`url(#spark${i})`}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Market Mood Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ SECTOR HEATMAP ◆</div>
            <h2 className="font-display text-2xl font-bold">Market Mood</h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#FF0A3E]" />
            <span className="font-mono text-[#6B6B7B]">LOSS</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#FF0A3E] via-[#6B6B7B] to-[#00FF9F] mx-2" />
            <div className="w-2 h-2 rounded-full bg-[#00FF9F]" />
            <span className="font-mono text-[#6B6B7B]">GAIN</span>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { name: 'TECH', val: 2.4 }, { name: 'ENERGY', val: -1.2 }, { name: 'FINANCE', val: 0.8 },
            { name: 'HEALTH', val: 1.1 }, { name: 'REALTY', val: -0.5 }, { name: 'AUTO', val: 1.9 },
            { name: 'METALS', val: 0.3 }, { name: 'PHARMA', val: -0.8 }, { name: 'INFRA', val: 2.1 },
            { name: 'IT', val: 3.2 }, { name: 'MEDIA', val: -1.8 }, { name: 'UTIL', val: 0.4 },
          ].map((s, i) => {
            const intensity = Math.min(Math.abs(s.val) / 3, 1);
            const color = s.val > 0 ? `rgba(0, 255, 159, ${intensity * 0.4 + 0.08})` : `rgba(255, 10, 62, ${intensity * 0.4 + 0.08})`;
            const borderColor = s.val > 0 ? `rgba(0, 255, 159, ${intensity * 0.6 + 0.15})` : `rgba(255, 10, 62, ${intensity * 0.6 + 0.15})`;
            return (
              <div
                key={i}
                style={{ background: color, borderColor }}
                className="border rounded-sm p-3 aspect-square flex flex-col justify-between"
              >
                <div className="font-label text-[9px] tracking-[0.2em] text-[#E8E6E3]/80">{s.name}</div>
                <div className={`font-display text-lg font-bold ${s.val > 0 ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
                  {s.val > 0 ? '+' : ''}{s.val}%
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-sm p-6 md:p-8">
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ FEATURED ◆</div>
        <h2 className="font-display text-2xl font-bold mb-6">NIFTY 50 — Daily</h2>
        <div className="h-[400px] w-full bg-[#050505] border border-[#1F1F2E] rounded-sm relative overflow-hidden grid-bg">
          <BigCandleChart />
          <div className="absolute top-4 left-4">
            <div className="font-mono text-xs text-[#6B6B7B]">NSE</div>
            <div className="font-display text-2xl font-bold text-[#E8E6E3]">24,812.45</div>
            <div className="font-mono text-sm text-[#00FF9F]">+206.30 (+0.84%)</div>
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#6B6B7B]">LIVE • 1D</div>
        </div>
      </motion.div>
    </div>
  );
}

function BigCandleChart() {
  // Stylized candlesticks
  const candles = Array.from({ length: 60 }, (_, i) => {
    const trend = Math.sin(i / 8) * 30 + i * 0.6;
    const o = 100 + trend + (Math.sin(i * 0.7) * 10);
    const c = o + (Math.random() - 0.4) * 15;
    const h = Math.max(o, c) + Math.random() * 8;
    const l = Math.min(o, c) - Math.random() * 8;
    return { o, c, h, l };
  });
  const maxH = Math.max(...candles.map((c) => c.h));
  const minH = Math.min(...candles.map((c) => c.l));
  const chartH = 360;
  const range = maxH - minH || 1;
  const yFor = (v: number) => chartH - ((v - minH) / range) * (chartH - 20) - 10;

  return (
    <svg viewBox={`0 0 ${candles.length * 12} ${chartH}`} className="w-full h-full" preserveAspectRatio="none">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={(i / 4) * chartH} x2={candles.length * 12} y2={(i / 4) * chartH} stroke="#1F1F2E" strokeWidth="0.5" />
      ))}
      {candles.map((c, i) => {
        const x = i * 12 + 6;
        const up = c.c >= c.o;
        return (
          <g key={i}>
            <line x1={x} y1={yFor(c.h)} x2={x} y2={yFor(c.l)} stroke={up ? '#00FF9F' : '#FF0A3E'} strokeWidth="0.6" strokeOpacity="0.7" />
            <rect
              x={x - 2.5}
              y={yFor(Math.max(c.o, c.c))}
              width="5"
              height={Math.max(Math.abs(yFor(c.o) - yFor(c.c)), 0.5)}
              fill={up ? '#00FF9F' : '#FF0A3E'}
              fillOpacity="0.85"
            />
          </g>
        );
      })}
    </svg>
  );
}

// ======================== ACADEMY ========================
export function AcademyPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ EDUCATION ◆</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">The Architect's <span className="gold-shimmer italic font-light">Library.</span></h1>
        <p className="text-[#6B6B7B] mt-3 max-w-2xl">A structured path from market fundamentals to institutional-grade frameworks. Built on 14 years of real P&L.</p>
      </motion.div>

      {/* Overall progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-sm p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ YOUR PROGRESS ◆</div>
            <h2 className="font-display text-2xl font-bold">42% Complete</h2>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">MODULES</div>
              <div className="font-display text-xl font-bold">3/5</div>
            </div>
            <div>
              <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">HOURS</div>
              <div className="font-display text-xl font-bold">19/47</div>
            </div>
          </div>
        </div>
        <div className="h-2 bg-[#1F1F2E] rounded-full overflow-hidden">
          <div className="h-full gold-gradient" style={{ width: '42%' }} />
        </div>
      </motion.div>

      {/* Modules */}
      <div className="grid md:grid-cols-2 gap-5">
        {academyModules.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={`glass rounded-sm p-6 md:p-8 card-lift relative ${m.locked ? 'opacity-80' : ''}`}
          >
            {m.locked && (
              <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm rounded-sm flex flex-col items-center justify-center gap-3 z-10">
                <Lock className="w-6 h-6 text-[#C5A23E]" />
                <div className="font-label text-[10px] tracking-[0.25em] text-[#E8E6E3]">ARCHITECT TIER ONLY</div>
                <button className="btn-outline-gold font-label text-[10px] tracking-[0.25em] px-4 py-2 rounded-sm">UNLOCK →</button>
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E]">MODULE 0{m.id}</div>
              <div className="font-mono text-[10px] text-[#6B6B7B]">{m.lessons} lessons • {m.hours}h</div>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#E8E6E3] mb-1">{m.title}</h3>
            <p className="text-sm text-[#6B6B7B] italic mb-6">{m.subtitle}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B]">PROGRESS</span>
                <span className="font-mono text-[10px] text-[#C5A23E]">{m.progress}%</span>
              </div>
              <div className="h-1.5 bg-[#1F1F2E] rounded-full overflow-hidden">
                <div className="h-full gold-gradient" style={{ width: `${m.progress}%` }} />
              </div>
            </div>

            <button className="btn-outline-gold w-full font-label text-[10px] tracking-[0.25em] py-3 rounded-sm">
              {m.progress === 0 ? 'BEGIN MODULE' : m.progress === 100 ? 'REVIEW' : 'CONTINUE'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Featured lesson */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-sm p-6 md:p-8 grid md:grid-cols-[1.2fr_1fr] gap-6">
        <div>
          <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ FEATURED LESSON ◆</div>
          <h2 className="font-display text-3xl font-bold mb-3">The Risk-First Mindset</h2>
          <p className="text-[#6B6B7B] leading-relaxed mb-6">
            Why the best traders in the world spend 80% of their mental energy on what they could lose — and only 20% on what they could gain. A foundational lecture from Ikbal Malik.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-[#6B6B7B]"><Clock className="w-3 h-3" /> 42 min</div>
            <div className="flex items-center gap-1 text-[#6B6B7B]"><Zap className="w-3 h-3" /> Advanced</div>
            <div className="flex items-center gap-1 text-[#C5A23E]"><BookOpen className="w-3 h-3" /> Module 03</div>
          </div>
          <button className="btn-gold font-label text-[11px] tracking-[0.25em] px-6 py-3 rounded-sm mt-6">PLAY LECTURE →</button>
        </div>
        <div className="relative aspect-video bg-[#0A0A12] border border-[#1F1F2E] rounded-sm overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#C5A23E] flex items-center justify-center bg-[#050505]/60 gold-glow cursor-pointer hover:scale-105 transition-transform">
              <div className="w-0 h-0 border-l-[14px] border-l-[#C5A23E] border-y-[9px] border-y-transparent ml-1" />
            </div>
          </div>
          <div className="absolute inset-0 spotlight pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

// ======================== INNER CIRCLE ========================
export function InnerCirclePage() {
  const channels = [
    { name: 'signals-live', desc: 'Real-time signal drops', members: 8500, active: true, locked: false },
    { name: 'macro-desk', desc: 'Global macro discussion', members: 4200, active: true, locked: false },
    { name: 'crypto-pit', desc: 'On-chain & altcoin alpha', members: 6100, active: false, locked: false },
    { name: 'architect-lounge', desc: 'Tier 03 private room', members: 320, active: true, locked: false },
    { name: 'ikbal-ama', desc: 'Monthly founder AMA', members: 8500, active: false, locked: true },
  ];

  const messages = [
    { user: 'Vikram M.', tier: 'A', color: 'gold', text: 'EUR/USD TP1 just hit clean. Trailing the rest to TP2. Textbook setup.', time: '2m', gold: true },
    { user: 'Priya S.', tier: 'S', color: 'green', text: 'Anyone else loading NIFTY on this dip? Structure still looks bullish to me.', time: '8m', gold: false },
    { user: 'Ikbal Malik', tier: '★', color: 'gold', text: 'Patience on BTC here. We do not chase. The level comes to us, or we stand aside. Conviction over FOMO.', time: '14m', gold: true, founder: true },
    { user: 'Arjun R.', tier: 'A', color: 'gold', text: 'That macro-desk note on DXY was surgical. Repositioned my whole week around it.', time: '22m', gold: true },
    { user: 'Anonymous', tier: 'S', color: 'green', text: 'First month here. Win rate on the signals has been unreal. Finally understanding the *why*.', time: '31m', gold: false },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ COMMUNITY ◆</div>
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <h1 className="font-display text-4xl md:text-5xl font-bold">The Inner <span className="gold-shimmer italic font-light">Circle.</span></h1>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
            <span className="font-mono text-xs text-[#00FF9F]">1,284 ONLINE</span>
          </div>
        </div>
        <p className="text-[#6B6B7B] mt-3 max-w-2xl">A quiet room of serious traders. No noise. No hype. Only conviction and execution.</p>
      </motion.div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Channels */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-sm p-4 h-fit">
          <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-3 px-2">◆ CHANNELS</div>
          <div className="space-y-1">
            {channels.map((c, i) => (
              <button
                key={i}
                className={`w-full text-left px-3 py-2.5 rounded-sm transition-all group relative ${
                  i === 0 ? 'bg-[#111118] border-l-2 border-[#C5A23E]' : 'hover:bg-[#0A0A12] border-l-2 border-transparent'
                } ${c.locked ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-sm ${i === 0 ? 'text-[#C5A23E]' : 'text-[#6B6B7B]'}`}>#</span>
                    <span className={`font-display text-sm font-medium ${i === 0 ? 'text-[#E8E6E3]' : 'text-[#6B6B7B] group-hover:text-[#E8E6E3]'}`}>{c.name}</span>
                  </div>
                  {c.locked ? (
                    <Lock className="w-3 h-3 text-[#C5A23E]" />
                  ) : c.active ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F]" />
                  ) : null}
                </div>
                <div className="font-mono text-[9px] text-[#6B6B7B] mt-0.5 ml-5">{c.members.toLocaleString()} members</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chat */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-sm flex flex-col h-[600px]">
          <div className="px-6 py-4 border-b border-[#1F1F2E] flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-bold flex items-center gap-2">
                <span className="text-[#C5A23E]">#</span>signals-live
              </div>
              <div className="font-mono text-[10px] text-[#6B6B7B]">8,500 members • 1,284 online</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-[#1F1F2E] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
              <span className="font-mono text-[10px] text-[#00FF9F]">LIVE</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 ${
                  m.gold ? 'gold-gradient text-[#050505]' : 'bg-[#00FF9F]/15 text-[#00FF9F] border border-[#00FF9F]/30'
                }`}>
                  {m.tier}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-display text-sm font-semibold ${m.founder ? 'gold-shimmer' : 'text-[#E8E6E3]'}`}>{m.user}</span>
                    {m.founder && <span className="font-label text-[8px] tracking-[0.2em] text-[#050505] gold-gradient px-1.5 py-0.5 rounded-sm">FOUNDER</span>}
                    <span className="font-mono text-[9px] text-[#6B6B7B]">{m.time} ago</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${m.founder ? 'text-[#E8E6E3] italic' : 'text-[#E8E6E3]/80'}`}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-[#1F1F2E]">
            <div className="flex items-center gap-3 px-4 py-3 border border-[#1F1F2E] rounded-sm bg-[#0A0A12]/60 focus-within:border-[#C5A23E]/40 transition-colors">
              <input className="bg-transparent outline-none text-sm font-mono flex-1 placeholder:text-[#6B6B7B]" placeholder="Share your conviction..." />
              <button className="btn-gold font-label text-[10px] tracking-[0.2em] px-4 py-1.5 rounded-sm">SEND</button>
            </div>
            <div className="font-label text-[8px] tracking-[0.2em] text-[#6B6B7B] mt-2 text-center">BE RESPECTFUL. NO FINANCIAL ADVICE. CONVICTION OVER NOISE.</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ======================== SETTINGS ========================
export function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ IDENTITY ◆</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Settings & <span className="gold-shimmer italic font-light">Profile.</span></h1>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-sm p-6 md:p-8">
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ PROFILE ◆</div>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center text-[#050505] font-display font-bold text-3xl shrink-0">
            A
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-4 w-full">
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">FULL NAME</label>
              <input defaultValue="Architect User" className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">EMAIL</label>
              <input defaultValue="architect@sbtradex.com" className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">PHONE</label>
              <input defaultValue="+91 98765 43210" className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">TIMEZONE</label>
              <select className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm">
                <option>Asia/Kolkata (IST)</option>
                <option>Europe/London (GMT)</option>
                <option>America/New_York (EST)</option>
                <option>Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-sm p-6 md:p-8 gold-hairline relative">
        <div className="absolute top-4 right-4 gold-gradient text-[#050505] font-label text-[9px] tracking-[0.25em] px-3 py-1">ARCHITECT</div>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ SUBSCRIPTION ◆</div>
        <h2 className="font-display text-2xl font-bold mb-2">Tier 03 — Architect</h2>
        <p className="text-sm text-[#6B6B7B] mb-4">₹19,999/month • Renews on 15 Mar 2025</p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline-gold font-label text-[10px] tracking-[0.25em] px-5 py-2.5 rounded-sm">MANAGE BILLING</button>
          <button className="border border-[#1F1F2E] text-[#6B6B7B] hover:border-[#FF0A3E]/40 hover:text-[#FF0A3E] font-label text-[10px] tracking-[0.25em] px-5 py-2.5 rounded-sm transition-colors">CANCEL PLAN</button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-sm p-6 md:p-8">
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ NOTIFICATIONS ◆</div>
        <div className="space-y-4">
          {[
            { label: 'New trading signals', desc: 'Real-time alerts for all precision signals', on: true },
            { label: 'Market analysis', desc: 'Daily and weekly market commentary', on: true },
            { label: 'Academy updates', desc: 'New modules and lessons', on: false },
            { label: 'Mentor messages', desc: 'Direct communications from Ikbal', on: true },
            { label: 'Marketing emails', desc: 'Offers, events, and announcements', on: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#1F1F2E] last:border-0">
              <div>
                <div className="font-display text-sm font-semibold text-[#E8E6E3]">{n.label}</div>
                <div className="text-xs text-[#6B6B7B] mt-0.5">{n.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={n.on} className="sr-only peer" />
                <div className="w-10 h-5 bg-[#1F1F2E] peer-checked:bg-[#C5A23E]/40 rounded-full peer-checked:gold-gradient transition-colors relative">
                  <div className="absolute top-0.5 left-0.5 peer-checked:translate-x-5 w-4 h-4 bg-[#E8E6E3] rounded-full transition-transform" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-end">
        <button className="btn-gold font-label text-[11px] tracking-[0.25em] px-8 py-3 rounded-sm">SAVE CHANGES</button>
      </div>
    </div>
  );
}

// ======================== ABOUT (public) ========================
export function AboutPage() {
  const milestones = [
    { year: '2011', title: 'First Trade', desc: 'Ikbal Malik executes first trade on NSE. A 14-year journey begins.' },
    { year: '2015', title: 'Institutional Desk', desc: 'Transition to institutional-grade research and execution frameworks.' },
    { year: '2019', title: 'IKTAJ GROUP Founded', desc: 'The parent entity is established — a research and capital education house.' },
    { year: '2022', title: 'SB TRADEX Alpha', desc: 'Private beta of SB TRADEX launches with 120 invited traders.' },
    { year: '2024', title: 'Inner Circle', desc: 'Architect tier and 1-on-1 mentorship program inaugurated.' },
    { year: '2025', title: 'Global Expansion', desc: '8,500+ active traders across 40+ countries. Four continents of conviction.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6E3]">
      {/* Nav */}
      <nav className="border-b border-[#1F1F2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold">SB <span className="gold-shimmer">TRADEX</span></Link>
          <Link to="/" className="font-label text-[11px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E]">← BACK</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 spotlight pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="font-label text-[11px] tracking-[0.4em] text-[#C5A23E] mb-6">◆ ABOUT IKTAJ GROUP ◆</div>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] mb-8">
            Wealth is <br />
            <span className="italic font-light text-[#E8E6E3]/70">not found.</span> <br />
            <span className="gold-shimmer">It is engineered.</span>
          </h1>
          <div className="divider-gold max-w-sm mx-auto mb-8" />
          <p className="text-lg md:text-xl text-[#6B6B7B] leading-relaxed max-w-3xl mx-auto font-light">
            IKTAJ GROUP is a financial research and capital education house founded by Ikbal Malik. SB TRADEX is its flagship instrument — the convergence of 14 years of market discipline into a single, available system.
          </p>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="border-t border-[#1F1F2E] py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="glass rounded-sm p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#C5A23E]/40" />
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ VISION ◆</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
              To build a generation of <span className="gold-shimmer italic">thinking traders</span> — not tip-followers.
            </h2>
            <p className="text-[#6B6B7B] leading-relaxed">
              Markets reward the patient, the prepared, and the convicted. Our vision is to institutionalize these traits in every member — to replace noise with signal, and gambling with strategy.
            </p>
          </div>
          <div className="glass rounded-sm p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#C5A23E]/40" />
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ MISSION ◆</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
              To deliver <span className="gold-shimmer italic">institutional-grade</span> insight to the individual.
            </h2>
            <p className="text-[#6B6B7B] leading-relaxed">
              What hedge funds pay millions for, SB TRADEX distills into daily signals, structured education, and private mentorship. The tools were always there. The access was not — until now.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#1F1F2E] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-label text-[11px] tracking-[0.3em] text-[#C5A23E] mb-4">◆ MILESTONES ◆</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">The <span className="italic font-light text-[#E8E6E3]/70">Arc.</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#C5A23E]/50 via-[#C5A23E]/20 to-transparent" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}`}
              >
                <div className="absolute left-4 md:left-1/2 top-3 w-3 h-3 -translate-x-1/2 rounded-full gold-gradient gold-glow z-10" />
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="font-mono text-sm text-[#C5A23E] mb-2">{m.year}</div>
                  <h3 className="font-display text-2xl font-bold text-[#E8E6E3] mb-2">{m.title}</h3>
                  <p className="text-sm text-[#6B6B7B] leading-relaxed">{m.desc}</p>
                </div>
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1F1F2E] py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            SB TRADEX is not a service. <br />
            <span className="italic font-light text-[#E8E6E3]/70">It is a system of belief.</span>
          </h2>
          <p className="text-[#6B6B7B] mb-10 max-w-xl mx-auto">
            In engineered wealth. In disciplined risk. In the long arc of compounding conviction.
          </p>
          <Link to="/signup" className="btn-gold inline-block font-label text-[12px] tracking-[0.25em] px-10 py-4 rounded-sm">
            REQUEST ACCESS →
          </Link>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-[#1F1F2E] py-8 text-center">
        <div className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B]">
          © 2025 IKTAJ GROUP • SB TRADEX BY IKTAJ GROUP
        </div>
      </footer>
    </div>
  );
}
