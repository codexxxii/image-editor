import { type Area } from "react-easy-crop";
import type { Image } from "./use-context";

const DPI = 300;

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = src;
  });
}

export async function getCroppedImage(
  imageSrc: string,
  crop: Area,
  adjustments: { brightness: number; contrast: number; saturation: number },
): Promise<string> {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.save();

  ctx.filter = `
    brightness(${adjustments.brightness}%)
    contrast(${adjustments.contrast}%)
    saturate(${adjustments.saturation}%)
  `;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  ctx.restore();

  return canvas.toDataURL("image/jpeg");
}

export async function exportImage(image: Image): Promise<Blob> {
  const { croppedAreaPixels, printSize, adjustments } = image.editor;

  if (!croppedAreaPixels || !printSize) {
    throw new Error("Image has not been cropped.");
  }

  const img = await createImage(image.imageUrl);

  // Canvas that contains only the cropped area
  const cropCanvas = document.createElement("canvas");
  const cropCtx = cropCanvas.getContext("2d")!;

  cropCanvas.width = croppedAreaPixels.width;
  cropCanvas.height = croppedAreaPixels.height;

  cropCtx.filter = `
  brightness(${adjustments.brightness}%)
  contrast(${adjustments.contrast}%)
  saturate(${adjustments.saturation}%)
`;

  cropCtx.drawImage(
    img,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,

    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  // Final print canvas
  const exportCanvas = document.createElement("canvas");
  const exportCtx = exportCanvas.getContext("2d")!;

  exportCanvas.width = Math.round(printSize.width * DPI);
  exportCanvas.height = Math.round(printSize.height * DPI);

  exportCtx.drawImage(
    cropCanvas,
    0,
    0,
    cropCanvas.width,
    cropCanvas.height,

    0,
    0,
    exportCanvas.width,
    exportCanvas.height,
  );

  return new Promise((resolve, reject) => {
    exportCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to export image."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      1,
    );
  });
}

export async function exportImages(images: Image[]) {
  const blobs: Blob[] = [];

  for (const image of images) {
    const blob = await exportImage(image);
    blobs.push(blob);
  }

  return blobs;
}
