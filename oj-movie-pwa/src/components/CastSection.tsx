import React from "react";
import CastCard from "./CastCard";

interface CastMember {
  name: string;
  role: string;
  image: string;
}

interface CastSectionProps {
  cast: CastMember[];
}

const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="mt-8 px-10">
      <h2 className="text-xl font-semibold mb-4">Cast</h2>

      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {cast.map((actor, index) => (
          <CastCard
            key={index}
            name={actor.name}
            role={actor.role}
            image={actor.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CastSection;
