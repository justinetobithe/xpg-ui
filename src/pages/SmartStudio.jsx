import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import image1 from "@/assets/images/solutions/smart-studio/image-1.png";
import image2 from "@/assets/images/solutions/smart-studio/image-2.png";
import image3 from "@/assets/images/solutions/smart-studio/image-3.png";

import Icon1 from "@/assets/images/solutions/smart-studio/1.png";
import Icon2 from "@/assets/images/solutions/smart-studio/2.png";
import Icon3 from "@/assets/images/solutions/smart-studio/3.png";
import Icon4 from "@/assets/images/solutions/smart-studio/4.png";

import heroMobile from "@/assets/images/solutions/smart-studio-mobile.jpg";
import heroDesktop from "@/assets/images/solutions/smart-studio.jpg";
import smartStudioGif1 from "@/assets/images/solutions/smart-studio-1.gif";
import smartStudioGif2 from "@/assets/images/solutions/smart-studio-2.gif";

import SEO from "@/components/SEO";
import PrevNextNav from "@/components/PrevNextNav";

function SmartStudio() {
    const { t } = useTranslation();
    const location = useLocation();
    const itemRef = useRef(null);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const heroBg = display === "sm" ? heroMobile : heroDesktop;

    return (
        <section className="w-full flex flex-col text-text pb-12 font-sans">
            <SEO
                title="Smart Studio – Custom Branded Live Casino Solution"
                description="XPG Smart Studio delivers fully customizable live casino environments with chroma key, tailored branding, and multi-game compatibility."
                url="/solution/smart-studio"
                image={heroDesktop}
                keywords="Smart Studio, XPG Smart Studio, live casino branding, chroma key studio, custom live dealer studio, white label live casino"
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
                        {t("smartStudio.heroTitleLine1")}
                        <br />
                        {t("smartStudio.heroTitleLine2")}
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

            <div ref={itemRef} className="w-full bg-white flex flex-col items-center">
                <div className="text-center pt-10 pb-4 px-4 max-w-[900px]">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary uppercase mb-4">
                        {t("smartStudio.title")}
                    </h2>
                    <h3 className="text-lg font-bold text-gray-700 mb-4">
                        {t("smartStudio.subTitle")}
                    </h3>
                    <p className="text-base text-gray-700">
                        {t("smartStudio.description")}
                    </p>
                </div>

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 my-6">
                    <figure className="col-span-2 md:col-span-1 flex justify-center">
                        <div className="w-full rounded-[18px] p-[2px] border-[3px] border-[#ff8a3d] shadow-[0_0_0_2px_rgba(255,138,61,.2)]">
                            <img
                                src={image1}
                                alt="Smart Studio example 1"
                                className="w-full h-[220px] md:w-[420px] md:h-[260px] object-cover rounded-[12px]"
                                loading="lazy"
                            />
                        </div>
                    </figure>

                    <figure className="flex justify-center">
                        <div className="w-full rounded-[18px] p-[2px] border-[3px] border-[#ffa24b] shadow-[0_0_0_2px_rgba(255,162,75,.2)]">
                            <img
                                src={image2}
                                alt="Smart Studio example 2"
                                className="w-full h-[160px] md:w-[420px] md:h-[260px] object-cover rounded-[12px]"
                                loading="lazy"
                            />
                        </div>
                    </figure>

                    <figure className="flex justify-center">
                        <div className="w-full rounded-[18px] p-[2px] border-[3px] border-[#ff8a3d] shadow-[0_0_0_2px_rgba(255,138,61,.2)]">
                            <img
                                src={image3}
                                alt="Smart Studio example 3"
                                className="w-full h-[160px] md:w-[420px] md:h-[260px] object-cover rounded-[12px]"
                                loading="lazy"
                            />
                        </div>
                    </figure>
                </div>

                <section className="w-full bg-white py-10">
                    <div className="mx-auto w-full max-w-[900px] px-4 md:px-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#24324a] mb-4">
                            {t("smartStudio.aboutSmartStudio.title")}
                        </h2>
                        <p className="mb-3 text-[#445166]">
                            {t("smartStudio.aboutSmartStudio.description1")}
                        </p>
                        <p className="mb-3 text-[#445166]">
                            <strong className="text-primary">
                                {t("smartStudio.aboutSmartStudio.preTitle")}
                            </strong>{" "}
                            {t("smartStudio.aboutSmartStudio.description2")}
                        </p>
                        <p className="text-[#445166]">
                            {t("smartStudio.aboutSmartStudio.description3")}
                        </p>
                    </div>
                </section>

                <section className="bg-white py-16 w-full">
                    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-14">
                            {t("smartStudio.keyBenefits.title")}
                        </h2>

                        <div className="mx-auto w-full max-w-[1280px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 justify-items-center mt-4 pb-10">
                            {[Icon1, Icon2, Icon3, Icon4].map((icon, index) => (
                                <div
                                    key={index}
                                    className="w-full max-w-[300px] min-h-[250px] h-full flex flex-col items-center text-center p-4"
                                >
                                    <img
                                        src={icon}
                                        alt={t(`smartStudio.keyBenefits.items.${index}.title`)}
                                        className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-contain"
                                        loading="lazy"
                                    />

                                    <h2 className="uppercase text-base sm:text-lg font-extrabold text-primary leading-tight text-center mt-3 mb-2 md:h-[48px] lg:h-[60px] md:flex md:items-center md:justify-center">
                                        <span className="px-2">
                                            {t(`smartStudio.keyBenefits.items.${index}.title`)}
                                        </span>
                                    </h2>

                                    <p className="text-sm md:text-base leading-snug align-text break-words sm:break-normal [hyphens:auto] sm:[hyphens:none]">
                                        {t(`smartStudio.keyBenefits.items.${index}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full bg-white py-12">
                    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("smartStudio.customBranding.title")}
                            </h2>
                            <p className="mb-4">
                                {t("smartStudio.customBranding.description")}
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                {t("smartStudio.customBranding.items", {
                                    returnObjects: true,
                                }).map((item, idx) => (
                                    <li key={idx}>
                                        <strong>{item.title} — </strong>
                                        {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="lg:w-1/2 min-h-[350px] bg-center bg-cover rounded-md border-4 border-primary"
                            style={{ backgroundImage: `url(${smartStudioGif1})` }}
                            role="img"
                            aria-label="Smart Studio branding demo"
                        />
                    </div>
                </section>

                <section className="w-full bg-[#f0f0f0] py-12">
                    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 flex flex-col lg:flex-row gap-8">
                        <div
                            className="lg:w-1/2 min-h-[350px] bg-center bg-cover rounded-md border-4 border-primary"
                            style={{ backgroundImage: `url(${smartStudioGif2})` }}
                            role="img"
                            aria-label="Smart Studio compatibility demo"
                        />

                        <div className="lg:w-1/2">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("smartStudio.smartStudioCompatibility.title")}
                            </h2>
                            <p className="mb-4">
                                {t("smartStudio.smartStudioCompatibility.description")}
                            </p>

                            <ul className="list-disc pl-5 columns-2 text-sm">
                                {[
                                    "Roulette",
                                    "Auto Roulette",
                                    "Fast Roulette",
                                    "Galaxy Auto Roulette",
                                    "Speed Roulette",
                                    "Thunder Roulette",
                                    "Baccarat",
                                    "Turbo Baccarat",
                                    "Exquisite Speed Baccarat",
                                    "VIP Speed Baccarat",
                                    "Super Speed Baccarat",
                                    "Speed Baccarat",
                                    "Sic Bo",
                                    "Blackjack",
                                    "High Blackjack",
                                    "Unlimited Blackjack",
                                    "VIP Blackjack",
                                    "Lucky 7",
                                    "Dragon Tiger",
                                    "Fast Gold Dragon Tiger",
                                    "Andar Bahar",
                                    "Teen Patti 20",
                                    "20 Cards",
                                ].map((game, idx) => (
                                    <li key={idx}>{game}</li>
                                ))}
                            </ul>

                            <p className="text-xs mt-4 italic">
                                {t("smartStudio.smartStudioCompatibility.note")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-[#efefef] py-16 px-4">
                    <div className="mx-auto max-w-[900px] text-center">
                        <h3 className="text-3xl font-extrabold text-primary leading-tight mb-6">
                            {t("smartStudio.standOut.title")}
                        </h3>

                        <p className="text-sm text-[#5b687a] mb-2">
                            {t("smartStudio.standOut.description1")}
                        </p>

                        <p className="text-sm text-[#5b687a] mb-2">
                            {t("smartStudio.standOut.description2")}
                        </p>

                        <p className="text-sm text-[#5b687a]">
                            <Link
                                to="/contact"
                                className="text-primary font-extrabold hover:underline focus:underline"
                            >
                                {t("smartStudio.standOut.button")}
                            </Link>{" "}
                            {t(
                                "smartStudio.standOut.tail",
                                "about how XPG can bring your vision to life."
                            )}
                        </p>
                    </div>
                </section>

                <PrevNextNav
                    prevTo="/solution/printing-materials"
                    nextTo="/solution/api-integration"
                />
            </div>
        </section>
    );
}

export default React.memo(SmartStudio);
