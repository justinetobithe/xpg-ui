import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import {
    ourLiveStudiosImg1,
    ourLiveStudiosImg2,
    ourLiveStudiosImg3,
    ourLiveStudiosImg4,
    ourLiveStudiosImg5,
    ourLiveStudiosImg6,
    ourLiveStudiosImg7,
    houseRepeat,
    bulbSettings,
    musicRepeat,
    personBadge,
} from "@/utils/images";
import heroMobile from "@/assets/images/company/european-sophisticated-mobile.jpg";
import heroDesktop from "@/assets/images/company/european-sophisticated.jpg";
import casinoImage from "@/assets/images/company/casino-0648.jpg";
import studioImage from "@/assets/images/company/our-studio.jpg";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckSquare } from "lucide-react";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";

function LiveStudios() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const itemRef = useRef(null);

    const [display, setDisplay] = useState("lg");
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [games, setGames] = useState([]);

    const images = [
        ourLiveStudiosImg1,
        ourLiveStudiosImg2,
        ourLiveStudiosImg3,
        ourLiveStudiosImg4,
        ourLiveStudiosImg5,
        ourLiveStudiosImg6,
        ourLiveStudiosImg7,
    ];

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "liveGames"), orderBy("priority", "asc")),
            (snapshot) => {
                setGames(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        );
        return () => unsub();
    }, []);

    useEffect(() => {
        const check = () => {
            const w = window.innerWidth;

            if (w > 1024) setDisplay("xl");
            else if (w > 768) setDisplay("lg");
            else if (w > 425) setDisplay("md");
            else setDisplay("sm");
        };

        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const heroBg = display === "sm" ? heroMobile : heroDesktop;

    const popularGames = ["Blackjack", "Roulette", "Baccarat"];
    const matchedGames = games.filter((g) =>
        popularGames.some((name) =>
            g.name?.toLowerCase().includes(name.toLowerCase())
        )
    );

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Our Live Studios – European Sophisticated Live Casino Environment"
                description="Explore XPG’s state-of-the-art live studios with European sophisticated design, professional dealers, HD streaming, and tailored live casino environments for operators."
                url="/company/live-studios"
                image={heroDesktop}
                keywords="XPG live studios, live casino studios, European studio, live dealer studio, XProGaming studios, live casino streaming, professional dealers"
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
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm" ? "w-full text-center" : "w-[350px] text-justify"
                            }`}
                    >
                        {t("liveStudios.heroTitleLine1")}
                        <br />
                        {t("liveStudios.heroTitleLine2")}
                    </h1>

                    <div className="flex items-center justify-start md:hidden h-full absolute top-1/2 left-1/2 z-10">
                        <button
                            type="button"
                            onClick={() => {
                                itemRef.current?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="absolute w-[24px] h-[24px] left-[48%] flex items-center justify-center top-0 animate-bounce"
                        >
                            <div className="h-full w-[24px] rotate-[-45deg] border-l border-b-white border-l-white border-b" />
                        </button>
                    </div>
                </div>
            </main>

            <section
                ref={itemRef}
                className="w-full bg-[#f0f0f0] flex flex-col items-center"
            >
                <div className="flex flex-col items-center pt-8 pb-6">
                    <div className="border-t border-t-[#ff7f50] w-[8rem] py-1" />
                    <h2 className="md:text-3xl text-xl uppercase text-center md:text-left">
                        {t("liveStudios.sectionTitle")}{" "}
                        <b className="font-extrabold">
                            {t("liveStudios.sectionTitleBold")}
                        </b>
                    </h2>
                    <div className="border-b border-b-[#ffa500] w-[8rem] py-1" />
                </div>

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col items-center pb-10">
                    <p className="text-justify md:text-base text-sm mb-4 tracking-tight">
                        {t("liveStudios.description")}
                    </p>

                    <div className="w-full flex lg:flex-row flex-col gap-6 py-4 items-center">
                        <div className="lg:w-[55%] w-full flex flex-col">
                            <h3 className="text-2xl uppercase mb-4 text-center md:text-left">
                                {t("liveStudios.facilityTitle")}{" "}
                                <b className="font-extrabold">
                                    {t("liveStudios.facilityTitleBold")}
                                </b>
                            </h3>

                            <div className="flex">
                                <ul className="flex flex-col pr-4 text-sm md:text-base">
                                    {["equipment", "design", "technology"].map((key) => (
                                        <li key={key} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                            <span>{t(`liveStudios.features.${key}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="flex flex-col text-sm md:text-base">
                                    {["dealers", "atmosphere", "streaming"].map((key) => (
                                        <li key={key} className="flex items-start">
                                            <CheckSquare className="w-4 h-4 mr-2 mt-1 text-[#ff7f50] shrink-0" />
                                            <span>{t(`liveStudios.features.${key}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div
                            className="lg:w-[45%] w-full rounded-md shadow-md bg-center bg-cover border-4 border-primary aspect-[4/3]"
                            style={{ backgroundImage: `url(${casinoImage})` }}
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10">
                    <div className="mt-8 flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-[45%] w-full">
                            <Swiper
                                onSwiper={setMainSwiper}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                loop={false}
                                spaceBetween={10}
                                modules={[FreeMode, Navigation]}
                                className="w-full rounded-md overflow-hidden shadow aspect-[4/3]"
                            >
                                {images.map((image, idx) => (
                                    <SwiperSlide
                                        key={idx}
                                        className="flex items-center justify-center bg-black"
                                    >
                                        <img
                                            src={image}
                                            loading="lazy"
                                            className="w-full h-full object-cover border-4 border-primary"
                                            alt=""
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                loop={false}
                                freeMode
                                direction="horizontal"
                                modules={[FreeMode, Navigation]}
                                spaceBetween={12}
                                slidesPerView={
                                    display === "sm"
                                        ? 3
                                        : display === "md"
                                            ? 5
                                            : display === "lg"
                                                ? 5
                                                : 6
                                }
                                className="thumbs mt-3 w-full"
                            >
                                {images.map((image, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <SwiperSlide key={idx} className="!w-auto">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (mainSwiper) {
                                                        mainSwiper.slideTo(idx);
                                                    }
                                                    setActiveIndex(idx);
                                                }}
                                                className={`h-[70px] w-[105px] transition-opacity ${isActive
                                                    ? "opacity-100"
                                                    : "opacity-70 hover:opacity-100"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    className={`h-full w-full object-cover rounded border-4 ${isActive ? "border-orange-500" : "border-primary"
                                                        }`}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </button>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        <div className="lg:w-[55%] w-full flex flex-col justify-start">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {
                                        img: houseRepeat,
                                        key: "renovatedStudios",
                                        alt: "Renovated studios",
                                    },
                                    {
                                        img: bulbSettings,
                                        key: "cuttingEdgeTech",
                                        alt: "Cutting edge technologies",
                                    },
                                    {
                                        img: musicRepeat,
                                        key: "hdStreaming",
                                        alt: "Round-the-clock HD Streaming",
                                    },
                                    {
                                        img: personBadge,
                                        key: "femaleDealers",
                                        alt: "Professional female dealers",
                                    },
                                ].map(({ img, key, alt }, idx) => (
                                    <div
                                        key={idx}
                                        className="group rounded-xl border-4 border-primary bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
                                    >
                                        <div className="w-full flex items-center justify-center">
                                            <img
                                                src={img}
                                                alt={alt}
                                                className="block h-20 w-auto object-contain rounded"
                                            />
                                        </div>

                                        <h4 className="mt-3 text-xs md:text-base font-medium text-gray-800 leading-snug">
                                            {t(`liveStudios.section1.features.${key}`)}
                                        </h4>
                                    </div>
                                ))}
                            </div>

                            <p className="text-justify md:text-base text-sm mt-5">
                                {t("liveStudios.section1.paragraph1")}
                            </p>
                            <p className="text-justify md:text-base text-sm mt-3">
                                {t("liveStudios.section1.paragraph2")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f0f0f0] py-10">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
                                {t("liveStudios.section2.chromaKey.title")}
                            </h3>
                            <p className="text-justify md:text-base text-sm mb-4">
                                {t("liveStudios.section2.chromaKey.description")}
                            </p>

                            <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
                                {t("liveStudios.section2.tailoredStudios.title")}
                            </h3>
                            <p className="text-justify md:text-base text-sm">
                                {t("liveStudios.section2.tailoredStudios.descriptionPrefix")}{" "}
                                {matchedGames.map((game, index) => (
                                    <button
                                        key={game.id}
                                        type="button"
                                        onClick={() => navigate(`/live-games/${game.id}`)}
                                        className="text-primary font-semibold hover:text-primary inline"
                                    >
                                        {game.name}
                                        {index < matchedGames.length - 1 && <span>, </span>}
                                    </button>
                                ))}
                                <Link
                                    to="/live-games"
                                    className="text-primary font-semibold ml-1"
                                >
                                    {t("liveStudios.section2.tailoredStudios.andMore")}
                                </Link>
                                {t("liveStudios.section2.tailoredStudios.descriptionSuffix")}
                            </p>
                        </div>

                        <div
                            className="md:w-1/2 rounded-md min-h-[360px] md:min-h-[460px] lg:min-h-[520px] shadow bg-cover bg-center border-4 border-primary"
                            style={{ backgroundImage: `url(${studioImage})` }}
                        />
                    </div>

                    <p className="mt-8 text-justify md:text-base text-sm">
                        {t("liveStudios.section2.finalNote")}
                    </p>
                </div>
            </section>

            <PrevNextNav prevTo="/company/get-to-know" nextTo="/company/partners" />
        </section>
    );
}

export default LiveStudios;
