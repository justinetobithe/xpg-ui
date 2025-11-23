import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isValid } from "date-fns";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    }
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const previewText = (html, max = 150) => {
    const text = stripHtml(html);
    return text.length > max ? text.slice(0, max) + "..." : text;
};

function LatestNews() {
    const { t, i18n } = useTranslation();
    const [newsData, setNewsData] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(t("news.recent") || "Recent");
    const navigate = useNavigate();

    const getDateObject = (dateString) => {
        if (!dateString) return null;
        let date = parseISO(dateString);
        if (isValid(date)) return date;
        date = new Date(dateString);
        return isValid(date) ? date : null;
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const snapshot = await getDocs(collection(db, "pages", "home", "news"));
                const fetchedNews = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));

                const uniqueNews = Array.from(
                    new Map(fetchedNews.map((n) => [n.id, n])).values()
                );

                const sortedNews = uniqueNews
                    .filter((n) => n.date)
                    .map((n) => ({ ...n, dateObject: getDateObject(n.date) }))
                    .filter((n) => n.dateObject)
                    .sort((a, b) => b.dateObject - a.dateObject);

                setNewsData(sortedNews);
                setFilteredNews(sortedNews);

                const uniqueYears = [
                    ...new Set(sortedNews.map((n) => n.dateObject?.getFullYear())),
                ].sort((a, b) => b - a);

                setYears([t("news.recent") || "Recent", ...uniqueYears]);
            } catch (e) {
                console.error("Error retrieving news:", e);
            }
        };

        fetchNews();
    }, [t]);

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

    const settings = useMemo(
        () => ({
            dots: false,
            infinite: filteredNews.length > 3,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3200,
            nextArrow: <CustomNextArrow />,
            prevArrow: <CustomPrevArrow />,
            lazyLoad: "ondemand",
            adaptiveHeight: true,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        }),
        [filteredNews.length]
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
                        <Slider {...settings}>
                            {filteredNews.map((news) => {
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
                                                <img
                                                    src={news.imageURL}
                                                    alt={newsTitle || "news image"}
                                                    className="w-full h-48 object-cover"
                                                    loading="lazy"
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
