import Dropzone, { type FileRejection } from "react-dropzone";
import { useContext } from "@/lib/use-context";
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

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const uploadedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const url = URL.createObjectURL(file);
        const imageDimensions = await getImageDimensions(url);

        const image = {
          id: crypto.randomUUID(),
          imageUrl: url,
          width: imageDimensions.width,
          height: imageDimensions.height,
          editor: {
            croppedAreaPixels: null,
            croppedUrl: null,
            printSize: null,
          },
        };
        return image;
      }),
    );
    setActiveImage(uploadedFiles[0]);
    setImages(uploadedFiles);
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
