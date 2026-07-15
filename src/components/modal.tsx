import { AnimatePresence, motion } from "framer-motion";
import { Upload, Crop, SlidersHorizontal, Download, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Upload,
    title: "1. Upload your images",
    description:
      "Drag & drop or select multiple images from your device. Everything is processed locally in your browser for maximum privacy and speed.",
  },
  {
    icon: Crop,
    title: "2. Crop & Resize",
    description:
      "Choose from popular aspect ratios or enter custom dimensions. Easily reposition your image until it looks perfect.",
  },
  {
    icon: SlidersHorizontal,
    title: "3. Enhance",
    description:
      "Adjust brightness, contrast, saturation, exposure, rotation, and more. Preview every change instantly before exporting.",
  },
  {
    icon: Download,
    title: "4. Export",
    description:
      "Download your edited images in high quality with your chosen dimensions and formatting.",
  },
];

export default function Modal({ open, onClose }: Props) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-md p-6"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
          >
            <div className="border-b border-white/10 p-8">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-lg p-2 hover:bg-white/10"
              >
                <X />
              </button>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
                Getting Started
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
                Edit Images in Minutes
              </h2>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Our editor is designed to be fast and intuitive. Everything
                happens directly in your browser, meaning your images stay on
                your device while you edit.
              </p>
            </div>

            <div className="grid gap-6 p-8 md:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.12,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/3 p-6"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15">
                      <Icon className="text-indigo-400" />
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-zinc-400">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-start border-t border-white/10 bg-white/2 p-8">
              <div>
                <p className="font-semibold text-white">
                  Ready to create something?
                </p>

                <p className="text-zinc-400">
                  Upload your first image and start editing immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
