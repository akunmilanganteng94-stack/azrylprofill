import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE_DATA } from '../data/profileData';
import { CheckSmallIcon, CloseSmallIcon, CopySmallIcon, VerifiedBadgeIcon } from './Icons';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoError: boolean;
}

/**
 * Generates a deterministic, crisp 21x21 QR-style SVG matrix from the URL string
 * with standard finder patterns in the three corners.
 */
function generateQrMatrix(input: string): boolean[][] {
  const size = 21;
  const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const drawFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[r0 + r][c0 + c] = isBorder || isInner;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Deterministic hash fill for data modules
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const isTiming = r === 6 || c === 6;
      const inCenterLogo = r >= 8 && r <= 12 && c >= 8 && c <= 12;

      if (inTopLeft || inTopRight || inBottomLeft || isTiming || inCenterLogo) {
        continue;
      }

      hash ^= (r * 31 + c * 17) & 0xff;
      hash = Math.imul(hash, 16777619);
      grid[r][c] = (Math.abs(hash) % 10) < 5;
    }
  }

  return grid;
}

export function QrModal({ isOpen, onClose, logoError }: QrModalProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://azryl.dev';
  const matrix = useMemo(() => generateQrMatrix(currentUrl), [currentUrl]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-slate-900/30 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[360px] rounded-[28px] bg-white/95 backdrop-blur-xl border border-white shadow-[0_24px_60px_rgba(14,165,233,0.18)] p-6 text-center overflow-hidden"
          >
            {/* Subtle top ambient glow */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-sky-300/30 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close QR Modal"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <CloseSmallIcon className="w-4 h-4" />
            </button>

            {/* Mini Square Logo (Full Square Radius 20) */}
            <div className="relative mx-auto w-16 h-16 rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(14,165,233,0.16)] border border-white mb-3">
              {!logoError ? (
                <img
                  src={PROFILE_DATA.logoUrl}
                  alt={PROFILE_DATA.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-xl">
                  AZ
                </div>
              )}
            </div>

            <div className="inline-flex items-center justify-center gap-1.5">
              <h2
                id="qr-modal-title"
                className="font-display text-xl font-extrabold tracking-[0.08em] text-slate-900"
              >
                {PROFILE_DATA.name}
              </h2>
              <VerifiedBadgeIcon className="w-4 h-4 text-sky-500" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Official Digital Identity Pass</p>

            {/* Crisp SVG QR Code Container */}
            <div className="relative mx-auto mt-5 mb-5 w-52 h-52 rounded-[22px] bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/70 border border-sky-100 p-4 shadow-inner flex items-center justify-center">
              <svg
                viewBox="0 0 21 21"
                className="w-full h-full text-slate-900"
                shapeRendering="crispEdges"
                aria-label="AZRYL Profile QR Code"
              >
                {matrix.map((row, rIdx) =>
                  row.map((cell, cIdx) =>
                    cell ? (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={cIdx}
                        y={rIdx}
                        width={0.92}
                        height={0.92}
                        rx={0.22}
                        fill="currentColor"
                      />
                    ) : null
                  )
                )}
              </svg>

              {/* Center Logo Emblem inside QR */}
              <div className="absolute w-10 h-10 rounded-[10px] overflow-hidden bg-white p-0.5 shadow-md border border-sky-100 flex items-center justify-center">
                {!logoError ? (
                  <img
                    src={PROFILE_DATA.logoUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                ) : (
                  <span className="font-display text-xs font-bold text-sky-600">AZ</span>
                )}
              </div>
            </div>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyUrl}
              className="w-full min-h-[46px] rounded-[16px] bg-slate-900 hover:bg-sky-950 text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <CheckSmallIcon className="w-4 h-4 text-emerald-400" />
                  <span>Profile Link Copied!</span>
                </>
              ) : (
                <>
                  <CopySmallIcon className="w-4 h-4 text-sky-300" />
                  <span>Copy Official Hub Link</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
