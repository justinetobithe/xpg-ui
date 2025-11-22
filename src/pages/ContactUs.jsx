import React, { useEffect, useRef, useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import {
    Phone,
    Mail,
    MapPin,
    SendHorizonal,
} from "lucide-react";

import heroBg from "@/assets/images/cta-0083.jpg";

function ContactUs() {
    const { t } = useTranslation();

    const formRef = useRef(null);
    const recaptchaRef = useRef(null);
    const timeoutRef = useRef(null);

    const [sent, setSent] = useState(null);  
    const [isSending, setSending] = useState(false);
    const [reCapToken, setReCapToken] = useState(null);

    const [config, setConfig] = useState({
        emailjs_service_id: "",
        emailjs_template_id: "",
        emailjs_api_key: "",
        recaptcha_site_key: "",
    });

    useEffect(() => {
        const fetchCreds = async () => {
            try {
                const docRef = doc(db, "config", "security");
                const snap = await getDoc(docRef);
                if (snap.exists()) setConfig((c) => ({ ...c, ...snap.data() }));
            } catch (err) {
                console.error("Error fetching credentials:", err);
            }
        };
        fetchCreds();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const hasRecaptcha = !!config.recaptcha_site_key;
    const canSubmit = useMemo(
        () => !isSending && (!hasRecaptcha || !!reCapToken),
        [isSending, hasRecaptcha, reCapToken]
    );

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!formRef.current || !canSubmit) return;

        setSending(true);
        clearTimeout(timeoutRef.current);

        try {
            await emailjs.sendForm(
                config.emailjs_service_id,
                config.emailjs_template_id,
                formRef.current,
                { publicKey: config.emailjs_api_key }
            );

            const payload = {
                name: formRef.current.from_name.value?.trim() || "",
                contact_number: formRef.current.contact_number.value?.trim() || "",
                email: formRef.current.user_email.value?.trim() || "",
                subject: formRef.current.subject.value?.trim() || "",
                message: formRef.current.message.value?.trim() || "",
                createdAt: serverTimestamp(),
                status: "not called",
            };

            const newDocRef = await addDoc(collection(db, "contactUs"), payload);
            await setDoc(doc(db, "contactUs", newDocRef.id), { ...payload, id: newDocRef.id });

            setSent("success");
            formRef.current.reset();
            setReCapToken(null);
            recaptchaRef.current?.reset();
        } catch (error) {
            console.error("FAILED...", error);
            setSent("failed");
        } finally {
            setSending(false);
            timeoutRef.current = setTimeout(() => setSent(null), 3000);
        }
    };

    return (
        <section
            className="relative w-full min-h-screen bg-no-repeat bg-top bg-cover bg-center font-sans text-text pt-16"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 34%, rgba(0,0,0,0) 100%)",
                }}
            />

            <div className="relative w-full flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 md:px-10 pt-8">
                        {sent && (
                            <p
                                className={`text-sm text-center mb-3 ${sent === "success" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {sent === "success" ? t("contactUs.success") : t("contactUs.failure")}
                            </p>
                        )}

                        <div className="flex flex-col items-center pt-2 pb-6">
                            <div className="border-t border-t-[#ff7f50] w-32 py-1" />
                            <h1 className="text-2xl md:text-3xl uppercase text-center">
                                {t("contactUs.get")}{" "}
                                <b className="font-extrabold">{t("contactUs.inTouch")}</b>
                            </h1>
                            <div className="border-b border-b-[#ffa500] w-32 py-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        <div className="lg:col-span-2 px-6 md:px-10 pb-8">
                            <div className="lg:hidden text-sm mb-4">
                                <p className="mt-2">{t("contactUs.interested")}</p>
                                <p className="text-justify mt-2">{t("contactUs.description")}</p>
                            </div>

                            <form
                                ref={formRef}
                                onSubmit={sendEmail}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {[
                                    { name: "from_name", label: "name", required: true },
                                    { name: "contact_number", label: "phone", required: false },
                                    { name: "user_email", label: "email", type: "email", required: true },
                                    { name: "subject", label: "subject", required: true },
                                ].map((f) => (
                                    <label key={f.name} className="flex flex-col gap-1">
                                        <span className="uppercase text-sm">
                                            {t(`contactUs.form.${f.label}`)}
                                            {f.required && <span className="text-red-600">*</span>}
                                        </span>
                                        <input
                                            name={f.name}
                                            type={f.type || "text"}
                                            required={f.required}
                                            className="bg-[#e1e1e1] min-h-[40px] rounded-md px-3 outline-none focus:ring-2 focus:ring-primary/60"
                                        />
                                    </label>
                                ))}

                                <label className="flex flex-col gap-1 md:col-span-2">
                                    <span className="uppercase text-sm">
                                        {t("contactUs.form.message")}
                                        <span className="text-red-600">*</span>
                                    </span>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        required
                                        className="resize-none bg-[#e1e1e1] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                                    />
                                </label>

                                {hasRecaptcha && (
                                    <div className="md:col-span-2 mt-1">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={config.recaptcha_site_key}
                                            onChange={(token) => setReCapToken(token)}
                                        />
                                    </div>
                                )}

                                <div className="md:col-span-2 mt-2">
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-sm uppercase font-semibold
                               disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition"
                                    >
                                        {isSending ? t("contactUs.form.sending") : t("contactUs.form.send")}
                                        <SendHorizonal size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <aside className="hidden lg:flex flex-col bg-[#fafafa] border-l px-8 py-8 text-sm">
                            <p className="text-justify">{t("contactUs.interested")}</p>
                            <p className="text-justify mt-3 mb-6">{t("contactUs.description")}</p>

                            <div className="flex items-center gap-2 mt-2">
                                <Phone className="text-[coral]" size={18} />
                                <p className="text-primary uppercase font-extrabold text-sm">
                                    {t("contactUs.container.phoneLabel")}
                                </p>
                            </div>
                            <p className="ml-6 font-medium mt-1">+421 911 628 998</p>

                            <div className="flex items-center gap-2 mt-5">
                                <Mail className="text-[coral]" size={18} />
                                <p className="text-primary uppercase font-extrabold text-sm">
                                    {t("contactUs.container.emailLabel")}
                                </p>
                            </div>
                            <p className="ml-6 font-medium mt-1">info@xprogaming.com</p>

                            <div className="flex items-center gap-2 mt-5">
                                <MapPin className="text-[coral]" size={18} />
                                <p className="text-primary uppercase font-extrabold text-sm">
                                    {t("contactUs.container.addressLabel")}
                                </p>
                            </div>
                            <p className="ml-6 font-medium mt-1">Bratislava, Slovakia</p>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo(ContactUs);
