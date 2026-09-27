import React, { useEffect, useState } from 'react';

interface TypingBrandTitleProps {
  text?: string;
}

/**
 * Smooth typing animation specifically for the main "AZRYL" brand headline
 */
export function TypingBrandTitle({ text = 'AZRYL' }: TypingBrandTitleProps) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 95 : 140;
    const holdAfterTyped = 3600;
    const holdAfterDeleted = 420;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === text) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, holdAfterTyped);
    } else if (isDeleting && displayed === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, holdAfterDeleted);
    } else {
      timer = setTimeout(() => {
        const next = isDeleting
          ? text.slice(0, displayed.length - 1)
          : text.slice(0, displayed.length + 1);
        setDisplayed(next);
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, text]);

  return (
    <span className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[52px]">
      <span className="bg-gradient-to-r from-slate-950 via-sky-950 to-slate-900 bg-clip-text text-transparent">
        {displayed}
      </span>
      <span
        className="ml-1.5 inline-block w-[2.5px] h-[28px] sm:h-[34px] bg-gradient-to-b from-sky-400 to-cyan-600 rounded-full typing-cursor"
        aria-hidden="true"
      />
    </span>
  );
}

interface TypingRoleProps {
  roles: string[];
}

export function TypingRole({ roles }: TypingRoleProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = roles[roleIndex] || '';

    const typeSpeed = isDeleting ? 38 : 72;
    const pauseAfterTyped = 1900;
    const pauseAfterDeleted = 280;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentFullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyped);
    } else if (isDeleting && displayedText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, pauseAfterDeleted);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentFullText.slice(0, displayedText.length - 1)
          : currentFullText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles]);

  return (
    <div
      className="inline-flex items-center justify-center min-h-[26px] font-outfit text-[15px] sm:text-base font-semibold tracking-[0.04em] text-sky-700"
      aria-live="polite"
      aria-label={roles[roleIndex]}
    >
      <span>{displayedText}</span>
      <span
        className="ml-1 inline-block w-[1.5px] h-[16px] bg-sky-500 rounded-full typing-cursor"
        aria-hidden="true"
      />
    </div>
  );
}
