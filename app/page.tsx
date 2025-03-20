import { Metadata, NextPage } from "next";
import PrimaryButton from "@/components/public/PrimaryButton";
import ZaneHero from "@/components/public/ZaneHero";
import SkillList from "@/components/public/SkillList";
import ProjectList from "@/components/public/ProjectList";

export const metadata: Metadata = {
  title: "ZaneStacked",
  description: "Home page for ZaneStacked",
};

const HomePage: NextPage = () => {
  return (
    <main>
      <ZaneHero/>
      <div className="flex justify-center gap-4 py-6 bg-gray-900">
        <PrimaryButton href="https://github.com/neurothrone">GitHub</PrimaryButton>
        <PrimaryButton href="https://linkedin.com/in/neurothrone">LinkedIn</PrimaryButton>
      </div>
      <SkillList/>
      <ProjectList/>
    </main>
  );
}

export default HomePage;
