import { FaChevronRight } from "react-icons/fa";

const actors = [
  {
    id: 1,
    name: "Sally Kirkland",
    rank: 9,
    movement: "+5,588",
    img: "https://i.imgur.com/1.jpg",
    category: "Top Rising",
  },
  {
    id: 2,
    name: "Benny Safdie",
    rank: 29,
    movement: "+803",
    img: "https://i.imgur.com/2.jpg",
    category: "Top Rising",
  },
  {
    id: 3,
    name: "Jacob Elordi",
    rank: 1,
    movement: "–",
    img: "https://i.imgur.com/3.jpg",
    category: "By Ranking",
  },
  {
    id: 4,
    name: "Mia Goth",
    rank: 2,
    movement: "+2",
    img: "https://i.imgur.com/4.jpg",
    category: "By Ranking",
  },
  {
    id: 5,
    name: "Guillermo del Toro",
    rank: 3,
    movement: "+2",
    img: "https://i.imgur.com/5.jpg",
    category: "By Ranking",
  },
  {
    id: 6,
    name: "Rhea Seehorn",
    rank: 4,
    movement: "+3",
    img: "https://i.imgur.com/6.jpg",
    category: "By Ranking",
  },
];

export default function PopularActors() {
  return (
    <section className="bg-black py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white">
            Most popular celebrities
          </h2>
          <FaChevronRight className="text-white" />
        </div>

        {/* CATEGORY LABELS */}
        <div className="flex gap-16 mb-3">
          <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wide">
            Top Rising
          </span>
          <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wide">
            By Ranking
          </span>
        </div>

        {/* CAROUSEL */}
        <div className="flex items-start gap-8 overflow-x-auto scrollbar-hide pb-3">

          {actors.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center">

              {/* CIRCLE IMAGE */}
              <img
                src={actor.img}
                alt={actor.name}
                className="w-24 h-24 rounded-full object-cover border border-gray-700 mb-3"
              />

              {/* RANK */}
              <div className="text-sm text-white font-semibold flex gap-1">
                {actor.rank}
                <span className="text-green-400 text-xs">
                  ({actor.movement})
                </span>
              </div>

              {/* NAME */}
              <p className="text-white text-sm font-medium text-center mt-1">
                {actor.name}
              </p>
            </div>
          ))}

          {/* SCROLL RIGHT BUTTON */}
          <button className="min-w-[40px] h-24 flex items-center justify-center bg-gray-800/70 rounded-md backdrop-blur-sm">
            <FaChevronRight className="text-white" />
          </button>

        </div>
      </div>
    </section>
  );
}
