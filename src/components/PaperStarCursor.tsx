import { useEffect, useRef, useState } from 'react';

export default function PaperStarCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [starDust, setStarDust] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const dustIdRef = useRef(0);

  useEffect(() => {
    // Only activate on devices with a physical mouse/trackpad pointer
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Hide native cursor across the entire page
    const styleEl = document.createElement('style');
    styleEl.id = 'paper-star-cursor-style';
    styleEl.innerHTML = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Instant 1:1 hardware tracking (Zero lag, zero latency)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detect interactive clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, .work-card, .tab-btn'
        );
        setIsHovering(!!interactive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Cute golden star dust burst on click
      const newDust = Array.from({ length: 4 }).map(() => ({
        id: dustIdRef.current++,
        x: e.clientX + (Math.random() * 16 - 8),
        y: e.clientY + (Math.random() * 16 - 8),
        size: Math.random() * 3 + 3,
      }));
      setStarDust((prev) => [...prev.slice(-8), ...newDust]);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      styleEl.remove();
    };
  }, [isVisible]);

  // Clean up star dust particles
  useEffect(() => {
    if (starDust.length === 0) return;
    const timer = setTimeout(() => {
      setStarDust((prev) => prev.slice(2));
    }, 600);
    return () => clearTimeout(timer);
  }, [starDust]);

  if (!isVisible) return null;

  return (
    <>
      {/* Butter Yellow Star Dust Particles */}
      {starDust.map((d) => (
        <span
          key={d.id}
          className="fixed pointer-events-none z-[99999] rounded-full bg-amber-300 animate-ping shadow-[0_0_8px_rgba(250,204,21,0.8)]"
          style={{
            left: d.x,
            top: d.y,
            width: `${d.size}px`,
            height: `${d.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* The Butter Yellow Paper Star IS the Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform select-none"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className="relative transition-transform duration-100 ease-out origin-[16px_2px]"
          style={{
            // Top tip of star (16, 2) is aligned at (0, 0)
            transform: `translate(-16px, -2px) rotate(${isHovering ? '16deg' : '0deg'}) scale(${
              isClicking ? 0.88 : isHovering ? 1.2 : 1
            })`,
          }}
        >
          {/* Luminous Origami Paper Star Graphic */}
          <div className="relative filter drop-shadow-[0_2px_7px_rgba(217,119,6,0.45)]">
            <svg
              viewBox="0 0 32 32"
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Paper Silhouette with soft warm outline */}
              <polygon
                points="16,2 19.5,11.1 29.3,11.7 21.7,17.9 24.2,27.3 16,22 7.8,27.3 10.3,17.9 2.7,11.7 12.5,11.1"
                fill="#fde047"
                stroke="#ca8a04"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* 10 Faceted 3D Origami Crease Planes (Alternating Butter Yellow & Cream Tones) */}
              {/* Top Point 0 */}
              <polygon points="16,16 12.5,11.1 16,2" fill="#fffbeb" />
              <polygon points="16,16 16,2 19.5,11.1" fill="#fde047" />

              {/* Top-Right Point 1 */}
              <polygon points="16,16 19.5,11.1 29.3,11.7" fill="#fef08a" />
              <polygon points="16,16 29.3,11.7 21.7,17.9" fill="#facc15" />

              {/* Bottom-Right Point 2 */}
              <polygon points="16,16 21.7,17.9 24.2,27.3" fill="#fde68a" />
              <polygon points="16,16 24.2,27.3 16,22" fill="#eab308" />

              {/* Bottom-Left Point 3 */}
              <polygon points="16,16 16,22 7.8,27.3" fill="#facc15" />
              <polygon points="16,16 7.8,27.3 10.3,17.9" fill="#fef08a" />

              {/* Top-Left Point 4 */}
              <polygon points="16,16 10.3,17.9 2.7,11.7" fill="#fde047" />
              <polygon points="16,16 2.7,11.7 12.5,11.1" fill="#fffbeb" />

              {/* Fold Crease Lines Radiating from Center */}
              <line x1="16" y1="16" x2="16" y2="2" stroke="#b45309" strokeWidth="0.6" strokeOpacity="0.45" />
              <line x1="16" y1="16" x2="29.3" y2="11.7" stroke="#b45309" strokeWidth="0.6" strokeOpacity="0.45" />
              <line x1="16" y1="16" x2="24.2" y2="27.3" stroke="#b45309" strokeWidth="0.6" strokeOpacity="0.45" />
              <line x1="16" y1="16" x2="7.8" y2="27.3" stroke="#b45309" strokeWidth="0.6" strokeOpacity="0.45" />
              <line x1="16" y1="16" x2="2.7" y2="11.7" stroke="#b45309" strokeWidth="0.6" strokeOpacity="0.45" />

              {/* Valley Crease Lines */}
              <line x1="16" y1="16" x2="12.5" y2="11.1" stroke="#fef9c3" strokeWidth="0.5" strokeOpacity="0.8" />
              <line x1="16" y1="16" x2="19.5" y2="11.1" stroke="#fef9c3" strokeWidth="0.5" strokeOpacity="0.8" />
              <line x1="16" y1="16" x2="21.7" y2="17.9" stroke="#fef9c3" strokeWidth="0.5" strokeOpacity="0.8" />
              <line x1="16" y1="16" x2="16" y2="22" stroke="#fef9c3" strokeWidth="0.5" strokeOpacity="0.8" />
              <line x1="16" y1="16" x2="10.3" y2="17.9" stroke="#fef9c3" strokeWidth="0.5" strokeOpacity="0.8" />
            </svg>

            {/* Cute Sparkle when Hovering */}
            {isHovering && (
              <span className="absolute -top-1 -right-1 text-[10px] pointer-events-none animate-bounce">
                ✨
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
