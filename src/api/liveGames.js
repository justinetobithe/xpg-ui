import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchLiveGames() {
    const q = query(collection(db, "liveGames"), orderBy("priority", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
