import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckSquare, Filter } from "lucide-react";

import heroMobile from "@/assets/images/solutions/private-table-mobile.png";
import heroDesktop from "@/assets/images/solutions/private-table-main.jpg";
import privateTableImg from "@/assets/images/solutions/private-table.jpg";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";

function PrivateTables() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);

    const [display, setDisplay] = useState("lg");
    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = useCallback(() => {
        const w = window.innerWidth;
        let next = "sm";
        if (w > 1024) next = "xl";
        else if (w > 768) next = "lg";
        else if (w > 425) next = "md";

        setDisplay(next);
        setIsMobile(next === "sm");
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [checkScreenSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const heroBg = display === "sm" ? heroMobile : heroDesktop;

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Private Tables – Custom VIP Live Dealer Rooms"
                description="Offer premium branded VIP experiences with XPG Private Tables. Fully customizable live dealer tables for exclusive audiences."
                url="/solution/private-tables"
                image={heroDesktop}
                keywords="Private Tables, VIP live dealer, custom live casino tables, branded live casino, XPG private tables"
            />

            <main
                className="relative w-full bg-no-repeat bg-top bg-cover md:h-[70vh] h-[100vh] bg-center flex items-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
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
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm"
                            ? "w-full text-center"
                            : "w-[350px] text-justify"
                            }`}
                    >
                        {t("privateTables.titleLine1")}
                        <br />
                        {t("privateTables.titleLine2")}
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

            <section ref={itemRef} className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center py-8">
                    <div className="flex flex-col items-center">
                        <div className="border-t border-t-[#ff7f50] w-32 py-1" />
                        <h1 className="md:text-3xl text-xl uppercase text-center">
                            {t("privateTables.sectionTitle.pre")}{" "}
                            <b className="font-extrabold">
                                {t("privateTables.sectionTitle.highlight")}
                            </b>
                        </h1>
                        <div className="border-b border-b-[#ffa500] w-32 py-1" />
                    </div>

                    <p className="text-justify md:text-base text-sm tracking-tight mt-6">
                        {t("privateTables.introParagraph")}
                    </p>
                </div>
            </section>

            <section className="w-full bg-[#f0f0f0]">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col lg:flex-row gap-8 py-8">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-lg xl:text-xl uppercase font-medium mb-4">
                            {t("privateTables.customizationTitle")}
                        </h2>

                        <ul className="space-y-2 text-sm md:text-base">
                            {t("privateTables.customizationOptions", {
                                returnObjects: true,
                            }).map((option, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                    <span>{option}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className="w-full lg:w-1/2 h-[240px] md:h-[320px] bg-center bg-cover border-4 border-primary rounded-md"
                        style={{ backgroundImage: `url(${privateTableImg})` }}
                        role="img"
                        aria-label="Private table example"
                    />
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8">
                    <div className="border-2 border-gray-200 p-6 rounded-r-[30px] rounded-bl-[30px] bg-white shadow-sm">
                        <h2 className="text-lg xl:text-xl uppercase font-medium mb-4 flex items-center">
                            <Filter className="w-5 h-5 mr-2 text-[#ff7f50]" />
                            {t("privateTables.brandAwarenessTitle")}
                        </h2>

                        <p className="text-justify text-sm md:text-base">
                            {t("privateTables.brandAwarenessDescription")}
                        </p>
                    </div>
                </div>
            </section>

            <PrevNextNav
                prevTo="/solution/html5-mobile"
                nextTo="/solution/printing-materials"
            />
        </section>
    );
}

export default PrivateTables;
