import Cropper, { type Area } from "react-easy-crop";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useContext } from "@/lib/use-context";
import { useEffect, useState } from "react";
import { PRINT_SIZES } from "@/lib/utils";
import { RotateCwIcon } from "lucide-react";
import { getCroppedImage } from "@/lib/helpers";

export default function Editor() {
  const { images, activeImageId } = useContext();

  const activeImage = images.find((image) => image.id === activeImageId);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [printSize, setPrintSize] = useState(PRINT_SIZES[0]);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    setCrop(activeImage.editor.crop);
    setZoom(activeImage.editor.zoom);
    setRotation(activeImage.editor.rotation);
    setPrintSize(activeImage.editor.printSize);
    setCroppedAreaPixels(activeImage.editor.croppedAreaPixels);
  }, [activeImage]);

  const onCropComplete = (_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  };

  const rotateAspect = () => {
    setPrintSize((prev) => ({
      ...prev,
      width: prev.height,
      height: prev.width,
    }));
  };

  const handleCrop = async () => {
    if (!activeImage || !croppedAreaPixels) return;

    const image = await getCroppedImage(
      activeImage.url,
      croppedAreaPixels,
      rotation,
    );

    setPreview(image);
    console.log(image);
  };

  if (!activeImage) return null;

  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-80px)] py-15 space-y-10">
      <Carousel images={images} />

      <div className="w-full h-150 relative rounded-xl overflow-hidden">
        <Cropper
          image={activeImage.url}
          aspect={printSize.width / printSize.height}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-10">
          <select
            value={printSize.id}
            onChange={(e) =>
              setPrintSize(PRINT_SIZES.find((s) => s.id === e.target.value)!)
            }
          >
            {PRINT_SIZES.map((size) => (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            ))}
          </select>

          <button
            onClick={rotateAspect}
            className="flex items-center gap-2 bg-black text-white"
          >
            <RotateCwIcon size={15} className="-translate-y-px" />
            Aspect
          </button>

          <div className="flex items-center gap-1">
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

        <button onClick={handleCrop} className="text-white bg-black">
          Crop
        </button>
      </div>
      {preview && <img src={preview} className="w-60 rounded-lg" />}
    </MaxWidthWrapper>
  );
}
