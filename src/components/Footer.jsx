import React, { useEffect, useState } from 'react';
import html5Icon from "../assets/images/footer/html-icon.png";
import downloadIcon from "../assets/images/footer/download-icon.png";
import iTechLabIcon from "../assets/images/footer/itech-lab-icon.png";
import logo from "../assets/images/xpg-logo.png";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import FollowUs from './FollowUs';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const [certificate, setCertificate] = useState(null);
    const [displayScrollUp, setDisplayScrollUp] = useState(false);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const snapshot = await getDocs(
                    query(collection(db, "files"), where("type", "==", "iTech Cert"))
                );
                const files = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCertificate(files.length > 0 ? files[0] : null);
            } catch (error) {
                console.error("Error fetching certificate:", error);
            }
        };

        fetchCertificate();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollBottom =
                window.innerHeight + scrollTop >= document.body.scrollHeight - 100;

            const isMobile = window.innerWidth <= 768;
            setDisplayScrollUp(isMobile && scrollBottom);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <FollowUs />
            <footer className="bg-[#f1f1f1] text-xs text-gray-600 py-4">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 text-center">
                    <div className="mb-3">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Company Logo"
                                className="w-28 sm:w-32 md:w-36 object-contain mx-auto"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    <div className="flex justify-center items-center gap-6 flex-wrap mb-3">
                        <Link to="/solution/html5-mobile">
                            <img
                                src={html5Icon}
                                alt="HTML5"
                                className="w-16 h-10 object-contain grayscale hover:grayscale-0 transition"
                                loading="lazy"
                            />
                        </Link>
                        <Link to="/solution/white-label">
                            <img
                                src={downloadIcon}
                                alt="Download Client"
                                className="w-16 h-10 object-contain grayscale hover:grayscale-0 transition"
                                loading="lazy"
                            />
                        </Link>
                        {certificate?.fileUrl ? (
                            <a
                                href={certificate.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Download iTech Labs Certificate"
                            >
                                <img
                                    src={iTechLabIcon}
                                    alt="iTech Lab"
                                    className="w-16 h-10 object-contain grayscale hover:grayscale-0 transition"
                                    loading="lazy"
                                />
                            </a>
                        ) : (
                            <img
                                src={iTechLabIcon}
                                alt="iTech Lab"
                                className="w-16 h-10 object-contain grayscale opacity-50"
                                title="Certificate not available"
                                loading="lazy"
                            />
                        )}
                    </div>

                    <p className="text-sm leading-relaxed max-w-[800px] mx-auto text-gray-800">
                        {t("footer.content")}
                    </p>
                    <p className="mt-3 text-sm font-bold text-gray-800">
                        {t("footer.copyright").replace("{YEAR}", new Date().getFullYear())}
                    </p>
                </div>
            </footer>

            {displayScrollUp && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-24 right-4 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md z-50 sm:hidden"
                    aria-label="Scroll to top"
                >
                    <span className="text-lg">↑</span>
                </button>
            )}
        </>
    );
}
