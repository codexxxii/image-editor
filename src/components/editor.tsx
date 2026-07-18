import Cropper, { type Area } from "react-easy-crop";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useContext } from "@/lib/use-context";
import { useEffect, useState } from "react";
import { PRINT_SIZES } from "@/lib/utils";
import { RotateCwIcon } from "lucide-react";

export default function Editor() {
  const { images, activeImageId, updateImage } = useContext();

  const activeImage = images.find((image) => image.id === activeImageId);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [printSize, setPrintSize] = useState(PRINT_SIZES[0]);

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

  const rotateCrop = () => {
    setRotation((prev) => (prev + 90) % 360);

    setPrintSize((prev) => ({
      ...prev,
      width: prev.height,
      height: prev.width,
    }));
  };

  // const rotateAspect = () => {
  //     setSelectedSize((prev) => ({
  //         ...prev,
  //         width: prev.height,
  //         height: prev.width,
  //     }));
  // };

  const handleCrop = () => {
    if (!activeImage || !croppedAreaPixels) return;

    updateImage(activeImage.id, {
      crop,
      zoom,
      rotation,
      croppedAreaPixels,
      printSize,
      confirmed: true,
    });
  };

  if (!activeImage) return null;

  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-80px)] py-15 space-y-10">
      <Carousel images={images} />

      <div className="w-full h-200 relative rounded-xl overflow-hidden">
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
            onClick={rotateCrop}
            className="px-0! w-8 grid place-items-center bg-black text-white"
          >
            <RotateCwIcon size={17} />
          </button>

          <input
            type="range"
            min={1}
            max={10}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <button onClick={handleCrop} className="text-white bg-black">
          Crop
        </button>
      </div>
    </MaxWidthWrapper>
  );
}
