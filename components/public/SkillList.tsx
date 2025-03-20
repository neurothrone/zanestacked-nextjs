"use client";

import { useEffect, useState } from "react";
import Skill from "@/models/skill";

const SkillList = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);

        console.log(data.map((skill: Skill) => skill.id));

        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div>
        No skills found.
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-950">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="px-4 py-2 bg-gray-800 text-white rounded-xl shadow-md"
          >
            {skill.name} - {skill.proficiency}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillList;
