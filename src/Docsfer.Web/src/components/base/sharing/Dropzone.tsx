import React, {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import clsx from "clsx";
import { ImagePlus } from "lucide-react";

export type DropzoneProps = {
  showAdminContent?: boolean;
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  "data-testid"?: string;
};

const Dropzone: React.FC<DropzoneProps> = ({
  showAdminContent = true,
  onFiles,
  accept = "image/*",
  multiple = true,
  className,
  "data-testid": dataTestId = "dropzone",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      if (arr.length > 0) onFiles(arr);
    },
    [onFiles]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
        // Clear the drag data
        e.dataTransfer.clearData();
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
      // reset input so selecting the same file again still triggers onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [handleFiles]
  );

  if (!showAdminContent) return null;

  return (
    <div
      className={clsx(
        "flex-center flex-col w-full h-40 md:h-56 font-gabarito",
        className
      )}
    >
      <div
        id="dropzone"
        data-testid={dataTestId}
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        aria-busy={isDragging}
        className={clsx(
          "flex-center relative w-[80dvw] md:w-auto gap-1.5 px-16 md:px-32 rounded-xl h-full",
          "text-slate-600 dark:text-sky-500",
          "border-2 border-dashed border-slate-600 dark:border-sky-500",
          {
            "border-indigo-800 bg-zinc-600 border-solid dark:border-sky-500 dark:bg-sky-300":
              isDragging,
          }
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
        />

        <ImagePlus
          className="absolute bottom-1/2 cursor-pointer size-16 text-sky-500"
          onClick={openFileDialog}
        />

        <span className="mt-16 md:mt-10 cursor-alias text-nowrap text-xs md:text-xl">
          Drop your images here or
        </span>
        <span
          className="underline mt-16 md:mt-10 cursor-pointer text-nowrap text-xs md:text-xl"
          onClick={openFileDialog}
        >
          browse files
        </span>
      </div>
    </div>
  );
};

export default Dropzone;
