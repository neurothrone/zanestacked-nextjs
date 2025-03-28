import Link from "next/link";

const SkillNotFoundPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>This is not the skill you are looking for.</p>
      <Link
        href="/admin/skills"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}

export default SkillNotFoundPage;
