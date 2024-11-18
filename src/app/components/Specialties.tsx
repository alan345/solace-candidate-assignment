import { useState } from "react";

type Props = {
  specialties: string[];
};

export default function Specialties({ specialties }: Props) {
  const [showAll, setShowAll] = useState(false);

  const max = 3;
  const displayedSpecialties = showAll
    ? specialties
    : specialties.slice(0, max);
  const remainingCount = specialties.length - max;

  return (
    <div>
      {displayedSpecialties.map((s) => (
        <span
          key={s}
          className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >
          {s}
        </span>
      ))}

      {specialties.length > max && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="ml-2 text-teal-800 underline text-xs"
        >
          {showAll ? "Show Less" : `Show More (${remainingCount} more)`}
        </button>
      )}
    </div>
  );
}
