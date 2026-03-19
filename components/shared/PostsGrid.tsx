"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Post = {
  src: string;
  alt: string;
};

export function PostsGrid({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePost = activeIndex === null ? null : posts[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

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
            />
          </button>
        ))}
      </div>

      {activePost ? (
        <div
          className="fixed inset-0 z-50 bg-black/90"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            // Ensure the button sits above the viewer container (which has a higher z-index).
            className="absolute left-3 top-3 z-50 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur"
          >
            Close
          </button>

          <div
            className="relative z-20 flex h-full w-full items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              // Prevent background close when interacting with the viewer content.
              e.stopPropagation();
            }}
          >
            <div className="relative h-[85vh] w-full max-w-4xl">
              <Image
                src={activePost.src}
                alt={activePost.alt}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

