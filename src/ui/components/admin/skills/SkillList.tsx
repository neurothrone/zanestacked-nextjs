import { fetchSkills } from "@/src/data/postgres/data";
import { DeleteSkillButton, EditSkillButton } from "@/src/ui/components/admin/skills/buttons";

const SkillList = async () => {
  const skills = await fetchSkills();

  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <h3>{skill.name}</h3>
          <p>{skill.yearsOfExperience} years</p>
          <p>{skill.proficiency}</p>
          <div className="flex justify-end gap-2">
            <EditSkillButton id={skill.id}/>
            <DeleteSkillButton id={skill.id}/>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SkillList;
