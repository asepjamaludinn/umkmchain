"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type FileError = "file-too-large" | "invalid-file-type";

export type UploadedFile = {
  id: string;
  file: File;
  preview: string;
  errors: FileError[];
};

type UseFileUploadOptions = {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
};

export function useFileUpload({
  accept = "image/jpeg, image/png, application/pdf",
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
}: UseFileUploadOptions) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      setErrors([]);

      const newFiles: UploadedFile[] = [];
      const newErrors: string[] = [];
      const acceptedTypes = accept
        .split(",")
        .map((t) => t.trim().toLowerCase());

      Array.from(fileList).forEach((file) => {
        const fileErrors: FileError[] = [];
        if (maxSize && file.size > maxSize) {
          fileErrors.push("file-too-large");
          newErrors.push(
            `File "${file.name}" terlalu besar (maks ${
              maxSize / 1024 / 1024
            }MB).`
          );
        }

        const isValidType = acceptedTypes.some((acceptedType) => {
          if (acceptedType.endsWith("/*")) {
            return file.type
              .toLowerCase()
              .startsWith(acceptedType.replace("/*", "/"));
          }
          return file.type.toLowerCase() === acceptedType;
        });

        if (!isValidType) {
          fileErrors.push("invalid-file-type");
          newErrors.push(`Tipe file "${file.name}" tidak valid.`);
        }

        newFiles.push({
          id: crypto.randomUUID(),
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : "",
          errors: fileErrors,
        });
      });

      if (newErrors.length > 0) {
        setErrors(newErrors);
      }

      setFiles(multiple ? [...files, ...newFiles] : newFiles);
    },
    [accept, maxSize, multiple, files]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    processFiles(e.target.files);
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const removeFile = useCallback((id: string) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.id !== id);
      const fileToRemove = prevFiles.find((file) => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return newFiles;
    });
  }, []);

  const getInputProps = () => ({
    ref: fileInputRef,
    type: "file",
    accept,
    multiple,
    onChange: handleFileChange,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] as const;
}
