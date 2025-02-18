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




  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
     <SidebarProvider>
       <AppSidebar />
       <SidebarInset>
         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
           <div className="flex items-center gap-2 px-4">
             <SidebarTrigger className="-ml-1" />
             <Separator orientation="vertical" className="mr-2 h-4" />
             <Breadcrumb>
               <BreadcrumbList>
                 <BreadcrumbItem className="hidden md:block">
                   <BreadcrumbLink href="#">
                     Building Your Application
                   </BreadcrumbLink>
                 </BreadcrumbItem>
                 <BreadcrumbSeparator className="hidden md:block" />
                 <BreadcrumbItem>
                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                 </BreadcrumbItem>
               </BreadcrumbList>
             </Breadcrumb>
           </div>
         </header>
            {children}
        </SidebarInset>
   </SidebarProvider>
      </div>
    );
  }

  



// export default function Page() {
//   return (

//         <main className="flex flex-col flex-1">
//           <div className="flex flex-col gap-4 p-4">
//             <h1 className="text-3xl font-semibold">Data Fetching</h1>
//             <p className="text-lg text-muted-foreground">
//               Learn how to fetch data in your application using SWR.
//             </p>
//           </div>
//         </main>
//      
//   )
// }
