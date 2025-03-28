"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  PencilIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { createSkill, SkillFormState } from "@/src/lib/actions/skill-actions";
import { Button } from "@/src/ui/components/Button";

const CreateSkillForm = () => {
  const initialState: SkillFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSkill, initialState);

  const proficiencies = [
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" },
    { id: "Expert", name: "Expert" },
  ];

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Skill Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name for skill"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <PencilIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Skill Years of Experience */}
        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="mb-2 block text-sm font-medium">
            Years of Experience
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                step="1"
                placeholder="Enter experience in years"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="yearsOfExperience-error"
              />
              <ClockIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>

          <div id="yearsOfExperience-error" aria-live="polite" aria-atomic="true">
            {state.errors?.yearsOfExperience &&
              state.errors.yearsOfExperience.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Skill Proficiency */}
        <div className="mb-4">
          <label htmlFor="proficiency" className="mb-2 block text-sm font-medium">
            Proficiency
          </label>
          <div className="relative">
            <select
              id="proficiency"
              name="proficiency"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="proficiency-error"
            >
              <option value="" disabled>
                Select a Proficiency
              </option>
              {proficiencies.map((proficiency) => (
                <option key={proficiency.id} value={proficiency.id}>
                  {proficiency.name}
                </option>
              ))}
            </select>
            <StarIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.proficiency &&
              state.errors.proficiency.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/skills"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Skill</Button>
      </div>
    </form>
  );
}

export default CreateSkillForm;
