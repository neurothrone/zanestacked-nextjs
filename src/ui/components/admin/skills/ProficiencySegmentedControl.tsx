"use client";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export const PROFICIENCIES = [
  { id: "Beginner", name: "Beginner" },
  { id: "Intermediate", name: "Intermediate" },
  { id: "Advanced", name: "Advanced" },
  { id: "Expert", name: "Expert" },
];

export default function ProficiencySegmentedControl({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {PROFICIENCIES.map((option) => {
        const isSelected = selected === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`px-4 py-2 text-sm rounded-full transition-colors border
              ${isSelected
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"}`}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
