export const sidebarLinks = [
  { href: '/home', label: 'home', icon: 'fi fi-sr-home' },
  { href: '/analytics', label: 'analytics', icon: 'fi fi-sr-dashboard' },
  {
    label: 'diagnosis',
    icon: 'fi fi-br-tools',
    href: '/diagnosis',
    subLinks: [
      { href: '/diagnosis/dtc-search', label: 'dtcSearch' },
      { href: '/diagnosis/repair-protocols', label: 'repairProtocols' },
      { href: '/diagnosis/vin-decoder', label: 'vinDecoder' },
    ],
  },
  {
    label: 'technicalPlans',
    icon: 'fi fi-sr-document',
    href: '/technical-plans',
    subLinks: [
      { href: '/technical-plans/electrical-diagrams', label: 'electricalDiagrams' },
      { href: '/technical-plans/component-locations', label: 'componentLocations' },
      { href: '/technical-plans/disassembly-diagrams', label: 'disassemblyDiagrams' },
    ],
  },
  { href: '/repair-sessions', label: 'repairSessions', icon: 'fi fi-sr-briefcase' },
  { href: '/workshop-management', label: 'workshopManagement', icon: 'fi fi-ss-employees' },
  { href: '/public-profile', label: 'publicProfile', icon: 'fi fi-ss-users' },
  { href: '/financial-profile', label: 'financialProfile', icon: 'fi fi-sr-sack-dollar' },
  { href: '/store', label: 'store', icon: 'fi fi-sr-store-alt' },
  { href: '/settings', label: 'settings', icon: 'fi fi-sr-settings' },
];
