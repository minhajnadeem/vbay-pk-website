import { notFound } from "next/navigation";
import { getProductById } from "@/constants/mockData";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { getPostProductById } from "@/lib/postProducts";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id) ?? (await getPostProductById(id));
  if (!product) return { title: "Product | Vbay.pk" };
  return {
    title: "Details | Vbay.pk",
    description:
      "View this item and message Vbay.pk on WhatsApp for price and delivery.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id) ?? (await getPostProductById(id));
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
