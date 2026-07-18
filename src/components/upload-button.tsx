import Dropzone, { type FileRejection } from "react-dropzone";
import { useContext, type Image } from "@/lib/use-context";
import { toast } from "sonner";

export default function UploadButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setImages, setActiveImage } = useContext();

  function getImageDimensions(url: string) {
    return new Promise<{
      width: number;
      height: number;
    }>((resolve) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };

      image.src = url;
    });
  }

  const onDropAccepted = async (files: File[]) => {
    const uploadedImages: Image[] = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);

        const dimensions = await getImageDimensions(url);

        return {
          id: crypto.randomUUID(),
          url,

          width: dimensions.width,
          height: dimensions.height,

          editor: {
            crop: {
              x: 0,
              y: 0,
            },

            zoom: 1,

            rotation: 0,

            croppedAreaPixels: null,

            printSize: {
              id: "4x6",
              label: "4 × 6 in",
              width: 4,
              height: 6,
            },

            confirmed: false,
          },
        };
      }),
    );

    setImages(uploadedImages);
    setActiveImage(uploadedImages[0].id);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    toast.error(
      `File upload error, file type ${rejectedFiles[0].file.type} not supported.`,
    );
  };

  const accept = {
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/png": [".png"],
    "image/heic": [".heic"],
    "image/pdf": [".pdf"],
  };
  return (
    <>
      <Dropzone
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept={accept}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            {children}
          </div>
        )}
      </Dropzone>
    </>
  );
}
