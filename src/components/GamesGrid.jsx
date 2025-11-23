import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function GamesGrid() {
    const { t, i18n } = useTranslation();
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 900 : false
    );
    const navigate = useNavigate();

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
            } catch (e) {
                console.error("Error fetching games:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    useEffect(() => {
        const check = () =>
            setIsMobile(typeof window !== "undefined" && window.innerWidth < 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const sliderSettings = useMemo(
        () => ({
            mobileFirst: true,
            dots: true,
            dotsClass: "xpg-slick-dots",
            appendDots: (dots) => (
                <div className="mt-5 w-full overflow-x-auto no-scrollbar">
                    <ul className="flex w-max mx-auto items-center gap-2 px-2">{dots}</ul>
                </div>
            ),
            customPaging: () => (
                <div className="w-2 h-2 rounded-full bg-gray-400/70 hover:bg-primary transition" />
            ),
            infinite: games.length > 1,
            speed: 450,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 640,
                    settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
            ],
        }),
        [games.length]
    );

    const handleCardClick = (id) => navigate(`/live-games/${id}`);

    const renderGameCard = (game) => (
        <div key={game.id} className="px-2 pb-2">
            <div
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(game.id)}
                onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && handleCardClick(game.id)
                }
                className="cursor-pointer bg-white flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "2px",
                    borderBottomLeftRadius: "60px",
                    borderBottomRightRadius: "2px",
                }}
                aria-label={
                    (game?.translation?.[i18n.language]?.name || game?.name) ?? "View game"
                }
            >
                <div
                    className="w-full aspect-[3/2] overflow-hidden"
                    style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "2px" }}
                >
                    <img
                        src={game.imageURL}
                        alt={game?.translation?.[i18n.language]?.name || game?.name || "Game"}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col flex-grow justify-between px-4 py-5 text-center min-h-[140px]">
                    <h3 className="text-base md:text-lg font-bold text-primary uppercase tracking-wide leading-snug line-clamp-2 min-h-[40px]">
                        {game?.translation?.[i18n.language]?.name || game?.name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 min-h-[36px] mt-1">
                        {game?.translation?.[i18n.language]?.subtitle || game?.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );

    if (isLoading) return null;

    return (
        <section className="relative bg-[#E5E7EB] py-10">
            <style>
                {`
          .xpg-slick-dots li button:before{display:none !important;}
          .xpg-slick-dots li{width:auto !important; height:auto !important;}
          .xpg-slick-dots li.slick-active div{background: var(--tw-primary, #ff8a00) !important;}
        `}
            </style>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 140 70"
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[70px] z-10"
            >
                <path d="M 0,0 Q 65,5 70,70 Q 75,5 140,0" fill="#fff" stroke="none" />
            </svg>

            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 relative z-10">
                <div className="text-center mt-16">
                    <div className="before:block before:w-[120px] before:h-[1px] before:bg-primary before:mx-auto before:mb-4" />
                    <h2 className="text-2xl font-normal uppercase tracking-wide text-gray-800 font-montserrat">
                        {t("liveGames.live")}{" "}
                        <span className="font-bold text-black">{t("liveGames.games")}</span>
                    </h2>
                    <div className="after:block after:w-[120px] after:h-[1px] after:bg-primary after:mx-auto after:mt-4" />
                </div>

                {isMobile ? (
                    <div className="pt-8 pb-4 -mx-2">
                        <Slider {...sliderSettings}>
                            {games.map((game) => renderGameCard(game))}
                        </Slider>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
                        {games.slice(0, 8).map((game) => renderGameCard(game))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default GamesGrid;
