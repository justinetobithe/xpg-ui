import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import LazyBackground from "./LazyBackground";
import { useQuery } from "@tanstack/react-query";
import { fetchSliders } from "../api/sliders";

function AppSlider({ itemRef }) {
    const { t, i18n } = useTranslation();

    const { data: slides = [], isLoading } = useQuery({
        queryKey: ["sliders"],
        queryFn: fetchSliders,
        staleTime: 1000 * 60 * 5,
    });

    const settings = useMemo(
        () => ({
            dots: true,
            infinite: true,
            speed: 600,
            fade: true,
            cssEase: "ease-in-out",
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            pauseOnHover: false,
            lazyLoad: "ondemand",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    },
                },
            ],
            className: "slides",
        }),
        []
    );

    if (isLoading) return <Loader />;

    return (
        <div className="w-full xl:h-[80vh] lg:h-[70vh] h-[100vh] overflow-hidden lg:pt-16">
            <Slider {...settings}>
                {slides.map((slide, idx) => {
                    const title =
                        slide?.translation?.[i18n.language]?.title || slide?.title;
                    const subtitle =
                        slide?.translation?.[i18n.language]?.subtitle || slide?.subtitle;
                    const buttonLabel =
                        slide?.translation?.[i18n.language]?.buttonLabel ||
                        slide?.buttonLabel;

                    const desktopImg = slide.imageThumbURL || slide.imageURL;
                    const mobileImg = slide.mobileThumbURL || slide.mobileImageUrl;

                    return (
                        <main
                            key={slide.id}
                            className="relative w-full xl:h-[70vh] lg:h-[60vh] h-[100vh] flex items-center"
                        >
                            <div
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 34%, rgba(0, 0, 0, 0) 100%)",
                                }}
                                className="w-full h-full absolute z-10 flex flex-col items-center bg-no-repeat mt-3"
                            >
                                <div className="container w-full h-1/2 md:h-1/3 lg:h-full flex flex-col justify-end lg:justify-center md:pt-0 lg:items-start items-center">
                                    <h1
                                        style={{
                                            textShadow: "1px 1px 0 #7e7e7e, 2px 2px 0 #514f4f",
                                        }}
                                        className="my-4 px-4 md:px-0 text-white md:text-start text-center text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-tight tracking-tight"
                                    >
                                        {title}
                                    </h1>

                                    <p
                                        style={{
                                            textShadow: "1px 1px 2px rgba(0, 0, 0, .7)",
                                        }}
                                        className="text-white text-xl max-w-xl tracking-tight md:px-0 px-4 text-center md:text-start"
                                    >
                                        {subtitle}
                                    </p>

                                    <div className="pt-6 md:block hidden">
                                        <a
                                            href={slide.buttonLink}
                                            className="py-2 px-6 uppercase rounded-full border-2 border-[#f68307] text-white bg-transparent transition-all duration-300 hover:bg-[#f68307]"
                                            style={{
                                                textShadow: "1px 1px 2px rgba(0, 0, 0, .7)",
                                            }}
                                        >
                                            {buttonLabel}
                                        </a>
                                    </div>

                                    <div className="mt-6 md:hidden block">
                                        <a
                                            href={slide.buttonLink}
                                            className="py-1 uppercase border-b-2 border-[#f68307] text-white text-base transition-all duration-300 hover:bg-[#f68307] hover:text-white"
                                            style={{
                                                textShadow: "1px 1px 2px rgba(0, 0, 0, .7)",
                                            }}
                                        >
                                            {buttonLabel}
                                            <i className="fa fa-angle-double-right ml-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <LazyBackground
                                imageUrl={desktopImg}
                                className="hidden md:block w-full min-h-screen"
                            />
                            <LazyBackground
                                imageUrl={mobileImg}
                                className="block md:hidden w-full min-h-screen"
                            />
                        </main>
                    );
                })}
            </Slider>
        </div>
    );
}

export default AppSlider;
