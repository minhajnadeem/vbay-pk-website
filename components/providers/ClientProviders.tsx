"use client";

import { Toaster } from "react-hot-toast";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function ClientProviders() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2800 }} />
      <CartDrawer />
    </>
  );
}
