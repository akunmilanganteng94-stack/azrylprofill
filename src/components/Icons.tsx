import React from 'react';
import { LinkItem } from '../data/profileData';

/**
 * Official-style crisp WhatsApp SVG Logo
 */
export function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.968 0 1.763.459 3.481 1.331 4.994L2 22l5.166-1.356a9.927 9.927 0 0 0 4.862 1.269h.004c5.515 0 9.968-4.453 9.968-9.969A9.91 9.91 0 0 0 19.08 4.92 9.908 9.908 0 0 0 12.031 2zm0 18.234h-.003a8.26 8.26 0 0 1-4.212-1.153l-.302-.179-3.136.823.837-3.058-.197-.313a8.234 8.234 0 0 1-1.272-4.386c0-4.564 3.714-8.278 8.288-8.278 2.213 0 4.294.862 5.858 2.427a8.228 8.228 0 0 1 2.425 5.854c0 4.565-3.715 8.263-8.286 8.263zm4.544-6.191c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062-.249-.125-1.051-.387-2.002-1.235-.74-.66-1.239-1.475-1.384-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.29.373-.436.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.436-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.075s.892 2.407 1.017 2.573c.125.166 1.755 2.68 4.252 3.758.594.256 1.058.409 1.419.524.596.189 1.139.162 1.568.098.478-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
    </svg>
  );
}

export function BriefcaseMailIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="5.5" width="19" height="14.5" rx="3.2" />
      <path d="M8 5.5V4.2A1.7 1.7 0 0 1 9.7 2.5h4.6A1.7 1.7 0 0 1 16 4.2v1.3" />
      <path d="M2.8 10l7.9 4.3a2.6 2.6 0 0 0 2.6 0L21.2 10" />
    </svg>
  );
}

export function ArrowRightSmallIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ShareNodesIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.3 13.3l7.4 4.4" />
      <path d="M15.7 6.3l-7.4 4.4" />
    </svg>
  );
}

export function CopySmallIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function QrCodeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3h-3z" />
      <path d="M18 18h3v3h-3z" />
      <path d="M14 19h2" />
      <path d="M19 14v2" />
    </svg>
  );
}

export function CheckSmallIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CloseSmallIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function VerifiedBadgeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Verified"
    >
      <path d="M12 2l2.4 2.1 3.1-.4 1.2 2.9 3 1.2-.4 3.1L23.4 13l-2.1 2.4.4 3.1-2.9 1.2-1.2 3-3.1-.4L12 24.4l-2.4-2.1-3.1.4-1.2-2.9-3-1.2.4-3.1L.6 13l2.1-2.4-.4-3.1 2.9-1.2 1.2-3 3.1.4L12 2zm-1.1 13.6l5.3-5.3-1.4-1.4-3.9 3.9-2-2-1.4 1.4 3.4 3.4z" />
    </svg>
  );
}

export function renderLinkIcon(iconType: LinkItem['iconType'], className = 'w-6 h-6') {
  switch (iconType) {
    case 'whatsapp':
      return <WhatsAppIcon className={className} />;
    case 'freelance-mail':
      return <BriefcaseMailIcon className={className} />;
  }
}
