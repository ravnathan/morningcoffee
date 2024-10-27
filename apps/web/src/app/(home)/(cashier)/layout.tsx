import SideBarMenu from "./_components/sidebarmenu";

export default function CashierLayout({children} : { children: React.ReactNode}) {
    return (
        <div>
            <SideBarMenu/>
            <div className="pl-64">{children}</div>
        </div>
    )
}