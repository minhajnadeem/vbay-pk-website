# Vbay.pk System Design & AI Context 🏗️

## 🎯 Architecture Philosophy
* **Colocation:** Keep styles, types, and components close to where they are used.
* **Performance:** Server-side fetching for SEO (Products), Client-side for interactivity (Cart).
* **Vibe-Friendly:** Modular enough for AI to generate entire features without breaking the app.

---

## 📂 Directory Structure (App Router)
```text
src/
├── app/                  # Next.js App Router (Routes & Server Components)
│   ├── (shop)/           # Public shop routes (Home, Product, Cart)
│   ├── api/              # Route handlers for Firebase/WhatsApp logging
│   └── layout.tsx        # Global providers (Auth, Toast, Cart)
├── components/           # UI Building Blocks
│   ├── ui/               # Shadcn/Base components (Button, Input)
│   ├── shared/           # Header, Footer, Banner
│   └── shop/             # ProductCard, CartDrawer, PriceDisplay
├── store/                # State Management (Zustand)
│   └── useCart.ts        # Persisted shopping cart logic
├── lib/                  # Utilities
│   ├── firebase.ts       # Firebase Init (Client & Admin)
│   ├── utils.ts          # Tailwind merge & formatting
│   └── whatsapp.ts       # URL generator for WhatsApp messages
├── hooks/                # Custom React Hooks
└── types/                # TypeScript Interfaces/Definitions