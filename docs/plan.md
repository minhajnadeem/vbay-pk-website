# Vbay.pk Development Plan 🚀

## 🎯 Project Vision
Vbay.pk is a streamlined e-commerce catalog tailored for high-conversion browsing. It prioritizes clear **Sale/Discount** visibility and a seamless **WhatsApp-based checkout** flow. 

*Current Strategy:* Focus on a **"General"** category default to maintain a full-store vibe while the inventory grows.

## 🛠️ Tech Stack
* **Frontend:** Next.js 14+ (App Router)
* **Database:** Firebase Firestore
* **Storage:** Firebase Storage (Product Images)
* **State Management:** Zustand (for Local Cart persistence)
* **UI Components:** Tailwind CSS + Lucide React (Icons)

---

## 📋 Core Features

### 1. Product Catalog & Logic
* **Smart Listing:** All products belong to a "General" category by default to ensure a unified feed.
* **Discount Display:** - Dynamic "Sale" badges.
  - Strikethrough pricing (`basePrice` vs `salePrice`).
  - Automatic "% Off" calculation.
* **Product Detail Page (PDP):** High-quality image display and "Buy via WhatsApp" primary action.

### 2. Shopping Experience
* **Local Cart:** Items stay in the cart using `localStorage` even if the user refreshes.
* **Cart Math:** Auto-calculates totals and shows "Total Savings" to encourage checkout.
* **Engagement:** - **Site Banner:** Global promo text (e.g., "Launching Sale: Free Delivery!").
  - **In-App Toasts:** Instant feedback when adding/removing items.

### 3. WhatsApp "Checkout"
* **Lead Collection:** Simple info form (Name, Phone, City).
* **Direct Order:** Generates a WhatsApp link with a structured message:
  > "Hi Vbay! I'd like to order:
  > - 1x Product Name (Rs. X)
  > Total: Rs. Y
  > My Details: [Name], [City]"

---

## 🗄️ Database Schema (Firestore)

### `products` (Collection)
```typescript
{
  id: string,
  name: string,
  description: string,
  basePrice: number,    // Original Price
  salePrice: number,    // Discounted Price
  onSale: boolean,      // Toggle for Sale Badge
  category: "General",  // Default category for now
  images: string[],
  inStock: boolean,
  createdAt: Timestamp
}