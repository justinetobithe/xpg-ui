import { create } from "zustand";

export const useUiStore = create((set, get) => ({
    isMobile900: typeof window !== "undefined" ? window.innerWidth < 900 : false,
    isMobile640: typeof window !== "undefined" ? window.innerWidth < 640 : false,
    loadedImages: new Set(),

    setMobile900: (v) => set({ isMobile900: v }),
    setMobile640: (v) => set({ isMobile640: v }),

    markImageLoaded: (src) => {
        const next = new Set(get().loadedImages);
        next.add(src);
        set({ loadedImages: next });
    },
}));
