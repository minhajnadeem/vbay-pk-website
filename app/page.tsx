import Link from "next/link";
import { MessageCircleMore, ShieldCheck, Truck } from "lucide-react";
import { PostLinkGrid } from "@/components/shared/PostLinkGrid";
import { getPostProducts } from "@/lib/postProducts";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const HOME_PREVIEW_COUNT = 8;

const HERO_MESSAGE =
  "Hi, I want to order a product. Please share available items and delivery details.";

const TRUST_POINTS = [
  {
    title: "Easy WhatsApp ordering",
    description: "No complicated checkout. Just message us and place your order in minutes.",
    icon: MessageCircleMore,
  },
  {
    title: "Fast delivery across Pakistan",
    description: "We help customers order trending products with a simple nationwide flow.",
    icon: Truck,
  },
  {
    title: "Trusted and responsive support",
    description: "Need product details, stock info, or guidance? We are just a message away.",
    icon: ShieldCheck,
  },
] as const;

const ORDER_STEPS = [
  "Browse your favorite product",
  'Click "Order on WhatsApp"',
  "Confirm your order in chat",
] as const;

export default async function Home() {
  const products = await getPostProducts();
  const latestProducts = products.slice(0, HOME_PREVIEW_COUNT);

  const items = latestProducts.map((p) => ({
    href: `/product/${p.id}`,
    src: p.imageUrl,
    alt: `${p.name} product image`,
    title: p.name,
  }));

  return (
    <div className="bg-neutral-50">
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-foreground uppercase">
              Easy, quick and hassle-free shopping
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Buy trending products online in Pakistan via WhatsApp
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Quick, simple and hassle-free shopping across Pakistan. Browse products,
              message us on WhatsApp, and confirm your order instantly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Browse Products
              </a>
              <a
                href={buildWhatsAppUrl(HERO_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-black/5"
              >
                Order on WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              No complicated checkout. No waiting. Just message and order instantly.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-2 gap-4">
            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground">Trending picks</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Discover useful products selected for everyday needs and gifting.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground">WhatsApp first</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Order directly in chat and get help with stock, price, and delivery.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground">Across Pakistan</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Friendly support and simple ordering for customers nationwide.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground">Fast action</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Send a message, confirm your order, and let us handle the next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto w-full max-w-md px-3 py-8 sm:max-w-2xl sm:px-4 sm:py-10 lg:max-w-6xl lg:px-8 lg:py-12"
      >
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Latest Products</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Fresh picks from Vbay
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Explore a few of our latest items here, then browse the full collection if
              you want to see everything.
            </p>
          </div>
          <p className="rounded-full bg-white px-4 py-2 text-sm text-muted shadow-sm ring-1 ring-black/5">
            Trusted by customers across Pakistan
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-lg font-medium">No posts found yet.</p>
            <p className="mt-2 text-sm text-muted">
              Add images to <code>public/images/posts</code> and refresh the page.
            </p>
          </div>
        ) : (
          <>
            <PostLinkGrid items={items} />
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                View All Products
              </Link>
              <p className="text-sm text-muted">
                Browse the full collection and open any item to order on WhatsApp.
              </p>
            </div>
          </>
        )}
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted">Why Choose Vbay?</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A simpler way to shop online
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Vbay focuses on quick decisions, easy ordering, and responsive support so
              you can shop without the usual checkout friction.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TRUST_POINTS.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-black/10 bg-neutral-50 p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
            <p className="text-sm font-medium text-muted">How to Order</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Order in 3 simple steps
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              We keep the process straightforward so customers can move from browsing to
              confirmation without a complicated checkout flow.
            </p>
          </div>

          <ol className="space-y-4">
            {ORDER_STEPS.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl bg-neutral-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{step}</p>
                  <p className="mt-1 text-sm text-muted">
                    {index === 0 &&
                      "Check the latest items and open the product that matches what you need."}
                    {index === 1 &&
                      "Start a chat instantly using the WhatsApp CTA available across the site."}
                    {index === 2 &&
                      "Share your details in chat and finalize delivery with our team."}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-3xl bg-foreground px-6 py-6 text-background sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Ready to order?</p>
            <p className="mt-1 text-sm text-white/80">
              Message us anytime on WhatsApp for product details, delivery info, or to place your order.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(HERO_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
          >
            Message to Order
          </a>
        </div>
      </section>
    </div>
  );
}
