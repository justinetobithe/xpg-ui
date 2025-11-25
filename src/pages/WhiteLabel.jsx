import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import img1 from "@/assets/images/solutions/casino-0766.png";
import img2 from "@/assets/images/solutions/laptop-desk.png";
import heroMobile from "@/assets/images/solutions/functional-transparent-mobile.png";
import heroDesktop from "@/assets/images/solutions/functional-transparent.jpg";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";
import FastImage from "@/components/FastImage";
import LazyBackground from "@/components/LazyBackground";

function WhiteLabel() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);

    const [display, setDisplay] = useState("lg");

    const checkScreenSize = useCallback(() => {
        const w = window.innerWidth;
        let next = "sm";
        if (w > 1024) next = "xl";
        else if (w > 768) next = "lg";
        else if (w > 425) next = "md";
        setDisplay(next);
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [checkScreenSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        [heroDesktop, heroMobile, img1, img2].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const heroBg = useMemo(
        () => (display === "sm" || display === "md" ? heroMobile : heroDesktop),
        [display]
    );

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="White Label – Fully Branded Live Casino Platform"
                description="Launch your own branded live casino with XPG White Label solutions. Fast setup, flexible deployment, and full operator control."
                url="/solution/white-label"
                image={heroDesktop}
                keywords="XPG white label, live casino white label, branded live dealer, casino turnkey solution"
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
                        style={{ textShadow: "1px 1px 0 #7e7e7e, 2px 2px 0 #514f4f" }}
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm" ? "w-full text-center" : "w-[350px] text-justify"
                            }`}
                    >
                        {t("whiteLabel.titleLine1")}
                        <br />
                        {t("whiteLabel.titleLine2")}
                    </h1>

                    <div className="flex items-center justify-start md:hidden h-full absolute top-1/2 left-1/2 z-10">
                        <button
                            type="button"
                            onClick={() =>
                                itemRef.current?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="absolute w-[24px] h-[24px] left-[48%] flex items-center justify-center top-0 animate-bounce"
                        >
                            <div className="h-full w-[24px] rotate-[-45deg] border-l border-b-white border-l-white border-b" />
                        </button>
                    </div>
                </div>
            </main>

            <section ref={itemRef} className="w-full bg-[#f0f0f0]">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center">
                    <div className="flex flex-col items-center pt-8 pb-6">
                        <div className="border-t border-t-[#ff7f50] w-[8rem] py-1" />
                        <h1 className="text-3xl uppercase text-center">
                            {t("whiteLabel.sectionTitle.pre")}{" "}
                            <b className="font-extrabold">
                                {t("whiteLabel.sectionTitle.highlight")}
                            </b>
                        </h1>
                        <div className="border-b border-b-[#ffa500] w-[8rem] py-1" />
                    </div>

                    {[1, 2, 3].map((i) => (
                        <p
                            key={i}
                            className="text-justify md:text-base text-sm mb-4 tracking-tight"
                        >
                            {t(`whiteLabel.introParagraph${i}`)}
                        </p>
                    ))}
                </div>

                <svg className="fill-[#f0f0f0] w-[140px] h-[70px] mx-auto mt-[-1px]">
                    <path d="M 0,0 Q 65,5 70,70 Q 75,5 140,0" />
                </svg>
            </section>

            <section className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col md:flex-row flex-wrap md:flex-nowrap mt-4 pb-[2em] items-start justify-center gap-11">
                    <div className="w-full md:w-[460px]">
                        <div className="w-full h-[50px] bg-[#ffa07a] flex flex-row items-center">
                            <p className="text-white font-bold text-2xl p-[10px] bg-[rgba(0,0,0,0.17)]">
                                01
                            </p>
                            <p className="text-white font-extrabold text-base uppercase pl-[15px]">
                                {t("whiteLabel.standAlone.title")}
                            </p>
                        </div>

                        <div className="w-full border-x border-b flex flex-col px-[1.8em] gap-4 py-[20px] md:py-[30px] md:min-h-[560px]">
                            <p className="text-justify md:text-base text-sm tracking-tight">
                                {t("whiteLabel.standAlone.paragraph")}
                            </p>
                            <FastImage
                                src={img1}
                                alt={t("whiteLabel.standAlone.title")}
                                className="mt-auto w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-[460px]">
                        <div className="w-full h-[50px] bg-[#ffa07a] flex flex-row items-center">
                            <p className="text-white font-bold text-2xl p-[10px] bg-[rgba(0,0,0,0.17)]">
                                02
                            </p>
                            <p className="text-white font-extrabold text-base uppercase pl-[15px]">
                                {t("whiteLabel.downloadClient.title")}
                            </p>
                        </div>

                        <div className="w-full border-x border-b flex flex-col px-[1.8em] gap-4 py-[20px] md:py-[30px] md:min-h-[560px]">
                            <p className="text-justify md:text-base text-sm tracking-tight">
                                {t("whiteLabel.downloadClient.paragraph")}
                            </p>
                            <FastImage
                                src={img2}
                                alt={t("whiteLabel.downloadClient.title")}
                                className="mt-auto w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <PrevNextNav
                prevTo="/solution/api-integration"
                nextTo="/solution/html5-mobile"
            />
        </section>
    );
}

export default WhiteLabel;
