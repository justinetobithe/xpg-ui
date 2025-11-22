import React, { useEffect, useRef } from "react";
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock";

function Loader({ fullscreen = true, className = "" }) {
    const targetRef = useRef(null);

    useEffect(() => {
        const el = targetRef.current;
        if (el) disableBodyScroll(el, { reserveScrollBarGap: true });
        return () => {
            if (el) enableBodyScroll(el);
            clearAllBodyScrollLocks();
        };
    }, []);

    return (
        <div
            ref={targetRef}
            aria-busy="true"
            aria-live="polite"
            role="status"
            className={
                `${fullscreen ? "fixed inset-0" : "relative w-full h-full"} ` +
                "z-[1000] w-full h-full bg-white/95 backdrop-blur-sm flex items-center justify-center overflow-hidden " +
                className
            }
        >
            <div className="sk-folding-cube" aria-label="Loading">
                <div className="sk-cube1 sk-cube" />
                <div className="sk-cube2 sk-cube" />
                <div className="sk-cube4 sk-cube" />
                <div className="sk-cube3 sk-cube" />
            </div>
        </div>
    );
}

export default Loader;
