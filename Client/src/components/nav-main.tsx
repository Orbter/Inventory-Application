// client/src/components/nav-main.tsx
import * as React from 'react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon?: React.ReactNode }[];
}) {
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarMenu className='gap-4 text-white'>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className='cursor-pointer text-lg h-14 transition-colors hover:bg-white/20 hover:text-slate-900 data-[active=true]:bg-white/50'
            >
              <div
                onClick={() => navigate(item.url)}
                className='flex items-center group-data-[collapsible=icon]:justify-center gap-4 w-full h-full'
              >
                <div className='flex items-center justify-center [&>svg]:h-6 [&>svg]:w-6 [&>svg]:shrink-0'>
                  {item.icon}
                </div>
                <span className='group-data-[collapsible=icon]:hidden'>
                  {item.title}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
