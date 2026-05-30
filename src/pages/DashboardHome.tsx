import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Target, Wallet, Activity, ArrowUpRight, Plus, MessageCircle,
  BookOpen, Shield, Clock, AlertCircle
} from 'lucide-react';
import { signalsData } from '../data/mockData';
import { MarketTicker, Counter } from '../components/Primitives';

export default function DashboardHome() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-sm p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C5A23E] opacity-[0.05] blur-[100px] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ COMMAND CENTER ◆</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              {greet}, <span className="gold-shimmer italic font-light">Architect.</span>
            </h1>
            <p className="text-sm text-[#6B6B7B] mt-3 max-w-xl">
              Markets are open. Your signals are live. Let's build conviction.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="text-center md:text-right">
              <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">MARKET SENTIMENT</div>
              <div className="flex items-center gap-2 justify-end">
                <TrendingUp className="w-4 h-4 text-[#00FF9F]" />
                <span className="font-display text-lg font-bold text-[#00FF9F]">BULLISH</span>
              </div>
            </div>
            <div className="text-center md:text-right border-l border-[#1F1F2E] pl-4">
              <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">SESSION</div>
              <div className="font-mono text-lg font-bold text-[#E8E6E3]">LONDON</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: 'Portfolio Value', value: 184720, prefix: '$', change: '+12.4%', up: true },
          { icon: Target, label: 'Active Signals', value: 7, prefix: '', suffix: '', change: '2 new', up: true },
          { icon: TrendingUp, label: 'Win Rate', value: 78, prefix: '', suffix: '%', change: '+2.1%', up: true },
          { icon: Activity, label: 'Fear & Greed', value: 68, prefix: '', suffix: '/100', change: 'GREED', up: true },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-sm p-5 card-lift group relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#C5A23E] opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity" />
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-4 h-4 text-[#C5A23E]" strokeWidth={1.5} />
              <span className={`font-mono text-[10px] ${s.up ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>{s.change}</span>
            </div>
            <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">{s.label.toUpperCase()}</div>
            <div className="font-display text-2xl md:text-3xl font-bold text-[#E8E6E3]">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} duration={1500} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Ticker */}
      <div className="rounded-sm overflow-hidden border border-[#1F1F2E]">
        <MarketTicker />
      </div>

      {/* Today's signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-sm p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ LIVE FEED ◆</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Today's Precision Signals</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/signals" className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors flex items-center gap-1">
              VIEW ALL <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Forex', 'Stocks', 'Crypto', 'Commodities'].map((f, i) => (
            <button
              key={f}
              className={`font-label text-[10px] tracking-[0.2em] px-4 py-2 border rounded-sm whitespace-nowrap transition-colors ${
                i === 0
                  ? 'border-[#C5A23E] text-[#C5A23E] bg-[#C5A23E]/5'
                  : 'border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/40 hover:text-[#E8E6E3]'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Signal cards */}
        <div className="space-y-3">
          {signalsData.slice(0, 4).map((s, i) => (
            <SignalCard key={s.id} signal={s} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Analysis + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-sm p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ INTEL ◆</div>
              <h2 className="font-display text-xl md:text-2xl font-bold">Market Analysis</h2>
            </div>
            <Link to="/market" className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors flex items-center gap-1">
              ALL ANALYSES <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { tag: 'MACRO', title: 'The Dollar Smile Returns — Why DXY Is King This Week', time: '2h ago', read: '6 min' },
              { tag: 'CRYPTO', title: 'Bitcoin Holds $67K — Breakout or Distribution?', time: '5h ago', read: '4 min' },
              { tag: 'INDIA', title: 'NIFTY 25K Setup: The Structural Bid Underneath', time: 'Yesterday', read: '5 min' },
              { tag: 'FOREX', title: 'GBP/JPY — Reading the 196 Level Correctly', time: '2d ago', read: '7 min' },
            ].map((a, i) => (
              <div key={i} className="border border-[#1F1F2E] hover:border-[#C5A23E]/40 rounded-sm p-4 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label text-[9px] tracking-[0.25em] text-[#C5A23E]">{a.tag}</span>
                  <span className="font-mono text-[9px] text-[#6B6B7B]">{a.read}</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-[#E8E6E3] leading-snug group-hover:text-[#C5A23E] transition-colors mb-3">
                  {a.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#6B6B7B]">{a.time}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B6B7B] group-hover:text-[#C5A23E] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-sm p-6 md:p-8"
        >
          <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ ACTIONS ◆</div>
          <h2 className="font-display text-xl md:text-2xl font-bold mb-6">Quick Access</h2>

          <div className="space-y-3">
            {[
              { icon: Plus, label: 'Track Position', desc: 'Log a new trade', to: '#' },
              { icon: BookOpen, label: 'Open Academy', desc: 'Continue learning', to: '/academy' },
              { icon: MessageCircle, label: 'Contact Mentor', desc: 'Direct line', to: '#' },
              { icon: Shield, label: 'Risk Calculator', desc: 'Position sizing', to: '#' },
            ].map((a, i) => (
              <Link
                key={i}
                to={a.to}
                className="flex items-center gap-4 p-3 border border-[#1F1F2E] hover:border-[#C5A23E]/40 hover:bg-[#111118]/60 rounded-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-sm border border-[#C5A23E]/30 flex items-center justify-center text-[#C5A23E] group-hover:border-[#C5A23E] transition-colors">
                  <a.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-semibold text-[#E8E6E3]">{a.label}</div>
                  <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B]">{a.desc.toUpperCase()}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B6B7B] group-hover:text-[#C5A23E] transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#1F1F2E]">
            <div className="flex items-center gap-2 text-xs text-[#6B6B7B] mb-2">
              <AlertCircle className="w-3 h-3" />
              <span className="font-label text-[9px] tracking-[0.2em]">SYSTEM STATUS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
              <span className="font-mono text-xs text-[#00FF9F]">ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SignalCard({ signal: s, index = 0 }: { signal: typeof signalsData[0]; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group border border-[#1F1F2E] hover:border-[#C5A23E]/40 rounded-sm p-5 transition-all bg-[#0A0A12]/30 hover:bg-[#111118]/50"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Asset + direction */}
        <div className="flex items-center gap-4 lg:w-60">
          <div className={`w-11 h-11 rounded-sm flex items-center justify-center font-display font-bold text-sm shrink-0 ${
            s.direction === 'BUY'
              ? 'bg-[#00FF9F]/10 text-[#00FF9F] border border-[#00FF9F]/30'
              : 'bg-[#FF0A3E]/10 text-[#FF0A3E] border border-[#FF0A3E]/30'
          }`}>
            {s.direction === 'BUY' ? '↑' : '↓'}
          </div>
          <div>
            <div className="font-display text-base font-bold text-[#E8E6E3]">{s.asset}</div>
            <div className="font-mono text-[10px] text-[#6B6B7B]">{s.id} • {s.market}</div>
          </div>
        </div>

        {/* Levels */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1">ENTRY</div>
            <div className="font-mono text-sm text-[#E8E6E3]">{s.entry}</div>
          </div>
          <div>
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1">STOP</div>
            <div className="font-mono text-sm text-[#FF0A3E]">{s.sl}</div>
          </div>
          <div>
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1">TP1</div>
            <div className="font-mono text-sm text-[#00FF9F]">{s.tp1}</div>
          </div>
          <div className="hidden md:block">
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1">TP2</div>
            <div className="font-mono text-sm text-[#00FF9F]">{s.tp2}</div>
          </div>
          <div className="hidden md:block">
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1">TP3</div>
            <div className="font-mono text-sm text-[#00FF9F]">{s.tp3}</div>
          </div>
        </div>

        {/* Status + confidence */}
        <div className="lg:w-56 flex items-center gap-4">
          <div className="flex-1">
            <div className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] mb-1.5">CONFIDENCE</div>
            <div className="h-1.5 bg-[#1F1F2E] rounded-full overflow-hidden">
              <div
                className="h-full gold-gradient"
                style={{ width: `${s.confidence}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-[#C5A23E] mt-1">{s.confidence}%</div>
          </div>
          <div className="text-right">
            <StatusBadge status={s.status} />
            <div className="font-mono text-[9px] text-[#6B6B7B] mt-1.5 flex items-center gap-1 justify-end">
              <Clock className="w-2.5 h-2.5" />{s.time}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Active': 'bg-[#C5A23E]/10 text-[#C5A23E] border-[#C5A23E]/40',
    'Hit TP1': 'bg-[#00FF9F]/10 text-[#00FF9F] border-[#00FF9F]/40',
    'Hit TP2': 'bg-[#00FF9F]/10 text-[#00FF9F] border-[#00FF9F]/40',
    'Hit TP3': 'bg-[#00FF9F]/10 text-[#00FF9F] border-[#00FF9F]/40',
    'Hit SL': 'bg-[#FF0A3E]/10 text-[#FF0A3E] border-[#FF0A3E]/40',
    'Closed': 'bg-[#6B6B7B]/10 text-[#6B6B7B] border-[#6B6B7B]/40',
  };
  return (
    <span className={`inline-block font-label text-[9px] tracking-[0.2em] px-2 py-1 border rounded-sm ${styles[status] || styles['Active']}`}>
      {status.toUpperCase()}
    </span>
  );
}
