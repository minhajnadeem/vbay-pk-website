"use client";

/**
 * Returns the percentage discount between base and sale price, e.g. "-20%".
 * Returns null if not on sale or invalid.
 */
export function getDiscountPercent(basePrice: number, salePrice: number): string | null {
  if (basePrice <= 0 || salePrice >= basePrice) return null;
  const percent = Math.round(((basePrice - salePrice) / basePrice) * 100);
  return percent > 0 ? `-${percent}%` : null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export interface PriceDisplayProps {
  basePrice: number;
  salePrice: number;
  onSale: boolean;
}

export function PriceDisplay({ basePrice, salePrice, onSale }: PriceDisplayProps) {
  const discountBadge = onSale ? getDiscountPercent(basePrice, salePrice) : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {onSale ? (
        <>
          <span className="font-semibold text-[#E11D48]">
            Rs. {formatPrice(salePrice)}
          </span>
          <span className="text-sm text-[var(--muted)] line-through">
            Rs. {formatPrice(basePrice)}
          </span>
          {discountBadge && (
            <span
              className="rounded bg-[#E11D48]/10 px-1.5 py-0.5 text-xs font-medium text-[#E11D48]"
              aria-label={`${discountBadge} off`}
            >
              {discountBadge}
            </span>
          )}
        </>
      ) : (
        <span className="font-semibold text-foreground">
          Rs. {formatPrice(basePrice)}
        </span>
      )}
    </div>
  );
}
