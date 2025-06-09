import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalModalStore = create(
    persist(
        (set) => ({
            isShopsClose: false,
            isCategoryModalOpen: false,
            setIsCategoryModalOpen: (val) => set({ isCategoryModalOpen: val }),
            setIsShopsClose: (val) => set({ isShopsClose: val }),
        }),
        {
            // Define the storage key for localStorage
            name: 'modal-store',
            // Define the list of keys that should be persisted
            getStorage: () => localStorage,
        }
    )
);

export default useGlobalModalStore;
