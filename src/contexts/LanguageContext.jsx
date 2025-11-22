import React, { createContext, useState, useContext, useEffect } from "react";
import i18n from "../i18n";

const languages = [
    { code: "en", name: "English", initial: "EN", countryCode: "GB" },
    { code: "ko", name: "Korean", initial: "KO", countryCode: "KR" },
    { code: "th", name: "Thai", initial: "TH", countryCode: "TH" },
    { code: "zh", name: "Chinese", initial: "ZH", countryCode: "CN" },
    { code: "tr", name: "Turkish", initial: "TR", countryCode: "TR" },
    { code: "pt", name: "Portuguese", initial: "PT", countryCode: "PT" },
    { code: "ru", name: "Russian", initial: "RU", countryCode: "RU" },
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const currentLangCode = i18n.language.split("-")[0];

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return (
            languages.find((lang) => lang.code === currentLangCode) || languages[0]
        );
    });

    useEffect(() => {
        const handleLanguageChanged = (lng) => {
            const normalizedCode = lng.split("-")[0];
            const lang =
                languages.find((item) => item.code === normalizedCode) ||
                languages[0];
            setSelectedLanguage(lang);
        };

        i18n.on("languageChanged", handleLanguageChanged);
        return () => {
            i18n.off("languageChanged", handleLanguageChanged);
        };
    }, []);

    useEffect(() => {
        const current = i18n.language.split("-")[0];
        if (selectedLanguage.code !== current) {
            i18n.changeLanguage(selectedLanguage.code);
            localStorage.setItem("i18nextLng", selectedLanguage.code);
        }
    }, [selectedLanguage]);

    const setLanguage = (language) => {
        setSelectedLanguage(language);
    };

    const value = {
        selectedLanguage,
        setLanguage,
        languages,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
