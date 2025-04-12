import { Metadata } from "next";
import { SidebarNav } from "./components/sidebar-nav";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

const sidebarNavItems = [
  { title: "Profile", href: "/settings" },
  { title: "Account", href: "/settings/account" },
  { title: "Appearance", href: "/settings/appearance" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      {/* Desktop Layout */}
      {/* Sidebar - Fixed on the left */}

      <div className="hidden md:flex">
        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white dark:bg-black py-6 space-y-2">
          <Link
            href={"/tasks"}
            className="flex justify-center items-center gap-2"
          >
            <h2 className="text-2xl font-bold tracking-tight">Tasksy</h2>
          </Link>
          <div className="w-full h-[1px] bg-[#E5E5E5]"></div>
          <div className="px-6">
            <SidebarNav items={sidebarNavItems} />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col w-full md:ml-64">
          {/* Navbar - Fixed at the top */}
          <div className="fixed top-0 left-64 right-0 bg-white dark:bg-black p-4 border-b z-10">
            <div className="flex justify-start items-center gap-2">
              <Link href="/tasks">
                <CircleArrowLeft className="cursor-pointer" />
              </Link>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            </div>
          </div>
          {/* Page Content */}
          <div className="p-10 pt-24 max-w-4xl">{children}</div>
        </div>
      </div>
    </>
  );
}
