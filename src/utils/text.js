export const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    }
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export const previewText = (html, max = 150) => {
    const text = stripHtml(html);
    return text.length > max ? text.slice(0, max) + "..." : text;
};

export const stripDescription = (text = "", max = 160) => {
    const clean = stripHtml(text);
    return clean.length > max ? clean.slice(0, max) + "..." : clean;
};
