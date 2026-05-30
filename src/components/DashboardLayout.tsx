import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Activity, Target, GraduationCap, Users,
  Settings as SettingsIcon, LogOut, Menu, Bell, Search
} from 'lucide-react';
import { SBTradexLogo } from './Primitives';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/market', icon: Activity, label: 'Market Pulse' },
  { to: '/signals', icon: Target, label: 'Signals' },
  { to: '/academy', icon: GraduationCap, label: 'Academy' },
  { to: '/circle', icon: Users, label: 'Inner Circle' },
  { to: '/settings', icon: SettingsIcon, label: 'Settings' },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6E3] flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col border-r border-[#1F1F2E] bg-[#050505] sticky top-0 h-screen transition-all duration-500 ${collapsed ? 'w-[72px]' : 'w-[240px]'}`}>
        <SidebarContent collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </aside>

      {/* Sidebar - Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#050505] border-r border-[#1F1F2E] z-50 lg:hidden"
            >
              <SidebarContent collapsed={false} onToggle={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1F1F2E] flex items-center justify-between">
        {collapsed ? (
          <Link to="/" className="w-9 h-9 rounded-sm bg-[#050505] border border-[#C5A23E]/40 flex items-center justify-center mx-auto">
            <span className="font-display text-xs font-bold gold-shimmer">IG</span>
          </Link>
        ) : (
          <Link to="/"><SBTradexLogo /></Link>
        )}
        {!collapsed && (
          <button onClick={onToggle} className="text-[#6B6B7B] hover:text-[#C5A23E] transition-colors hidden lg:block">
            <Menu className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button onClick={onToggle} className="text-[#6B6B7B] hover:text-[#C5A23E] transition-colors hidden lg:block">
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3">
        <div className={`font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-3 ${collapsed ? 'text-center' : 'px-3'}`}>
          {collapsed ? '◆' : '◆ NAVIGATION'}
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all relative ${
                    isActive
                      ? 'bg-[#111118] text-[#C5A23E] border-l-2 border-[#C5A23E]'
                      : 'text-[#6B6B7B] hover:text-[#E8E6E3] hover:bg-[#0A0A12] border-l-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                {!collapsed && <span className="font-label text-[11px] tracking-[0.15em]">{item.label.toUpperCase()}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User card */}
      <div className={`p-3 border-t border-[#1F1F2E] ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <button className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-[#050505] font-display font-bold text-sm">
            A
          </button>
        ) : (
          <div className="glass-smoke p-3 rounded-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-[#050505] font-display font-bold text-sm">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xs font-semibold truncate">Architect</div>
                <div className="font-mono text-[9px] text-[#C5A23E]">TIER 03</div>
              </div>
            </div>
            <Link to="/login" className="flex items-center gap-2 text-[10px] font-label tracking-[0.2em] text-[#6B6B7B] hover:text-[#FF0A3E] transition-colors">
              <LogOut className="w-3 h-3" /> SIGN OUT
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1F1F2E] bg-[#050505]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onMenu} className="lg:hidden text-[#6B6B7B] hover:text-[#C5A23E]">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#1F1F2E] rounded-sm bg-[#0A0A12]/60 w-64">
            <Search className="w-3.5 h-3.5 text-[#6B6B7B]" />
            <input className="bg-transparent outline-none text-xs font-mono flex-1 placeholder:text-[#6B6B7B]" placeholder="Search markets, signals..." />
            <kbd className="font-mono text-[9px] text-[#3A3A4A] border border-[#1F1F2E] px-1.5 py-0.5 rounded-sm">⌘K</kbd>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
            <span className="font-mono text-[#6B6B7B]">LONDON • OPEN</span>
          </div>
          <button className="relative text-[#6B6B7B] hover:text-[#C5A23E] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#C5A23E]" />
          </button>
          <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-[#050505] font-display font-bold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
