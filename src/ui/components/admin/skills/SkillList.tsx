import { fetchSkills } from "@/src/data/postgres/data";
import Link from "next/link";

const SkillList = async () => {
  const skills = await fetchSkills();

  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <h3>{skill.name}</h3>
          <Link href={`/admin/skills/edit/${skill.id}`} className="text-yellow-400 hover:text-yellow-500 me-2">Edit</Link>
          <Link href="/admin/skills/create" className="text-red-400 hover:text-red-500">Delete</Link>
        </li>
      ))}
    </ul>
  );
}

export default SkillList;
