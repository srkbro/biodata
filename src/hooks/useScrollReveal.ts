import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal() {
  const hasRun = useRef(false);

  const init = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    document.querySelectorAll(selectors).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // small delay so DOM is ready after render
    const id = requestAnimationFrame(init);
    return () => cancelAnimationFrame(id);
  }, [init]);
}
