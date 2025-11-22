import React, { useEffect, useRef } from "react";
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { Circles } from "react-loader-spinner";

function Loader({ fullscreen = true, className = "", size = 80, color = "#ff8a00" }) {
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
            <Circles
                height={size}
                width={size}
                color={color}
                ariaLabel="circles-loading"
                visible={true}
            />
        </div>
    );
}

export default Loader;
