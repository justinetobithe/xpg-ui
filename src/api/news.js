import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { parseISO, isValid } from "date-fns";

const getDateObject = (dateString) => {
    if (!dateString) return null;
    let d = parseISO(dateString);
    if (isValid(d)) return d;
    d = new Date(dateString);
    return isValid(d) ? d : null;
};

export async function fetchNews() {
    const snapshot = await getDocs(collection(db, "pages", "home", "news"));
    const fetched = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    }));

    const uniqueNews = Array.from(
        new Map(fetched.map((n) => [n.id, n])).values()
    );

    const sorted = uniqueNews
        .filter((n) => n.date)
        .map((n) => ({ ...n, dateObject: getDateObject(n.date) }))
        .filter((n) => n.dateObject)
        .sort((a, b) => b.dateObject - a.dateObject);

    return sorted;
}
