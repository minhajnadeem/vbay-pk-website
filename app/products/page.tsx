import type { Metadata } from "next";
import { PostLinkGrid } from "@/components/shared/PostLinkGrid";
import { getPostProducts } from "@/lib/postProducts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Products in Pakistan",
  description:
    "Explore all products available at Vbay.pk and order directly on WhatsApp anywhere in Pakistan.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsPage() {
  const products = await getPostProducts();

  const items = products.map((p) => ({
    href: `/product/${p.id}`,
    src: p.imageUrl,
    alt: `${p.name} product image`,
    title: p.name,
  }));

  return (
    <section className="mx-auto w-full max-w-md px-3 py-8 sm:max-w-2xl sm:px-4 sm:py-10 lg:max-w-6xl lg:px-8 lg:py-12">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">All Products</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            All products available for delivery in Pakistan
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Explore all available items and open any product to order directly on WhatsApp
            with quick support and delivery across Pakistan.
          </p>
        </div>
        <p className="rounded-full bg-white px-4 py-2 text-sm text-muted shadow-sm ring-1 ring-black/5">
          Updated with the latest posts
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-lg font-medium">No products found yet.</p>
          <p className="mt-2 text-sm text-muted">
            Add images to <code>public/images/posts</code> and refresh the page.
          </p>
        </div>
      ) : (
        <PostLinkGrid items={items} />
      )}
    </section>
  );
}
