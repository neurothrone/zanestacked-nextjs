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
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <h3>{skill.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default SkillList;
