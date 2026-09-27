/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE_DATA } from './data/profileData';
import { VideoBackground } from './components/VideoBackground';
import { TypingBrandTitle, TypingRole } from './components/TypingRole';
import { QrModal } from './components/QrModal';
import {
  ArrowRightSmallIcon,
  CheckSmallIcon,
  CopySmallIcon,
  QrCodeIcon,
  ShareNodesIcon,
  VerifiedBadgeIcon,
  renderLinkIcon,
} from './components/Icons';

type FilterCategory = 'all' | 'whatsapp' | 'tools';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    // Brief, smooth splash screen with AZRYL logo
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 520);
    return () => clearTimeout(timer);
  }, []);

  // Live WIB (UTC+7) Clock for futuristic personal hub aesthetic
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setLocalTime(`${formatter.format(new Date())} WIB`);
      } catch {
        const now = new Date();
        setLocalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShareProfile = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${PROFILE_DATA.name} — Developer • Web Creator • Tools Builder`,
      text: PROFILE_DATA.bio,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2200);
    } catch {
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2200);
    }
  };

  const handleCopySingleLink = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    url: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLinkId(id);
      setTimeout(() => {
        setCopiedLinkId((prev) => (prev === id ? null : prev));
      }, 1800);
    } catch {
      setCopiedLinkId(id);
      setTimeout(() => {
        setCopiedLinkId((prev) => (prev === id ? null : prev));
      }, 1800);
    }
  };

  const filteredLinks = PROFILE_DATA.links.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="relative min-h-dvh w-full flex flex-col justify-between overflow-x-hidden">
      {/* Full-Viewport Video Background with Bright Glass Overlay & Fallback */}
      <VideoBackground videoUrl={PROFILE_DATA.videoUrl} />

      {/* Brief Loading Screen with Full-Square Radius 20 AZRYL Logo */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fbff] via-[#eef7ff] to-[#e2f2fe]"
            aria-hidden="true"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 rounded-[20px] bg-white shadow-[0_16px_40px_rgba(14,165,233,0.2)] border border-white overflow-hidden flex items-center justify-center"
            >
              {!logoError ? (
                <img
                  src={PROFILE_DATA.logoUrl}
                  alt={`${PROFILE_DATA.name} Logo`}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              ) : (
                <span className="font-display text-2xl font-extrabold tracking-wider text-sky-600">
                  AZ
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive QR Code Digital Identity Modal */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        logoError={logoError}
      />

      {/* Main Content Container (Desktop 500-650px centered, Mobile safe margin) */}
      <main className="w-full max-w-[580px] mx-auto px-5 pt-6 sm:pt-11 pb-10 flex-1 flex flex-col justify-center">
        {/* Top Utility Bar: Live Time Status + QR Pass & Share Actions */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-2 mb-6 sm:mb-8"
        >
          {/* Left: Clean Live Status & Local Time */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-700 font-semibold">Online</span>
            {localTime && (
              <>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="font-mono-tabular text-[11px] text-slate-500">
                  {localTime}
                </span>
              </>
            )}
          </div>

          {/* Right: QR Pass & Share Profile Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              aria-label="Open AZRYL QR Code Pass"
              className="min-h-[42px] px-3.5 py-2 rounded-[14px] bg-white/75 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_22px_rgba(14,165,233,0.12)] text-slate-700 hover:text-sky-600 transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              <QrCodeIcon className="w-3.5 h-3.5 text-sky-600" />
              <span className="whitespace-nowrap">QR Pass</span>
            </button>

            <button
              type="button"
              onClick={handleShareProfile}
              aria-label="Share AZRYL Profile"
              className="min-h-[42px] px-3.5 py-2 rounded-[14px] bg-white/75 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_22px_rgba(14,165,233,0.12)] text-slate-700 hover:text-sky-600 transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              {copiedProfile ? (
                <>
                  <CheckSmallIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 whitespace-nowrap">Copied</span>
                </>
              ) : (
                <>
                  <ShareNodesIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span className="whitespace-nowrap">Share</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* HERO / PROFILE SECTION */}
        <header className="flex flex-col items-center text-center mb-7">
          {/* 1. Full Square Logo with 20px Border Radius (Full Persegi Radius 20) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-5 group"
          >
            {/* Soft cyan/sky ambient glow behind square logo */}
            <div
              className="absolute -inset-2.5 rounded-[26px] bg-gradient-to-tr from-sky-400/30 via-cyan-300/25 to-blue-400/25 blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Full Square Container with exact 20px border-radius and edge-to-edge image */}
            <div className="relative w-28 h-28 sm:w-[116px] sm:h-[116px] rounded-[20px] bg-white shadow-[0_14px_38px_rgba(14,165,233,0.16)] ring-2 ring-white/95 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
              {!logoError ? (
                <img
                  src={PROFILE_DATA.logoUrl}
                  alt={PROFILE_DATA.name}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              ) : (
                <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-display text-3xl font-extrabold tracking-wider">
                  AZ
                </div>
              )}
            </div>
          </motion.div>

          {/* 2. Main Brand Name "AZRYL" with Smooth Typing Animation & Premium Display Font */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2"
          >
            <h1
              className="font-display text-3xl sm:text-[38px] font-extrabold tracking-[0.1em] text-slate-950 leading-none"
              aria-label={PROFILE_DATA.name}
            >
              <TypingBrandTitle text={PROFILE_DATA.name} />
            </h1>
            <VerifiedBadgeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 shrink-0" />
          </motion.div>

          {/* 3. Dynamic Role Typing Animation underneath */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5"
          >
            <TypingRole roles={PROFILE_DATA.roles} />
          </motion.div>

          {/* 4. Upgraded Premium Bio Copy */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-sm sm:text-[15px] text-slate-700 max-w-[420px] leading-relaxed font-medium"
            style={{ textWrap: 'balance' }}
          >
            {PROFILE_DATA.bio}
          </motion.p>

          {/* Clean Unboxed Editorial Metadata Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500"
          >
            <span>{PROFILE_DATA.location}</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-700 font-semibold">{PROFILE_DATA.statusText}</span>
          </motion.div>
        </header>

        {/* Interactive Category Filter Segmented Control */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center mb-5"
        >
          <div
            role="tablist"
            aria-label="Filter links by category"
            className="inline-flex items-center gap-1 p-1 rounded-[16px] bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
          >
            {(
              [
                { id: 'all', label: 'All Hub (4)' },
                { id: 'whatsapp', label: 'WhatsApp Channels (3)' },
                { id: 'tools', label: 'Tools & Work (1)' },
              ] as { id: FilterCategory; label: string }[]
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-[12px] text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.16)]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* LINK BUTTONS SECTION */}
        <nav aria-label="Official Links" className="w-full flex flex-col gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((link, index) => {
              const isCopied = copiedLinkId === link.id;
              return (
                <motion.a
                  layout
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative w-full rounded-[20px] bg-white/82 hover:bg-white/96 backdrop-blur-md border border-white/95 hover:border-sky-200 px-4 py-3.5 sm:px-5 sm:py-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] flex items-center justify-between gap-3.5 focus-visible:outline-2 focus-visible:outline-sky-500"
                >
                  {/* Left Icon Box */}
                  <div
                    className={`w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-[16px] bg-gradient-to-br ${link.accentColor} border border-white/90 flex items-center justify-center shrink-0 transition-transform duration-250 group-hover:scale-105 shadow-xs`}
                  >
                    {renderLinkIcon(link.iconType, 'w-6 h-6')}
                  </div>

                  {/* Center Title, Category Separator & Subtitle */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-sky-950 transition-colors truncate tracking-tight">
                        {link.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline text-xs text-slate-300"
                      >
                        ·
                      </span>
                      <span className="hidden sm:inline text-[11px] font-semibold text-sky-600/90 tracking-wide whitespace-nowrap">
                        {link.tag}
                      </span>
                    </div>
                    <div className="text-xs sm:text-[13px] font-medium text-slate-500 group-hover:text-slate-600 transition-colors truncate mt-0.5">
                      {link.subtitle}
                    </div>
                  </div>

                  {/* Right Actions: Quick Copy Link Button + Small Arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleCopySingleLink(e, link.id, link.url)}
                      aria-label={`Copy link for ${link.title}`}
                      title="Copy Link"
                      className="w-9 h-9 rounded-full bg-slate-100/75 hover:bg-sky-100/90 text-slate-500 hover:text-sky-700 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    >
                      {isCopied ? (
                        <CheckSmallIcon className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <CopySmallIcon className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className="w-9 h-9 rounded-full bg-slate-900/5 group-hover:bg-sky-500 group-hover:text-white text-slate-500 flex items-center justify-center transition-all duration-250">
                      <ArrowRightSmallIcon className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </nav>
      </main>

      {/* MINIMAL PREMIUM FOOTER */}
      <footer className="w-full max-w-[580px] mx-auto px-5 pb-7 pt-2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="font-outfit text-xs font-semibold text-slate-600 tracking-wide">
            {PROFILE_DATA.footerCopyright}
          </p>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide">
            {PROFILE_DATA.footerTagline}
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
