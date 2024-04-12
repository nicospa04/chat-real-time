import { Sidebar } from "@/components";

export default function UserLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>
      <div className="h-full">
          {children}
      </div>
      </Sidebar>
    </>
);
}