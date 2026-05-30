import { useEffect, useRef } from 'react';

export function IktaLogo({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
        <defs>
          <linearGradient id="iktaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a7229" />
            <stop offset="45%" stopColor="#C5A23E" />
            <stop offset="55%" stopColor="#F4E08A" />
            <stop offset="100%" stopColor="#8a7229" />
          </linearGradient>
        </defs>
        {/* G — outer architectural arch */}
        <path
          d="M 78 30 L 78 22 L 60 22 L 60 26 L 66 26 L 66 30 Z"
          fill="url(#iktaGold)"
        />
        <path
          d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z"
          fill="url(#iktaGold)"
        />
        {/* I — central pillar */}
        <rect x="47" y="30" width="6" height="40" fill="url(#iktaGold)" />
        <rect x="42" y="30" width="16" height="3" fill="url(#iktaGold)" />
        <rect x="42" y="67" width="16" height="3" fill="url(#iktaGold)" />
      </svg>
    </div>
  );
}

export function IktaLogoWithText({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <IktaLogo size={size} />
      <div className="font-label text-[10px] tracking-[0.35em] text-[#C5A23E]/80">
        IKTAJ GROUP
      </div>
    </div>
  );
}

export function SBTradexLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-baseline gap-0.5">
        <span className="font-display text-2xl font-bold tracking-tight text-[#E8E6E3]">SB</span>
        <span className="font-display text-2xl font-bold tracking-tight gold-shimmer">TRADEX</span>
      </div>
      <div className="font-label text-[8px] tracking-[0.3em] text-[#6B6B7B] mt-0.5">
        BY IKTAJ GROUP
      </div>
    </div>
  );
}

// Particle field — canvas-based, lightweight
export function ParticleField({ density = 45, color = '#C5A23E' }: { density?: number; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(1, 1);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; o: number; life: number }> = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.3 - 0.05,
        r: Math.random() * 1.4 + 0.3,
        o: Math.random() * 0.6 + 0.2,
        life: Math.random() * 100,
      });
    }

    let mouseX = w / 2;
    let mouseY = h / 2;
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseY = (e.clientY - rect.top) * window.devicePixelRatio;
    };
    window.addEventListener('mousemove', handleMouse);

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        // Subtle parallax toward mouse
        const dx = (mouseX - p.x) * 0.0003;
        const dy = (mouseY - p.y) * 0.0003;
        p.x += p.vx + dx;
        p.y += p.vy + dy;
        p.life += 0.5;

        const flicker = 0.6 + Math.sin(p.life * 0.05) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.o * flicker;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6 * window.devicePixelRatio;
        ctx.fill();

        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.life = Math.random() * 100;
        }
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Custom cursor (desktop only)
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => ringRef.current?.classList.add('hover');
    const removeHover = () => ringRef.current?.classList.remove('hover');

    document.addEventListener('mousemove', move);
    const interactives = document.querySelectorAll('a, button, [role="button"], input, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}

// Animated counter
export function Counter({ to, duration = 2000, prefix = '', suffix = '' }: { to: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.floor(eased * to);
            el.textContent = prefix + val.toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// Market ticker (infinite scroll)
import { tickerData } from '../data/mockData';

export function MarketTicker() {
  const items = [...tickerData, ...tickerData];
  return (
    <div className="relative overflow-hidden border-y border-[#1F1F2E] bg-[#050505] py-3">
      <div className="flex marquee whitespace-nowrap">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-6 shrink-0">
            <span className="font-mono text-xs font-medium text-[#E8E6E3]">{t.symbol}</span>
            <span className="font-mono text-xs text-[#6B6B7B]">{t.price}</span>
            <span className={`font-mono text-xs font-semibold ${t.up ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
              {t.change}
            </span>
            <span className="text-[#1F1F2E]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
