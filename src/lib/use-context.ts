import type { Area } from "react-easy-crop";
import { create } from "zustand";

export type PrintSize = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export type Image = {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  editor: {
    printSize: PrintSize | null;
    croppedUrl: string | null;
    croppedAreaPixels: Area | null;
  };
};

type ContextProps = {
  images: Image[];
  setImages: (images: Image[]) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  activeImage: Image | null;
  setActiveImage: (image: Image) => void;
};

export const useContext = create<ContextProps>((set) => ({
  images: [],
  setImages: (images) => set({ images }),
  isActive: false,
  setIsActive: (isActive) => set({ isActive }),
  activeImage: null,
  setActiveImage: (image) => set({ activeImage: image }),
}));
