import AdminNavBar from "@/src/ui/components/admin/AdminNavBar";

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AdminNavBar/>
      {children}
    </>
  );
}

export default AdminLayout;
