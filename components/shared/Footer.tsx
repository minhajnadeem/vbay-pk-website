import Link from "next/link";
import { CONTACT_INFO, getEmailMailtoHref, getPhoneTelHref, SOCIAL_LINKS } from "@/constants/siteInfo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
              Vbay.pk
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted">
              Vbay is your go-to place for trending and useful products. We focus on
              making shopping simple, fast, and hassle-free with direct WhatsApp ordering.
            </p>
            <p className="mt-3 text-sm text-muted">
              Have a question? Message us anytime on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, iconLabel }) => (
              <a
                key={iconLabel}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-foreground transition hover:bg-black/5"
                aria-label={iconLabel}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="text-left lg:text-right">
            <p className="text-sm text-muted">
              Call:{" "}
              <a
                href={getPhoneTelHref(CONTACT_INFO.phone)}
                className="font-medium text-foreground hover:underline"
              >
                {CONTACT_INFO.phone}
              </a>
              <span className="text-muted">{" "}|{" "}</span>
              Email:{" "}
              <a
                href={getEmailMailtoHref(CONTACT_INFO.email)}
                className="font-medium text-foreground hover:underline"
              >
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">
              Easy, quick and hassle-free shopping across Pakistan with{" "}
              <Link href="/" className="font-medium text-foreground hover:underline">
                Vbay.pk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
