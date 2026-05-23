import * as React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// nav-main.tsx
export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon?: React.ReactNode }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu className='gap-4 text-white '>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className='cursor-pointer text-lg h-14 transition-colors hover:bg-white/20 hover:text-slate-900 data-[active=true]:bg-white/50'
            >
              <a
                href={item.url}
                className='flex items-center  group-data-[collapsible=icon]:justify-center gap-4 w-full h-full'
              >
                <div className='flex items-center justify-center [&>svg]:h-6 [&>svg]:w-6 [&>svg]:shrink-0'>
                  {item.icon}
                </div>
                <span className='group-data-[collapsible=icon]:hidden'>
                  {item.title}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
