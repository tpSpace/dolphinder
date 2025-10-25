"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/walrus";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  type?: "avatar" | "banner" | "certificate";
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  type = "avatar",
  placeholder,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (type === "avatar") {
    return (
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32">
          {value ? (
            <AvatarImage src={value} alt="Avatar preview" />
          ) : (
            <AvatarFallback>
              <Upload className="h-8 w-8" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Avatar
              </>
            )}
          </Button>

          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (type === "banner") {
    return (
      <div className="space-y-4">
        <div className="relative h-48 w-full rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-muted">
          {value ? (
            <>
              <img
                src={value}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {placeholder || "Click to upload banner"}
                </p>
              </div>
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {value ? "Change Banner" : "Upload Banner"}
            </>
          )}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  // Certificate or general image upload
  return (
    <div className="space-y-4">
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full max-h-64 object-contain rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            {value ? "Change Image" : placeholder || "Upload Image"}
          </>
        )}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
