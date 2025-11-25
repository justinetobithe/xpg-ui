import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";
import LazyBackground from "@/components/LazyBackground";

import heroMobile from "@/assets/images/company/casino-0280-mobile.png";
import heroDesktop from "@/assets/images/company/casino-0280.png";

function FairGaming() {
    const { t } = useTranslation();
    const [display, setDisplay] = useState("lg");
    const [collapse, setCollapse] = useState([]);
    const itemRef = useRef(null);

    const contents = useMemo(
        () => t("fairGaming.items", { returnObjects: true }) || [],
        [t]
    );

    const handleToggle = useCallback((id) => {
        setCollapse((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width > 1024) setDisplay("xl");
            else if (width > 768) setDisplay("lg");
            else if (width > 425) setDisplay("md");
            else setDisplay("sm");
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        [heroDesktop, heroMobile].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const heroBg = display === "sm" || display === "md" ? heroMobile : heroDesktop;

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Fair Gaming – Certified, Secure & Transparent Live Casino"
                description="Learn how XPG ensures fair gaming with certified RNGs, rigorous auditing, and comprehensive monitoring tools that protect both operators and players."
                url="/company/fair-gaming"
                image={heroDesktop}
                keywords="fair gaming, certified RNG, live casino fairness, XPG security, game audits, responsible gaming"
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
                        {t("fairGaming.heroTitle1")}
                        <br />
                        {t("fairGaming.heroTitle2")}
                    </h1>

                    <div className="flex items-center justify-start md:hidden h-full absolute top-1/2 left-1/2 z-10">
                        <button
                            type="button"
                            onClick={() => itemRef.current?.scrollIntoView({ behavior: "smooth" })}
                            className="absolute left-1/2 -translate-x-1/2 top-0 animate-bounce flex items-center justify-center"
                        >
                            <ChevronDown className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </main>

            <section ref={itemRef} className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center">
                    <div className="flex flex-col items-center pt-8 pb-6">
                        <div className="border-t border-t-[#ff7f50] w-[8rem] py-1" />
                        <h1 className="text-3xl uppercase text-center">
                            {t("fairGaming.title.pre")}{" "}
                            <b className="font-extrabold">
                                {t("fairGaming.title.highlight")}
                            </b>
                        </h1>
                        <div className="border-b border-b-[#ffa500] w-[8rem] py-1" />
                    </div>

                    <p className="text-justify md:text-base text-sm mb-6 tracking-tight">
                        {t("fairGaming.intro")}
                    </p>

                    <div className="w-full bg-[#e0e0e0] p-6 rounded-md mb-6">
                        <h2 className="xl:text-3xl lg:text-2xl text-xl uppercase font-bold text-center mb-4 text-primary">
                            {t("fairGaming.certificationTitle")}
                        </h2>
                        <p className="text-justify md:text-base text-sm tracking-tight">
                            {t("fairGaming.certificationDescription")}
                        </p>
                    </div>

                    <div className="w-full bg-white pb-4">
                        <h2 className="xl:text-3xl lg:text-2xl text-xl uppercase font-bold text-center mb-4 text-primary">
                            {t("fairGaming.toolsTitle")}
                        </h2>
                        <p className="text-justify md:text-base text-sm tracking-tight">
                            {t("fairGaming.toolsDescription")}
                        </p>
                    </div>

                    <div className="w-full flex flex-col gap-2 mt-4">
                        {Array.isArray(contents) &&
                            contents.map((item, index) => {
                                const isOpen = collapse.includes(index);
                                return (
                                    <div
                                        key={index}
                                        className="w-full flex flex-col text-[#333] border border-gray-200 rounded overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(index)}
                                            className="w-full flex flex-row min-h-[92px] bg-[#f0f0f0] items-center px-4 cursor-pointer text-left"
                                        >
                                            <p className="xl:text-2xl lg:text-xl text-lg font-extrabold text-primary pr-8">
                                                {`0${index + 1}`}
                                            </p>
                                            <div className="flex items-center justify-between flex-1">
                                                <p className="xl:text-lg lg:text-base text-sm font-medium uppercase hover:text-primary">
                                                    {item.title}
                                                </p>
                                                {isOpen ? (
                                                    <ChevronUp className="w-4 h-4 text-[coral]" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-[coral]" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <p className="text-justify md:text-base text-sm tracking-tight px-5 py-2">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                    </div>

                    <p className="text-justify md:text-base text-sm tracking-tight mt-6">
                        {t("fairGaming.studioSafetyNote")}
                    </p>
                </div>
            </section>

            <PrevNextNav prevTo="/company/partners" nextTo="/company/get-to-know" />
        </section>
    );
}

export default FairGaming;
