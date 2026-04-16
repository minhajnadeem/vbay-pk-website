"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";
import type { Product } from "@/constants/mockData";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { VBAY_PDP_COPY, getProductPageUrl } from "@/constants/siteInfo";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";

const formatPrice = (price: number) => `Rs. ${price.toLocaleString("en-PK")}`;

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-foreground hover:underline">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-1.5" aria-hidden>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </li>
        <li>
          <Link href="/products" className="hover:text-foreground hover:underline">
            Products
          </Link>
        </li>
        <li className="flex items-center gap-1.5" aria-hidden>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </li>
        <li className="font-medium text-foreground" aria-current="page">
          Details
        </li>
      </ol>
    </nav>
  );
}

function PriceBlock({
  product,
  percentOff,
}: {
  product: Product;
  percentOff: number;
}) {
  if (product.salePrice <= 0) {
    return (
      <p className="mt-6 text-base font-medium text-muted">
        Price available on WhatsApp.
      </p>
    );
  }

  if (product.onSale && product.basePrice > product.salePrice) {
    return (
      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {formatPrice(product.salePrice)}
        </span>
        <span className="text-lg text-muted line-through">
          {formatPrice(product.basePrice)}
        </span>
        {percentOff > 0 && (
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-sm font-medium text-accent">
            Save {percentOff}%
          </span>
        )}
      </div>
    );
  }

  return (
    <p className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      {formatPrice(product.salePrice)}
    </p>
  );
}

function AboutVbayContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
      <h2 className="text-base font-semibold text-foreground">
        {VBAY_PDP_COPY.aboutHeading}
      </h2>
      <p>{VBAY_PDP_COPY.aboutLead}</p>
      <ul className="list-disc space-y-2 pl-5">
        {VBAY_PDP_COPY.aboutBullets.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function WhatsAppCta({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp py-3.5 text-base font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
      }
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
      Message us on WhatsApp
    </a>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [productPageUrl, setProductPageUrl] = useState(() =>
    getProductPageUrl(product.id)
  );

  useEffect(() => {
    const fromEnv = getProductPageUrl(product.id);
    if (fromEnv) {
      setProductPageUrl(fromEnv);
      return;
    }
    setProductPageUrl(`${window.location.origin}/product/${product.id}`);
  }, [product.id]);

  const percentOff =
    product.onSale && product.basePrice > 0
      ? Math.round(
          ((product.basePrice - product.salePrice) / product.basePrice) * 100
        )
      : 0;

  const priceLine =
    product.salePrice > 0
      ? product.onSale && product.basePrice > product.salePrice
        ? `${formatPrice(product.salePrice)} (was ${formatPrice(product.basePrice)})`
        : formatPrice(product.salePrice)
      : undefined;

  const whatsappHref = buildWhatsAppUrl(
    productInquiryMessage(product.name, priceLine, productPageUrl || null)
  );

  const imageAlt = `${product.name} product image`;

  return (
    <>
      <article className="mx-auto max-w-6xl px-4 pb-10 pt-2 sm:px-6 md:pb-14 md:pt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start xl:gap-16">
          {/* Media — Shopify-like neutral stage, single image */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#f4f4f4] text-left lg:sticky lg:top-24 lg:aspect-[4/5] lg:max-h-[min(88vh,760px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            aria-label="View full screen image"
          >
            <Image
              src={product.imageUrl}
              alt={imageAlt}
              fill
              className="object-contain p-6 sm:p-10 pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.onSale && percentOff > 0 && (
              <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Sale
              </span>
            )}
          </button>

          {/* Buy box */}
          <div className="flex flex-col lg:max-w-xl lg:justify-start lg:py-1">
            <Breadcrumbs />

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-base text-muted">{VBAY_PDP_COPY.tagline}</p>

            <PriceBlock product={product} percentOff={percentOff} />

            <div className="mt-8 hidden flex-col gap-3 md:flex">
              <WhatsAppCta href={whatsappHref} />
              <Link
                href="/"
                className="text-center text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Continue shopping
              </Link>
            </div>

            {/* Desktop: about below CTA */}
            <div className="mt-10 hidden border-t border-black/10 pt-8 md:block">
              <AboutVbayContent />
            </div>
          </div>
        </div>

        {/* Mobile: collapsible about (thumb-friendly CTA first in flow above via duplicate order — CTA shown again in column on small screens) */}
        <div className="mt-8 flex flex-col gap-3 md:hidden">
          <WhatsAppCta href={whatsappHref} />
          <Link
            href="/"
            className="text-center text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        <details className="group mt-8 rounded-xl border border-black/10 bg-white px-4 py-3 md:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              About Vbay &amp; delivery
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
            </span>
          </summary>
          <div className="mt-4 border-t border-black/5 pt-4">
            <AboutVbayContent />
          </div>
        </details>
      </article>

      <ImageLightbox
        src={product.imageUrl}
        alt={imageAlt}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
