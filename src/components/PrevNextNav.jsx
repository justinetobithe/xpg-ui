import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PrevNextNav({
    prevTo,
    nextTo,
    prevLabel,
    nextLabel,
    containerClass = "mx-auto w-full max-w-[1280px] px-4 md:px-8 mt-12",
    linkClass = "",
    showArrows = true,
    smooth = true,
    iconSize = 24,
    iconColor = "#ff8a00",
    iconStroke = 5.5,
}) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const dir =
        typeof i18n?.dir === "function" ? i18n.dir() : document?.dir || "ltr";
    const justify = prevTo && nextTo ? "justify-between" : prevTo ? "justify-start" : "justify-end";

    const defaultPrevLabel = prevLabel || t("navigation.previous", "Previous");
    const defaultNextLabel = nextLabel || t("navigation.next", "Next");

    const handleNav = (to) => (e) => {
        if (!to) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        });
    };

    const Chevron = ({ direction = "right", className = "" }) => (
        <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            aria-hidden="true"
            className={`${direction === "left" ? "rotate-180" : ""} ${className}`}
            style={{ display: "block" }}
        >
            <path
                d="M8 4 L16 12 L8 20"
                fill="none"
                stroke={iconColor}
                strokeWidth={iconStroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    const prevDir = dir === "rtl" ? "right" : "left";
    const nextDir = dir === "rtl" ? "left" : "right";

    return (
        <nav className={containerClass}>
            <div className={`flex items-center ${justify}`}>
                {prevTo && (
                    <Link
                        to={prevTo}
                        onClick={handleNav(prevTo)}
                        aria-label={defaultPrevLabel}
                        className={`group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] hover:text-[#1f2a44] ${linkClass}`}
                        rel="prev"
                    >
                        {showArrows && (
                            <Chevron
                                direction={prevDir}
                                className="transition-transform duration-200 group-hover:-translate-x-1"
                            />
                        )}
                        <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                            {defaultPrevLabel}
                        </span>
                    </Link>
                )}

                {nextTo && (
                    <Link
                        to={nextTo}
                        onClick={handleNav(nextTo)}
                        aria-label={defaultNextLabel}
                        className={`group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] hover:text-[#1f2a44] ${linkClass}`}
                        rel="next"
                    >
                        <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                            {defaultNextLabel}
                        </span>
                        {showArrows && (
                            <Chevron
                                direction={nextDir}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        )}
                    </Link>
                )}
            </div>
        </nav>
    );
}
