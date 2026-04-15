"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/shared/ImageLightbox";

type Post = {
  src: string;
  alt: string;
};

export function PostsGrid({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePost = activeIndex === null ? null : posts[activeIndex];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {posts.map((post, idx) => (
          <button
            key={post.src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left"
            aria-label={`Open post ${idx + 1}`}
          >
            <Image
              src={post.src}
              alt={post.alt}
              width={600}
              height={600}
              className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-105"
              priority={idx < 2}
              unoptimized
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        src={activePost?.src ?? ""}
        alt={activePost?.alt ?? ""}
        open={activePost !== null}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}

