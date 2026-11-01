import { useEffect, useRef, useState } from 'react';

export default function DietCokeCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    // Only activate on devices with a physical mouse/trackpad pointer
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Hide native cursor across the entire page
    const styleEl = document.createElement('style');
    styleEl.id = 'diet-coke-cursor-style';
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

      // Instant 1:1 hardware tracking (Zero lag, zero delay)
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

      // Cute fizz bubbles on click
      const newBubble = {
        id: bubbleIdRef.current++,
        x: e.clientX + (Math.random() * 8 - 4),
        y: e.clientY - 6,
      };
      setBubbles((prev) => [...prev.slice(-5), newBubble]);
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

  // Clean up bubbles
  useEffect(() => {
    if (bubbles.length === 0) return;
    const timer = setTimeout(() => {
      setBubbles((prev) => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [bubbles]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fizz Bubbles on Click */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="fixed pointer-events-none z-[99999] rounded-full bg-red-400 animate-ping"
          style={{
            left: b.x,
            top: b.y,
            width: '5px',
            height: '5px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* The Diet Coke Can IS the Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform select-none"
        style={{
          // Top-left pull tab is aligned directly at (0, 0) for precise clicking
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className="relative transition-transform duration-75 ease-out origin-top-left"
          style={{
            transform: `translate(-4px, -2px) rotate(${isHovering ? '-18deg' : '-8deg'}) scale(${
              isClicking ? 0.88 : isHovering ? 1.12 : 1
            })`,
          }}
        >
          {/* Miniature Diet Coke Can Graphic (Clean, Cute, Identifiable) */}
          <div className="relative filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
            <svg
              viewBox="0 0 32 48"
              className="w-5 h-8 sm:w-6 sm:h-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Silver Can Metallic Gradient */}
                <linearGradient id="coke-silver" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9ca3af" />
                  <stop offset="20%" stopColor="#f3f4f6" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="75%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#6b7280" />
                </linearGradient>

                {/* Diet Coke Crimson Red Banner */}
                <linearGradient id="coke-red" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="55%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>

                {/* Lid Gradient */}
                <linearGradient id="coke-lid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
              </defs>

              {/* Can Cylinder Body */}
              <rect
                x="3"
                y="5"
                width="26"
                height="38"
                rx="3.5"
                fill="url(#coke-silver)"
                stroke="#374151"
                strokeWidth="0.8"
              />

              {/* Top Lid Rim */}
              <ellipse
                cx="16"
                cy="5"
                rx="12"
                ry="3"
                fill="url(#coke-lid)"
                stroke="#374151"
                strokeWidth="0.8"
              />

              {/* Silver Pull-Tab (Hotspot Pointer Tip) */}
              <rect
                x="13.5"
                y="1.8"
                width="5"
                height="4"
                rx="1.2"
                fill="#f9fafb"
                stroke="#4b5563"
                strokeWidth="0.6"
              />
              <circle cx="16" cy="3.8" r="0.9" fill="#374151" />

              {/* The Iconic Red Ribbon Band */}
              <path
                d="M3 15 C10 13.5, 22 13.5, 29 15 L29 33 C22 34.5, 10 34.5, 3 33 Z"
                fill="url(#coke-red)"
              />

              {/* "diet" Text (Crisp White Bold/Script) */}
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="5.2"
                fontWeight="bold"
                fontFamily="sans-serif"
                letterSpacing="0.2"
              >
                diet
              </text>

              {/* "Coke" Text (Bold Charcoal Display) */}
              <text
                x="16"
                y="30"
                textAnchor="middle"
                fill="#111827"
                fontSize="6.8"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="0.3"
              >
                Coke
              </text>

              {/* Vertical Specular White Light Reflection */}
              <rect
                x="6.5"
                y="6"
                width="1.8"
                height="36"
                rx="0.9"
                fill="#ffffff"
                opacity="0.65"
              />

              {/* Bottom Rim */}
              <ellipse
                cx="16"
                cy="42"
                rx="11.5"
                ry="2"
                fill="#374151"
                opacity="0.25"
              />
            </svg>

            {/* Sparkle on Hover */}
            {isHovering && (
              <span className="absolute -top-1.5 -right-1 text-[9px] pointer-events-none animate-pulse">
                ✨
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
