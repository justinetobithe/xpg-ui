import React, { useState, useEffect } from "react";

function LazyYouTube({ videoId, title, autoPlay = false }) {
    const [isIframeLoaded, setIsIframeLoaded] = useState(autoPlay);

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    useEffect(() => {
        if (autoPlay) {
            setIsIframeLoaded(true);
        }
    }, [autoPlay]);

    return (
        <div className="relative w-full" style={{ paddingBottom: "56.25%", height: 0 }}>
            {isIframeLoaded ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                />
            ) : (
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-pointer"
                    style={{
                        backgroundImage: `url(${thumbnail})`,
                    }}
                    onClick={() => setIsIframeLoaded(true)}
                >
                    <button
                        aria-label="Play video"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 rounded-full w-[60px] h-[60px] flex items-center justify-center"
                    >
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
}

export default LazyYouTube;
