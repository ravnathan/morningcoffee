import SideBarAdmin from './_components/sidebaradmin';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideBarAdmin />
      <div className="bg-whiteish h-screen w-full fixed -z-10"></div>
      <div className="pl-64">{children}</div>
    </div>
  );
}
