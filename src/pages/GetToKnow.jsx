import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckSquare } from "lucide-react";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";
import FastImage from "@/components/FastImage";
import LazyBackground from "@/components/LazyBackground";

import { handArrow, shieldCheck, handShake, lightBulb } from "@/utils/images";

import heroDesktop from "@/assets/images/company/leading-trustworthy.jpg";
import heroMobile from "@/assets/images/company/leading-trustworthy-mobile.jpg";
import leftImage from "@/assets/images/company/left-2.png";
import rightImage from "@/assets/images/company/right-1.png";

function GetToKnow() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);
    const [display, setDisplay] = useState("lg");

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width > 1024) setDisplay("xl");
            else if (width > 768 && width <= 1024) setDisplay("lg");
            else if (width > 425 && width <= 768) setDisplay("md");
            else setDisplay("sm");
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        [heroDesktop, heroMobile, leftImage, rightImage].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const heroBg = useMemo(
        () => (display === "sm" || display === "md" ? heroMobile : heroDesktop),
        [display]
    );

    const coreItems =
        t("getToKnowXPG.coreValues.items", { returnObjects: true }) || [];

    const coreIcons = [handArrow, lightBulb, handShake, shieldCheck];

    const operatorItems =
        t("getToKnowXPG.benefits.forOperators.items", {
            returnObjects: true,
        }) || [];

    const playerItems =
        t("getToKnowXPG.benefits.forPlayers.items", {
            returnObjects: true,
        }) || [];

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Get to Know XPG – Leading & Trustworthy Live Casino Provider"
                description="Learn more about XPG’s vision, mission, and core values as a trusted B2B live casino software provider offering premium live dealer solutions to operators worldwide."
                url="/company/get-to-know"
                image={heroDesktop}
                keywords="XPG company, XPG mission, XPG vision, live casino provider, XProGaming, iGaming software, B2B casino solutions"
            />

            <main className="relative w-full md:h-[70vh] h-[100vh] flex items-center overflow-hidden bg-black">
                <LazyBackground
                    imageUrl={heroBg}
                    className="absolute inset-0 bg-no-repeat bg-top bg-cover bg-center w-full h-full"
                />
                <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 34%, rgba(0, 0, 0, 0) 100%)",
                    }}
                />
                <div className="container w-full h-full flex md:justify-normal justify-center relative mt-16">
                    <h1
                        style={{
                            textShadow: "1px 1px 0 #7e7e7e, 2px 2px 0 #514f4f",
                        }}
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm"
                                ? "w-full text-center"
                                : "w-[350px] text-justify"
                            }`}
                    >
                        {t("getToKnowXPG.heading.leading")}
                        <br />
                        {t("getToKnowXPG.heading.trustWorthy")}
                    </h1>

                    <div className="flex items-center justify-start md:hidden h-full absolute top-1/2 left-1/2 z-10">
                        <button
                            type="button"
                            onClick={() => {
                                itemRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                            className="absolute w-[24px] h-[24px] left-[48%] flex items-center justify-center top-0 animate-bounce"
                        >
                            <div className="h-full w-[24px] rotate-[-45deg] border-l border-b border-white" />
                        </button>
                    </div>
                </div>
            </main>

            <section
                ref={itemRef}
                className="w-full flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center pt-8 pb-6">
                    <div className="border-t border-t-[#ff7f50] w-[8rem] py-1" />
                    <h1 className="md:text-3xl text-xl uppercase">
                        {t("getToKnowXPG.heading.getToKnowXPG")}{" "}
                        <span className="font-extrabold">
                            {t("getToKnowXPG.heading.xpg")}
                        </span>
                    </h1>
                    <div className="border-b border-b-[#ffa500] w-[8rem] py-1" />
                </div>

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center justify-center pb-10">
                    <p className="text-justify break-words [hyphens:auto] md:text-base text-sm mb-4 tracking-tight">
                        {t("getToKnowXPG.intro")}
                    </p>

                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 mt-[50px] items-stretch">
                        <div className="relative flex flex-col h-full">
                            <h2 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white px-6 md:px-8 text-[#ff7f50] uppercase font-extrabold text-center leading-[0.9]">
                                <span className="block text-[clamp(28px,6vmin,48px)]">
                                    {t("getToKnowXPG.vision.title")}
                                </span>
                            </h2>

                            <div className="rounded-[28px] border-[4px] border-[#ff7f50] bg-white p-6 md:p-8 lg:p-6 pt-12 md:pt-10 h-full flex">
                                <p className="text-justify break-words [hyphens:auto] text-sm md:text-base leading-relaxed tracking-tight">
                                    {t("getToKnowXPG.vision.description")}
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-col h-full">
                            <h2 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white px-6 md:px-8 text-[#ff7f50] uppercase font-extrabold text-center leading-[0.9]">
                                <span className="block text-[clamp(28px,6vmin,48px)]">
                                    {t("getToKnowXPG.mission.title")}
                                </span>
                            </h2>

                            <div className="rounded-[28px] border-[4px] border-[#ff7f50] bg-white p-6 md:p-8 lg:p-6 pt-12 md:pt-10 h-full flex">
                                <p className="text-justify break-words [hyphens:auto] text-sm md:text-base leading-relaxed tracking-tight">
                                    {t("getToKnowXPG.mission.description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f0f0f0] flex flex-col items-center">
                <svg className="fill-white w-[140px] h-[70px]">
                    <path d="M 0,0 Q 65,5 70,70 Q 75,5 140,0" />
                </svg>

                <h1 className="md:text-3xl text-xl uppercase mt-4">
                    {t("getToKnowXPG.coreValues.core")}{" "}
                    <span className="font-extrabold">
                        {t("getToKnowXPG.coreValues.values")}
                    </span>
                </h1>

                <div className="mx-auto w-full max-w-[1280px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 justify-items-center mt-4 pb-10 px-4 md:px-8">
                    {coreItems.map((item, idx) => (
                        <div
                            key={item?.title || idx}
                            className="w-full max-w-[300px] min-h-[250px] h-full flex flex-col items-center text-center p-4"
                        >
                            <FastImage
                                src={coreIcons[idx % coreIcons.length]}
                                alt={item?.title || ""}
                                className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-contain"
                                priority={idx < 2}
                            />

                            <h2 className="uppercase text-base sm:text-lg font-extrabold text-primary leading-tight text-center mt-3 mb-2 md:h-[48px] lg:h-[60px] md:flex md:items-center md:justify-center">
                                {item?.title}
                            </h2>

                            <p className="text-sm md:text-base leading-snug break-words [hyphens:auto]">
                                {item?.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white">
                <div className="bg-white/90 w-full py-12">
                    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                        <h1 className="md:text-3xl text-2xl uppercase mb-10 text-center">
                            {t("getToKnowXPG.benefits.title")}
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-stretch">
                            <div className="lg:w-1/2 w-full">
                                <h2 className="uppercase font-extrabold text-lg mb-3 text-primary">
                                    {t("getToKnowXPG.benefits.forOperators.title")}
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                                    {operatorItems.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="lg:w-1/2 w-full rounded-xl shadow-xl border-4 border-primary overflow-hidden h-[280px] md:h-[340px] lg:h-[420px] bg-black">
                                <LazyBackground
                                    imageUrl={leftImage}
                                    className="w-full h-full bg-cover bg-center"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row-reverse gap-8 items-stretch">
                            <div className="lg:w-1/2 w-full">
                                <h2 className="uppercase font-extrabold text-lg mb-3 text-primary">
                                    {t("getToKnowXPG.benefits.forPlayers.title")}
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                                    {playerItems.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="lg:w-1/2 w-full rounded-xl shadow-xl border-4 border-primary overflow-hidden h-[280px] md:h-[340px] lg:h-[420px] bg-black">
                                <LazyBackground
                                    imageUrl={rightImage}
                                    className="w-full h-full bg-cover bg-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PrevNextNav prevTo="/company/fair-gaming" nextTo="/company/live-studios" />
        </section>
    );
}

export default GetToKnow;
