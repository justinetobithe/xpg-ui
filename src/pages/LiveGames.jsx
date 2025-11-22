import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "@/components/SEO";

function LiveGames() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const touchStartPos = useRef({ x: 0, y: 0 });

    const [games, setGames] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "liveGames"), orderBy("priority", "asc")),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGames(data);
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const handleTouchStart = useCallback((e) => {
        touchStartPos.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    }, []);

    const handleTouchMove = useCallback((e) => {
        const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
        const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
        if (dx > 10 || dy > 10) e.preventDefault();
    }, []);

    const handleCardActivate = useCallback(
        (id) => navigate(`/live-games/${id}`),
        [navigate]
    );

    const sliderSettings = useMemo(
        () => ({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 500,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
            ],
        }),
        []
    );

    const renderGameCard = useCallback(
        (game, index) => {
            const name = game?.translation?.[i18n.language]?.name || game?.name;
            const subtitle =
                game?.translation?.[i18n.language]?.subtitle || game?.subtitle;

            return (
                <div
                    key={game.id || index}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    className="relative w-full max-w-[300px] mx-auto group mb-4"
                >
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCardActivate(game.id)}
                        onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            handleCardActivate(game.id)
                        }
                        className="cursor-pointer bg-white h-[350px] flex flex-col overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                        style={{
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "2px",
                            borderBottomLeftRadius: "60px",
                            borderBottomRightRadius: "2px",
                        }}
                        aria-label={name ?? "View game"}
                    >
                        <div
                            className="w-full h-[200px] overflow-hidden"
                            style={{
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "2px",
                            }}
                        >
                            <img
                                src={game.imageURL}
                                alt={name || "Game"}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col flex-grow justify-between px-5 py-6 text-center">
                            <div>
                                <h3 className="text-lg font-bold text-orange-500 uppercase tracking-wide leading-snug min-h-[35px]">
                                    {name}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed min-h-[30px]">
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
        [handleCardActivate, handleTouchMove, handleTouchStart, i18n.language]
    );

    if (isLoading) return null;

    return (
        <section className="bg-white py-8 transition-all duration-300 ease-in-out">
            <SEO
                title="Live Games – XPG Live Dealer Casino"
                description="Browse XPG’s full catalog of live dealer games including Blackjack, Baccarat, Roulette and more."
                url="https://xprogaming.com/live-games"
                image={games?.[0]?.imageURL}
                keywords="XPG live games, live dealer casino, blackjack live, baccarat live, roulette live"
            />

            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="text-center mt-16">
                    <div className="before:block before:w-[120px] before:h-[1px] before:bg-orange-500 before:mx-auto before:mb-4" />
                    <h2 className="text-2xl font-normal uppercase tracking-wide text-gray-800 font-montserrat">
                        {t("liveGames.live")}{" "}
                        <span className="font-bold text-black">
                            {t("liveGames.games")}
                        </span>
                    </h2>
                    <div className="after:block after:w-[120px] after:h-[1px] after:bg-orange-500 after:mx-auto after:mt-4" />
                </div>

                {isMobile ? (
                    <div className="pt-4 pb-4">
                        <Slider {...sliderSettings}>
                            {games.map((game, index) => (
                                <div key={game.id || index}>{renderGameCard(game, index)}</div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
                        {games.map((game, index) => renderGameCard(game, index))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default React.memo(LiveGames);
