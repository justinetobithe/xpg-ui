import React, { useEffect, useRef, useState, useCallback } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

import heroMobile from "@/assets/images/solutions/printing-materials-mobile.png";
import heroDesktop from "@/assets/images/solutions/printing-materials.png";
import headlightImg from "@/assets/images/solutions/headlight.png";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";

function PrintingMaterials() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);

    const [brochure, setBrochure] = useState(null);
    const [display, setDisplay] = useState("lg");

    const checkScreenSize = useCallback(() => {
        const w = window.innerWidth;
        let next = "sm";
        if (w > 1024) next = "xl";
        else if (w > 768) next = "lg";
        else if (w > 425) next = "md";
        setDisplay(next);
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
        const unsub = onSnapshot(
            query(collection(db, "files"), where("type", "==", "Brochure")),
            (snapshot) => {
                const brochures = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBrochure(brochures.length ? brochures[0] : null);
            }
        );

        return () => unsub();
    }, []);

    const downloadFile = () => {
        if (brochure?.fileUrl) {
            window.open(brochure.fileUrl, "_blank", "noopener,noreferrer");
        }
    };

    const heroBg = display === "sm" ? heroMobile : heroDesktop;

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Printing Materials – Branded Brochures & Marketing Assets"
                description="Download XPG’s official brochures and printing materials to support your casino operations and marketing."
                url="https://xprogaming.com/solution/printing-materials"
                image={heroDesktop}
                keywords="Printing Materials, casino brochures, XPG brochures, live casino marketing kit, branded assets"
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
                        className={`text-white text-2xl md:text-4xl lg:text-6xl font-bold md:pt-[calc(15%-50px)] pt-[calc(40%-50px)] uppercase z-10 mx-10 block ${display === "sm"
                            ? "w-full text-center"
                            : "w-[350px] text-justify"
                            }`}
                    >
                        {t("printingMaterials.title")}
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

            <section ref={itemRef} className="w-full bg-[#f0f0f0]">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <div className="border-t border-[#ff7f50] w-32 py-1" />
                        <h2 className="text-xl xl:text-3xl uppercase text-center">
                            {t("printingMaterials.sectionTitle.pre")}{" "}
                            <b className="font-extrabold">
                                {t("printingMaterials.sectionTitle.highlight")}
                            </b>
                        </h2>
                        <div className="border-b border-[#ffa500] w-32 py-1" />
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center gap-8 mt-8">
                        <div
                            className="flex-1 w-full rounded-lg shadow-sm bg-center bg-cover border-4 border-primary min-h-[166px] h-[180px] md:h-[220px]"
                            style={{ backgroundImage: `url(${headlightImg})` }}
                            role="img"
                            aria-label="Printing materials preview"
                        />

                        <div className="flex-1 w-full flex flex-col justify-center items-start">
                            <p className="text-justify text-sm md:text-base tracking-tight">
                                {t("printingMaterials.description")}
                            </p>

                            {brochure?.fileUrl && (
                                <button
                                    type="button"
                                    onClick={downloadFile}
                                    className="mt-4 text-sm md:text-base flex items-center text-primary hover:underline"
                                >
                                    <Download className="w-4 h-4 mr-2 text-[coral]" />
                                    {brochure.name || t("printingMaterials.downloadButton")}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <PrevNextNav
                prevTo="/solution/private-tables"
                nextTo="/solution/smart-studio"
            />
        </section>
    );
}

export default React.memo(PrintingMaterials);
