import { motion } from "framer-motion";
import { Image, Crop, Sun, Sparkles } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
import UploadButton from "./upload-button";
import { useContext } from "@/lib/use-context";
import Modal from "./modal";

export default function Hero() {
  const { isActive, setIsActive } = useContext();

  return (
    <>
      <MaxWidthWrapper className="flex h-[calc(100vh-80px)] items-center justify-between gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Fast • Local • No Upload Limits
          </div>

          <h1 className="text-6xl font-black leading-none tracking-tight lg:text-7xl">
            Edit Every
            <span className="block py-1 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Image Perfectly.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-zinc-400">
            Crop, resize, adjust brightness, rotate, reshape, and enhance your
            photos—all from your browser with lightning-fast performance.
          </p>

          <div className="mt-10 flex gap-4">
            <UploadButton>
              <button className="bg-black font-semibold text-white">
                Start Editing
              </button>
            </UploadButton>

            <button
              className="border backdrop-blur"
              onClick={() => setIsActive(true)}
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-zinc-400">
            <div className="flex items-center gap-2">
              <Crop size={18} />
              Smart Crop
            </div>

            <div className="flex items-center gap-2">
              <Sun size={18} />
              Brightness
            </div>

            <div className="flex items-center gap-2">
              <Image size={18} />
              Resize
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative hidden flex-1 items-center justify-center lg:flex"
        >
          <div className="relative h-150 w-130">
            <div className="absolute left-12 top-10 h-105 w-75 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src="/hero-image.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute right-0 top-24 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 backdrop-blur"
            >
              <Crop className="mb-3 text-indigo-400" />
              <p className="font-medium text-white">Crop</p>
              <div className="mt-4 h-24 w-40 rounded-lg border-2 border-dashed border-indigo-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-14 left-0 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 backdrop-blur"
            >
              <Sun className="mb-3 text-yellow-400" />

              <p className="mb-4 font-medium text-white">Brightness</p>

              <input
                type="range"
                defaultValue={65}
                className="w-44 accent-yellow-400"
              />
            </motion.div>
          </div>
        </motion.div>
      </MaxWidthWrapper>
      {isActive && <Modal open={isActive} onClose={() => setIsActive(false)} />}
    </>
  );
}
