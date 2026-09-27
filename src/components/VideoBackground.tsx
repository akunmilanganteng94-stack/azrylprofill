import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
}

const PARTICLES = [
  { id: 1, top: '12%', left: '18%', size: 6, tx: '14px', ty: '-24px', dur: '8s', delay: '0s' },
  { id: 2, top: '24%', left: '82%', size: 8, tx: '-16px', ty: '-18px', dur: '10s', delay: '1.2s' },
  { id: 3, top: '42%', left: '12%', size: 5, tx: '18px', ty: '14px', dur: '9s', delay: '2.5s' },
  { id: 4, top: '58%', left: '86%', size: 7, tx: '-14px', ty: '-22px', dur: '11s', delay: '0.8s' },
  { id: 5, top: '74%', left: '22%', size: 6, tx: '12px', ty: '-16px', dur: '8.5s', delay: '3.1s' },
  { id: 6, top: '84%', left: '78%', size: 5, tx: '-12px', ty: '18px', dur: '9.5s', delay: '1.7s' },
  { id: 7, top: '16%', left: '64%', size: 4, tx: '10px', ty: '-15px', dur: '7.5s', delay: '2.0s' },
  { id: 8, top: '66%', left: '46%', size: 5, tx: '-10px', ty: '-20px', dur: '10.5s', delay: '0.4s' },
];

export function VideoBackground({ videoUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay will resume on first user interaction if restricted by power-saver mode
        });
      }
    };

    attemptPlay();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    const handleFirstInteraction = () => {
      attemptPlay();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [videoUrl]);

  // Very light scroll parallax
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setParallaxY(window.scrollY * 0.12);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Elegant bright fallback gradient (white / soft sky blue / subtle cyan) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff] via-[#eef7ff] to-[#e0f2fe]" />

      {/* Subtle ambient light mesh accents */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-sky-200/35 blur-3xl"
        style={{ transform: `translate3d(-50%, ${-parallaxY * 0.6}px, 0)` }}
      />
      <div
        className="absolute bottom-[-140px] right-[-80px] w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl"
        style={{ transform: `translate3d(0, ${parallaxY * 0.5}px, 0)` }}
      />

      {/* Full-viewport background video */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translate3d(0, ${-parallaxY * 0.25}px, 0) scale(1.03)`,
          }}
        />
      )}

      {/* Bright, airy glass overlay so website feels luminous and text stays crisp */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-sky-50/35 to-white/65" />

      {/* Sparse floating light particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="light-particle absolute rounded-full bg-gradient-to-br from-white via-sky-100 to-cyan-200 shadow-[0_0_12px_rgba(56,189,248,0.45)]"
            style={
              {
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--tx': p.tx,
                '--ty': p.ty,
                '--dur': p.dur,
                '--delay': p.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
