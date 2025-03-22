"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import IImage from "@/interfaces/IImage";
import { useAuth } from "@/contexts/AuthProvider";

interface ProfilePictureUploadProps {
  username?: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<IImage | null>>;
}

export function ProfilePictureUpload({
  username = "User",
  setSelectedImage,
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    // Check if user has an image and set it as the image preview
    if (user?.image) {
      setImagePreview(user.image.toString());
    }
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    // Convert image to string (Base64)
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String); // Update UI preview
      setSelectedImage({ name: file.name, file: base64String }); // Store image in state
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Avatar className="w-32 h-32 border-4 border-background shadow-md">
          {imagePreview ? (
            <AvatarImage src={imagePreview} alt="Profile Picture" />
          ) : (
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {getInitials(username)}
            </AvatarFallback>
          )}
        </Avatar>
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
          onClick={triggerFileInput}
        >
          <Upload className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="space-y-2 text-center">
        <Label
          htmlFor="profile-picture"
          className="text-sm text-muted-foreground"
        >
          Click on the avatar to change your profile picture
        </Label>

        <input
          ref={fileInputRef}
          id="profile-picture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
