"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  value: string;
  endpoint: "serverImage" | "messageFile";
  onChange: (url?: string) => void;
}

export default function FileUpload({
  value,
  endpoint,
  onChange,
}: FileUploadProps) {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative size-20">
        <Image src={value} fill alt="Upload" className="rounded-full" />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-destructive p-1 shadow-sm"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
        <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400" />
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm"
        ></Link>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
