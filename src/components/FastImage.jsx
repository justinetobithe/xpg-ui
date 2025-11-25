import React, { useState, useEffect } from "react";
import { useUiStore } from "../stores/useUiStore";

const tiny =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

export default function FastImage({
    src,
    alt = "",
    className = "",
    imgClassName = "",
    placeholder = tiny,
    priority = false,
    fit = "cover",
    ...props
}) {
    const [loaded, setLoaded] = useState(false);
    const { loadedImages, markImageLoaded } = useUiStore();

    useEffect(() => {
        if (src && loadedImages.has(src)) setLoaded(true);
    }, [src, loadedImages]);

    const fitClass = fit === "contain" ? "object-contain" : "object-cover";

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={placeholder}
                aria-hidden
                className={`absolute inset-0 w-full h-full ${fitClass} blur-md scale-110 transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"
                    }`}
            />
            <img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={priority ? "high" : "auto"}
                onLoad={() => {
                    setLoaded(true);
                    if (src) markImageLoaded(src);
                }}
                className={`w-full h-full ${fitClass} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
                    } ${imgClassName}`}
                {...props}
            />
        </div>
    );
}
