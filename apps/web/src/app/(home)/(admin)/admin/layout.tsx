import SideBarAdmin from "./_components/sidebaradmin"

export default function DashboardLayout({children} : { children: React.ReactNode}) {
    return (
        <div>
            <SideBarAdmin/>
            <div className="pl-64">{children}</div>
        </div>
    )
}