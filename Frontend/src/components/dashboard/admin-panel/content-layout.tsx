import { Navbar } from "@/components/dashboard/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      {/* <Navbar title={title} /> */}
      <div className="w-full p-2 sm:px-5 ">{children}</div>
    </div>
  );
}
