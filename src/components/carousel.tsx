import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useContext, type Image } from "@/lib/use-context";

type Props = {
  images: Image[];
};

export default function Carousel({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveImage } = useContext();

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;

    containerRef.current.scrollBy({
      left: direction === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={containerRef}
        className="flex h-40 gap-2 overflow-x-hidden scroll-smooth"
      >
        {images.map((image, index) => (
          <div
            onClick={() => setActiveImage(image.id)}
            key={index}
            className="h-40 min-w-[calc((100%-2rem)/5)] shrink-0 overflow-hidden rounded-lg"
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
