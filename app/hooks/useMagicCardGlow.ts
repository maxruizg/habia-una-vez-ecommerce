import { useEffect } from "react";

export function useMagicCardGlow() {
  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      const card = (e.target as HTMLElement).closest?.(".magic-card") as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    }

    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;

      const card = (touch.target as HTMLElement).closest?.(".magic-card") as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    }

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
}
