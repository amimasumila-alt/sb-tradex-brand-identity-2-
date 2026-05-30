import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { IktaLogoWithText, ParticleField } from '../components/Primitives';

export function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav('/dashboard'), 900);
  };

  return (
    <AuthShell>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="glass rounded-sm p-8 md:p-12 relative overflow-hidden"
      >
        {/* Gold corners */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#C5A23E]/50" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#C5A23E]/50" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#C5A23E]/50" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#C5A23E]/50" />

        <div className="text-center mb-10">
          <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ THE VAULT ◆</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#E8E6E3] mb-2">
            Welcome Back, <span className="gold-shimmer italic font-light">Architect.</span>
          </h1>
          <p className="text-sm text-[#6B6B7B]">Enter your credentials to access the system.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">EMAIL</label>
            <input
              type="email"
              required
              defaultValue="architect@sbtradex.com"
              className="input-dark w-full px-4 py-3.5 font-mono text-sm rounded-sm"
              placeholder="you@domain.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B]">PASSWORD</label>
              <a href="#" className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors">FORGOT KEY?</a>
            </div>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                required
                defaultValue="••••••••••"
                className="input-dark w-full px-4 py-3.5 font-mono text-sm rounded-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B7B] hover:text-[#C5A23E] transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full font-label text-[12px] tracking-[0.25em] py-4 rounded-sm mt-8 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#050505] animate-pulse" />
                AUTHENTICATING
              </span>
            ) : (
              <>Enter The Vault <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-[#1F1F2E]" />
            <span className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B]">OR</span>
            <div className="flex-1 h-px bg-[#1F1F2E]" />
          </div>

          <button type="button" className="w-full border border-[#1F1F2E] hover:border-[#C5A23E]/40 text-[#E8E6E3] font-label text-[11px] tracking-[0.2em] py-3.5 rounded-sm transition-colors flex items-center justify-center gap-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-[#6B6B7B]">
          New to SB TRADEX?{' '}
          <Link to="/signup" className="text-[#C5A23E] hover:underline">Request Access</Link>
        </div>
      </motion.form>
    </AuthShell>
  );
}

export function Signup() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav('/dashboard'), 1200);
  };

  return (
    <AuthShell>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="glass rounded-sm p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#C5A23E]/50" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#C5A23E]/50" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#C5A23E]/50" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#C5A23E]/50" />

        <div className="text-center mb-10">
          <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ APPLICATION ◆</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#E8E6E3] mb-2">
            Begin Your <span className="gold-shimmer italic font-light">Ascent.</span>
          </h1>
          <p className="text-sm text-[#6B6B7B]">Applications are reviewed within 24 hours.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">FULL NAME</label>
              <input type="text" required className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" placeholder="John Architect" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">PHONE</label>
              <input type="tel" className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" placeholder="+91 ..." />
            </div>
          </div>
          <div>
            <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">EMAIL</label>
            <input type="email" required className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" placeholder="you@domain.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">PASSWORD</label>
              <input type="password" required className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" placeholder="••••••••" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">CONFIRM</label>
              <input type="password" required className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm" placeholder="••••••••" />
            </div>
          </div>
          <div>
            <label className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-2 block">HOW DID YOU HEAR ABOUT US?</label>
            <select className="input-dark w-full px-4 py-3 font-mono text-sm rounded-sm">
              <option>Instagram</option>
              <option>Telegram</option>
              <option>YouTube</option>
              <option>A Friend</option>
              <option>Other</option>
            </select>
          </div>
          <label className="flex items-start gap-3 text-xs text-[#6B6B7B] pt-2 cursor-pointer">
            <input type="checkbox" required className="mt-0.5 accent-[#C5A23E]" />
            <span>I accept the Terms & Conditions and acknowledge that markets involve risk.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full font-label text-[12px] tracking-[0.25em] py-4 rounded-sm mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? 'SUBMITTING APPLICATION...' : <>REQUEST ACCESS <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="font-label text-[9px] tracking-[0.2em] text-[#6B6B7B] italic">
            SB TRADEX IS SELECTIVE BY DESIGN.
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-[#6B6B7B]">
          Already in the circle?{' '}
          <Link to="/login" className="text-[#C5A23E] hover:underline">Sign In</Link>
        </div>
      </motion.form>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-6 py-12 overflow-hidden cursor-custom">
      <ParticleField density={30} />

      {/* Huge faded monogram in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] opacity-[0.03]">
          <defs>
            <linearGradient id="bgGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5A23E" />
              <stop offset="100%" stopColor="#C5A23E" />
            </linearGradient>
          </defs>
          <path d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z" fill="url(#bgGold)" />
          <rect x="47" y="30" width="6" height="40" fill="url(#bgGold)" />
          <rect x="42" y="30" width="16" height="3" fill="url(#bgGold)" />
          <rect x="42" y="67" width="16" height="3" fill="url(#bgGold)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A23E] opacity-[0.04] blur-[100px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex justify-center mb-10">
          <IktaLogoWithText size={56} />
        </Link>
        {children}
        <div className="mt-8 text-center">
          <Link to="/" className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors">
            ← RETURN TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}
