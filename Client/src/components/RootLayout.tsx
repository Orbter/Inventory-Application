import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className='flex flex-col flex-1 min-h-screen'>
          <Header />
          <main className='flex-1 p-4'>
            <div className='flex items-center gap-2 mb-4'>
              <SidebarTrigger className='text-white cursor-pointer scale-120 hover:bg-white/20 hover:text-slate-900 data-[active=true]:bg-white/50' />
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
