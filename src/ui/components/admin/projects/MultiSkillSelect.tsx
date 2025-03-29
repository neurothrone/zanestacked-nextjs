"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Skill from "@/src/models/skill";

type MultiSkillSelectProps = {
  skills: Skill[];
  name?: string;
  defaultSelected?: Skill[];
};

const MultiSkillSelect = ({
    skills,
    name = "skills",
    defaultSelected = []
  }: MultiSkillSelectProps
) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Skill[]>(defaultSelected);

  const filteredSkills =
    query === ""
      ? skills
      : skills.filter((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      {selected
        .filter((skill) => !!skill.id)
        .map((skill) => (
          <input key={skill.id} type="hidden" name={name} value={skill.id}/>
        ))}
      <Combobox value={selected} onChange={setSelected} multiple>
        <div className="relative">
          <div
            className="relative w-full cursor-default rounded-md bg-gray-800 text-white border border-gray-700 py-2 pl-3 pr-10 text-sm shadow-sm">
            <Combobox.Input
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={() =>
                selected.map(selectedSkill => selectedSkill.name).join(", ")
              }
              placeholder="Search and select skills"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400"/>
            </Combobox.Button>
          </div>

          <Combobox.Options
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {filteredSkills.map((skill) => (
              <Combobox.Option
                key={skill.id}
                value={skill}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-indigo-600 text-white" : "text-gray-200"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {skill.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-300">
                        <CheckIcon className="h-5 w-5"/>
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </>
  );
};

export default MultiSkillSelect;
