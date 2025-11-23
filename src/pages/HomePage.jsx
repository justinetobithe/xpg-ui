import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AOS from "aos";
import "aos/dist/aos.css";

import SEO from "@/components/SEO";
import Slider from "@/components/AppSlider";
import FeatureSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import WorkTogether from "@/components/WorkTogether";

const GamesGrid = lazy(() => import("@/components/GamesGrid"));
const LatestNews = lazy(() => import("@/components/LatestNews"));
const Newsletter = lazy(() => import("@/components/Newsletter"));

function HomePage() {
    const mainRef = useRef(null);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        AOS.init({ once: true });

        const unsubscribe = onSnapshot(
            query(collection(db, "files"), where("type", "==", "Logo Black")),
            (snapshot) => {
                const logoFile = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLogo(logoFile.length > 0 ? logoFile[0] : null);
            },
            (error) => {
                console.error("Error fetching file:", error);
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="homepage-container" ref={mainRef}>
            <SEO
                title="Live Casino Software Provider – Premium Live Dealer Blackjack, Baccarat & Roulette"
                description="XPG is a leading B2B live casino software provider delivering cutting-edge live dealer games, including Blackjack, Baccarat, Roulette, Teen Patti, and more, with seamless integration for online casino operators."
                url="/"
                image={logo?.fileUrl}
                favicon={logo?.fileUrl || "/fallback-logo.png"}
                keywords="XPG, XProGaming, live casino provider, B2B gaming software, live dealer games, online casino software, live blackjack, live baccarat, live roulette, casino API integration, white-label casino, iGaming solutions, live casino streaming, professional dealer studios, Teen Patti, Andar Bahar, Sic Bo, 32 Cards"
            />

            <Slider itemRef={mainRef} />
            <FeatureSection itemRef={mainRef} />
            <AboutSection />

            <Suspense fallback={<div>Loading games...</div>}>
                <GamesGrid />
            </Suspense>

            <WorkTogether />

            <Suspense fallback={<div>Loading news...</div>}>
                <LatestNews />
            </Suspense>

            <Suspense fallback={<div>Loading subscription form...</div>}>
                <Newsletter />
            </Suspense>
        </div>
    );
}

export default HomePage;
