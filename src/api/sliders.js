import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchSliders() {
  const slidersRef = collection(db, "pages", "home", "sliders");
  const snapshot = await getDocs(slidersRef);

  const slidesData = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((slide) => slide.visible === true);

  const shuffledSlides = slidesData.sort(() => Math.random() - 0.5);
  return shuffledSlides;
}
