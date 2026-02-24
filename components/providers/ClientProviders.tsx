"use client";

import { Toaster } from "react-hot-toast";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function ClientProviders() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#262626",
            color: "#fff",
          },
        }}
      />
      <CartDrawer />
    </>
  );
}
