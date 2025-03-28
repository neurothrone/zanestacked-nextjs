import { Metadata } from "next";
import PrimaryButton from "@/src/ui/components/public/PrimaryButton";
import ZaneHero from "@/src/ui/components/public/ZaneHero";
// import SkillList from "@/src/components/public/SkillList";
// import ProjectList from "@/src/components/public/ProjectList";

export const metadata: Metadata = {};

const HomePage= () => {
  return (
    <main>
      <ZaneHero/>
      <div className="flex justify-center gap-4 py-6 bg-gray-900">
        <PrimaryButton href="https://github.com/neurothrone">GitHub</PrimaryButton>
        <PrimaryButton href="https://linkedin.com/in/neurothrone">LinkedIn</PrimaryButton>
      </div>
      {/*<SkillList/>*/}
      {/*<ProjectList/>*/}
    </main>
  );
}

export default HomePage;
