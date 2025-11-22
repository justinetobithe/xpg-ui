import React, { useEffect, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import mg1 from "@/assets/images/mg-1.jpg";
import mg2 from "@/assets/images/mg-2.jpg";
import mg3 from "@/assets/images/mg-3.jpg";

function Multigames() {
    const [display, setDisplay] = useState("lg");

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width > 1024) setDisplay("xl");
            else if (width > 768) setDisplay("lg");
            else if (width > 425) setDisplay("md");
            else setDisplay("sm");
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <section className="w-full h-full flex flex-col justify-center pb-10 bg-white">
            <div className="w-full flex flex-col items-center font-sans mb-6 px-4 md:px-8">
                <div className="pt-8 pb-4 flex flex-col items-center">
                    <div className="w-32 h-[1px] bg-[#ff7f50]" />
                    <h1 className="mt-3 font-bold text-2xl md:text-3xl tracking-[0.04em] text-black uppercase text-center">
                        Multigames
                    </h1>
                    <div className="mt-3 w-32 h-[1px] bg-[#ffa500]" />
                </div>

                <div className="w-full max-w-[1280px] flex flex-col gap-6 py-4">
                    <p className="w-full font-regular text-sm md:text-base leading-relaxed text-justify text-text">
                        Multigames as a unique feature is available in XPG Game Lobby. It
                        allows most hardcore and avid players to go wild playing and
                        monitoring up to 4 games simultaneously on one screen, getting
                        multiplied entertainment, unforgettable excitement and potential
                        winnings. This offers the same experience as playing the game’s
                        standalone versions, in the same user interface but more compact,
                        and ensure the same seamless gameplay with up to 4 games at the same
                        time.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-center">
                <Swiper
                    loop
                    spaceBetween={10}
                    navigation={display === "sm" || display === "md"}
                    modules={[FreeMode, Navigation]}
                    className="w-full h-[236px]"
                    slidesPerView={
                        display === "sm"
                            ? 1
                            : display === "md"
                                ? 2
                                : 3
                    }
                >
                    {[mg1, mg2, mg3].map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex w-full h-full items-center justify-center">
                                <img
                                    src={image}
                                    alt={`Multigames ${index + 1}`}
                                    className="block w-full h-full object-cover rounded-md"
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default React.memo(Multigames);
