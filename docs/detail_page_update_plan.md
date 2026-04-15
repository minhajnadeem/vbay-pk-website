# Vbay.pk — Detail Page Plan (Current Scope)

## Current scope (only)

Design and implement a **single product detail page** that feels close to a **Shopify-style product page** (layout and hierarchy, not a pixel copy):

| In scope | Out of scope (for now) |
| :--- | :--- |
| Large **product image** | Admin panel, Firestore, dynamic catalog |
| **Generic text about Vbay** (same for every product or centrally edited) | Per-product long descriptions, specs tables, reviews |
| One clear **Contact on WhatsApp** button (primary CTA) | Full checkout, cart drawer overhaul, home page redesign |
| Responsive layout: **desktop two-column**, **mobile stacked** + optional **sticky bottom CTA** | Multi-image gallery, variant pickers, inventory |

No backend or new data pipeline is required for this scope. Product image and title can continue to come from existing static/mock data (or a single placeholder product) until you have real listings.

---

## Design direction: “Shopify-near”

Use Shopify’s common PDP patterns as a **reference**, not a trademarked clone:

1. **Desktop (`md+`)**  
   - **Left (wide):** product media — one large image, neutral background, generous padding, subtle border or none (clean white store feel).  
   - **Right (narrow “buy box”):** title → short supporting line → **WhatsApp** as the main button → collapsible or stacked **generic Vbay** content below the fold of the CTA.

2. **Mobile**  
   - Image first (full width).  
   - Title and CTA immediately below (thumb-friendly).  
   - Generic Vbay copy after, or in an accordion (“About Vbay”, “Delivery & trust”) to avoid endless scroll before the button.  
   - Optional: **sticky bar** at the bottom with **WhatsApp** only (mirrors Shopify’s sticky add-to-cart on mobile).

3. **Visual tone**  
   - Lots of whitespace, clear type scale (title prominent, body readable).  
   - Primary action: **WhatsApp green** (`#25D366` per your palette); avoid competing equal-weight buttons unless you keep a minimal secondary (e.g. “Back to shop”).  
   - Sale/price: optional — if you still show price, treat it like Shopify (clear current price; strike only if `onSale`).

4. **Trust / brand block (generic copy)**  
   - 2–4 short bullets or a short paragraph: who Vbay is, COD, exchanges, fast delivery — **reusable** across all detail pages.  
   - Same copy lives in one place (e.g. `constants/siteInfo.ts` or a small `VbayStory` snippet component) so you edit once.

---

## Page structure (content blocks)

1. **Media** — one image, `object-contain` or `object-cover` consistently; fixed aspect or max height so the page doesn’t jump.  
2. **Product identity** — name (from static data); optional one-line tagline (“Premium picks for Pakistan”) if you want filler without per-product copy.  
3. **Primary CTA** — “Message us on WhatsApp” / “Order on WhatsApp” → `wa.me` with a **short prefilled message** (product name + optional price + line for customer to add name/city/phone).  
4. **Generic Vbay section** — heading + paragraph + bullet list (static).  
5. **Optional** — compact trust row (icons + one line each), aligned with your existing PDP trust strip if you want consistency.

---

## WhatsApp behavior (minimal)

- Single business number in config (env or `siteInfo`), not hardcoded in multiple components.  
- Prefilled message template example:  
  `Hi Vbay — I’m interested in: [product name]. Please share details.`  
- Opening **WhatsApp Web / app** in a new tab is fine (`target="_blank"` + `rel="noopener noreferrer"`).

---

## Implementation touchpoints (when you build)

- **`components/shop/ProductDetail.tsx`** — restructure layout to match the two-column + mobile stack; trim sections that are out of scope (e.g. heavy cart emphasis if you want WhatsApp-only for this phase).  
- **`app/product/[id]/page.tsx`** — unchanged route; keep metadata from product name.  
- **Generic copy** — one shared constant or small component imported into `ProductDetail`.  
- **`globals.css` / Tailwind** — spacing and max-width (`max-w-7xl` style container) to match a catalog product page.

---

## QA checklist (this scope)

- [ ] Desktop: image left, buy box right; readable line lengths.  
- [ ] Mobile: image → title → WhatsApp visible without horizontal scroll.  
- [ ] WhatsApp button works; number and message are correct.  
- [ ] Generic Vbay text is accurate and easy to update in one file.  
- [ ] No reliance on admin or API for page to render.  
- [ ] Lighthouse/accessibility: image `alt` from product name; button has clear accessible name.

---

## Summary

**Deliverable:** a Shopify-like **detail page layout** with **one product image**, **static generic Vbay story/trust copy**, and a **single WhatsApp contact CTA** — suitable for your current static-image, no-admin setup. Everything else stays out of scope until you are ready.
