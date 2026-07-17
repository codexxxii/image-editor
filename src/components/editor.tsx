import Cropper from "react-easy-crop";
import Carousel from "./carousel";
import MaxWidthWrapper from "./max-width-wrapper";
import { useContext } from "@/lib/use-context";
import { useState } from "react";
import { PRINT_SIZES } from "@/lib/utils";

export default function Editor() {
  const { images, activeImage } = useContext();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState(PRINT_SIZES[0]);

  const onCropComplete = (areaPixels: any, cropAreaPixels: any) => {
    console.log(areaPixels, cropAreaPixels);
  };

  const rotateCrop = () => {
    setSelectedSize((prev) => ({
      ...prev,
      width: prev.height,
      height: prev.width,
    }));
  };

  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-80px)] py-15 space-y-10">
      <Carousel images={images.map((image) => image.url)} />
      <div className="w-full h-200 relative rounded-xl overflow-hidden">
        <Cropper
          image={activeImage ?? ""}
          aspect={selectedSize.width / selectedSize.height}
          zoom={zoom}
          onZoomChange={setZoom}
          crop={crop}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <select
          value={selectedSize.id}
          onChange={(e) =>
            setSelectedSize(PRINT_SIZES.find((s) => s.id === e.target.value)!)
          }
        >
          {PRINT_SIZES.map((size) => (
            <option key={size.id} value={size.id}>
              {size.label}
            </option>
          ))}
        </select>

        <button onClick={rotateCrop} className="bg-black text-white">
          Rotate
        </button>

        <input
          type="range"
          min={1}
          max={10}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />

        <button className="text-white bg-black">Crop</button>
      </div>
    </MaxWidthWrapper>
  );
}
