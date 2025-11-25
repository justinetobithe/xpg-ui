import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "swiper/css";

import img1 from "@/assets/images/solutions/html_5_icon2.png";
import heroMobile from "@/assets/images/solutions/cross-platform-mobile.png";
import heroDesktop from "@/assets/images/solutions/cross-platform-lg.png";

import { img18, img19, img20, img21, cp1, cp2, cp3, cp4, cp5, cp6, cp7 } from "@/utils/images";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";
import FastImage from "@/components/FastImage";
import LazyBackground from "@/components/LazyBackground";

function HTML5Mobile() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);

    const [display, setDisplay] = useState("lg");
    const [isMobile, setIsMobile] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const checkScreenSize = useCallback(() => {
        const w = window.innerWidth;
        let next = "sm";
        if (w > 1024) next = "xl";
        else if (w > 768) next = "lg";
        else if (w > 425) next = "md";
        setDisplay(next);
        setIsMobile(next === "sm");
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [checkScreenSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        [heroDesktop, heroMobile, cp1, img18, img19].forEach((src) => {
            const im = new Image();
            im.src = src;
        });
    }, []);

    const heroBg = useMemo(
        () => (display === "sm" || display === "md" ? heroMobile : heroDesktop),
        [display]
    );

    const featureImages = useMemo(() => [img18, img19, img20, img21], []);
    const carouselImages = useMemo(() => [cp1, cp2, cp3, cp4, cp5, cp6, cp7], []);

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="HTML5 Mobile – Cross-Platform Live Casino"
                description="Deliver live casino games anywhere with XPG HTML5 Mobile. Fully responsive, browser-ready, and optimized for all devices."
                url="/solution/html5-mobile"
                image={heroDesktop}
                keywords="HTML5 mobile casino, XPG HTML5 mobile, cross platform live casino, responsive live dealer games"
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
                        {t("html5Mobile.titleLine1")}
                        <br />
                        {t("html5Mobile.titleLine2")}
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

            <section ref={itemRef} className="w-full bg-[#f0f0f0]">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col md:flex-row gap-8 py-8">
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-4">
                            <FastImage src={img1} alt="HTML5 Icon" className="w-[70px] h-auto object-contain" priority />
                            <h1 className="xl:text-3xl lg:text-2xl text-xl lg:pl-10 pl-14 md:pt-0 pt-6 uppercase text-text lg:py-[10px]">
                                {t("html5Mobile.sectionTitle.pre")}{" "}
                                <br className="lg:hidden md:block hidden" />
                                <b className="font-extrabold">
                                    {t("html5Mobile.sectionTitle.highlight")}
                                </b>
                            </h1>
                        </div>

                        <p className="text-justify text-sm font-normal md:text-base tracking-tight mt-[35px]">
                            {t("html5Mobile.intro")}
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-wrap justify-center gap-4">
                        {featureImages.map((img, index) => (
                            <div
                                key={img}
                                className="xl:w-[212px] lg:w-[156px] md:w-[124px] w-[120px] h-[170px] border-[#bfc9cf] border m-[2%] flex flex-col items-center p-[2%] bg-white"
                            >
                                <FastImage
                                    className="w-[calc(184px/2)] h-[94px] object-contain"
                                    src={img}
                                    alt={`Feature ${index + 1}`}
                                    priority={index === 0}
                                />
                                <p className="uppercase text-center md:text-sm text-xs">
                                    {index === 0 && (
                                        <>
                                            {t("html5Mobile.features.play")}{" "}
                                            <b>{t("html5Mobile.features.anywhere")}</b>{" "}
                                            {t("html5Mobile.features.at")}{" "}
                                            <b>{t("html5Mobile.features.anytime")}</b>
                                        </>
                                    )}
                                    {index === 1 && (
                                        <>
                                            {t("html5Mobile.features.playOn")}{" "}
                                            <b>{t("html5Mobile.features.anyDevice")}</b>
                                        </>
                                    )}
                                    {index === 2 && (
                                        <>
                                            {t("html5Mobile.features.playIn")}{" "}
                                            <b>{t("html5Mobile.features.anyBrowser")}</b>
                                        </>
                                    )}
                                    {index === 3 && (
                                        <>
                                            {t("html5Mobile.features.play")}{" "}
                                            <b>{t("html5Mobile.features.anyGame")}</b>{" "}
                                            {t("html5Mobile.features.of")}{" "}
                                            <b>{t("html5Mobile.features.choice")}</b>
                                        </>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col md:flex-row gap-8 py-8">
                    <div className="w-full lg:w-1/2">
                        <h2 className="xl:text-3xl lg:text-2xl text-xl md:pt-0 pt-6 uppercase text-text lg:py-[10px]">
                            {t("html5Mobile.sectionTitle2.pre")}{" "}
                            <br className="lg:hidden md:block hidden" />
                            <b className="font-extrabold">
                                {t("html5Mobile.sectionTitle2.highlight")}
                            </b>
                        </h2>
                        <p className="text-justify text-sm md:text-base mt-4">
                            {t("html5Mobile.sectionIntro2")}
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <Swiper
                            loop
                            spaceBetween={10}
                            navigation={false}
                            thumbs={{
                                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                            }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="w-full aspect-video xl:aspect-[4/3] lg:aspect-[3/2] md:aspect-[5/4] rounded-md overflow-hidden shadow"
                        >
                            {carouselImages.map((image, index) => (
                                <SwiperSlide key={image}>
                                    <FastImage
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        priority={index === 0}
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
                            spaceBetween={
                                display === "sm"
                                    ? 8
                                    : display === "md"
                                        ? 10
                                        : display === "lg"
                                            ? 12
                                            : 15
                            }
                            slidesPerView={
                                display === "sm"
                                    ? 3
                                    : display === "md"
                                        ? 4
                                        : display === "lg"
                                            ? 4
                                            : 6
                            }
                            className="thumbs mt-3 w-full overflow-hidden"
                        >
                            {carouselImages.map((image, index) => (
                                <SwiperSlide key={`${image}-thumb`} className="!w-auto">
                                    <button
                                        type="button"
                                        className="flex h-[70px] w-[105px] items-center justify-center opacity-70 hover:opacity-100 ease-in-out duration-300"
                                    >
                                        <FastImage
                                            src={image}
                                            className="block h-full w-full object-cover rounded border-2 border-primary"
                                            alt={`Thumb ${index + 1}`}
                                        />
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            <PrevNextNav prevTo="/solution/white-label" nextTo="/solution/private-tables" />
        </section>
    );
}

export default HTML5Mobile;
