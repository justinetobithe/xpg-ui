import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import Loader from "@/components/Loader";
import SEO from "@/components/SEO";

import inIcon from "@/assets/images/02_inter_fact.png";
import mg from "@/assets/images/011_mg_icon1.png";

import Multigames from "@/components/Multigames";

function GameDetails() {
    const { t, i18n } = useTranslation();
    const { gameId } = useParams();

    const categoriesRef = useRef(null);

    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(gameId || "multi-games");
    const [gameData, setGameData] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState("lg");
    const [isPlay, setIsPlay] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setSelectedGame(gameId || "multi-games");
    }, [gameId]);

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(
            query(collection(db, "liveGames"), orderBy("priority", "asc")),
            (snapshot) => {
                const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                setGames(data);
                if (selectedGame === "multi-games") {
                    setGameData(null);
                } else {
                    setGameData(data.find((g) => g.id === selectedGame) || null);
                }
                setLoading(false);
            }
        );
        return () => unsub();
    }, [selectedGame]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsPlay(false);
        setIsExpanded(false);
    }, [selectedGame]);

    useEffect(() => {
        const checkScreenSize = () => {
            const w = window.innerWidth;
            if (w > 1024) setDisplay("xl");
            else if (w > 768) setDisplay("lg");
            else if (w > 425) setDisplay("md");
            else setDisplay("sm");
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const heroBg = useMemo(() => {
        if (selectedGame === "multi-games") {
            return "https://firebasestorage.googleapis.com/v0/b/xpg-system.firebasestorage.app/o/WhatsApp%20Image%202025-02-28%20at%2020.41.13_6cd2e11f.jpg?alt=media&token=db0c3ae8-aac7-47d1-8a76-7b4775bb8392";
        }
        if (!gameData) return "";
        const isSmall = display === "md" || display === "sm" || display === "xm";
        return isSmall ? gameData.mobileCoverImage : gameData.cover;
    }, [selectedGame, gameData, display]);

    const titleText = useMemo(() => {
        if (selectedGame === "multi-games") return "Multigames";
        return (
            gameData?.translation?.[i18n.language]?.name ||
            gameData?.name ||
            ""
        );
    }, [selectedGame, gameData, i18n.language]);

    const handlePrevNext = useCallback(
        (dir) => {
            if (selectedGame === "multi-games") {
                if (dir === "prev") {
                    const last = games[games.length - 1];
                    if (last) setSelectedGame(last.id);
                } else {
                    const first = games[0];
                    if (first) setSelectedGame(first.id);
                }
                categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
                return;
            }

            const currentIndex = games.findIndex((g) => g.id === selectedGame);
            if (currentIndex === -1) {
                setSelectedGame("multi-games");
                categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
                return;
            }

            if (dir === "prev") {
                if (currentIndex > 0) setSelectedGame(games[currentIndex - 1].id);
                else setSelectedGame("multi-games");
            } else {
                if (currentIndex < games.length - 1)
                    setSelectedGame(games[currentIndex + 1].id);
                else setSelectedGame("multi-games");
            }

            categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        [games, selectedGame]
    );

    if (loading) return <Loader />;

    if (selectedGame !== "multi-games" && !gameData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
                <SEO
                    title="Game Not Found – XPG Live Games"
                    description="The game you are looking for could not be found."
                    url={`https://xprogaming.com/live-games/${gameId}`}
                    image={games?.[0]?.cover}
                    keywords="XPG live games, live dealer games, casino games"
                />
                <div className="text-center p-8 md:p-10 bg-gray-800 rounded-3xl shadow-lg max-w-xl w-full">
                    <h2 className="text-5xl font-extrabold text-red-500 mb-4">404</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {t("gameDetails.notFound.title")}
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 mb-6">
                        {t("gameDetails.notFound.description")}
                    </p>
                    <Link
                        to="/live-games"
                        className="inline-block px-6 py-3 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:opacity-90 transition"
                    >
                        {t("gameDetails.notFound.back")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white">
            <SEO
                title={
                    selectedGame === "multi-games"
                        ? "Multigames – XPG Live Casino"
                        : `${titleText} – XPG Live Games`
                }
                description={
                    selectedGame === "multi-games"
                        ? "Explore XPG Multigames collection."
                        : stripDescription(
                            gameData?.translation?.[i18n.language]?.description ||
                            gameData?.description
                        )
                }
                url={
                    selectedGame === "multi-games"
                        ? "https://xprogaming.com/live-games/multi-games"
                        : `https://xprogaming.com/live-games/${selectedGame}`
                }
                image={
                    selectedGame === "multi-games" ? games?.[0]?.cover : gameData?.cover
                }
                keywords="XPG live games, live dealer casino, blackjack, roulette, baccarat, multigames"
            />

            <main
                style={{ backgroundImage: `url(${heroBg})` }}
                className="relative w-full bg-no-repeat bg-center bg-cover h-[52vh] md:h-[60vh] lg:h-[70vh] flex items-end"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 100%)",
                    }}
                />
                <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-10 md:pb-14 lg:pb-16">
                    <h1
                        style={{ textShadow: "1px 1px 0 #7e7e7e, 2px 2px 0 #514f4f" }}
                        className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide"
                    >
                        {titleText}
                    </h1>
                </div>
            </main>

            <section ref={categoriesRef} className="w-full bg-white border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-2 md:px-8 py-2 md:py-0">
                    <div className="flex md:flex-wrap gap-0 overflow-x-auto no-scrollbar">
                        {games.map((game) => {
                            const active = game.id === selectedGame;
                            const label =
                                game?.translation?.[i18n.language]?.name || game.name;

                            return (
                                <button
                                    key={game.id}
                                    type="button"
                                    onClick={() => setSelectedGame(game.id)}
                                    className={[
                                        "shrink-0 md:shrink h-[88px] md:h-[110px] w-[110px] md:w-[120px] border-r border-gray-200 flex flex-col items-center justify-center px-2 transition",
                                        active
                                            ? "bg-white border-b-2 border-b-primary"
                                            : "bg-white hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    <img
                                        src={game.icon}
                                        alt={label}
                                        className={[
                                            "w-10 h-10 object-contain transition",
                                            active ? "grayscale-0 opacity-100" : "grayscale opacity-60",
                                        ].join(" ")}
                                        loading="lazy"
                                    />
                                    <p
                                        className={[
                                            "mt-2 text-[10px] md:text-xs uppercase font-semibold text-center leading-tight line-clamp-2",
                                            active ? "text-primary" : "text-gray-500",
                                        ].join(" ")}
                                    >
                                        {label}
                                    </p>
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setSelectedGame("multi-games")}
                            className={[
                                "shrink-0 md:shrink h-[88px] md:h-[110px] w-[110px] md:w-[120px] border-r border-gray-200 flex flex-col items-center justify-center px-2 transition",
                                selectedGame === "multi-games"
                                    ? "bg-white border-b-2 border-b-primary"
                                    : "bg-white hover:bg-gray-50",
                            ].join(" ")}
                        >
                            <img
                                src={mg}
                                alt={t("gameDetails.multiGames")}
                                className={[
                                    "w-10 h-10 object-contain transition",
                                    selectedGame === "multi-games"
                                        ? "grayscale-0 opacity-100"
                                        : "grayscale opacity-60",
                                ].join(" ")}
                                loading="lazy"
                            />
                            <p
                                className={[
                                    "mt-2 text-[10px] md:text-xs uppercase font-semibold text-center leading-tight line-clamp-2",
                                    selectedGame === "multi-games" ? "text-primary" : "text-gray-500",
                                ].join(" ")}
                            >
                                {t("gameDetails.multiGames")}
                            </p>
                        </button>
                    </div>
                </div>
            </section>

            {selectedGame !== "multi-games" && gameData && (
                <>
                    <section className="w-full bg-[#f6f7f8]">
                        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14">
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-32 h-px bg-[#ff7f50] mb-3" />
                                <h2 className="text-xl md:text-3xl font-extrabold uppercase text-black tracking-wide text-center">
                                    {titleText}
                                </h2>
                                <div className="w-32 h-px bg-[#ffa500] mt-3" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="text-text leading-relaxed">
                                    <div className="text-sm md:text-base text-justify">
                                        {(gameData?.translation?.[i18n.language]?.description ||
                                            gameData?.description ||
                                            "")
                                            .split(/\s+/)
                                            .map((word, index) => {
                                                const hide =
                                                    (display === "sm" || display === "md") &&
                                                    !isExpanded &&
                                                    index > 60;
                                                if (hide) return null;
                                                return (
                                                    <span key={index}>
                                                        {word}
                                                        {" "}
                                                    </span>
                                                );
                                            })}
                                    </div>

                                    {(display === "sm" || display === "md") && (
                                        <button
                                            type="button"
                                            onClick={() => setIsExpanded((v) => !v)}
                                            className="text-primary font-semibold text-sm underline mt-3 inline-block"
                                        >
                                            {isExpanded
                                                ? t("gameDetails.seeLess")
                                                : t("gameDetails.seeMore")}
                                        </button>
                                    )}
                                </div>

                                <div
                                    style={{ backgroundImage: `url(${gameData.highlightImage})` }}
                                    className="relative w-full aspect-video rounded-2xl overflow-hidden bg-center bg-cover shadow-md"
                                    role="img"
                                    aria-label="Game highlight"
                                >
                                    {!isPlay && gameData.highlightLink && (
                                        <button
                                            type="button"
                                            onClick={() => setIsPlay(true)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition"
                                            aria-label="Play highlight video"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-black/60 border-2 border-white flex items-center justify-center">
                                                <div className="ml-1 border-l-[22px] border-l-white border-y-[14px] border-y-transparent" />
                                            </div>
                                        </button>
                                    )}

                                    {isPlay && gameData.highlightLink && (
                                        <iframe
                                            src={gameData.highlightLink + "?autoplay=1"}
                                            width="100%"
                                            height="100%"
                                            className="absolute inset-0 w-full h-full"
                                            title="Game highlight"
                                            allow="autoplay; fullscreen"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-full bg-white">
                        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {gameData.gallery?.length > 0 && (
                                    <div className="w-full">
                                        <Swiper
                                            loop
                                            spaceBetween={10}
                                            navigation={false}
                                            thumbs={{
                                                swiper:
                                                    thumbsSwiper && !thumbsSwiper.destroyed
                                                        ? thumbsSwiper
                                                        : null,
                                            }}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="w-full h-[220px] md:h-[360px] lg:h-[350px] rounded-2xl overflow-hidden"
                                        >
                                            {gameData.gallery.map((image, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={image}
                                                        className="w-full h-full object-cover"
                                                        alt={`Gallery ${index + 1}`}
                                                        loading="lazy"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop
                                            watchSlidesProgress
                                            freeMode
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            spaceBetween={10}
                                            slidesPerView={
                                                display === "sm"
                                                    ? 4
                                                    : display === "md"
                                                        ? 5
                                                        : display === "lg"
                                                            ? 5
                                                            : 6
                                            }
                                            className="mt-3"
                                        >
                                            {gameData.gallery.map((image, index) => (
                                                <SwiperSlide key={index} className="!w-auto">
                                                    <div className="h-[64px] w-[96px] md:h-[72px] md:w-[110px] rounded-lg overflow-hidden opacity-70 hover:opacity-100 transition">
                                                        <img
                                                            src={image}
                                                            className="w-full h-full object-cover"
                                                            alt={`Thumb ${index + 1}`}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}

                                <div className="w-full border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={inIcon}
                                            alt=""
                                            loading="lazy"
                                            className="w-12 h-12 object-contain"
                                        />
                                        <h3 className="uppercase font-extrabold text-base md:text-lg text-black">
                                            {t("gameDetails.interestingFacts")}
                                        </h3>
                                    </div>

                                    <div className="space-y-2 text-text text-sm md:text-base text-justify">
                                        {(gameData?.translation?.[i18n.language]?.facts ||
                                            gameData?.facts ||
                                            "")
                                            .split(/\r?\n/)
                                            .filter(Boolean)
                                            .map((item, index) => (
                                                <p key={index}>{item.trim()}</p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {selectedGame === "multi-games" && <Multigames />}

            <nav className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10">
                <div className="flex items-center justify-between w-full">
                    <button
                        type="button"
                        onClick={() => handlePrevNext("prev")}
                        aria-label={t("previous")}
                        className="group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] whitespace-nowrap"
                    >
                        <span className="text-[#ff8a00] transition-transform duration-200 group-hover:-translate-x-1">
                            {(typeof i18n?.dir === "function"
                                ? i18n.dir()
                                : document?.dir || "ltr") === "rtl"
                                ? "»»"
                                : "««"}
                        </span>
                        <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                            {t("previous")}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handlePrevNext("next")}
                        aria-label={t("next")}
                        className="group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] whitespace-nowrap"
                    >
                        <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                            {t("next")}
                        </span>
                        <span className="text-[#ff8a00] transition-transform duration-200 group-hover:translate-x-1">
                            {(typeof i18n?.dir === "function"
                                ? i18n.dir()
                                : document?.dir || "ltr") === "rtl"
                                ? "««"
                                : "»»"}
                        </span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

function stripDescription(text = "", max = 160) {
    const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return clean.length > max ? clean.slice(0, max) + "..." : clean;
}

export default React.memo(GameDetails);
