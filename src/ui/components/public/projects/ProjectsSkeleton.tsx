import SectionTitle from "@/src/ui/components/public/SectionTitle";

const ProjectsSkeleton = () => {
  return (
    <div className="px-4 py-6">
      <SectionTitle text="Projects"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[26rem] animate-pulse rounded-lg bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 shadow-md border-l-4 border-violet-500 transition-opacity duration-700 opacity-100 overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 bg-gray-900"/>

            <div className="p-4 space-y-3">
              <div className="h-6 w-1/2 bg-gray-600 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-700 rounded"></div>

              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-violet-600 bg-opacity-30 rounded-full"></div>
                <div className="h-6 w-20 bg-violet-600 bg-opacity-30 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
