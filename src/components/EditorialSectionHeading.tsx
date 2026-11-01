import { useEffect, useRef, useState } from 'react';

interface EditorialSectionHeadingProps {
  tag?: string;
  line1: string;
  line2: string;
  subtitle?: string;
  align?: 'left' | 'center';
  hasSquiggle?: boolean;
  className?: string;
}

export default function EditorialSectionHeading({
  tag,
  line1,
  line2,
  subtitle,
  align = 'center',
  hasSquiggle = true,
  className = '',
}: EditorialSectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0); // 0: hidden, 1: line1, 2: line2, 3: squiggle, 4: subtitle

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger sequential staggered reveal
          setStage(1);
          const t1 = setTimeout(() => setStage(2), 160);
          const t2 = setTimeout(() => setStage(3), 320);
          const t3 = setTimeout(() => setStage(4), 480);

          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
          };
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const isCenter = align === 'center';

  return (
    <div
      ref={containerRef}
      className={`select-none ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      {/* 0. Optional Kicker / Tag */}
      {tag && (
        <div
          className={`flex items-center gap-2 mb-3 text-xs font-mono tracking-widest uppercase text-[var(--color-ink-dim)] font-semibold transition-all duration-500 ${
            isCenter ? 'justify-center' : 'justify-start'
          } ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span>{tag}</span>
        </div>
      )}

      {/* 1. Line 1: Bold Display Font */}
      <div className="overflow-hidden">
        <h2
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tight text-[var(--color-ink)] leading-none m-0 transition-all duration-700 ease-out ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {line1}
        </h2>
      </div>

      {/* 2. Line 2: Editorial Italic Serif + Animated Squiggle Underline */}
      <div className="overflow-hidden mt-1 sm:mt-2.5">
        <div
          className={`relative inline-block transition-all duration-700 ease-out delay-100 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial italic font-normal text-[var(--color-ink)] leading-none m-0 block">
            {line2}
          </span>

          {/* Animated Red Squiggle Underline */}
          {hasSquiggle && (
            <svg
              viewBox="0 0 320 24"
              className={`w-full h-3.5 sm:h-5 text-[var(--color-accent)] fill-none stroke-current stroke-[3] mt-1 transition-opacity duration-500 ${
                stage >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <path
                d="M4 14C50 6 120 22 170 12C220 2 280 18 316 10"
                strokeLinecap="round"
                className={stage >= 3 ? 'animate-squiggle' : ''}
              />
            </svg>
          )}
        </div>
      </div>

      {/* 3. Subtitle / Footnote */}
      {subtitle && (
        <p
          className={`text-xs sm:text-sm font-mono text-[var(--color-ink-dim)] pt-4 transition-all duration-500 ease-out ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

