import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_SITE_NAME = "XPG – Live Casino Software Provider";
const CANONICAL_URL = "https://xprogaming.com";

const MIRROR_URLS = [
    "https://xpg.live/",
    "https://www1.xpg.live/",
    "https://xprogaming.com/"
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

    const runtimeHref =
        typeof window !== "undefined" && window.location
            ? window.location.href
            : CANONICAL_URL;

    const effectiveUrl = url || runtimeHref;
    const canonicalUrl = CANONICAL_URL;

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
                    url: canonicalUrl,
                    sameAs: MIRROR_URLS,
                    logo: image || favicon || `${CANONICAL_URL}/default-logo.png`,
                    description,
                })}
            </script>
        </Helmet>
    );
}

export default SEO;
