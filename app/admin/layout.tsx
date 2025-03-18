import AdminNavBar from "@/components/admin/AdminNavBar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <AdminNavBar/>
      {children}
    </>
  );
}
