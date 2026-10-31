import { useState, useEffect, useRef } from 'react';

export default function PencilScroller() {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackHeight, setTrackHeight] = useState(160);

  // Section stops (normalized 0 to 1)
  const stops = [0.15, 0.45, 0.72, 0.95];

  useEffect(() => {
    const updateTrackHeight = () => {
      if (trackRef.current) {
        setTrackHeight(trackRef.current.clientHeight);
      }
    };

    updateTrackHeight();
    window.addEventListener('resize', updateTrackHeight);

    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        const p = Math.max(0, Math.min(1, scrollY / maxScroll));
        setProgress(p);
        setIsArrived(p >= 0.99);

        // Check if pencil is currently over the dark work section
        const workElem = document.getElementById('work');
        if (workElem) {
          const rect = workElem.getBoundingClientRect();
          const pencilViewportY = window.innerHeight / 2;
          const insideDark = pencilViewportY >= rect.top && pencilViewportY <= rect.bottom;
          setIsDark(insideDark);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTrackHeight);
    };
  }, []);

  return (
    <aside
      className="pencil-progress"
      data-dark={isDark ? 'true' : 'false'}
      data-arrived={isArrived ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className="pencil-progress-art">
        {/* The Track Line */}
        <div ref={trackRef} className="pencil-progress-track">
          {/* Guide (Grey background line) */}
          <span className="pencil-progress-guide" />

          {/* Stroke (Drawn line behind pencil) */}
          <span
            className="pencil-progress-stroke"
            style={{ transform: `scaleY(${progress})` }}
          />

          {/* Section Stop Marks */}
          {stops.map((stop, i) => (
            <span
              key={i}
              className="pencil-progress-stop"
              style={{ top: `${stop * 100}%` }}
              data-passed={progress >= stop ? 'true' : 'false'}
            />
          ))}

          {/* Animated Pencil Head */}
          <div
            className="pencil-progress-pencil"
            style={{
              transform: `translate3d(0, ${progress * trackHeight}px, 0)`,
            }}
          >
            <svg
              viewBox="0 0 28 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinejoin="round"
            >
              <path className="pencil-progress-body" d="m22 3 5 1.5-7.8 25.1-5-1.5Z" />
              <path className="pencil-progress-cap" d="m22 3 5 1.5-.9 2.8-5-1.5Z" />
              <path className="pencil-progress-seam" d="m23.9 7.6-6.1 19.6" />
              <path className="pencil-progress-tip" d="m14.2 28.1 5 1.5L14 37Z" />
              <path className="pencil-progress-graphite" d="m14.1 33.4 2.1.6L14 37Z" />
            </svg>
          </div>
        </div>

        {/* Finish checkmark when reached bottom */}
        <svg
          className="pencil-progress-finish"
          viewBox="0 0 28 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path pathLength="1" d="m10 5 3 3 5-6" />
        </svg>

        {/* Percentage Number */}
        <span className="pencil-progress-number">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </aside>
  );
}

