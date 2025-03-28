import AdminNavBar from "@/src/components/admin/AdminNavBar";

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
