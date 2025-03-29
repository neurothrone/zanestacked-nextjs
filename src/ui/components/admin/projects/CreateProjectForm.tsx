"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useState } from "react";
import {
  PencilIcon,
  PhotoIcon,
  CodeBracketIcon,
  CursorArrowRaysIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { createProject, ProjectFormState } from "@/src/lib/actions/project-actions";
import { Button } from "@/src/ui/components/Button";
import MultiSkillSelect from "@/src/ui/components/admin/projects/MultiSkillSelect";
import Skill from "@/src/models/skill";

const CreateProjectForm = ({ skills }: { skills: Skill[] }) => {
  const initialState: ProjectFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProject, initialState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-900 p-4 md:p-6 text-white">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-300">
            Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter project title"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="title-error"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <PencilIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-400">{error}</p>
          ))}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-300">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder="Enter project description"
              rows={4}
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="description-error"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <ChatBubbleBottomCenterTextIcon
              className="pointer-events-none absolute left-3 top-4 h-[18px] w-[18px] text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-400">{error}</p>
          ))}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <div className="relative">
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="imageUrl-error"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <PhotoIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.imageUrl?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-400">{error}</p>
          ))}
        </div>

        {/* GitHub URL */}
        <div className="mb-4">
          <label htmlFor="githubUrl" className="mb-2 block text-sm font-medium text-gray-300">
            GitHub URL
          </label>
          <div className="relative">
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              placeholder="https://github.com/your-repo"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="githubUrl-error"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <CodeBracketIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.githubUrl?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-400">{error}</p>
          ))}
        </div>

        {/* Demo URL */}
        <div className="mb-4">
          <label htmlFor="demoUrl" className="mb-2 block text-sm font-medium text-gray-300">
            Demo URL
          </label>
          <div className="relative">
            <input
              id="demoUrl"
              name="demoUrl"
              type="url"
              placeholder="https://example.com/demo"
              className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="demoUrl-error"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
            <CursorArrowRaysIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white"/>
          </div>
          {state.errors?.demoUrl?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-400">{error}</p>
          ))}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Select Skills
          </label>
          <MultiSkillSelect skills={skills}/>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/projects"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
