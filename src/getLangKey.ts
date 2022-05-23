import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

const i18nInstance = i18n.createInstance();
i18nInstance
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: true
        }
    })
    .then(() => {
        if (i18nInstance.languages.every((lang) => i18nInstance.getDataByLanguage(lang) === undefined)) {
            throw new Error(`Failed to load localization`);
        }
    });

export default i18n;
