import React, { useState, useEffect } from "react";
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
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const checkScreenSize = () =>
            setIsMobile(typeof window !== "undefined" && window.innerWidth < 900);

        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleCardClick = (id) => {
        navigate(`/live-games/${id}`);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const renderGameCard = (game, index) => (
        <div key={index} className="relative w-full max-w-[300px] mx-auto group mb-4">
            <div
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(game.id)}
                onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && handleCardClick(game.id)
                }
                className="cursor-pointer bg-white h-[350px] flex flex-col overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "2px",
                    borderBottomLeftRadius: "60px",
                    borderBottomRightRadius: "2px",
                }}
                aria-label={
                    (game?.translation?.[i18n.language]?.name || game?.name) ??
                    "View game"
                }
            >
                <div
                    className="w-full h-[200px] overflow-hidden"
                    style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "2px" }}
                >
                    <img
                        src={game.imageURL}
                        alt={
                            game?.translation?.[i18n.language]?.name ||
                            game?.name ||
                            "Game"
                        }
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col flex-grow justify-between px-5 py-6 text-center">
                    <div>
                        <h3 className="text-lg font-bold text-orange-500 uppercase tracking-wide leading-snug min-h-[35px]">
                            {game?.translation?.[i18n.language]?.name || game?.name}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed min-h-[30px]">
                            {game?.translation?.[i18n.language]?.subtitle || game?.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) return null;

    return (
        <section className="relative bg-[#E5E7EB] py-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 140 70"
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[70px] z-10"
            >
                <path d="M 0,0 Q 65,5 70,70 Q 75,5 140,0" fill="#fff" stroke="none" />
            </svg>

            <div className="absolute inset-0 bg-[#E5E7EB] z-0" />

            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 relative z-10">
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
                    <div className="pt-8 pb-4">
                        <Slider {...sliderSettings}>
                            {games.map((game, index) => (
                                <div key={index}>{renderGameCard(game, index)}</div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
                        {games.slice(0, 8).map((game, index) => renderGameCard(game, index))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default GamesGrid;
