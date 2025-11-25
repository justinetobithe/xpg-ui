import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import FastImage from "@/components/FastImage";

import fair from "@/assets/images/company/cards-circle.png";
import know from "@/assets/images/company/xpg-logo-circle.png";
import partners from "@/assets/images/company/shaking-hands-circle.png";
import studios from "@/assets/images/company/camera-light-circle.png";

function Company() {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const contents = [
        {
            title: t("ourCompany.contents.getToKnowXPG.title"),
            color: "#f0f3f2",
            image: know,
            link: "/get-to-know",
        },
        {
            title: t("ourCompany.contents.ourLiveStudios.title"),
            color: "#f0f3f2",
            image: studios,
            link: "/live-studios",
        },
        {
            title: t("ourCompany.contents.ourPartners.title"),
            color: "#f0f3f2",
            image: partners,
            link: "/partners",
        },
        {
            title: t("ourCompany.contents.fairGaming.title"),
            color: "#f0f3f2",
            image: fair,
            link: "/fair-gaming",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        [know, studios, partners, fair].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <section className="bg-white py-8 px-4 md:px-20 transition-all duration-300 ease-in-out">
            <SEO
                title="Our Company – XPG Live Casino Software Provider"
                description="Discover XPG’s company overview, including who we are, our live studios, partners, and commitment to fair gaming as a leading live casino software provider."
                url="/company"
                image={know}
                keywords="XPG company, XPG live casino, XProGaming company, our company, live casino provider, XPG partners, XPG fair gaming, XPG live studios"
            />

            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mt-16">
                    <div className="w-[120px] h-px bg-orange-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-normal uppercase tracking-wide text-gray-800 inline-block font-sans">
                        {t("ourCompany.our")}{" "}
                        <span className="font-extrabold">{t("ourCompany.company")}</span>
                    </h2>
                    <div className="w-[120px] h-px bg-orange-500 mx-auto mt-4" />
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 justify-items-center">
                    {contents.map((item, i) => (
                        <div
                            key={item.title}
                            className={
                                i === contents.length - 1
                                    ? "md:col-span-3 md:justify-self-center"
                                    : ""
                            }
                        >
                            <Card
                                item={item}
                                index={i}
                                isHovered={isHovered}
                                setIsHovered={setIsHovered}
                                navigate={navigate}
                            />
                        </div>
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
            onClick={() => navigate("/company" + item.link)}
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
                    <FastImage
                        src={item.image}
                        alt={item.title}
                        className="relative z-10 rounded-full object-cover w-full h-full shadow-[0_0_22px_rgba(255,127,80,0.45)]"
                        priority={index < 3}
                        width={256}
                        height={256}
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

export default Company;
