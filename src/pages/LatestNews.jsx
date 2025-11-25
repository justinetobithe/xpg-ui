import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/api/news";
import FastImage from "@/components/FastImage";
import { previewText } from "@/utils/text";

function LatestNews() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const { data: newsData = [] } = useQuery({
        queryKey: ["news"],
        queryFn: fetchNews,
        staleTime: 1000 * 60 * 5,
    });

    const [filteredNews, setFilteredNews] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(
        t("news.recent") || "Recent"
    );
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
        if (!newsData.length) return;

        setFilteredNews(newsData);

        const uniqueYears = [
            ...new Set(newsData.map((n) => n.dateObject?.getFullYear())),
        ].sort((a, b) => b - a);

        setYears([t("news.recent") || "Recent", ...uniqueYears]);
    }, [newsData, t]);

    const handleYearFilter = (year) => {
        setSelectedYear(year);
        const recentLabel = t("news.recent") || "Recent";
        setFilteredNews(
            year === recentLabel
                ? newsData
                : newsData.filter((n) => n.dateObject?.getFullYear() === Number(year))
        );
    };

    const CustomPrevArrow = (props) => (
        <button
            type="button"
            {...props}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary/40 hover:bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ display: "block" }}
            aria-label="Previous news"
        >
            <ChevronLeft className="w-4 h-4 text-white" />
        </button>
    );

    const CustomNextArrow = (props) => (
        <button
            type="button"
            {...props}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary/40 hover:bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ display: "block" }}
            aria-label="Next news"
        >
            <ChevronRight className="w-4 h-4 text-white" />
        </button>
    );

    const slidesToShow =
        display === "xl" || display === "lg" ? 3 : display === "md" ? 2 : 1;

    const settings = useMemo(
        () => ({
            dots: false,
            mobileFirst: false,
            infinite: filteredNews.length > slidesToShow,
            speed: 500,
            slidesToShow,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3200,
            nextArrow: <CustomNextArrow />,
            prevArrow: <CustomPrevArrow />,
            lazyLoad: "ondemand",
            adaptiveHeight: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 900, settings: { slidesToShow: 2 } },
                { breakpoint: 600, settings: { slidesToShow: 1 } },
            ],
        }),
        [filteredNews.length, slidesToShow]
    );

    return (
        <section className="bg-white py-8 transition-all duration-300 ease-in-out">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="text-center mb-6">
                    <div className="before:block before:w-[120px] before:h-[1px] before:bg-primary before:mx-auto before:mb-4" />
                    <h2 className="text-2xl font-normal uppercase tracking-wide text-gray-800 font-montserrat">
                        <span className="font-bold text-black uppercase">
                            {t("news.title")}
                        </span>
                    </h2>
                    <div className="after:block after:w-[120px] after:h-[1px] after:bg-primary after:mx-auto after:mt-4" />

                    {years.length > 1 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {years.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => handleYearFilter(y)}
                                    className={`px-3 py-1 rounded-full border text-sm ${selectedYear === y
                                        ? "bg-primary text-white border-primary"
                                        : "border-gray-300 text-gray-700 hover:border-primary"
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative group -mx-2">
                    {filteredNews.length > 0 ? (
                        <Slider key={display} {...settings}>
                            {filteredNews.map((news, idx) => {
                                const newsTitle =
                                    news?.translation?.[i18n.language]?.title ||
                                    news?.title ||
                                    "";
                                const newsContent =
                                    news?.translation?.[i18n.language]?.content ||
                                    news?.content ||
                                    "";
                                const newsDate = news.dateObject
                                    ? format(news.dateObject, "MMMM d, yyyy")
                                    : "";

                                return (
                                    <div key={news.id} className="px-2 md:px-4 mb-2">
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                                            {news.imageURL && (
                                                <FastImage
                                                    src={news.imageThumbURL || news.imageURL}
                                                    alt={newsTitle || "news image"}
                                                    className="w-full h-48 object-cover"
                                                    priority={idx < 2}
                                                />
                                            )}
                                            <div className="p-4 flex flex-col gap-2 flex-1 min-h-[280px]">
                                                <p className="text-sm text-gray-500">{newsDate}</p>
                                                <h3 className="uppercase font-bold text-base md:text-lg line-clamp-2 min-h-[44px]">
                                                    {newsTitle}
                                                </h3>
                                                <p className="text-sm text-gray-700 line-clamp-3">
                                                    {previewText(news.description, 150)}
                                                </p>
                                                <p className="text-sm text-gray-600 line-clamp-3">
                                                    {previewText(newsContent, 150)}
                                                </p>
                                                <div className="border-t border-gray-200 mt-auto pt-3" />
                                                <button
                                                    type="button"
                                                    onClick={() => navigate("/news/" + news.id)}
                                                    className="text-primary font-semibold hover:underline text-right uppercase"
                                                >
                                                    {t("news.readMore")} &rarr;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    ) : (
                        <p className="text-center text-gray-500">
                            {t("news.notFound")} {selectedYear}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default LatestNews;
