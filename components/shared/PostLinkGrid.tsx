"use client";

import Image from "next/image";
import Link from "next/link";

export type PostLinkItem = {
  href: string;
  src: string;
  alt: string;
  title: string;
};

export function PostLinkGrid({ items }: { items: PostLinkItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
      {items.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          className="group mx-auto block w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left"
          aria-label={`View ${item.title} details and WhatsApp ordering options`}
        >
          <div className="relative">
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={600}
              className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-105"
              priority={idx < 2}
            />
          </div>
          <div className="border-t border-neutral-100 px-4 py-3">
            <p className="line-clamp-2 text-sm font-medium text-foreground">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
