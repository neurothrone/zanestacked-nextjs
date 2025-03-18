import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Dashboard - ZaneStacked",
  description: "Dashboard page for ZaneStacked",
};

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h2>Admin Index Page</h2>
      <hr/>
    </main>
  );
}

export default DashboardPage;
