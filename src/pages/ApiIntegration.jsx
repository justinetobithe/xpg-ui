import React, { useEffect, useRef, useState, useCallback } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckSquare } from "lucide-react";

import heroMobile from "@/assets/images/solutions/simple-flexible-mobile.png";
import heroDesktop from "@/assets/images/solutions/simple-flexible.jpg";
import ctaBg from "@/assets/images/solutions/cta.jpg";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";

function ApiIntegration() {
    const { t } = useTranslation();
    const [games, setGames] = useState([]);
    const [display, setDisplay] = useState("lg");
    const [isMobile, setIsMobile] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "liveGames"), orderBy("priority", "asc")),
            (snapshot) => {
                setGames(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        );
        return () => unsubscribe();
    }, []);

    const checkScreenSize = useCallback(() => {
        const width = window.innerWidth;
        let newDisplay = "sm";
        if (width > 1024) newDisplay = "xl";
        else if (width > 768) newDisplay = "lg";
        else if (width > 425) newDisplay = "md";
        setDisplay(newDisplay);
        setIsMobile(newDisplay === "sm");
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [checkScreenSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="API Integration – Simple & Flexible Live Casino Integration"
                description="Integrate XPG Live Dealer Casino System with a simple and flexible API. Seamless wallet or balance transfer supported with fast onboarding."
                url="/solution/api-integration"
                image={heroDesktop}
                keywords="XPG API integration, live casino API, seamless wallet, balance transfer, live dealer integration"
            />

            <main
                className="relative w-full bg-no-repeat bg-top bg-cover md:h-[70vh] h-[100vh] bg-center flex items-center"
                style={{
                    backgroundImage: `url(${display === "sm" ? heroMobile : heroDesktop})`,
                }}
            >
                <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 34%, rgba(0,  0, 0, 0) 100%)",
                    }}
                />
                <div className="container w-full h-full flex md:justify-normal justify-center relative mt-16">
                    <h1
                        style={{ textShadow: "1px 1px 0 #7e7e7e, 2px 2px 0 #514f4f" }}
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-6 md:mx-10 block ${display === "sm" ? "w-full text-center" : "w-[350px] text-justify"
                            }`}
                    >
                        {t("apiIntegration.heroTitleLine1")}
                        <br />
                        {t("apiIntegration.heroTitleLine2")}
                    </h1>

                    {isMobile && (
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
                    )}
                </div>
            </main>

            <section ref={itemRef} className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center">
                    <div className="flex flex-col items-center pt-8 pb-6">
                        <div className="border-t border-t-[#ff7f50] w-[8rem] py-1" />
                        <h1 className="lg:text-3xl md:text-2xl text-xl uppercase">
                            {t("apiIntegration.sectionTitle.pre")}{" "}
                            <b className="font-extrabold">
                                {t("apiIntegration.sectionTitle.highlight")}
                            </b>
                        </h1>
                        <div className="border-b border-b-[#ffa500] w-[8rem] py-1" />
                    </div>

                    <div className="flex flex-col items-center pt-6 pb-6 w-full">
                        <p className="text-justify md:text-base font-regular px-2 md:px-[1.8em] mb-3 tracking-tight w-full">
                            {t("apiIntegration.introText")}
                        </p>

                        <div className="w-full">
                            <h2 className="lg:text-3xl md:text-2xl text-xl uppercase my-6 text-center">
                                {t("apiIntegration.subSectionTitle.pre")}{" "}
                                <b className="font-extrabold text-primary">
                                    {t("apiIntegration.subSectionTitle.highlight")}
                                </b>
                            </h2>

                            <div className="md:hidden w-full px-2">
                                <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-gray-100">
                                    <div className="bg-[#f5f5f5] px-4 py-6 text-center flex items-center justify-center min-h-[140px]">
                                        <div>
                                            <div className="text-primary font-extrabold text-4xl leading-none">
                                                {(t("apiIntegration.xpgLiveDealerCasinoSystem.apiIntegration.title").match(
                                                    /^(\d+\+?)/
                                                ) || ["", ""])[1]}
                                            </div>
                                            <div className="mt-2 text-xs font-semibold tracking-wide text-gray-900">
                                                {t("apiIntegration.xpgLiveDealerCasinoSystem.apiIntegration.title")
                                                    .replace(/^(\d+\+?)/, "")
                                                    .trim()
                                                    .toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#dfe7e4] px-4 py-6 text-center flex items-center justify-center min-h-[140px]">
                                        <div>
                                            <div className="text-primary font-extrabold text-4xl leading-none">
                                                {games?.length || 0}
                                            </div>
                                            <div className="mt-2 text-xs font-semibold tracking-wide text-gray-900">
                                                {t("apiIntegration.xpgLiveDealerCasinoSystem.games.title").toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#e9efed] px-4 py-6 text-center flex items-center justify-center min-h-[140px]">
                                        <div>
                                            <div className="text-primary font-extrabold text-4xl leading-none">
                                                {(t("apiIntegration.xpgLiveDealerCasinoSystem.partners.title").match(
                                                    /^(\d+\+?)/
                                                ) || ["", ""])[1]}
                                            </div>
                                            <div className="mt-2 text-xs font-semibold tracking-wide text-gray-900">
                                                {t("apiIntegration.xpgLiveDealerCasinoSystem.partners.title")
                                                    .replace(/^(\d+\+?)/, "")
                                                    .trim()
                                                    .toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#f3f7f5] px-4 py-6 text-center flex items-center justify-center min-h-[140px]">
                                        <div>
                                            <div className="text-primary font-extrabold text-4xl leading-none">
                                                {(t("apiIntegration.xpgLiveDealerCasinoSystem.virtualGames.title").match(
                                                    /^(\d+\+?)/
                                                ) || ["", ""])[1]}
                                            </div>
                                            <div className="mt-2 text-xs font-semibold tracking-wide text-gray-900">
                                                {t("apiIntegration.xpgLiveDealerCasinoSystem.virtualGames.title")
                                                    .replace(/^(\d+\+?)/, "")
                                                    .trim()
                                                    .toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:grid grid-cols-2 gap-0 overflow-hidden rounded-md">
                                <div className="bg-[#f5f5f5] p-8 md:p-12 text-center flex flex-col items-center justify-center md:min-h-[220px]">
                                    <div className="text-primary font-extrabold uppercase text-xl">
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.apiIntegration.title")}
                                    </div>
                                    <p className="mt-4 text-base text-gray-800 max-w-[520px]">
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.apiIntegration.description")}
                                    </p>
                                </div>

                                <div className="bg-[#dfe7e4] p-8 md:p-12 text-center flex flex-col items-center justify-center md:min-h-[220px]">
                                    <div className="text-primary font-extrabold text-xl">
                                        {games?.length || 0}{" "}
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.games.title")}
                                    </div>
                                    <p className="mt-4 text-base text-gray-800 max-w-[620px]">
                                        {games?.length
                                            ? games.map((game, i) => (
                                                <span key={game.id}>
                                                    {game.name}
                                                    {i < games.length - 1 && ", "}
                                                </span>
                                            ))
                                            : t("apiIntegration.gamesBox.noGames")}
                                    </p>
                                </div>

                                <div className="bg-[#e9efed] p-8 md:p-12 text-center flex flex-col items-center justify-center md:min-h-[220px]">
                                    <div className="text-primary font-extrabold text-xl">
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.partners.title")}
                                    </div>
                                    <p className="mt-4 text-base text-gray-800 max-w-[620px]">
                                        BetSoft, 1xBet, EveryMatrix, Pronet Gaming, and{" "}
                                        <Link to="/company/partners" className="underline font-semibold">
                                            others
                                        </Link>
                                        .
                                    </p>
                                </div>

                                <div className="bg-[#f3f7f5] p-8 md:p-12 text-center flex flex-col items-center justify-center md:min-h-[220px]">
                                    <div className="text-primary font-extrabold text-xl">
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.virtualGames.title")}
                                    </div>
                                    <p className="mt-4 text-base text-gray-800 max-w-[620px]">
                                        {t("apiIntegration.xpgLiveDealerCasinoSystem.virtualGames.description")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="w-full h-full bg-center bg-fixed mt-10 rounded-xl overflow-hidden"
                            style={{ backgroundImage: `url(${ctaBg})` }}
                        >
                            <div
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 34%, rgba(255, 255, 255, 0.4) 100%)",
                                }}
                                className="flex flex-col w-full h-full justify-center items-center py-6 px-4"
                            >
                                <h1 className="lg:text-3xl md:text-2xl text-xl uppercase mt-2 text-center">
                                    {t("apiIntegration.integrationProcess.title.pre")}{" "}
                                    <b className="font-extrabold">
                                        {t("apiIntegration.integrationProcess.title.highlight")}:
                                    </b>
                                </h1>

                                <div className="flex flex-col w-full h-full text-sm md:text-base lg:max-w-[780px] md:max-w-[614px] mt-6 mb-4">
                                    <ul className="space-y-2">
                                        {t("apiIntegration.integrationProcess.steps", {
                                            returnObjects: true,
                                        }).map((step, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                                <span className="text-sm font-regular md:text-base">
                                                    {step}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-full container h-full flex flex-row md:flex-nowrap flex-wrap md:gap-0 gap-4 mt-10 font-light tracking-[1.5]">
                            <div className="relative lg:h-[250px] bg-[#F5FAFA] w-full mx-0 md:mx-4 rounded-r-3xl rounded-bl-3xl flex flex-col p-6 pl-8 shadow-sm mb-5">
                                <div className="absolute right-4 -top-6">
                                    <div className="w-[86px] h-[54px] bg-[#FF9000] rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(255,144,0,.28)] ring-1 ring-white/70">
                                        <svg width="42" height="22" viewBox="0 0 42 22">
                                            <rect x="1" y="1" width="40" height="20" rx="10" fill="white" opacity="0.95" />
                                            <circle cx="14" cy="11" r="7" fill="#FF9000" />
                                            <circle cx="14" cy="11" r="3" fill="#3b3b3b" />
                                        </svg>
                                    </div>
                                </div>

                                <span className="text-primary font-extrabold md:text-2xl text-xl my-2">
                                    {t("apiIntegration.walletOptions.seamlessWallet.title")}
                                </span>

                                <ul className="md:text-base text-sm space-y-2">
                                    {t("apiIntegration.walletOptions.seamlessWallet.items", {
                                        returnObjects: true,
                                    }).map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                            <span className="text-sm font-regular md:text-base">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative lg:h-[250px] bg-[#F5FAFA] w-full mx-0 md:mx-4 rounded-r-3xl rounded-bl-3xl flex flex-col p-6 pl-8 shadow-sm">
                                <div className="absolute right-4 -top-6">
                                    <div className="w-[86px] h-[54px] bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(16,24,40,.12)] ring-1 ring-white/70">
                                        <svg width="40" height="40" viewBox="0 0 48 48">
                                            <g fill="none" stroke="#FF9000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M6 18h36" />
                                                <path d="M10 18V36m8-18V36m8-18V36m8-18V36" />
                                                <path d="M6 36h36" />
                                                <path d="M8 18l16-8 16 8" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>

                                <span className="text-primary font-extrabold md:text-2xl text-xl my-2">
                                    {t("apiIntegration.walletOptions.balanceTransfer.title")}
                                </span>

                                <ul className="md:text-base text-sm space-y-2">
                                    {t("apiIntegration.walletOptions.balanceTransfer.items", {
                                        returnObjects: true,
                                    }).map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                            <span className="text-sm font-regular md:text-base">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PrevNextNav prevTo="/solution/smart-studio" nextTo="/solution/white-label" />
        </section>
    );
}

export default ApiIntegration;
