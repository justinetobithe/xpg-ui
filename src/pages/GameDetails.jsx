import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { gameId } = useParams();

    const itemRef = useRef(null);

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
                return;
            }

            const currentIndex = games.findIndex((g) => g.id === selectedGame);
            if (currentIndex === -1) {
                setSelectedGame("multi-games");
                return;
            }

            if (dir === "prev") {
                if (currentIndex > 0) setSelectedGame(games[currentIndex - 1].id);
                else setSelectedGame("multi-games");
            } else {
                if (currentIndex < games.length - 1) setSelectedGame(games[currentIndex + 1].id);
                else setSelectedGame("multi-games");
            }
        },
        [games, selectedGame]
    );

    if (loading) return <Loader />;

    if (selectedGame !== "multi-games" && !gameData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                <SEO
                    title="Game Not Found – XPG Live Games"
                    description="The game you are looking for could not be found."
                    url={`https://xprogaming.com/live-games/${gameId}`}
                    image={games?.[0]?.cover}
                    keywords="XPG live games, live dealer games, casino games"
                />
                <div className="text-center p-10 bg-gray-800 rounded-3xl shadow-lg">
                    <h2 className="text-5xl font-extrabold text-red-500 mb-6">404</h2>
                    <h3 className="text-3xl font-bold text-white mb-4">
                        {t("gameDetails.notFound.title")}
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                        {t("gameDetails.notFound.description")}
                    </p>
                    <Link
                        to="/live-games"
                        className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                    >
                        {t("gameDetails.notFound.back")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
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
                    selectedGame === "multi-games"
                        ? games?.[0]?.cover
                        : gameData?.cover
                }
                keywords="XPG live games, live dealer casino, blackjack, roulette, baccarat, multigames"
            />

            <main
                style={{ backgroundImage: `url(${heroBg})` }}
                className="relative w-full bg-no-repeat bg-center bg-cover md:h-[70vh] h-[100vh] min-h-[100px] flex items-center"
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
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm" ? "w-full text-center" : "w-[350px] text-justify"
                            }`}
                    >
                        {titleText}
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

            <div
                ref={itemRef}
                className="flex w-full container section h-full justify-center items-center text-primary"
            >
                <div className="hidden md:flex flex-row flex-wrap justify-center">
                    {games.map((game) => {
                        const active = game.id === selectedGame;
                        return (
                            <button
                                key={game.id}
                                type="button"
                                onClick={() => setSelectedGame(game.id)}
                                className={`w-[110px] h-[110px] border-2 ${active
                                        ? "grayscale-0 border-b-primary bg-[#f0f0f0]"
                                        : "grayscale border-b-slate-200"
                                    } hover:grayscale-0 border-transparent border-r-slate-200 flex flex-col items-center cursor-pointer hover:border-primary ease-in-out duration-500`}
                            >
                                <div style={{ width: "calc(184px / 3.5)" }}>
                                    <img
                                        src={game.icon}
                                        className="mx-auto pt-2 ease-in-out duration-300"
                                        alt={game.name}
                                        loading="lazy"
                                    />
                                </div>
                                <p className="text-xs font-medium text-center uppercase tracking-normal">
                                    {game.name}
                                </p>
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setSelectedGame("multi-games")}
                        className={`w-[110px] h-[110px] border-2 ${selectedGame === "multi-games"
                                ? "grayscale-0 border-b-primary bg-[#f0f0f0]"
                                : "grayscale border-b-slate-200"
                            } hover:grayscale-0 border-transparent border-r-slate-200 flex flex-col items-center cursor-pointer hover:border-primary ease-in-out duration-500`}
                    >
                        <div style={{ width: "calc(184px / 3.5)" }}>
                            <img
                                src={mg}
                                className="mx-auto pt-2 ease-in-out duration-300"
                                alt={t("gameDetails.multiGames")}
                                loading="lazy"
                            />
                        </div>
                        <p className="text-xs font-medium text-center uppercase tracking-normal">
                            {t("gameDetails.multiGames")}
                        </p>
                    </button>
                </div>
            </div>

            {selectedGame !== "multi-games" && gameData && (
                <>
                    <div className="bg-[#f0f0f0] w-full pb-[2.5em] flex flex-col items-center min-h-[435px]">
                        <div className="pt-8 pb-4 flex flex-col items-center">
                            <div className="w-[8rem] h-[1px] bg-[#ff7f50] m-[10px]" />
                            <h2 className="font-bold md:text-[2em] text-[1.5em] tracking-[0.04em] text-black uppercase">
                                {gameData.name}
                            </h2>
                            <div className="w-[8rem] h-[1px] bg-[#ffa500] m-[10px]" />
                        </div>

                        <div className="section flex xl:flex-row lg:flex-row flex-col lg:justify-between justify-center lg:items-start items-center text-text h-full gap-6 py-4">
                            <div className="xl:w-[60%] lg:w-1/2 w-full order-3 xl:order-1 lg:order-1">
                                {(gameData?.translation?.[i18n.language]?.description ||
                                    gameData?.description ||
                                    "")
                                    .split(/\r?\n/)
                                    .join(" ")
                                    .split(" ")
                                    .map((word, index) => {
                                        const hide =
                                            (display === "sm" || display === "md") &&
                                            !isExpanded &&
                                            index > 40;
                                        if (hide) return null;
                                        return (
                                            <span
                                                key={index}
                                                className="inline text-sm md:text-base leading-[1.5em]"
                                            >
                                                {word + " "}
                                            </span>
                                        );
                                    })}

                                {(display === "sm" || display === "md") && (
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded((v) => !v)}
                                        className="text-primary font-semibold text-sm underline mt-2 inline-block"
                                    >
                                        {isExpanded ? t("gameDetails.seeLess") : t("gameDetails.seeMore")}
                                    </button>
                                )}
                            </div>

                            <div
                                style={{ backgroundImage: `url(${gameData.highlightImage})` }}
                                className="bg-center bg-slate-200 bg-top bg-cover lg:w-[40%] md:w-[461px] w-full h-[260px] xl:h-[265px] lg:h-[166px] md:h-[258px] order-2 relative"
                                role="img"
                                aria-label="Game highlight"
                            >
                                {!isPlay && gameData.highlightLink && (
                                    <button
                                        type="button"
                                        onClick={() => setIsPlay(true)}
                                        className="hover:opacity-50 cursor-pointer absolute left-1/2 top-1/2 ml-[-40px] mt-[-40px] w-[80px] h-[80px] bg-black/60 rounded-full border-2 border-white transition-all ease-linear duration-500"
                                        aria-label="Play highlight video"
                                    >
                                        <div className="absolute top-1/2 left-1/2 mt-[-20px] ml-[-15px] border-l-[40px] border-l-white border-y-[20px] border-y-transparent" />
                                    </button>
                                )}

                                {isPlay && gameData.highlightLink && (
                                    <iframe
                                        src={gameData.highlightLink + "?autoplay=1"}
                                        width="100%"
                                        height="100%"
                                        className="w-full h-full absolute"
                                        title="Game highlight"
                                        allow="autoplay; fullscreen"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white section h-full py-[2.5em] flex justify-center">
                        <div className="flex flex-col lg:flex-row h-full gap-6 w-full">
                            {gameData.gallery?.length > 0 && (
                                <div className="xl:w-[55%] lg:w-[50%] h-full w-full">
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
                                        className="h-[226px] w-full xl:h-[422px] lg:h-[307px] md:h-[409px]"
                                    >
                                        {gameData.gallery.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="flex w-full h-full items-center justify-center">
                                                    <img
                                                        src={image}
                                                        className="block w-full h-full object-cover"
                                                        alt={`Gallery ${index + 1}`}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <Swiper
                                        updateOnWindowResize
                                        onSwiper={setThumbsSwiper}
                                        loop
                                        watchSlidesProgress
                                        freeMode
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        spaceBetween={12}
                                        slidesPerView={
                                            display === "sm"
                                                ? 4
                                                : display === "md"
                                                    ? 5
                                                    : display === "lg"
                                                        ? 4
                                                        : 6
                                        }
                                        className="thumbs mt-3 w-full flex justify-center"
                                    >
                                        {gameData.gallery.map((image, index) => (
                                            <SwiperSlide key={index} className="!w-auto">
                                                <button className="flex h-[70px] w-[105px] items-center justify-center opacity-70 hover:opacity-100 ease-in-out duration-300 p-1">
                                                    <img
                                                        src={image}
                                                        className="block h-full w-full object-cover rounded"
                                                        alt={`Thumb ${index + 1}`}
                                                        loading="lazy"
                                                    />
                                                </button>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}

                            <div className="w-full h-full border border-gray-200 min-h-[280px] p-4 rounded-tr-3xl rounded-b-3xl">
                                <div className="flex flex-row items-center">
                                    <img
                                        style={{ width: "calc(184px / 3)" }}
                                        src={inIcon}
                                        alt=""
                                        loading="lazy"
                                    />
                                    <h3 className="uppercase">{t("gameDetails.interestingFacts")}</h3>
                                </div>

                                <div className="flex flex-col px-4 text-text text-sm gap-2 text-justify">
                                    {(gameData?.translation?.[i18n.language]?.facts ||
                                        gameData?.facts ||
                                        "")
                                        .split(/\r?\n/)
                                        .map((item, index) => (
                                            <p key={index} className="text-sm md:text-base">
                                                {item.trim()}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedGame === "multi-games" && <Multigames />}

            <nav className="mx-auto w-full max-w-[1280px] px-4 md:px-8 mt-12">
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
