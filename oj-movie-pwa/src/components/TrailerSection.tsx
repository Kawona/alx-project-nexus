interface TrailerSectionProps {
    youtubeKey: string;  
    title: string;
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ youtubeKey, title }) => {

    
    let videoId = youtubeKey;

    try {
        
        if (youtubeKey.includes("youtube.com") || youtubeKey.includes("youtu.be")) {
            const url = new URL(youtubeKey);
            videoId =
                url.searchParams.get("v") ||       
                url.pathname.split("/").pop() ||   
                youtubeKey;
        }
    } catch (e) {
        
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
