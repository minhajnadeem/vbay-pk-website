import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/constants/mockData";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { getPostProductById } from "@/lib/postProducts";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id) ?? (await getPostProductById(id));
  if (!product) {
    return {
      title: "Product",
      description: "Browse trending products and order on WhatsApp with Vbay.pk.",
    };
  }

  return {
    title: `${product.name} in Pakistan`,
    description:
      `View ${product.name} at Vbay.pk and message us on WhatsApp for price, availability, and delivery details across Pakistan.`,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      title: `${product.name} in Pakistan | Vbay.pk`,
      description:
        `View ${product.name} at Vbay.pk and message us on WhatsApp for price, availability, and delivery details across Pakistan.`,
      url: `/product/${product.id}`,
      type: "website",
      images: [
        {
          url: product.imageUrl,
          alt: `${product.name} product image`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id) ?? (await getPostProductById(id));
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
