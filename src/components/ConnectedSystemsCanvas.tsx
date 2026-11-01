import { useEffect, useRef } from 'react';

export default function ConnectedSystemsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 750;
    };
    window.addEventListener('resize', handleResize);

    // Denser, luminous constellation nodes
    const particleCount = Math.min(Math.floor((width * height) / 11000), 95);
    const particles: {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2.2 + 1.2;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        alpha: Math.random() * 0.5 + 0.45,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Parallax shift calculation from center of canvas
      const centerX = width / 2;
      const centerY = height / 2;
      targetParallaxX = (mouseX - centerX) * 0.06;
      targetParallaxY = (mouseY - centerY) * 0.06;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate parallax constellation shift on hover
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Draw glowing constellation connection lines
      const maxDist = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const p1x = p1.x + currentParallaxX;
          const p1y = p1.y + currentParallaxY;
          const p2x = p2.x + currentParallaxX;
          const p2y = p2.y + currentParallaxY;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const alpha = factor * (isDark ? 0.38 : 0.28);

            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = isDark
              ? `rgba(196, 181, 253, ${alpha})`
              : `rgba(124, 58, 237, ${alpha})`;
            ctx.lineWidth = factor * 1.5;
            ctx.stroke();
          }
        }

        // Connect nearby nodes directly to user cursor for interactive telemetry
        if (mouseX > 0 && mouseY > 0) {
          const p = particles[i];
          const px = p.x + currentParallaxX;
          const py = p.y + currentParallaxY;
          const cdx = mouseX - px;
          const cdy = mouseY - py;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 180) {
            const factor = 1 - cdist / 180;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = isDark
              ? `rgba(167, 139, 250, ${factor * 0.55})`
              : `rgba(124, 58, 237, ${factor * 0.45})`;
            ctx.lineWidth = factor * 1.8;
            ctx.stroke();
          }
        }
      }

      // 2. Render and shift constellation star nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic floating motion
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const shiftedX = p.x + currentParallaxX;
        const shiftedY = p.y + currentParallaxY;

        // Dynamic mouse repulsion / gravitational shift on hover
        let nodeRadius = p.radius + Math.sin(p.pulse) * 0.6;
        if (mouseX > 0 && mouseY > 0) {
          const mdx = mouseX - shiftedX;
          const mdy = mouseY - shiftedY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 200) {
            const force = (1 - mdist / 200) * 18;
            p.x -= (mdx / (mdist || 1)) * force * 0.12;
            p.y -= (mdy / (mdist || 1)) * force * 0.12;
            nodeRadius = p.radius * 1.8;
          }
        }

        // Draw glowing outer halo for major stars
        if (p.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(shiftedX, shiftedY, nodeRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(167, 139, 250, 0.18)`
            : `rgba(124, 58, 237, 0.14)`;
          ctx.fill();
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(shiftedX, shiftedY, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(221, 214, 254, ${p.alpha})`
          : `rgba(109, 40, 217, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
