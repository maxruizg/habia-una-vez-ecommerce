import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "~/hooks/useReducedMotion";

// --- Theme colors (RGB) matching site palette ---
const THEME_COLORS = [
  [20, 184, 166],   // enchant-500
  [236, 72, 153],   // fairy-500
  [168, 85, 247],   // magic-500
  [245, 158, 11],   // gold-500
] as const;

// --- Sparkle trail config ---
const SPARKLE_MAX = 50;
const SPARKLE_PER_MOVE = 3;
const SPARKLE_LIFETIME = 800; // ms

// --- Ambient particle config ---
const AMBIENT_COUNT = 50;
const AMBIENT_REPEL_RADIUS = 120;
const AMBIENT_REPEL_FORCE = 0.6;
const AMBIENT_DAMPING = 0.96;

// --- Types ---
interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: readonly [number, number, number];
  born: number;
  alive: boolean;
}

interface AmbientParticle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: readonly [number, number, number];
}

function isTouchOnlyDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(pointer: fine)").matches;
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickColor(): readonly [number, number, number] {
  return THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
}

/** Draw a 4-pointed star at (0,0) */
function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const outer = size;
  const inner = size * 0.4;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 - Math.PI / 2;
    const midAngle = angle + Math.PI / 4;
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.lineTo(Math.cos(midAngle) * inner, Math.sin(midAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
}

export function MagicCanvas() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const touchOnlyRef = useRef(false);

  // Particle pools stored in refs to avoid re-renders
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const ambientRef = useRef<AmbientParticle[]>([]);

  const spawnSparkles = useCallback((x: number, y: number) => {
    const pool = sparklesRef.current;
    const now = performance.now();

    for (let i = 0; i < SPARKLE_PER_MOVE; i++) {
      // Find a dead particle or recycle the oldest
      let particle = pool.find((p) => !p.alive);
      if (!particle) {
        if (pool.length < SPARKLE_MAX) {
          particle = {} as SparkleParticle;
          pool.push(particle);
        } else {
          // Recycle oldest alive
          let oldest = pool[0];
          for (let j = 1; j < pool.length; j++) {
            if (pool[j].born < oldest.born) oldest = pool[j];
          }
          particle = oldest;
        }
      }

      particle.x = x + randomRange(-4, 4);
      particle.y = y + randomRange(-4, 4);
      particle.vx = randomRange(-1.5, 1.5);
      particle.vy = randomRange(-2.5, -0.5); // upward bias
      particle.rotation = randomRange(0, Math.PI * 2);
      particle.rotationSpeed = randomRange(-0.05, 0.05);
      particle.size = randomRange(4, 9);
      particle.color = pickColor();
      particle.born = now;
      particle.alive = true;
    }
  }, []);

  const initAmbient = useCallback((width: number, height: number) => {
    const particles: AmbientParticle[] = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const speed = randomRange(0.15, 0.5);
      const angle = randomRange(0, Math.PI * 2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push({
        x: randomRange(0, width),
        y: randomRange(0, height),
        baseVx: vx,
        baseVy: vy,
        vx,
        vy,
        radius: randomRange(2, 5),
        opacity: randomRange(0.08, 0.23),
        color: pickColor(),
      });
    }
    ambientRef.current = particles;
  }, []);

  useEffect(() => {
    // Check touch-only once on mount
    touchOnlyRef.current = isTouchOnlyDevice();
  }, []);

  useEffect(() => {
    if (reducedMotion || touchOnlyRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Sizing ---
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-init ambient if empty or size changed drastically
      if (ambientRef.current.length === 0) {
        initAmbient(w, h);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    // --- Mouse tracking ---
    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      spawnSparkles(e.clientX, e.clientY);
    }
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Animation loop ---
    lastTimeRef.current = performance.now();

    function loop(time: number) {
      const dt = Math.min(time - lastTimeRef.current, 32); // cap at ~30fps min
      lastTimeRef.current = time;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx!.clearRect(0, 0, w, h);

      // -- Update & draw ambient particles --
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of ambientRef.current) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const repelRadiusSq = AMBIENT_REPEL_RADIUS * AMBIENT_REPEL_RADIUS;

        if (distSq < repelRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / AMBIENT_REPEL_RADIUS) * AMBIENT_REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen toward base velocity
        p.vx = p.vx * AMBIENT_DAMPING + p.baseVx * (1 - AMBIENT_DAMPING);
        p.vy = p.vy * AMBIENT_DAMPING + p.baseVy * (1 - AMBIENT_DAMPING);

        // Move
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = `rgb(${p.color[0]}, ${p.color[1]}, ${p.color[2]})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      // -- Update & draw sparkle particles --
      const now = performance.now();
      for (const s of sparklesRef.current) {
        if (!s.alive) continue;

        const age = now - s.born;
        if (age > SPARKLE_LIFETIME) {
          s.alive = false;
          continue;
        }

        const progress = age / SPARKLE_LIFETIME; // 0 → 1

        // Gravity
        s.vy += 0.03 * (dt / 16);
        s.x += s.vx * (dt / 16);
        s.y += s.vy * (dt / 16);
        s.rotation += s.rotationSpeed * (dt / 16);

        // Shrink to 30%, fade to 0
        const scale = 1 - progress * 0.7;
        const alpha = 1 - progress;
        const size = s.size * scale;

        ctx!.save();
        ctx!.translate(s.x, s.y);
        ctx!.rotate(s.rotation);
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = `rgb(${s.color[0]}, ${s.color[1]}, ${s.color[2]})`;
        drawStar(ctx!, size);
        ctx!.restore();
      }

      ctx!.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [reducedMotion, spawnSparkles, initAmbient]);

  // Don't render on touch-only or reduced motion (SSR: render nothing, hydrate check in effect)
  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
