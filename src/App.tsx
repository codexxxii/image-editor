import Hero from "./components/hero";
import MaxWidthWrapper from "./components/max-width-wrapper";
import UploadButton from "./components/upload-button";
import { ImagePlus } from "lucide-react";
import { Toaster } from "sonner";
import { useContext } from "@/lib/use-context";
import Editor from "./components/editor";

export default function App() {
  const { images } = useContext();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/80" />
        </div>
        <header className="w-full h-20">
          <MaxWidthWrapper className="h-full flex justify-between items-center">
            <p className="text-4xl font-bold tracking-tighter">Luma</p>
            <UploadButton>
              <button className="px-0! w-8 grid place-items-center bg-black text-white">
                <ImagePlus size={17} />
              </button>
            </UploadButton>
          </MaxWidthWrapper>
        </header>
        {images.length > 0 ? <Editor /> : <Hero />}
      </section>
      <Toaster theme="dark" />
    </div>
  );
}
