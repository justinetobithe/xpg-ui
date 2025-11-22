import React, { useEffect, useState } from "react";
import {
    solution1,
    solution2,
    solution3,
    solution4,
    solution5,
    solution6,
} from "@/utils/images";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "@/components/SEO";

function Solutions() {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        [solution6, solution1, solution2].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const contents = [
        {
            title: t("xpgSolutions.contents.smartStudio.title"),
            color: "#f0f3f2",
            image: solution6,
            link: "/smart-studio",
        },
        {
            title: t("xpgSolutions.contents.apiIntegration.title"),
            color: "#f0f3f2",
            image: solution1,
            link: "/api-integration",
        },
        {
            title: t("xpgSolutions.contents.whiteLabel.title"),
            color: "#f0f3f2",
            image: solution2,
            link: "/white-label",
        },
        {
            title: t("xpgSolutions.contents.html5Mobile.title"),
            color: "#f0f3f2",
            image: solution3,
            link: "/html5-mobile",
        },
        {
            title: t("xpgSolutions.contents.privateTables.title"),
            color: "#f0f3f2",
            image: solution4,
            link: "/private-tables",
        },
        {
            title: t("xpgSolutions.contents.printingMaterials.title"),
            color: "#f0f3f2",
            image: solution5,
            link: "/printing-materials",
        },
    ];

    return (
        <section className="bg-white py-8 px-4 md:px-20 transition-all duration-300 ease-in-out">
            <SEO
                title="XPG Solutions – Smart Studio, API, White Label & More"
                description="Discover XPG’s full range of iGaming solutions including Smart Studio, API integration, white label platforms, HTML5 mobile, private tables, and branded printing materials."
                url="https://xprogaming.com/solutions"
                image={solution6}
                keywords="XPG solutions, Smart Studio, API integration, white label casino, HTML5 mobile casino, private tables, casino marketing materials"
            />

            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mt-16">
                    <div className="w-[120px] h-px bg-orange-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-normal uppercase tracking-wide text-gray-800 inline-block font-sans">
                        {t("xpgSolutions.xpg")}{" "}
                        <b className="font-extrabold">{t("xpgSolutions.solutions")}</b>
                    </h2>
                    <div className="w-[120px] h-px bg-orange-500 mx-auto mt-4" />
                </div>

                <div className="mt-12 md:mt-[70px] grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 justify-items-center">
                    {contents.map((item, i) => (
                        <Card
                            key={item.title}
                            index={i}
                            item={item}
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                            navigate={navigate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Card({ item, index, isHovered, setIsHovered, navigate }) {
    const hovered = isHovered === item.title;

    return (
        <button
            type="button"
            onMouseEnter={() => setIsHovered(item.title)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => navigate("/solution" + item.link)}
            className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] flex flex-col items-center justify-start focus:outline-none"
        >
            <div
                className="w-full aspect-square rounded-[24px] sm:rounded-[28px] flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 transition-all ease-in-out duration-300"
                style={{
                    backgroundColor: item.color,
                    border: hovered ? "3px solid #d2691e" : "3px solid transparent",
                }}
            >
                <div className="relative w-[70%] sm:w-[72%] aspect-square">
                    <div className="absolute inset-0 rounded-full bg-neutral-200" />
                    <img
                        src={item.image}
                        alt={item.title}
                        width={256}
                        height={256}
                        decoding="async"
                        fetchpriority={index < 3 ? "high" : "auto"}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="relative z-10 rounded-full object-cover w-full h-full shadow-[0_0_22px_rgba(255,127,80,0.45)]"
                    />
                </div>

                <p
                    className="
                        mt-3 sm:mt-4
                        text-primary uppercase font-extrabold text-center
                        text-[11px] sm:text-xs md:text-sm
                        leading-snug tracking-[0.01em]
                        px-2 w-full
                        line-clamp-2 break-words hyphens-auto
                        min-h-[30px] sm:min-h-[34px]
                    "
                >
                    {item.title}
                </p>
            </div>

            <svg
                className="w-[95px] sm:w-[110px] h-[48px] sm:h-[54px] transition-all ease-in-out duration-300 -mt-[1px]"
                style={{ fill: hovered ? "#d2691e" : "#F0F3F2" }}
                viewBox="0 0 100 50"
            >
                <path d="M 0,0 Q 45,6 50,50 Q 55,6 100,0" />
            </svg>
        </button>
    );
}

export default Solutions;
