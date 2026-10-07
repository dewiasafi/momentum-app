import { Brain, CircleCheckBig, House } from 'lucide-react';
import React from 'react';
import { NavItem } from './SidebarItem';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
     children: React.ReactNode;
}

const SIDEBAR_ITEMS: NavItem[] = [
     {
          id: 'dashboard',
          title: 'Dashboard',
          icon: <House className="w-4 h-4" />,
          href: '/dashboard'
     },
     {
          id: 'activities',
          title: 'Activities',
          icon: <CircleCheckBig className="w-4 h-4" />,
          children: [
               { id: 'all-activities', title: 'All Logs', href: '/activities' },
               { id: 'categories', title: 'Categories', href: '/activities/categories' },
               {
                    id: 'analytics-sub',
                    title: 'Reports',
                    children: [
                         { id: 'weekly', title: 'Weekly Summary', href: '/activities/reports/weekly' },
                         { id: 'monthly', title: 'Monthly Export', href: '/activities/reports/monthly' }
                    ]
               }
          ]
     },
     {
          id: 'analytics',
          title: 'Analytics',
          icon: <Brain className="w-4 h-4" />,
          href: '/analytics'
     }
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
     return (
          <div className="flex h-dvh w-screen overflow-hidden text-text-title font-sans bg-app-bg">
               <Sidebar items={SIDEBAR_ITEMS}/>

               <main className="flex-1 overflow-y-auto p-6">
                    {children}
               </main>
          </div>
     );
};