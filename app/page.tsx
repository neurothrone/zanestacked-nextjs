import { Metadata, NextPage } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ZaneStacked",
  description: "Home page for ZaneStacked",
};

const HomePage: NextPage = () => {
  return (
    <div>
      <h1>ZaneStacked</h1>
      <Link href="/admin" className="text-blue-400">Admin</Link>
    </div>
  );
}

export default HomePage;
