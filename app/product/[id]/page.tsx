import { notFound } from "next/navigation";
import { getProductById } from "@/constants/mockData";
import { ProductDetail } from "@/components/shop/ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product | Vbay.pk" };
  return {
    title: `${product.name} | Vbay.pk`,
    description: product.description ?? `Buy ${product.name} at Vbay.pk`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
