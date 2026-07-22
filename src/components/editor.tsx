import { useContext, type Image } from "@/lib/use-context";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";
import { PRINT_SIZES } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import { exportImages, getCroppedImage } from "@/lib/helpers";
import { toast } from "sonner";

export default function Editor() {
  const { images, setImages, activeImage } = useContext();

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [printSize, setPrintSize] = useState(PRINT_SIZES[0]);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImages, setCroppedImages] = useState<Image[]>([]);
  const [downloading, setDownloading] = useState(false);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const rotateCrop = () => {
    setRotation((prev) => (prev + 90) % 360);

    setPrintSize((prev) => ({
      ...prev,
      width: prev.height,
      height: prev.width,
    }));

    return rotation;
  };

  const handleCrop = async () => {
    if (!activeImage || !croppedAreaPixels) return;

    const croppedImageUrl = await getCroppedImage(
      activeImage.imageUrl,
      croppedAreaPixels,
    );

    const updatedImages = images.map((image) => {
      if (image.id === activeImage.id) {
        const img = {
          ...image,
          editor: {
            printSize: printSize,
            croppedAreaPixels: croppedAreaPixels,
            croppedUrl: croppedImageUrl,
          },
        };
        setCroppedImages([...croppedImages].concat(img));
        return img;
      }
      return image;
    });

    setImages(updatedImages);
  };

  async function downloadImages(images: Image[]) {
    await toast.promise(
      (async () => {
        const blobs = await exportImages(images);

        blobs.forEach((blob, index) => {
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;

          const image = images[index];

          a.download = `${image.editor.printSize?.label ?? "image"}-${index + 1}.jpg`;

          a.click();

          URL.revokeObjectURL(url);
        });
      })(),
      {
        loading: "Preparing your images...",
        success: "Images downloaded!",
        error: "Failed to download images.",
      },
    );
  }
  return (
    <MaxWidthWrapper className="py-15 space-y-5">
      <Carousel images={images} />
      <div className="w-full h-150 rounded-lg relative overflow-hidden">
        <Cropper
          image={activeImage?.imageUrl}
          zoom={zoom}
          onZoomChange={setZoom}
          aspect={printSize.width / printSize.height}
          crop={crop}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <select
            value={printSize.id}
            onChange={(e) =>
              setPrintSize(PRINT_SIZES.find((s) => s.id === e.target.value)!)
            }
          >
            {PRINT_SIZES.map((size) => (
              <option value={size.id} key={size.id}>
                {size.label}
              </option>
            ))}
          </select>
          <DotIcon />
          <button className="bg-black text-white" onClick={rotateCrop}>
            Rotate Aspect
          </button>
          <DotIcon />
          <div className="flex items-center gap-2">
            <p>Zoom:</p>
            <input
              type="range"
              min={1}
              max={10}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </div>
        </div>
        <button className="bg-black text-white" onClick={handleCrop}>
          Crop
        </button>
      </div>
      {croppedImages.length > 0 && (
        <>
          <div className="w-full grid grid-cols-5 gap-2 place-items-start">
            {croppedImages.map((image, index) => (
              <div
                key={index}
                className="w-full rounded-md overflow-hidden h-40"
              >
                <img
                  src={image.editor.croppedUrl!}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end items-center">
            <button
              disabled={downloading!}
              className="h-10! text-lg bg-linear-to-tr from-indigo-400 via-indigo-500 to-indigo-600 text-white hover:brightness-120 transition-all ease-in-out duration-300 disabled:opacity-50"
              onClick={() => downloadImages(croppedImages)}
            >
              Download
            </button>
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
}
