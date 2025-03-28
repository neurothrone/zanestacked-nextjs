import { fetchSkills } from "@/src/data/postgres/data";

const Skills = async () => {
  const skills = await fetchSkills();

  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <h3>{skill.name}</h3>
        </li>
      ))}
    </ul>
  );
}

export default Skills;
