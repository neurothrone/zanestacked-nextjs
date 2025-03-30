import { fetchSkills } from "@/src/data/postgres/data";
import SectionTitle from "@/src/ui/components/public/SectionTitle";

const SkillsGrid = async () => {
  const skills = await fetchSkills();

  return (
    <div className="px-4 py-6">
      <SectionTitle text="Skills"/>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="rounded-lg bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 p-4 shadow-md border-l-4 border-violet-500 transition-opacity duration-700 opacity-100"
          >
            <h2 className="text-lg font-semibold text-white mb-1">{skill.name}</h2>
            <p className="text-sm text-gray-200 font-medium mb-2">
              {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 && "s"} of experience
            </p>
            <span
              className="inline-block rounded-full bg-violet-500 bg-opacity-30 px-3 py-1 text-sm font-semibold text-white tracking-wide">
              {skill.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;
