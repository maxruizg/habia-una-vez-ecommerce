interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delayMs?: number;
}

export function AnimatedText({
  text,
  className = "",
  as: Tag = "h1",
  delayMs = 80,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block animate-text-reveal"
          style={{ animationDelay: `${i * delayMs}ms` }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
