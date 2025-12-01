import { useState, type FormEvent } from "react";
import { useUploadStatus } from "@/hooks/file/useUploadStatus";
import { useFileFormdata } from "@/hooks/file/useFileFormdata";
import { splitFile, extFromMime } from "@/utils/files/getFileExtension";
import { validateFilename } from "@/utils/files/useFilenameValidator";
import { fileUploadService } from "@/services/files/fileBlobService";

interface UseNewFileUploadArgs {
  currentUserId?: string;
  onSuccess?: () => void;
}

export function useNewFileUpload({
  currentUserId,
  onSuccess,
}: UseNewFileUploadArgs = {}) {
  const {
    errorMessage,
    submitError,
    submitSuccess,
    setErrorMessage,
    setSubmitError,
    setSubmitSuccess,
    clearAll,
  } = useUploadStatus();

  const {
    senderId,
    recipientId,
    fileName,
    fileExtension,
    setSenderId,
    setRecipientId,
    setFileName,
    setFileInfo,
    resetForm,
  } = useFileFormdata(currentUserId);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFiles = (files: File[]) => {
    if (!files?.length) return;

    const pickedFile = files[0];
    const { base, ext } = splitFile(pickedFile.name);

    setFileInfo(base, ext || extFromMime(pickedFile.type) || "");
    setSelectedFile(pickedFile);
    clearAll();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    clearAll();

    if (!selectedFile) {
      setSubmitError("Select a file before sharing.");
      return;
    }

    if (!validateFilename(fileName)) {
      setErrorMessage(
        `file names cannot contain any of the following characters: "\\ / : * ? \\" < > |"`
      );
      return;
    }

    if (!senderId) {
      setSubmitError("Sender identifier is required.");
      return;
    }

    if (!recipientId) {
      setSubmitError("Recipient identifier is required.");
      return;
    }

    const normalizedName = fileExtension
      ? `${fileName}${fileExtension}`
      : fileName;

    let fileToUpload: File = selectedFile;
    if (normalizedName && normalizedName !== selectedFile.name) {
      fileToUpload = new File([selectedFile], normalizedName, {
        type: selectedFile.type,
        lastModified: selectedFile.lastModified,
      });
    }

    try {
      setIsSubmitting(true);

      await fileUploadService.uploadBlob({
        file: fileToUpload,
        from: senderId,
        to: recipientId,
      });

      setSubmitSuccess("File shared successfully.");
      setSelectedFile(null);
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to share file", error);
      setSubmitError("Unable to share the file. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // state
    senderId,
    recipientId,
    fileName,
    fileExtension,
    selectedFile,
    isSubmitting,
    errorMessage,
    submitError,
    submitSuccess,
    // setters
    setSenderId,
    setRecipientId,
    setFileName,
    // handlers
    handleFiles,
    handleSubmit,
  };
}
