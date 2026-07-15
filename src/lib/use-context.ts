import { create } from "zustand";

type Image = {
  id: string;
  url: string;
};

type ContextProps = {
  images: Image[];
  handleImages: (images: Image[]) => void;
  isActive: boolean;
  handleIsActive: (isActive: boolean) => void;
};

export const useContext = create<ContextProps>((set) => ({
  images: [],
  handleImages: (images) => set({ images }),
  isActive: false,
  handleIsActive: (isActive) => set({ isActive }),
}));
