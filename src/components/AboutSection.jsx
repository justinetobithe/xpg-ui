import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LazyYouTube from "./LazyYouTube";
import cardsAndCoins from "../assets/images/cards-and-coin.png";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AboutSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const q = query(collection(db, "liveGames"), orderBy("priority", "asc"));
                const snapshot = await getDocs(q);
                const gamesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGames(gamesData);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    const popularGames = ["Blackjack", "Roulette", "Baccarat"];
    const matchedGames = games.filter((game) =>
        popularGames.some((name) =>
            game.name.toLowerCase().includes(name.toLowerCase())
        )
    );

    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return (
        <section className="bg-white py-8 transition-all duration-300 ease-in-out">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                    <div className="lg:w-1/2" data-aos="fade-up">
                        <div className="text-center mb-10">
                            <div className="w-[120px] h-[1px] bg-[#fc865a] mx-auto mb-3" />
                            <h2 className="text-[1.8em] font-bold uppercase text-[#222222] inline-block whitespace-nowrap">
                                <span className="text-gray font-medium">{t("aboutSection.title.xpg")} </span>
                                <span className="font-bold text-gray-800">{t("aboutSection.title.concept")}</span>
                            </h2>
                            <div className="w-[120px] h-[1px] bg-[#fc865a] mx-auto mt-3" />
                        </div>

                        <p className="text-sm text-gray-700 text-justify md:text-base mb-4">
                            {t("aboutSection.intro")}
                        </p>

                        <p className="text-sm text-gray-700 text-justify md:text-base mb-4">
                            {t("aboutSection.main.ourDiverse")}{" "}
                            {matchedGames.map((game, index) => (
                                <button
                                    key={game.id}
                                    onClick={() => navigate(`/live-games/${game.id}`)}
                                    className="text-primary font-semibold hover:text-primary-dark inline"
                                >
                                    {game.name}
                                    {index < matchedGames.length - 1 && <span>,&nbsp;</span>}
                                </button>
                            ))}
                            <Link to="/live-games" className="text-primary font-semibold ml-1">
                                {t("aboutSection.main.andMore")}
                            </Link>.{" "}
                            {t("aboutSection.main.everyGame")}
                        </p>

                        <p className="text-sm text-gray-700 text-justify md:text-base mb-4">
                            {t("aboutSection.main.manyOperators")}
                            <Link to="/contact" className="text-primary font-semibold">
                                {t("aboutSection.main.connectWithUs")}
                            </Link>{" "}
                            {t("aboutSection.main.today")}
                        </p>
                    </div>

                    <div
                        className="hidden lg:block relative w-full max-w-[700px] h-[500px] lg:w-1/2"
                        data-aos="fade-left"
                    >
                        <img
                            src={cardsAndCoins}
                            alt="cards and coins background"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                        />
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <LazyYouTube videoId="nuPyQxSozqw" title="XPG Concept Video" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
