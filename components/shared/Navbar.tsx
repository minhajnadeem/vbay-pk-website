"use client";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO, SOCIAL_LINKS, getEmailMailtoHref, getPhoneTelHref } from "@/constants/siteInfo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="hidden sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-muted sm:px-6">
          <div className="flex items-center gap-3">
            <a
              href={getPhoneTelHref(CONTACT_INFO.phone)}
              className="font-medium text-foreground hover:underline"
            >
              {CONTACT_INFO.phone}
            </a>
            <span className="text-muted">|</span>
            <a
              href={getEmailMailtoHref(CONTACT_INFO.email)}
              className="font-medium text-foreground hover:underline"
            >
              {CONTACT_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-foreground">
              Easy, quick and hassle-free shopping
            </span>
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ href, icon: Icon, iconLabel }) => (
                <a
                  key={iconLabel}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-foreground transition hover:bg-black/5"
                  aria-label={iconLabel}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-black hover:opacity-80"
        >
          <Image
            src="/images/brand/logo_vbay.jpg"
            alt="Vbay.pk"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">Vbay.pk</span>
        </Link>

        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
        >
          Browse Products
        </Link>
      </nav>
    </header>
  );
}
