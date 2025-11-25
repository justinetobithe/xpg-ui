import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { format, parseISO, isValid } from "date-fns";
import { useTranslation } from "react-i18next";

import SEO from "@/components/SEO";
import Loader from "@/components/Loader";
import Newsletter from "@/components/Newsletter";
import FastImage from "@/components/FastImage";

import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/api/news";

function NewsDetails() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { slug } = useParams();

    const { data: news = [], isLoading } = useQuery({
        queryKey: ["news"],
        queryFn: fetchNews,
        staleTime: 1000 * 60 * 5,
    });

    const [selectedNews, setSelectedNews] = useState(slug || null);

    useEffect(() => {
        setSelectedNews(slug || null);
    }, [slug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedNews]);

    const newsData = useMemo(() => {
        if (!selectedNews && news.length) return news[0];
        return news.find((n) => n.id === selectedNews) || null;
    }, [news, selectedNews]);

    const getDateObject = (dateString) => {
        if (!dateString) return null;
        let d = parseISO(dateString);
        if (isValid(d)) return d;
        d = new Date(dateString);
        return isValid(d) ? d : null;
    };

    const applyTailwindClasses = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html || "", "text/html");

        doc.querySelectorAll("p").forEach((p) =>
            p.classList.add("text-base", "font-light", "my-4", "leading-relaxed")
        );
        doc.querySelectorAll("ul").forEach((ul) =>
            ul.classList.add("list-disc", "pl-5", "my-3")
        );
        doc.querySelectorAll("li").forEach((li) =>
            li.classList.add("text-sm", "md:text-base", "my-1")
        );
        doc.querySelectorAll("h3").forEach((h3) =>
            h3.classList.add("text-lg", "md:text-xl", "font-semibold", "my-3")
        );
        doc.querySelectorAll("h4").forEach((h4) =>
            h4.classList.add("text-base", "md:text-lg", "font-semibold", "mt-4")
        );
        doc.querySelectorAll("blockquote").forEach((bq) =>
            bq.classList.add(
                "border-l-4",
                "border-primary",
                "pl-4",
                "italic",
                "text-gray-600",
                "my-6"
            )
        );

        return doc.body.innerHTML;
    };

    if (isLoading || !newsData) return <Loader />;

    const title =
        newsData?.translation?.[i18n.language]?.title ||
        newsData?.title ||
        t("news.title", "News");

    const content =
        newsData?.translation?.[i18n.language]?.content ||
        newsData?.content ||
        "";

    const descriptionPlain = (content || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);

    const dateObj = getDateObject(newsData?.date);
    const dateLabel = dateObj ? format(dateObj, "MMM dd, yyyy") : "";

    const currentIndex = news.findIndex((n) => n.id === newsData.id);
    const prevItem = currentIndex > 0 ? news[currentIndex - 1] : null;
    const nextItem =
        currentIndex >= 0 && currentIndex < news.length - 1
            ? news[currentIndex + 1]
            : null;

    return (
        <>
            <SEO
                title={`${title} – XPG News`}
                description={descriptionPlain}
                url={`/news/${newsData.id}`}
                image={newsData.imageURL}
                keywords="XPG news, live casino news, XPG updates"
            />

            <section className="bg-white py-8 px-4 md:px-10 lg:px-20 transition-all duration-300 ease-in-out">
                <div className="w-full flex flex-col pt-[80px] font-sans text-text">
                    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3">
                            <div className="text-center mb-8 md:mb-10">
                                <div className="w-[120px] h-[1px] bg-[#fc865a] mx-auto mb-3" />
                                <h1 className="text-2xl md:text-3xl font-bold uppercase text-[#222222] inline-block">
                                    <span className="font-bold text-gray-800">{title}</span>
                                </h1>
                                <div className="w-[120px] h-[1px] bg-[#fc865a] mx-auto mt-3" />
                            </div>

                            {dateLabel && (
                                <p className="text-sm md:text-base italic text-center mb-4 text-gray-600">
                                    {dateLabel}
                                </p>
                            )}

                            <article className="w-full">
                                {newsData.imageURL && (
                                    <FastImage
                                        src={newsData.imageThumbURL || newsData.imageURL}
                                        alt={title}
                                        className="w-full max-h-[320px] object-cover mb-5 rounded-lg"
                                        priority
                                    />
                                )}

                                <div
                                    className="text-justify hyphens-auto"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(applyTailwindClasses(content)),
                                    }}
                                />

                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/news")}
                                        className="text-primary uppercase text-sm font-semibold underline underline-offset-4"
                                    >
                                        {t("news.backToNews", "Back to News")}
                                    </button>
                                </div>
                            </article>
                        </div>

                        <aside className="w-full lg:w-1/3">
                            <h2 className="uppercase text-xl font-extrabold mb-4">
                                {t("news.recentNews")}
                            </h2>

                            <div className="space-y-4">
                                {news
                                    .filter((item) => item.id !== newsData.id)
                                    .slice(0, 5)
                                    .map((item, idx) => {
                                        const sideTitle =
                                            item?.translation?.[i18n.language]?.title ||
                                            item?.title ||
                                            "";
                                        const sideDate = getDateObject(item?.date);
                                        const sideDateLabel = sideDate
                                            ? format(sideDate, "MMM dd, yyyy")
                                            : "";

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="w-full flex gap-3 text-left"
                                                onClick={() => navigate(`/news/${item.id}`)}
                                            >
                                                {item.imageURL && (
                                                    <FastImage
                                                        src={item.imageThumbURL || item.imageURL}
                                                        alt={sideTitle}
                                                        className="w-[100px] h-[80px] object-cover rounded"
                                                        priority={idx < 2}
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-primary font-medium leading-tight line-clamp-2">
                                                        {sideTitle}
                                                    </p>
                                                    {sideDateLabel && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {sideDateLabel}
                                                        </p>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                            </div>
                        </aside>
                    </div>

                    <nav className="max-w-7xl mx-auto w-full mt-12">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => prevItem && navigate(`/news/${prevItem.id}`)}
                                disabled={!prevItem}
                                aria-label={t("previous")}
                                className="group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] disabled:text-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                <span
                                    className={[
                                        "transition-transform duration-200",
                                        !prevItem
                                            ? "text-gray-300"
                                            : "text-[#ff8a00] group-hover:-translate-x-1",
                                    ].join(" ")}
                                >
                                    {(typeof i18n?.dir === "function"
                                        ? i18n.dir()
                                        : document?.dir || "ltr") === "rtl"
                                        ? "»»"
                                        : "««"}
                                </span>
                                <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                                    {t("previous")}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => nextItem && navigate(`/news/${nextItem.id}`)}
                                disabled={!nextItem}
                                aria-label={t("next")}
                                className="group inline-flex items-center gap-3 text-base md:text-lg font-medium text-[#1f2a44] disabled:text-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-[#ff8a00]">
                                    {t("next")}
                                </span>
                                <span
                                    className={[
                                        "transition-transform duration-200",
                                        !nextItem
                                            ? "text-gray-300"
                                            : "text-[#ff8a00] group-hover:translate-x-1",
                                    ].join(" ")}
                                >
                                    {(typeof i18n?.dir === "function"
                                        ? i18n.dir()
                                        : document?.dir || "ltr") === "rtl"
                                        ? "««"
                                        : "»»"}
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>

                <Newsletter />
            </section>
        </>
    );
}

export default React.memo(NewsDetails);
