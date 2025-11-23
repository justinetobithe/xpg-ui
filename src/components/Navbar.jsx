import React, { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./Loader";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import ReactFlagsSelect from "react-flags-select";
import { Disclosure, Transition } from "@headlessui/react";

import logoBlack from "@/assets/images/xpg-logo.png";
import logoWhite from "@/assets/images/XPG_logo_white.png";
import { useLanguage } from "@/contexts/LanguageContext";

function Navbar() {
    const { t, i18n } = useTranslation();
    const { selectedLanguage, setLanguage, languages } = useLanguage();

    const [toggle, setToggle] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedLang =
            localStorage.getItem("selectedLanguage") ||
            localStorage.getItem("i18nextLng") ||
            selectedLanguage.code;

        const normalizedCode = savedLang.split("-")[0];
        const activeLang =
            languages.find((lang) => lang.code === normalizedCode) || languages[0];

        setLanguage(activeLang);
    }, [languages, selectedLanguage.code, setLanguage]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(
            query(collection(db, "liveGames"), orderBy("priority", "asc")),
            (snapshot) => {
                const gamesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGames(gamesData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching liveGames:", error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const navItems = useMemo(() => {
        return [
            {
                name: t("navbar.navItems.company.name"),
                link: "/company",
                contents: [
                    { name: t("navbar.navItems.company.contents.getToKnowXPG"), id: "get-to-know" },
                    { name: t("navbar.navItems.company.contents.ourLiveStudios"), id: "live-studios" },
                    { name: t("navbar.navItems.company.contents.ourPartners"), id: "partners" },
                    { name: t("navbar.navItems.company.contents.fairGaming"), id: "fair-gaming" },
                ],
                isLink: false,
            },
            {
                name: t("navbar.navItems.solutions.name"),
                link: "/solution",
                contents: [
                    { name: t("navbar.navItems.solutions.contents.smartStudio"), id: "smart-studio" },
                    { name: t("navbar.navItems.solutions.contents.apiIntegration"), id: "api-integration" },
                    { name: t("navbar.navItems.solutions.contents.whiteLabel"), id: "white-label" },
                    { name: t("navbar.navItems.solutions.contents.html5Mobile"), id: "html5-mobile" },
                    { name: t("navbar.navItems.solutions.contents.privateTables"), id: "private-tables" },
                    { name: t("navbar.navItems.solutions.contents.printingMaterials"), id: "printing-materials" },
                ],
                isLink: false,
            },
            {
                name: t("navbar.navItems.liveGames.name"),
                link: "/live-games",
                contents: games.map((game) => ({
                    name: game?.translation?.[i18n.language]?.name || game.name,
                    id: game.id,
                })),
                isLink: false,
            },
            {
                name: t("navbar.navItems.news.name"),
                link: "/news",
                contents: [],
                isLink: false,
            },
            {
                name: t("navbar.navItems.liveDemo.name"),
                link: "/demo",
                contents: [],
                isLink: true,
            },
        ];
    }, [t, i18n.language, games]);

    const exemptLocation = useMemo(
        () => ["/company", "/solution", "/news", "/live-games"],
        []
    );

    const selectedCountryCode = selectedLanguage.countryCode;

    const countryToLabel = useMemo(
        () =>
            languages.reduce((acc, lang) => {
                acc[lang.countryCode] = lang.initial;
                return acc;
            }, {}),
        [languages]
    );

    const handleFlagSelect = (countryCode) => {
        const lang = languages.find((l) => l.countryCode === countryCode);
        if (!lang) return;
        setLanguage(lang);
        localStorage.setItem("selectedLanguage", lang.code);
    };

    const isDarkLogo =
        toggle ||
        (!toggle && exemptLocation.includes(location.pathname)) ||
        /^\/news\/[A-Za-z0-9]+$/.test(location.pathname);

    return (
        <>
            <div className="flex flex-row h-20 text-white text-sm items-center gap-4 font-medium transition-all ease-in-out duration-500 top-0 right-4 z-[1001] fixed">
                <a
                    href="https://clientarea.xpg.live/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-9 px-4 py-1 bg-primary uppercase rounded-md text-center hidden lg:flex items-center"
                >
                    {t("navbar.buttons.clientArea")}
                </a>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate("/contact");
                    }}
                    className="h-9 px-4 py-1 bg-text uppercase rounded-md hidden lg:block"
                    type="button"
                >
                    {t("navbar.buttons.contactUs")}
                </button>
                <button
                    type="button"
                    className={`${toggle ? "text-[#5f5f5f]" : "lg:text-[#5f5f5f] text-black"} text-3xl p-1 z-10 cursor-pointer select-none block sticky lg:hidden bg-[#fff6] rounded`}
                    onClick={() => {
                        setToggle((prev) => !prev);
                        setIsHovered(null);
                    }}
                >
                    {toggle ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>

            <nav
                className={`${toggle ? "bg-white h-screen fixed" : "bg-transparent absolute"} w-full lg:bg-white drop-shadow-md lg:fixed font-sans text-text z-[1000]`}
            >
                <div className="flex flex-row w-full h-20 items-center justify-between md:px-0 px-4">
                    <div className="flex flex-row h-full items-center w-full md:pl-2">
                        <Link to="/" className="text-[1.6em] mr-[1rem] cursor-pointer">
                            <img
                                src={logoBlack}
                                alt="Company Logo"
                                className="xl:w-[calc(139px/1.25)] w-[calc(139px/1.50)] h-auto hidden lg:block"
                            />
                            <img
                                src={isDarkLogo ? logoBlack : logoWhite}
                                alt="Company Logo"
                                className="xl:w-[calc(139px/1.25)] w-[calc(139px/1.50)] h-auto lg:hidden block"
                            />
                        </Link>

                        <ul className="lg:flex flex-row h-full items-center select-none hidden">
                            {navItems.map((item, index) => (
                                <li
                                    className="relative xl:px-6 px-3 border-r border-r-primary cursor-pointer"
                                    key={item.name}
                                >
                                    {item.isLink ? (
                                        <a
                                            onMouseEnter={() => setIsHovered(item.name)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsHovered(null);
                                            }}
                                            href="https://www.xpgdemo.com/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary xl:text-base text-sm uppercase font-semibold hover:text-primary transition-all ease-in-out duration-500 border-b-2 pb-1 border-primary"
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <button
                                            type="button"
                                            onMouseEnter={() => setIsHovered(item.name)}
                                            className="text-[#5f5f5f] xl:text-base text-sm uppercase font-semibold hover:text-primary transition-all ease-in-out duration-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(item.link);
                                                setIsHovered(null);
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    )}

                                    {index !== 2 && (
                                        <div
                                            style={{
                                                display:
                                                    item.contents.length > 0 && isHovered === item.name
                                                        ? "block"
                                                        : "none",
                                            }}
                                            onMouseLeave={() => setIsHovered(null)}
                                            className="absolute left-[calc(50%-100px)] mt-[10%] min-w-[220px] bg-[#f0f3f2] drop-shadow-sm border border-[#e4e4e4] z-[1000] transition-all ease-in-out duration-500"
                                        >
                                            {item.contents.map((i) => (
                                                <button
                                                    key={i.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`${item.link}/${i.id}`);
                                                    }}
                                                    className="uppercase text-sm font-medium py-3 px-4 border-b border-[#e4e4e4] hover:bg-[#e4e4e4] w-full text-left"
                                                >
                                                    {i.name}
                                                    {item.link === "/solution" &&
                                                        i.id === "smart-studio" && (
                                                            <span className="ml-2 text-[10px] font-bold text-white bg-red-500 px-2 py-[2px] rounded-full">
                                                                {t("navbar.badge.new")}
                                                            </span>
                                                        )}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {index === 2 && (
                                        <div
                                            style={{
                                                display:
                                                    item.contents.length > 0 && isHovered === item.name
                                                        ? "block"
                                                        : "none",
                                            }}
                                            onMouseLeave={() => setIsHovered(null)}
                                            className="absolute left-[calc(50%-100px)] mt-[10%] bg-[#f0f3f2] drop-shadow-sm border border-[#e4e4e4] z-[1000] transition-all ease-in-out duration-500"
                                        >
                                            <div className="max-h-[280px] w-[440px] flex flex-row flex-wrap overflow-auto">
                                                {games.map((i) => (
                                                    <button
                                                        key={i.id}
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`${item.link}/${i.id}`, {
                                                                relative: true,
                                                            });
                                                        }}
                                                        className="w-[220px] uppercase text-sm font-medium py-3 px-4 border-b border-l border-[#e4e4e4] hover:bg-[#e4e4e4] text-left"
                                                    >
                                                        {i?.translation?.[i18n.language]?.name || i?.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}

                            <div className="relative ml-4 z-[1100] border-0">
                                <ReactFlagsSelect
                                    countries={languages.map((l) => l.countryCode)}
                                    customLabels={countryToLabel}
                                    selected={selectedCountryCode}
                                    onSelect={handleFlagSelect}
                                    selectButtonClassName="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-2 border-0"
                                    showSelectedLabel={false}
                                    showSecondarySelectedLabel={false}
                                    showOptionLabel
                                    optionsSize={14}
                                />
                            </div>
                        </ul>
                    </div>
                </div>

                {toggle && (
                    <div className="h-full w-full bg-white drop-shadow-md fixed lg:hidden">
                        <div className="w-full flex flex-col items-center px-8 mb-4 pt-4 pb-8 absolute">
                            {isLoading ? (
                                <div className="w-full flex justify-center py-8">
                                    <Loader />
                                </div>
                            ) : (
                                navItems.map((item) => {
                                    const hasChildren = item.contents.length > 0;

                                    return (
                                        <Disclosure key={item.name} as="div" className="w-full max-w-[390px]">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={`px-4 text-[#5f5f5f] w-full flex items-center justify-between h-12 border-b border-b-[#0000001a] transition ${open ? "bg-[#eee]" : "bg-white"}`}
                                                        onClick={(e) => {
                                                            if (!hasChildren) {
                                                                e.preventDefault();
                                                                if (item.isLink) {
                                                                    window.open("https://www.xpgdemo.com/", "_blank");
                                                                } else {
                                                                    navigate(item.link);
                                                                }
                                                                setToggle(false);
                                                            }
                                                        }}
                                                    >
                                                        <span className={`${item.isLink ? "text-primary" : ""} text-lg uppercase font-semibold`}>
                                                            {item.name}
                                                        </span>

                                                        {hasChildren && (
                                                            <span className={`ml-3 h-8 w-8 flex items-center justify-center rounded border border-primary ${open ? "bg-primary/10 text-primary" : "text-primary"}`}>
                                                                {open ? (
                                                                    <ChevronUp className="w-5 h-5" />
                                                                ) : (
                                                                    <ChevronDown className="w-5 h-5" />
                                                                )}
                                                            </span>
                                                        )}
                                                    </Disclosure.Button>

                                                    {hasChildren && (
                                                        <Transition
                                                            show={open}
                                                            enter="transition duration-200 ease-out"
                                                            enterFrom="transform scale-y-95 opacity-0"
                                                            enterTo="transform scale-y-100 opacity-100"
                                                            leave="transition duration-150 ease-in"
                                                            leaveFrom="transform scale-y-100 opacity-100"
                                                            leaveTo="transform scale-y-95 opacity-0"
                                                        >
                                                            <Disclosure.Panel static className="bg-[#eee] border-b border-b-[#0000001a] border-l-[3px] border-l-primary py-1 origin-top">
                                                                {item.contents.map((i) => (
                                                                    <button
                                                                        key={i.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            navigate(`${item.link}/${i.id}`);
                                                                            setToggle(false);
                                                                        }}
                                                                        className="w-full text-left px-6 py-2 border-b border-b-[#0000001a] last:border-b-0"
                                                                    >
                                                                        <span className="text-sm uppercase font-semibold text-[#5f5f5f]">
                                                                            {i.name}
                                                                            {item.link === "/solution" &&
                                                                                i.id === "smart-studio" && (
                                                                                    <span className="ml-2 text-[10px] font-bold text-white bg-red-500 px-2 py-[2px] rounded-full">
                                                                                        {t("navbar.badge.new")}
                                                                                    </span>
                                                                                )}
                                                                        </span>
                                                                    </button>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </Transition>
                                                    )}
                                                </>
                                            )}
                                        </Disclosure>
                                    );
                                })
                            )}

                            <div className="relative w-full max-w-[375px] mt-4 z-[1100]">
                                <ReactFlagsSelect
                                    countries={languages.map((l) => l.countryCode)}
                                    customLabels={countryToLabel}
                                    selected={selectedCountryCode}
                                    onSelect={handleFlagSelect}
                                    selectButtonClassName="flex justify-between items-center w-full bg-white px-4 py-2 rounded-md text-base font-semibold text-[#5f5f5f] hover:bg-gray-100"
                                    showSelectedLabel={false}
                                    showSecondarySelectedLabel={false}
                                    showOptionLabel
                                    optionsSize={14}
                                />
                            </div>

                            <a
                                href="https://clientarea.xpg.live/"
                                target="_blank"
                                rel="noreferrer"
                                className="h-10 py-2 w-full max-w-[375px] bg-primary text-center uppercase rounded-md text-white my-4"
                            >
                                {t("navbar.buttons.clientArea")}
                            </a>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/contact");
                                    setToggle(false);
                                }}
                                className="h-10 py-2 w-full max-w-[375px] bg-text uppercase rounded-md text-white"
                            >
                                {t("navbar.buttons.contactUs")}
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;
