import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteProject } from "@/src/lib/actions/project-actions";

const CreateProjectButton = () => {
  return (
    <Link
      href="/admin/projects/create"
      className="flex h-10 items-center rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
    >
      <span className="hidden md:block">Create Project</span>{" "}
      <PlusIcon className="h-5 md:ml-4"/>
    </Link>
  );
}

const EditProjectButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/projects/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5"/>
    </Link>
  );
}

const DeleteProjectButton = ({ id }: { id: string }) => {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <form action={deleteProjectWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5"/>
      </button>
    </form>
  );
}

export { CreateProjectButton, EditProjectButton, DeleteProjectButton };
