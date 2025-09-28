// src/components/dashboard/Sidebar.tsx

import Sidebar from '@/components/ui/sidebar';

/**
 * Dashboard Sidebar component.
 */
export default function DashboardSidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return <Sidebar isOpen={isOpen} toggle={toggle} />;
}
