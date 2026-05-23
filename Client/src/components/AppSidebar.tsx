'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { House, Package, Table } from 'lucide-react';

const data = {
  navMain: [
    {
      title: 'Home',
      url: '#',
      icon: <House />,
      isActive: true,
    },
    {
      title: 'Table',
      url: '#',
      icon: <Table />,
    },
    {
      title: 'Categories',
      url: '#',
      icon: <Package />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props} className='text-white '>
      <SidebarContent className='p-2 pt-5'>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
