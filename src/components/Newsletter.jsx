import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
    const { t } = useTranslation();
    const [sentE, setSentE] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [subscriberName, setSubscriberName] = useState("");
    const [subscriberNumber, setSubscriberNumber] = useState("");
    const [file, setFile] = useState(null);

    const addSubscriber = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const subsRef = collection(db, "subscribers");
            const newSubRef = doc(subsRef);

            const docData = {
                name: subscriberName,
                contact_number: subscriberNumber,
                email: email,
                subscribedAt: new Date(),
                id: newSubRef.id,
            };

            await setDoc(newSubRef, docData);

            setSentE("success");
            setSubscriberName("");
            setSubscriberNumber("");
            setEmail("");
        } catch (error) {
            console.error(error);
            setSentE("failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const snapshot = await getDocs(
                    query(collection(db, "files"), where("type", "==", "privacy_policy"))
                );
                const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFile(files.length > 0 ? files[0] : null);
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        };

        fetchFile();
    }, []);

    const downloadFile = () => {
        if (file?.fileUrl) {
            window.open(file.fileUrl, "_blank");
        }
    };

    return (
        <section className="relative w-full py-10">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="w-full flex flex-wrap h-full lg:justify-center items-start">
                    <div className="bg-primary text-white p-6 sm:p-8 rounded-[2rem] w-full mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="w-full md:max-w-md text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">{t("newsLetter.title")}</h3>
                            <p>{t("newsLetter.description")}</p>
                        </div>

                        <form onSubmit={addSubscriber} className="w-full md:w-1/2 space-y-2">
                            <label className="block font-semibold">{t("newsLetter.stayUpdated")}</label>

                            <input
                                type="text"
                                placeholder={t("newsLetter.form.fullName")}
                                value={subscriberName}
                                onChange={(e) => setSubscriberName(e.target.value)}
                                className="w-full p-2 px-4 text-gray-700 focus:outline-none rounded"
                                required
                            />

                            <input
                                type="tel"
                                placeholder={t("newsLetter.form.contactNumber")}
                                value={subscriberNumber}
                                onChange={(e) => setSubscriberNumber(e.target.value)}
                                className="w-full p-2 px-4 text-gray-700 focus:outline-none rounded"
                                required
                            />

                            <input
                                type="email"
                                placeholder={t("newsLetter.form.email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 px-4 text-gray-700 focus:outline-none rounded"
                                required
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#F1A162] px-6 py-2 font-semibold text-white hover:bg-[#e98546] disabled:opacity-60 rounded-full"
                            >
                                {isSubmitting ? t("newsLetter.form.submitting") : t("newsLetter.form.subscribe")}
                            </button>

                            <p className="text-xs">
                                {t("newsLetter.form.agreement")}{" "}
                                {file?.fileUrl ? (
                                    <button
                                        type="button"
                                        onClick={downloadFile}
                                        className="underline text-white hover:text-gray-200"
                                    >
                                        {t("newsLetter.form.privacyPolicy")}
                                    </button>
                                ) : (
                                    <span className="italic text-gray-300">
                                        {t("newsLetter.form.privacyComingSoon")}
                                    </span>
                                )}
                            </p>

                            {sentE === "success" && (
                                <p className="text-green-200 text-xs">{t("newsletter.successMessage")}</p>
                            )}
                            {sentE === "failed" && (
                                <p className="text-red-200 text-xs">{t("newsletter.errorMessage")}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
