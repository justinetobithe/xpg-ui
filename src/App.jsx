import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";

import "./App.css";
import Loader from "./components/Loader";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

const HomePage = lazy(() => import("./pages/HomePage"));

const Company = lazy(() => import("./pages/Company"));
const GetToKnow = lazy(() => import("./pages/GetToKnow"));
const LiveStudios = lazy(() => import("./pages/LiveStudios"));
const Partners = lazy(() => import("./pages/Partners"));
const FairGaming = lazy(() => import("./pages/FairGaming"));

const Solutions = lazy(() => import("./pages/Solutions"));
const SmartStudio = lazy(() => import("./pages/SmartStudio"));
const ApiIntegration = lazy(() => import("./pages/ApiIntegration"));
const WhiteLabel = lazy(() => import("./pages/WhiteLabel"));
const HTML5Mobile = lazy(() => import("./pages/HTML5Mobile"));
const PrivateTables = lazy(() => import("./pages/PrivateTables"));
const PrintingMaterials = lazy(() => import("./pages/PrintingMaterials"));

const LiveGames = lazy(() => import("./pages/LiveGames"));
const LiveGameDetails = lazy(() => import("./pages/GameDetails"));

const LatestNews = lazy(() => import("./pages/LatestNews"));
const NewsDetails = lazy(() => import("./pages/NewsDetails"));

const ContactUs = lazy(() => import("./pages/ContactUs"));

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 300);
    return () => clearTimeout(id);
  }, []);

  if (booting) return <Loader fullscreen />;

  return (
    <Router>
      <LanguageProvider>
        <Suspense fallback={<Loader fullscreen />}>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/live-games" element={<LiveGames />} />
            <Route path="/live-games/:gameId" element={<LiveGameDetails />} />

            <Route path="/news" element={<LatestNews />} />
            <Route path="/news/:slug" element={<NewsDetails />} />

            <Route path="/company" element={<Company />} />
            <Route path="/company/get-to-know" element={<GetToKnow />} />
            <Route path="/company/live-studios" element={<LiveStudios />} />
            <Route path="/company/partners" element={<Partners />} />
            <Route path="/company/fair-gaming" element={<FairGaming />} />

            <Route path="/solution" element={<Solutions />} />
            <Route path="/solution/smart-studio" element={<SmartStudio />} />
            <Route path="/solution/api-integration" element={<ApiIntegration />} />
            <Route path="/solution/white-label" element={<WhiteLabel />} />
            <Route path="/solution/html5-mobile" element={<HTML5Mobile />} />
            <Route path="/solution/private-tables" element={<PrivateTables />} />
            <Route path="/solution/printing-materials" element={<PrintingMaterials />} />

            <Route path="/contact" element={<ContactUs />} />
          </Routes>

          <Footer />
        </Suspense>
      </LanguageProvider>
    </Router>
  );
}

export default App;
