import SideBarMenu from "./_components/SidebarMenu";

export default function CashierLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            <SideBarMenu />
            <div className="bg-whiteish absolute inset-0 -z-50">
            </div>
            <div className="pl-52">{children}</div>
        </div>
    );
}
