import { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface TrailerSectionProps {
    youtubeKey: string;
    title: string;
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ youtubeKey, title }) => {
    const [play, setPlay] = useState(false);

    const thumbnailurl = `https://img.youtube.com/vi/${youtubeKey}/maxresdefault.jpg`;

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Trailer</h2>

            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden group">

                {/* if not playing, show thumbnail + play button */}
                {!play && (
                    <>
                        <img
                            src={thumbnailurl}
                            alt={`${title} Trailer`}
                            className="w-full h-full object-cover group-hover:opacity-80 transition"
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40">
                            
                            {/* Play button */}
                            <button
                                onClick={() => setPlay(true)}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 group-hover:scale-110 transition">
                                    <FaPlay className="text-white text-3xl" />
                                </div>
                            </button>
                        </div>
                    </>
                )}

                {/* When playing: show Youtube iframe */}
                {play && (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
                        title={`${title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-white; encrypted-media; gyroscope; picture-in-pucture"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
};

export default TrailerSection;