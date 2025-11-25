import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";
import FastImage from "@/components/FastImage";
import LazyBackground from "@/components/LazyBackground";

import partner1 from "@/assets/images/betsoft.png";
import partner2 from "@/assets/images/1xbet.png";
import partner3 from "@/assets/images/every-matrix.png";
import partner4 from "@/assets/images/pronet-gaming.png";
import partnersHero from "@/assets/images/company/partners.jpg";

import { fetchLiveGames } from "@/api/liveGames";

function Partners() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const itemRef = useRef(null);

    const [display, setDisplay] = useState("lg");
    const [games, setGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1024) setDisplay("xl");
            else if (width > 768) setDisplay("lg");
            else if (width > 425) setDisplay("md");
            else setDisplay("sm");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let alive = true;
        setLoadingGames(true);
        fetchLiveGames()
            .then((data) => {
                if (!alive) return;
                setGames(data || []);
                setLoadingGames(false);
            })
            .catch(() => {
                if (!alive) return;
                setGames([]);
                setLoadingGames(false);
            });
        return () => {
            alive = false;
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const partners = useMemo(
        () => [
            { logo: partner1, name: "Betsoft", link: "https://www.betsoft.com" },
            { logo: partner2, name: "1xBet", link: "https://1xbet.com" },
            { logo: partner3, name: "EveryMatrix", link: "https://everymatrix.com" },
            { logo: partner4, name: "Pronet Gaming", link: "https://pronetgaming.com" },
        ],
        []
    );

    const matchedGames = useMemo(() => {
        const popularGames = ["Blackjack", "Roulette", "Baccarat"];
        return (games || []).filter((game) =>
            popularGames.some((name) =>
                (game.name || "").toLowerCase().includes(name.toLowerCase())
            )
        );
    }, [games]);

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Our Partners – Trusted Live Casino & iGaming Collaborations"
                description="Discover XPG’s strategic partners in the iGaming industry, including leading casino platforms and providers that integrate our live casino solutions."
                url="/company/partners"
                image={partnersHero}
                keywords="XPG partners, Betsoft, 1xBet, EveryMatrix, Pronet Gaming, live casino partners, iGaming integrations"
            />

            <main className="relative w-full md:h-[70vh] h-[100vh] flex items-center overflow-hidden bg-black">
                <LazyBackground
                    imageUrl={partnersHero}
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
                        {t("ourPartners.pageTitle")}
                    </h1>

                    <div className="flex items-center justify-start md:hidden h-full absolute top-1/2 left-1/2 z-10">
                        <button
                            type="button"
                            onClick={() => itemRef.current?.scrollIntoView({ behavior: "smooth" })}
                            className="absolute w-[24px] h-[24px] left-[48%] flex items-center justify-center top-0 animate-bounce"
                        >
                            <div className="h-full w-[24px] rotate-[-45deg] border-l border-b border-white" />
                        </button>
                    </div>
                </div>
            </main>

            <section
                ref={itemRef}
                className="w-full border-t-4 border-t-primary py-16 bg-white"
            >
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        {t("ourPartners.sectionHeading.pre")}{" "}
                        <span className="text-primary">
                            {t("ourPartners.sectionHeading.highlight")}
                        </span>
                    </h2>

                    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-4xl mb-12">
                        {t("ourPartners.sectionDescription.intro")}{" "}
                        {!loadingGames &&
                            matchedGames.map((game, index) => (
                                <button
                                    key={game.id}
                                    type="button"
                                    onClick={() => navigate(`/live-games/${game.id}`)}
                                    className="text-primary font-semibold hover:text-primary-dark inline"
                                >
                                    {game.name}
                                    {index < matchedGames.length - 1 && <span>,&nbsp;</span>}
                                </button>
                            ))}
                        <Link to="/live-games" className="text-primary font-semibold ml-1">
                            {t("ourPartners.sectionDescription.andMore")}
                        </Link>
                        {t("ourPartners.sectionDescription.conclusion")}
                    </p>

                    <div className="mt-0 mb-10">
                        <h2 className="uppercase text-3xl md:text-4xl font-extrabold tracking-wide text-gray-800">
                            {t("ourPartners.partnersHeading.pre")}{" "}
                            <span className="text-primary">
                                {t("ourPartners.partnersHeading.highlight")}
                            </span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 mt-2">
                            {t("ourPartners.partnersSubheading")}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                        {partners.map((partner, idx) => (
                            <a
                                key={partner.name}
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center rounded-xl"
                            >
                                <FastImage
                                    src={partner.logo}
                                    alt={partner.name}
                                    fit="contain"
                                    className="w-full h-[88px] md:h-[96px] flex items-center justify-center"
                                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                                    priority={idx < 2}
                                />
                                <p className="text-gray-700 mt-4 font-semibold flex items-center gap-1">
                                    {partner.name}
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <PrevNextNav prevTo="/company/live-studios" nextTo="/company/fair-gaming" />
        </section>
    );
}

export default Partners;
