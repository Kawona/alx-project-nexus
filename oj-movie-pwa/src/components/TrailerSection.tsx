import React from "react";

interface TrailerSectionProps {
    youtubeKey: string;
    title: string;
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ youtubeKey, title }) => {
    const videoId = youtubeKey.includes("youtube.com")
        ? new URL(youtubeKey).searchParams.get("v")
        : youtubeKey;
    
    if (!videoId) return null;

    return (
        <section className="w-full bg-black py-10 flex justify-center">
            <div className="max-w-44xl w-full px-4">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">{title} - Trailer</h2>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${title} Trailer`}
                        allowFullScreen
                        className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default TrailerSection;