import { useContext } from "@/lib/use-context";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";
import { PRINT_SIZES } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import { getCroppedImage } from "@/lib/helpers";

export default function Editor() {
  const { images, setImages, activeImage } = useContext();

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [printSize, setPrintSize] = useState(PRINT_SIZES[0]);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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
      rotation,
    );

    const updatedImages = images.map((image) => {
      if (image.id === activeImage.id) {
        const img = {
          ...image,
          editor: {
            printSize,
            croppedAreaPixels,
            croppedUrl: croppedImageUrl,
          },
        };
        return img;
      }
      return image;
    });

    setImages(updatedImages);
  };

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
    </MaxWidthWrapper>
  );
}
