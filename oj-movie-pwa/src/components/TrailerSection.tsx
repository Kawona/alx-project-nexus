interface TrailerSectionProps {
    youtubeKey: string;  // Can be a YouTube key or full URL
    title: string;
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ youtubeKey, title }) => {

    // Detect if the value is a full YouTube URL or a simple key
    let videoId = youtubeKey;

    try {
        // If it's a full YouTube URL (e.g. https://youtube.com/watch?v=XXXX)
        if (youtubeKey.includes("youtube.com") || youtubeKey.includes("youtu.be")) {
            const url = new URL(youtubeKey);
            videoId =
                url.searchParams.get("v") ||       // youtube.com/watch?v=xxxx
                url.pathname.split("/").pop() ||   // youtu.be/xxxx
                youtubeKey;
        }
    } catch (e) {
        // If URL parsing fails, fallback to raw key
        videoId = youtubeKey;
    }

    if (!videoId) return null;

    return (
        <section className="w-full bg-black py-10 flex justify-center">
            <div className="max-w-5xl w-full px-4">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    {title} - Trailer
                </h2>

                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${title} Trailer`}
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default TrailerSection;
