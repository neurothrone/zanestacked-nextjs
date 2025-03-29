"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  PencilIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { createSkill, SkillFormState } from "@/src/lib/actions/skill-actions";
import { Button } from "@/src/ui/components/Button";
import ProficiencySegmentedControl from "@/src/ui/components/admin/skills/ProficiencySegmentedControl";

const CreateSkillForm = () => {
  const initialState: SkillFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSkill, initialState);

  const [name, setName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [proficiency, setProficiency] = useState("");

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-900 p-4 md:p-6 text-white">
        {/* Skill Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name for skill"
              autoComplete="off"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="name-error"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PencilIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.name?.map((error: string) => (
            <p className="mt-2 text-sm text-red-400" key={error}>
              {error}
            </p>
          ))}
        </div>

        {/* Years of Experience */}
        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="mb-2 block text-sm font-medium text-gray-300">
            Years of Experience
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="yearsOfExperience"
              name="yearsOfExperience"
              placeholder="Enter experience in years"
              autoComplete="off"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="yearsOfExperience-error"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
            <ClockIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.yearsOfExperience?.map((error: string) => (
            <p className="mt-2 text-sm text-red-400" key={error}>
              {error}
            </p>
          ))}
        </div>

        {/* Proficiency */}
        <div className="mb-4">
          <label htmlFor="proficiency" className="mb-2 block text-sm font-medium text-gray-300">
            Proficiency
          </label>
          <div className="relative">
            <ProficiencySegmentedControl
              selected={proficiency}
              onChange={setProficiency}
            />
            <input type="hidden" name="proficiency" value={proficiency}/>
          </div>
          {state.errors?.proficiency?.map((error: string) => (
            <p className="mt-2 text-sm text-red-400" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/skills"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit">Create Skill</Button>
      </div>
    </form>
  );
};

export default CreateSkillForm;
