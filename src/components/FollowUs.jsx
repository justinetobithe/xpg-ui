import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
} from "lucide-react";

function FollowUs() {
    const { t } = useTranslation();

    const socialLinks = useMemo(
        () => [
            {
                href: "https://www.facebook.com/XPG.live.now",
                Icon: Facebook,
                label: "Facebook",
            },
            {
                href: "https://x.com/XPG_live",
                Icon: Twitter,
                label: "X (Twitter)",
            },
            {
                href: "https://www.instagram.com/xpg_live/",
                Icon: Instagram,
                label: "Instagram",
            },
            {
                href: "https://www.linkedin.com/in/xpg-live-006146353/",
                Icon: Linkedin,
                label: "LinkedIn",
            },
            {
                href: "https://www.youtube.com/@xpg_live",
                Icon: Youtube,
                label: "YouTube",
            },
        ],
        []
    );

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center py-10">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-2xl uppercase font-semibold text-black">
                        {t("followUs")}
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-7 text-white">
                    {socialLinks.map(({ href, Icon, label }, index) => (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-primary flex items-center justify-center rounded-full cursor-pointer transition-all ease-linear duration-300"
                        >
                            <Icon className="w-6 h-6 md:w-7 md:h-7" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FollowUs;
