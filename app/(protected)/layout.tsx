import LogoComponent from "@/components/LogoComponent";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


  


  
  export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (

       <div className="">
            <Sheet >
            <SheetTrigger className=" w-full  flex items-center justify-end px-4 sm:hidden bg-green-100">
                <LogoComponent />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
            </SheetTrigger>
            <SheetContent side={"left"} className=" px-0 py-0">
                <SheetHeader className=" flex flex-col items-start">
                    <SheetTitle hidden className="hidden"></SheetTitle>
                   <LogoComponent />
                </SheetHeader>
            </SheetContent>
            </Sheet>
           <div className=" flex">
            <div className=" w-1/6 bg-green-100 hidden sm:block h-screen">
                Hello people
            </div>
                {children}
           </div>
       </div>
    
    );
  }
  