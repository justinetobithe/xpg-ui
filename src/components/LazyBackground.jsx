import React, { useState, useEffect, useRef } from "react";

const LazyBackground = ({ imageUrl, className }) => {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-opacity duration-700`}
            style={{
                backgroundImage: loaded ? `url(${imageUrl})` : "none",
            }}
        />
    );
};

export default LazyBackground;
