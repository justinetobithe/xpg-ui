import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import gamesImage from "@/assets/images/games_icon2.png";
import euStudiosImage from "@/assets/images/ml_icon2.png";
import html5Image from "@/assets/images/html_5_icon_2.png";
import whiteLabelImage from "@/assets/images/wl_icon2.png";

function FeatureSection({ itemRef }) {
    const { t } = useTranslation();

    const features = [
        {
            image: gamesImage,
            titleKey: "featureSection.games.title",
            descriptionKey: "featureSection.games.description",
            link: "/live-games",
        },
        {
            image: euStudiosImage,
            titleKey: "featureSection.euStudios.title",
            descriptionKey: "featureSection.euStudios.description",
            link: "/company/live-studios",
        },
        {
            image: html5Image,
            titleKey: "featureSection.html5.title",
            descriptionKey: "featureSection.html5.description",
            link: "/solution/html5-mobile",
        },
        {
            image: whiteLabelImage,
            titleKey: "featureSection.whiteLabel.title",
            descriptionKey: "featureSection.whiteLabel.description",
            link: "/solution/white-label",
        },
    ];

    return (
        <section
            className="bg-white py-8 transition-all duration-300 ease-in-out"
            ref={itemRef}
        >
            <div className="mx-auto w-full max-w-[1280px] px-4 py-4 md:px-8 md:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <Link
                            to={feature.link}
                            key={index}
                            className="flex flex-col items-center text-center p-3 md:p-4 transition-transform duration-300 ease-in-out hover:-translate-y-1"
                        >
                            <img
                                src={feature.image}
                                alt={t(feature.titleKey)}
                                className="w-[100px] h-[100px] object-contain"
                                loading="lazy"
                            />
                            <h3 className="text-sm md:text-lg font-semibold text-gray-800 uppercase mb-1 md:mb-2">
                                {t(feature.titleKey)}
                            </h3>
                            <p className="hidden md:block text-sm text-gray-600">
                                {t(feature.descriptionKey)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeatureSection;
