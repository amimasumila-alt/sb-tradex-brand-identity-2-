import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first load of session
    if (sessionStorage.getItem('sbx_loaded')) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const duration = 2200;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          sessionStorage.setItem('sbx_loaded', '1');
          setDone(true);
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* Radial glow behind monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C5A23E] opacity-[0.06] blur-[120px]" />

          {/* Pulsing monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" className="w-28 h-28">
                <defs>
                  <linearGradient id="loadGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8a7229" />
                    <stop offset="45%" stopColor="#C5A23E" />
                    <stop offset="55%" stopColor="#F4E08A" />
                    <stop offset="100%" stopColor="#8a7229" />
                  </linearGradient>
                </defs>
                <path d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z" fill="url(#loadGold)" />
                <rect x="47" y="30" width="6" height="40" fill="url(#loadGold)" />
                <rect x="42" y="30" width="16" height="3" fill="url(#loadGold)" />
                <rect x="42" y="67" width="16" height="3" fill="url(#loadGold)" />
              </svg>
            </motion.div>

            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 border border-[#C5A23E]/20 rounded-full"
              style={{ borderTopColor: 'rgba(197,162,62,0.6)' }}
            />
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="font-label text-[10px] tracking-[0.4em] text-[#6B6B7B] mb-2">IKTAJ GROUP</div>
            <div className="font-display text-2xl font-bold">
              SB <span className="gold-shimmer">TRADEX</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-20 w-48"
          >
            <div className="h-px bg-[#1F1F2E] overflow-hidden">
              <div className="h-full gold-gradient transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between mt-3">
              <span className="font-mono text-[9px] text-[#6B6B7B]">INITIALIZING VAULT</span>
              <span className="font-mono text-[9px] text-[#C5A23E]">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
