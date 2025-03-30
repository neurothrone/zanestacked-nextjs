import { Suspense } from "react";
import { Metadata } from "next";
import ZaneHero from "@/src/ui/components/public/ZaneHero";
import SocialLinks from "@/src/ui/components/public/SocialLinks";
import SkillsGrid from "@/src/ui/components/public/skills/SkillsGrid";
import SkillsSkeleton from "@/src/ui/components/public/skills/SkillsSkeleton";
import ProjectsSkeleton from "@/src/ui/components/public/projects/ProjectsSkeleton";
import ProjectsGrid from "@/src/ui/components/public/projects/ProjectsGrid";

export const metadata: Metadata = {};

const HomePage = () => {
  return (
    <main>
      <ZaneHero/>
      <SocialLinks/>
      <Suspense fallback={<SkillsSkeleton/>}>
        <SkillsGrid/>
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton/>}>
        <ProjectsGrid/>
      </Suspense>
    </main>
  );
}

export default HomePage;
