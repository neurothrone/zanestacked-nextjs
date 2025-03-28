import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h2>Dashboard Page</h2>
      <hr/>
    </main>
  );
}

export default DashboardPage;
