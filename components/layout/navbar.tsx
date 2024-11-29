import { UserButton } from "@/components/layout/user-button";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

export function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
}