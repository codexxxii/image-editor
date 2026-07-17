import { create } from "zustand";

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
  crop: {
    x: number;
    y: number;
  };
  zoom: number;
  rotation: number;
  croppedAreaPixels?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  size?: {
    id: string;
    width: number; // inches
    height: number; // inches
  };
  output?: {
    width: number; // pixels
    height: number; // pixels
    dpi: number;
  };

  croppedUrl?: string; // final generated image
};

type ContextProps = {
  images: Image[];
  handleImages: (images: Image[]) => void;
  isActive: boolean;
  handleIsActive: (isActive: boolean) => void;
  activeImage: string | null;
  handleActiveImage: (activeImage: string) => void;
};

export const useContext = create<ContextProps>((set) => ({
  images: [],
  handleImages: (images) => set({ images }),
  isActive: false,
  handleIsActive: (isActive) => set({ isActive }),
  activeImage: null,
  handleActiveImage: (activeImage) => set({ activeImage: activeImage }),
}));
