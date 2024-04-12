import { DesktopSideBar } from "..";

export async function Sidebar ({children}: {children: React.ReactNode }) {
    return (
        <div className="h-full">
            <DesktopSideBar/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>
    )
}