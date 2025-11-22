import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pokerTableImg from "@/assets/images/poker-table.jpg";

const isIOS = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

function WorkTogether() {
    const { t } = useTranslation();
    const [bgAttachment, setBgAttachment] = useState("bg-fixed");

    useEffect(() => {
        const isMobileOrIOS =
            isIOS() || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobileOrIOS) {
            setBgAttachment("bg-scroll");
        }
    }, []);

    return (
        <section
            className={`relative w-full h-[320px] md:h-[400px] ${bgAttachment} bg-center bg-cover bg-no-repeat flex items-center justify-center overflow-hidden`}
            style={{
                backgroundImage: `url(${pokerTableImg})`,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 140 70"
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[70px] z-10"
            >
                <path d="M 0,0 Q 65,5 70,70 Q 75,5 140,0" fill="#E5E7EB" stroke="none" />
            </svg>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-0" />

            <div className="relative z-20 w-full max-w-[1280px] px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-6 text-white text-center md:text-left mt-[40px] md:mt-0">
                <div className="text-2xl md:text-4xl uppercase leading-snug font-semibold">
                    <strong>{t("workTogether.taglineLine1")}</strong>
                    <br />
                    {t("workTogether.taglineLine2")}
                </div>

                <div>
                    <a
                        href="/contact"
                        className="inline-block px-6 py-3 rounded-full border-2 border-[#f68307] text-white bg-transparent hover:bg-[#f68307] hover:text-white transition-all duration-300 text-base uppercase shadow-md"
                    >
                        {t("workTogether.workTogether")}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default WorkTogether;
