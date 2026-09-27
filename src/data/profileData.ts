export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: 'whatsapp' | 'tools';
  url: string;
  iconType: 'whatsapp' | 'freelance-mail';
  accentColor: string;
}

export const PROFILE_DATA = {
  name: 'AZRYL',
  handle: '@azryl.dev',
  logoUrl: 'https://cdn.phototourl.com/member/2026-09-26-594a66d7-62e0-466e-98b9-056801b5871b.png',
  videoUrl: 'https://clooud.my.id/uploder/uploads/MZHOrJ.mp4',
  typingHeadlines: [
    'AZRYL',
    'AZRYL STUDIO',
    'AZRYL DEV',
  ],
  roles: [
    'Developer',
    'Web Creator',
    'Tools Builder',
    'Digital Creator',
  ],
  bio: 'Building next-generation digital experiences, high-craft websites & precision web tools.',
  subBio: 'Select an official channel or platform below to connect directly.',
  location: 'Indonesia • UTC+7',
  statusText: 'Active & Building Digital Products',
  footerCopyright: '© 2026 AZRYL — All Rights Reserved',
  footerTagline: 'Developer • Web Creator • Tools Builder • Digital Creator',
  links: [
    {
      id: 'whatsapp-jb',
      title: 'WhatsApp JB',
      subtitle: 'Official WhatsApp Channel • Join Community & Updates',
      tag: 'Official Channel',
      category: 'whatsapp',
      url: 'https://whatsapp.com/channel/0029VbCwLl7J3jv1QSig1V0C',
      iconType: 'whatsapp',
      accentColor: 'from-emerald-500/15 via-teal-500/10 to-sky-500/10 text-emerald-600',
    },
    {
      id: 'persib-preset',
      title: 'Persib Preset',
      subtitle: 'Exclusive Alight Motion Presets & Persib Bandung Updates',
      tag: 'Preset Hub',
      category: 'whatsapp',
      url: 'https://whatsapp.com/channel/0029VbERlVt3rZZbejRJ4F43',
      iconType: 'whatsapp',
      accentColor: 'from-emerald-500/15 via-teal-500/10 to-sky-500/10 text-emerald-600',
    },
    {
      id: 'persib-clips',
      title: 'Persib Clips',
      subtitle: 'High-Definition Match Clips, Edits & Exclusive Footage',
      tag: 'Media Channel',
      category: 'whatsapp',
      url: 'https://whatsapp.com/channel/0029VbDZ4cODTkK6GSrzgP1f',
      iconType: 'whatsapp',
      accentColor: 'from-emerald-500/15 via-teal-500/10 to-sky-500/10 text-emerald-600',
    },
    {
      id: 'freelance-job-gmail',
      title: 'Freelance Job Gmail',
      subtitle: 'Smart Platform to Discover & Access Freelance Opportunities',
      tag: 'Web Tool',
      category: 'tools',
      url: 'https://frelencer-gmail.vercel.app/',
      iconType: 'freelance-mail',
      accentColor: 'from-sky-500/15 via-cyan-500/10 to-blue-600/10 text-sky-600',
    },
  ] as LinkItem[],
};
