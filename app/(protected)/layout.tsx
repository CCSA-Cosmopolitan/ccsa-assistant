import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { currentUser } from "@clerk/nextjs/server";




  export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const user = await currentUser();

    if (!user) {
      return null
    }
    return (
      <div>
     <SidebarProvider>
       <AppSidebar  />
       <SidebarInset>
         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
           <div className="flex items-center gap-2 px-4">
             <SidebarTrigger className="-ml-1" />
             <Separator orientation="vertical" className="mr-2 h-4" />
           </div>
         </header>
            {children}
        </SidebarInset>
   </SidebarProvider>
      </div>
    );
  }