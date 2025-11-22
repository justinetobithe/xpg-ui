import React, { useEffect, useMemo, useState, useCallback } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { format, parseISO, isValid } from "date-fns";
import Newsletter from "@/components/Newsletter";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    }
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const previewText = (html, max = 115) => {
    const text = stripHtml(html);
    return text.length > max ? text.slice(0, max) + "..." : text;
};

const getDateObject = (dateString) => {
    if (!dateString) return null;
    let d = parseISO(dateString);
    if (isValid(d)) return d;
    d = new Date(dateString);
    return isValid(d) ? d : null;
};

function LatestNews() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const RECENT_KEY = "recent";
    const [years, setYears] = useState([RECENT_KEY]);
    const [selectedYear, setSelectedYear] = useState(RECENT_KEY);

    const itemsPerPage = 6;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "pages", "home", "news"),
            (snapshot) => {
                const fetched = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));

                const uniqueNews = Array.from(
                    new Map(fetched.map((n) => [n.id, n])).values()
                );

                const sorted = uniqueNews
                    .filter((n) => n.date)
                    .map((n) => ({ ...n, dateObject: getDateObject(n.date) }))
                    .filter((n) => n.dateObject)
                    .sort((a, b) => b.dateObject - a.dateObject);

                setNews(sorted);

                const yearsOnly = [
                    ...new Set(sorted.map((n) => n.dateObject.getFullYear())),
                ].sort((a, b) => b - a);

                setYears([RECENT_KEY, ...yearsOnly]);
                setSelectedYear(RECENT_KEY);
                setFilteredNews(sorted.slice(0, 3));
                setItemOffset(0);
                setLoading(false);
            },
            (error) => {
                console.error("Error retrieving news:", error);
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredNews.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredNews.length / itemsPerPage));
    }, [itemOffset, filteredNews]);

    const handlePageClick = useCallback(
        (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % (filteredNews.length || 1);
            setItemOffset(newOffset);
        },
        [filteredNews.length]
    );

    const handleYearFilter = useCallback(
        (yearKeyOrNumber) => {
            setSelectedYear(yearKeyOrNumber);
            setItemOffset(0);

            if (yearKeyOrNumber === RECENT_KEY) {
                setFilteredNews(news.slice(0, 3));
                return;
            }

            const yr = Number(yearKeyOrNumber);
            setFilteredNews(
                news.filter((n) => n.dateObject?.getFullYear() === yr)
            );
        },
        [news]
    );

    const yearLabel = useCallback(
        (y) => (y === RECENT_KEY ? t("news.recent") : y),
        [t]
    );

    const seoImage = useMemo(
        () => news?.[0]?.imageURL,
        [news]
    );

    if (isLoading) return <Loader />;

    return (
        <>
            <section className="bg-white py-8 transition-all duration-300 ease-in-out">
                <SEO
                    title="Latest News – XPG"
                    description="Read the latest updates, releases, and announcements from XPG Live Dealer Casino."
                    url="https://xprogaming.com/news"
                    image={seoImage}
                    keywords="XPG news, live casino updates, live dealer announcements, XProGaming latest news"
                />

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                    <div className="text-center mt-16">
                        <div className="relative text-center z-2">
                            <div className="before:block before:content-[''] before:w-[120px] before:h-[1px] before:bg-orange-500 before:mx-auto before:mb-4" />
                            <h1 className="text-2xl font-normal uppercase tracking-wide text-gray-800 inline-block font-montserrat">
                                <span className="font-bold text-black uppercase">
                                    {t("news.title", "Latest News")}
                                </span>
                            </h1>
                            <div className="after:block after:content-[''] after:w-[120px] after:h-[1px] after:bg-orange-500 after:mx-auto after:mt-4" />
                        </div>

                        {years.length > 1 && (
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {years.map((y) => (
                                    <button
                                        key={y}
                                        onClick={() => handleYearFilter(y)}
                                        className={`px-3 py-1 rounded-full border text-sm ${selectedYear === y
                                            ? "bg-orange-500 text-white border-orange-500"
                                            : "border-gray-300 text-gray-700 hover:border-orange-500"
                                            }`}
                                    >
                                        {yearLabel(y)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {currentItems.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
                            {currentItems.map((item) => {
                                const title =
                                    item?.translation?.[i18n.language]?.title ||
                                    item?.title ||
                                    "";
                                const content =
                                    item?.translation?.[i18n.language]?.content ||
                                    item?.content ||
                                    "";
                                const dateLabel = item?.dateObject
                                    ? format(item.dateObject, "MMMM d, yyyy")
                                    : "";

                                return (
                                    <article
                                        key={item.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                                    >
                                        {item.imageURL && (
                                            <img
                                                src={item.imageURL}
                                                alt={title || "news image"}
                                                className="w-full h-48 object-cover"
                                                loading="lazy"
                                            />
                                        )}

                                        <div className="p-4 flex flex-col justify-between h-[300px]">
                                            <p className="text-sm text-gray-500">{dateLabel}</p>

                                            <h3 className="uppercase font-bold text-lg mb-2 h-[80px] md:h-[35px]">
                                                {title}
                                            </h3>

                                            <p className="text-sm text-gray-700">
                                                {previewText(item.description, 150)}
                                            </p>

                                            <p className="text-sm text-gray-600 mt-2">
                                                {previewText(content, 150)}
                                            </p>

                                            <div className="border-t border-gray-200 my-3" />

                                            <button
                                                onClick={() => navigate("/news/" + item.id)}
                                                className="text-orange-600 font-semibold hover:underline text-right uppercase"
                                            >
                                                {t("news.readMore")} &rarr;
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            {t("news.notFound")} {yearLabel(selectedYear)}
                        </p>
                    )}

                    {selectedYear !== RECENT_KEY && pageCount > 1 && (
                        <div className="py-10 flex justify-center">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="»"
                                previousLabel="«"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                renderOnZeroPageCount={null}
                                containerClassName="flex items-center gap-2"
                                pageLinkClassName="px-3 py-1 border border-gray-300 text-gray-600 rounded-md hover:bg-orange-400 hover:text-white transition"
                                activeLinkClassName="bg-orange-400 text-white border-orange-400"
                                previousLinkClassName="px-3 py-1 border border-gray-300 text-gray-600 rounded-md hover:bg-orange-400 hover:text-white transition"
                                nextLinkClassName="px-3 py-1 border border-gray-300 text-gray-600 rounded-md hover:bg-orange-400 hover:text-white transition"
                                breakLinkClassName="px-3 py-1 text-gray-600"
                            />
                        </div>
                    )}
                </div>
            </section>

            <Newsletter />
        </>
    );
}

export default React.memo(LatestNews);
