import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_SITE_NAME = "XPG – Live Casino Software Provider";
const CANONICAL_URL = "https://xprogaming.com";

const MIRROR_URLS = [
    "https://xpg.live/",
    "https://www1.xpg.live/",
    "https://xprogaming.com/",
];

function SEO({
    title,
    description = "XPG is a leading B2B live casino software provider delivering cutting-edge live dealer games and comprehensive iGaming solutions to online casino operators.",
    url,
    image,
    favicon,
    keywords,
    robots = "index,follow",
}) {
    const fullTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_SITE_NAME;

    const runtimePath =
        typeof window !== "undefined" && window.location
            ? window.location.pathname + window.location.search
            : "/";

    const normalizeUrl = (u) => {
        if (!u) return CANONICAL_URL + runtimePath;
        if (u.startsWith("http://") || u.startsWith("https://")) return u;
        if (u.startsWith("/")) return CANONICAL_URL + u;
        return CANONICAL_URL + "/" + u;
    };

    const effectiveUrl = normalizeUrl(url);
    const canonicalUrl = CANONICAL_URL + runtimePath;

    return (
        <Helmet>
            <title>{fullTitle}</title>

            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {robots && <meta name="robots" content={robots} />}

            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={effectiveUrl} />
            <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
            {image && <meta property="og:image" content={image} />}

            {favicon && <link rel="icon" href={favicon} />}

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "XPG",
                    url: CANONICAL_URL,
                    sameAs: MIRROR_URLS,
                    logo: image || favicon || `${CANONICAL_URL}/icon.png`,
                    description,
                })}
            </script>
        </Helmet>
    );
}

export default SEO;
