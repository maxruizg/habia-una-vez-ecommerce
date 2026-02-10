import { useState, useRef, useEffect } from "react";
import { cn } from "~/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
}

export function LazyImage({ src, alt, className, wrapperClassName, eager }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager || false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager) return;
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={imgRef} className={cn("lazy-image-wrapper", wrapperClassName)}>
      {!isLoaded && <div className="lazy-image-placeholder absolute inset-0" />}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn("lazy-image", isLoaded && "is-loaded", className)}
          onLoad={() => setIsLoaded(true)}
          loading={eager ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}
