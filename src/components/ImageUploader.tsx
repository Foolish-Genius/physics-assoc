'use client';

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadArticleImage } from '@/lib/uploadImage';

interface ImageUploaderProps {
  /** Called once per uploaded file, with its public URL. */
  onUploaded: (url: string) => void;
  label?: string;
  multiple?: boolean;
  className?: string;
}

export default function ImageUploader({
  onUploaded,
  label = 'Upload image',
  multiple = false,
  className = '',
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        onUploaded(await uploadArticleImage(file));
        toast.success(`Uploaded ${file.name}`);
      } catch (err: any) {
        toast.error(err?.message ?? 'Upload failed');
      }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className={`inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium text-gray-300 bg-prussian/40 hover:bg-prussian/60 border border-prussian/50 disabled:opacity-50 transition-colors ${className}`}
      >
        {uploading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        {uploading ? 'Uploading…' : label}
      </button>
    </>
  );
}
