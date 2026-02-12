const colors = [
  "text-gold-400/60",
  "text-gold-300/50",
  "text-white/40",
  "text-enchant-200/50",
  "text-gold-400/60",
  "text-white/30",
  "text-enchant-200/40",
  "text-gold-300/60",
  "text-white/35",
  "text-gold-400/50",
  "text-enchant-200/45",
  "text-gold-300/55",
  "text-white/40",
  "text-gold-400/45",
  "text-enchant-200/50",
  "text-gold-300/60",
  "text-white/30",
  "text-gold-400/55",
];

const stars = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 8 + Math.random() * 16,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 2,
  color: colors[i % colors.length],
  parallaxSpeed: 0.5 + Math.random() * 1.5,
}));

export function SparkleParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <svg
          key={star.id}
          className="absolute animate-sparkle"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
            className={star.color}
          />
        </svg>
      ))}
    </div>
  );
}
