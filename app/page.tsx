import { PostLinkGrid } from "@/components/shared/PostLinkGrid";
import { getPostProducts } from "@/lib/postProducts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getPostProducts();

  const items = products.map((p) => ({
    href: `/product/${p.id}`,
    src: p.imageUrl,
    alt: "Vbay post",
  }));

  return (
    <section className="mx-auto w-full max-w-md px-3 py-4 sm:max-w-2xl sm:px-4 sm:py-6 lg:max-w-6xl lg:px-8">
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center sm:p-10">
          <p className="text-lg font-medium">No posts found yet.</p>
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
