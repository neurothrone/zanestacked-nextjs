import SectionTitle from "@/src/ui/components/public/SectionTitle";

const SkillsSkeleton = () => {
  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="px-4 py-6">
      <SectionTitle text="Skills"/>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 p-4 shadow-md border-l-4 border-violet-500 transition-opacity duration-700 opacity-100"
          >
            <div className="h-6 w-32 mb-2 bg-gray-600 rounded"></div>
            <div className="h-5 w-40 mb-3 bg-gray-700 rounded"></div>
            <div className="h-6 w-24 bg-violet-600 bg-opacity-30 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSkeleton;
