"use client";

import Image from "next/image";
import { useEffect } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute left-3 top-3 z-[70] rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur"
      >
        Close
      </button>

      <div
        className="relative z-20 flex h-full w-full items-center justify-center p-2 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[85vh] w-full max-w-4xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
