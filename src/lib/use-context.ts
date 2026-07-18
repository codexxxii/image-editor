import { type Area, type Point } from "react-easy-crop";
import { create } from "zustand";

export type PrintSize = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export type Image = {
  id: string;
  url: string;

  width: number;
  height: number;

  editor: {
    crop: Point;
    zoom: number;
    rotation: number;

    croppedAreaPixels: Area | null;

    printSize: PrintSize;

    confirmed: boolean;
  };
};

type ContextProps = {
  images: Image[];

  activeImageId: string | null;

  isActive: boolean;

  setImages: (images: Image[]) => void;

  updateImage: (id: string, updates: Partial<Image["editor"]>) => void;

  setActiveImage: (id: string) => void;

  setIsActive: (value: boolean) => void;

  reset: () => void;
};

export const useContext = create<ContextProps>((set) => ({
  images: [],

  activeImageId: null,

  isActive: false,

  setImages: (images) =>
    set({
      images,
    }),

  updateImage: (id, updates) =>
    set((state) => ({
      images: state.images.map((image) =>
        image.id === id
          ? {
              ...image,
              editor: {
                ...image.editor,
                ...updates,
              },
            }
          : image,
      ),
    })),

  setActiveImage: (id) =>
    set({
      activeImageId: id,
    }),

  setIsActive: (value) =>
    set({
      isActive: value,
    }),

  reset: () =>
    set({
      images: [],
      activeImageId: null,
      isActive: false,
    }),
}));
