import { useState, useEffect } from "react";

interface Award {
  id: number;
  title: string;
  year: string;
  image: string;
  description: string;
  featured?: boolean;
}

const dummyAwards: Award[] = [
  {
    id: 1,
    title: "Best Picture 2023",
    year: "2023",
    image: "/awards/best-picture-2023.jpg",
    description: "Awarded to the best film of 2023.",
    featured: true,
  },
  {
    id: 2,
    title: "Best Actor 2023",
    year: "2023",
    image: "/awards/best-actor-2023.jpg",
    description: "Awarded to the best actor of the year.",
    featured: true,
  },
  {
    id: 3,
    title: "Best Director 2022",
    year: "2022",
    image: "/awards/best-director-2022.jpg",
    description: "Awarded to the best director of 2022.",
  },
  {
    id: 4,
    title: "Best Visual Effects 2022",
    year: "2022",
    image: "/awards/best-vfx-2022.jpg",
    description: "Awarded to the film with best visual effects.",
  },
];

export default function AwardsPage() {
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    setAwards(dummyAwards);
  }, []);

  const years = ["All", ...Array.from(new Set(dummyAwards.map((a) => a.year)))];

  const filteredAwards =
    selectedYear === "All" ? awards : awards.filter((a) => a.year === selectedYear);

  const featuredAwards = filteredAwards.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Awards & Events
      </h1>

      {/* YEAR FILTER */}
      <div className="flex gap-3 mb-6 justify-center flex-wrap">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-3 py-1 rounded font-semibold ${
              y === selectedYear ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* FEATURED AWARDS */}
      {featuredAwards.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Featured Awards
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {featuredAwards.map((award) => (
              <div
                key={award.id}
                className="flex-none w-48 snap-start cursor-pointer"
                onClick={() => setSelectedAward(award)}
              >
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <h3 className="text-white font-bold mt-2">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL AWARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredAwards.map((award) => (
          <div
            key={award.id}
            className="cursor-pointer"
            onClick={() => setSelectedAward(award)}
          >
            <img
              src={award.image}
              alt={award.title}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
            <h3 className="text-white font-bold mt-2">{award.title}</h3>
            <p className="text-gray-400 text-sm">{award.year}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedAward && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-white font-bold text-lg"
              onClick={() => setSelectedAward(null)}
            >
              ✕
            </button>

            <img
              src={selectedAward.image}
              alt={selectedAward.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold text-yellow-400">{selectedAward.title}</h2>
            <p className="text-gray-300 mt-2">{selectedAward.description}</p>
            <p className="text-gray-400 text-sm mt-1">{selectedAward.year}</p>
          </div>
        </div>
      )}
    </div>
  );
}
