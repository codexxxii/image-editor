import { useContext, type Image } from "@/lib/use-context";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";
import { cn, PRINT_SIZES } from "@/lib/utils";
import { DotIcon, XIcon } from "lucide-react";
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
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

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
      {
        brightness,
        contrast,
        saturation,
        grayscale,
      },
    );

    const updatedImages = images.map((image) => {
      if (image.id === activeImage.id) {
        const img = {
          ...image,
          croppedImageId: crypto.randomUUID(),
          editor: {
            printSize: printSize,
            croppedAreaPixels: croppedAreaPixels,
            croppedUrl: croppedImageUrl,
            adjustments: {
              brightness,
              contrast,
              saturation,
              grayscale,
            },
          },
        };
        setCroppedImages([...croppedImages].concat(img));
        return img;
      }
      return image;
    });

    setImages(updatedImages);
  };

  const removeImage = (imageId: string) => {
    const filteredImages = croppedImages.filter(
      (image) => image.croppedImageId !== imageId,
    );
    setCroppedImages(filteredImages);
  };

  function downloadImages(images: Image[]) {
    toast.promise(
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
          style={{
            mediaStyle: {
              filter: `
              brightness(${brightness}%)
              contrast(${contrast}%)
              saturate(${saturation}%)
              grayscale(${grayscale}%)
              `,
            },
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          <select
            value={printSize.id}
            onChange={(e) =>
              setPrintSize(PRINT_SIZES.find((s) => s.id === e.target.value)!)
            }
            className="w-full sm:w-auto"
          >
            {PRINT_SIZES.map((size) => (
              <option value={size.id} key={size.id}>
                {size.label}
              </option>
            ))}
          </select>

          <DotIcon className="hidden md:block" />

          <button
            className="bg-black text-white w-full sm:w-auto"
            onClick={rotateCrop}
          >
            Rotate Aspect
          </button>

          <DotIcon className="hidden md:block" />
          <button
            className={cn(
              "w-full sm:w-auto",
              grayscale === 100 ? "bg-black text-white" : "bg-gray-100",
            )}
            onClick={() => setGrayscale((prev) => (prev === 0 ? 100 : 0))}
          >
            Grayscale
          </button>

          <DotIcon className="hidden md:block" />

          <div className="flex w-full sm:w-auto items-center gap-2">
            <p className="shrink-0">Zoom:</p>

            <input
              className="flex-1 sm:w-48"
              type="range"
              min={1}
              max={10}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </div>
          <DotIcon className="hidden md:block" />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <p className="shrink-0">Brightness:</p>
            <input
              className="flex-1 sm:w-48"
              type="range"
              min={0}
              max={200}
              step={0.05}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
            />
          </div>
          <DotIcon className="hidden md:block" />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <p className="shrink-0">Contrast:</p>

            <input
              className="flex-1 sm:w-48"
              type="range"
              min={0}
              max={200}
              step={0.05}
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
            />
          </div>
          <DotIcon className="hidden md:block" />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <p className="shrink-0">Saturation:</p>

            <input
              className="flex-1 sm:w-48"
              type="range"
              min={0}
              max={200}
              step={0.05}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center">
        <button
          className="bg-black text-white w-full md:w-auto"
          onClick={handleCrop}
        >
          Crop
        </button>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-5"></div>
      {croppedImages.length > 0 && (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 place-items-start">
            {croppedImages.map((image, index) => (
              <div
                key={index}
                className="w-full rounded-md overflow-hidden h-40 relative"
              >
                <button
                  className="h-5! p-0! aspect-square grid place-items-center absolute top-1.5 right-1.5"
                  onClick={() => removeImage(image.croppedImageId!)}
                >
                  <XIcon size={17} className="text-red-500" />
                </button>
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
              className="w-full md:w-auto h-10! text-lg bg-linear-to-tr from-indigo-400 via-indigo-500 to-indigo-600 text-white hover:brightness-120 transition-all ease-in-out duration-300"
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
