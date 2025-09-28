'use client';

import { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <div className="
          m-5 
          md:m-5 
          md:ltr:ml-0 
          md:rtl:mr-0
          ">
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main>
            <ProgressProvider
              height="4px"
              color="#EB7735"
              options={{ showSpinner: false }}
              shallowRouting
            >
              {children}
            </ProgressProvider>
          </main>
        </div>
      </div>
    </div>
  );
}
